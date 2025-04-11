import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { images } from "@/server/db/schema";


export const uploadRouter = createTRPCRouter({
  uploadImage: protectedProcedure
    .input(
      z.object({
        image: z.string().regex(/^data:image\/(jpeg|jpg|png|gif);base64,/, {
          message: "图片必须是有效的 Base64 编码",
        }),
        fileName: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        // 从base64中提取实际数据和类型
        const [metaData, base64Data] = input.image.split(",");
        const fileType = metaData?.match(/data:(.*);base64/)?.[1] ?? "image/png";
        
        // 将图片保存到数据库
        const fileName = input.fileName ?? `image-${Date.now()}.${fileType.split('/')[1] ?? 'png'}`;
        const result = await ctx.db.insert(images).values({
          fileName: fileName,
          fileType: fileType,
          data: base64Data!,
          uploadedBy: ctx.session.user.id
        }).returning({ id: images.id });
        
        // 使用数据库返回的ID
        const imageId = result[0]?.id;
        
        // 返回图片URL，编辑器将使用此URL显示图片
        return {
          url: `/api/images/${imageId}`,
          alt: input.fileName ?? "上传图片",
        };
      } catch (error) {
        console.error("图片上传失败:", error);
        throw new Error("图片上传失败");
      }
    }),
});
import { type NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";
import { images } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // 确保 params 被正确解构
    const { id } =await params;
    
    // 从数据库获取图片
    const imageData = await db.query.images.findFirst({
      where: eq(images.id, id),
    });
    
    if (!imageData) {
      return NextResponse.json({ error: "图片不存在" }, { status: 404 });
    }
    
    // 返回图片数据
    return new NextResponse(Buffer.from(imageData.data, 'base64'), {
      headers: {
        "Content-Type": imageData.fileType,
        "Cache-Control": "public, max-age=31536000", // 缓存一年
      },
    });
  } catch (error) {
    console.error("获取图片失败:", error);
    return NextResponse.json({ error: "获取图片失败" }, { status: 500 });
  }
}
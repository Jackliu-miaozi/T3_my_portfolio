import { type MetadataRoute } from 'next'
import { db } from '@/server/db'
import { myartical } from '@/server/db/schema'

/**
 * 生成网站sitemap
 * 包含所有公开页面和动态文章页面
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 网站基础URL
  const baseUrl = 'https://t3-my-portfolio-git-test-jackliumiaozis-projects.vercel.app'
  
  // 静态页面配置
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/aboutme`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/guestbook`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/myartical`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ]

  // 获取所有已发布的文章
  let articlePages: MetadataRoute.Sitemap = []
  
  try {
    const articles = await db.select({
      id: myartical.id,
      createdAt: myartical.createdAt,
      // 移除 updatedAt 字段，因为schema中没有定义
    }).from(myartical)

    articlePages = articles.map((article) => ({
      url: `${baseUrl}/myartical/${article.id}`,
      // 只使用 createdAt，因为没有 updatedAt
      lastModified: article.createdAt instanceof Date ? article.createdAt : new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  } catch (error) {
    console.error('获取文章列表失败:', error)
    // 如果数据库查询失败，返回空数组
    articlePages = []
  }

  // 合并所有页面
  return [...staticPages, ...articlePages]
}
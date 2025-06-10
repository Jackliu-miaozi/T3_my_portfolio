import { type MetadataRoute } from 'next'

/**
 * 生成robots.txt文件
 * 指导搜索引擎爬虫如何抓取网站
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://t3-my-portfolio-git-test-jackliumiaozis-projects.vercel.app'
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/dashboard/',
        '/sign-in',
        '/sign-out', 
        '/sign-up',
        '/api/',
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
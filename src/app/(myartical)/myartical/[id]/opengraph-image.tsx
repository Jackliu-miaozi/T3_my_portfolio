import { ImageResponse } from 'next/og';
import { db } from '@/server/db';
import { myartical } from '@/server/db/schema';
import { eq } from 'drizzle-orm';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = '文章封面图';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

// Image generation
type Props = {
  params: Promise<{ id: string }>;
};

export default async function Image({ params }: Props) {
  const { id } = await params;
  
  // 获取文章信息
  let article;
  try {
    article = await db.query.myartical.findFirst({
      where: eq(myartical.id, Number.parseInt(id)),
    });
  } catch (error) {
    console.error('获取文章失败:', error);
    article = null;
  }

  // 如果没有找到文章，使用默认信息
  const title = article?.title ?? '文章不存在';
  const summary = article?.summary ?? '找不到请求的文章';
  const author = article?.createdBy ?? 'Jack';
  const category = article?.category ?? '技术文章';

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0f172a', // slate-900
          backgroundImage: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
          position: 'relative',
        }}
      >
        {/* 背景装饰 */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'radial-gradient(circle at 25% 25%, #10b981 0%, transparent 50%), radial-gradient(circle at 75% 75%, #3b82f6 0%, transparent 50%)',
            opacity: 0.1,
          }}
        />
        
        {/* 主要内容区域 */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '80px 60px',
            textAlign: 'center',
            maxWidth: '1000px',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* 分类标签 */}
          <div
            style={{
              backgroundColor: '#10b981',
              color: 'white',
              padding: '8px 24px',
              borderRadius: '20px',
              fontSize: '18px',
              fontWeight: '600',
              marginBottom: '24px',
            }}
          >
            {category}
          </div>

          {/* 文章标题 */}
          <h1
            style={{
              fontSize: title.length > 30 ? '48px' : '64px',
              fontWeight: '800',
              color: 'white',
              lineHeight: '1.1',
              marginBottom: '24px',
              textAlign: 'center',
              maxWidth: '900px',
            }}
          >
            {title}
          </h1>

          {/* 文章摘要 */}
          {summary && (
            <p
              style={{
                fontSize: '24px',
                color: '#cbd5e1', // slate-300
                lineHeight: '1.4',
                marginBottom: '40px',
                maxWidth: '800px',
                textAlign: 'center',
              }}
            >
              {summary.length > 100 ? summary.substring(0, 100) + '...' : summary}
            </p>
          )}

          {/* 底部信息 */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '32px',
              marginTop: 'auto',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                color: '#94a3b8', // slate-400
                fontSize: '20px',
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: '#10b981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: '600',
                }}
              >
                {author.charAt(0).toUpperCase()}
              </div>
              <span>{author}</span>
            </div>
            
            <div
              style={{
                color: '#94a3b8',
                fontSize: '20px',
                fontWeight: '600',
              }}
            >
              Jack&apos;s 主页
            </div>
          </div>
        </div>

        {/* 右下角装饰 */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            right: '40px',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            backgroundColor: '#10b981',
            opacity: 0.8,
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
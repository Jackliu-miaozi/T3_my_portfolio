import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = '404 - 页面未找到 | Jack\'s 主页';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

// Image generation
export default async function Image() {
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
          backgroundColor: '#0f172a',
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
            backgroundImage: 'radial-gradient(circle at 30% 30%, #ef4444 0%, transparent 50%), radial-gradient(circle at 70% 70%, #f97316 0%, transparent 50%)',
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
          {/* 404 数字 */}
          <div
            style={{
              fontSize: '120px',
              fontWeight: '900',
              color: '#ef4444',
              lineHeight: '1',
              marginBottom: '24px',
              textShadow: '0 0 30px rgba(239, 68, 68, 0.3)',
            }}
          >
            404
          </div>

          {/* 图标 */}
          <div
            style={{
              fontSize: '64px',
              marginBottom: '32px',
            }}
          >
            🔍
          </div>

          {/* 主标题 */}
          <h1
            style={{
              fontSize: '48px',
              fontWeight: '800',
              color: 'white',
              lineHeight: '1.1',
              marginBottom: '24px',
              textAlign: 'center',
            }}
          >
            页面未找到
          </h1>

          {/* 副标题 */}
          <p
            style={{
              fontSize: '24px',
              color: '#cbd5e1',
              lineHeight: '1.4',
              marginBottom: '40px',
              textAlign: 'center',
            }}
          >
            抱歉，您访问的页面不存在或已被移除
          </p>

          {/* 描述文字 */}
          <p
            style={{
              fontSize: '20px',
              color: '#94a3b8',
              lineHeight: '1.5',
              marginBottom: '48px',
              maxWidth: '600px',
              textAlign: 'center',
            }}
          >
            请检查URL是否正确，或返回首页继续浏览
          </p>

          {/* 建议操作 */}
          <div
            style={{
              display: 'flex',
              gap: '16px',
              flexWrap: 'wrap',
              justifyContent: 'center',
              marginBottom: '40px',
            }}
          >
            {['返回首页', '查看文章', '联系我们'].map((action) => (
              <div
                key={action}
                style={{
                  backgroundColor: 'rgba(239, 68, 68, 0.2)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  color: '#ef4444',
                  padding: '8px 20px',
                  borderRadius: '20px',
                  fontSize: '18px',
                  fontWeight: '600',
                }}
              >
                {action}
              </div>
            ))}
          </div>

          {/* 底部信息 */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#64748b',
              fontSize: '18px',
              fontWeight: '500',
            }}
          >
            Jack&apos;s 主页 - 404错误
          </div>
        </div>

        {/* 装饰元素 */}
        <div
          style={{
            position: 'absolute',
            top: '80px',
            left: '80px',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            backgroundColor: '#f97316',
            opacity: 0.6,
          }}
        />
        
        <div
          style={{
            position: 'absolute',
            bottom: '80px',
            right: '80px',
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            backgroundColor: '#ef4444',
            opacity: 0.6,
          }}
        />
        
        {/* 问号装饰 */}
        <div
          style={{
            position: 'absolute',
            top: '25%',
            right: '60px',
            fontSize: '48px',
            opacity: 0.2,
          }}
        >
          ❓
        </div>
        
        <div
          style={{
            position: 'absolute',
            bottom: '25%',
            left: '60px',
            fontSize: '36px',
            opacity: 0.2,
          }}
        >
          ❌
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
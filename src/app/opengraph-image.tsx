import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = "Jack's 主页";
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
            backgroundImage: 'radial-gradient(circle at 20% 20%, #10b981 0%, transparent 40%), radial-gradient(circle at 80% 80%, #3b82f6 0%, transparent 40%), radial-gradient(circle at 40% 60%, #8b5cf6 0%, transparent 40%)',
            opacity: 0.15,
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
          {/* 头像区域 */}
          <div
            style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              backgroundColor: '#10b981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '32px',
              border: '4px solid rgba(16, 185, 129, 0.3)',
            }}
          >
            <span
              style={{
                fontSize: '48px',
                fontWeight: '800',
                color: 'white',
              }}
            >
              J
            </span>
          </div>

          {/* 主标题 */}
          <h1
            style={{
              fontSize: '72px',
              fontWeight: '800',
              color: 'white',
              lineHeight: '1.1',
              marginBottom: '24px',
              textAlign: 'center',
            }}
          >
            Jack&apos;s 主页
          </h1>

          {/* 副标题 */}
          <p
            style={{
              fontSize: '28px',
              color: '#cbd5e1', // slate-300
              lineHeight: '1.4',
              marginBottom: '40px',
              textAlign: 'center',
            }}
          >
            个人网站 | 技术博客 | 项目展示
          </p>

          {/* 描述文字 */}
          <p
            style={{
              fontSize: '22px',
              color: '#94a3b8', // slate-400
              lineHeight: '1.5',
              marginBottom: '48px',
              maxWidth: '700px',
              textAlign: 'center',
            }}
          >
            欢迎来到刘正源的个人网站，这里有我的项目、文章和个人介绍
          </p>

          {/* 技能标签 */}
          <div
            style={{
              display: 'flex',
              gap: '16px',
              flexWrap: 'wrap',
              justifyContent: 'center',
              marginBottom: '40px',
            }}
          >
            {['React', 'Next.js', 'TypeScript', 'Node.js'].map((skill) => (
              <div
                key={skill}
                style={{
                  backgroundColor: 'rgba(16, 185, 129, 0.2)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  color: '#10b981',
                  padding: '8px 20px',
                  borderRadius: '20px',
                  fontSize: '18px',
                  fontWeight: '600',
                }}
              >
                {skill}
              </div>
            ))}
          </div>

          {/* 底部网站信息 */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#64748b', // slate-500
              fontSize: '18px',
              fontWeight: '500',
            }}
          >
            jackliu.com
          </div>
        </div>

        {/* 装饰元素 */}
        <div
          style={{
            position: 'absolute',
            top: '60px',
            right: '60px',
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            backgroundColor: '#3b82f6',
            opacity: 0.6,
          }}
        />
        
        <div
          style={{
            position: 'absolute',
            bottom: '60px',
            left: '60px',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            backgroundColor: '#8b5cf6',
            opacity: 0.6,
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
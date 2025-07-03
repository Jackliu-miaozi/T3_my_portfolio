import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = '关于我 | Jack\'s 主页';
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
            backgroundImage: 'radial-gradient(circle at 25% 25%, #3b82f6 0%, transparent 50%), radial-gradient(circle at 75% 75%, #8b5cf6 0%, transparent 50%)',
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
          {/* 头像区域 */}
          <div
            style={{
              width: '140px',
              height: '140px',
              borderRadius: '50%',
              backgroundColor: '#3b82f6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '32px',
              border: '4px solid rgba(59, 130, 246, 0.3)',
            }}
          >
            <span
              style={{
                fontSize: '56px',
                fontWeight: '800',
                color: 'white',
              }}
            >
              👨‍💻
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
            关于我
          </h1>

          {/* 姓名 */}
          <p
            style={{
              fontSize: '32px',
              color: '#10b981',
              lineHeight: '1.4',
              marginBottom: '20px',
              textAlign: 'center',
              fontWeight: '600',
            }}
          >
            刘正源 (Jack Liu)
          </p>

          {/* 职业描述 */}
          <p
            style={{
              fontSize: '24px',
              color: '#cbd5e1',
              lineHeight: '1.4',
              marginBottom: '40px',
              textAlign: 'center',
            }}
          >
            全栈开发者 | 技术爱好者 | 终身学习者
          </p>

          {/* 技能展示 */}
          <div
            style={{
              display: 'flex',
              gap: '16px',
              flexWrap: 'wrap',
              justifyContent: 'center',
              marginBottom: '40px',
            }}
          >
            {['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'AI/ML'].map((skill) => (
              <div
                key={skill}
                style={{
                  backgroundColor: 'rgba(59, 130, 246, 0.2)',
                  border: '1px solid rgba(59, 130, 246, 0.3)',
                  color: '#3b82f6',
                  padding: '8px 20px',
                  borderRadius: '20px',
                  fontSize: '16px',
                  fontWeight: '600',
                }}
              >
                {skill}
              </div>
            ))}
          </div>

          {/* 个人简介 */}
          <p
            style={{
              fontSize: '20px',
              color: '#94a3b8',
              lineHeight: '1.5',
              marginBottom: '48px',
              maxWidth: '700px',
              textAlign: 'center',
            }}
          >
            热爱编程，专注于前端和全栈开发，喜欢探索新技术，分享技术心得
          </p>

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
            Jack&apos;s 主页 - 个人介绍
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
            backgroundColor: '#8b5cf6',
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
            backgroundColor: '#3b82f6',
            opacity: 0.6,
          }}
        />
        
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '40px',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: '#10b981',
            opacity: 0.4,
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
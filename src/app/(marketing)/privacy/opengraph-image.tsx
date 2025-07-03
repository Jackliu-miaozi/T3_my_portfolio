import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = '隐私政策 | Jack\'s 主页';
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
            backgroundImage: 'radial-gradient(circle at 30% 30%, #7c3aed 0%, transparent 50%), radial-gradient(circle at 70% 70%, #0891b2 0%, transparent 50%)',
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
          {/* 图标区域 */}
          <div
            style={{
              width: '120px',
              height: '120px',
              borderRadius: '20px',
              backgroundColor: '#7c3aed',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '32px',
              border: '4px solid rgba(124, 58, 237, 0.3)',
            }}
          >
            <span
              style={{
                fontSize: '48px',
              }}
            >
              🔒
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
            隐私政策
          </h1>

          {/* 副标题 */}
          <p
            style={{
              fontSize: '28px',
              color: '#cbd5e1',
              lineHeight: '1.4',
              marginBottom: '40px',
              textAlign: 'center',
            }}
          >
            数据保护 | 隐私安全 | 信息透明
          </p>

          {/* 描述文字 */}
          <p
            style={{
              fontSize: '22px',
              color: '#94a3b8',
              lineHeight: '1.5',
              marginBottom: '48px',
              maxWidth: '700px',
              textAlign: 'center',
            }}
          >
            了解我们如何收集、使用和保护您的个人信息，确保您的隐私安全
          </p>

          {/* 隐私要点 */}
          <div
            style={{
              display: 'flex',
              gap: '16px',
              flexWrap: 'wrap',
              justifyContent: 'center',
              marginBottom: '40px',
            }}
          >
            {['数据收集', '信息使用', '隐私保护', '用户权利'].map((item) => (
              <div
                key={item}
                style={{
                  backgroundColor: 'rgba(124, 58, 237, 0.2)',
                  border: '1px solid rgba(124, 58, 237, 0.3)',
                  color: '#7c3aed',
                  padding: '8px 20px',
                  borderRadius: '20px',
                  fontSize: '18px',
                  fontWeight: '600',
                }}
              >
                {item}
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
            Jack&apos;s 主页 - 隐私保护
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
            backgroundColor: '#0891b2',
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
            backgroundColor: '#7c3aed',
            opacity: 0.6,
          }}
        />
        
        {/* 安全图标装饰 */}
        <div
          style={{
            position: 'absolute',
            top: '35%',
            right: '40px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            opacity: 0.3,
          }}
        >
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                backgroundColor: '#7c3aed',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px',
              }}
            >
              🔐
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
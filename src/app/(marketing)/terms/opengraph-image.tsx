import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = '使用条款 | Jack\'s 主页';
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
            backgroundImage: 'radial-gradient(circle at 30% 30%, #059669 0%, transparent 50%), radial-gradient(circle at 70% 70%, #0ea5e9 0%, transparent 50%)',
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
              backgroundColor: '#059669',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '32px',
              border: '4px solid rgba(5, 150, 105, 0.3)',
            }}
          >
            <span
              style={{
                fontSize: '48px',
              }}
            >
              📋
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
            使用条款
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
            服务条款 | 使用规范 | 法律声明
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
            了解我们的服务条款和使用规范，确保您的权益得到保障
          </p>

          {/* 条款要点 */}
          <div
            style={{
              display: 'flex',
              gap: '16px',
              flexWrap: 'wrap',
              justifyContent: 'center',
              marginBottom: '40px',
            }}
          >
            {['用户权利', '服务规范', '隐私保护', '免责声明'].map((item) => (
              <div
                key={item}
                style={{
                  backgroundColor: 'rgba(5, 150, 105, 0.2)',
                  border: '1px solid rgba(5, 150, 105, 0.3)',
                  color: '#059669',
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
            Jack&apos;s 主页 - 法律条款
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
            backgroundColor: '#0ea5e9',
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
            backgroundColor: '#059669',
            opacity: 0.6,
          }}
        />
        
        {/* 文档图标装饰 */}
        <div
          style={{
            position: 'absolute',
            top: '40%',
            left: '40px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            opacity: 0.3,
          }}
        >
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              style={{
                width: '50px',
                height: '8px',
                backgroundColor: '#059669',
                borderRadius: '4px',
              }}
            />
          ))}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
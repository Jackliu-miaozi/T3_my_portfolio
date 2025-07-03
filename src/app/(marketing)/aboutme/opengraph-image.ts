// 类型定义
interface ImageData {
  width: number;
  height: number;
  format: 'png';
  background: {
    type: string;
    colors: string[];
    direction: number;
  };
  elements: Array<{
    type: string;
    content?: string | string[];
    style: Record<string, unknown>;
  }>;
  decorations: Array<{
    type: string;
    style: Record<string, unknown>;
  }>;
}

// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = '关于我 | Jack\'s 主页';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

// Image generation using pure TypeScript
export default async function Image(): Promise<Response> {
  const imageData = {
    width: size.width,
    height: size.height,
    format: 'png' as const,
    background: {
      type: 'gradient',
      colors: ['#0f172a', '#1e293b', '#334155'],
      direction: 135
    },
    elements: [
      {
        type: 'background-decoration',
        style: {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'radial-gradient(circle at 25% 25%, #3b82f6 0%, transparent 50%), radial-gradient(circle at 75% 75%, #8b5cf6 0%, transparent 50%)',
          opacity: 0.1
        }
      },
      {
        type: 'avatar',
        content: '👨‍💻',
        style: {
          width: 140,
          height: 140,
          borderRadius: '50%',
          backgroundColor: '#3b82f6',
          fontSize: 56,
          fontWeight: 800,
          color: 'white',
          border: '4px solid rgba(59, 130, 246, 0.3)',
          marginBottom: 32
        }
      },
      {
        type: 'title',
        content: '关于我',
        style: {
          fontSize: 72,
          fontWeight: 800,
          color: 'white',
          lineHeight: 1.1,
          marginBottom: 24,
          textAlign: 'center'
        }
      },
      {
        type: 'name',
        content: '刘正源 (Jack Liu)',
        style: {
          fontSize: 32,
          color: '#10b981',
          lineHeight: 1.4,
          marginBottom: 20,
          textAlign: 'center',
          fontWeight: 600
        }
      },
      {
        type: 'description',
        content: '全栈开发者 | 技术爱好者 | 终身学习者',
        style: {
          fontSize: 24,
          color: '#cbd5e1',
          lineHeight: 1.4,
          marginBottom: 40,
          textAlign: 'center'
        }
      },
      {
        type: 'skills',
        content: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'AI/ML'],
        style: {
          display: 'flex',
          gap: 16,
          flexWrap: 'wrap',
          justifyContent: 'center',
          marginBottom: 40,
          skillStyle: {
            backgroundColor: 'rgba(59, 130, 246, 0.2)',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            color: '#3b82f6',
            padding: '8px 20px',
            borderRadius: 20,
            fontSize: 16,
            fontWeight: 600
          }
        }
      },
      {
        type: 'bio',
        content: '热爱编程，专注于前端和全栈开发，喜欢探索新技术，分享技术心得',
        style: {
          fontSize: 20,
          color: '#94a3b8',
          lineHeight: 1.5,
          marginBottom: 48,
          maxWidth: 700,
          textAlign: 'center'
        }
      },
      {
        type: 'footer',
        content: "Jack's 主页 - 个人介绍",
        style: {
          fontSize: 18,
          color: '#64748b',
          fontWeight: 500,
          textAlign: 'center'
        }
      }
    ],
    decorations: [
      {
        type: 'circle',
        style: {
          position: 'absolute',
          top: 60,
          right: 60,
          width: 80,
          height: 80,
          borderRadius: '50%',
          backgroundColor: '#8b5cf6',
          opacity: 0.6
        }
      },
      {
        type: 'circle',
        style: {
          position: 'absolute',
          bottom: 60,
          left: 60,
          width: 60,
          height: 60,
          borderRadius: '50%',
          backgroundColor: '#3b82f6',
          opacity: 0.6
        }
      },
      {
        type: 'circle',
        style: {
          position: 'absolute',
          top: '50%',
          left: 40,
          width: 40,
          height: 40,
          borderRadius: '50%',
          backgroundColor: '#10b981',
          opacity: 0.4
        }
      }
    ]
  };

  // 生成 SVG 字符串
  const svgContent = generateSVG(imageData);
  
  return new Response(svgContent, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=31536000, immutable'
    }
  });
}

// SVG 生成函数
function generateSVG(data: ImageData): string {
  return `
    <svg width="${data.width}" height="${data.height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#0f172a;stop-opacity:1" />
          <stop offset="50%" style="stop-color:#1e293b;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#334155;stop-opacity:1" />
        </linearGradient>
        <radialGradient id="decoration1" cx="25%" cy="25%">
          <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:0.1" />
          <stop offset="50%" style="stop-color:transparent;stop-opacity:0" />
        </radialGradient>
        <radialGradient id="decoration2" cx="75%" cy="75%">
          <stop offset="0%" style="stop-color:#8b5cf6;stop-opacity:0.1" />
          <stop offset="50%" style="stop-color:transparent;stop-opacity:0" />
        </radialGradient>
      </defs>
      
      <!-- 背景 -->
      <rect width="100%" height="100%" fill="url(#bg)" />
      <rect width="100%" height="100%" fill="url(#decoration1)" />
      <rect width="100%" height="100%" fill="url(#decoration2)" />
      
      <!-- 装饰圆圈 -->
      <circle cx="${data.width - 60 - 40}" cy="100" r="40" fill="#8b5cf6" opacity="0.6" />
      <circle cx="90" cy="${data.height - 60 - 30}" r="30" fill="#3b82f6" opacity="0.6" />
      <circle cx="60" cy="${data.height / 2}" r="20" fill="#10b981" opacity="0.4" />
      
      <!-- 头像背景 -->
      <circle cx="${data.width / 2}" cy="180" r="70" fill="#3b82f6" stroke="rgba(59, 130, 246, 0.3)" stroke-width="4" />
      
      <!-- 文本内容 -->
      <text x="${data.width / 2}" y="200" text-anchor="middle" font-size="40" fill="white">👨‍💻</text>
      <text x="${data.width / 2}" y="300" text-anchor="middle" font-size="48" font-weight="800" fill="white">关于我</text>
      <text x="${data.width / 2}" y="340" text-anchor="middle" font-size="24" font-weight="600" fill="#10b981">刘正源 (Jack Liu)</text>
      <text x="${data.width / 2}" y="370" text-anchor="middle" font-size="18" fill="#cbd5e1">全栈开发者 | 技术爱好者 | 终身学习者</text>
      
      <!-- 技能标签 -->
      <g transform="translate(${data.width / 2 - 200}, 400)">
        <rect x="0" y="0" width="80" height="30" rx="15" fill="rgba(59, 130, 246, 0.2)" stroke="rgba(59, 130, 246, 0.3)" />
        <text x="40" y="20" text-anchor="middle" font-size="12" font-weight="600" fill="#3b82f6">React</text>
        
        <rect x="90" y="0" width="80" height="30" rx="15" fill="rgba(59, 130, 246, 0.2)" stroke="rgba(59, 130, 246, 0.3)" />
        <text x="130" y="20" text-anchor="middle" font-size="12" font-weight="600" fill="#3b82f6">Next.js</text>
        
        <rect x="180" y="0" width="100" height="30" rx="15" fill="rgba(59, 130, 246, 0.2)" stroke="rgba(59, 130, 246, 0.3)" />
        <text x="230" y="20" text-anchor="middle" font-size="12" font-weight="600" fill="#3b82f6">TypeScript</text>
        
        <rect x="290" y="0" width="80" height="30" rx="15" fill="rgba(59, 130, 246, 0.2)" stroke="rgba(59, 130, 246, 0.3)" />
        <text x="330" y="20" text-anchor="middle" font-size="12" font-weight="600" fill="#3b82f6">Node.js</text>
      </g>
      
      <!-- 个人简介 -->
      <text x="${data.width / 2}" y="480" text-anchor="middle" font-size="16" fill="#94a3b8">热爱编程，专注于前端和全栈开发，喜欢探索新技术，分享技术心得</text>
      
      <!-- 底部信息 -->
      <text x="${data.width / 2}" y="580" text-anchor="middle" font-size="14" font-weight="500" fill="#64748b">Jack's 主页 - 个人介绍</text>
    </svg>
  `;
}
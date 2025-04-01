// 声明这是客户端组件
"use client";

// 导入React的useEffect和useRef钩子
import { useEffect, useRef } from "react";

// 定义背景动画组件的属性接口
interface BackgroundAnimationProps {
  className?: string; // 可选的className属性
}

// 导出背景动画组件
export function BackgroundAnimation({ className }: BackgroundAnimationProps) {
  // 创建canvas元素的引用
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 使用useEffect处理副作用
  useEffect(() => {
    // 获取canvas元素
    const canvas = canvasRef.current;
    if (!canvas) return;

    // 获取2D渲染上下文
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 设置canvas尺寸为窗口大小
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // 初始化调整尺寸
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // 创建粒子数组
    const particlesArray: Particle[] = [];
    const numberOfParticles = 100;

    // 粒子类定义
    class Particle {
      x: number; // 粒子x坐标
      y: number; // 粒子y坐标
      size: number; // 粒子大小
      speedX: number; // x方向速度
      speedY: number; // y方向速度
      color: string; // 粒子颜色

      constructor() {
        // 随机初始化粒子位置
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        // 随机初始化粒子大小(1-4)
        this.size = Math.random() * 3 + 1;
        // 随机初始化速度(-0.5到0.5)
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;

        // 使用主题中的主色调
        const colors = [
          "rgba(var(--primary-rgb), 0.3)",
          "rgba(var(--secondary-rgb), 0.3)",
          "rgba(var(--accent-rgb), 0.3)",
        ];
        // 随机选择颜色
        // 使用非空断言来确保color不会是undefined
        this.color = colors[Math.floor(Math.random() * colors.length)]!;
      }

      // 更新粒子位置
      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // 边界检查，碰到边界就反弹
        if (this.x > canvas!.width || this.x < 0) {
          this.speedX = -this.speedX;
        }
        if (this.y > canvas!.height || this.y < 0) {
          this.speedY = -this.speedY;
        }
      }

      // 绘制粒子
      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // 初始化粒子数组
    function init() {
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
      }
    }
    init();

    // 连接粒子函数
    function connect() {
      if (!ctx) return;
      let opacityValue = 1;
      // 遍历所有粒子对
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          // 计算两个粒子间距离
          const dx = particlesArray[a]!.x - particlesArray[b]!.x;
          const dy = particlesArray[a]!.y - particlesArray[b]!.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // 如果距离小于100，则连线
          if (distance < 100) {
            opacityValue = 1 - distance / 100;
            ctx.strokeStyle = `rgba(var(--primary-rgb), ${opacityValue * 0.2})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a]!.x, particlesArray[a]!.y);
            ctx.lineTo(particlesArray[b]!.x, particlesArray[b]!.y);
            ctx.stroke();
          }
        }
      }
    }

    // 动画循环函数
    function animate() {
      if (!ctx) return;
      // 清除画布
      ctx.clearRect(0, 0, canvas!.width, canvas!.height);

      // 更新并绘制所有粒子 - 使用for...of循环
      for (const particle of particlesArray) {
        particle.update();
        particle.draw();
      }
      // 连接粒子
      connect();
      // 请求下一帧动画
      requestAnimationFrame(animate);
    }
    animate();

    // 清理函数
    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  // 渲染canvas元素
  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 -z-10 ${className ?? ""}`}
      style={{ pointerEvents: "none" }}
    />
  );
}

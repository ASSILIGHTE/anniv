import React, { useEffect, useRef } from 'react';

export const ParticleCanvas = ({ currentPage = 1 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouse = { x: -1000, y: -1000, radius: 120 };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
      }
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('resize', handleResize);

    // Dynamic particle count based on screen size
    const particleCount = window.innerWidth < 768 ? 55 : 110;
    const particles = [];

    // Helper: Draw 3D-styled SVG Heart
    const drawHeart = (ctx, x, y, size) => {
      ctx.beginPath();
      const topCurveHeight = size * 0.3;
      ctx.moveTo(x, y + topCurveHeight);
      ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + topCurveHeight);
      ctx.bezierCurveTo(x - size / 2, y + (size + topCurveHeight) / 2, x, y + size, x, y + size);
      ctx.bezierCurveTo(x, y + size, x + size / 2, y + (size + topCurveHeight) / 2, x + size / 2, y + topCurveHeight);
      ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + topCurveHeight);
      ctx.closePath();
    };

    // Helper: Draw 4-Point Starburst
    const drawStar = (ctx, x, y, size) => {
      ctx.beginPath();
      ctx.moveTo(x, y - size);
      ctx.quadraticCurveTo(x, y, x + size, y);
      ctx.quadraticCurveTo(x, y, x, y + size);
      ctx.quadraticCurveTo(x, y, x - size, y);
      ctx.quadraticCurveTo(x, y, x, y - size);
      ctx.closePath();
    };

    // Helper: Draw Rose Petal
    const drawPetal = (ctx, x, y, size) => {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.quadraticCurveTo(x + size, y - size, x + size * 1.5, y);
      ctx.quadraticCurveTo(x + size, y + size, x, y);
      ctx.closePath();
    };

    // Get color palette based on active page theme (Cyber-Kawaii Pastel Palette)
    const getPageColors = () => {
      switch (currentPage) {
        case 1:
          return ['#a78bfa', '#fb923c', '#34d399', '#f472b6', '#facc15', '#e879f9', '#ffffff'];
        case 2:
          return ['#f5d0fe', '#fb923c', '#c4b5fd', '#34d399', '#f472b6', '#fde047'];
        case 3:
          return ['#a78bfa', '#f43f5e', '#fde047', '#34d399', '#f5d0fe', '#ffffff'];
        case 4:
        default:
          return ['#c084fc', '#fb7185', '#34d399', '#fef08a', '#e879f9', '#ffffff'];
      }
    };

    const createParticle = () => {
      const typeRand = Math.random();
      let type = 'heart';
      if (typeRand < 0.45) type = 'heart';
      else if (typeRand < 0.70) type = 'star';
      else if (typeRand < 0.85) type = 'sparkle';
      else if (typeRand < 0.93) type = 'petal';
      else type = 'bokeh';

      const colors = getPageColors();

      return {
        x: Math.random() * width,
        y: Math.random() * height,
        originX: Math.random() * width,
        originY: Math.random() * height,
        size: type === 'heart' ? Math.random() * 14 + 7
            : type === 'star' ? Math.random() * 8 + 4
            : type === 'petal' ? Math.random() * 10 + 6
            : type === 'bokeh' ? Math.random() * 18 + 10
            : Math.random() * 4 + 2,
        speedY: Math.random() * 1.2 + 0.3,
        speedX: (Math.random() - 0.5) * 0.8,
        opacity: Math.random() * 0.7 + 0.2,
        twinkleSpeed: Math.random() * 0.04 + 0.01,
        twinklePhase: Math.random() * Math.PI * 2,
        type,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.03,
        pulse: Math.random() * Math.PI * 2
      };
    };

    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle());
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        // Floating movement
        p.y -= p.speedY;
        p.x += Math.sin(p.pulse) * p.speedX;
        p.pulse += 0.02;
        p.rotation += p.rotationSpeed;
        p.twinklePhase += p.twinkleSpeed;

        // Twinkle opacity oscillation
        const currentOpacity = Math.max(0.15, Math.min(0.9, p.opacity + Math.sin(p.twinklePhase) * 0.2));

        // Mouse Repulsion Physics
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          const angle = Math.atan2(dy, dx);
          p.x -= Math.cos(angle) * force * 4;
          p.y -= Math.sin(angle) * force * 4;
        }

        // Reset particle position when floating past top of screen
        if (p.y < -40) {
          p.y = height + 30;
          p.x = Math.random() * width;
        }

        ctx.save();
        ctx.globalAlpha = currentOpacity;

        if (p.type === 'heart') {
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.fillStyle = p.color;
          ctx.shadowBlur = 12;
          ctx.shadowColor = p.color;
          drawHeart(ctx, 0, 0, p.size);
          ctx.fill();
        } else if (p.type === 'star') {
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.fillStyle = p.color;
          ctx.shadowBlur = 15;
          ctx.shadowColor = '#ffffff';
          drawStar(ctx, 0, 0, p.size);
          ctx.fill();
        } else if (p.type === 'petal') {
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.fillStyle = p.color;
          ctx.shadowBlur = 6;
          ctx.shadowColor = p.color;
          drawPetal(ctx, 0, 0, p.size);
          ctx.fill();
        } else if (p.type === 'sparkle') {
          ctx.fillStyle = '#ffffff';
          ctx.shadowBlur = 10;
          ctx.shadowColor = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Glowing Ambient Bokeh Halos
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2.5);
          grad.addColorStop(0, p.color);
          grad.addColorStop(1, 'transparent');
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [currentPage]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-1000"
    />
  );
};


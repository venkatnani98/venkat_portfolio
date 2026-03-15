import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// Floating particle background
function ParticleCanvas() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999 }); // cursor position

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let w = (canvas.width = canvas.offsetWidth);
    let h = (canvas.height = canvas.offsetHeight);

    const N = 200;
    const particles = Array.from({ length: N }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.5 + 0.1,
    }));

    let rafId;
    function draw() {
      ctx.clearRect(0, 0, w, h);

      const { x: mx, y: my } = mouseRef.current;

      for (const p of particles) {
        // ── Magnetic attraction toward cursor ──────────────────
        const dx = mx - p.x;
        const dy = my - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 250) {
          // attraction strength — stronger when closer
          const force = (180 - dist) / 180;
          p.vx += (dx / dist) * force * 1.2;
          p.vy += (dy / dist) * force * 1.2;
        }

        // ── Friction — stops particles flying off forever ──────
        p.vx *= 0.88;
        p.vy *= 0.88;

        // ── Move ───────────────────────────────────────────────
        p.x += p.vx;
        p.y += p.vy;

        // Wrap edges
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,229,255,${p.opacity})`;
        ctx.fill();
      }

      // Draw connecting lines
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0,229,255,${0.06 * (1 - dist / 100)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      rafId = requestAnimationFrame(draw);
    }
    draw();

    // ── Mouse tracking ─────────────────────────────────────────
    function onMouseMove(e) {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
    function onMouseLeave() {
      // cursor left section — particles drift freely again
      mouseRef.current = { x: -9999, y: -9999 };
    }

    const onResize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafId);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 0 }}
    />
  );
}

// 3D Tilt card on hover
function TiltCard({ children, className, style }) {
  const ref = useRef(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const sx = useSpring(rx, { stiffness: 200, damping: 20 });
  const sy = useSpring(ry, { stiffness: 200, damping: 20 });

  function handleMove(e) {
    const card = ref.current;
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    rx.set(dy * -8);
    ry.set(dx * 8);
  }
  function handleLeave() {
    rx.set(0);
    ry.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        rotateX: sx,
        rotateY: sy,
        transformStyle: "preserve-3d",
        ...style,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Animated counter
function Counter({ end, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const step = Math.ceil(end / 40);
          const timer = setInterval(() => {
            start += step;
            if (start >= end) { setCount(end); clearInterval(timer); }
            else setCount(start);
          }, 40);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);
  return <span ref={ref}>{count}{suffix}</span>;
}

export default function AboutSection() {
  const highlights = [
    {
      icon: "⚡",
      title: "Strengths",
      items: [
        "System Design & Scalable Architectures",
        "Cloud Pipelines & Automation",
        "Full-Stack Web & Mobile Apps",
        "Data Processing & Optimization",
      ],
    },
    {
      icon: "🧠",
      title: "Mindset",
      items: [
        "Solve → Optimise → Scale → Automate",
        "Code that lasts, not quick hacks",
        "Ownership over excuses",
        "Results talk",
      ],
    },
    {
      icon: "🎯",
      title: "Snapshot",
      items: [
        "3+ yrs building production systems",
        "Mentored 50+ devs",
        "FinTech · EdTech · Analytics",
        "Visit Visa · Immediate Joiner",
      ],
    },
  ];

  return (
    <motion.section
      id="about"
      className="min-h-screen w-full bg-black text-white px-6 md:px-16 py-20 md:py-28 flex flex-col gap-12 relative overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
    >
      <ParticleCanvas />

      {/* Header */}
      <div className="relative z-10">
        <motion.h3
          className="text-4xl md:text-5xl font-extrabold mb-2"
          initial={{ x: -40, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          About Me<span className="text-[#00E5FF]">.</span>
        </motion.h3>
        <p className="text-gray-400 text-base md:text-lg max-w-2xl">
          Senior Software Engineer · Full-Stack Developer · Python / React / Cloud
        </p>
      </div>

      {/* Stats row */}
      <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { val: 3, suffix: "+", label: "Years Experience" },
          { val: 50, suffix: "+", label: "Devs Mentored" },
          { val: 30, suffix: "%+", label: "Pipeline Efficiency ↑" },
          { val: 6, suffix: "", label: "Production Projects" },
        ].map((s) => (
          <div
            key={s.label}
            className="p-4 rounded-xl text-center"
            style={{
              border: "1px solid rgba(0,229,255,0.15)",
              background: "rgba(0,229,255,0.03)",
            }}
          >
            <div
              className="text-3xl font-black"
              style={{ color: "#00E5FF" }}
            >
              <Counter end={s.val} suffix={s.suffix} />
            </div>
            <div className="text-xs text-gray-400 mt-1 tracking-wide">
              {s.label}
            </div>
          </div>
        ))}
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Narrative */}
        <div className="text-gray-300 text-base md:text-lg leading-relaxed space-y-6">
          <p>
            I specialize in building{" "}
            <span className="text-[#00E5FF] font-semibold">
              scalable cloud-native systems, automated data pipelines, and
              full-stack applications
            </span>
            . I care about reliability, performance, and clean architecture —
            not just "getting it to work".
          </p>
          <p>
            I've improved data workflows and processing efficiency by 30%+,
            built automation that replaces repetitive manual work, and delivered
            apps — QR ordering systems, health dashboards, analytics platforms —
            used by real users in production.
          </p>
          <p>
            I've mentored over 50 developers and led projects end-to-end. I take
            ownership, communicate clearly, and solve problems with structure,
            not guesswork.
          </p>
          <p
            className="text-sm px-4 py-3 rounded-lg"
            style={{
              background: "rgba(0,229,255,0.06)",
              border: "1px solid rgba(0,229,255,0.2)",
              color: "#00E5FF",
            }}
          >
            📍 Currently in Dubai, UAE · Visit Visa · Available for Immediate
            Joining
          </p>
        </div>

        {/* Tilt highlight cards */}
        <div className="flex flex-col gap-4">
          {highlights.map((h, idx) => (
            <TiltCard
              key={h.title}
              className="p-5 rounded-xl transition-colors duration-200"
              style={{
                border: "1px solid rgba(0,229,255,0.12)",
                background: "rgba(0,229,255,0.02)",
                cursor: "default",
              }}
            >
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <h4 className="font-bold text-lg mb-3">
                  {h.icon} {h.title}
                </h4>
                <ul className="space-y-1.5 text-gray-300 text-sm">
                  {h.items.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="text-[#00E5FF] text-xs">▸</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </TiltCard>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
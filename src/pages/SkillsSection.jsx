import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const SKILLS = [
  { name: "React.js", color: "#61DAFB", cat: "Frontend" },
  { name: "React Native", color: "#61DAFB", cat: "Mobile" },
  { name: "Next.js", color: "#ffffff", cat: "Frontend" },
  { name: "JavaScript", color: "#F7DF1E", cat: "Frontend" },
  { name: "HTML / CSS", color: "#E34F26", cat: "Frontend" },
  { name: "Python", color: "#3776AB", cat: "Backend" },
  { name: "Django", color: "#44b78b", cat: "Backend" },
  { name: "REST APIs", color: "#00E5FF", cat: "Backend" },
  { name: "Node.js", color: "#6DA55F", cat: "Backend" },
  { name: "Firebase", color: "#FFCA28", cat: "Cloud" },
  { name: "GCP", color: "#4285F4", cat: "Cloud" },
  { name: "BigQuery", color: "#4285F4", cat: "Cloud" },
  { name: "Cloud Run", color: "#4285F4", cat: "Cloud" },
  { name: "Firestore", color: "#FFCA28", cat: "Cloud" },
  { name: "Selenium", color: "#43B02A", cat: "Data" },
  { name: "Pandas", color: "#150458", cat: "Data" },
  { name: "ETL Pipelines", color: "#00E5FF", cat: "Data" },
  { name: "MySQL", color: "#00758F", cat: "Data" },
  { name: "Git", color: "#F05032", cat: "Tools" },
  { name: "CI/CD", color: "#00E5FF", cat: "Tools" },
  { name: "Google Fit API", color: "#4285F4", cat: "Mobile" },
  { name: "Health Connect", color: "#4CAF50", cat: "Mobile" },
  { name: "AI Integration", color: "#E34F26", cat: "Mobile" },
  { name: "Gen AI / LLMs", color: "#a855f7", cat: "Emerging" },
  { name: "Prompt Eng.", color: "#a855f7", cat: "Emerging" },
];

const RADIUS = 180;

// Fibonacci sphere distribution
function fibonacciSphere(n, r) {
  const points = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const rxy = Math.sqrt(1 - y * y);
    const theta = goldenAngle * i;
    points.push({
      x: rxy * Math.cos(theta) * r,
      y: y * r,
      z: rxy * Math.sin(theta) * r,
    });
  }
  return points;
}

const points = fibonacciSphere(SKILLS.length, RADIUS);

export default function SkillsSection() {
  const containerRef = useRef(null);
  const rotRef = useRef({ x: 0.3, y: 0 });
  const velRef = useRef({ x: 0, y: 0 });
  const dragging = useRef(false);
  const lastMouse = useRef({ x: 0, y: 0 });
  const animRef = useRef(null);
  const [tags, setTags] = useState(() => points.map((p, i) => ({ ...p, i })));
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    function rotatePts(ax, ay) {
      const cosX = Math.cos(ax), sinX = Math.sin(ax);
      const cosY = Math.cos(ay), sinY = Math.sin(ay);
      return points.map((p) => {
        // Rotate around Y axis
        const x1 = p.x * cosY - p.z * sinY;
        const z1 = p.x * sinY + p.z * cosY;
        // Rotate around X axis
        const y2 = p.y * cosX - z1 * sinX;
        const z2 = p.y * sinX + z1 * cosX;
        return { x: x1, y: y2, z: z2 };
      });
    }

    function loop() {
      if (!dragging.current) {
        rotRef.current.y += 0.004 + velRef.current.y;
        velRef.current.y *= 0.95;
        velRef.current.x *= 0.95;
      }
      const rotated = rotatePts(rotRef.current.x, rotRef.current.y);
      setTags(rotated.map((p, i) => ({ ...p, i })));
      animRef.current = requestAnimationFrame(loop);
    }
    loop();

    return () => cancelAnimationFrame(animRef.current);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    function onDown(e) {
      dragging.current = true;
      lastMouse.current = { x: e.clientX, y: e.clientY };
    }
    function onMove(e) {
      if (!dragging.current) return;
      const dx = e.clientX - lastMouse.current.x;
      const dy = e.clientY - lastMouse.current.y;
      velRef.current.y = dx * 0.005;
      velRef.current.x = dy * 0.005;
      rotRef.current.y += dx * 0.005;
      rotRef.current.x += dy * 0.005;
      lastMouse.current = { x: e.clientX, y: e.clientY };
    }
    function onUp() { dragging.current = false; }

    el.addEventListener("mousedown", onDown);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      el.removeEventListener("mousedown", onDown);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  const sorted = [...tags].sort((a, b) => a.z - b.z);

  return (
    <motion.section
      id="skills"
      className="min-h-screen w-full bg-black text-white px-6 md:px-16 py-20 md:py-24 flex flex-col gap-10 overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div>
        <h3 className="text-4xl md:text-5xl font-extrabold mb-2">
          Skills<span className="text-[#00E5FF]">.</span>
        </h3>
        <p className="text-gray-400 text-base md:text-lg">
          Drag the globe · hover to explore
        </p>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-12">
        {/* Globe */}
        <div
          ref={containerRef}
          className="relative flex-shrink-0"
          style={{
            width: 420,
            height: 420,
            cursor: "grab",
            userSelect: "none",
          }}
        >
          {/* Globe background glow */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 40% 40%, rgba(0,229,255,0.08) 0%, transparent 70%)",
              boxShadow: "inset 0 0 80px rgba(0,229,255,0.05)",
            }}
          />

          {/* Axis ring */}
          <div
            className="absolute pointer-events-none"
            style={{
              width: RADIUS * 2,
              height: RADIUS * 2,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              borderRadius: "50%",
              border: "1px solid rgba(0,229,255,0.08)",
            }}
          />

          {/* Skill tags */}
          {sorted.map(({ x, y, z, i }) => {
            const skill = SKILLS[i];
            const depth = (z + RADIUS) / (2 * RADIUS); // 0=back, 1=front
            const scale = 0.5 + depth * 0.7;
            const opacity = 0.2 + depth * 0.8;
            const isHovered = hovered === i;

            return (
              <div
                key={i}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${isHovered ? scale * 1.3 : scale})`,
                  opacity: isHovered ? 1 : opacity,
                  zIndex: Math.floor(depth * 100),
                  transition: "transform 0.05s ease, opacity 0.05s ease",
                  cursor: "pointer",
                  pointerEvents: "all",
                }}
              >
                <div
                  style={{
                    padding: "4px 10px",
                    borderRadius: 6,
                    fontSize: isHovered ? 13 : 11,
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                    background: isHovered
                      ? `${skill.color}22`
                      : "rgba(0,0,0,0.6)",
                    border: `1px solid ${isHovered ? skill.color : "rgba(0,229,255,0.2)"}`,
                    color: isHovered ? skill.color : "rgba(255,255,255,0.8)",
                    boxShadow: isHovered
                      ? `0 0 16px ${skill.color}55, 0 0 4px ${skill.color}88`
                      : depth > 0.7
                      ? "0 0 8px rgba(0,229,255,0.15)"
                      : "none",
                    backdropFilter: "blur(4px)",
                    transition: "all 0.15s ease",
                    letterSpacing: "0.02em",
                  }}
                >
                  {skill.name}
                </div>
              </div>
            );
          })}

          {/* Center core glow */}
          <div
            className="absolute pointer-events-none"
            style={{
              width: 20,
              height: 20,
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              borderRadius: "50%",
              background: "#00E5FF",
              boxShadow: "0 0 30px #00E5FF, 0 0 60px rgba(0,229,255,0.3)",
              opacity: 0.6,
            }}
          />
        </div>

        {/* Skill legend by category */}
        <div className="flex-1 grid grid-cols-2 gap-4">
          {["Frontend", "Backend", "Cloud", "Data", "Mobile", "Emerging"].map(
            (cat) => {
              const catSkills = SKILLS.filter((s) => s.cat === cat);
              return (
                <motion.div
                  key={cat}
                  className="p-4 rounded-xl"
                  style={{
                    border: "1px solid rgba(0,229,255,0.12)",
                    background: "rgba(0,229,255,0.02)",
                  }}
                  whileHover={{
                    borderColor: "rgba(0,229,255,0.4)",
                    background: "rgba(0,229,255,0.05)",
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <h4
                    className="text-xs font-bold tracking-widest mb-3"
                    style={{ color: "#00E5FF" }}
                  >
                    {cat.toUpperCase()}
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {catSkills.map((s) => (
                      <span
                        key={s.name}
                        className="text-xs px-2 py-1 rounded"
                        style={{
                          background: `${s.color}18`,
                          border: `1px solid ${s.color}44`,
                          color: "rgba(255,255,255,0.75)",
                        }}
                      >
                        {s.name}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            }
          )}
        </div>
      </div>

      {/* Currently learning banner */}
      <motion.div
        className="flex items-center gap-4 p-4 rounded-xl mt-2"
        style={{
          background: "rgba(168,85,247,0.06)",
          border: "1px solid rgba(168,85,247,0.25)",
        }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div
          className="w-2 h-2 rounded-full animate-pulse"
          style={{ background: "#a855f7" }}
        />
        <span className="text-sm font-semibold" style={{ color: "#a855f7" }}>
          Currently Levelling Up:
        </span>
        <span className="text-sm text-gray-300">
          Generative AI · Multi-Agent Systems · LLM Workflows · Prompt Engineering
        </span>
      </motion.div>
    </motion.section>
  );
}
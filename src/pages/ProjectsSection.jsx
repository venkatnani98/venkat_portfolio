import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const PROJECTS = [
  {
    title: "VRK Waffles — QR-Based Smart POS & Ordering System",
    role: "Full-Stack Developer",
    accent: "#F59E0B",
    tags: ["React.js", "Firebase", "Real-time Sync", "Receipt Printing"],
    tagPrimary: "React.js",
    desc: "Designed and developed a QR-based digital ordering platform — customers scan, browse menu, and place orders from the table. Built the full POS admin dashboard managing the order lifecycle (Placed → Preparing → Ready) with real-time Firebase sync and kitchen receipt printing.",
    bullets: [
      "QR scan → menu → order flow end-to-end",
      "Real-time order sync between customer & POS",
      "Kitchen receipt printing integration",
      "Scalable data model for future payment gateway",
    ],
  },
  {
    title: "Randstad Job Trends & Salary Analysis",
    role: "Senior Software Engineer — Python / Data Engineering",
    accent: "#00E5FF",
    tags: ["Python", "BigQuery", "Cloud Run", "Data Pipelines"],
    tagPrimary: "Python",
    desc: "Built scalable daily job scraping pipelines (Selenium + APIs) covering 50K+ job listings across multiple job boards. Automated end-to-end ingestion with GCP (Cloud Scheduler, Cloud Run, BigQuery), achieving >95% pipeline reliability and improving report accuracy by 30%.",
    bullets: [
      "Automated job ingestion & trend analysis",
      "Salary benchmarking & outlier filtering",
      "Bi-annual Talent & Salary trend reports",
    ],
  },
  {
    title: "myCheckIN — Cross-Platform Health & Fitness App",
    role: "Senior Software Engineer — Tech Lead",
    accent: "#4CAF50",
    tags: ["React Native", "Firebase", "Google Fit", "Health Connect", "Android", "iOS"],
    tagPrimary: "React Native",
    desc: "Built a cross-platform React Native app with Google Fit / Health Connect integrations and Firebase backend. Implemented dashboards, health metrics tracking, authentication, and real-time sync. Managed a team of interns and delivery.",
    bullets: [
      "Google Fit & Health Connect API integration",
      "Real-time health data & progress tracking",
      "Technical leadership & intern mentoring",
    ],
  },
  {
    title: "Nestria Learning Platform",
    role: "Senior Software Engineer — Full-Stack",
    accent: "#8B5CF6",
    tags: ["React", "Firebase", "Cloud Functions"],
    tagPrimary: "React",
    desc: "Improved the React front-end, fixed UI/UX issues, and implemented Firebase backend Cloud Functions to manage user progress and question flows. Helped create a Duolingo-style structured interview-preparation experience.",
    bullets: [
      "Firebase Cloud Functions for user progress",
      "Real-time state & curriculum flow design",
      "Performance & UX optimizations",
    ],
  },
  {
    title: "Spryte — Product Website",
    role: "Full-Stack Engineer",
    accent: "#F97316",
    tags: ["Next.js", "React.js", "Node.js", "Firebase Functions"],
    tagPrimary: "Next.js",
    desc: "Enhanced and maintained a production-grade Next.js website. Fixed frontend issues, created new components and pages, debugged and optimized Firebase Cloud Functions for new feature rollouts.",
    bullets: [
      "Next.js component architecture & new pages",
      "Firebase Cloud Functions debugging & optimization",
      "Production deployment & feature rollouts",
    ],
  },
  {
    title: "College Library Portal",
    role: "Full-Stack Engineer",
    accent: "#06B6D4",
    tags: ["React", "Django", "MySQL"],
    tagPrimary: "React",
    desc: "Built a library management system with authentication, rentals, returns, and student record management using React + Django REST + MySQL. Focused on reliability and real-world workflow automation.",
    bullets: [
      "Full-stack (React + Django REST + MySQL)",
      "Role-based access & operations",
      "Production-like CRUD workflow",
    ],
  },
];

function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const sx = useSpring(rx, { stiffness: 150, damping: 20 });
  const sy = useSpring(ry, { stiffness: 150, damping: 20 });

  function handleMove(e) {
    const card = ref.current;
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    rx.set(dy * -6);
    ry.set(dx * 6);
    // Track mouse for gradient shimmer
    gx.set(((e.clientX - rect.left) / rect.width) * 100);
    gy.set(((e.clientY - rect.top) / rect.height) * 100);
  }
  function handleLeave() {
    rx.set(0);
    ry.set(0);
    gx.set(50);
    gy.set(50);
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
        perspective: 1000,
      }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="rounded-2xl overflow-hidden relative group"
    >
      {/* Shimmer overlay */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none rounded-2xl transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${gx}% ${gy}%, ${project.accent}18 0%, transparent 60%)`,
          zIndex: 1,
        }}
      />

      <div
        className="relative p-6 md:p-8 rounded-2xl transition-all duration-300 group-hover:shadow-2xl"
        style={{
          border: `1px solid rgba(255,255,255,0.08)`,
          background: "rgba(255,255,255,0.02)",
          boxShadow: `0 0 0 1px transparent`,
          transition: "border-color 0.3s, box-shadow 0.3s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = `${project.accent}55`;
          e.currentTarget.style.boxShadow = `0 0 40px ${project.accent}18`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        {/* Accent left bar */}
        <div
          className="absolute left-0 top-6 bottom-6 w-1 rounded-r-full"
          style={{ background: project.accent }}
        />

        <div className="pl-4">
          <div className="flex items-start justify-between gap-4 mb-2">
            <h4 className="text-xl md:text-2xl font-bold leading-tight">
              {project.title}
            </h4>
            <span
              className="text-xs font-mono px-2 py-1 rounded flex-shrink-0"
              style={{
                background: `${project.accent}22`,
                color: project.accent,
                border: `1px solid ${project.accent}44`,
              }}
            >
              #{String(index + 1).padStart(2, "0")}
            </span>
          </div>

          <p className="text-gray-500 text-xs mb-4">{project.role}</p>

          <p className="text-gray-300 leading-relaxed mb-5 text-sm md:text-base">
            {project.desc}
          </p>

          <ul className="space-y-1.5 text-gray-300 text-sm mb-5">
            {project.bullets.map((b) => (
              <li key={b} className="flex items-center gap-2">
                <span style={{ color: project.accent }}>✓</span> {b}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-2">
            <span
              className="px-3 py-1 text-xs font-bold rounded"
              style={{
                background: project.accent,
                color: "#000",
              }}
            >
              {project.tagPrimary}
            </span>
            {project.tags.slice(1).map((t) => (
              <span
                key={t}
                className="px-3 py-1 text-xs rounded"
                style={{
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "rgba(255,255,255,0.6)",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="min-h-screen w-full bg-black text-white px-6 md:px-16 py-20 md:py-24 flex flex-col gap-12"
      style={{ perspective: "1200px" }}
    >
      <div>
        <h3 className="text-4xl md:text-5xl font-extrabold mb-2">
          Projects<span className="text-[#00E5FF]">.</span>
        </h3>
        <p className="text-gray-400 text-base md:text-lg">
          Case studies, not just code snippets. Hover to feel the depth.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.title} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
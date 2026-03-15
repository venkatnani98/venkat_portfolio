import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const education = [
  
  {
    title: "B.E. Computer Science (AMIE)",
    place: "Institute of Engineers (IEI), Kolkata",
    year: "2023",
    score: "72.27%",
    icon: "🎓",
    type: "degree",
    detail: "Distance engineering degree with focus on Computer Science fundamentals, data structures, algorithms, and software engineering.",
  },
  {
    title: "Diploma — Mechanical Engineering",
    place: "TRR College of Technology",
    year: "2016",
    score: "76.6%",
    icon: "⚙️",
    type: "degree",
    detail: "3-year diploma with strong foundations in technical problem solving, precision work, and systems thinking.",
  },
  {
    title: "SSC",
    place: "ZPHS, Neredmet",
    year: "2013",
    score: "8.8 GPA",
    icon: "📚",
    type: "school",
    detail: "Secondary school foundation.",
  },
  {
    title: "Generative AI & Multi-Agent Systems",
    place: "In Progress — Self-directed",
    year: "2025–Present",
    score: null,
    icon: "🤖",
    type: "ongoing",
    detail: "LLM workflows, prompt engineering, AI integrations, multi-agent orchestration and production AI system design.",
  },
  {
    title: "Python Full-Stack Developer Certification",
    place: "Byte Academy",
    year: "Professional Certification",
    score: null,
    icon: "🐍",
    type: "cert",
    detail: "Comprehensive full-stack development covering Python, Django, React, databases, REST APIs, and deployment workflows.",
  },
  {
    title: "Advanced CAD Certification",
    place: "NSIC, ECIL",
    year: "Professional Certification",
    score: null,
    icon: "📐",
    type: "cert",
    detail: "Advanced computer-aided design with focus on precision, technical drawing, and 3D modelling.",
  },
  
];

const typeColors = {
  degree: "#00E5FF",
  cert: "#F59E0B",
  ongoing: "#a855f7",
  school: "#6B7280",
};

function EducationCard({ item, index }) {
  const [flipped, setFlipped] = useState(false);
  const color = typeColors[item.type];

  return (
    <motion.div
      className="relative ml-10 md:ml-14 cursor-pointer"
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={() => setFlipped((f) => !f)}
      style={{ perspective: 600 }}
    >
      {/* Timeline dot */}
      <div
        className="absolute -left-10 md:-left-14 top-3 w-5 h-5 rounded-full flex items-center justify-center text-xs"
        style={{
          background: "#000",
          border: `2px solid ${color}`,
          boxShadow: `0 0 12px ${color}88`,
          zIndex: 2,
        }}
      >
        <span>{item.icon}</span>
      </div>

      {/* Card flip container */}
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.45, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d", position: "relative", height: "auto" }}
      >
        {/* Front */}
        <div
          className="rounded-xl p-5"
          style={{
            border: `1px solid ${color}28`,
            background: `${color}05`,
            backfaceVisibility: "hidden",
          }}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg md:text-xl font-bold text-white leading-tight">
                {item.title}
              </h3>
              <p className="mt-1 text-sm" style={{ color }}>
                {item.place}
              </p>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-xs text-gray-500 font-mono">
                  {item.year}
                </span>
                {item.score && (
                  <>
                    <span className="text-gray-700">·</span>
                    <span
                      className="text-xs font-bold px-2 py-0.5 rounded"
                      style={{
                        background: `${color}22`,
                        color,
                        border: `1px solid ${color}44`,
                      }}
                    >
                      {item.score}
                    </span>
                  </>
                )}
              </div>
            </div>
            <span className="text-xs text-gray-600 flex-shrink-0 font-mono">
              tap to flip ↻
            </span>
          </div>
        </div>

        {/* Back */}
        <div
          className="rounded-xl p-5 absolute inset-0"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            border: `1px solid ${color}55`,
            background: `${color}10`,
          }}
        >
          <p className="text-gray-300 text-sm leading-relaxed">{item.detail}</p>
          <div className="mt-3">
            <span
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color }}
            >
              {item.type === "ongoing" ? "🔄 In Progress" : item.type === "cert" ? "🏆 Certified" : "📖 Completed"}
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function EducationSection() {
  return (
    <motion.section
      id="education"
      className="min-h-screen w-full bg-black text-white px-6 md:px-16 py-24"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-4xl md:text-5xl font-extrabold mb-2">
        Education<span className="text-[#00E5FF]">.</span>
      </h2>
      <p className="text-gray-400 mb-14 text-base md:text-lg">
        Tap any card to flip and learn more.
      </p>

      <div className="relative max-w-3xl">
        {/* Timeline track */}
        <div
          className="absolute left-[9px] md:left-[9px] top-4 bottom-4 w-px"
          style={{
            background: "linear-gradient(to bottom, #00E5FF44, #a855f744, #6B728044)",
          }}
        />

        <div className="flex flex-col gap-6">
          {education.map((item, index) => (
            <EducationCard key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const timeline = [
  {
    year: "May 2023 — Feb 2026",
    role: "Software Engineer (Full-Stack Developer)",
    company: "Byte Academy",
    location: "Bangalore, India",
    color: "#00E5FF",
    points: [
      "Designed and delivered production-grade web and mobile apps using React.js, React Native & Python/Django",
      "Architected REST APIs and integrated real-time Firebase workflows for scalable user interactions",
      "Built QR-based POS system, analytics dashboards, health apps and learning platforms",
      "Implemented authentication flows and optimised frontend rendering performance",
      "Mentored 50+ developers, conducted code reviews, and supported production releases",
    ],
  },
  {
    year: "Oct 2016 — Nov 2022",
    role: "Process Team Lead (FinTech Systems)",
    company: "CAMS — Computer Age Management Services",
    location: "Hyderabad, India",
    color: "#a855f7",
    points: [
      "Led a 10+ member team managing high-volume financial data with 100% accuracy & compliance",
      "Built automation workflows using Python & internal tools reducing manual effort by 40%",
      "Designed process optimisation workflows improving team throughput significantly",
      "Built strong delivery discipline, ownership, and stakeholder communication skills",
      "Owned daily financial operations with critical responsibility",
    ],
  },
];

function TimelineItem({ item, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      className="relative pl-10 md:pl-14"
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
    >
      {/* Dot on timeline */}
      <div
        className="absolute left-0 top-1 w-5 h-5 rounded-full flex items-center justify-center"
        style={{
          border: `2px solid ${item.color}`,
          background: "#000",
          boxShadow: visible ? `0 0 20px ${item.color}, 0 0 40px ${item.color}44` : "none",
          transition: "box-shadow 0.6s ease",
        }}
      >
        <div
          className="w-2 h-2 rounded-full"
          style={{
            background: item.color,
            transition: "transform 0.4s ease",
            transform: visible ? "scale(1)" : "scale(0)",
          }}
        />
      </div>

      {/* Content card */}
      <div
        className="rounded-2xl p-6 md:p-8 relative overflow-hidden"
        style={{
          border: `1px solid rgba(255,255,255,0.06)`,
          background: "rgba(255,255,255,0.015)",
        }}
      >
        {/* Animated left accent */}
        <motion.div
          className="absolute left-0 top-0 bottom-0 w-0.5"
          style={{ background: item.color, originY: 0 }}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: index * 0.2 + 0.3 }}
        />

        <div className="flex flex-wrap items-start justify-between gap-3 mb-1">
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-white">
              {item.role}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span
                className="text-sm font-semibold"
                style={{ color: item.color }}
              >
                {item.company}
              </span>
              <span className="text-gray-600">·</span>
              <span className="text-gray-500 text-sm">{item.location}</span>
            </div>
          </div>
          <span
            className="text-xs font-mono px-3 py-1 rounded-full flex-shrink-0"
            style={{
              background: `${item.color}15`,
              border: `1px solid ${item.color}44`,
              color: item.color,
            }}
          >
            {item.year}
          </span>
        </div>

        <ul className="mt-5 space-y-2">
          {item.points.map((p, i) => (
            <motion.li
              key={i}
              className="flex items-start gap-3 text-gray-300 text-sm md:text-base"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.2 + i * 0.07 + 0.4 }}
            >
              <span
                className="flex-shrink-0 text-xs mt-1"
                style={{ color: item.color }}
              >
                ▸
              </span>
              {p}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export default function ExperienceSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.8", "end 0.2"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <motion.section
      ref={sectionRef}
      id="experience"
      className="min-h-screen w-full bg-black text-white px-6 md:px-16 py-20 md:py-24"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-4xl md:text-5xl font-extrabold mb-2">
        Experience<span className="text-[#00E5FF]">.</span>
      </h2>
      <p className="text-gray-400 mb-14 text-base md:text-lg">
        Work that shaped my engineering mindset.
      </p>

      <div className="relative max-w-4xl">
        {/* Timeline track */}
        <div
          className="absolute left-2.5 top-0 bottom-0 w-px"
          style={{ background: "rgba(255,255,255,0.06)" }}
        />
        {/* Animated fill */}
        <motion.div
          className="absolute left-2.5 top-0 w-px origin-top"
          style={{
            background: "linear-gradient(to bottom, #00E5FF, #a855f7)",
            height: lineHeight,
            boxShadow: "0 0 8px #00E5FF88",
          }}
        />

        <div className="flex flex-col gap-12">
          {timeline.map((item, index) => (
            <TimelineItem key={item.company} item={item} index={index} />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
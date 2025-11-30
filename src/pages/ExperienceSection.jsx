import { motion } from "framer-motion";

const timeline = [
  {
    year: "2023 — Present",
    role: "Senior Software Engineer",
    company: "Byte Academy",
    points: [
      "Built automation scripts & scalable backend services in Python",
      "Improved data pipelines & reliability by 30%+",
      "Developed full-stack apps using React, Django & Firebase",
      "Mentored 50+ developers in a full stack bootcamp",
    ],
  },
  {
    year: "2016 — 2022",
    role: "Process Team Lead (FinTech Systems)",
    company: "CAMS — Computer Age Management Services",
    points: [
      "Managed high-volume financial data with 100% accuracy & compliance",
      "Designed automation workflows reducing manual effort significantly",
      "Led & trained 10+ members in data quality & process optimization",
      "Owned daily financial operations with critical responsibility",
    ],
  },
];

export default function ExperienceSection() {
  return (
    <motion.section
      id="experience"
      className="min-h-screen w-full bg-black text-white px-6 md:px-16 py-20 md:py-24"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-4xl md:text-5xl font-extrabold mb-2">
        Experience<span className="text-[#00E5FF]">.</span>
      </h2>
      <p className="text-gray-400 mb-12 md:mb-16 text-base md:text-lg">
        Work that shaped my engineering mindset.
      </p>

      <div className="relative border-l border-gray-700 ml-4 md:ml-6">
        {timeline.map((item, index) => (
          <motion.div
            key={index}
            className="mb-10 md:mb-14 ml-6 relative"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
          >
            <div className="absolute -left-[31px] w-4 h-4 md:w-5 md:h-5 bg-[#00E5FF] rounded-full shadow-[0_0_15px_#00E5FF]" />

            <span className="text-xs md:text-sm text-gray-400 block mb-1">
              {item.year}
            </span>

            <h3 className="text-xl md:text-2xl font-bold text-white">
              {item.role}
              <span className="text-[#00E5FF] font-light"> @ {item.company}</span>
            </h3>

            <ul className="mt-3 space-y-2 text-gray-300 text-sm md:text-base leading-relaxed">
              {item.points.map((p, i) => (
                <li key={i}>• {p}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

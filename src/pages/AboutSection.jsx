import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <motion.section
      id="about"
      className="min-h-screen w-full bg-black text-white px-6 md:px-16 py-20 md:py-28 flex flex-col gap-10"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      <div>
        <h3 className="text-4xl md:text-5xl font-extrabold mb-3">
          About Me<span className="text-[#00E5FF]">.</span>
        </h3>
        <p className="text-gray-400 text-base md:text-lg max-w-2xl">
          Senior Software Engineer | Full-Stack Developer | Python / React / Cloud
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Narrative */}
        <div className="text-gray-300 text-base md:text-lg leading-relaxed space-y-6">
          <p>
            I specialize in building{" "}
            <span className="text-[#00E5FF] font-semibold">
              scalable cloud-native systems, automated data pipelines, and full-stack
              applications
            </span>
            . I care about reliability, performance, and clean architecture — not
            just “getting it to work”.
          </p>
          <p>
            I’ve improved data workflows and processing efficiency by 30%+, built
            automation that replaces repetitive manual work, and delivered apps used
            by real users in production.
          </p>
          <p>
            I’ve mentored over 50 developers and led projects end-to-end. I take
            ownership, communicate clearly, and solve problems with structure, not
            guesswork.
          </p>
        </div>

        {/* Highlights */}
        <div className="flex flex-col gap-6">
          <div className="p-6 border border-gray-800 rounded-xl hover:border-[#00E5FF] transition">
            <h4 className="font-bold text-lg md:text-xl mb-2">⚡ Strengths</h4>
            <ul className="space-y-2 text-gray-300 text-sm md:text-base">
              <li>• System Design & Scalable Architectures</li>
              <li>• Cloud Pipelines & Automation</li>
              <li>• Full-Stack Web & Mobile Apps</li>
              <li>• Data Processing & Optimization</li>
            </ul>
          </div>

          <div className="p-6 border border-gray-800 rounded-xl hover:border-[#00E5FF] transition">
            <h4 className="font-bold text-lg md:text-xl mb-2">🧠 Mindset</h4>
            <ul className="space-y-2 text-gray-300 text-sm md:text-base">
              <li>• Solve → Optimize → Scale → Automate</li>
              <li>• Code that lasts, not quick hacks</li>
              <li>• Ownership over excuses</li>
              <li>• Results - talk</li>
            </ul>
          </div>

          <div className="p-6 border border-gray-800 rounded-xl hover:border-[#00E5FF] transition">
            <h4 className="font-bold text-lg md:text-xl mb-2">🎯 Snapshot</h4>
            <ul className="space-y-2 text-gray-300 text-sm md:text-base">
              <li>• 3+ years building production systems</li>
              <li>• Mentored 50+ devs</li>
              <li>• Team lead / tech ownership</li>
              <li>• FinTech + EdTech + Analytics projects</li>
            </ul>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

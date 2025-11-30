import { motion } from "framer-motion";

const projectVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.15 },
  }),
};

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="min-h-screen w-full bg-black text-white px-6 md:px-16 py-20 md:py-24 flex flex-col gap-14"
    >
      <div>
        <h3 className="text-4xl md:text-5xl font-extrabold mb-3">
          Projects<span className="text-[#00E5FF]">.</span>
        </h3>
        <p className="text-gray-400 text-base md:text-lg">
          Case studies, not just code snippets.
        </p>
      </div>

      <div className="flex flex-col gap-10">
        {/* Randstad */}
        <motion.div
          className="border border-gray-800 rounded-2xl p-6 md:p-10 hover:border-[#00E5FF] transition"
          variants={projectVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={0}
        >
          <h4 className="text-2xl md:text-3xl font-bold mb-2">
            Randstad Job Trends & Salary Analysis
          </h4>
          <p className="text-gray-400 mb-6 text-xs md:text-sm">
            Senior Software Engineer — Python / Data Engineering
          </p>

          <p className="text-gray-300 leading-relaxed mb-6 text-sm md:text-base">
            Built scalable daily job scraping pipelines (Selenium + APIs) covering
            50K+ job listings across multiple job boards. Automated end-to-end
            ingestion with GCP (Cloud Scheduler, Cloud Run, BigQuery), achieving
            more than 95% pipeline reliability and improving report accuracy by 30%.
          </p>

          <ul className="space-y-2 text-gray-300 text-sm md:text-base mb-6">
            <li>✔ Automated job ingestion & trend analysis</li>
            <li>✔ Salary benchmarking & outlier filtering</li>
            <li>✔ Bi-annual Talent & Salary trend reports</li>
          </ul>

          <div className="flex flex-wrap gap-3 text-xs md:text-sm">
            <span className="px-4 py-2 bg-[#00E5FF] text-black font-semibold rounded-lg">
              Python
            </span>
            <span className="px-4 py-2 border border-gray-600 rounded-lg">
              BigQuery
            </span>
            <span className="px-4 py-2 border border-gray-600 rounded-lg">
              Cloud Run
            </span>
            <span className="px-4 py-2 border border-gray-600 rounded-lg">
              Data Pipelines
            </span>
          </div>
        </motion.div>

        {/* Nestria */}
        <motion.div
          className="border border-gray-800 rounded-2xl p-6 md:p-10 hover:border-[#00E5FF] transition"
          variants={projectVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={1}
        >
          <h4 className="text-2xl md:text-3xl font-bold mb-2">
            Nestria Learning Platform
          </h4>
          <p className="text-gray-400 mb-6 text-xs md:text-sm">
            Senior Software Engineer — Full-Stack
          </p>

          <p className="text-gray-300 leading-relaxed mb-6 text-sm md:text-base">
            Improved the React front-end, fixed UI/UX issues, and implemented
            Firebase backend functions to manage user progress and question flows.
            Helped create a Duolingo-style structured interview-preparation
            experience.
          </p>

          <ul className="space-y-2 text-gray-300 text-sm md:text-base mb-6">
            <li>✔ Full-stack (React + Firebase)</li>
            <li>✔ Curriculum & question flow design</li>
            <li>✔ Performance & UX optimizations</li>
          </ul>

          <div className="flex flex-wrap gap-3 text-xs md:text-sm">
            <span className="px-4 py-2 bg-[#00E5FF] text-black font-semibold rounded-lg">
              React
            </span>
            <span className="px-4 py-2 border border-gray-600 rounded-lg">
              Firebase
            </span>
            <span className="px-4 py-2 border border-gray-600 rounded-lg">
              Firestore
            </span>
          </div>
        </motion.div>

        {/* myCheckIN */}
        <motion.div
          className="border border-gray-800 rounded-2xl p-6 md:p-10 hover:border-[#00E5FF] transition"
          variants={projectVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={2}
        >
          <h4 className="text-2xl md:text-3xl font-bold mb-2">
            myCheckIN — Health App & Dashboard
          </h4>
          <p className="text-gray-400 mb-6 text-xs md:text-sm">
            Senior Software Engineer — Tech Lead
          </p>

          <p className="text-gray-300 leading-relaxed mb-6 text-sm md:text-base">
            Built a cross-platform React Native app with Google Fit / Health
            Connect integrations and Firebase backend. Implemented dashboards,
            health metrics tracking, authentication, and real-time sync. Managed a
            team of interns and delivery.
          </p>

          <ul className="space-y-2 text-gray-300 text-sm md:text-base mb-6">
            <li>✔ Google Fit & Health Connect integration</li>
            <li>✔ Real-time health data & progress tracking</li>
            <li>✔ Technical leadership & mentoring</li>
          </ul>

          <div className="flex flex-wrap gap-3 text-xs md:text-sm">
            <span className="px-4 py-2 bg-[#00E5FF] text-black font-semibold rounded-lg">
              React Native
            </span>
            <span className="px-4 py-2 border border-gray-600 rounded-lg">
              Firebase
            </span>
            <span className="px-4 py-2 border border-gray-600 rounded-lg">
              GCP
            </span>
            <span className="px-4 py-2 border border-gray-600 rounded-lg">
              Android
            </span>
          </div>
        </motion.div>

        {/* Library Portal */}
        <motion.div
          className="border border-gray-800 rounded-2xl p-6 md:p-10 hover:border-[#00E5FF] transition"
          variants={projectVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={3}
        >
          <h4 className="text-2xl md:text-3xl font-bold mb-2">
            College Library Portal
          </h4>
          <p className="text-gray-400 mb-6 text-xs md:text-sm">
            Full-Stack Engineer
          </p>

          <p className="text-gray-300 leading-relaxed mb-6 text-sm md:text-base">
            Built a library management system with authentication, rentals,
            returns, and student record management using React + Django REST +
            MySQL. Focused on reliability and real-world workflow automation.
          </p>

          <ul className="space-y-2 text-gray-300 text-sm md:text-base mb-6">
            <li>✔ Full-stack (React + Django + MySQL)</li>
            <li>✔ Role-based access & operations</li>
            <li>✔ Production-like CRUD workflow</li>
          </ul>

          <div className="flex flex-wrap gap-3 text-xs md:text-sm">
            <span className="px-4 py-2 bg-[#00E5FF] text-black font-semibold rounded-lg">
              React
            </span>
            <span className="px-4 py-2 border border-gray-600 rounded-lg">
              Django
            </span>
            <span className="px-4 py-2 border border-gray-600 rounded-lg">
              MySQL
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

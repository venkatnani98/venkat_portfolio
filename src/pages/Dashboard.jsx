import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

export default function HeroSection() {
  return (
    <motion.section
      id="home"
      className="min-h-screen w-full flex flex-col md:flex-row items-center justify-between px-6 md:px-16 bg-black text-white relative overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      variants={container}
    >
      {/* Left content */}
      <div className="flex flex-col gap-6 w-full md:w-[60%] pr-6 z-10">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
          VENKATA RAMAKRISHNA<span className="text-[#00E5FF]"> TAGARAMPUDI</span>
        </h1>

        <h2 className="text-2xl md:text-3xl font-semibold opacity-90">
          Senior Software Engineer & Full-Stack Developer
        </h2>

        <p className="text-base md:text-lg text-gray-300 leading-relaxed">
          I build scalable data-driven systems, automate workflows, and deliver
          real products end-to-end — from backend data pipelines to modern web
          and mobile applications.
          <br />
          <br />
          Python, React, Django, Firebase, Google Cloud. 3+ years shipping
          production systems.
        </p>

        <div className="flex flex-wrap gap-4 mt-4">
          <a
            href="#projects"
            className="px-6 py-3 bg-[#00E5FF] text-black font-bold rounded-lg hover:bg-[#00b3c9] transition cursor-pointer"
          >
            View Projects
          </a>

          <a
            href="/Resume -  Venkata Ramakrishna Tagarampudi.pdf"
            className="px-6 py-3 border border-gray-400 rounded-lg hover:bg-gray-200 hover:text-black transition cursor-pointer"
          >
            Download Resume
          </a>
        </div>

        <div className="text-gray-400 text-xs md:text-sm mt-4">
          Hyderabad, India • +91 7702306256 • venkataramakrishna98@gmail.com
        </div>
      </div>

      {/* Right visual */}
      <div className="w-full md:w-[40%] flex justify-center mt-12 md:mt-0 relative">
        <div className="animate-pulse-slow w-64 h-64 md:w-72 md:h-72 rounded-full bg-[#00E5FF] opacity-20 blur-3xl absolute" />
        <motion.div
        className="relative w-96 h-96 md:w-[28rem] md:h-[28rem] rounded-full overflow-hidden 
                    shadow-[0_0_90px_#00E5FF] border-4 border-[#00E5FF]"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        >
        <img
            src="/Propic.png"
            alt="Portfolio Headshot"
            className="w-100 h-100 object-cover"
        />
        </motion.div>

      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center text-gray-400">
        <span className="text-xs md:text-sm tracking-widest">SCROLL</span>
        <div className="animate-bounce text-xl">↓</div>
      </div>
    </motion.section>
  );
}

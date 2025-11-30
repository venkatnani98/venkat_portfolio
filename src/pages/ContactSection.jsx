import { motion } from "framer-motion";

export default function ContactSection() {
  return (
    <motion.section
      id="contact"
      className="min-h-[60vh] w-full bg-black text-white px-6 md:px-16 py-20 md:py-28 flex flex-col items-center justify-center text-center"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
        Let&apos;s Build Something Meaningful
        <span className="text-[#00E5FF]">.</span>
      </h2>

      <p className="text-gray-400 text-base md:text-lg max-w-xl">
        If you want someone who can solve real problems, move fast, and ship
        reliable systems — reach out.
      </p>

      <div className="mt-8 space-y-2 text-base md:text-lg">
        <p className="text-[#00E5FF] font-semibold tracking-wide">CONTACT</p>
        <p className="text-gray-300">📩 venkataramakrishna98@gmail.com</p>
        <p className="text-gray-300">📞 +91 7702306256</p>
      </div>

      <div className="flex gap-6 mt-8 text-sm md:text-base">
        <a
          href="https://github.com/venkatnani98"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#00E5FF] transition"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/venkataramakrishna98/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#00E5FF] transition"
        >
          LinkedIn
        </a>
        <a
          href="mailto:venkataramakrishna98@gmail.com"
          className="hover:text-[#00E5FF] transition"
        >
          Email
        </a>
      </div>

      <div className="mt-10 px-8 py-4 bg-[#00E5FF] text-black font-bold text-base md:text-lg rounded-lg hover:bg-[#00b3c9] transition">
        Thank you
      </div>

      <p className="text-gray-600 text-xs md:text-sm mt-4">
        No fluff. No delays. Just execution.
      </p>
    </motion.section>
  );
}

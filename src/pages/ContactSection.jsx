import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const TERMINAL_LINES = [
  { delay: 0, text: "$ whoami", color: "#00E5FF" },
  { delay: 600, text: "  Venkata Ramakrishna Tagarampudi", color: "#e2e8f0" },
  { delay: 1000, text: "$ cat role.txt", color: "#00E5FF" },
  { delay: 1600, text: "  Full-Stack Developer | React · Python · Firebase · GCP", color: "#e2e8f0" },
  { delay: 2000, text: "$ echo $LOCATION", color: "#00E5FF" },
  { delay: 2600, text: "  Dubai, UAE 🇦🇪  |  Visit Visa  |  Immediate Joining", color: "#4ade80" },
  { delay: 3000, text: "$ echo $STATUS", color: "#00E5FF" },
  { delay: 3600, text: "  ✅ OPEN TO OPPORTUNITIES", color: "#4ade80" },
  { delay: 4000, text: "$ cat contact.json", color: "#00E5FF" },
  {
    delay: 4600,
    text: '  { "email": "venkataramakrishnatagarampudi@gmail.com" }',
    color: "#F59E0B",
  },
  { delay: 5000, text: '  { "phone": "+971-502211631" }', color: "#F59E0B" },
  { delay: 5400, text: "$ _", color: "#00E5FF", blink: true },
];

function TerminalLine({ line, show }) {
  const [text, setText] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!show) return;
    let i = 0;
    const interval = setInterval(() => {
      if (i <= line.text.length) {
        setText(line.text.slice(0, i));
        i++;
      } else {
        setDone(true);
        clearInterval(interval);
      }
    }, 22);
    return () => clearInterval(interval);
  }, [show, line.text]);

  if (!show) return null;
  return (
    <div className="font-mono text-sm md:text-base leading-relaxed">
      <span style={{ color: line.color }}>{text}</span>
      {!done && <span className="animate-pulse text-[#00E5FF]">▌</span>}
      {done && line.blink && (
        <span className="animate-[blink_1s_step-end_infinite] text-[#00E5FF]">▌</span>
      )}
    </div>
  );
}

export default function ContactSection() {
  const sectionRef = useRef(null);
  const [visibleLines, setVisibleLines] = useState([]);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started) {
          setStarted(true);
          TERMINAL_LINES.forEach((line, i) => {
            setTimeout(() => {
              setVisibleLines((prev) => [...prev, i]);
            }, line.delay);
          });
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, [started]);

  return (
    <motion.section
      ref={sectionRef}
      id="contact"
      className="min-h-screen w-full bg-black text-white px-6 md:px-16 py-20 md:py-28 flex flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h2
        className="text-4xl md:text-5xl font-extrabold mb-3 text-center"
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Let&apos;s Build Something
        <span className="text-[#00E5FF]">.</span>
      </motion.h2>
      <motion.p
        className="text-gray-400 text-base md:text-lg max-w-xl text-center mb-12"
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        If you want someone who solves real problems, ships fast, and builds
        reliable systems — let's talk.
      </motion.p>

      {/* Terminal */}
      <motion.div
        className="w-full max-w-2xl rounded-2xl overflow-hidden"
        initial={{ scale: 0.95, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        style={{
          background: "#0a0a0f",
          border: "1px solid rgba(0,229,255,0.2)",
          boxShadow: "0 0 60px rgba(0,229,255,0.08)",
        }}
      >
        {/* Terminal titlebar */}
        <div
          className="flex items-center gap-2 px-4 py-3 border-b"
          style={{ borderColor: "rgba(0,229,255,0.1)" }}
        >
          <div className="w-3 h-3 rounded-full bg-red-500 opacity-80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-80" />
          <div className="w-3 h-3 rounded-full bg-green-500 opacity-80" />
          <span
            className="ml-3 text-xs font-mono"
            style={{ color: "rgba(255,255,255,0.3)" }}
          >
            vrk@portfolio ~ bash
          </span>
        </div>

        {/* Terminal body */}
        <div className="p-6 space-y-1 min-h-[320px]">
          {TERMINAL_LINES.map((line, i) => (
            <TerminalLine key={i} line={line} show={visibleLines.includes(i)} />
          ))}
        </div>
      </motion.div>

      {/* Links */}
      <motion.div
        className="flex flex-wrap justify-center gap-4 mt-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        {[
          {
            label: "📩 Email",
            href: "https://mail.google.com/mail/?view=cm&to=venkataramakrishnatagarampudi@gmail.com",
            color: "#00E5FF",
          },
          {
            label: "💬 WhatsApp",
            href: "https://wa.me/971502211631",
            color: "#25D366",
          },
          {
            label: "LinkedIn",
            href: "https://www.linkedin.com/in/venkataramakrishnatagarampudi/",
            color: "#0A66C2",
          },
          {
            label: "GitHub",
            href: "https://github.com/venkatnani98",
            color: "#fff",
          },
        ].map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200"
            style={{
              border: `1px solid ${link.color}55`,
              color: link.color,
              background: `${link.color}08`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = `${link.color}20`;
              e.currentTarget.style.boxShadow = `0 0 20px ${link.color}33`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = `${link.color}08`;
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            {link.label}
          </a>
        ))}
      </motion.div>

      <div className="mt-12 text-center">
        <div
          className="inline-block px-8 py-3 rounded-lg font-bold text-black text-base cursor-default"
          style={{
            background: "#00E5FF",
            boxShadow: "0 0 30px rgba(0,229,255,0.5)",
          }}
        >
          Thank you for visiting 🙏
        </div>
        <p className="text-gray-600 text-xs mt-4 font-mono">
          No fluff. No delays. Just execution.
        </p>
      </div>

      <style>{`
        @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }
      `}</style>
    </motion.section>
  );
}
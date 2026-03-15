import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);

    // Active section detection
    const sections = links.map((l) => document.querySelector(l.href));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive("#" + e.target.id);
        });
      },
      { threshold: 0.3 }
    );
    sections.forEach((s) => s && observer.observe(s));

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <header
        className="fixed top-0 left-0 w-full z-30 transition-all duration-300"
        style={{
          background: scrolled
            ? "rgba(0,0,0,0.85)"
            : "rgba(0,0,0,0.4)",
          backdropFilter: "blur(16px)",
          borderBottom: scrolled
            ? "1px solid rgba(0,229,255,0.12)"
            : "1px solid transparent",
          boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.5)" : "none",
        }}
      >
        <nav className="max-w-7xl mx-auto flex items-center justify-between px-5 py-3">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 group">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-black text-sm font-black"
              style={{
                background: "#00E5FF",
                boxShadow: "0 0 16px rgba(0,229,255,0.5)",
              }}
            >
              VR
            </div>
            <span className="hidden sm:block text-sm font-bold tracking-tight text-white group-hover:text-[#00E5FF] transition-colors">
              TAGARAMPUDI
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1 text-sm">
            {links.map((link) => {
              const isActive = active === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className="relative px-3 py-1.5 rounded-lg transition-colors duration-200"
                  style={{
                    color: isActive ? "#00E5FF" : "rgba(255,255,255,0.6)",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#00E5FF")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = isActive
                      ? "#00E5FF"
                      : "rgba(255,255,255,0.6)")
                  }
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute bottom-0 left-0 right-0 h-px"
                      style={{ background: "#00E5FF" }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* CTA */}
          <a
            href="https://mail.google.com/mail/?view=cm&to=venkataramakrishnatagarampudi@gmail.com" target="_blank" rel="noreferrer"
            className="hidden md:block text-xs font-bold px-4 py-2 rounded-lg transition-all duration-200"
            style={{
              background: "rgba(0,229,255,0.1)",
              border: "1px solid rgba(0,229,255,0.3)",
              color: "#00E5FF",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(0,229,255,0.2)";
              e.currentTarget.style.boxShadow = "0 0 20px rgba(0,229,255,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(0,229,255,0.1)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Hire Me
          </a>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            <motion.span
              className="block w-5 h-0.5 bg-white"
              animate={{ rotate: open ? 45 : 0, y: open ? 8 : 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block w-5 h-0.5 bg-white"
              animate={{ opacity: open ? 0 : 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block w-5 h-0.5 bg-white"
              animate={{ rotate: open ? -45 : 0, y: open ? -8 : 0 }}
              transition={{ duration: 0.2 }}
            />
          </button>
        </nav>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-20 flex flex-col pt-16 px-6 pb-8 md:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            style={{
              background: "rgba(0,0,0,0.97)",
              backdropFilter: "blur(20px)",
            }}
          >
            <div className="flex flex-col gap-4 mt-8">
              {links.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-2xl font-bold transition-colors"
                  style={{ color: active === link.href ? "#00E5FF" : "rgba(255,255,255,0.7)" }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
            <div className="mt-auto text-xs text-gray-600 font-mono">
              Dubai, UAE · +971-502211631
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
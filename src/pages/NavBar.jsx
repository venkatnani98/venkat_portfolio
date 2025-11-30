export default function Navbar() {
  const links = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-30 bg-black/70 backdrop-blur border-b border-gray-800">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <div className="text-xl font-bold tracking-tight text-white">
          VENKATA RAMAKRISHNA <span className="text-[#00E5FF]">TAGARAMPUDI</span>
        </div>

        <div className="hidden md:flex gap-8 text-sm">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-gray-300 hover:text-[#00E5FF] transition"
            >
              {link.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}

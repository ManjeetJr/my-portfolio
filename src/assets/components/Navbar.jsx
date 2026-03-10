import { useState, useEffect } from "react";

const NAV_LINKS = [
  { href: "#hero",       label: "Home",     glyph: "⌂" },
  { href: "#about",      label: "About",    glyph: "📖" },
  { href: "#projects",   label: "Quests",   glyph: "⚔" },
  { href: "#skills",     label: "Skills",   glyph: "🛡" },
  { href: "#experience", label: "Journey",  glyph: "🗺" },
  { href: "#contact",    label: "Contact",  glyph: "✉" },
];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [active,   setActive]     = useState("#hero");
  const [menuOpen, setMenuOpen]   = useState(false);
  const [hovered,  setHovered]    = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Cinzel:wght@400;600&display=swap');

        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-12px); }
          to   { opacity: 1; transform: translateY(0);     }
        }
        @keyframes runeGlow {
          0%,100% { text-shadow: 0 0 8px rgba(212,175,55,0.4); }
          50%      { text-shadow: 0 0 20px rgba(212,175,55,0.9), 0 0 40px rgba(212,175,55,0.3); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(30px); }
          to   { opacity: 1; transform: translateX(0);    }
        }

        .nav-link-item {
          position: relative;
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 8px 16px;
          font-family: 'Cinzel', serif;
          font-size: 12px;
          letter-spacing: 2px;
          text-transform: uppercase;
          text-decoration: none;
          color: rgba(220,200,160,0.65);
          border: 1px solid transparent;
          border-radius: 3px;
          transition: all 0.25s ease;
          cursor: pointer;
        }
        .nav-link-item:hover,
        .nav-link-item.active {
          color: #d4af37;
          border-color: rgba(212,175,55,0.35);
          background: rgba(212,175,55,0.06);
          text-shadow: 0 0 12px rgba(212,175,55,0.5);
        }
        .nav-link-item::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 1px;
          background: #d4af37;
          transition: width 0.3s ease;
        }
        .nav-link-item:hover::after,
        .nav-link-item.active::after {
          width: 60%;
        }

        .hamburger-line {
          width: 24px;
          height: 2px;
          background: rgba(212,175,55,0.8);
          border-radius: 2px;
          transition: all 0.3s ease;
        }
        .mobile-menu-link {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 24px;
          font-family: 'Cinzel', serif;
          font-size: 13px;
          letter-spacing: 2px;
          text-transform: uppercase;
          text-decoration: none;
          color: rgba(220,200,160,0.75);
          border-bottom: 1px solid rgba(212,175,55,0.1);
          transition: all 0.2s ease;
          animation: slideIn 0.3s ease forwards;
        }
        .mobile-menu-link:hover {
          color: #d4af37;
          background: rgba(212,175,55,0.06);
          padding-left: 32px;
        }
      `}</style>

      <nav style={{ ...styles.nav, ...(scrolled ? styles.navScrolled : {}) }}>

        {/* Left ornament */}
        <div style={styles.ornament}>⬧</div>

        {/* Logo */}
        <a href="#hero" style={styles.logoWrap}>
          <span style={styles.logoGlyph}>⚔</span>
          <span style={styles.logoText}>Manjeet</span>
          <span style={styles.logoDim}>.dev</span>
        </a>

        {/* Desktop links */}
        <div style={styles.links}>
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`nav-link-item${active === link.href ? " active" : ""}`}
              onClick={() => { setActive(link.href); setMenuOpen(false); }}
              onMouseEnter={() => setHovered(link.href)}
              onMouseLeave={() => setHovered(null)}
            >
              <span style={{ fontSize: "13px", opacity: hovered === link.href || active === link.href ? 1 : 0.5 }}>
                {link.glyph}
              </span>
              {link.label}
            </a>
          ))}
        </div>

        {/* Right ornament */}
        <div style={styles.ornament}>⬧</div>

        {/* Hamburger (mobile) */}
        <button
          style={styles.hamburger}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <div className="hamburger-line"
            style={menuOpen ? { transform: "rotate(45deg) translate(4px,4px)" } : {}} />
          <div className="hamburger-line"
            style={menuOpen ? { opacity: 0 } : {}} />
          <div className="hamburger-line"
            style={menuOpen ? { transform: "rotate(-45deg) translate(4px,-4px)" } : {}} />
        </button>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div style={styles.mobileMenu}>
          <div style={styles.mobileDivider}>
            <div style={styles.mobileDividerLine} />
            <span style={styles.mobileDividerGlyph}>⬧ MENU ⬧</span>
            <div style={styles.mobileDividerLine} />
          </div>
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              className="mobile-menu-link"
              style={{ animationDelay: `${i * 0.05}s` }}
              onClick={() => { setActive(link.href); setMenuOpen(false); }}
            >
              <span>{link.glyph}</span>
              {link.label}
            </a>
          ))}
        </div>
      )}
    </>
  );
}

const styles = {
  nav: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "18px 40px",
    background: "rgba(10,7,5,0.5)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    borderBottom: "1px solid rgba(212,175,55,0.08)",
    transition: "all 0.4s ease",
    fontFamily: "'Cinzel', serif",
  },
  navScrolled: {
    padding: "12px 40px",
    background: "rgba(10,7,5,0.92)",
    borderBottom: "1px solid rgba(212,175,55,0.2)",
    boxShadow: "0 4px 30px rgba(0,0,0,0.5)",
  },
  ornament: {
    color: "rgba(212,175,55,0.3)",
    fontSize: "16px",
    userSelect: "none",
    display: "block",
  },
  logoWrap: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    textDecoration: "none",
    flexShrink: 0,
  },
  logoGlyph: {
    fontSize: "18px",
    filter: "sepia(1) saturate(3) hue-rotate(10deg)",
    animation: "runeGlow 3s ease-in-out infinite",
  },
  logoText: {
    fontFamily: "'Cinzel Decorative', cursive",
    fontSize: "20px",
    fontWeight: 700,
    background: "linear-gradient(135deg, #d4af37, #f5e17a, #a87c2a, #d4af37)",
    backgroundSize: "300% auto",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    animation: "shimmer 4s linear infinite",
    letterSpacing: "2px",
  },
  logoDim: {
    fontFamily: "'Cinzel', serif",
    fontSize: "13px",
    color: "rgba(212,175,55,0.35)",
    letterSpacing: "1px",
  },
  links: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },
  hamburger: {
    display: "none",
    flexDirection: "column",
    gap: "5px",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "6px",
    zIndex: 1001,
  },
  mobileMenu: {
    position: "fixed",
    top: "64px",
    left: 0,
    right: 0,
    zIndex: 999,
    background: "rgba(10,7,5,0.97)",
    borderBottom: "1px solid rgba(212,175,55,0.2)",
    backdropFilter: "blur(12px)",
    animation: "fadeDown 0.25s ease forwards",
  },
  mobileDivider: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 24px",
  },
  mobileDividerLine: {
    flex: 1,
    height: "1px",
    background: "rgba(212,175,55,0.2)",
  },
  mobileDividerGlyph: {
    fontFamily: "'Cinzel', serif",
    fontSize: "10px",
    letterSpacing: "3px",
    color: "rgba(212,175,55,0.5)",
  },
};
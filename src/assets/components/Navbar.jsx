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
  const [scrolled, setScrolled] = useState(false);
  const [active,   setActive]   = useState("#hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const [hovered,  setHovered]  = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

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
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes runeGlow {
          0%,100% { text-shadow: 0 0 8px rgba(212,175,55,0.4); }
          50%      { text-shadow: 0 0 20px rgba(212,175,55,0.9), 0 0 40px rgba(212,175,55,0.3); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-20px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes overlayFade {
          from { opacity: 0; }
          to   { opacity: 1; }
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
          white-space: nowrap;
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
        .nav-link-item.active::after { width: 60%; }

        .hamburger-btn {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: 1px solid rgba(212,175,55,0.2);
          border-radius: 4px;
          cursor: pointer;
          padding: 8px;
          z-index: 1002;
          transition: border-color 0.3s ease;
        }
        .hamburger-btn:hover { border-color: rgba(212,175,55,0.5); }

        .hamburger-line {
          width: 22px;
          height: 2px;
          background: rgba(212,175,55,0.8);
          border-radius: 2px;
          transition: all 0.3s ease;
          display: block;
        }

        .mobile-overlay {
          display: none;
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.6);
          z-index: 998;
          animation: overlayFade 0.25s ease forwards;
        }

        .mobile-drawer {
          display: none;
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          width: min(80vw, 300px);
          z-index: 999;
          background: rgba(8,5,3,0.98);
          border-left: 1px solid rgba(212,175,55,0.2);
          backdrop-filter: blur(16px);
          flex-direction: column;
          padding-top: 80px;
          animation: slideDrawer 0.3s ease forwards;
          overflow-y: auto;
        }

        @keyframes slideDrawer {
          from { transform: translateX(100%); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }

        .mobile-menu-link {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 16px 28px;
          font-family: 'Cinzel', serif;
          font-size: 13px;
          letter-spacing: 2px;
          text-transform: uppercase;
          text-decoration: none;
          color: rgba(220,200,160,0.75);
          border-bottom: 1px solid rgba(212,175,55,0.08);
          transition: all 0.2s ease;
          animation: slideIn 0.3s ease forwards;
          opacity: 0;
          animation-fill-mode: forwards;
        }
        .mobile-menu-link:hover,
        .mobile-menu-link.active {
          color: #d4af37;
          background: rgba(212,175,55,0.06);
          padding-left: 36px;
        }

        .desktop-ornament { display: block; }
        .desktop-links    { display: flex; }

        /* ── TABLET ── */
        @media (max-width: 1024px) {
          .desktop-ornament { display: none !important; }
          .nav-link-item { padding: 8px 10px; font-size: 11px; letter-spacing: 1px; }
        }

        /* ── MOBILE ── */
        @media (max-width: 768px) {
          .desktop-links    { display: none !important; }
          .desktop-ornament { display: none !important; }
          .hamburger-btn    { display: flex !important; }
          .mobile-overlay   { display: block; }
          .mobile-drawer    { display: flex; }
        }
      `}</style>

      {/* NAV BAR */}
      <nav style={{ ...styles.nav, ...(scrolled ? styles.navScrolled : {}) }}>

        {/* Left ornament — hidden on tablet/mobile via CSS */}
        <div className="desktop-ornament" style={styles.ornament}>⬧</div>

        {/* Logo */}
        <a href="#hero" style={styles.logoWrap}>
          <span style={styles.logoGlyph}>⚔</span>
          <span style={styles.logoText}>Manjeet</span>
          <span style={styles.logoDim}>.dev</span>
        </a>

        {/* Desktop links */}
        <div className="desktop-links" style={styles.links}>
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
        <div className="desktop-ornament" style={styles.ornament}>⬧</div>

        {/* Hamburger button */}
        <button
          className="hamburger-btn"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span className="hamburger-line"
            style={menuOpen ? { transform: "rotate(45deg) translate(5px, 5px)" } : {}} />
          <span className="hamburger-line"
            style={menuOpen ? { opacity: 0, transform: "scaleX(0)" } : {}} />
          <span className="hamburger-line"
            style={menuOpen ? { transform: "rotate(-45deg) translate(5px, -5px)" } : {}} />
        </button>
      </nav>

      {/* Mobile overlay — only renders when open */}
      {menuOpen && (
        <div
          className="mobile-overlay"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Mobile side drawer */}
      {menuOpen && (
        <div className="mobile-drawer">
          {/* Drawer header */}
          <div style={styles.drawerHeader}>
            <div style={styles.drawerLine} />
            <span style={styles.drawerLabel}>⬧ MENU ⬧</span>
            <div style={styles.drawerLine} />
          </div>

          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              className={`mobile-menu-link${active === link.href ? " active" : ""}`}
              style={{ animationDelay: `${i * 0.06}s` }}
              onClick={() => { setActive(link.href); setMenuOpen(false); }}
            >
              <span style={{ fontSize: "18px" }}>{link.glyph}</span>
              {link.label}
            </a>
          ))}

          {/* Drawer footer ornament */}
          <div style={styles.drawerFooter}>
            <span style={{ color: "rgba(212,175,55,0.25)", fontSize: "22px" }}>⚔</span>
          </div>
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
    fontSize: "clamp(15px, 4vw, 20px)",
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
    fontSize: "clamp(11px, 2vw, 13px)",
    color: "rgba(212,175,55,0.35)",
    letterSpacing: "1px",
  },
  links: {
    alignItems: "center",
    gap: "4px",
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "0 24px 16px",
    marginBottom: "8px",
    borderBottom: "1px solid rgba(212,175,55,0.15)",
  },
  drawerLine: {
    flex: 1,
    height: "1px",
    background: "rgba(212,175,55,0.2)",
  },
  drawerLabel: {
    fontFamily: "'Cinzel', serif",
    fontSize: "10px",
    letterSpacing: "3px",
    color: "rgba(212,175,55,0.5)",
    whiteSpace: "nowrap",
  },
  drawerFooter: {
    marginTop: "auto",
    padding: "32px",
    display: "flex",
    justifyContent: "center",
  },
};
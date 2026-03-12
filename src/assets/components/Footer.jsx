import { useState } from "react";

const NAV_LINKS = [
  { href: "#hero",       label: "Home",    glyph: "⌂" },
  { href: "#about",      label: "About",   glyph: "📖" },
  { href: "#projects",   label: "Quests",  glyph: "⚔" },
  { href: "#skills",     label: "Skills",  glyph: "🛡" },
  { href: "#experience", label: "Journey", glyph: "🗺" },
  { href: "#contact",    label: "Contact", glyph: "✉" },
];

const SOCIAL = [
  { label: "GitHub",    href: "https://github.com/ManjeetJr",          icon: "⚔️", color: "rgba(138,172,255," },
  { label: "Instagram", href: "https://www.instagram.com/manjeet__jr", icon: "🔮", color: "rgba(176,122,255," },
  { label: "LinkedIn",  href: "https://www.linkedin.com/",             icon: "🛡️", color: "rgba(109,220,138," },
];

const RUNES = ["ᚱ","ᚷ","ᚦ","ᚹ","ᚠ","ᚢ","ᚨ","ᚺ"];

export default function Footer() {
  const year = new Date().getFullYear();
  const [hoveredLink,   setHoveredLink]   = useState(null);
  const [hoveredSocial, setHoveredSocial] = useState(null);

  return (
    <footer style={styles.footer}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Cinzel:wght@400;600&family=Lato:wght@300;400&display=swap');

        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes runeRing {
          from { transform: rotate(0deg);   }
          to   { transform: rotate(360deg); }
        }
        @keyframes floatRune {
          0%,100% { transform: translateY(0);     opacity: 0.03; }
          50%      { transform: translateY(-14px); opacity: 0.07; }
        }
        @keyframes pulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(212,175,55,0.2); }
          50%      { box-shadow: 0 0 0 8px rgba(212,175,55,0); }
        }

        /* ── FOOTER INNER GRID ── */
        .footer-inner {
          max-width: 1100px;
          margin: 0 auto;
          display: flex;
          gap: 40px;
          flex-wrap: wrap;
          align-items: flex-start;
          justify-content: space-between;
          position: relative;
          z-index: 1;
        }
        .footer-col-divider {
          width: 1px;
          background: rgba(212,175,55,0.1);
          align-self: stretch;
          min-height: 200px;
          flex-shrink: 0;
        }
        .footer-brand-col {
          display: flex;
          flex-direction: column;
          gap: 14px;
          min-width: 200px;
          flex: 1.2;
        }
        .footer-nav-col {
          display: flex;
          flex-direction: column;
          gap: 16px;
          min-width: 130px;
        }
        .footer-info-col {
          display: flex;
          flex-direction: column;
          gap: 16px;
          min-width: 180px;
        }
        .footer-bottom-bar {
          max-width: 1100px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 10px;
          position: relative;
          z-index: 1;
        }
        .footer-social-row {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-top: 4px;
        }

        /* ── TABLET ── */
        @media (max-width: 900px) {
          .footer-col-divider { display: none; }
          .footer-inner {
            gap: 30px;
          }
          .footer-brand-col { min-width: 180px; }
        }

        /* ── MOBILE ── */
        @media (max-width: 640px) {
          .footer-inner {
            flex-direction: column;
            gap: 28px;
          }
          .footer-col-divider { display: none; }
          .footer-brand-col,
          .footer-nav-col,
          .footer-info-col {
            min-width: unset;
            width: 100%;
          }
          .footer-social-row {
            flex-direction: row;
            flex-wrap: wrap;
          }
          .footer-nav-col .nav-list {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
          }
          .footer-bottom-bar {
            flex-direction: column;
            text-align: center;
            gap: 8px;
          }
        }
      `}</style>

      {/* Floating background runes */}
      {RUNES.map((r, i) => (
        <span key={i} style={{
          position: "absolute",
          left: `${(i / RUNES.length) * 100 + 4}%`,
          top:  `${20 + (i % 3) * 25}%`,
          fontSize: `${28 + (i % 3) * 10}px`,
          color: "rgba(212,175,55,1)",
          fontFamily: "serif",
          userSelect: "none", pointerEvents: "none",
          animation: `floatRune ${7 + i}s ease-in-out ${i * 0.8}s infinite`,
        }}>{r}</span>
      ))}

      {/* Top border */}
      <div style={styles.topBorder}>
        <div style={styles.borderLine} />
        <span style={styles.borderGlyph}>⬧</span>
        <div style={styles.borderLine} />
      </div>

      {/* Main content */}
      <div className="footer-inner">

        {/* Brand column */}
        <div className="footer-brand-col">
          <div style={styles.sigilWrap}>
            <div style={styles.sigilRing} />
            <div style={styles.sigilCore}>
              <span style={styles.sigilGlyph}>⚔</span>
            </div>
          </div>

          <h3 style={styles.brandName}>Manjeet Dhiman</h3>
          <p style={styles.brandRole}>Game Developer · Unreal Engine · C++</p>
          <p style={styles.brandTagline}>
            "Forging worlds, one line of code at a time."
          </p>

          {/* Social icons */}
          <div className="footer-social-row">
            {SOCIAL.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                title={s.label}
                style={{
                  ...styles.socialBtn,
                  borderColor: hoveredSocial === s.label
                    ? s.color + "0.55)" : "rgba(212,175,55,0.15)",
                  background: hoveredSocial === s.label
                    ? s.color + "0.08)" : "rgba(212,175,55,0.03)",
                  boxShadow: hoveredSocial === s.label
                    ? `0 0 16px ${s.color}0.2)` : "none",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={() => setHoveredSocial(s.label)}
                onMouseLeave={() => setHoveredSocial(null)}
              >
                <span style={styles.socialIcon}>{s.icon}</span>
                <span style={{
                  ...styles.socialLabel,
                  color: hoveredSocial === s.label ? "#e8d5a3" : "rgba(220,200,160,0.45)",
                }}>
                  {s.label}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="footer-col-divider" />

        {/* Nav links */}
        <div className="footer-nav-col">
          <p style={styles.colTitle}>
            <span style={styles.colTitleGlyph}>⬧</span> Quest Map
          </p>
          <div className="nav-list" style={styles.navList}>
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                style={{
                  ...styles.navLink,
                  color: hoveredLink === l.href ? "#d4af37" : "rgba(220,200,160,0.5)",
                  paddingLeft: hoveredLink === l.href ? "20px" : "0px",
                  transition: "all 0.22s ease",
                }}
                onMouseEnter={() => setHoveredLink(l.href)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                <span style={{ opacity: hoveredLink === l.href ? 1 : 0.4, transition: "opacity 0.2s" }}>
                  {l.glyph}
                </span>
                {l.label}
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="footer-col-divider" />

        {/* Info column */}
        <div className="footer-info-col">
          <p style={styles.colTitle}>
            <span style={styles.colTitleGlyph}>⬧</span> The Guild
          </p>
          <div style={styles.infoList}>
            {[
              { icon: "🔮", label: "Engine",   value: "Unreal Engine 5" },
              { icon: "⚙️", label: "Language", value: "C++ · Blueprint" },
              { icon: "🏛️", label: "Board",    value: "MSBTE Diploma CS" },
              { icon: "📍", label: "Status",   value: "Final Year" },
            ].map((item) => (
              <div key={item.label} style={styles.infoItem}>
                <span style={styles.infoIcon}>{item.icon}</span>
                <div>
                  <p style={styles.infoKey}>{item.label}</p>
                  <p style={styles.infoVal}>{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom border */}
      <div style={styles.bottomBorder}>
        <div style={styles.borderLine} />
        <span style={styles.borderGlyph}>⬧</span>
        <div style={styles.borderLine} />
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom-bar">
        <p style={styles.copyright}>
          © {year}{" "}
          <span style={styles.copyrightName}>Manjeet Dhiman</span>
          {" "}· All rights reserved · Forged with ⚔️ & ❤️
        </p>
        <p style={styles.builtWith}>
          Built with{" "}
          <span style={styles.techTag}>React</span>{" "}·{" "}
          <span style={styles.techTag}>Vite</span>{" "}·{" "}
          <span style={styles.techTag}>Inspired by Skyrim</span>
        </p>
      </div>
    </footer>
  );
}

const GOLD  = "#d4af37";
const GOLDF = "rgba(212,175,55,";

const styles = {
  footer: {
    background: "linear-gradient(180deg, #080505 0%, #0a0705 100%)",
    padding: "clamp(40px, 6vw, 60px) clamp(16px, 5vw, 40px) clamp(20px, 4vw, 30px)",
    position: "relative",
    overflow: "hidden",
    fontFamily: "'Cinzel', serif",
    borderTop: `1px solid ${GOLDF}0.15)`,
  },

  topBorder:    { display: "flex", alignItems: "center", gap: "12px", marginBottom: "clamp(24px, 4vw, 50px)" },
  bottomBorder: { display: "flex", alignItems: "center", gap: "12px", margin: "clamp(20px, 4vw, 40px) 0 clamp(14px, 3vw, 24px)" },
  borderLine:   { flex: 1, height: "1px", background: `linear-gradient(90deg, transparent, ${GOLDF}0.3), transparent)` },
  borderGlyph:  { color: GOLDF + "0.5)", fontSize: "14px", flexShrink: 0 },

  /* Brand */
  sigilWrap: { width: "60px", height: "60px", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" },
  sigilRing: {
    position: "absolute", inset: 0, borderRadius: "50%",
    border: `1px dashed ${GOLDF}0.3)`,
    animation: "runeRing 12s linear infinite",
  },
  sigilCore: {
    width: "44px", height: "44px", borderRadius: "50%",
    border: `1px solid ${GOLDF}0.35)`,
    background: GOLDF + "0.06)",
    display: "flex", alignItems: "center", justifyContent: "center",
    animation: "pulse 3s ease-in-out infinite",
  },
  sigilGlyph:   { fontSize: "18px", filter: "sepia(1) saturate(3) hue-rotate(10deg)" },
  brandName:    { fontFamily: "'Cinzel Decorative', cursive", fontSize: "clamp(16px, 3.5vw, 20px)", color: "#e8d5a3", margin: 0, letterSpacing: "1.5px" },
  brandRole:    { fontFamily: "'Lato', sans-serif", fontSize: "12px", color: GOLDF + "0.5)", margin: 0, letterSpacing: "2px" },
  brandTagline: {
    fontFamily: "'Lato', sans-serif", fontStyle: "italic", fontWeight: 300,
    fontSize: "13px", color: "rgba(220,200,160,0.4)", margin: 0, lineHeight: 1.6,
    borderLeft: `2px solid ${GOLDF}0.25)`, paddingLeft: "12px",
  },

  socialBtn: {
    display: "flex", alignItems: "center", gap: "10px",
    padding: "8px 14px", border: "1px solid", borderRadius: "4px",
    textDecoration: "none", width: "fit-content",
  },
  socialIcon:  { fontSize: "16px" },
  socialLabel: { fontFamily: "'Cinzel', serif", fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase" },

  /* Nav */
  colTitle:      { fontSize: "10px", letterSpacing: "3px", color: GOLDF + "0.5)", textTransform: "uppercase", margin: 0, display: "flex", alignItems: "center", gap: "8px" },
  colTitleGlyph: { color: GOLDF + "0.6)" },
  navList:       { display: "flex", flexDirection: "column", gap: "10px" },
  navLink:       { display: "flex", alignItems: "center", gap: "8px", textDecoration: "none", fontFamily: "'Cinzel', serif", fontSize: "12px", letterSpacing: "1.5px" },

  /* Info */
  infoList: { display: "flex", flexDirection: "column", gap: "12px" },
  infoItem: { display: "flex", alignItems: "flex-start", gap: "10px" },
  infoIcon: { fontSize: "16px", marginTop: "2px", flexShrink: 0 },
  infoKey:  { fontFamily: "'Cinzel', serif", fontSize: "9px", letterSpacing: "2px", color: GOLDF + "0.4)", margin: "0 0 2px", textTransform: "uppercase" },
  infoVal:  { fontFamily: "'Lato', sans-serif", fontSize: "12px", color: "rgba(220,200,160,0.65)", margin: 0 },

  /* Bottom */
  copyright:     { fontFamily: "'Lato', sans-serif", fontWeight: 300, fontSize: "clamp(10px, 2vw, 12px)", color: GOLDF + "0.4)", margin: 0, letterSpacing: "1px" },
  copyrightName: { color: GOLD, fontWeight: 400 },
  builtWith:     { fontFamily: "'Lato', sans-serif", fontWeight: 300, fontSize: "clamp(9px, 1.8vw, 11px)", color: GOLDF + "0.3)", margin: 0, letterSpacing: "1px" },
  techTag:       { color: GOLDF + "0.6)", fontStyle: "italic" },
};
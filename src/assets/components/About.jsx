import { useEffect, useRef, useState } from "react";
import manjeetPhoto from "../images/manjeet.png";

const STATS = [
  { label: "Class",    value: "Game Developer",  icon: "⚔️" },
  { label: "Engine",   value: "Unreal Engine 5", icon: "🔮" },
  { label: "Language", value: "C++ & Blueprint", icon: "📜" },
  { label: "Board",    value: "MSBTE Diploma",   icon: "🏛️" },
  { label: "Quest",    value: "Final Year",      icon: "🗺️" },
];

const LORE = [
  {
    heading: "Origin Story",
    icon: "📖",
    text: `Every great hero has an origin. Mine began with a single question — 
    "How do games actually work?" That curiosity led me deep into the mechanics, 
    logic, and physics of virtual worlds. What started as wonder became obsession, 
    and obsession became craft.`,
  },
  {
    heading: "The Arsenal",
    icon: "⚔️",
    text: `Armed with Unreal Engine 5 and C++, I forge gameplay systems, player 
    interaction flows, and immersive environments. Blueprint Scripting is my spell 
    tome — rapid prototyping, visual logic, and live iteration all in one.`,
  },
  {
    heading: "The Side Quests",
    icon: "🛡️",
    text: `Beyond game worlds, I operate in the shadows of cybersecurity — competing 
    in CTF challenges with my crew hackHive, wielding Kali Linux and Burp Suite. 
    I also craft web applications using React and Spring Boot, bridging digital realms.`,
  },
  {
    heading: "The Grand Quest",
    icon: "🎯",
    text: `My ultimate objective: to ship high-quality, meaningful game experiences 
    that players remember. To grow from a passionate developer into a professional 
    who shapes the future of interactive storytelling and gameplay design.`,
  },
];

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

export default function About() {
  const [sectionRef, inView] = useInView();
  const [activeTab, setActiveTab]   = useState(0);

  return (
    <section id="about" style={styles.section} ref={sectionRef}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Cinzel:wght@400;600&family=Lato:wght@300;400;700&display=swap');

        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(40px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes fadeSlideRight {
          from { opacity: 0; transform: translateX(-30px); }
          to   { opacity: 1; transform: translateX(0);     }
        }
        @keyframes pulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(212,175,55,0.15); }
          50%      { box-shadow: 0 0 0 8px rgba(212,175,55,0);  }
        }
        @keyframes borderGlow {
          0%,100% { border-color: rgba(212,175,55,0.2); }
          50%      { border-color: rgba(212,175,55,0.5); }
        }

        .lore-tab-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 14px;
          background: none;
          border: 1px solid rgba(212,175,55,0.15);
          border-radius: 3px;
          font-family: 'Cinzel', serif;
          font-size: 10px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: rgba(220,200,160,0.5);
          cursor: pointer;
          transition: all 0.25s ease;
          white-space: nowrap;
        }
        .lore-tab-btn:hover {
          color: #d4af37;
          border-color: rgba(212,175,55,0.4);
          background: rgba(212,175,55,0.05);
        }
        .lore-tab-btn.active {
          color: #d4af37;
          border-color: rgba(212,175,55,0.5);
          background: rgba(212,175,55,0.08);
          box-shadow: inset 0 0 12px rgba(212,175,55,0.05);
        }

        .stat-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          padding: 14px 10px;
          border: 1px solid rgba(212,175,55,0.15);
          border-radius: 4px;
          background: rgba(212,175,55,0.03);
          transition: all 0.3s ease;
          animation: borderGlow 4s ease-in-out infinite;
        }
        .stat-card:hover {
          border-color: rgba(212,175,55,0.45);
          background: rgba(212,175,55,0.07);
          transform: translateY(-3px);
        }

        /* ── ABOUT GRID ── */
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1.4fr;
          gap: 40px;
          align-items: start;
        }

        /* ── TAB ROW ── */
        .about-tab-row {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        /* ── TABLET ── */
        @media (max-width: 1024px) {
          .about-grid {
            grid-template-columns: 1fr 1.2fr;
            gap: 28px;
          }
        }

        /* ── MOBILE ── */
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr;
            gap: 28px;
          }
          .about-tab-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
          }
          .lore-tab-btn {
            justify-content: center;
            text-align: center;
            white-space: normal;
          }
        }

        /* ── SMALL MOBILE ── */
        @media (max-width: 480px) {
          .about-tab-row {
            grid-template-columns: 1fr;
          }
          .lore-tab-btn { padding: 12px 10px; }
        }
      `}</style>

      {/* Background runes */}
      <div style={styles.bgRune} aria-hidden>ᚱ</div>
      <div style={{ ...styles.bgRune, right: "5%", left: "auto", top: "60%", fontSize: "180px", opacity: 0.018 }} aria-hidden>ᚷ</div>

      <div style={styles.inner}>

        {/* ── Section Header ── */}
        <div style={{ ...styles.header, ...(inView ? styles.visible : styles.hidden) }}>
          <div style={styles.divider}>
            <div style={styles.dividerLine} />
            <span style={styles.dividerGlyph}>⬧</span>
            <div style={styles.dividerLine} />
          </div>
          <p style={styles.sectionLabel}>[ THE CHRONICLE ]</p>
          <h2 style={styles.sectionTitle}>
            About the <span style={styles.titleAccent}>Hero</span>
          </h2>
          <div style={styles.divider}>
            <div style={styles.dividerLine} />
            <span style={styles.dividerGlyph}>⬧</span>
            <div style={styles.dividerLine} />
          </div>
        </div>

        {/* ── Main grid ── */}
        <div className="about-grid">

          {/* LEFT — Character card */}
          <div style={{
            ...styles.characterCard,
            ...(inView ? { animation: "fadeSlideRight 0.7s ease 0.2s forwards", opacity: 1 } : { opacity: 0 })
          }}>
            {/* Avatar */}
            <div style={styles.avatarWrap}>
              <div style={styles.avatarOuter}>
                <div style={styles.avatarInner}>
                  <img src={manjeetPhoto} alt="Manjeet Dhiman" style={styles.avatarPhoto} />
                </div>
              </div>
              <div style={styles.nameTag}>
                <p style={styles.nameTagName}>Manjeet Dhiman</p>
                <p style={styles.nameTagRole}>Game Developer · CTF Hacker</p>
              </div>
            </div>

            {/* Divider */}
            <div style={styles.cardDivider}>
              <div style={styles.cardDividerLine} />
              <span style={styles.cardDividerText}>CHARACTER SHEET</span>
              <div style={styles.cardDividerLine} />
            </div>

            {/* Stats grid */}
            <div style={styles.statsGrid}>
              {STATS.map((s) => (
                <div key={s.label} className="stat-card">
                  <span style={{ fontSize: "20px" }}>{s.icon}</span>
                  <span style={styles.statValue}>{s.value}</span>
                  <span style={styles.statLabel}>{s.label}</span>
                </div>
              ))}
            </div>

            {/* XP Bar */}
            <div style={styles.xpWrap}>
              <div style={styles.xpHeader}>
                <span style={styles.xpLabel}>XP Progress</span>
                <span style={styles.xpPct}>74 / 100</span>
              </div>
              <div style={styles.xpBg}>
                <div style={styles.xpFill} />
              </div>
              <p style={styles.xpNote}>Final Year · Diploma CS · MSBTE</p>
            </div>
          </div>

          {/* RIGHT — Lore tabs */}
          <div style={{
            ...styles.lorePanel,
            ...(inView ? { animation: "fadeSlideUp 0.7s ease 0.35s forwards", opacity: 1 } : { opacity: 0 })
          }}>

            {/* Tab buttons */}
            <div className="about-tab-row">
              {LORE.map((l, i) => (
                <button
                  key={i}
                  className={`lore-tab-btn${activeTab === i ? " active" : ""}`}
                  onClick={() => setActiveTab(i)}
                >
                  <span>{l.icon}</span>
                  {l.heading}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div style={styles.tabContent} key={activeTab}>
              <div style={styles.tabContentInner}>
                <span style={styles.tabBigIcon}>{LORE[activeTab].icon}</span>
                <h3 style={styles.tabHeading}>{LORE[activeTab].heading}</h3>
                <p style={styles.tabText}>{LORE[activeTab].text}</p>
              </div>
              <span style={styles.cornerTL}>⌐</span>
              <span style={styles.cornerBR}>¬</span>
            </div>

            {/* Quote scroll */}
            <div style={styles.quoteScroll}>
              <span style={styles.quoteGlyph}>"</span>
              <p style={styles.quoteText}>
                Every line of code is a spell. Every game world — a universe born from imagination.
              </p>
              <span style={{ ...styles.quoteGlyph, alignSelf: "flex-end" }}>"</span>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

const GOLD  = "#d4af37";
const GOLDF = "rgba(212,175,55,";

const styles = {
  section: {
    minHeight: "100vh",
    background: "linear-gradient(160deg, #0a0705 0%, #0f0c10 60%, #0a0705 100%)",
    padding: "clamp(60px, 10vw, 100px) clamp(16px, 5vw, 40px)",
    position: "relative",
    overflow: "hidden",
    fontFamily: "'Cinzel', serif",
  },
  bgRune: {
    position: "absolute",
    top: "10%",
    left: "3%",
    fontSize: "220px",
    color: "rgba(212,175,55,0.015)",
    fontFamily: "serif",
    userSelect: "none",
    pointerEvents: "none",
    lineHeight: 1,
  },
  inner: { maxWidth: "1200px", margin: "0 auto" },

  header: { textAlign: "center", marginBottom: "clamp(30px,5vw,60px)", transition: "all 0.6s ease" },
  hidden:  { opacity: 0, transform: "translateY(20px)" },
  visible: { opacity: 1, transform: "translateY(0)" },

  divider:      { display: "flex", alignItems: "center", gap: "12px", justifyContent: "center", margin: "12px 0" },
  dividerLine:  { width: "80px", height: "1px", background: `linear-gradient(90deg, transparent, ${GOLDF}0.4), transparent)` },
  dividerGlyph: { color: GOLDF + "0.6)", fontSize: "14px" },
  sectionLabel: { fontFamily: "'Cinzel', serif", fontSize: "11px", letterSpacing: "5px", color: GOLDF + "0.5)", margin: "0 0 12px" },
  sectionTitle: { fontFamily: "'Cinzel Decorative', cursive", fontSize: "clamp(24px, 4vw, 48px)", color: "#e8d5a3", margin: 0, letterSpacing: "2px" },
  titleAccent: {
    background: `linear-gradient(135deg, ${GOLD}, #f5e17a, #a87c2a, ${GOLD})`,
    backgroundSize: "300% auto",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    animation: "shimmer 4s linear infinite",
  },

  characterCard: {
    background: "rgba(15,10,8,0.8)",
    border: "1px solid rgba(212,175,55,0.2)",
    borderRadius: "6px",
    padding: "clamp(20px, 4vw, 30px)",
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    position: "relative",
  },

  avatarWrap:  { display: "flex", flexDirection: "column", alignItems: "center", gap: "14px" },
  avatarOuter: {
    width: "110px", height: "110px", borderRadius: "50%",
    border: `2px solid ${GOLDF}0.35)`,
    display: "flex", alignItems: "center", justifyContent: "center",
    animation: "pulse 3s ease infinite",
    background: `radial-gradient(circle, rgba(30,20,10,0.9), rgba(10,7,5,0.95))`,
  },
  avatarInner: {
    width: "88px", height: "88px", borderRadius: "50%",
    border: `1px solid ${GOLDF}0.3)`,
    overflow: "hidden",
    display: "flex", alignItems: "center", justifyContent: "center",
  },
  avatarPhoto: {
    width: "88px", height: "88px",
    borderRadius: "50%",
    objectFit: "cover",
    objectPosition: "center top",
    filter: "sepia(0.15) contrast(1.05)",
    display: "block",
  },
  nameTag:     { textAlign: "center" },
  nameTagName: { fontFamily: "'Cinzel Decorative', cursive", fontSize: "clamp(13px,3vw,16px)", color: "#e8d5a3", margin: "0 0 4px", letterSpacing: "1px" },
  nameTagRole: { fontFamily: "'Lato', sans-serif", fontSize: "11px", color: GOLDF + "0.5)", margin: 0, letterSpacing: "2px" },

  cardDivider:     { display: "flex", alignItems: "center", gap: "10px" },
  cardDividerLine: { flex: 1, height: "1px", background: GOLDF + "0.15)" },
  cardDividerText: { fontSize: "9px", letterSpacing: "3px", color: GOLDF + "0.4)", whiteSpace: "nowrap" },

  statsGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" },
  statValue: { fontFamily: "'Cinzel', serif", fontSize: "11px", color: GOLD, textAlign: "center", letterSpacing: "1px" },
  statLabel: { fontSize: "9px", letterSpacing: "2px", color: GOLDF + "0.4)", textTransform: "uppercase" },

  xpWrap:   { display: "flex", flexDirection: "column", gap: "8px" },
  xpHeader: { display: "flex", justifyContent: "space-between" },
  xpLabel:  { fontSize: "10px", letterSpacing: "2px", color: GOLDF + "0.5)", textTransform: "uppercase" },
  xpPct:    { fontSize: "10px", color: GOLD },
  xpBg:     { height: "6px", background: GOLDF + "0.1)", borderRadius: "3px", overflow: "hidden", border: `1px solid ${GOLDF}0.15)` },
  xpFill:   { height: "100%", width: "74%", background: `linear-gradient(90deg, #a87c2a, ${GOLD})`, borderRadius: "3px", boxShadow: `0 0 10px ${GOLDF}0.4)` },
  xpNote:   { fontFamily: "'Lato', sans-serif", fontSize: "10px", color: GOLDF + "0.35)", margin: 0, textAlign: "center" },

  lorePanel: { display: "flex", flexDirection: "column", gap: "20px" },

  tabContent: {
    background: "rgba(15,10,8,0.8)",
    border: `1px solid ${GOLDF}0.2)`,
    borderRadius: "6px",
    padding: "clamp(18px, 4vw, 30px)",
    position: "relative",
    minHeight: "180px",
    animation: "fadeSlideUp 0.35s ease forwards",
  },
  tabContentInner: { display: "flex", flexDirection: "column", gap: "12px" },
  tabBigIcon:  { fontSize: "clamp(24px, 5vw, 32px)" },
  tabHeading:  { fontFamily: "'Cinzel Decorative', cursive", fontSize: "clamp(14px, 3vw, 18px)", color: "#e8d5a3", margin: 0, letterSpacing: "1px" },
  tabText:     { fontFamily: "'Lato', sans-serif", fontWeight: 300, fontSize: "clamp(13px, 1.8vw, 15px)", color: "rgba(220,200,160,0.7)", lineHeight: 1.85, margin: 0 },
  cornerTL:    { position: "absolute", top: "10px", left: "12px", color: GOLDF + "0.25)", fontSize: "20px", fontFamily: "monospace" },
  cornerBR:    { position: "absolute", bottom: "10px", right: "12px", color: GOLDF + "0.25)", fontSize: "20px", fontFamily: "monospace" },

  quoteScroll: {
    display: "flex",
    gap: "10px",
    padding: "clamp(14px, 3vw, 20px) clamp(14px, 3vw, 24px)",
    border: `1px solid ${GOLDF}0.15)`,
    borderLeft: `3px solid ${GOLDF}0.5)`,
    borderRadius: "4px",
    background: GOLDF + "0.03)",
  },
  quoteGlyph: { fontFamily: "'Cinzel Decorative', cursive", fontSize: "clamp(20px,4vw,28px)", color: GOLDF + "0.4)", lineHeight: 1, alignSelf: "flex-start" },
  quoteText:  { fontFamily: "'Lato', sans-serif", fontStyle: "italic", fontWeight: 300, fontSize: "clamp(12px,1.8vw,14px)", color: "rgba(220,200,160,0.6)", margin: 0, lineHeight: 1.7 },
};
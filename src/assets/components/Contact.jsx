import { useEffect, useRef, useState } from "react";

const LINKS = [
  {
    label: "Email Me",
    href:  "mailto:manjeet@example.com",
    icon:  "✉️",
    desc:  "Send a Email directly",
    primary: true,
    color: "#d4af37",
    colorFade: "rgba(212,175,55,",
  },
  {
    label: "GitHub",
    href:  "https://github.com/ManjeetJr",
    icon:  "⚔️",
    desc:  "View the quest log",
    primary: false,
    color: "#8aacff",
    colorFade: "rgba(138,172,255,",
  },
  {
    label: "LinkedIn",
    href:  "https://www.linkedin.com/",
    icon:  "🛡️",
    desc:  "Join my guild network",
    primary: false,
    color: "#b07aff",
    colorFade: "rgba(176,122,255,",
  },
  {
    label: "Instagram",
    href:  "https://www.instagram.com/manjeet__jr",
    icon:  "🔮",
    desc:  "Follow the adventure",
    primary: false,
    color: "#6ddc8a",
    colorFade: "rgba(109,220,138,",
  },
];

const RUNES  = ["ᚱ","ᚷ","ᚦ","ᚹ","ᚠ","ᚢ","ᚨ","ᚺ","ᛁ","ᛃ"];
const SPARKS = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x:  Math.random() * 100,
  y:  Math.random() * 100,
  rune: RUNES[i % RUNES.length],
  delay: Math.random() * 6,
  dur:   Math.random() * 8 + 6,
  size:  Math.random() * 10 + 10,
}));

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

function ContactCard({ link, index, inView }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={link.href}
      target={link.primary ? "_self" : "_blank"}
      rel="noreferrer"
      style={{
        ...styles.card,
        ...(link.primary ? styles.cardPrimary : {}),
        borderColor: hovered ? link.colorFade + "0.55)" : link.colorFade + "0.2)",
        boxShadow:   hovered
          ? `0 16px 50px rgba(0,0,0,0.5), 0 0 30px ${link.colorFade}0.12)`
          : "none",
        opacity:   inView ? 1 : 0,
        transform: inView ? "translateY(0) scale(1)" : "translateY(30px) scale(0.97)",
        transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s, border-color 0.3s, box-shadow 0.3s`,
        textDecoration: "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{
        ...styles.cardGlow,
        background: link.colorFade + "0.06)",
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.3s ease",
      }} />

      <div style={styles.cardIconWrap}>
        <div style={{
          ...styles.cardIconCircle,
          border: `1px solid ${link.colorFade}0.35)`,
          background: link.colorFade + "0.08)",
          boxShadow: hovered ? `0 0 20px ${link.colorFade}0.25)` : "none",
          transition: "box-shadow 0.3s ease",
        }}>
          <span style={styles.cardIcon}>{link.icon}</span>
        </div>
      </div>

      <div style={styles.cardBody}>
        <span style={{ ...styles.cardLabel, color: hovered ? link.color : "#e8d5a3" }}>
          {link.label}
        </span>
        <span style={styles.cardDesc}>{link.desc}</span>
      </div>

      <span style={{
        ...styles.cardArrow,
        color: link.color,
        opacity: hovered ? 1 : 0.3,
        transform: hovered ? "translateX(4px)" : "translateX(0)",
        transition: "all 0.25s ease",
      }}>
        →
      </span>
    </a>
  );
}

export default function Contact() {
  const [sectionRef, inView] = useInView(0.08);

  return (
    <section id="contact" style={styles.section} ref={sectionRef}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Cinzel:wght@400;600&family=Lato:wght@300;400;700&display=swap');

        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes floatRune {
          0%,100% { transform: translateY(0) rotate(0deg);     opacity: 0.04; }
          33%      { transform: translateY(-22px) rotate(8deg); opacity: 0.07; }
          66%      { transform: translateY(-10px) rotate(-5deg);opacity: 0.05; }
        }
        @keyframes orbPulse {
          0%,100% { transform: scale(1);    opacity: 0.06; }
          50%      { transform: scale(1.15); opacity: 0.1;  }
        }
        @keyframes runeRing {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        /* ── CONTACT LAYOUT ── */
        .contact-layout {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 32px;
          flex-wrap: wrap;
        }
        .contact-card-col {
          display: flex;
          flex-direction: column;
          gap: 16px;
          flex: 1;
          min-width: 240px;
          max-width: 300px;
        }
        .contact-sigil {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          position: relative;
          width: 200px;
          flex-shrink: 0;
        }
        .contact-avail-banner {
          margin-top: 50px;
          display: flex;
          align-items: center;
          gap: 14px;
          padding: clamp(14px, 3vw, 18px) clamp(14px, 4vw, 28px);
          border: 1px solid rgba(212,175,55,0.2);
          border-left: 3px solid rgba(212,175,55,0.6);
          border-radius: 4px;
          background: rgba(212,175,55,0.03);
        }

        /* ── TABLET ── */
        @media (max-width: 900px) {
          .contact-layout {
            gap: 24px;
          }
          .contact-card-col {
            min-width: 200px;
            max-width: 260px;
          }
          .contact-sigil {
            width: 160px;
          }
        }

        /* ── MOBILE ── */
        @media (max-width: 700px) {
          .contact-layout {
            flex-direction: column;
            align-items: stretch;
            gap: 20px;
          }
          .contact-card-col {
            max-width: 100%;
            min-width: unset;
            width: 100%;
          }
          .contact-sigil {
            width: 100%;
            align-items: center;
            padding: 20px 0;
            order: -1; /* sigil goes to top on mobile */
          }
          .contact-avail-banner {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
            margin-top: 30px;
          }
        }

        /* ── SMALL MOBILE ── */
        @media (max-width: 400px) {
          .contact-avail-banner { padding: 14px; }
        }
      `}</style>

      {/* Floating runes */}
      {SPARKS.map((s) => (
        <span key={s.id} style={{
          position: "absolute",
          left: `${s.x}%`, top: `${s.y}%`,
          fontSize: `${s.size}px`,
          color: "rgba(212,175,55,1)",
          fontFamily: "serif",
          userSelect: "none", pointerEvents: "none",
          animation: `floatRune ${s.dur}s ease-in-out ${s.delay}s infinite`,
        }}>
          {s.rune}
        </span>
      ))}

      {/* Ambient orbs */}
      <div style={{ ...styles.orb, top: "15%", left: "10%", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%)", animation: "orbPulse 6s ease-in-out infinite" }} />
      <div style={{ ...styles.orb, bottom: "10%", right: "10%", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(176,122,255,0.05) 0%, transparent 70%)", animation: "orbPulse 8s ease-in-out 2s infinite" }} />

      <div style={styles.inner}>

        {/* Header */}
        <div style={{
          ...styles.header,
          opacity:   inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(28px)",
          transition: "all 0.7s ease",
        }}>
          <div style={styles.divider}>
            <div style={styles.dividerLine} />
            <span style={styles.dividerGlyph}>⬧</span>
            <div style={styles.dividerLine} />
          </div>
          <p style={styles.sectionLabel}>[ THE GUILD HALL ]</p>
          <h2 style={styles.sectionTitle}>
            Send a <span style={styles.titleAccent}>Scroll</span>
          </h2>
          <p style={styles.sectionSub}>
            Seeking a game developer, creative collaborator, or just want to talk?
            Open the gate — I'm ready for the next Task.
          </p>
          <div style={styles.divider}>
            <div style={styles.dividerLine} />
            <span style={styles.dividerGlyph}>⬧</span>
            <div style={styles.dividerLine} />
          </div>
        </div>

        {/* Cards + Sigil layout */}
        <div className="contact-layout">

          {/* Left cards */}
          <div className="contact-card-col">
            {LINKS.slice(0, 2).map((link, i) => (
              <ContactCard key={link.label} link={link} index={i} inView={inView} />
            ))}
          </div>

          {/* Center sigil */}
          <div className="contact-sigil">
            <div style={styles.sigilRingOuter}>
              <div style={styles.sigilRingInner} />
            </div>
            <div style={styles.sigilCenter}>
              <span style={styles.sigilGlyph}>🏰</span>
              <p style={styles.sigilText}>GUILD</p>
              <p style={styles.sigilText}>HALL</p>
            </div>
            <p style={styles.sigilName}>Manjeet Dhiman</p>
            <p style={styles.sigilRole}>Game Developer · Gamer</p>
          </div>

          {/* Right cards */}
          <div className="contact-card-col">
            {LINKS.slice(2).map((link, i) => (
              <ContactCard key={link.label} link={link} index={i + 2} inView={inView} />
            ))}
          </div>
        </div>

        {/* Availability banner */}
        <div
          className="contact-avail-banner"
          style={{
            opacity:   inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.7s ease 0.5s",
          }}
        >
          <span style={styles.availDot} />
          <p style={styles.availText}>
            <span style={styles.availHighlight}>Currently available</span>
            {" "}— open to game dev collaborations, internships, and creative projects.
          </p>
          <span style={styles.availRune}>⚔</span>
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
    background: "linear-gradient(160deg, #0a0705 0%, #0d0a14 60%, #0a0705 100%)",
    padding: "clamp(60px, 10vw, 100px) clamp(16px, 5vw, 40px)",
    position: "relative",
    overflow: "hidden",
    fontFamily: "'Cinzel', serif",
    display: "flex",
    alignItems: "center",
  },
  orb: { position: "absolute", borderRadius: "50%", pointerEvents: "none" },
  inner: { maxWidth: "1100px", margin: "0 auto", width: "100%", position: "relative", zIndex: 1 },

  header:       { textAlign: "center", marginBottom: "clamp(30px, 5vw, 60px)" },
  divider:      { display: "flex", alignItems: "center", gap: "12px", justifyContent: "center", margin: "10px 0" },
  dividerLine:  { width: "80px", height: "1px", background: `linear-gradient(90deg, transparent, ${GOLDF}0.4), transparent)` },
  dividerGlyph: { color: GOLDF + "0.6)", fontSize: "14px" },
  sectionLabel: { fontSize: "11px", letterSpacing: "5px", color: GOLDF + "0.5)", margin: "0 0 10px", textTransform: "uppercase" },
  sectionTitle: { fontFamily: "'Cinzel Decorative', cursive", fontSize: "clamp(24px, 4vw, 48px)", color: "#e8d5a3", margin: "0 0 14px", letterSpacing: "2px" },
  titleAccent:  { background: `linear-gradient(135deg, ${GOLD}, #f5e17a, #a87c2a, ${GOLD})`, backgroundSize: "300% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "shimmer 4s linear infinite" },
  sectionSub:   { fontFamily: "'Lato', sans-serif", fontWeight: 300, fontSize: "clamp(13px, 1.8vw, 15px)", color: GOLDF + "0.55)", margin: "0 auto", maxWidth: "560px", lineHeight: 1.8 },

  /* Card */
  card: {
    display: "flex", alignItems: "center", gap: "16px",
    padding: "18px 20px",
    background: "rgba(12,9,7,0.9)",
    border: "1px solid",
    borderRadius: "6px",
    position: "relative", overflow: "hidden",
    cursor: "pointer",
  },
  cardPrimary:   { background: `linear-gradient(135deg, rgba(212,175,55,0.08), rgba(168,124,42,0.05))` },
  cardGlow:      { position: "absolute", inset: 0, borderRadius: "6px", pointerEvents: "none" },
  cardIconWrap:  { flexShrink: 0 },
  cardIconCircle:{ width: "46px", height: "46px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" },
  cardIcon:      { fontSize: "20px" },
  cardBody:      { flex: 1, display: "flex", flexDirection: "column", gap: "3px", minWidth: 0 },
  cardLabel:     { fontFamily: "'Cinzel', serif", fontSize: "clamp(11px, 2.5vw, 13px)", letterSpacing: "1.5px", transition: "color 0.25s ease" },
  cardDesc:      { fontFamily: "'Lato', sans-serif", fontSize: "11px", color: "rgba(220,200,160,0.4)", letterSpacing: "1px" },
  cardArrow:     { fontSize: "18px", flexShrink: 0 },

  /* Sigil */
  sigilRingOuter: {
    position: "absolute", width: "180px", height: "180px", borderRadius: "50%",
    border: `1px dashed ${GOLDF}0.2)`,
    animation: "runeRing 20s linear infinite",
  },
  sigilRingInner: {
    position: "absolute", inset: "16px", borderRadius: "50%",
    border: `1px dashed ${GOLDF}0.12)`,
  },
  sigilCenter: {
    width: "130px", height: "130px", borderRadius: "50%",
    border: `2px solid ${GOLDF}0.3)`,
    background: `radial-gradient(circle, rgba(30,20,10,0.95), rgba(10,7,5,0.98))`,
    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
    boxShadow: `0 0 40px ${GOLDF}0.1), inset 0 0 20px rgba(0,0,0,0.5)`,
    zIndex: 1,
  },
  sigilGlyph: { fontSize: "36px", filter: `drop-shadow(0 0 12px ${GOLDF}0.5))`, marginBottom: "4px" },
  sigilText:  { fontFamily: "'Cinzel', serif", fontSize: "9px", letterSpacing: "4px", color: GOLDF + "0.5)", margin: 0 },
  sigilName:  { fontFamily: "'Cinzel Decorative', cursive", fontSize: "clamp(11px, 2.5vw, 13px)", color: "#e8d5a3", margin: "8px 0 0", textAlign: "center", zIndex: 1 },
  sigilRole:  { fontFamily: "'Lato', sans-serif", fontSize: "10px", color: GOLDF + "0.4)", margin: 0, letterSpacing: "1px", textAlign: "center", zIndex: 1 },

  /* Availability */
  availDot: {
    width: "10px", height: "10px", borderRadius: "50%",
    background: "#6ddc8a",
    boxShadow: "0 0 10px rgba(109,220,138,0.6)",
    flexShrink: 0,
    animation: "orbPulse 2s ease-in-out infinite",
  },
  availText:      { fontFamily: "'Lato', sans-serif", fontWeight: 300, fontSize: "clamp(12px, 1.8vw, 14px)", color: "rgba(220,200,160,0.65)", margin: 0, lineHeight: 1.6, flex: 1 },
  availHighlight: { color: "#6ddc8a", fontWeight: 700 },
  availRune:      { fontSize: "20px", color: GOLDF + "0.4)", flexShrink: 0, filter: "sepia(1) saturate(3) hue-rotate(10deg)" },
};
import { useEffect, useRef, useState } from "react";

import endless  from '../images/endless-runner.jpg';
import webProject from '../images/webProject.webp';
import first2D  from '../images/first-2d-game.jpg';
import island   from '../images/island-map.jpg';

const PROJECTS = [
  {
    title:  "3D Endless Running Game",
    subtitle: "Action · Runner",
    desc:   "A fast-paced endless runner forged in Unreal Engine 5 — smooth player controls, dynamic obstacles, and highly optimized gameplay performance.",
    image:  endless,
    tech:   ["Unreal Engine 5", "C++"],
    role:   "Gameplay Programmer",
    impact: "Designed player movement, obstacle logic & performance optimization.",
    link:   "https://github.com/ManjeetJr/Endless_Running_Game",
    rune:   "ᚱ",
    difficulty: "★★★★☆",
    status: "Completed",
  },
  {
    title:  "OIIA-Cat-x Web Project",
    subtitle: "Web · Interactive",
    desc:   "A creative, responsive web experience focused on UI/UX and fluid interactivity — responsive layouts and smooth user interactions.",
    image:  webProject,
    tech:   ["HTML", "CSS", "JavaScript"],
    role:   "Frontend Developer",
    impact: "Built responsive layouts and smooth interaction flows.",
    link:   "https://manjeetjr.github.io/OIIA-Cat-x_WebProject/",
    rune:   "ᚷ",
    difficulty: "★★★☆☆",
    status: "Live",
  },
  {
    title:  "First 2D Game",
    subtitle: "2D · Arcade",
    desc:   "The origin quest — a 2D game built to master core game development fundamentals, collision systems, and game loop architecture.",
    image:  first2D,
    tech:   ["C++", "Game Loops"],
    role:   "Game Developer",
    impact: "Implemented collision systems and core game mechanics from scratch.",
    link:   "https://github.com/ManjeetJr/first_2D_game",
    rune:   "ᚦ",
    difficulty: "★★☆☆☆",
    status: "Completed",
  },
  {
    title:  "Island Map (Mobile)",
    subtitle: "3D · Environment",
    desc:   "A mobile-optimized 3D island realm — crafted with precision lighting, asset optimization, and performance tuning for mobile hardware.",
    image:  island,
    tech:   ["Unreal Engine", "Mobile Opt."],
    role:   "Level Designer",
    impact: "Optimized lighting and assets for mobile GPU performance.",
    link:   "https://github.com/ManjeetJr/island_map_mobile_version",
    rune:   "ᚹ",
    difficulty: "★★★★☆",
    status: "Completed",
  },
];

const STATUS_COLOR = {
  "Live":      { bg: "rgba(80,200,100,0.12)", border: "rgba(80,200,100,0.4)", text: "#6ddc8a" },
  "Completed": { bg: "rgba(212,175,55,0.1)",  border: "rgba(212,175,55,0.4)", text: "#d4af37" },
  "In Progress":{ bg: "rgba(100,140,255,0.1)", border: "rgba(100,140,255,0.4)", text: "#8aacff" },
};

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function ProjectCard({ p, index }) {
  const [hovered, setHovered] = useState(false);
  const [cardRef, inView] = useInView(0.1);
  const sc = STATUS_COLOR[p.status] || STATUS_COLOR["Completed"];

  return (
    <div
      ref={cardRef}
      style={{
        ...styles.card,
        ...(hovered ? styles.cardHovered : {}),
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.6s ease ${index * 0.12}s, transform 0.6s ease ${index * 0.12}s, box-shadow 0.3s ease, border-color 0.3s ease`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Rune watermark */}
      <span style={styles.runeWatermark}>{p.rune}</span>

      {/* Image */}
      <div style={styles.imgWrap}>
        <img
          src={p.image}
          alt={p.title}
          loading="lazy"
          style={{ ...styles.img, ...(hovered ? styles.imgHovered : {}) }}
        />
        {/* Image overlay */}
        <div style={{ ...styles.imgOverlay, opacity: hovered ? 0.5 : 0.75 }} />

        {/* Floating badges */}
        <div style={styles.imgBadges}>
          <span style={{ ...styles.statusBadge, background: sc.bg, border: `1px solid ${sc.border}`, color: sc.text }}>
            ● {p.status}
          </span>
          <span style={styles.subtitleBadge}>{p.subtitle}</span>
        </div>

        {/* Difficulty */}
        <div style={styles.difficultyBadge}>
          <span style={styles.difficultyLabel}>Difficulty</span>
          <span style={styles.difficultyStars}>{p.difficulty}</span>
        </div>
      </div>

      {/* Content */}
      <div style={styles.content}>
        {/* Title */}
        <div style={styles.titleRow}>
          <h3 style={styles.title}>{p.title}</h3>
        </div>

        <p style={styles.desc}>{p.desc}</p>

        {/* Role / Impact */}
        <div style={styles.infoGrid}>
          <div style={styles.infoItem}>
            <span style={styles.infoIcon}>⚔</span>
            <div>
              <p style={styles.infoKey}>Role</p>
              <p style={styles.infoVal}>{p.role}</p>
            </div>
          </div>
          <div style={styles.infoItem}>
            <span style={styles.infoIcon}>🎯</span>
            <div>
              <p style={styles.infoKey}>Impact</p>
              <p style={styles.infoVal}>{p.impact}</p>
            </div>
          </div>
        </div>

        {/* Tech stack */}
        <div style={styles.techRow}>
          {p.tech.map((t) => (
            <span key={t} style={styles.techBadge}>{t}</span>
          ))}
        </div>

        {/* CTA */}
        <a
          href={p.link}
          target="_blank"
          rel="noreferrer"
          style={{ ...styles.btn, ...(hovered ? styles.btnHovered : {}) }}
        >
          <span>⚔</span> View Quest
          <span style={styles.btnArrow}>→</span>
        </a>
      </div>
    </div>
  );
}

export default function Projects() {
  const [headerRef, headerInView] = useInView(0.2);

  return (
    <section id="projects" style={styles.section}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Cinzel:wght@400;600&family=Lato:wght@300;400;700&display=swap');
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes float {
          0%,100% { transform: translateY(0);    }
          50%      { transform: translateY(-8px); }
        }
        @keyframes scanline {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(400%);  }
        }
      `}</style>

      {/* Ambient bg glows */}
      <div style={styles.glowLeft}  />
      <div style={styles.glowRight} />

      <div style={styles.inner}>

        {/* ── Header ── */}
        <div
          ref={headerRef}
          style={{
            ...styles.header,
            opacity:   headerInView ? 1 : 0,
            transform: headerInView ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.7s ease",
          }}
        >
          <div style={styles.divider}>
            <div style={styles.dividerLine} />
            <span style={styles.dividerGlyph}>⬧</span>
            <div style={styles.dividerLine} />
          </div>
          <p style={styles.sectionLabel}>[ THE PROJECTS I MADE ]</p>
          <h2 style={styles.sectionTitle}>
            {/*Battle-Tested*/} <span style={styles.titleAccent}>Projects</span>
          </h2>
          <p style={styles.sectionSub}>
            Each project is a completed quest — forged through code, creativity, and countless iterations.
          </p>
          <div style={styles.divider}>
            <div style={styles.dividerLine} />
            <span style={styles.dividerGlyph}>⬧</span>
            <div style={styles.dividerLine} />
          </div>
        </div>

        {/* ── Grid ── */}
        <div style={styles.grid}>
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.title} p={p} index={i} />
          ))}
        </div>

        {/* ── Footer CTA ── */}
        <div style={styles.footerCta}>
          <p style={styles.footerCtaText}>More Projects wanna see ?</p>
          <a
            href="https://github.com/ManjeetJr"
            target="_blank"
            rel="noreferrer"
            style={styles.githubBtn}
          >
            <span>⚔</span> View All on GitHub
          </a>
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
    background: "linear-gradient(160deg, #0d0a14 0%, #0a0705 50%, #0d0a14 100%)",
    padding: "100px 40px",
    position: "relative",
    overflow: "hidden",
    fontFamily: "'Cinzel', serif",
  },
  glowLeft: {
    position: "absolute", top: "20%", left: "-10%",
    width: "500px", height: "500px", borderRadius: "50%",
    background: "radial-gradient(circle, rgba(120,60,200,0.05) 0%, transparent 70%)",
    pointerEvents: "none",
  },
  glowRight: {
    position: "absolute", bottom: "10%", right: "-10%",
    width: "500px", height: "500px", borderRadius: "50%",
    background: `radial-gradient(circle, ${GOLDF}0.05) 0%, transparent 70%)`,
    pointerEvents: "none",
  },
  inner: { maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 },

  header:      { textAlign: "center", marginBottom: "60px" },
  divider:     { display: "flex", alignItems: "center", gap: "12px", justifyContent: "center", margin: "10px 0" },
  dividerLine: { width: "80px", height: "1px", background: `linear-gradient(90deg, transparent, ${GOLDF}0.4), transparent)` },
  dividerGlyph:{ color: GOLDF + "0.6)", fontSize: "14px" },
  sectionLabel:{ fontSize: "11px", letterSpacing: "5px", color: GOLDF + "0.5)", margin: "0 0 10px", textTransform: "uppercase" },
  sectionTitle:{
    fontFamily: "'Cinzel Decorative', cursive",
    fontSize: "clamp(28px,4vw,48px)",
    color: "#e8d5a3", margin: "0 0 14px", letterSpacing: "2px",
  },
  titleAccent: {
    background: `linear-gradient(135deg, ${GOLD}, #f5e17a, #a87c2a, ${GOLD})`,
    backgroundSize: "300% auto",
    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
    animation: "shimmer 4s linear infinite",
  },
  sectionSub: { fontFamily: "'Lato', sans-serif", fontWeight: 300, fontSize: "15px", color: GOLDF + "0.5)", margin: 0 },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(520px, 1fr))",
    gap: "28px",
  },

  /* Card */
  card: {
    background: "rgba(12,9,7,0.9)",
    border: `1px solid ${GOLDF}0.18)`,
    borderRadius: "8px",
    overflow: "hidden",
    position: "relative",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
  },
  cardHovered: {
    borderColor: GOLDF + "0.45)",
    boxShadow: `0 12px 50px rgba(0,0,0,0.5), 0 0 30px ${GOLDF}0.08)`,
  },
  runeWatermark: {
    position: "absolute", top: "10px", right: "16px",
    fontSize: "100px", color: GOLDF + "0.04)",
    fontFamily: "serif", userSelect: "none", pointerEvents: "none",
    lineHeight: 1, zIndex: 0,
  },

  /* Image */
  imgWrap:    { position: "relative", height: "220px", overflow: "hidden", flexShrink: 0 },
  img:        { width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease", display: "block" },
  imgHovered: { transform: "scale(1.06)" },
  imgOverlay: {
    position: "absolute", inset: 0,
    background: "linear-gradient(to bottom, rgba(10,7,5,0.1) 0%, rgba(10,7,5,0.85) 100%)",
    transition: "opacity 0.3s ease",
  },
  imgBadges: { position: "absolute", top: "12px", left: "12px", display: "flex", gap: "8px", flexWrap: "wrap" },
  statusBadge: {
    fontFamily: "'Cinzel', serif", fontSize: "10px", letterSpacing: "1.5px",
    padding: "4px 10px", borderRadius: "3px",
  },
  subtitleBadge: {
    fontFamily: "'Cinzel', serif", fontSize: "10px", letterSpacing: "1.5px",
    padding: "4px 10px", borderRadius: "3px",
    background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)",
  },
  difficultyBadge: {
    position: "absolute", bottom: "12px", right: "12px",
    display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "2px",
  },
  difficultyLabel: { fontSize: "9px", letterSpacing: "2px", color: GOLDF + "0.5)", textTransform: "uppercase" },
  difficultyStars: { fontSize: "12px", color: GOLD, letterSpacing: "2px" },

  /* Content */
  content:  { padding: "22px 24px 24px", display: "flex", flexDirection: "column", gap: "14px", flex: 1, position: "relative", zIndex: 1 },
  titleRow: { display: "flex", alignItems: "flex-start", justifyContent: "space-between" },
  title:    { fontFamily: "'Cinzel Decorative', cursive", fontSize: "16px", color: "#e8d5a3", margin: 0, lineHeight: 1.3, letterSpacing: "0.5px" },
  desc:     { fontFamily: "'Lato', sans-serif", fontWeight: 300, fontSize: "13.5px", color: "rgba(220,200,160,0.65)", margin: 0, lineHeight: 1.75 },

  infoGrid: { display: "flex", flexDirection: "column", gap: "10px" },
  infoItem: { display: "flex", alignItems: "flex-start", gap: "10px" },
  infoIcon: { fontSize: "14px", marginTop: "2px", flexShrink: 0 },
  infoKey:  { fontFamily: "'Cinzel', serif", fontSize: "9px", letterSpacing: "2px", color: GOLDF + "0.5)", margin: "0 0 2px", textTransform: "uppercase" },
  infoVal:  { fontFamily: "'Lato', sans-serif", fontSize: "12.5px", color: "rgba(220,200,160,0.75)", margin: 0 },

  techRow:  { display: "flex", flexWrap: "wrap", gap: "7px" },
  techBadge:{
    fontFamily: "'Cinzel', serif", fontSize: "9px", letterSpacing: "1.5px",
    padding: "5px 12px", borderRadius: "3px",
    border: `1px solid ${GOLDF}0.25)`,
    background: GOLDF + "0.05)",
    color: GOLDF + "0.8)", textTransform: "uppercase",
  },

  btn: {
    display: "inline-flex", alignItems: "center", gap: "8px",
    marginTop: "auto",
    padding: "11px 22px",
    background: `linear-gradient(135deg, ${GOLDF}0.12), ${GOLDF}0.04))`,
    border: `1px solid ${GOLDF}0.35)`,
    borderRadius: "4px",
    fontFamily: "'Cinzel', serif", fontSize: "11px", letterSpacing: "2px",
    color: GOLD, textDecoration: "none", textTransform: "uppercase",
    transition: "all 0.25s ease", alignSelf: "flex-start",
  },
  btnHovered: {
    background: `linear-gradient(135deg, ${GOLD}, #a87c2a)`,
    color: "#0a0705",
    boxShadow: `0 4px 20px ${GOLDF}0.3)`,
    borderColor: "transparent",
  },
  btnArrow: { marginLeft: "4px", transition: "transform 0.2s ease" },

  footerCta: { marginTop: "60px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" },
  footerCtaText: { fontFamily: "'Lato', sans-serif", fontWeight: 300, fontSize: "14px", color: GOLDF + "0.5)", margin: 0, letterSpacing: "1px" },
  githubBtn: {
    display: "inline-flex", alignItems: "center", gap: "10px",
    padding: "13px 32px",
    background: `linear-gradient(135deg, ${GOLD}, #a87c2a)`,
    color: "#0a0705",
    fontFamily: "'Cinzel', serif", fontSize: "12px", fontWeight: 600, letterSpacing: "2px",
    textDecoration: "none", textTransform: "uppercase", borderRadius: "4px",
    boxShadow: `0 4px 24px ${GOLDF}0.3)`,
  },
};
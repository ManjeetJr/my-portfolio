import { useEffect, useRef, useState } from "react";

const SKILL_TREES = [
  {
    tree: "Warrior Arts",
    subtitle: "Primary Skills",
    icon: "⚔️",
    rune: "ᚱ",
    color: "#d4af37",
    colorFade: "rgba(212,175,55,",
    desc: "My strongest and most frequently mastered disciplines",
    skills: [
      { name: "Unreal Engine 5",    level: 55, rank: "Intermediate",     icon: "🔮" },
      { name: "Blueprint Scripting",level: 60, rank: "Intermediate",     icon: "📜" },
      { name: "C++",                level: 45, rank: "Pre-Intermediate",  icon: "⚙️" },
      { name: "Gameplay Mechanics", level: 60, rank: "Intermediate",     icon: "🎮" },
    ],
  },
  {
    tree: "Arcane Arts",
    subtitle: "Web & Dev Skills",
    icon: "🌐",
    rune: "ᚷ",
    color: "#8aacff",
    colorFade: "rgba(138,172,255,",
    desc: "Digital spells cast alongside game development",
    skills: [
      { name: "React",      level: 72, rank: "Intermediate",     icon: "⚛️" },
      { name: "JavaScript", level: 45, rank: "Pre-Intermediate", icon: "✨" },
      { name: "HTML & CSS", level: 80, rank: "Upper-Intermediate",icon: "🖼️" },
      { name: "MySQL",      level: 50, rank: "Learning",         icon: "🗃️" },
    ],
  },
  {
    tree: "Shadow Craft",
    subtitle: "Design & Security",
    icon: "🛡️",
    rune: "ᚦ",
    color: "#b07aff",
    colorFade: "rgba(176,122,255,",
    desc: "Tools for visuals, UX and the dark arts of security",
    skills: [
      { name: "UI / UX Design",           level: 75, rank: "Upper-Intermediate", icon: "🎨" },
      { name: "3D Modeling",              level: 50, rank: "Intermediate",       icon: "🗿" },
      { name: "Game UI",                  level: 78, rank: "Proficient",         icon: "🖥️" },
      { name: "Kali Linux",               level: 50, rank: "Learning",           icon: "🐉" },
      { name: "Performance Optimization", level: 60, rank: "Intermediate",       icon: "⚡" },
    ],
  },
];

const RANK_COLOR = {
  "Advanced":          "rgba(212,175,55,0.9)",
  "Proficient":        "rgba(138,172,255,0.85)",
  "Intermediate":      "rgba(176,122,255,0.85)",
  "Upper-Intermediate":"rgba(138,172,255,0.85)",
  "Pre-Intermediate":  "rgba(200,180,120,0.75)",
  "Learning":          "rgba(160,200,160,0.75)",
};

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

function SkillBar({ skill, color, colorFade, inView, delay }) {
  const [filled, setFilled] = useState(false);
  useEffect(() => {
    if (inView) {
      const t = setTimeout(() => setFilled(true), delay);
      return () => clearTimeout(t);
    }
  }, [inView, delay]);

  return (
    <div style={barStyles.wrap}>
      <div style={barStyles.topRow}>
        <span style={barStyles.skillName}>
          <span style={{ marginRight: "8px" }}>{skill.icon}</span>
          {skill.name}
        </span>
        <div style={barStyles.rightCol}>
          <span style={{ ...barStyles.rank, color: RANK_COLOR[skill.rank] || "#d4af37" }}>
            {skill.rank}
          </span>
          <span style={{ ...barStyles.pct, color }}>{skill.level}%</span>
        </div>
      </div>
      <div style={barStyles.track}>
        <div
          style={{
            ...barStyles.fill,
            width: filled ? `${skill.level}%` : "0%",
            background: `linear-gradient(90deg, ${colorFade}0.5), ${color})`,
            boxShadow: filled ? `0 0 12px ${colorFade}0.4)` : "none",
            transition: `width 1s cubic-bezier(0.4,0,0.2,1) ${delay * 0.001}s`,
          }}
        />
        {[25, 50, 75].map((t) => (
          <div key={t} style={{ ...barStyles.tick, left: `${t}%` }} />
        ))}
      </div>
    </div>
  );
}

function TreeCard({ tree, index }) {
  const [cardRef, inView] = useInView(0.1);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...cardStyles.card,
        borderColor: hovered ? tree.colorFade + "0.5)" : tree.colorFade + "0.18)",
        boxShadow: hovered
          ? `0 16px 50px rgba(0,0,0,0.5), 0 0 30px ${tree.colorFade}0.08)`
          : "none",
        opacity:   inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s, border-color 0.3s, box-shadow 0.3s`,
      }}
    >
      {/* Rune watermark */}
      <span style={{ ...cardStyles.rune, color: tree.colorFade + "0.05)" }}>{tree.rune}</span>

      {/* Card header */}
      <div style={cardStyles.header}>
        <div style={{
          ...cardStyles.iconCircle,
          border: `1px solid ${tree.colorFade}0.3)`,
          background: tree.colorFade + "0.07)"
        }}>
          <span style={cardStyles.icon}>{tree.icon}</span>
        </div>
        <div>
          <h3 style={{ ...cardStyles.treeName, color: tree.color }}>{tree.tree}</h3>
          <p style={cardStyles.treeSubtitle}>{tree.subtitle}</p>
        </div>
      </div>

      {/* Divider */}
      <div style={cardStyles.divider}>
        <div style={{ ...cardStyles.dividerLine, background: tree.colorFade + "0.2)" }} />
        <span style={{ ...cardStyles.dividerGlyph, color: tree.colorFade + "0.5)" }}>⬧</span>
        <div style={{ ...cardStyles.dividerLine, background: tree.colorFade + "0.2)" }} />
      </div>

      <p style={cardStyles.desc}>{tree.desc}</p>

      {/* Skill bars */}
      <div style={cardStyles.skillList}>
        {tree.skills.map((s, i) => (
          <SkillBar
            key={s.name}
            skill={s}
            color={tree.color}
            colorFade={tree.colorFade}
            inView={inView}
            delay={300 + i * 150}
          />
        ))}
      </div>

      {/* Footer badge */}
      <div style={{
        ...cardStyles.footerBadge,
        borderColor: tree.colorFade + "0.2)",
        color: tree.colorFade + "0.5)"
      }}>
        {tree.skills.length} Skills Unlocked
      </div>
    </div>
  );
}

export default function Skills() {
  const [headerRef, headerInView] = useInView(0.1);

  return (
    <section id="skills" style={styles.section}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Cinzel:wght@400;600&family=Lato:wght@300;400;700&display=swap');

        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }

        /* ── SKILLS GRID ── */
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 28px;
          margin-bottom: 60px;
        }

        /* ── MASTERY FOOTER ── */
        .mastery-footer {
          display: flex;
          justify-content: center;
          gap: 20px;
          flex-wrap: wrap;
          padding: clamp(16px, 4vw, 30px);
          border: 1px solid rgba(212,175,55,0.15);
          border-radius: 6px;
          background: rgba(212,175,55,0.03);
        }

        /* ── SKILL RANK — hide on very small screens ── */
        .skill-rank-label {
          display: inline;
        }

        /* ── TABLET ── */
        @media (max-width: 1024px) {
          .skills-grid {
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 20px;
          }
        }

        /* ── MOBILE ── */
        @media (max-width: 768px) {
          .skills-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          .mastery-footer {
            gap: 12px;
          }
        }

        /* ── SMALL MOBILE ── */
        @media (max-width: 480px) {
          .skill-rank-label { display: none; }
          .mastery-footer {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
          }
        }
      `}</style>

      {/* Ambient glows */}
      <div style={{ ...styles.glow, top: "10%",  left: "-8%",  background: "radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 70%)" }} />
      <div style={{ ...styles.glow, bottom: "5%", right: "-8%", background: "radial-gradient(circle, rgba(176,122,255,0.05) 0%, transparent 70%)" }} />
      <div style={{ ...styles.glow, top: "50%",  left: "40%",  background: "radial-gradient(circle, rgba(138,172,255,0.04) 0%, transparent 60%)" }} />

      <div style={styles.inner}>

        {/* Header */}
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
          <p style={styles.sectionLabel}>[ THE SKILL TREE ]</p>
          <h2 style={styles.sectionTitle}>
            Abilities &amp; <span style={styles.titleAccent}>Skills</span>
          </h2>
          <p style={styles.sectionSub}>
            Every person levels up. These are the disciplines I have trained, forged, and learned through real projects.
          </p>
          <div style={styles.divider}>
            <div style={styles.dividerLine} />
            <span style={styles.dividerGlyph}>⬧</span>
            <div style={styles.dividerLine} />
          </div>
        </div>

        {/* Skill tree cards */}
        <div className="skills-grid">
          {SKILL_TREES.map((tree, i) => (
            <TreeCard key={tree.tree} tree={tree} index={i} />
          ))}
        </div>

        {/* Overall mastery footer */}
        <div className="mastery-footer">
          {[
            { label: "Skills Mastered",  value: "13+", icon: "⚔️" },
            { label: "Projects Shipped", value: "5+",  icon: "🗺️" },
            { label: "Primary Engine",   value: "UE5", icon: "🔮" },
          ].map((m) => (
            <div key={m.label} style={styles.masteryItem}>
              <span style={styles.masteryIcon}>{m.icon}</span>
              <span style={styles.masteryValue}>{m.value}</span>
              <span style={styles.masteryLabel}>{m.label}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

/* ── Styles ── */
const GOLD  = "#d4af37";
const GOLDF = "rgba(212,175,55,";

const styles = {
  section: {
    minHeight: "100vh",
    background: "linear-gradient(160deg, #0a0705 0%, #0d0a14 50%, #0a0705 100%)",
    padding: "clamp(60px, 10vw, 100px) clamp(16px, 5vw, 40px)",
    position: "relative",
    overflow: "hidden",
    fontFamily: "'Cinzel', serif",
  },
  glow: {
    position: "absolute",
    width: "500px",
    height: "500px",
    borderRadius: "50%",
    pointerEvents: "none",
  },
  inner: { maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 },

  header:       { textAlign: "center", marginBottom: "clamp(30px, 5vw, 60px)" },
  divider:      { display: "flex", alignItems: "center", gap: "12px", justifyContent: "center", margin: "10px 0" },
  dividerLine:  { width: "80px", height: "1px", background: `linear-gradient(90deg, transparent, ${GOLDF}0.4), transparent)` },
  dividerGlyph: { color: GOLDF + "0.6)", fontSize: "14px" },
  sectionLabel: { fontSize: "11px", letterSpacing: "5px", color: GOLDF + "0.5)", margin: "0 0 10px", textTransform: "uppercase" },
  sectionTitle: { fontFamily: "'Cinzel Decorative', cursive", fontSize: "clamp(24px, 4vw, 48px)", color: "#e8d5a3", margin: "0 0 14px", letterSpacing: "2px" },
  titleAccent: {
    background: `linear-gradient(135deg, ${GOLD}, #f5e17a, #a87c2a, ${GOLD})`,
    backgroundSize: "300% auto",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    animation: "shimmer 4s linear infinite",
  },
  sectionSub: { fontFamily: "'Lato', sans-serif", fontWeight: 300, fontSize: "clamp(13px, 1.8vw, 15px)", color: GOLDF + "0.5)", margin: 0 },

  masteryItem:  { display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", padding: "10px 24px" },
  masteryIcon:  { fontSize: "clamp(18px, 4vw, 24px)" },
  masteryValue: { fontFamily: "'Cinzel Decorative', cursive", fontSize: "clamp(16px, 4vw, 20px)", color: GOLD },
  masteryLabel: { fontSize: "10px", letterSpacing: "2px", color: GOLDF + "0.5)", textTransform: "uppercase", textAlign: "center" },
};

const cardStyles = {
  card: {
    background: "rgba(12,9,7,0.9)",
    border: "1px solid",
    borderRadius: "8px",
    padding: "clamp(18px, 4vw, 28px)",
    position: "relative",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },
  rune:        { position: "absolute", top: "8px", right: "16px", fontSize: "120px", fontFamily: "serif", userSelect: "none", pointerEvents: "none", lineHeight: 1 },
  header:      { display: "flex", alignItems: "center", gap: "16px" },
  iconCircle:  { width: "52px", height: "52px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  icon:        { fontSize: "22px" },
  treeName:    { fontFamily: "'Cinzel Decorative', cursive", fontSize: "clamp(14px, 3vw, 17px)", margin: "0 0 3px", letterSpacing: "1px" },
  treeSubtitle:{ fontFamily: "'Lato', sans-serif", fontSize: "11px", color: "rgba(220,200,160,0.45)", margin: 0, letterSpacing: "1.5px" },
  divider:     { display: "flex", alignItems: "center", gap: "8px" },
  dividerLine: { flex: 1, height: "1px" },
  dividerGlyph:{ fontSize: "12px" },
  desc:        { fontFamily: "'Lato', sans-serif", fontWeight: 300, fontSize: "clamp(12px, 1.8vw, 13px)", color: "rgba(220,200,160,0.55)", margin: 0, lineHeight: 1.7 },
  skillList:   { display: "flex", flexDirection: "column", gap: "16px" },
  footerBadge: { alignSelf: "flex-start", padding: "4px 12px", border: "1px solid", borderRadius: "3px", fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase" },
};

const barStyles = {
  wrap:      { display: "flex", flexDirection: "column", gap: "7px" },
  topRow:    { display: "flex", justifyContent: "space-between", alignItems: "center", gap: "8px" },
  rightCol:  { display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 },
  skillName: { fontFamily: "'Cinzel', serif", fontSize: "clamp(10px, 2vw, 12px)", color: "rgba(220,200,160,0.8)", letterSpacing: "0.5px", display: "flex", alignItems: "center", flexWrap: "wrap" },
  rank:      { fontFamily: "'Lato', sans-serif", fontSize: "10px", letterSpacing: "1px", textTransform: "uppercase", whiteSpace: "nowrap" },
  pct:       { fontFamily: "'Cinzel', serif", fontSize: "12px", fontWeight: 600, minWidth: "34px", textAlign: "right" },
  track:     { height: "6px", background: "rgba(255,255,255,0.05)", borderRadius: "3px", overflow: "hidden", position: "relative", border: "1px solid rgba(255,255,255,0.06)" },
  fill:      { height: "100%", borderRadius: "3px" },
  tick:      { position: "absolute", top: 0, bottom: 0, width: "1px", background: "rgba(255,255,255,0.08)" },
};
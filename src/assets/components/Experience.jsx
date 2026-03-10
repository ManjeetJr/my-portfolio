import { useEffect, useRef, useState } from "react";

const QUESTS = [
  {
    time:     "2026– Present",
    era:      "Current Arc",
    title:    "Game Development Journey",
    subtitle: "Unreal Engine · C++ · Blueprint",
    icon:     "⚔️",
    status:   "Active",
    color:    "#d4af37",
    colorFade:"rgba(212,175,55,",
    rune:     "ᚱ",
    desc: `Actively Learning game projects in Unreal Engine 5 and C++. 
     gameplay mechanics, player movement systems, collision logic, 
    and performance optimization for real-time 3D environments. 
    Each project a new exprince — each bug, a monster slain.`,
    milestones: [
      "Built 3D Endless Running Game in UE5",
      "Mastered Blueprint visual scripting",
      "Optimized mobile 3D island environment",
      "Developed collision & physics systems",
    ],
  },
  {
    time:     "2024 – 2025",
    era:      "The Web Arc",
    title:    "Web Development & UI skils",
    subtitle: "React · JavaScript · HTML/CSS · Game UI ",
    icon:     "🌐",
    status:   "Ongoing",
    color:    "#8aacff",
    colorFade:"rgba(138,172,255,",
    rune:     "ᚷ",
    desc: ` learning frontend development in
     HTML, CSS, JavaScript, React and Game ui. Built responsive web projects and Game 
    UI/UX instincts. Launched a live portfolio on GitHub Pages and the OIIA-Cat-x 
    interactive web project.`,
    milestones: [
      "Built game-dev React portfolio on GitHub Pages",
      "Shipped OIIA-Cat-x interactive web project",
      "Mastered responsive layouts & CSS animations",
      "Learning game ui to improve more",
    ],
  },
  {
    time:     "2023 – 2025 Present",
    era:      "The Shadow Arc",
    title:    "Memories and experience",
    subtitle: "Team Innocent",
    icon:     "🛡️",
    status:   "Active",
    color:    "#b07aff",
    colorFade:"rgba(176,122,255,",
    rune:     "ᚦ",
    desc: `Joined the group with my friends and made the teams called hackHive, inoccent, Spactas and 
    participate in different competitions like
    cybersecurity, hackerthon, idea thon, CTF, and many more. Competing in CTF challenges, Learning Kali Linux , 
    and the Social Engineering Toolkit. learned a lot and haved fun with friends.`,
    milestones: [
      "Joined and make teams with friends",
      "Practised web exploitation ",
      "Used Kali Linux & SET for security research",
      "Studied Digital Forensics as core subject",
    ],
  },
  {
    time:     "Ongoing",
    era:      "The Eternal Quest",
    title:    "Continuous Learning & Growth",
    subtitle: "Advanced UE5 · Dev · Problem Solving",
    icon:     "🔮",
    status:   "Ongoing",
    color:    "#6ddc8a",
    colorFade:"rgba(109,220,138,",
    rune:     "ᚹ",
    desc: `The journey never ends. Exploring advanced Unreal Engine 5 concepts, 
    building the capstone project with Unreal  
    and sharpening problem-solving through hands-on builds. 
    Every day — a new skill point earned.`,
    milestones: [

      "Advanced UE5 optimization techniques",
      "Final year Diploma CS — MSBTE board",
    ],
  },
];

const STATUS_STYLE = {
  "Active":    { bg: "rgba(212,175,55,0.1)",  border: "rgba(212,175,55,0.4)",  text: "#d4af37" },
  "Completed": { bg: "rgba(109,220,138,0.1)", border: "rgba(109,220,138,0.4)", text: "#6ddc8a" },
  "Ongoing":   { bg: "rgba(138,172,255,0.1)", border: "rgba(138,172,255,0.4)", text: "#8aacff" },
};

function useInView(threshold = 0.15) {
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

function QuestCard({ quest, index }) {
  const [cardRef, inView] = useInView(0.1);
  const [hovered, setHovered]   = useState(false);
  const [expanded, setExpanded] = useState(false);
  const sc = STATUS_STYLE[quest.status];
  const isLeft = index % 2 === 0;

  return (
    <div
      ref={cardRef}
      style={{
        ...styles.row,
        flexDirection: isLeft ? "row" : "row-reverse",
        opacity:   inView ? 1 : 0,
        transform: inView
          ? "translateX(0)"
          : isLeft ? "translateX(-40px)" : "translateX(40px)",
        transition: `opacity 0.7s ease ${index * 0.15}s, transform 0.7s ease ${index * 0.15}s`,
      }}
    >
      {/* Time column */}
      <div style={{ ...styles.timeCol, alignItems: isLeft ? "flex-end" : "flex-start" }}>
        <span style={{ ...styles.era, color: quest.colorFade + "0.6)" }}>{quest.era}</span>
        <span style={styles.time}>{quest.time}</span>
        <span style={{ ...styles.statusPill, background: sc.bg, border: `1px solid ${sc.border}`, color: sc.text }}>
          ● {quest.status}
        </span>
      </div>

      {/* Timeline spine */}
      <div style={styles.spine}>
        <div style={{ ...styles.spineLine, background: `linear-gradient(to bottom, transparent, ${quest.colorFade}0.4), transparent)` }} />
        <div
          style={{
            ...styles.spineNode,
            border: `2px solid ${quest.color}`,
            boxShadow: hovered ? `0 0 20px ${quest.colorFade}0.5)` : `0 0 8px ${quest.colorFade}0.2)`,
            background: hovered ? quest.colorFade + "0.15)" : "rgba(12,9,7,0.95)",
            transition: "all 0.3s ease",
          }}
        >
          <span style={styles.spineIcon}>{quest.icon}</span>
        </div>
        <div style={{ ...styles.spineLine, background: `linear-gradient(to bottom, transparent, ${quest.colorFade}0.4), transparent)` }} />
      </div>

      {/* Card */}
      <div
        style={{
          ...styles.card,
          borderColor: hovered ? quest.colorFade + "0.45)" : quest.colorFade + "0.18)",
          boxShadow: hovered ? `0 12px 40px rgba(0,0,0,0.5), 0 0 24px ${quest.colorFade}0.07)` : "none",
          transition: "border-color 0.3s, box-shadow 0.3s",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Rune */}
        <span style={{ ...styles.runeWatermark, color: quest.colorFade + "0.05)" }}>{quest.rune}</span>

        {/* Header */}
        <div style={styles.cardHeader}>
          <div style={{ ...styles.cardIconCircle, border: `1px solid ${quest.colorFade}0.3)`, background: quest.colorFade + "0.07)" }}>
            <span style={styles.cardIcon}>{quest.icon}</span>
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={{ ...styles.cardTitle, color: quest.color }}>{quest.title}</h3>
            <p style={styles.cardSubtitle}>{quest.subtitle}</p>
          </div>
        </div>

        {/* Divider */}
        <div style={styles.cardDivider}>
          <div style={{ ...styles.cardDividerLine, background: quest.colorFade + "0.2)" }} />
          <span style={{ color: quest.colorFade + "0.5)", fontSize: "12px" }}>⬧</span>
          <div style={{ ...styles.cardDividerLine, background: quest.colorFade + "0.2)" }} />
        </div>

        {/* Description */}
        <p style={styles.cardDesc}>{quest.desc}</p>

        {/* Milestones toggle */}
        <button
          style={{ ...styles.toggleBtn, color: quest.color, borderColor: quest.colorFade + "0.25)" }}
          onClick={() => setExpanded((e) => !e)}
        >
          <span>{expanded ? "▲" : "▼"}</span>
          {expanded ? "Hide Milestones" : "View Milestones"}
        </button>

        {expanded && (
          <div style={styles.milestones}>
            {quest.milestones.map((m, i) => (
              <div
                key={i}
                style={{
                  ...styles.milestone,
                  borderColor: quest.colorFade + "0.2)",
                  animation: `fadeSlideUp 0.3s ease ${i * 0.07}s both`,
                }}
              >
                <span style={{ ...styles.milestoneIcon, color: quest.color }}>◆</span>
                <span style={styles.milestoneText}>{m}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Experience() {
  const [headerRef, headerInView] = useInView(0.2);

  return (
    <section id="experience" style={styles.section}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Cinzel:wght@400;600&family=Lato:wght@300;400;700&display=swap');
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
      `}</style>

      {/* Ambient glows */}
      <div style={{ ...styles.glow, top: "5%",   left: "-10%", background: "radial-gradient(circle, rgba(212,175,55,0.04) 0%, transparent 70%)" }} />
      <div style={{ ...styles.glow, bottom: "5%",right: "-10%", background: "radial-gradient(circle, rgba(176,122,255,0.04) 0%, transparent 70%)" }} />

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
          <p style={styles.sectionLabel}>[ MY ADVENTURE LOG ]</p>
          <h2 style={styles.sectionTitle}>
            My <span style={styles.titleAccent}>Journey</span>
          </h2>
          <p style={styles.sectionSub}>
            A chronicle of quests undertaken, skills forged, and battles won across the realms of game dev, web and etc.
          </p>
          <div style={styles.divider}>
            <div style={styles.dividerLine} />
            <span style={styles.dividerGlyph}>⬧</span>
            <div style={styles.dividerLine} />
          </div>
        </div>

        {/* Timeline */}
        <div style={styles.timeline}>
          {QUESTS.map((q, i) => (
            <QuestCard key={q.title} quest={q} index={i} />
          ))}
        </div>

        {/* Footer XP banner */}
        <div style={styles.xpBanner}>
          <div style={styles.xpBannerInner}>
            <span style={styles.xpBannerIcon}>📜</span>
            <div>
              <p style={styles.xpBannerTitle}>Adventure Still Ongoing</p>
              <p style={styles.xpBannerSub}>Final year · Diploma CS · DevOps Assistant</p>
            </div>
            <div style={styles.xpBarWrap}>
              <div style={styles.xpBarLabel}>
                <span>Overall XP</span><span style={{ color: "#d4af37" }}>74%</span>
              </div>
              <div style={styles.xpBarBg}>
                <div style={styles.xpBarFill} />
              </div>
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
    background: "linear-gradient(160deg, #0d0a14 0%, #0a0705 60%, #0d0a14 100%)",
    padding: "100px 40px",
    position: "relative",
    overflow: "hidden",
    fontFamily: "'Cinzel', serif",
  },
  glow: { position: "absolute", width: "600px", height: "600px", borderRadius: "50%", pointerEvents: "none" },
  inner: { maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 1 },

  header:      { textAlign: "center", marginBottom: "70px" },
  divider:     { display: "flex", alignItems: "center", gap: "12px", justifyContent: "center", margin: "10px 0" },
  dividerLine: { width: "80px", height: "1px", background: `linear-gradient(90deg, transparent, ${GOLDF}0.4), transparent)` },
  dividerGlyph:{ color: GOLDF + "0.6)", fontSize: "14px" },
  sectionLabel:{ fontSize: "11px", letterSpacing: "5px", color: GOLDF + "0.5)", margin: "0 0 10px", textTransform: "uppercase" },
  sectionTitle:{ fontFamily: "'Cinzel Decorative', cursive", fontSize: "clamp(28px,4vw,48px)", color: "#e8d5a3", margin: "0 0 14px", letterSpacing: "2px" },
  titleAccent: { background: `linear-gradient(135deg, ${GOLD}, #f5e17a, #a87c2a, ${GOLD})`, backgroundSize: "300% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "shimmer 4s linear infinite" },
  sectionSub:  { fontFamily: "'Lato', sans-serif", fontWeight: 300, fontSize: "15px", color: GOLDF + "0.5)", margin: 0 },

  /* Timeline */
  timeline: { display: "flex", flexDirection: "column", gap: "0px" },

  row: {
    display: "flex",
    alignItems: "center",
    gap: "0px",
    minHeight: "200px",
  },

  /* Time column */
  timeCol: { width: "180px", flexShrink: 0, display: "flex", flexDirection: "column", gap: "6px", padding: "0 20px" },
  era:     { fontSize: "9px", letterSpacing: "3px", textTransform: "uppercase" },
  time:    { fontFamily: "'Cinzel Decorative', cursive", fontSize: "13px", color: "#e8d5a3", lineHeight: 1.3 },
  statusPill: { fontSize: "9px", letterSpacing: "1.5px", padding: "3px 8px", borderRadius: "3px", alignSelf: "flex-start", textTransform: "uppercase" },

  /* Spine */
  spine:     { display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, width: "60px" },
  spineLine: { flex: 1, width: "1px", minHeight: "40px" },
  spineNode: { width: "48px", height: "48px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, zIndex: 1 },
  spineIcon: { fontSize: "20px" },

  /* Card */
  card: {
    flex: 1,
    background: "rgba(12,9,7,0.9)",
    border: "1px solid",
    borderRadius: "8px",
    padding: "24px",
    margin: "16px 0",
    position: "relative",
    overflow: "hidden",
  },
  runeWatermark: { position: "absolute", top: "6px", right: "14px", fontSize: "100px", fontFamily: "serif", userSelect: "none", pointerEvents: "none", lineHeight: 1 },
  cardHeader:    { display: "flex", alignItems: "center", gap: "14px", marginBottom: "14px" },
  cardIconCircle:{ width: "44px", height: "44px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  cardIcon:      { fontSize: "20px" },
  cardTitle:     { fontFamily: "'Cinzel Decorative', cursive", fontSize: "16px", margin: "0 0 4px", letterSpacing: "0.5px" },
  cardSubtitle:  { fontFamily: "'Lato', sans-serif", fontSize: "11px", color: "rgba(220,200,160,0.45)", margin: 0, letterSpacing: "1.5px" },
  cardDivider:   { display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" },
  cardDividerLine:{ flex: 1, height: "1px" },
  cardDesc:      { fontFamily: "'Lato', sans-serif", fontWeight: 300, fontSize: "13.5px", color: "rgba(220,200,160,0.65)", lineHeight: 1.8, margin: "0 0 16px" },

  toggleBtn: {
    display: "flex", alignItems: "center", gap: "8px",
    background: "none", border: "1px solid", borderRadius: "3px",
    padding: "7px 14px", cursor: "pointer",
    fontFamily: "'Cinzel', serif", fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase",
    transition: "all 0.2s ease", marginBottom: "0px",
  },

  milestones: { display: "flex", flexDirection: "column", gap: "8px", marginTop: "14px" },
  milestone:  { display: "flex", alignItems: "flex-start", gap: "10px", padding: "10px 14px", border: "1px solid", borderRadius: "4px", background: "rgba(255,255,255,0.02)" },
  milestoneIcon:{ fontSize: "9px", marginTop: "4px", flexShrink: 0 },
  milestoneText:{ fontFamily: "'Lato', sans-serif", fontSize: "13px", color: "rgba(220,200,160,0.7)", lineHeight: 1.5 },

  /* XP Banner */
  xpBanner: { marginTop: "60px", padding: "28px 32px", border: `1px solid ${GOLDF}0.2)`, borderRadius: "6px", background: GOLDF + "0.03)" },
  xpBannerInner: { display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" },
  xpBannerIcon:  { fontSize: "36px" },
  xpBannerTitle: { fontFamily: "'Cinzel Decorative', cursive", fontSize: "16px", color: "#e8d5a3", margin: "0 0 4px" },
  xpBannerSub:   { fontFamily: "'Lato', sans-serif", fontSize: "12px", color: GOLDF + "0.5)", margin: 0, letterSpacing: "1px" },
  xpBarWrap:     { flex: 1, minWidth: "200px", display: "flex", flexDirection: "column", gap: "6px" },
  xpBarLabel:    { display: "flex", justifyContent: "space-between", fontFamily: "'Cinzel', serif", fontSize: "10px", color: GOLDF + "0.5)", letterSpacing: "2px" },
  xpBarBg:       { height: "8px", background: GOLDF + "0.1)", borderRadius: "4px", overflow: "hidden", border: `1px solid ${GOLDF}0.15)` },
  xpBarFill:     { height: "100%", width: "74%", background: `linear-gradient(90deg, #a87c2a, ${GOLD})`, borderRadius: "4px", boxShadow: `0 0 12px ${GOLDF}0.4)` },
};
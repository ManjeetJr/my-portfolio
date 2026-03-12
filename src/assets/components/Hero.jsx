import { useEffect, useRef, useState } from "react";
import manjeetPhoto from "../images/manjeet.png";

const particles = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  delay: Math.random() * 5,
  duration: Math.random() * 10 + 8,
}));

const TITLES = [
  "Game Developer",
  "Unreal Engine Artist",
  "Blueprint Scripter",
  "Creative Designer",
  "3D World Builder",
];

export default function Hero() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayed, setDisplayed]   = useState("");
  const [deleting, setDeleting]     = useState(false);
  const [charIndex, setCharIndex]   = useState(0);
  const canvasRef = useRef(null);

  // Typewriter effect
  useEffect(() => {
    const current = TITLES[titleIndex];
    let timeout;
    if (!deleting && charIndex < current.length) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIndex + 1));
        setCharIndex((c) => c + 1);
      }, 80);
    } else if (!deleting && charIndex === current.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIndex - 1));
        setCharIndex((c) => c - 1);
      }, 40);
    } else if (deleting && charIndex === 0) {
      setDeleting(false);
      setTitleIndex((i) => (i + 1) % TITLES.length);
    }
    return () => clearTimeout(timeout);
  }, [charIndex, deleting, titleIndex]);

  // Canvas rune circle animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let angle = 0;

    const draw = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const r  = Math.min(cx, cy) * 0.82;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);
      ctx.strokeStyle = "rgba(212,175,55,0.25)";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([8, 16]);
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.stroke();
      for (let i = 0; i < 12; i++) {
        const a = (i / 12) * Math.PI * 2;
        const x = Math.cos(a) * r;
        const y = Math.sin(a) * r;
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(a + Math.PI / 2);
        ctx.strokeStyle = "rgba(212,175,55,0.6)";
        ctx.lineWidth = 1.5;
        ctx.setLineDash([]);
        ctx.beginPath();
        ctx.moveTo(-5, -8);
        ctx.lineTo(0, 8);
        ctx.lineTo(5, -8);
        ctx.stroke();
        ctx.restore();
      }
      ctx.restore();

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(-angle * 0.6);
      ctx.strokeStyle = "rgba(180,100,255,0.18)";
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 12]);
      ctx.beginPath();
      ctx.arc(0, 0, r * 0.72, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r * 0.45);
      grad.addColorStop(0, "rgba(212,175,55,0.07)");
      grad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, r * 0.45, 0, Math.PI * 2);
      ctx.fill();

      angle += 0.003;
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <section id="hero" style={styles.section}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Cinzel:wght@400;600&family=Lato:wght@300;400&display=swap');

        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.6; }
          50%       { transform: translateY(-20px) scale(1.3); opacity: 1; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes pulse-ring {
          0%, 100% { box-shadow: 0 0 20px rgba(212,175,55,0.3), 0 0 60px rgba(212,175,55,0.1); }
          50%       { box-shadow: 0 0 40px rgba(212,175,55,0.6), 0 0 100px rgba(212,175,55,0.2); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── HERO LAYOUT ── */
        .hero-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 60px;
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
          position: relative;
          z-index: 2;
          animation: fadeSlideUp 0.8s ease forwards;
        }
        .hero-text-side {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .hero-canvas-side {
          width: 380px;
          height: 380px;
          position: relative;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        }
        .hero-stat-row {
          display: flex;
          gap: 30px;
          flex-wrap: wrap;
        }
        .hero-buttons {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
        }
        .hero-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 28px;
          background: linear-gradient(135deg, #d4af37, #a87c2a);
          color: #0a0705;
          font-family: 'Cinzel', serif;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 2px;
          text-decoration: none;
          text-transform: uppercase;
          border-radius: 3px;
          box-shadow: 0 4px 20px rgba(212,175,55,0.3);
          transition: all 0.3s ease;
          white-space: nowrap;
        }
        .hero-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 28px rgba(212,175,55,0.45);
        }
        .hero-btn-outline {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          border: 1px solid rgba(212,175,55,0.5);
          color: rgba(212,175,55,0.85);
          font-family: 'Cinzel', serif;
          font-size: 12px;
          letter-spacing: 2px;
          text-decoration: none;
          text-transform: uppercase;
          border-radius: 3px;
          background: rgba(212,175,55,0.04);
          transition: all 0.3s ease;
          white-space: nowrap;
        }
        .hero-btn-outline:hover {
          background: rgba(212,175,55,0.1);
          border-color: rgba(212,175,55,0.8);
        }

        /* ── TABLET (≤ 1024px) ── */
        @media (max-width: 1024px) {
          .hero-container    { gap: 40px; }
          .hero-canvas-side  { width: 300px; height: 300px; }
        }

        /* ── MOBILE (≤ 768px) ── */
        @media (max-width: 768px) {
          .hero-container {
            flex-direction: column-reverse;  /* avatar on top, text below */
            gap: 24px;
            text-align: center;
          }
          .hero-text-side  { align-items: center; gap: 16px; }
          .hero-canvas-side { width: 260px; height: 260px; }
          .hero-stat-row   { justify-content: center; gap: 16px; }
          .hero-buttons    { justify-content: center; }
          .hero-tagline    { text-align: center !important; border-left: none !important; padding-left: 0 !important; border-top: 2px solid rgba(212,175,55,0.3); padding-top: 14px !important; }
          .hero-title-row  { justify-content: center; }
        }

        /* ── SMALL MOBILE (≤ 480px) ── */
        @media (max-width: 480px) {
          .hero-canvas-side  { width: 220px; height: 220px; }
          .hero-btn-primary,
          .hero-btn-outline  { width: 100%; justify-content: center; padding: 14px 20px; }
          .hero-buttons      { flex-direction: column; width: 100%; max-width: 300px; }
          .hero-stat-row     { gap: 10px; }
        }
      `}</style>

      {/* Parchment texture overlay */}
      <div style={styles.parchmentOverlay} />

      {/* Floating particles */}
      <div style={styles.particleContainer}>
        {particles.map((p) => (
          <div
            key={p.id}
            style={{
              ...styles.particle,
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Top decorative border */}
      <div style={styles.topBorder}>
        <div style={styles.borderLine} />
        <div style={styles.borderDiamond}>⬧</div>
        <div style={styles.borderLine} />
      </div>

      <div className="hero-container">
        {/* Left: Text content */}
        <div className="hero-text-side">
          <p style={styles.classLabel}>
            <span style={styles.classBracket}>[ </span>
            HERO CLASS
            <span style={styles.classBracket}> ]</span>
          </p>

          <h1 style={styles.name}>
            Manjeet
            <br />
            <span style={styles.nameAccent}>Dhiman</span>
          </h1>

          <div className="hero-title-row" style={styles.titleRow}>
            <span style={styles.titleGlyph}>⚔</span>
            <span style={styles.typewriter}>
              {displayed}
              <span style={styles.cursor}>|</span>
            </span>
          </div>

          <p className="hero-tagline" style={styles.tagline}>
            I forge immersive game worlds and interactive experiences — crafting
            performance-driven gameplay mechanics, player-first design, and
            living, breathing digital realms.
          </p>

          <div className="hero-stat-row">
            {[
              { label: "Engine",   value: "Unreal 5" },
              { label: "Language", value: "C++ / BP"  },
              { label: "Focus",    value: "Game Dev"  },
            ].map((s) => (
              <div key={s.label} style={styles.stat}>
                <span style={styles.statValue}>{s.value}</span>
                <span style={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </div>

          <div className="hero-buttons">
            <a href="#projects" className="hero-btn-primary">
              <span>⚔</span> View Quests
            </a>
            <a href="#contact" className="hero-btn-outline">
              <span>✉</span> Send Scroll
            </a>
            <a href="/Manjeet_Dhiman.pdf" className="hero-btn-outline" download>
              <span>📜</span> Download Resume
            </a>
          </div>
        </div>

        {/* Right: Canvas rune circle + avatar */}
        <div className="hero-canvas-side">
          <canvas ref={canvasRef} style={styles.canvas} />
          <div style={styles.avatarRing}>
            <div style={styles.avatarInner}>
              <img
                src={manjeetPhoto}
                alt="Manjeet Dhiman"
                style={styles.avatarPhoto}
              />
            </div>
          </div>
          <p style={styles.levelBadge}>LVL 22 · GAME DEVELOPER</p>
        </div>
      </div>

      {/* Bottom decorative border */}
      <div style={{ ...styles.topBorder, marginTop: "20px", marginBottom: 0 }}>
        <div style={styles.borderLine} />
        <div style={styles.borderDiamond}>⬧</div>
        <div style={styles.borderLine} />
      </div>
    </section>
  );
}

const styles = {
  section: {
    minHeight: "100vh",
    background: "linear-gradient(160deg, #0a0705 0%, #120d08 40%, #0d0a14 100%)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "clamp(80px, 10vw, 100px) clamp(16px, 5vw, 40px) clamp(40px, 6vw, 60px)",
    position: "relative",
    overflow: "hidden",
    fontFamily: "'Cinzel', serif",
  },
  parchmentOverlay: {
    position: "absolute",
    inset: 0,
    backgroundImage: `
      radial-gradient(ellipse at 20% 50%, rgba(212,175,55,0.04) 0%, transparent 60%),
      radial-gradient(ellipse at 80% 50%, rgba(120,60,200,0.06) 0%, transparent 60%)
    `,
    pointerEvents: "none",
    zIndex: 0,
  },
  particleContainer: {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    zIndex: 1,
  },
  particle: {
    position: "absolute",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(212,175,55,0.9), rgba(212,175,55,0))",
    animation: "float linear infinite",
  },
  topBorder: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    position: "relative",
    zIndex: 2,
    marginBottom: "20px",
  },
  borderLine: {
    flex: 1,
    height: "1px",
    background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.5), transparent)",
  },
  borderDiamond: {
    color: "rgba(212,175,55,0.7)",
    fontSize: "18px",
  },
  classLabel: {
    fontSize: "12px",
    letterSpacing: "4px",
    color: "rgba(212,175,55,0.6)",
    textTransform: "uppercase",
    margin: 0,
  },
  classBracket: { color: "rgba(212,175,55,0.9)" },
  name: {
    fontFamily: "'Cinzel Decorative', cursive",
    fontSize: "clamp(36px, 8vw, 78px)",
    lineHeight: 1.05,
    margin: 0,
    color: "#e8d5a3",
    letterSpacing: "2px",
    textShadow: "0 0 40px rgba(212,175,55,0.2)",
  },
  nameAccent: {
    background: "linear-gradient(135deg, #d4af37, #f5e17a, #a87c2a, #d4af37)",
    backgroundSize: "300% auto",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    animation: "shimmer 4s linear infinite",
  },
  titleRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    minHeight: "32px",
  },
  titleGlyph: {
    fontSize: "20px",
    filter: "sepia(1) saturate(3) hue-rotate(10deg)",
  },
  typewriter: {
    fontFamily: "'Cinzel', serif",
    fontSize: "clamp(12px, 3vw, 20px)",
    color: "rgba(212,175,55,0.85)",
    letterSpacing: "3px",
    textTransform: "uppercase",
  },
  cursor: {
    animation: "blink 1s step-end infinite",
    color: "#d4af37",
    marginLeft: "2px",
  },
  tagline: {
    fontFamily: "'Lato', sans-serif",
    fontWeight: 300,
    fontSize: "clamp(13px, 1.8vw, 17px)",
    color: "rgba(220,200,160,0.65)",
    lineHeight: 1.8,
    maxWidth: "520px",
    margin: 0,
    borderLeft: "2px solid rgba(212,175,55,0.3)",
    paddingLeft: "18px",
  },
  stat: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "10px 16px",
    border: "1px solid rgba(212,175,55,0.2)",
    background: "rgba(212,175,55,0.04)",
    borderRadius: "4px",
    gap: "4px",
  },
  statValue: {
    fontFamily: "'Cinzel', serif",
    fontSize: "clamp(11px, 2vw, 14px)",
    color: "#d4af37",
    letterSpacing: "1px",
  },
  statLabel: {
    fontSize: "10px",
    letterSpacing: "2px",
    color: "rgba(220,200,160,0.4)",
    textTransform: "uppercase",
  },
  canvas: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
  },
  avatarRing: {
    width: "clamp(120px, 40%, 160px)",
    height: "clamp(120px, 40%, 160px)",
    borderRadius: "50%",
    border: "2px solid rgba(212,175,55,0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "radial-gradient(circle, rgba(30,20,10,0.9), rgba(10,7,5,0.95))",
    animation: "pulse-ring 3s ease-in-out infinite",
    position: "relative",
    zIndex: 2,
  },
  avatarInner: {
    width: "82%",
    height: "82%",
    borderRadius: "50%",
    border: "1px solid rgba(212,175,55,0.3)",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(10,7,5,0.5)",
  },
  avatarPhoto: {
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    objectFit: "cover",
    objectPosition: "center top",
    filter: "drop-shadow(0 0 20px rgba(212,175,55,0.4)) sepia(0.15) contrast(1.05)",
    display: "block",
  },
  levelBadge: {
    fontFamily: "'Cinzel', serif",
    fontSize: "clamp(9px, 2vw, 11px)",
    letterSpacing: "3px",
    color: "rgba(212,175,55,0.6)",
    textTransform: "uppercase",
    marginTop: "16px",
    position: "relative",
    zIndex: 2,
  },
};
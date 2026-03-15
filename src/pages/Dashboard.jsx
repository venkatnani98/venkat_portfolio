import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// ─── TUNING CONSTANTS ────────────────────────────────────────────────────────
const SCALE       = 2;    // 2px per physics cell = HD resolution
const DAMPING     = 0.988;// 0.97=dies fast | 0.997=waves last forever
const SPLASH_STR  = 700;  // mouse splash height
const SPLASH_R    = 8;    // mouse splash radius (cells)
const REFRACTION  = 14;   // pixels background shifts per unit of gradient
const AMBIENT_MS  = 750;  // ms between automatic ambient rain drips
const AMBIENT_STR = 110;  // ambient drip strength (should be gentle)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Bilinear interpolation sampler.
 * Reads a pixel at a floating-point (fx, fy) position by blending
 * the four surrounding integer pixels. This is what makes the refraction
 * smooth instead of blocky/stepped.
 */
function bilinear(bd, W, H, fx, fy) {
  const x0 = Math.max(0, Math.min(W - 2, Math.floor(fx)));
  const y0 = Math.max(0, Math.min(H - 2, Math.floor(fy)));
  const x1 = x0 + 1, y1 = y0 + 1;
  const wx = fx - x0, wy = fy - y0;
  const a = (1 - wx) * (1 - wy);
  const b = wx       * (1 - wy);
  const c = (1 - wx) * wy;
  const d = wx       * wy;
  const i00 = (y0 * W + x0) * 4;
  const i10 = (y0 * W + x1) * 4;
  const i01 = (y1 * W + x0) * 4;
  const i11 = (y1 * W + x1) * 4;
  return [
    bd[i00]*a + bd[i10]*b + bd[i01]*c + bd[i11]*d,
    bd[i00+1]*a + bd[i10+1]*b + bd[i01+1]*c + bd[i11+1]*d,
    bd[i00+2]*a + bd[i10+2]*b + bd[i01+2]*c + bd[i11+2]*d,
  ];
}

export default function HeroSection() {
  const canvasRef  = useRef(null);
  const sectionRef = useRef(null);
  const buffers    = useRef(null);
  const animRef    = useRef(null);
  const bgDataRef  = useRef(null);
  const dimsRef    = useRef({ w: 0, h: 0, width: 0, height: 0 });

  // Spring-smoothed cursor — inner dot trails slightly behind for fluid feel
  const rawX = useMotionValue(-300);
  const rawY = useMotionValue(-300);
  const dotX = useSpring(rawX, { stiffness: 900, damping: 45 });
  const dotY = useSpring(rawY, { stiffness: 900, damping: 45 });
  const ringX = useSpring(rawX, { stiffness: 200, damping: 28 });
  const ringY = useSpring(rawY, { stiffness: 200, damping: 28 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext("2d");

    // ── Offscreen canvas for the background texture ───────────────────────────
    // The grid drawn here will visibly WARP as waves pass — that warping is the
    // "refraction" that makes this look like real water.
    const bg    = document.createElement("canvas");
    const bgCtx = bg.getContext("2d");

    function buildBg(W, H) {
      bg.width = W; bg.height = H;

      // Deep ocean darkness
      const rad = bgCtx.createRadialGradient(W*.5, H*.38, 0, W*.5, H*.5, Math.max(W,H)*.85);
      rad.addColorStop(0,   "#001c2e");
      rad.addColorStop(0.45,"#000e18");
      rad.addColorStop(1,   "#000409");
      bgCtx.fillStyle = rad;
      bgCtx.fillRect(0, 0, W, H);

      // Grid lines — the key visual target for refraction
      const G = 55;
      bgCtx.lineWidth = 1;
      // Horizontal
      for (let y = 0; y < H; y += G) {
        bgCtx.strokeStyle = "rgba(0,185,235,0.16)";
        bgCtx.beginPath(); bgCtx.moveTo(0,y); bgCtx.lineTo(W,y); bgCtx.stroke();
      }
      // Vertical
      for (let x = 0; x < W; x += G) {
        bgCtx.strokeStyle = "rgba(0,185,235,0.16)";
        bgCtx.beginPath(); bgCtx.moveTo(x,0); bgCtx.lineTo(x,H); bgCtx.stroke();
      }
      // Intersection dots
      for (let x = 0; x < W; x += G) {
        for (let y = 0; y < H; y += G) {
          bgCtx.beginPath();
          bgCtx.arc(x, y, 1.8, 0, Math.PI*2);
          bgCtx.fillStyle = "rgba(0,229,255,0.3)";
          bgCtx.fill();
        }
      }

      // Vignette overlay
      const vig = bgCtx.createRadialGradient(W/2,H/2, H*.28, W/2,H/2, Math.max(W,H)*.75);
      vig.addColorStop(0, "rgba(0,0,0,0)");
      vig.addColorStop(1, "rgba(0,0,0,0.62)");
      bgCtx.fillStyle = vig;
      bgCtx.fillRect(0, 0, W, H);

      bgDataRef.current = bgCtx.getImageData(0, 0, W, H);
    }

    function resize() {
      const el = sectionRef.current;
      if (!el) return;
      const W = el.clientWidth, H = el.clientHeight;
      canvas.width = W; canvas.height = H;
      const w = Math.floor(W / SCALE);
      const h = Math.floor(H / SCALE);
      dimsRef.current = { w, h, width: W, height: H };
      buffers.current = {
        buf1: new Float32Array(w * h),
        buf2: new Float32Array(w * h),
      };
      buildBg(W, H);
    }

    resize();
    window.addEventListener("resize", resize);

    // ── Gaussian splash ───────────────────────────────────────────────────────
    // Gaussian falloff creates a smooth circular wave origin instead of a
    // hard disk edge — much more natural looking.
    function disturb(mx, my, str = SPLASH_STR, R = SPLASH_R) {
      if (!buffers.current) return;
      const { w, h } = dimsRef.current;
      const cx = Math.floor(mx / SCALE);
      const cy = Math.floor(my / SCALE);
      const R2 = R * R;
      for (let dy = -R; dy <= R; dy++) {
        for (let dx = -R; dx <= R; dx++) {
          if (dx*dx + dy*dy > R2) continue;
          const nx = cx+dx, ny = cy+dy;
          if (nx<=0||nx>=w-1||ny<=0||ny>=h-1) continue;
          buffers.current.buf1[ny*w+nx] += str * Math.exp(-(dx*dx+dy*dy)/(R2*.45));
        }
      }
    }


    // ── Render loop ───────────────────────────────────────────────────────────
    function tick() {
      if (!buffers.current || !bgDataRef.current) {
        animRef.current = requestAnimationFrame(tick); return;
      }
      const { buf1, buf2 }           = buffers.current;
      const { w, h, width, height }  = dimsRef.current;
      const bd                       = bgDataRef.current.data;

      // 1 ── Wave physics
      for (let y = 1; y < h-1; y++) {
        for (let x = 1; x < w-1; x++) {
          const i = y*w+x;
          buf2[i] = (buf1[(y-1)*w+x] + buf1[(y+1)*w+x] +
                     buf1[y*w+(x-1)] + buf1[y*w+(x+1)]) * 0.5 - buf2[i];
          buf2[i] *= DAMPING;
        }
      }
      const tmp = buffers.current.buf1;
      buffers.current.buf1 = buffers.current.buf2;
      buffers.current.buf2 = tmp;
      const cur = buffers.current.buf1;

      // 2 ── Rendering: refraction + Phong specular
      const imageData = ctx.createImageData(width, height);
      const data      = imageData.data;

      for (let y = 1; y < h-1; y++) {
        for (let x = 1; x < w-1; x++) {
          const i = y*w+x;

          // Central-difference surface gradient (smoother than forward diff)
          const gx = (cur[i+1]   - cur[i-1])   * 0.5;
          const gy = (cur[(y+1)*w+x] - cur[(y-1)*w+x]) * 0.5;

          // ── Refraction ──────────────────────────────────────────────────
          // Shift the background sample position by the gradient.
          // High gradient = steep wave face = more bending of light.
          // This is physically what refraction IS.
          const fx = x*SCALE + gx * (REFRACTION / SCALE);
          const fy = y*SCALE + gy * (REFRACTION / SCALE);
          const [br, bg_c, bb] = bilinear(bd, width, height,
            Math.max(0, Math.min(width-1,  fx)),
            Math.max(0, Math.min(height-1, fy))
          );

          // ── Phong Specular ───────────────────────────────────────────────
          // Surface normal derived from gradient + assumed Z depth (50)
          const nz   = 50;
          const nLen = Math.sqrt(gx*gx + gy*gy + nz*nz);
          // Light direction: from upper-left (normalized)
          const nDotL = (-gx/nLen)*0.4 + (-gy/nLen)*(-0.6) + (nz/nLen)*0.69;
          const spec  = Math.pow(Math.max(0, nDotL), 5) * 300;

          // Wave height tint — crests get a slight cyan bloom
          const hAbs = Math.min(1, Math.abs(cur[i]) / 260);

          // Final RGB — background warped + specular on top + height bloom
          const R = Math.min(255, br  + spec*0.07 + hAbs*8);
          const G = Math.min(255, bg_c + spec*0.87 + hAbs*52);
          const B = Math.min(255, bb  + spec*1.00 + hAbs*72);

          // Alpha — zero where perfectly still, builds with activity
          const activity = Math.min(1,
            (Math.abs(gx) + Math.abs(gy) + Math.abs(cur[i])*0.018) / 11
          );
          const A = activity < 0.004 ? 0 : Math.min(238, 25 + activity * 220);

          // Upscale SCALE×SCALE
          for (let sy = 0; sy < SCALE; sy++) {
            for (let sx = 0; sx < SCALE; sx++) {
              const px = x*SCALE+sx, py = y*SCALE+sy;
              if (px>=width||py>=height) continue;
              const pi    = (py*width+px)*4;
              data[pi]    = R;
              data[pi+1]  = G;
              data[pi+2]  = B;
              data[pi+3]  = A;
            }
          }
        }
      }

      ctx.clearRect(0, 0, width, height);
      ctx.putImageData(imageData, 0, 0);
      animRef.current = requestAnimationFrame(tick);
    }

    tick();

    // Water only on click
    function handleMouse(e) {
      const rect = sectionRef.current.getBoundingClientRect();
      const mx = e.clientX - rect.left, my = e.clientY - rect.top;
      disturb(mx, my);
    }

    // Cursor follows mouse always
    function handleCursor(e) {
      const rect = sectionRef.current.getBoundingClientRect();
      rawX.set(e.clientX - rect.left);
      rawY.set(e.clientY - rect.top);
    }

    function handleTouch(e) {
      e.preventDefault();
      const rect = sectionRef.current.getBoundingClientRect();
      Array.from(e.touches).forEach(t =>
        disturb(t.clientX-rect.left, t.clientY-rect.top, SPLASH_STR*1.3, 10)
      );
    }

    const sec = sectionRef.current;
    sec.addEventListener("mousedown", handleMouse);
    sec.addEventListener("touchmove", handleTouch, { passive: false });
    sec.addEventListener("mousemove", handleCursor);

    return () => {
      cancelAnimationFrame(animRef.current);
      sec.removeEventListener("mousedown", handleMouse);
      sec.removeEventListener("touchmove", handleTouch);
      sec.removeEventListener("mousemove", handleCursor);
      window.removeEventListener("resize", resize);
    };
  }, []); // eslint-disable-line

  return (
    <section
      ref={sectionRef}
      id="home"
      className="min-h-screen w-full flex flex-col md:flex-row items-center
                 justify-between px-6 md:px-16 bg-black text-white relative overflow-hidden"
      style={{ cursor: "none" }}
    >
      {/* Base background */}
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse 80% 60% at 50% 40%, #001828 0%, #000810 55%, #000000 100%)",
        zIndex: 0,
      }} />

      {/* Water canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }} />

      {/* Inner vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 35%, rgba(0,0,0,0.45) 100%)",
        zIndex: 2,
      }} />

      {/* ── Custom cursor: outer ring lags, inner dot snaps ── */}
      {/* Outer lagging ring */}
      <motion.div className="pointer-events-none absolute" style={{
        left: ringX, top: ringY, x:"-50%", y:"-50%", zIndex: 60,
      }}>
        <div style={{
          width: 40, height: 40, borderRadius:"50%",
          border: "1.5px solid rgba(0,229,255,0.45)",
          boxShadow: "0 0 14px rgba(0,229,255,0.18)",
          marginLeft: -20, marginTop: -20,
          position: "absolute",
        }} />
      </motion.div>
      {/* Inner snappy dot */}
      <motion.div className="pointer-events-none absolute" style={{
        left: dotX, top: dotY, x:"-50%", y:"-50%", zIndex: 61,
      }}>
        <div style={{
          width: 9, height: 9, borderRadius:"50%",
          background: "#00E5FF",
          boxShadow: "0 0 14px #00E5FF, 0 0 28px rgba(0,229,255,0.5)",
          marginLeft: -4.5, marginTop: -4.5,
          position: "absolute",
        }} />
      </motion.div>

      {/* ── Hero text content ── */}
      <motion.div
        className="flex flex-col gap-5 w-full md:w-[58%] relative"
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        style={{ zIndex: 10 }}
      >
        <motion.div className="flex items-center gap-2 w-fit"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs text-green-400 tracking-[0.18em] font-mono uppercase">
            Available · Immediate Joining · Dubai, UAE
          </span>
        </motion.div>

        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight"
          style={{ fontFamily: "'Courier New', monospace", textShadow: "0 0 80px rgba(0,229,255,0.22)" }}>
          VENKATA<br />RAMAKRISHNA
          <span style={{ color: "#00E5FF" }}> TAGARAMPUDI</span>
        </h1>

        <h2 className="text-xl md:text-2xl font-semibold" style={{ color:"rgba(255,255,255,0.78)" }}>
          Full‑Stack Developer · Python · React · Cloud
        </h2>

        <p className="text-sm md:text-base text-gray-400 leading-relaxed max-w-lg"
          style={{ borderLeft:"2px solid #00E5FF", paddingLeft:"1rem" }}>
          Building production-grade React, React Native & Python/Django
          applications across commerce, SaaS and analytics. Shipped QR-based POS
          systems, real-time health dashboards & cloud data pipelines.
          <br />
          <span className="font-semibold" style={{ color:"#00E5FF" }}>
            3+ years · 50+ devs mentored · Immediate joiner.
          </span>
        </p>

        <div className="flex flex-wrap gap-4 mt-2">
          <a href="#projects"
            className="px-6 py-3 font-bold rounded-lg transition-all duration-300"
            style={{ background:"#00E5FF", color:"#000", boxShadow:"0 0 24px rgba(0,229,255,0.45)" }}
            onMouseEnter={e => e.currentTarget.style.boxShadow="0 0 50px rgba(0,229,255,0.9)"}
            onMouseLeave={e => e.currentTarget.style.boxShadow="0 0 24px rgba(0,229,255,0.45)"}>
            View Projects →
          </a>
          <a href="/Resume-Venkata-Ramakrishna-Tagarampudi.pdf" target="_blank"
            className="px-6 py-3 rounded-lg transition-all duration-300"
            style={{ border:"1px solid rgba(255,255,255,0.25)", color:"rgba(255,255,255,0.8)" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor="#00E5FF"; e.currentTarget.style.color="#00E5FF"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor="rgba(255,255,255,0.25)"; e.currentTarget.style.color="rgba(255,255,255,0.8)"; }}>
            Download Resume
          </a>
        </div>

        <div className="flex gap-6 mt-4">
          {[{val:"3+",label:"Years"},{val:"50+",label:"Mentored"},
            {val:"6",label:"Projects"},{val:"95%",label:"Pipeline Uptime"}
          ].map((s,i) => (
            <motion.div key={s.label} className="flex flex-col items-center"
              initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:0.65+i*0.08}}>
              <span className="text-2xl font-bold" style={{color:"#00E5FF"}}>{s.val}</span>
              <span className="text-xs text-gray-500 tracking-wider">{s.label}</span>
            </motion.div>
          ))}
        </div>

        <div className="text-gray-600 text-xs mt-2 font-mono">
          +971-502211631 · venkataramakrishnatagarampudi@gmail.com
        </div>
      </motion.div>

      {/* ── Profile photo ── */}
      <motion.div
        className="w-full md:w-[40%] flex justify-center mt-12 md:mt-0 relative"
        initial={{ opacity:0, scale:0.85 }} animate={{ opacity:1, scale:1 }}
        transition={{ duration:1, delay:0.3 }} style={{ zIndex:10 }}>

        <div style={{
          position:"absolute", width:350, height:350, borderRadius:"50%",
          background:"radial-gradient(circle, rgba(0,229,255,0.18), transparent 70%)",
          filter:"blur(55px)", animation:"hglow 4s ease-in-out infinite",
        }} />

        <div style={{
          position:"relative", width:360, height:360, borderRadius:"50%",
          border:"3px solid #00E5FF", overflow:"hidden",
          boxShadow:"0 0 70px rgba(0,229,255,0.55), inset 0 0 70px rgba(0,229,255,0.06)",
        }}>
          <img src="/Propic.png" alt="Venkata Ramakrishna" className="w-full h-full object-cover" />
        </div>

        {/* Slowly rotating dashed orbit */}
        <div style={{
          position:"absolute", width:326, height:326, borderRadius:"50%",
          border:"1px dashed rgba(0,229,255,0.22)",
          animation:"orbit 20s linear infinite",
          top:"50%", left:"50%", marginTop:-163, marginLeft:-163,
        }} />
      </motion.div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        style={{ zIndex:10, color:"rgba(255,255,255,0.22)" }}>
        <span className="text-xs tracking-[0.35em] font-mono">SCROLL</span>
        <motion.div style={{ color:"#00E5FF" }}
          animate={{ y:[0,7,0] }} transition={{ duration:1.7, repeat:Infinity, ease:"easeInOut" }}>
          ↓
        </motion.div>
      </div>

      <style>{`
        @keyframes hglow { 0%,100%{transform:scale(1);opacity:.7} 50%{transform:scale(1.14);opacity:1} }
        @keyframes orbit  { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
      `}</style>
    </section>
  );
}
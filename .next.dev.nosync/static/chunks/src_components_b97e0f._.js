(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/src_components_b97e0f._.js", {

"[project]/src/components/ui/DataEngineCanvas.tsx [app-client] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, k: __turbopack_refresh__ }) => (() => {
"use strict";

__turbopack_esm__({
    "DataEngineCanvas": ()=>DataEngineCanvas
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
var _s = __turbopack_refresh__.signature();
'use client';
;
// Seeded PRNG for deterministic layout
function mulberry32(seed) {
    return ()=>{
        seed |= 0;
        seed = seed + 0x6D2B79F5 | 0;
        let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
        t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
}
function DataEngineCanvas({ className = '' }) {
    _s();
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const progressRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0) // 0 = chaos, 1 = grid
    ;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        // Reduced motion: skip animation entirely
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        let animationId;
        let width = 0;
        let height = 0;
        const PARTICLE_COUNT = 120;
        const CONNECTION_DIST = 130;
        const rng = mulberry32(77);
        let particles = [];
        function buildGrid(w, h) {
            // Arrange particles in a nice grid centered in the canvas
            const cols = Math.ceil(Math.sqrt(PARTICLE_COUNT * (w / h)));
            const rows = Math.ceil(PARTICLE_COUNT / cols);
            const cellW = w / (cols + 2);
            const cellH = h / (rows + 2);
            const offsetX = (w - cols * cellW) / 2 + cellW / 2;
            const offsetY = (h - rows * cellH) / 2 + cellH / 2;
            for(let i = 0; i < particles.length; i++){
                const col = i % cols;
                const row = Math.floor(i / cols);
                particles[i].gx = offsetX + col * cellW;
                particles[i].gy = offsetY + row * cellH;
            }
        }
        function init() {
            width = canvas.offsetWidth;
            height = canvas.offsetHeight;
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            if (particles.length === 0) {
                particles = Array.from({
                    length: PARTICLE_COUNT
                }, ()=>({
                        cx: rng() * width,
                        cy: rng() * height,
                        vx: (rng() - 0.5) * 0.4,
                        vy: (rng() - 0.5) * 0.4,
                        gx: 0,
                        gy: 0,
                        x: 0,
                        y: 0,
                        radius: 1.2 + rng() * 1.2,
                        phase: rng() * Math.PI * 2
                    }));
            }
            // Re-place chaotic positions if resized
            for (const p of particles){
                p.cx = rng() * width;
                p.cy = rng() * height;
            }
            buildGrid(width, height);
        }
        // Scroll-driven morphing: measure how far the section is through the viewport
        function updateScrollProgress() {
            if (!canvas) return;
            const section = canvas.closest('section');
            if (!section) return;
            const rect = section.getBoundingClientRect();
            const vh = window.innerHeight;
            // 0 when section top enters viewport, 1 when section is centered
            const raw = 1 - rect.top / vh;
            progressRef.current = Math.max(0, Math.min(1, raw * 0.8));
        }
        function draw(time) {
            if (!ctx) return;
            ctx.clearRect(0, 0, width, height);
            const t = progressRef.current;
            // Update chaotic positions (drifting)
            for (const p of particles){
                p.cx += p.vx;
                p.cy += p.vy;
                if (p.cx < 0 || p.cx > width) p.vx *= -1;
                if (p.cy < 0 || p.cy > height) p.vy *= -1;
                // Lerp between chaos and grid based on scroll
                p.x = p.cx + (p.gx - p.cx) * t;
                p.y = p.cy + (p.gy - p.cy) * t;
            }
            // Draw connections — more visible as structure forms
            const baseAlpha = 0.08 + t * 0.14;
            for(let i = 0; i < particles.length; i++){
                for(let j = i + 1; j < particles.length; j++){
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < CONNECTION_DIST) {
                        const alpha = (1 - dist / CONNECTION_DIST) * baseAlpha;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(200, 146, 10, ${alpha})`;
                        ctx.lineWidth = 0.6;
                        ctx.stroke();
                    }
                }
            }
            // Draw particles with subtle pulse
            const now = time * 0.001;
            for (const p of particles){
                const pulse = 0.6 + 0.4 * Math.sin(now * 1.5 + p.phase);
                const opacity = (0.25 + t * 0.45) * pulse;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(200, 146, 10, ${opacity})`;
                ctx.fill();
                // Glow halo when structured
                if (t > 0.3) {
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.radius * 4, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(200, 146, 10, ${(t - 0.3) * 0.04 * pulse})`;
                    ctx.fill();
                }
            }
        }
        function loop(time) {
            updateScrollProgress();
            draw(time);
            animationId = requestAnimationFrame(loop);
        }
        const resizeObs = new ResizeObserver(()=>init());
        resizeObs.observe(canvas);
        init();
        if (prefersReduced) {
            // Show static grid state
            progressRef.current = 1;
            for (const p of particles){
                p.x = p.gx;
                p.y = p.gy;
            }
            draw(0);
        } else {
            loop(0);
        }
        return ()=>{
            cancelAnimationFrame(animationId);
            resizeObs.disconnect();
        };
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
        ref: canvasRef,
        className: `absolute inset-0 w-full h-full pointer-events-none ${className}`,
        "aria-hidden": "true"
    }, void 0, false, {
        fileName: "[project]/src/components/ui/DataEngineCanvas.tsx",
        lineNumber: 193,
        columnNumber: 5
    }, this);
}
_s(DataEngineCanvas, "Jmb7n8YhjCe8H8zbr8pcEj0Evo8=");
_c = DataEngineCanvas;
var _c;
__turbopack_refresh__.register(_c, "DataEngineCanvas");

})()),
"[project]/src/components/ui/Magnetic.tsx [app-client] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, k: __turbopack_refresh__ }) => (() => {
"use strict";

__turbopack_esm__({
    "Magnetic": ()=>Magnetic
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
var _s = __turbopack_refresh__.signature();
"use client";
;
;
function Magnetic({ children }) {
    _s();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [position, setPosition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        x: 0,
        y: 0
    });
    const handleMouse = (e)=>{
        if (!ref.current) return;
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        // Define the strength of the magnetic pull
        setPosition({
            x: middleX * 0.2,
            y: middleY * 0.2
        });
    };
    const reset = ()=>{
        setPosition({
            x: 0,
            y: 0
        });
    };
    const { x, y } = position;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        ref: ref,
        onMouseMove: handleMouse,
        onMouseLeave: reset,
        animate: {
            x,
            y
        },
        transition: {
            type: "spring",
            stiffness: 150,
            damping: 15,
            mass: 0.1
        },
        className: "inline-block",
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/ui/Magnetic.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, this);
}
_s(Magnetic, "5o4ehqgmojCHPSmxMWTPGKSjVtk=");
_c = Magnetic;
var _c;
__turbopack_refresh__.register(_c, "Magnetic");

})()),
"[project]/src/components/ui/TextScramble.tsx [app-client] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, k: __turbopack_refresh__ }) => (() => {
"use strict";

__turbopack_esm__({
    "TextScramble": ()=>TextScramble
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
var _s = __turbopack_refresh__.signature();
'use client';
;
const CHARS = '0123456789ABCDEFabcdef!@#$%&∑∆∂λ';
function TextScramble({ text, className = '', trigger = true, duration = 1200 }) {
    _s();
    const [display, setDisplay] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(text);
    const hasRun = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const rafRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!trigger || hasRun.current) return;
        hasRun.current = true;
        const start = performance.now();
        const chars = text.split('');
        const frame = (now)=>{
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out curve for more satisfying reveal
            const eased = 1 - Math.pow(1 - progress, 3);
            const revealCount = Math.floor(eased * chars.length);
            const scrambled = chars.map((ch, i)=>{
                if (i < revealCount) return ch;
                // Keep non-alphanumeric chars (like %, +, .) stable
                if (/[^a-zA-Z0-9]/.test(ch)) return ch;
                return CHARS[Math.floor(Math.random() * CHARS.length)];
            });
            setDisplay(scrambled.join(''));
            if (progress < 1) {
                rafRef.current = requestAnimationFrame(frame);
            }
        };
        rafRef.current = requestAnimationFrame(frame);
        return ()=>{
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [
        text,
        trigger,
        duration
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: className,
        children: display
    }, void 0, false, {
        fileName: "[project]/src/components/ui/TextScramble.tsx",
        lineNumber: 52,
        columnNumber: 10
    }, this);
}
_s(TextScramble, "gYaVj4Gk9aazBuLzGX6djCyMDfI=");
_c = TextScramble;
var _c;
__turbopack_refresh__.register(_c, "TextScramble");

})()),
"[project]/src/components/sections/DataEngine.tsx [app-client] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, k: __turbopack_refresh__ }) => (() => {
"use strict";

__turbopack_esm__({
    "default": ()=>DataEngine
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$DataEngineCanvas$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/ui/DataEngineCanvas.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Magnetic$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/ui/Magnetic.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$TextScramble$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/ui/TextScramble.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/framer-motion/dist/es/utils/use-in-view.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_import__("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
var _s = __turbopack_refresh__.signature();
'use client';
;
;
;
;
;
;
;
const capabilities = [
    {
        id: '01',
        title: 'Data Architecture & Pipelines',
        tagline: 'Building the bedrock.',
        body: 'We architect scalable, secure data pipelines that seamlessly ingest, clean, and unify your disparate data streams into a single source of truth — with sub-second latency and 99.9 % reliability.',
        stat: '99.8%',
        statLabel: 'Pipeline uptime delivered',
        href: '/services/data-architecture-pipelines'
    },
    {
        id: '02',
        title: 'Business Intelligence',
        tagline: 'Connecting the dots.',
        body: 'We deploy advanced BI frameworks that transform static databases into dynamic, predictive intelligence — uncovering hidden operational efficiencies and market gaps before competitors do.',
        stat: '2M+',
        statLabel: 'Events processed daily',
        href: '/services/business-intelligence'
    },
    {
        id: '03',
        title: 'Executive Dashboards',
        tagline: 'Clarity at a glance.',
        body: 'Bespoke, real-time reporting dashboards designed for the C-Suite. We distil millions of data points into beautiful, actionable visual interfaces that drive faster, smarter decisions.',
        stat: '4.2×',
        statLabel: 'Faster decision-making',
        href: '/services/executive-dashboards'
    }
];
function DataEngine() {
    _s();
    const sectionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const isInView = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInView"])(sectionRef, {
        once: true,
        margin: '-10%'
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        ref: sectionRef,
        className: "relative overflow-hidden",
        "aria-label": "Intelligence Engine capabilities",
        style: {
            background: 'linear-gradient(180deg, hsl(var(--background)) 0%, #070809 6%, #070809 94%, hsl(var(--background)) 100%)'
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "noise-overlay py-28 md:py-40 relative",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$DataEngineCanvas$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DataEngineCanvas"], {}, void 0, false, {
                    fileName: "[project]/src/components/sections/DataEngine.tsx",
                    lineNumber: 57,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute inset-0 pointer-events-none",
                    style: {
                        background: 'radial-gradient(ellipse 70% 60% at 50% 50%, transparent 40%, #070809 100%)'
                    }
                }, void 0, false, {
                    fileName: "[project]/src/components/sections/DataEngine.tsx",
                    lineNumber: 60,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative z-10 max-w-7xl mx-auto px-6 md:px-10 lg:px-20",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "max-w-2xl mb-20 md:mb-24",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[10px] md:text-xs font-mono font-semibold uppercase tracking-[0.3em] text-[#C8920A]/70 mb-5",
                                    style: {
                                        opacity: isInView ? 1 : 0,
                                        transform: isInView ? 'translateY(0)' : 'translateY(16px)',
                                        transition: 'opacity 0.6s ease, transform 0.6s ease'
                                    },
                                    children: "The Engine Room"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sections/DataEngine.tsx",
                                    lineNumber: 69,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "font-syne text-3xl md:text-5xl lg:text-[3.5rem] font-bold text-white leading-[1.1] tracking-tight",
                                    style: {
                                        opacity: isInView ? 1 : 0,
                                        transform: isInView ? 'translateY(0)' : 'translateY(24px)',
                                        transition: 'opacity 0.7s ease 0.1s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s'
                                    },
                                    children: [
                                        "The Intelligence",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                            fileName: "[project]/src/components/sections/DataEngine.tsx",
                                            lineNumber: 87,
                                            columnNumber: 31
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[#C8920A]",
                                            children: "Engine."
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/DataEngine.tsx",
                                            lineNumber: 88,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/sections/DataEngine.tsx",
                                    lineNumber: 79,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "font-sans text-base md:text-lg text-[#8a9ab0] mt-6 leading-relaxed max-w-xl",
                                    style: {
                                        opacity: isInView ? 1 : 0,
                                        transform: isInView ? 'translateY(0)' : 'translateY(20px)',
                                        transition: 'opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s'
                                    },
                                    children: "From raw telemetry to radical clarity. We build the underlying systems that make every strategic recommendation executable — and measurable."
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sections/DataEngine.tsx",
                                    lineNumber: 90,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/sections/DataEngine.tsx",
                            lineNumber: 68,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6",
                            children: capabilities.map((cap, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: cap.href,
                                    className: "glass-card relative rounded-2xl p-7 md:p-8 group block",
                                    style: {
                                        opacity: isInView ? 1 : 0,
                                        transform: isInView ? 'translateY(0)' : 'translateY(48px)',
                                        transition: `opacity 0.7s ease ${0.15 + i * 0.12}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${0.15 + i * 0.12}s`
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute inset-0 rounded-2xl bg-gradient-to-br from-[#C8920A]/[0.06] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/DataEngine.tsx",
                                            lineNumber: 116,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-mono text-[11px] font-bold tracking-[0.25em] text-[#C8920A]/50 block mb-5",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$TextScramble$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextScramble"], {
                                                text: cap.id,
                                                trigger: isInView,
                                                duration: 600 + i * 200
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/sections/DataEngine.tsx",
                                                lineNumber: 120,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/DataEngine.tsx",
                                            lineNumber: 119,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "font-syne text-xl font-bold text-white mb-1.5 leading-tight group-hover:text-[#F5C842] transition-colors duration-300",
                                            children: cap.title
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/DataEngine.tsx",
                                            lineNumber: 124,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "font-sans text-xs font-semibold uppercase tracking-widest text-[#C8920A]/60 mb-4",
                                            children: cap.tagline
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/DataEngine.tsx",
                                            lineNumber: 127,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "font-sans text-sm text-[#8a9ab0] leading-relaxed mb-8",
                                            children: cap.body
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/DataEngine.tsx",
                                            lineNumber: 132,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "border-t border-white/[0.06] pt-5 mt-auto",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "font-syne text-3xl font-bold text-[#C8920A]",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$TextScramble$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextScramble"], {
                                                        text: cap.stat,
                                                        trigger: isInView,
                                                        duration: 1000 + i * 200
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/sections/DataEngine.tsx",
                                                        lineNumber: 139,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/sections/DataEngine.tsx",
                                                    lineNumber: 138,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "font-sans text-[11px] text-[#566578] mt-1 tracking-wide",
                                                    children: cap.statLabel
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/sections/DataEngine.tsx",
                                                    lineNumber: 141,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/sections/DataEngine.tsx",
                                            lineNumber: 137,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                            className: "absolute bottom-7 right-7 w-4 h-4 text-[#C8920A]/0 group-hover:text-[#C8920A]/60 transition-all duration-300 translate-x-0 group-hover:translate-x-1"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/DataEngine.tsx",
                                            lineNumber: 147,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, cap.id, true, {
                                    fileName: "[project]/src/components/sections/DataEngine.tsx",
                                    lineNumber: 105,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/DataEngine.tsx",
                            lineNumber: 103,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-16 md:mt-20 flex flex-col sm:flex-row gap-4",
                            style: {
                                opacity: isInView ? 1 : 0,
                                transform: isInView ? 'translateY(0)' : 'translateY(20px)',
                                transition: 'opacity 0.7s ease 0.6s, transform 0.7s ease 0.6s'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Magnetic$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Magnetic"], {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/services",
                                        className: "inline-flex items-center gap-2 bg-[#C8920A] text-[#070809] px-7 py-4 rounded-full text-sm font-sans font-bold hover:bg-[#F5C842] transition-colors duration-300",
                                        children: [
                                            "Explore all capabilities",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                                className: "w-4 h-4"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/sections/DataEngine.tsx",
                                                lineNumber: 167,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/sections/DataEngine.tsx",
                                        lineNumber: 162,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sections/DataEngine.tsx",
                                    lineNumber: 161,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/cases",
                                    className: "inline-flex items-center gap-2 border border-white/[0.08] text-[#8a9ab0] px-7 py-4 rounded-full text-sm font-sans font-semibold hover:border-[#C8920A]/40 hover:text-white transition-colors duration-300",
                                    children: "View case studies"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sections/DataEngine.tsx",
                                    lineNumber: 170,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/sections/DataEngine.tsx",
                            lineNumber: 153,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/sections/DataEngine.tsx",
                    lineNumber: 65,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/sections/DataEngine.tsx",
            lineNumber: 55,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/sections/DataEngine.tsx",
        lineNumber: 46,
        columnNumber: 5
    }, this);
}
_s(DataEngine, "m0FIn5qC0vMMopIgKoO0cjjZ0cg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInView"]
    ];
});
_c = DataEngine;
var _c;
__turbopack_refresh__.register(_c, "DataEngine");

})()),
}]);

//# sourceMappingURL=src_components_b97e0f._.js.map
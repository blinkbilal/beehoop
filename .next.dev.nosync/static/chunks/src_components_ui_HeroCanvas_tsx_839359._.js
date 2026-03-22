(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/src_components_ui_HeroCanvas_tsx_839359._.js", {

"[project]/src/components/ui/HeroCanvas.tsx [app-client] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, k: __turbopack_refresh__ }) => (() => {
"use strict";

__turbopack_esm__({
    "HeroCanvas": ()=>HeroCanvas
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$react$2d$three$2d$fiber$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/@react-three/fiber/dist/react-three-fiber.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$776716bd$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__ = __turbopack_import__("[project]/node_modules/@react-three/fiber/dist/events-776716bd.esm.js [app-client] (ecmascript) <export F as useFrame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$776716bd$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useThree$3e$__ = __turbopack_import__("[project]/node_modules/@react-three/fiber/dist/events-776716bd.esm.js [app-client] (ecmascript) <export D as useThree>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next-themes/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$facade$3e$__ = __turbopack_import__("[project]/node_modules/three/build/three.module.js [app-client] (ecmascript) <facade>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$examples$2f$jsm$2f$postprocessing$2f$EffectComposer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/three/examples/jsm/postprocessing/EffectComposer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$examples$2f$jsm$2f$postprocessing$2f$RenderPass$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/three/examples/jsm/postprocessing/RenderPass.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$examples$2f$jsm$2f$postprocessing$2f$UnrealBloomPass$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/three/examples/jsm/postprocessing/UnrealBloomPass.js [app-client] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
var _s = __turbopack_refresh__.signature(), _s1 = __turbopack_refresh__.signature(), _s2 = __turbopack_refresh__.signature(), _s3 = __turbopack_refresh__.signature(), _s4 = __turbopack_refresh__.signature(), _s5 = __turbopack_refresh__.signature(), _s6 = __turbopack_refresh__.signature(), _s7 = __turbopack_refresh__.signature();
"use client";
;
;
;
;
;
;
;
// ─── Responsive configuration ──────────────────────────────────────────────
function getIsMobile() {
    return typeof window !== "undefined" && window.innerWidth < 768;
}
const DESKTOP_NODES = 280 // half density — cleaner void, more immersive
;
const MOBILE_NODES = 80;
const CONNECT_RADIUS = 2.2;
const MAX_EDGES = 4;
const NODE_RADIUS = 0.034 // slightly larger at lower density
;
const HALO_SCALE = 9;
const LIGHTNING_EDGE_TIME = 3.5 // slow-motion wave: one edge takes 3.5 s
;
const MAX_LIGHTNING = 200;
const LIGHTNING_HOPS = 9;
const ATTRACT_RADIUS = 3.0;
const ATTRACT_STRENGTH = 0.25;
const DEPTH_PARTICLES = 600;
const PULSE_COUNT = 10 // few ambient pulses — heartbeat rhythm
;
const PULSE_SPEED = 0.055 // hospital-monitor slow heartbeat
;
const VOID_PARTICLES_DESKTOP = 1500;
const VOID_PARTICLES_MOBILE = 650;
const VOID_EMBERS_DESKTOP = 340;
const VOID_EMBERS_MOBILE = 140;
// Color palette — Monochromatic Sophistication: obsidian · graphite · amber/gold.
// NO BLUE anywhere. Every accent is either deep graphite or brand amber.
const COL_GOLD = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$facade$3e$__.Color("#C8920A") // brand amber — primary accent
;
const COL_GOLD_HOT = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$facade$3e$__.Color("#FFC107") // hot amber for flashes
;
const COL_GRAPHITE = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$facade$3e$__.Color("#2D2D2D") // faint graphite for secondary
;
const COL_OBSIDIAN = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$facade$3e$__.Color("#151515") // deep obsidian for depth nodes
;
const COL_WHITE = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$facade$3e$__.Color("#ffffff");
// ─── Seeded PRNG ───────────────────────────────────────────────────────────
function mulberry32(seed) {
    return ()=>{
        seed |= 0;
        seed = seed + 0x6D2B79F5 | 0;
        let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
        t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
}
function generateGraph(count) {
    const rng = mulberry32(42);
    const positions = new Float32Array(count * 3);
    const depths = new Float32Array(count);
    const pathways = new Uint8Array(count);
    for(let i = 0; i < count; i++){
        const theta = rng() * Math.PI * 2;
        const phi = Math.acos(2 * rng() - 1);
        const depthTier = rng();
        depths[i] = depthTier;
        // rBase scaled so near-nodes fill the full viewport and deep nodes
        // fill the correspondingly wider frustum at their Z depth.
        // Camera FOV 55 at z=10 → visible half-width ≈ 9.3 at z=0;
        // rBase=5.0 * 1.85 = 9.25 ≈ exactly that, so edges touch screen border.
        // Balanced sphere centred at (0,0,0) — symmetric zOffset means the
        // centre-of-mass is at origin so Y-axis revolution looks perfectly centred.
        const rBase = 3.0 + depthTier * 3.0;
        const r = rBase * Math.cbrt(rng());
        const zOffset = (depthTier - 0.5) * 9.0 // spans ±4.5 symmetrically
        ;
        positions[i * 3] = Math.sin(phi) * Math.cos(theta) * r * 1.2;
        positions[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * r * 1.0;
        positions[i * 3 + 2] = Math.cos(phi) * r * 0.9 + zOffset;
        pathways[i] = rng() < 0.3 + depthTier * 0.5 ? 1 : 0;
    }
    const edges = [];
    const adjacency = Array.from({
        length: count
    }, ()=>[]);
    const edgeSet = new Set();
    for(let i = 0; i < count; i++){
        const dists = [];
        for(let j = 0; j < count; j++){
            if (i === j) continue;
            const dx = positions[i * 3] - positions[j * 3];
            const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
            const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
            const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
            // Increased depth scaling so widely-spread deep nodes stay connected
            const maxR = CONNECT_RADIUS + depths[i] * 3.5;
            if (d < maxR) dists.push({
                j,
                d
            });
        }
        dists.sort((a, b)=>a.d - b.d);
        let added = 0;
        for (const { j } of dists){
            if (added >= MAX_EDGES) break;
            const key = i < j ? `${i}-${j}` : `${j}-${i}`;
            if (edgeSet.has(key)) {
                added++;
                continue;
            }
            edgeSet.add(key);
            edges.push([
                i,
                j
            ]);
            adjacency[i].push(j);
            adjacency[j].push(i);
            added++;
        }
    }
    return {
        positions,
        edges,
        adjacency,
        depths,
        pathways
    };
}
// ─── Bloom post-processing (Three.js native — no @react-three/postprocessing) ──
function BloomEffect({ isDark }) {
    _s();
    const { gl, scene, camera, size } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$776716bd$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useThree$3e$__["useThree"])();
    const composerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const composer = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$examples$2f$jsm$2f$postprocessing$2f$EffectComposer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EffectComposer"](gl);
        composer.setSize(size.width, size.height);
        composer.setPixelRatio(Math.min(gl.getPixelRatio(), 2));
        const renderPass = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$examples$2f$jsm$2f$postprocessing$2f$RenderPass$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RenderPass"](scene, camera);
        composer.addPass(renderPass);
        const bloomPass = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$examples$2f$jsm$2f$postprocessing$2f$UnrealBloomPass$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UnrealBloomPass"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$facade$3e$__.Vector2(size.width, size.height), isDark ? 0.52 : 0.28, isDark ? 0.60 : 0.45, isDark ? 0.22 : 0.50);
        composer.addPass(bloomPass);
        composerRef.current = composer;
        return ()=>{
            composer.dispose();
        };
    }, [
        gl,
        scene,
        camera,
        size,
        isDark
    ]);
    // Resize handler
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        composerRef.current?.setSize(size.width, size.height);
    }, [
        size
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$776716bd$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__["useFrame"])(()=>{
        composerRef.current?.render();
    }, 1) // priority 1 — render AFTER scene updates
    ;
    return null;
}
_s(BloomEffect, "yicNtaLgkEqgfU/DigO9O+BjzbE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$776716bd$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useThree$3e$__["useThree"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$776716bd$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__["useFrame"]
    ];
});
_c = BloomEffect;
// ─── Background depth particles (atmospheric dust in the void) ─────────────
function DepthParticles({ isMobile, isDark }) {
    _s1();
    const pointsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const particleCount = isMobile ? Math.floor(DEPTH_PARTICLES * 0.4) : DEPTH_PARTICLES;
    const { positions, speeds, colors } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const rng = mulberry32(77);
        const pos = new Float32Array(particleCount * 3);
        const spd = new Float32Array(particleCount);
        const col = new Float32Array(particleCount * 3);
        for(let i = 0; i < particleCount; i++){
            pos[i * 3] = (rng() - 0.5) * 40;
            pos[i * 3 + 1] = (rng() - 0.5) * 25;
            pos[i * 3 + 2] = -rng() * 50 - 5;
            spd[i] = 0.015 + rng() * 0.06;
            // Monochromatic particles: brand amber accents + graphite dust
            const c = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$facade$3e$__.Color();
            const pick = rng();
            if (pick < 0.20) {
                c.copy(COL_GOLD).multiplyScalar(isDark ? 0.12 + rng() * 0.20 : 0.08 + rng() * 0.12);
            } else if (pick < 0.55) {
                c.copy(COL_GRAPHITE).multiplyScalar(isDark ? 0.12 + rng() * 0.25 : 0.06 + rng() * 0.12);
            } else {
                c.copy(COL_OBSIDIAN).multiplyScalar(isDark ? 0.08 + rng() * 0.14 : 0.04 + rng() * 0.08);
            }
            col[i * 3] = c.r;
            col[i * 3 + 1] = c.g;
            col[i * 3 + 2] = c.b;
        }
        return {
            positions: pos,
            speeds: spd,
            colors: col
        };
    }, [
        particleCount,
        isDark
    ]);
    const geometry = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const g = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$facade$3e$__.BufferGeometry();
        g.setAttribute("position", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$facade$3e$__.BufferAttribute(positions, 3));
        g.setAttribute("color", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$facade$3e$__.BufferAttribute(colors, 3));
        return g;
    }, [
        positions,
        colors
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$776716bd$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__["useFrame"])((state, delta)=>{
        if (!pointsRef.current) return;
        const posAttr = pointsRef.current.geometry.getAttribute("position");
        for(let i = 0; i < particleCount; i++){
            const z = posAttr.getZ(i) + speeds[i] * delta * 8;
            posAttr.setZ(i, z > 3 ? -50 : z);
            posAttr.setX(i, posAttr.getX(i) + Math.sin(state.clock.elapsedTime * 0.08 + i) * delta * 0.015);
        }
        posAttr.needsUpdate = true;
        pointsRef.current.rotation.y = state.pointer.x * 0.015;
        pointsRef.current.rotation.x = state.pointer.y * 0.008;
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("points", {
        ref: pointsRef,
        geometry: geometry,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pointsMaterial", {
            vertexColors: true,
            transparent: true,
            opacity: isDark ? 0.62 : 0.72,
            size: isDark ? 0.06 : 0.075,
            sizeAttenuation: true,
            depthWrite: false,
            blending: isDark ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$facade$3e$__.AdditiveBlending : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$facade$3e$__.NormalBlending
        }, void 0, false, {
            fileName: "[project]/src/components/ui/HeroCanvas.tsx",
            lineNumber: 217,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ui/HeroCanvas.tsx",
        lineNumber: 216,
        columnNumber: 5
    }, this);
}
_s1(DepthParticles, "cMzrpU5D4247PI9jb9ACpmDH7oU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$776716bd$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__["useFrame"]
    ];
});
_c1 = DepthParticles;
// ─── Data pulses traveling along edges ─────────────────────────────────────
function DataPulses({ graph, nodeCount, isDark }) {
    _s2();
    const instanceRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const pulseCount = Math.min(PULSE_COUNT, Math.floor(graph.edges.length * 0.06));
    const pulseState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const rng = mulberry32(99);
        return Array.from({
            length: pulseCount
        }, ()=>({
                edgeIdx: Math.floor(rng() * graph.edges.length),
                progress: rng(),
                speed: 0.5 + rng() * 1.5,
                pathway: rng() < 0.5 ? 0 : 1
            }));
    }, [
        graph.edges.length,
        pulseCount
    ]);
    const _mat = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])(()=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$facade$3e$__.Matrix4(), []);
    const _col = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])(()=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$facade$3e$__.Color(), []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$776716bd$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__["useFrame"])((_, delta)=>{
        const mesh = instanceRef.current;
        if (!mesh) return;
        for(let i = 0; i < pulseCount; i++){
            const p = pulseState[i];
            p.progress += delta * PULSE_SPEED * p.speed;
            if (p.progress > 1) {
                p.progress = 0;
                const [, b] = graph.edges[p.edgeIdx];
                const nbrs = graph.adjacency[b];
                if (nbrs.length > 0) {
                    const next = nbrs[Math.floor(Math.random() * nbrs.length)];
                    const k = b < next ? `${b}-${next}` : `${next}-${b}`;
                    const idx = graph.edges.findIndex(([a2, b2])=>(a2 < b2 ? `${a2}-${b2}` : `${b2}-${a2}`) === k);
                    if (idx >= 0) p.edgeIdx = idx;
                }
            }
            const [a, b] = graph.edges[p.edgeIdx];
            const t = p.progress;
            _mat.makeTranslation(graph.positions[a * 3] + (graph.positions[b * 3] - graph.positions[a * 3]) * t, graph.positions[a * 3 + 1] + (graph.positions[b * 3 + 1] - graph.positions[a * 3 + 1]) * t, graph.positions[a * 3 + 2] + (graph.positions[b * 3 + 2] - graph.positions[a * 3 + 2]) * t);
            mesh.setMatrixAt(i, _mat);
            const intensity = Math.sin(t * Math.PI);
            // All pulses are amber/gold — no blue
            _col.copy(COL_GOLD).lerp(COL_GOLD_HOT, intensity * 0.8);
            _col.multiplyScalar(isDark ? 0.95 + intensity * 1.2 : 0.35 + intensity * 0.55);
            mesh.setColorAt(i, _col);
        }
        mesh.instanceMatrix.needsUpdate = true;
        if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("instancedMesh", {
        ref: instanceRef,
        args: [
            undefined,
            undefined,
            pulseCount
        ],
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("sphereGeometry", {
                args: [
                    0.022,
                    6,
                    6
                ]
            }, void 0, false, {
                fileName: "[project]/src/components/ui/HeroCanvas.tsx",
                lineNumber: 277,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshBasicMaterial", {
                vertexColors: true,
                transparent: true,
                depthWrite: false,
                blending: isDark ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$facade$3e$__.AdditiveBlending : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$facade$3e$__.NormalBlending
            }, void 0, false, {
                fileName: "[project]/src/components/ui/HeroCanvas.tsx",
                lineNumber: 278,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/HeroCanvas.tsx",
        lineNumber: 276,
        columnNumber: 5
    }, this);
}
_s2(DataPulses, "wJl2/JVGsP2g8dIYLm3GqIp7lwo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$776716bd$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__["useFrame"]
    ];
});
_c2 = DataPulses;
// ─── Main neural network ───────────────────────────────────────────────────
function NeuralNetwork({ nodeCount, isDark }) {
    _s3();
    const { gl, size } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$776716bd$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useThree$3e$__["useThree"])();
    const isLight = !isDark;
    const groupRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const edgeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const nodeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const haloRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const clockRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const lerpX = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const lerpY = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const displacedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(new Float32Array(nodeCount * 3));
    const edgeMapRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(new Map());
    const lightningPoolRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const nodeFlashRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(new Float32Array(nodeCount));
    // "Stay Lit" — nodes that were hit by a wave hold a persistent ambient glow
    const nodeAmbientRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(new Float32Array(nodeCount));
    const visitedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(new Set());
    const lightInstanceRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const spawnFromRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(()=>{});
    const reducedMotion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        reducedMotion.current = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }, []);
    const graph = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])(()=>generateGraph(nodeCount), [
        nodeCount
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        displacedRef.current = new Float32Array(nodeCount * 3);
        displacedRef.current.set(graph.positions);
        nodeFlashRef.current = new Float32Array(nodeCount);
        nodeAmbientRef.current = new Float32Array(nodeCount);
    }, [
        graph.positions,
        nodeCount
    ]);
    // Build O(1) edge lookup map + fixed lightning pulse pool + spawnFrom closure
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const map = edgeMapRef.current;
        map.clear();
        graph.edges.forEach(([a, b], i)=>{
            map.set(a < b ? `${a}-${b}` : `${b}-${a}`, i);
        });
        lightningPoolRef.current = Array.from({
            length: MAX_LIGHTNING
        }, ()=>({
                fromNode: 0,
                toNode: 0,
                edgeIdx: 0,
                progress: 0,
                generation: 0,
                alive: false,
                isBlue: false
            }));
        spawnFromRef.current = (nodeIdx, generation)=>{
            if (generation > LIGHTNING_HOPS) return;
            const pool = lightningPoolRef.current;
            const eMap = edgeMapRef.current;
            const visited = visitedRef.current;
            for (const nbr of graph.adjacency[nodeIdx]){
                if (visited.has(nbr)) continue;
                visited.add(nbr);
                const key = nodeIdx < nbr ? `${nodeIdx}-${nbr}` : `${nbr}-${nodeIdx}`;
                const edgeIdx = eMap.get(key);
                if (edgeIdx === undefined) continue;
                const slot = pool.find((p)=>!p.alive);
                if (!slot) continue;
                slot.fromNode = nodeIdx;
                slot.toNode = nbr;
                slot.edgeIdx = edgeIdx;
                slot.progress = 0;
                slot.generation = generation;
                slot.alive = true;
                slot.isBlue = graph.pathways[nodeIdx] === 1 && graph.pathways[nbr] === 1;
            }
        };
    }, [
        graph
    ]);
    // Edge geometry
    const edgeGeo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const g = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$facade$3e$__.BufferGeometry();
        const pos = new Float32Array(graph.edges.length * 6);
        const col = new Float32Array(graph.edges.length * 6);
        graph.edges.forEach(([a, b], i)=>{
            pos[i * 6] = graph.positions[a * 3];
            pos[i * 6 + 1] = graph.positions[a * 3 + 1];
            pos[i * 6 + 2] = graph.positions[a * 3 + 2];
            pos[i * 6 + 3] = graph.positions[b * 3];
            pos[i * 6 + 4] = graph.positions[b * 3 + 1];
            pos[i * 6 + 5] = graph.positions[b * 3 + 2];
            // Monochromatic edges with theme-aware contrast.
            const c = isDark ? new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$facade$3e$__.Color("#2D2D2D").multiplyScalar(0.18) : new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$facade$3e$__.Color("#000000").multiplyScalar(0.72);
            col[i * 6] = c.r;
            col[i * 6 + 1] = c.g;
            col[i * 6 + 2] = c.b;
            col[i * 6 + 3] = c.r;
            col[i * 6 + 4] = c.g;
            col[i * 6 + 5] = c.b;
        });
        g.setAttribute("position", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$facade$3e$__.BufferAttribute(pos, 3));
        g.setAttribute("color", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$facade$3e$__.BufferAttribute(col, 3));
        return g;
    }, [
        graph,
        isDark
    ]);
    // Initialize instance transforms
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const mesh = nodeRef.current;
        const halo = haloRef.current;
        if (!mesh) return;
        const mat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$facade$3e$__.Matrix4();
        for(let i = 0; i < nodeCount; i++){
            mat.makeTranslation(graph.positions[i * 3], graph.positions[i * 3 + 1], graph.positions[i * 3 + 2]);
            mesh.setMatrixAt(i, mat);
            // Theme-aware node seed intensity: visible in light mode without becoming neon.
            const bc = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$facade$3e$__.Color("#FFC107").multiplyScalar(isDark ? 0.42 : 1.15);
            mesh.setColorAt(i, bc);
            if (halo) halo.setMatrixAt(i, mat);
        }
        mesh.instanceMatrix.needsUpdate = true;
        if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
        if (halo) halo.instanceMatrix.needsUpdate = true;
    }, [
        graph,
        nodeCount,
        isDark
    ]);
    // Click / touch → BFS cascade from nearest node
    const handlePointerDown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])((e)=>{
        const rect = gl.domElement.getBoundingClientRect();
        const ndcX = (e.clientX - rect.left) / rect.width * 2 - 1;
        const ndcY = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        const wx = ndcX * (size.width / size.height) * 5;
        const wy = ndcY * 5;
        let nearest = 0, minD = Infinity;
        for(let i = 0; i < nodeCount; i++){
            const dx = displacedRef.current[i * 3] - wx;
            const dy = displacedRef.current[i * 3 + 1] - wy;
            const d = dx * dx + dy * dy;
            if (d < minD) {
                minD = d;
                nearest = i;
            }
        }
        // Kill any previous wave, then propagate fresh from the clicked node
        for (const p of lightningPoolRef.current)p.alive = false;
        visitedRef.current.clear();
        visitedRef.current.add(nearest);
        nodeFlashRef.current[nearest] = 1.2 // immediately illuminate click origin
        ;
        nodeAmbientRef.current[nearest] = 0.55 // lock in "Stay Lit" baseline
        ;
        spawnFromRef.current(nearest, 0);
    }, [
        gl,
        size,
        nodeCount
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const el = gl.domElement;
        el.addEventListener("pointerdown", handlePointerDown);
        return ()=>el.removeEventListener("pointerdown", handlePointerDown);
    }, [
        gl,
        handlePointerDown
    ]);
    // Auto-trigger the first cascading wave 2 s after the graph is ready so
    // the "Stay Lit" progressive illumination is visible without a click.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const id = setTimeout(()=>{
            const seed = Math.floor(nodeCount * 0.28);
            visitedRef.current.clear();
            visitedRef.current.add(seed);
            nodeFlashRef.current[seed] = 1.2;
            nodeAmbientRef.current[seed] = 0.55;
            spawnFromRef.current(seed, 0);
        }, 2000);
        return ()=>clearTimeout(id);
    }, [
        graph,
        nodeCount
    ]);
    const _mat = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])(()=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$facade$3e$__.Matrix4(), []);
    const _col = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])(()=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$facade$3e$__.Color(), []);
    const _scl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])(()=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$facade$3e$__.Vector3(), []);
    const lightModeBoost = isDark ? 1 : 1.35;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$776716bd$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__["useFrame"])((state, delta)=>{
        if (reducedMotion.current) return;
        clockRef.current += delta;
        const t = clockRef.current;
        // Slow ambient rotation + pointer parallax
        lerpX.current = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$facade$3e$__.MathUtils.lerp(lerpX.current, state.pointer.x * 0.25, 0.02);
        lerpY.current = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$facade$3e$__.MathUtils.lerp(lerpY.current, state.pointer.y * 0.15, 0.02);
        if (groupRef.current) {
            // Multi-axis 4D revolution — primary Y spin, gentle X/Z tumble for depth.
            groupRef.current.rotation.y = lerpX.current * 0.4 + t * 0.007;
            groupRef.current.rotation.x = lerpY.current * 0.08 + Math.sin(t * 0.018) * 0.10;
            groupRef.current.rotation.z = Math.cos(t * 0.010) * 0.05;
        }
        // Cursor magnetic attraction
        const curX = state.pointer.x * (size.width / size.height) * 5;
        const curY = state.pointer.y * 5;
        const disp = displacedRef.current;
        // Hard bail if the buffer hasn't been resized to match the current nodeCount yet
        // (happens for 1-2 frames between a resize re-render and its useEffect flush)
        if (!disp || disp.length < nodeCount * 3) return;
        const base = graph.positions;
        for(let i = 0; i < nodeCount; i++){
            const bx = base[i * 3], by = base[i * 3 + 1], bz = base[i * 3 + 2];
            const dx = curX - bx, dy = curY - by;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const depthAtten = 1 - graph.depths[i] * 0.55;
            if (dist < ATTRACT_RADIUS && dist > 0.01) {
                const f = ATTRACT_STRENGTH * (1 - dist / ATTRACT_RADIUS) * depthAtten;
                disp[i * 3] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$facade$3e$__.MathUtils.lerp(disp[i * 3], bx + dx * f, 0.05);
                disp[i * 3 + 1] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$facade$3e$__.MathUtils.lerp(disp[i * 3 + 1], by + dy * f, 0.05);
                disp[i * 3 + 2] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$facade$3e$__.MathUtils.lerp(disp[i * 3 + 2], bz, 0.03);
            } else {
                disp[i * 3] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$facade$3e$__.MathUtils.lerp(disp[i * 3], bx, 0.03);
                disp[i * 3 + 1] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$facade$3e$__.MathUtils.lerp(disp[i * 3 + 1], by, 0.03);
                disp[i * 3 + 2] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$facade$3e$__.MathUtils.lerp(disp[i * 3 + 2], bz, 0.03);
            }
        }
        // Update nodes
        const mesh = nodeRef.current;
        const halo = haloRef.current;
        if (!mesh) return;
        // ── Decay: spark fades ~2 s; ambient baseline fades ~45 s ("Stay Lit") ──
        const nFlash = nodeFlashRef.current;
        const nAmb = nodeAmbientRef.current;
        for(let i = 0; i < nodeCount; i++){
            if (nFlash[i] > 0) nFlash[i] = Math.max(0, nFlash[i] - delta * 0.55);
            if (nAmb[i] > 0) nAmb[i] = Math.max(0, nAmb[i] - delta * 0.013);
        }
        // ── Advance lightning pulses; render them on the light instanced mesh ──
        const lPool = lightningPoolRef.current;
        const lightMesh = lightInstanceRef.current;
        let liveCount = 0;
        for(let li = 0; li < lPool.length; li++){
            const p = lPool[li];
            if (!p.alive) continue;
            p.progress += delta / LIGHTNING_EDGE_TIME;
            if (p.progress >= 1) {
                p.alive = false;
                nFlash[p.toNode] = Math.min(1.5, nFlash[p.toNode] + 1.0) // spark flash
                ;
                nodeAmbientRef.current[p.toNode] = Math.min(0.6, nodeAmbientRef.current[p.toNode] + 0.32) // Stay Lit
                ;
                spawnFromRef.current(p.toNode, p.generation + 1) // propagate wave
                ;
                continue;
            }
            if (lightMesh && liveCount < MAX_LIGHTNING) {
                const [edgeA, edgeB] = graph.edges[p.edgeIdx];
                const tt = p.progress;
                _mat.makeTranslation(disp[edgeA * 3] + (disp[edgeB * 3] - disp[edgeA * 3]) * tt, disp[edgeA * 3 + 1] + (disp[edgeB * 3 + 1] - disp[edgeA * 3 + 1]) * tt, disp[edgeA * 3 + 2] + (disp[edgeB * 3 + 2] - disp[edgeA * 3 + 2]) * tt);
                const midGlow = Math.sin(tt * Math.PI) // peaks at edge midpoint
                ;
                _scl.setScalar((0.9 + midGlow * 0.8) * (1 - graph.depths[edgeA] * 0.3));
                _mat.scale(_scl);
                lightMesh.setMatrixAt(liveCount, _mat);
                // All lightning orbs are amber/gold — no blue
                _col.copy(COL_GOLD_HOT).lerp(COL_WHITE, midGlow * 0.55);
                _col.multiplyScalar(2.5 + midGlow) // above bloom threshold → halo
                ;
                lightMesh.setColorAt(liveCount, _col);
                liveCount++;
            }
        }
        if (lightMesh) {
            lightMesh.count = liveCount;
            lightMesh.instanceMatrix.needsUpdate = true;
            if (lightMesh.instanceColor) lightMesh.instanceColor.needsUpdate = true;
        }
        // Set of edges currently being traversed by a lightning pulse (for wire glow)
        const activeEdgeSet = new Set();
        for (const p of lPool){
            if (p.alive) activeEdgeSet.add(p.edgeIdx);
        }
        for(let i = 0; i < nodeCount; i++){
            const px = disp[i * 3] ?? 0, py = disp[i * 3 + 1] ?? 0, pz = disp[i * 3 + 2] ?? 0;
            const depthScale = 1 - graph.depths[i] * 0.55;
            _mat.makeTranslation(px, py, pz);
            _scl.setScalar(depthScale);
            _mat.scale(_scl);
            mesh.setMatrixAt(i, _mat);
            if (halo) halo.setMatrixAt(i, _mat);
            // Breathing pulse + spark flash + persistent ambient glow ("Stay Lit" rule)
            const breathe = 0.15 + 0.1 * Math.sin(t * (0.5 + graph.depths[i] * 0.3) + i * 0.4);
            const flash = nFlash[i];
            const ambient = nAmb[i] // 40 % baseline after wave passes
            ;
            const intensity = Math.min(1, breathe + flash * 0.4 + ambient * 0.65);
            // Theme-conditional light-mode contrast pass to keep network visible on paper white.
            if (isLight) {
                _col.copy(COL_GOLD_HOT).multiplyScalar(2.15 + intensity * 0.75);
            } else {
                _col.copy(COL_GOLD).multiplyScalar(0.2 + intensity * 0.72);
                if (flash > 0.12) _col.lerp(COL_WHITE, flash * 0.52);
            }
            _col.multiplyScalar((1 - graph.depths[i] * 0.48) * lightModeBoost);
            mesh.setColorAt(i, _col);
        }
        mesh.instanceMatrix.needsUpdate = true;
        if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
        if (halo) halo.instanceMatrix.needsUpdate = true;
        // Update edges
        const eMesh = edgeRef.current;
        if (!eMesh) return;
        const posA = eMesh.geometry.getAttribute("position");
        const colA = eMesh.geometry.getAttribute("color");
        for(let ei = 0; ei < graph.edges.length; ei++){
            const [a, b] = graph.edges[ei];
            posA.setXYZ(ei * 2, disp[a * 3], disp[a * 3 + 1], disp[a * 3 + 2]);
            posA.setXYZ(ei * 2 + 1, disp[b * 3], disp[b * 3 + 1], disp[b * 3 + 2]);
            // Wire glows while actively traversed AND flashes on arrival at either endpoint
            const eb = Math.max(nFlash[a], nFlash[b]);
            const activeLightning = activeEdgeSet.has(ei) ? 0.18 : 0;
            const br = (0.018 + 0.013 * Math.sin(t * 0.45 + ei * 0.09) + activeLightning) * lightModeBoost;
            const avgD = (graph.depths[a] + graph.depths[b]) * 0.5;
            const dim = 1 - avgD * 0.55;
            // Monochromatic edges: retain motion/energy in light mode with graphite contrast.
            if (isDark) {
                _col.copy(COL_GRAPHITE).multiplyScalar((0.11 + br * 2.2 + eb * 0.62) * dim);
                if (eb > 0.20) _col.lerp(COL_GOLD, eb * 0.58);
            } else {
                _col.copy(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$facade$3e$__.Color("#000000")).multiplyScalar(0.65 + br * 2.1 + eb * 0.85);
                if (eb > 0.20) _col.lerp(COL_GOLD, eb * 0.48);
            }
            colA.setXYZ(ei * 2, _col.r, _col.g, _col.b);
            colA.setXYZ(ei * 2 + 1, _col.r, _col.g, _col.b);
        }
        posA.needsUpdate = true;
        colA.needsUpdate = true;
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        ref: groupRef,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("lineSegments", {
                ref: edgeRef,
                geometry: edgeGeo,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("lineBasicMaterial", {
                    vertexColors: true,
                    transparent: true,
                    opacity: isDark ? 1 : 0.92,
                    depthWrite: false,
                    blending: isDark ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$facade$3e$__.AdditiveBlending : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$facade$3e$__.NormalBlending
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/HeroCanvas.tsx",
                    lineNumber: 604,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ui/HeroCanvas.tsx",
                lineNumber: 603,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("instancedMesh", {
                ref: haloRef,
                args: [
                    undefined,
                    undefined,
                    nodeCount
                ],
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("sphereGeometry", {
                        args: [
                            NODE_RADIUS * HALO_SCALE,
                            6,
                            6
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/HeroCanvas.tsx",
                        lineNumber: 607,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshBasicMaterial", {
                        color: "#C8920A",
                        transparent: true,
                        opacity: isDark ? 0.1 : 0.16,
                        depthWrite: false,
                        blending: isDark ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$facade$3e$__.AdditiveBlending : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$facade$3e$__.NormalBlending
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/HeroCanvas.tsx",
                        lineNumber: 608,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/HeroCanvas.tsx",
                lineNumber: 606,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("instancedMesh", {
                ref: nodeRef,
                args: [
                    undefined,
                    undefined,
                    nodeCount
                ],
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("sphereGeometry", {
                        args: [
                            NODE_RADIUS,
                            8,
                            8
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/HeroCanvas.tsx",
                        lineNumber: 611,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshBasicMaterial", {
                        vertexColors: true,
                        transparent: true,
                        opacity: 1,
                        depthWrite: false,
                        blending: isDark ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$facade$3e$__.AdditiveBlending : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$facade$3e$__.NormalBlending
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/HeroCanvas.tsx",
                        lineNumber: 612,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/HeroCanvas.tsx",
                lineNumber: 610,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("instancedMesh", {
                ref: lightInstanceRef,
                args: [
                    undefined,
                    undefined,
                    MAX_LIGHTNING
                ],
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("sphereGeometry", {
                        args: [
                            0.042,
                            8,
                            8
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/HeroCanvas.tsx",
                        lineNumber: 616,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshBasicMaterial", {
                        vertexColors: true,
                        transparent: true,
                        depthWrite: false,
                        blending: isDark ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$facade$3e$__.AdditiveBlending : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$facade$3e$__.NormalBlending
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/HeroCanvas.tsx",
                        lineNumber: 617,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/HeroCanvas.tsx",
                lineNumber: 615,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DataPulses, {
                graph: graph,
                nodeCount: nodeCount,
                isDark: isDark
            }, void 0, false, {
                fileName: "[project]/src/components/ui/HeroCanvas.tsx",
                lineNumber: 619,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/HeroCanvas.tsx",
        lineNumber: 602,
        columnNumber: 5
    }, this);
}
_s3(NeuralNetwork, "JDy9bLnoeqNiIYT6cUUySummTM4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$776716bd$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useThree$3e$__["useThree"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$776716bd$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__["useFrame"]
    ];
});
_c3 = NeuralNetwork;
// ─── FPS-adaptive quality ──────────────────────────────────────────────────
function AdaptiveQuality() {
    _s4();
    const { gl } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$776716bd$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useThree$3e$__["useThree"])();
    const frames = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const elapsed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const downgraded = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$776716bd$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__["useFrame"])((_, delta)=>{
        if (downgraded.current) return;
        frames.current++;
        elapsed.current += delta;
        if (elapsed.current >= 2.5) {
            const fps = frames.current / elapsed.current;
            if (fps < 30) {
                gl.setPixelRatio(1);
                downgraded.current = true;
            }
            frames.current = 0;
            elapsed.current = 0;
        }
    });
    return null;
}
_s4(AdaptiveQuality, "cQnQyJZvAVXjPX5FyKRtZy6aBHk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$776716bd$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useThree$3e$__["useThree"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$776716bd$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__["useFrame"]
    ];
});
_c4 = AdaptiveQuality;
// ─── True 3D dark-mode void volume (no 2D backdrop texture) ─────────────────
function DeepSpaceVolume({ isMobile }) {
    _s5();
    const tunnelRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const emberRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const tunnelCount = isMobile ? VOID_PARTICLES_MOBILE : VOID_PARTICLES_DESKTOP;
    const emberCount = isMobile ? VOID_EMBERS_MOBILE : VOID_EMBERS_DESKTOP;
    const tunnel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const rng = mulberry32(512);
        const positions = new Float32Array(tunnelCount * 3);
        const colors = new Float32Array(tunnelCount * 3);
        const speeds = new Float32Array(tunnelCount);
        for(let i = 0; i < tunnelCount; i++){
            const a = rng() * Math.PI * 2;
            const r = 2.2 + Math.pow(rng(), 0.55) * 22;
            positions[i * 3] = Math.cos(a) * r;
            positions[i * 3 + 1] = Math.sin(a) * r * (0.72 + rng() * 0.5);
            positions[i * 3 + 2] = -rng() * 210 - 8;
            speeds[i] = 0.34 + rng() * 0.95;
            const c = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$facade$3e$__.Color("#1F1F1F");
            if (rng() > 0.8) c.lerp(COL_GOLD, 0.25);
            c.multiplyScalar(0.45 + rng() * 0.7);
            colors[i * 3] = c.r;
            colors[i * 3 + 1] = c.g;
            colors[i * 3 + 2] = c.b;
        }
        return {
            positions,
            colors,
            speeds
        };
    }, [
        tunnelCount
    ]);
    const embers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const rng = mulberry32(1024);
        const positions = new Float32Array(emberCount * 3);
        const colors = new Float32Array(emberCount * 3);
        const speeds = new Float32Array(emberCount);
        for(let i = 0; i < emberCount; i++){
            const a = rng() * Math.PI * 2;
            const r = 0.6 + Math.pow(rng(), 0.8) * 6.5;
            positions[i * 3] = Math.cos(a) * r;
            positions[i * 3 + 1] = Math.sin(a) * r * (0.7 + rng() * 0.45);
            positions[i * 3 + 2] = -rng() * 160 - 6;
            speeds[i] = 0.2 + rng() * 0.45;
            const c = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$facade$3e$__.Color().copy(COL_GOLD).lerp(COL_WHITE, rng() * 0.2);
            c.multiplyScalar(0.35 + rng() * 0.55);
            colors[i * 3] = c.r;
            colors[i * 3 + 1] = c.g;
            colors[i * 3 + 2] = c.b;
        }
        return {
            positions,
            colors,
            speeds
        };
    }, [
        emberCount
    ]);
    const tunnelGeometry = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const g = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$facade$3e$__.BufferGeometry();
        g.setAttribute("position", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$facade$3e$__.BufferAttribute(tunnel.positions, 3));
        g.setAttribute("color", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$facade$3e$__.BufferAttribute(tunnel.colors, 3));
        return g;
    }, [
        tunnel
    ]);
    const emberGeometry = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const g = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$facade$3e$__.BufferGeometry();
        g.setAttribute("position", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$facade$3e$__.BufferAttribute(embers.positions, 3));
        g.setAttribute("color", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$facade$3e$__.BufferAttribute(embers.colors, 3));
        return g;
    }, [
        embers
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$776716bd$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__["useFrame"])((state, delta)=>{
        if (!tunnelRef.current || !emberRef.current) return;
        const tunnelPos = tunnelRef.current.geometry.getAttribute("position");
        for(let i = 0; i < tunnelCount; i++){
            const nextZ = tunnelPos.getZ(i) + tunnel.speeds[i] * delta * 16;
            if (nextZ > 13) {
                const a = Math.random() * Math.PI * 2;
                const r = 2.2 + Math.pow(Math.random(), 0.55) * 22;
                tunnelPos.setX(i, Math.cos(a) * r);
                tunnelPos.setY(i, Math.sin(a) * r * (0.72 + Math.random() * 0.5));
                tunnelPos.setZ(i, -220 - Math.random() * 45);
            } else {
                tunnelPos.setZ(i, nextZ);
            }
        }
        tunnelPos.needsUpdate = true;
        const emberPos = emberRef.current.geometry.getAttribute("position");
        for(let i = 0; i < emberCount; i++){
            const nextZ = emberPos.getZ(i) + embers.speeds[i] * delta * 12;
            if (nextZ > 11) {
                const a = Math.random() * Math.PI * 2;
                const r = 0.6 + Math.pow(Math.random(), 0.8) * 6.5;
                emberPos.setX(i, Math.cos(a) * r);
                emberPos.setY(i, Math.sin(a) * r * (0.7 + Math.random() * 0.45));
                emberPos.setZ(i, -170 - Math.random() * 30);
            } else {
                emberPos.setZ(i, nextZ);
            }
        }
        emberPos.needsUpdate = true;
        tunnelRef.current.rotation.z = state.clock.elapsedTime * 0.012;
        tunnelRef.current.rotation.y = state.pointer.x * 0.05;
        emberRef.current.rotation.y = state.pointer.x * 0.08;
        emberRef.current.rotation.x = state.pointer.y * 0.04;
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("points", {
                ref: tunnelRef,
                geometry: tunnelGeometry,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pointsMaterial", {
                    vertexColors: true,
                    transparent: true,
                    opacity: 0.42,
                    size: isMobile ? 0.055 : 0.07,
                    sizeAttenuation: true,
                    depthWrite: false,
                    blending: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$facade$3e$__.AdditiveBlending
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/HeroCanvas.tsx",
                    lineNumber: 761,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ui/HeroCanvas.tsx",
                lineNumber: 760,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("points", {
                ref: emberRef,
                geometry: emberGeometry,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pointsMaterial", {
                    vertexColors: true,
                    transparent: true,
                    opacity: 0.6,
                    size: isMobile ? 0.075 : 0.1,
                    sizeAttenuation: true,
                    depthWrite: false,
                    blending: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$facade$3e$__.AdditiveBlending
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/HeroCanvas.tsx",
                    lineNumber: 772,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ui/HeroCanvas.tsx",
                lineNumber: 771,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/HeroCanvas.tsx",
        lineNumber: 759,
        columnNumber: 5
    }, this);
}
_s5(DeepSpaceVolume, "jhlfSwlmmIyZBjQFSHmeX9uuF3A=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$776716bd$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__["useFrame"]
    ];
});
_c5 = DeepSpaceVolume;
// ─── Exported canvas wrapper ───────────────────────────────────────────────
// ─── Scene background ───────────────────────────────────────────────────────────
// Dark: deep obsidian radial gradient #000000 → #0A0A0A
// Light: warm atmospheric paper void with visible depth, not flat white.
const BG_DARK = "#000000";
const BG_DARK_EDGE = "#0A0A0A";
const BG_LIGHT = "#CFC7AE";
const BG_LIGHT_EDGE = "#FFFFFF";
function SceneBackground({ isDark }) {
    _s6();
    const { scene } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$776716bd$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useThree$3e$__["useThree"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (isDark) {
            scene.background = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$facade$3e$__.Color(BG_DARK);
            return;
        }
        // Light mode uses a radial paper gradient texture.
        const canvas = document.createElement("canvas");
        canvas.width = 512;
        canvas.height = 512;
        const ctx = canvas.getContext("2d");
        const grad = ctx.createRadialGradient(256, 256, 0, 256, 256, 360);
        grad.addColorStop(0, BG_LIGHT_EDGE);
        grad.addColorStop(0.40, "#E8E1CB");
        grad.addColorStop(1, BG_LIGHT);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 512, 512);
        const tex = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$facade$3e$__.CanvasTexture(canvas);
        scene.background = tex;
        return ()=>{
            tex.dispose();
            scene.background = null;
        };
    }, [
        isDark,
        scene
    ]);
    const fogColor = isDark ? "#060606" : "#C9BFA2";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("fog", {
        attach: "fog",
        args: [
            fogColor,
            isDark ? 10 : 26,
            isDark ? 95 : 80
        ]
    }, void 0, false, {
        fileName: "[project]/src/components/ui/HeroCanvas.tsx",
        lineNumber: 824,
        columnNumber: 10
    }, this);
}
_s6(SceneBackground, "UhCC8wDD2cMyItT8qLKLhYRbhzM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$776716bd$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useThree$3e$__["useThree"]
    ];
});
_c6 = SceneBackground;
function HeroCanvas() {
    _s7();
    const [isMobile, setIsMobile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const { theme, resolvedTheme } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"])();
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setMounted(true);
    }, []);
    const activeTheme = resolvedTheme ?? theme;
    const isDark = !mounted || activeTheme === 'dark';
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setIsMobile(getIsMobile());
        const onResize = ()=>setIsMobile(getIsMobile());
        window.addEventListener("resize", onResize);
        return ()=>window.removeEventListener("resize", onResize);
    }, []);
    const nodeCount = isMobile ? MOBILE_NODES : DESKTOP_NODES;
    const maxDpr = isMobile ? 1 : Math.min(typeof window !== "undefined" ? window.devicePixelRatio : 1, 1.5);
    const bg = isDark ? BG_DARK : "#E2D8B8";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "absolute inset-0 w-screen h-screen",
        style: {
            zIndex: 0
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$react$2d$three$2d$fiber$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Canvas"], {
            camera: {
                position: [
                    0,
                    0,
                    10
                ],
                fov: 55,
                near: 0.1,
                far: 240
            },
            dpr: [
                1,
                maxDpr
            ],
            gl: {
                antialias: !isMobile,
                alpha: false,
                powerPreference: "high-performance"
            },
            style: {
                background: bg
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SceneBackground, {
                    isDark: isDark
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/HeroCanvas.tsx",
                    lineNumber: 854,
                    columnNumber: 9
                }, this),
                isDark ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DeepSpaceVolume, {
                    isMobile: isMobile
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/HeroCanvas.tsx",
                    lineNumber: 855,
                    columnNumber: 19
                }, this) : null,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DepthParticles, {
                    isMobile: isMobile,
                    isDark: isDark
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/HeroCanvas.tsx",
                    lineNumber: 856,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NeuralNetwork, {
                    nodeCount: nodeCount,
                    isDark: isDark
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/HeroCanvas.tsx",
                    lineNumber: 857,
                    columnNumber: 9
                }, this),
                isDark ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BloomEffect, {
                    isDark: isDark
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/HeroCanvas.tsx",
                    lineNumber: 858,
                    columnNumber: 19
                }, this) : null,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AdaptiveQuality, {}, void 0, false, {
                    fileName: "[project]/src/components/ui/HeroCanvas.tsx",
                    lineNumber: 859,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/ui/HeroCanvas.tsx",
            lineNumber: 848,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ui/HeroCanvas.tsx",
        lineNumber: 847,
        columnNumber: 5
    }, this);
}
_s7(HeroCanvas, "oMusLmLsnW+0ukjKjYTcxsl3ya0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"]
    ];
});
_c7 = HeroCanvas;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7;
__turbopack_refresh__.register(_c, "BloomEffect");
__turbopack_refresh__.register(_c1, "DepthParticles");
__turbopack_refresh__.register(_c2, "DataPulses");
__turbopack_refresh__.register(_c3, "NeuralNetwork");
__turbopack_refresh__.register(_c4, "AdaptiveQuality");
__turbopack_refresh__.register(_c5, "DeepSpaceVolume");
__turbopack_refresh__.register(_c6, "SceneBackground");
__turbopack_refresh__.register(_c7, "HeroCanvas");

})()),
}]);

//# sourceMappingURL=src_components_ui_HeroCanvas_tsx_839359._.js.map
(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/src_530ca4._.js", {

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
"[project]/src/components/ui/ProcessIcons.tsx [app-client] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, k: __turbopack_refresh__ }) => (() => {
"use strict";

__turbopack_esm__({
    "ProcessIcon01": ()=>ProcessIcon01,
    "ProcessIcon02": ()=>ProcessIcon02,
    "ProcessIcon03": ()=>ProcessIcon03,
    "ProcessIcon04": ()=>ProcessIcon04,
    "ProcessIcon05": ()=>ProcessIcon05,
    "processIcons": ()=>processIcons
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
'use client';
;
;
/**
 * 5 SVG line-drawing icons for the Process section.
 * Controlled via `animate` prop so the parent scroll-pinned layout
 * can trigger draw-in when each step becomes active.
 */ const draw = {
    hidden: {
        pathLength: 0,
        opacity: 0
    },
    visible: (i)=>({
            pathLength: 1,
            opacity: 1,
            transition: {
                pathLength: {
                    delay: i * 0.12,
                    type: 'spring',
                    duration: 1.0,
                    bounce: 0
                },
                opacity: {
                    delay: i * 0.12,
                    duration: 0.01
                }
            }
        })
};
const dotDraw = {
    hidden: {
        scale: 0,
        opacity: 0
    },
    visible: (i)=>({
            scale: 1,
            opacity: 1,
            transition: {
                delay: i * 0.12,
                type: 'spring',
                duration: 0.6,
                bounce: 0.3
            }
        })
};
function ProcessIcon01({ animate, className = '' }) {
    const state = animate ? 'visible' : 'hidden';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].svg, {
        viewBox: "0 0 64 64",
        className: className,
        animate: state,
        initial: "hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].circle, {
                cx: "26",
                cy: "26",
                r: "16",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "2",
                custom: 0,
                variants: draw
            }, void 0, false, {
                fileName: "[project]/src/components/ui/ProcessIcons.tsx",
                lineNumber: 43,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].path, {
                d: "M38 38 L52 52",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "3",
                strokeLinecap: "round",
                custom: 1,
                variants: draw
            }, void 0, false, {
                fileName: "[project]/src/components/ui/ProcessIcons.tsx",
                lineNumber: 44,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].path, {
                d: "M20 26 L24 26 M26 20 L26 24",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "1.5",
                strokeLinecap: "round",
                custom: 2,
                variants: draw
            }, void 0, false, {
                fileName: "[project]/src/components/ui/ProcessIcons.tsx",
                lineNumber: 45,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].circle, {
                cx: "26",
                cy: "26",
                r: "5",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "1.5",
                custom: 3,
                variants: draw
            }, void 0, false, {
                fileName: "[project]/src/components/ui/ProcessIcons.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/ProcessIcons.tsx",
        lineNumber: 42,
        columnNumber: 5
    }, this);
}
_c = ProcessIcon01;
function ProcessIcon02({ animate, className = '' }) {
    const state = animate ? 'visible' : 'hidden';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].svg, {
        viewBox: "0 0 64 64",
        className: className,
        animate: state,
        initial: "hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].path, {
                d: "M32 8 L52 28 L32 56 L12 28 Z",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "2",
                custom: 0,
                variants: draw
            }, void 0, false, {
                fileName: "[project]/src/components/ui/ProcessIcons.tsx",
                lineNumber: 56,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].path, {
                d: "M32 8 L32 24",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "1.5",
                strokeDasharray: "3 2",
                custom: 1,
                variants: draw
            }, void 0, false, {
                fileName: "[project]/src/components/ui/ProcessIcons.tsx",
                lineNumber: 57,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].path, {
                d: "M32 40 L32 56",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "1.5",
                strokeDasharray: "3 2",
                custom: 1,
                variants: draw
            }, void 0, false, {
                fileName: "[project]/src/components/ui/ProcessIcons.tsx",
                lineNumber: 58,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].path, {
                d: "M20 28 L44 28",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "1",
                strokeDasharray: "2 3",
                custom: 2,
                variants: draw
            }, void 0, false, {
                fileName: "[project]/src/components/ui/ProcessIcons.tsx",
                lineNumber: 59,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].circle, {
                cx: "32",
                cy: "28",
                r: "4",
                fill: "currentColor",
                custom: 3,
                variants: dotDraw
            }, void 0, false, {
                fileName: "[project]/src/components/ui/ProcessIcons.tsx",
                lineNumber: 60,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/ProcessIcons.tsx",
        lineNumber: 55,
        columnNumber: 5
    }, this);
}
_c1 = ProcessIcon02;
function ProcessIcon03({ animate, className = '' }) {
    const state = animate ? 'visible' : 'hidden';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].svg, {
        viewBox: "0 0 64 64",
        className: className,
        animate: state,
        initial: "hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].path, {
                d: "M10 54 L54 54",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "1.5",
                custom: 0,
                variants: draw
            }, void 0, false, {
                fileName: "[project]/src/components/ui/ProcessIcons.tsx",
                lineNumber: 70,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].path, {
                d: "M10 54 L10 10",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "1.5",
                custom: 0,
                variants: draw
            }, void 0, false, {
                fileName: "[project]/src/components/ui/ProcessIcons.tsx",
                lineNumber: 71,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].path, {
                d: "M14 44 L28 32 L38 36 L52 16",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "2",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                custom: 1,
                variants: draw
            }, void 0, false, {
                fileName: "[project]/src/components/ui/ProcessIcons.tsx",
                lineNumber: 72,
                columnNumber: 7
            }, this),
            [
                {
                    cx: 14,
                    cy: 44
                },
                {
                    cx: 28,
                    cy: 32
                },
                {
                    cx: 38,
                    cy: 36
                },
                {
                    cx: 52,
                    cy: 16
                }
            ].map((p, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].circle, {
                    cx: p.cx,
                    cy: p.cy,
                    r: "3",
                    fill: "currentColor",
                    custom: 2 + i * 0.15,
                    variants: dotDraw
                }, i, false, {
                    fileName: "[project]/src/components/ui/ProcessIcons.tsx",
                    lineNumber: 74,
                    columnNumber: 9
                }, this)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].path, {
                d: "M44 44 L48 48 L54 40",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "2",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                custom: 3,
                variants: draw
            }, void 0, false, {
                fileName: "[project]/src/components/ui/ProcessIcons.tsx",
                lineNumber: 77,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/ProcessIcons.tsx",
        lineNumber: 69,
        columnNumber: 5
    }, this);
}
_c2 = ProcessIcon03;
function ProcessIcon04({ animate, className = '' }) {
    const state = animate ? 'visible' : 'hidden';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].svg, {
        viewBox: "0 0 64 64",
        className: className,
        animate: state,
        initial: "hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].rect, {
                x: "8",
                y: "8",
                width: "48",
                height: "48",
                rx: "4",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "1.5",
                custom: 0,
                variants: draw
            }, void 0, false, {
                fileName: "[project]/src/components/ui/ProcessIcons.tsx",
                lineNumber: 87,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].path, {
                d: "M8 24 L56 24",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "0.8",
                strokeDasharray: "3 3",
                custom: 1,
                variants: draw
            }, void 0, false, {
                fileName: "[project]/src/components/ui/ProcessIcons.tsx",
                lineNumber: 88,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].path, {
                d: "M8 40 L56 40",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "0.8",
                strokeDasharray: "3 3",
                custom: 1,
                variants: draw
            }, void 0, false, {
                fileName: "[project]/src/components/ui/ProcessIcons.tsx",
                lineNumber: 89,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].path, {
                d: "M24 8 L24 56",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "0.8",
                strokeDasharray: "3 3",
                custom: 1,
                variants: draw
            }, void 0, false, {
                fileName: "[project]/src/components/ui/ProcessIcons.tsx",
                lineNumber: 90,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].path, {
                d: "M40 8 L40 56",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "0.8",
                strokeDasharray: "3 3",
                custom: 1,
                variants: draw
            }, void 0, false, {
                fileName: "[project]/src/components/ui/ProcessIcons.tsx",
                lineNumber: 91,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].circle, {
                cx: "32",
                cy: "32",
                r: "8",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "2",
                custom: 2,
                variants: draw
            }, void 0, false, {
                fileName: "[project]/src/components/ui/ProcessIcons.tsx",
                lineNumber: 92,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].path, {
                d: "M32 26 L32 38 M26 32 L38 32",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "1.5",
                strokeLinecap: "round",
                custom: 3,
                variants: draw
            }, void 0, false, {
                fileName: "[project]/src/components/ui/ProcessIcons.tsx",
                lineNumber: 93,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/ProcessIcons.tsx",
        lineNumber: 86,
        columnNumber: 5
    }, this);
}
_c3 = ProcessIcon04;
function ProcessIcon05({ animate, className = '' }) {
    const state = animate ? 'visible' : 'hidden';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].svg, {
        viewBox: "0 0 64 64",
        className: className,
        animate: state,
        initial: "hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].path, {
                d: "M32 56 L32 18 M32 18 L24 28 M32 18 L40 28",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "2.5",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                custom: 0,
                variants: draw
            }, void 0, false, {
                fileName: "[project]/src/components/ui/ProcessIcons.tsx",
                lineNumber: 103,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].path, {
                d: "M20 44 Q8 32 20 20",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "1.5",
                strokeDasharray: "3 2",
                custom: 1,
                variants: draw
            }, void 0, false, {
                fileName: "[project]/src/components/ui/ProcessIcons.tsx",
                lineNumber: 104,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].path, {
                d: "M44 44 Q56 32 44 20",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "1.5",
                strokeDasharray: "3 2",
                custom: 1,
                variants: draw
            }, void 0, false, {
                fileName: "[project]/src/components/ui/ProcessIcons.tsx",
                lineNumber: 105,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].path, {
                d: "M28 50 L32 56 L36 50",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "1.5",
                strokeLinecap: "round",
                custom: 2,
                variants: draw
            }, void 0, false, {
                fileName: "[project]/src/components/ui/ProcessIcons.tsx",
                lineNumber: 107,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].circle, {
                cx: "32",
                cy: "14",
                r: "4",
                fill: "currentColor",
                custom: 3,
                variants: dotDraw
            }, void 0, false, {
                fileName: "[project]/src/components/ui/ProcessIcons.tsx",
                lineNumber: 108,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/ProcessIcons.tsx",
        lineNumber: 102,
        columnNumber: 5
    }, this);
}
_c4 = ProcessIcon05;
const processIcons = [
    ProcessIcon01,
    ProcessIcon02,
    ProcessIcon03,
    ProcessIcon04,
    ProcessIcon05
];
var _c, _c1, _c2, _c3, _c4;
__turbopack_refresh__.register(_c, "ProcessIcon01");
__turbopack_refresh__.register(_c1, "ProcessIcon02");
__turbopack_refresh__.register(_c2, "ProcessIcon03");
__turbopack_refresh__.register(_c3, "ProcessIcon04");
__turbopack_refresh__.register(_c4, "ProcessIcon05");

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
"[project]/src/lib/data.ts [app-client] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, k: __turbopack_refresh__ }) => (() => {
"use strict";

// ─── Service pillars ────────────────────────────────────────────────────────
__turbopack_esm__({
    "achievements": ()=>achievements,
    "blogPosts": ()=>blogPosts,
    "cases": ()=>cases,
    "clientTypes": ()=>clientTypes,
    "pillarMeta": ()=>pillarMeta,
    "processSteps": ()=>processSteps,
    "services": ()=>services,
    "team": ()=>team,
    "testimonials": ()=>testimonials
});
const pillarMeta = {
    advisory: {
        label: 'Strategic Advisory',
        description: 'Board-level thinking. Real-world execution.'
    },
    intelligence: {
        label: 'Data & Intelligence',
        description: 'From raw data to radical clarity.'
    },
    engineering: {
        label: 'Digital Engineering',
        description: 'Strategy brought to life through code.'
    }
};
const services = [
    // ── Pillar 1: Strategic Advisory ─────────────────────────────────────────
    {
        icon: 'Compass',
        title: 'Strategy Development',
        slug: 'strategy-development',
        pillar: 'advisory',
        description: 'Crafting clear roadmaps and strategic priorities grounded in evidence — built for real-world execution, not the shelf.',
        longDescription: [
            'We work with leadership teams to build strategies that survive contact with reality. Our process starts with rigorous diagnosis — understanding the competitive landscape, internal capabilities, and market dynamics before committing to a direction.',
            'Our strategic frameworks integrate financial modelling, scenario planning, and organisational alignment to ensure every recommendation is actionable and measurable.',
            'From corporate strategy and business unit planning to market entry and growth acceleration, we bring structure to complexity and clarity to ambiguity.'
        ],
        deliverables: [
            'Strategic roadmap with prioritised initiatives',
            'Market & competitive analysis',
            'Financial scenario modelling',
            'Implementation playbook with KPIs',
            'Board-ready presentation materials'
        ]
    },
    {
        icon: 'GitMerge',
        title: 'M&A & Transactions',
        slug: 'mergers-and-acquisitions',
        pillar: 'advisory',
        description: 'End-to-end M&A advisory — deal origination, commercial due diligence, negotiation, and post-merger integration — across borders, sectors, and complexity levels.',
        longDescription: [
            'Our M&A practice spans the full transaction lifecycle — from target identification and commercial due diligence through to negotiation, deal structuring, and post-merger integration.',
            'We combine deep sector knowledge with rigorous financial analysis to help clients make confident investment decisions. Our approach emphasises strategic rationale as much as financial returns.',
            'Whether it\'s a cross-border acquisition, joint venture formation, or strategic divestiture, we bring the commercial judgment and execution rigour that complex deals demand.'
        ],
        deliverables: [
            'Target screening & shortlisting',
            'Commercial due diligence',
            'Deal structuring & negotiation support',
            'Valuation & financial modelling',
            'Post-merger integration planning'
        ]
    },
    {
        icon: 'Palette',
        title: 'Brand & Market Strategy',
        slug: 'brand-and-market-strategy',
        pillar: 'advisory',
        description: 'Cohesive brand identity, market positioning, and go-to-market strategy — built on research, sharpened by creative insight, and measured by commercial impact.',
        longDescription: [
            'A brand is more than a logo — it\'s the sum of every interaction your stakeholders have with your organisation. We build brand strategies that are rooted in market insight and aligned with business objectives.',
            'Our approach integrates qualitative research, competitive positioning analysis, and creative strategy to build brands that resonate with target audiences and differentiate in crowded markets.',
            'From brand architecture and visual identity to go-to-market strategy and digital presence, we deliver comprehensive brand ecosystems that drive recognition and growth.'
        ],
        deliverables: [
            'Brand strategy & positioning framework',
            'Market entry playbooks',
            'Visual identity guidelines',
            'Customer segmentation & personas',
            'Digital marketing strategy'
        ]
    },
    {
        icon: 'BarChart2',
        title: 'Financial & Data Analytics',
        slug: 'financial-and-data-analytics',
        pillar: 'advisory',
        description: 'Rigorous financial modelling, performance analytics, and data-driven intelligence — giving leadership teams the confidence to act decisively in real time.',
        longDescription: [
            'Data without context is noise. We transform raw financial and operational data into actionable insights that drive better decisions. Our analytics practice combines deep financial expertise with modern data techniques.',
            'From building sophisticated financial models and forecasting frameworks to designing executive dashboards and performance monitoring systems, we help leadership teams see clearly through complexity.',
            'Our work enables organisations to move from retrospective reporting to predictive, real-time intelligence — turning data into a genuine competitive advantage.'
        ],
        deliverables: [
            'Financial models & forecasting tools',
            'Executive performance dashboards',
            'Data integration & analytics pipelines',
            'KPI frameworks & scorecards',
            'Investment analysis & ROI tracking'
        ]
    },
    // ── Pillar 2: Data & Intelligence ─────────────────────────────────────────
    {
        icon: 'Database',
        title: 'Data Architecture & Pipelines',
        slug: 'data-architecture-pipelines',
        pillar: 'intelligence',
        description: 'Scalable, secure data pipelines that unify your disparate data streams into a single source of truth — engineered for reliability, observability, and growth.',
        longDescription: [
            'Modern organisations generate more data than ever — but raw data without architecture is just noise. We design and build end-to-end data pipelines that ingest, transform, and route data from every corner of your business into a clean, reliable data layer that your teams can trust.',
            'Our engineering practice spans cloud-native ETL/ELT pipelines, event-driven architectures, and real-time streaming solutions. We work with battle-tested technologies — Apache Kafka, dbt, Airflow, Spark, and major cloud platforms — to ensure your data infrastructure scales with your ambitions without accumulating technical debt.',
            'Every pipeline we build is monitored, tested, and documented. You get a single source of truth that your entire organisation can rely on for every decision, every day.'
        ],
        deliverables: [
            'End-to-end ETL/ELT pipeline design & build',
            'Data warehouse & lakehouse architecture',
            'Real-time streaming data infrastructure',
            'Data quality monitoring & alerting systems',
            'Full pipeline documentation & operational runbooks'
        ]
    },
    {
        icon: 'TrendingUp',
        title: 'Business Intelligence',
        slug: 'business-intelligence',
        pillar: 'intelligence',
        description: 'Deploying advanced BI frameworks that transform static databases into dynamic, predictive intelligence — uncovering efficiencies and market opportunities.',
        longDescription: [
            'Most organisations have more data than they can act on. We deploy business intelligence frameworks that bridge the gap between raw data and strategic decisions — transforming complex datasets into clear, actionable intelligence that leaders can use with confidence.',
            'We design and build BI solutions using leading platforms including Power BI, Tableau, Looker, and custom-built analytics systems. Our approach focuses on decision architecture first — identifying your highest-value decisions and working backwards to build the reporting infrastructure that directly informs them.',
            'The result is not just a set of dashboards. It is a living intelligence system that adapts as your business evolves — continuously surfacing the signals that matter before they become critical issues.'
        ],
        deliverables: [
            'BI platform selection & architecture',
            'Self-service analytics infrastructure',
            'Predictive modelling & forecasting dashboards',
            'Automated KPI tracking & anomaly detection',
            'Training & adoption programme for teams'
        ]
    },
    {
        icon: 'LayoutDashboard',
        title: 'Executive Dashboards & Reporting',
        slug: 'executive-dashboards',
        pillar: 'intelligence',
        description: 'Bespoke, real-time C-suite reporting dashboards that distill millions of data points into beautiful, actionable visual interfaces.',
        longDescription: [
            'Executives should spend their energy on decisions, not on hunting through spreadsheets. We design and build bespoke executive reporting systems that bring the entire health of your business into a single, coherent view — updated in real time, accessible anywhere.',
            'Our dashboard design process begins with stakeholder alignment: understanding what each executive needs to see, how often, and in what format. We then architect the data layer, build the visualisations, and harden the infrastructure for reliability and security.',
            'The dashboards we build are not templates. Every metric, chart, and drill-down is purposefully designed to match the way your leadership team actually thinks about the business — so insights land immediately and decisions happen faster.'
        ],
        deliverables: [
            'Executive dashboard design & build',
            'Real-time data connectivity & refresh pipelines',
            'Role-based access control & security layer',
            'Mobile-responsive reporting interface',
            'Ongoing maintenance & enhancement retainer'
        ]
    },
    // ── Pillar 3: Digital Engineering ─────────────────────────────────────────
    {
        icon: 'Code2',
        title: 'Custom Software Development',
        slug: 'custom-software-development',
        pillar: 'engineering',
        description: 'Building bespoke software solutions — from enterprise platforms to proprietary tools — engineered for performance, scale, and long-term maintainability.',
        longDescription: [
            'Off-the-shelf software is built for the average use case. Your business is not average. We build custom software solutions that fit your exact operational requirements — whether that is a proprietary transaction monitoring system, an internal workflow tool, or a customer-facing enterprise platform.',
            'Our full-stack engineering team designs, builds, and deploys production-grade software using modern, battle-tested frameworks. We follow rigorous engineering practices — comprehensive test coverage, CI/CD pipelines, security-first architecture — to deliver software that is reliable, maintainable, and scalable from day one.',
            'Every engagement includes a thorough discovery phase where we map your processes, identify inefficiencies, and define the exact system architecture before a single line of code is written. The result is software that solves the right problem, the right way.'
        ],
        deliverables: [
            'Full-cycle product discovery & technical scoping',
            'System architecture design & technical documentation',
            'Agile development with fortnightly client reviews',
            'Quality assurance, testing & security audit',
            'Deployment, DevOps setup & post-launch support'
        ]
    },
    {
        icon: 'Globe',
        title: 'Web & Application Development',
        slug: 'web-development',
        pillar: 'engineering',
        description: 'Designing and engineering high-performance web applications and digital platforms that convert visitors into clients and scale with your growth.',
        longDescription: [
            'Your digital presence is often the first, and most critical, impression you make. We design and engineer premium web applications and digital platforms using modern technology stacks — React, Next.js, TypeScript — optimised for performance, accessibility, and search visibility from the ground up.',
            'Our web development practice blends strategic UX thinking with engineering rigour. We do not just build websites — we build conversion-optimised digital experiences that are fast, accessible, and aligned with your commercial objectives. Every project is delivered with a perfect Lighthouse score as a baseline.',
            'We handle the full spectrum: from brand-new platform builds and complex web applications to performance overhauls of existing systems. Our projects are delivered with full handover documentation, CMS integration where needed, and optional ongoing engineering retainers.'
        ],
        deliverables: [
            'UX/UI design & interactive prototyping',
            'Frontend & backend engineering (React, Next.js, Node.js)',
            'CMS integration & content architecture',
            'Performance optimisation & Lighthouse audits',
            'SEO-ready architecture & structured data implementation'
        ]
    },
    {
        icon: 'Cpu',
        title: 'System Integration & APIs',
        slug: 'system-integration',
        pillar: 'engineering',
        description: 'Connecting your technology stack — CRMs, ERPs, cloud platforms, and data sources — into a unified, automated operational backbone.',
        longDescription: [
            'Technology stacks grow organically, and most organisations end up with a fragmented ecosystem of tools that do not talk to each other. We architect and build the integration layer that connects your systems — eliminating manual data transfers, breaking down silos, and automating workflows that currently require human intervention.',
            'Our integration engineering practice spans REST and GraphQL APIs, webhook architectures, ERP/CRM connectivity (Salesforce, SAP, HubSpot, and others), and cloud-to-cloud integrations across AWS, Azure, and Google Cloud. We design integration architectures that are robust, observable, and easy to extend.',
            'The result is an operational backbone where data flows automatically, systems stay in sync, and your teams can focus on high-value work instead of copy-pasting between tools.'
        ],
        deliverables: [
            'Integration architecture design & API documentation',
            'ERP/CRM connectivity & third-party API integrations',
            'Automated workflow & process orchestration',
            'Webhook & event-driven integration infrastructure',
            'Integration monitoring, error handling & alerting'
        ]
    }
];
const cases = [
    // ── Traditional advisory outcomes ─────────────────────────────────────────
    {
        tag: 'Strategic Planning',
        slug: 'logistics-infrastructure-strategy',
        client: 'Global industrial real estate developer',
        outcome: 'Led strategic plan for flagship logistics infrastructure at a major Middle Eastern seaport.',
        description: 'Established foundational agreements, financial modelling for new developments, and explored public and private land opportunities for speculative and built-to-suit industrial real estate.',
        metric: '670%',
        metricLabel: 'ROI projection',
        service: 'Strategy'
    },
    {
        tag: 'M&A',
        slug: 'energy-retail-expansion',
        client: 'Multinational energy group',
        outcome: 'Orchestrated expansion of retail station investments across Sub-Saharan Africa.',
        description: 'Led end-to-end M&A efforts to strengthen storage infrastructure, aligning with broader strategies of global energy brands across multiple international markets.',
        metric: '+12',
        metricLabel: 'Markets entered',
        service: 'M&A'
    },
    {
        tag: 'Brand Strategy',
        slug: 'brand-identity-revitalisation',
        client: 'Multinational oil & gas distributor',
        outcome: 'Revitalised brand identity and market positioning across South Asia and East Africa.',
        description: 'Crafted a cohesive brand identity from scratch, streamlined messaging, and integrated region-specific market insights — elevating recognition and fuelling sustainable growth.',
        metric: '+45%',
        metricLabel: 'Brand recognition',
        service: 'Brand'
    },
    {
        tag: 'M&A & Regulatory',
        slug: 'digital-banking-licence',
        client: 'Financial services joint venture, South Asia',
        outcome: 'Facilitated a pioneering digital banking licence through a first-of-its-kind joint venture.',
        description: 'Scoped market regulations, engaged governmental and financial stakeholders, and charted operational requirements to unlock a new digital banking market.',
        metric: '1st',
        metricLabel: 'Digital banking licence',
        service: 'M&A'
    },
    {
        tag: 'JV Formation',
        slug: 'cross-border-shipping-jv',
        client: 'Scandinavian & Middle Eastern shipping groups',
        outcome: 'Established a cross-border joint venture for shipbuilding and chartering operations.',
        description: 'Aligned complementary strengths in engineering, logistics, and maritime financing — finalising terms that expanded both parties\' global market presence.',
        metric: '2x',
        metricLabel: 'Market reach',
        service: 'M&A'
    },
    {
        tag: 'M&A & Integration',
        slug: 'acquisition-growth-strategy',
        client: 'Infrastructure & surveying client, Middle East',
        outcome: 'Orchestrated a full-cycle acquisition and post-merger growth strategy.',
        description: 'Managed due diligence, negotiations, and integration planning — then designed a route-to-market plan and recruited a specialist leadership team to scale the business.',
        metric: '3x',
        metricLabel: 'Revenue growth',
        service: 'Strategy'
    },
    // ── Tech-first engineering & data outcomes ────────────────────────────────
    {
        tag: 'Data Architecture',
        slug: 'real-time-logistics-data-pipeline',
        client: 'Global third-party logistics company',
        outcome: 'Built a real-time data pipeline replacing a 48-hour batch reporting cycle with live operational intelligence.',
        description: 'Designed and engineered an event-driven data architecture ingesting shipment, warehouse, and carrier telemetry across 6 regions — reducing reporting latency from 48 hours to under 90 seconds and eliminating 3 manual reconciliation roles.',
        metric: '99.8%',
        metricLabel: 'Pipeline uptime',
        service: 'Data'
    },
    {
        tag: 'Business Intelligence',
        slug: 'retail-bi-cost-savings-dashboard',
        client: 'Regional multi-site retail chain',
        outcome: 'Deployed a predictive BI platform that surfaced $12M in previously invisible cost inefficiencies.',
        description: 'Integrated POS, inventory, supply chain, and HR data into a unified BI layer. Built predictive dashboards that identified shrinkage patterns, overstock cycles, and labour scheduling mismatches — enabling $12M in operational cost reduction within 18 months.',
        metric: '$12M',
        metricLabel: 'Cost savings identified',
        service: 'Data'
    },
    {
        tag: 'Software Development',
        slug: 'fintech-transaction-monitoring-platform',
        client: 'Regulated FinTech start-up, South Asia',
        outcome: 'Engineered a proprietary transaction monitoring and compliance platform processing 2M+ events daily.',
        description: 'Built from the ground up: a real-time transaction risk engine with configurable rule sets, automated regulatory reporting, and a multi-tenant compliance dashboard — replacing three legacy manual processes and passing central bank technical audit on first submission.',
        metric: '2M+',
        metricLabel: 'Daily transactions processed',
        service: 'Engineering'
    },
    {
        tag: 'Web Development',
        slug: 'professional-services-platform-rebuild',
        client: 'Pan-African professional services firm',
        outcome: 'Re-engineered digital platform tripling qualified lead volume and halving time-to-contact.',
        description: 'Complete tear-down and rebuild in Next.js with a headless CMS, dynamic service pages, structured data, and conversion-optimised UX. Lighthouse performance score improved from 43 to 97. Organic search traffic increased 180% in 6 months.',
        metric: '3x',
        metricLabel: 'Qualified lead growth',
        service: 'Engineering'
    }
];
const clientTypes = [
    'Leading Conglomerates',
    'Multinational Corporations',
    'Private Equity & Venture Capital',
    'Family Offices',
    'FinTech & SaaS Companies',
    'Mid-size Industrial Companies',
    'Start-ups & Corporate Ventures',
    'Government Institutions',
    'Non-profit Organisations'
];
const testimonials = [
    {
        quote: 'beehoop brought the strategic clarity we needed to navigate a complex cross-border transaction. Their ability to synthesise financial, operational, and market perspectives into a coherent plan was exceptional.',
        name: 'Senior Managing Director',
        title: 'Global Infrastructure Group',
        company: 'Multinational Real Estate Developer'
    },
    {
        quote: 'What sets beehoop apart is their commitment to execution — they didn\'t just hand us a strategy deck, they rolled up their sleeves and helped us deliver results.',
        name: 'Chief Strategy Officer',
        title: 'Multinational Energy Corporation',
        company: 'Global Energy & Utilities Group'
    },
    {
        quote: 'The brand strategy beehoop developed fundamentally changed how our stakeholders perceive us. Thorough, creative, and deeply aligned with our business objectives.',
        name: 'Group CEO',
        title: 'Oil & Gas Distribution Group',
        company: 'International Oil & Gas Distributor'
    },
    {
        quote: 'We\'d been struggling to get usable intelligence from our data for years. beehoop\'s team built us a pipeline and BI architecture in weeks that our internal team had been trying to deliver for over a year. It genuinely changed how we operate.',
        name: 'Chief Technology Officer',
        title: 'FinTech Scale-up',
        company: 'Regulated Financial Technology Firm'
    },
    {
        quote: 'The custom software platform beehoop built for us is the best operational investment we\'ve made. It replaced three legacy tools, reduced our compliance overhead by 60%, and the code quality passed a rigorous third-party security audit.',
        name: 'VP of Operations',
        title: 'Pan-African Logistics Group',
        company: 'Multinational Logistics & Supply Chain Operator'
    }
];
const processSteps = [
    {
        number: '01',
        title: 'Discovery & Diagnosis',
        description: 'Deep immersion into your organisation. Stakeholder interviews, data audits, competitive benchmarking, and technical landscape mapping — we build a complete diagnostic picture before committing to any direction.'
    },
    {
        number: '02',
        title: 'Strategy & Architecture',
        description: 'A tailored strategic and technical framework that connects diagnosis to action. We design the roadmap, the data architecture, and the operational model in parallel — because strategy without a system is just a slide deck.'
    },
    {
        number: '03',
        title: 'Modelling & Validation',
        description: 'Financial modelling, scenario analysis, data pipeline prototyping, and proof-of-concept builds. Every assumption is tested. Every projection is challenged. Nothing moves forward on instinct alone.'
    },
    {
        number: '04',
        title: 'Engineering & Build',
        description: 'From solution architecture to production deployment. We build the dashboards, pipelines, software, and integrations your strategy demands — with the rigour and documentation that enterprise environments require.'
    },
    {
        number: '05',
        title: 'Launch & Partnership',
        description: 'We stay with you. Post-launch monitoring, performance tuning, team training, and ongoing engineering support ensure the work compounds — not decays — over time.'
    }
];
const achievements = [
    {
        numericValue: 320,
        suffix: '%+',
        label: 'Average Client ROI'
    },
    {
        numericValue: 50,
        suffix: 'M+',
        prefix: '$',
        label: 'Value Unlocked for Clients'
    },
    {
        numericValue: 2,
        suffix: 'M+',
        label: 'Data Events Processed Daily'
    },
    {
        numericValue: 4,
        suffix: '+',
        label: 'Continents of Delivery'
    }
];
const blogPosts = [
    {
        slug: 'strategic-planning-uncertainty',
        title: 'Strategic Planning in an Age of Uncertainty: A Practical Playbook',
        excerpt: 'How leadership teams can build resilient strategies that adapt to disruption while maintaining strategic direction — and why five-year plans are no longer enough.',
        category: 'Strategy',
        date: '2026-02-15',
        readTime: '6 min read',
        content: [
            'In an era of unprecedented volatility, traditional strategic planning approaches are proving inadequate. Leaders face the challenge of building strategies robust enough to withstand disruption while remaining agile enough to seize emerging opportunities.',
            'The most effective approaches combine scenario planning with iterative strategy cycles. Rather than committing to a single five-year plan, organisations benefit from establishing strategic guardrails that guide decision-making while preserving flexibility.',
            'Key principles include: building optionality into strategic investments, developing leading indicators rather than relying on lagging metrics, and creating feedback loops that accelerate learning from market signals.',
            'Our experience across industries shows that organisations embracing adaptive strategy consistently outperform those clinging to traditional planning cycles, achieving 30–40% better outcomes during periods of significant market disruption.'
        ]
    },
    {
        slug: 'cross-border-ma-pitfalls',
        title: 'The Five Pitfalls of Cross-Border M&A — and How to Avoid Them',
        excerpt: 'Lessons from over two decades of international deal-making on what separates successful transactions from costly failures.',
        category: 'M&A',
        date: '2026-01-28',
        readTime: '8 min read',
        content: [
            'Cross-border M&A transactions fail at nearly twice the rate of domestic deals. After advising on transactions across four continents, we have identified five recurring pitfalls that derail even well-intentioned acquisitions.',
            'First, cultural due diligence is often neglected. Financial models can be perfect, but if integration teams cannot bridge cultural gaps, value destruction is inevitable. Second, regulatory complexity is systematically underestimated — what appears straightforward in one jurisdiction can create months of delays in another.',
            'Third, synergy assumptions tend to be overly optimistic. Successful acquirers discount projected synergies by 20–30% and extend realisation timelines by 50%. Fourth, talent retention strategies are typically developed too late. Key personnel losses in the first 90 days post-close are the single biggest predictor of integration failure.',
            'Finally, communication planning is frequently an afterthought. Stakeholders — employees, customers, regulators, and communities — need consistent, transparent communication from day one. The deals that succeed are those where integration planning begins before the letter of intent is signed.'
        ]
    },
    {
        slug: 'data-driven-decision-making',
        title: 'From Data to Decisions: Building Analytics That Actually Drive ROI',
        excerpt: 'Why most analytics investments fail to deliver ROI — and a practical framework for building decision-grade intelligence that transforms operations.',
        category: 'Analytics',
        date: '2026-01-10',
        readTime: '5 min read',
        content: [
            'Despite billions invested globally in analytics infrastructure, most organisations struggle to convert data into actionable intelligence. The gap is rarely technical — it is structural and cultural.',
            'Effective analytics programmes start with decision architecture, not dashboard design. Before building any reporting capability, organisations must map their critical decisions and identify the specific information needed to improve each one.',
            'The most impactful analytics frameworks share three characteristics: they focus on a small number of high-value decisions, they integrate financial and operational data into unified views, and they embed insights directly into workflow rather than requiring separate reporting tools.',
            'Our framework — Decision-Grade Intelligence — helps organisations prioritise analytics investments based on decision impact rather than data availability. Clients implementing this approach typically achieve 60% faster decision cycles and measurable improvements in decision quality within six months.'
        ]
    },
    {
        slug: 'data-pipelines-that-scale',
        title: 'Building Data Pipelines That Scale: Lessons from Large-Scale Deployments',
        excerpt: 'The architectural decisions that separate data pipelines that crumble under growth from those that become a durable competitive infrastructure asset.',
        category: 'Data Engineering',
        date: '2026-03-05',
        readTime: '7 min read',
        content: [
            'Most data pipeline failures are not caused by bad engineering — they are caused by good engineering solving the wrong problem. The architecture that works beautifully at 10,000 daily events becomes a liability at 10 million. Planning for scale from the start is not premature optimisation — it is table stakes.',
            'The most resilient pipelines we have built share three architectural traits: they are event-driven rather than batch-oriented, they treat data quality as a first-class concern with automated validation at every stage, and they are designed around observable failure modes so that when something breaks, you know immediately — and exactly where.',
            'Technology choices matter, but they are secondary to architectural decisions. We have seen Apache Kafka deployments outperform Spark on the right workload, and simple dbt transformations outperform complex Flink pipelines on others. Start with your data SLAs — how fresh does the data need to be, and how much inconsistency is tolerable — and let those requirements drive your stack selection, not the reverse.',
            'The pipelines that become genuine business assets are the ones built with a documentation-first mindset, comprehensive monitoring dashboards, and a clear data ownership model. The technology depreciates; the architecture and the data contracts are what compound in value over time.'
        ]
    },
    {
        slug: 'custom-software-vs-off-the-shelf',
        title: 'Custom Software vs. Off-the-Shelf: How to Make the Right Call',
        excerpt: 'A decision framework used by engineering leaders to assess when to build, when to buy, and when an off-the-shelf tool is actually the competitive liability.',
        category: 'Software Engineering',
        date: '2026-02-28',
        readTime: '6 min read',
        content: [
            'Off-the-shelf software is not inherently inferior to custom-built systems — but it is often the wrong choice for organisations whose competitive advantages live inside their operational processes. The decision is less technical than it is strategic.',
            'The case for custom software is strongest when three conditions converge: your process is a genuine source of competitive differentiation, the off-the-shelf options require significant workarounds that accumulate as technical and operational debt, and the volume of usage justifies the upfront engineering investment.',
            'The most common mistake we see is underestimating the true cost of customising off-the-shelf platforms. Enterprise software vendors charge premium rates for configuration work, and every customisation becomes a liability at upgrade time. One client we worked with was spending more annually on Salesforce customisation consultants than it would have cost to build a purpose-built CRM in eighteen months.',
            'Our decision framework evaluates five dimensions: differentiation potential, integration complexity, total cost of ownership over five years, organisational capacity to maintain custom code, and strategic optionality. In our experience, organisations with complex, high-frequency operational processes benefit from custom solutions far more often than their initial instinct suggests.'
        ]
    },
    {
        slug: 'modern-bi-stack-guide',
        title: 'The Modern BI Stack in 2026: From Raw Data to Real-Time Decisions',
        excerpt: 'A practitioner\'s guide to the tools, architectures, and organisational practices that separate BI programmes that drive decisions from those that produce ignored dashboards.',
        category: 'Business Intelligence',
        date: '2026-03-15',
        readTime: '9 min read',
        content: [
            'Business intelligence has never been more powerful — or more frequently misimplemented. The modern BI stack has converged around a set of mature, composable tools, but the technology is only a fraction of what determines whether a BI programme delivers measurable business value.',
            'The foundation is a clean data layer. Before any BI tooling is deployed, you need a reliable transformation layer — typically dbt running on top of a modern cloud data warehouse such as BigQuery, Snowflake, or Redshift. This is where business logic lives, where data quality is enforced, and where your semantic model is defined. Skipping this step and building dashboards directly on raw tables is the single most common cause of BI programme failure.',
            'On top of a clean semantic layer, the choice of BI frontend matters less than most teams assume. Power BI, Tableau, Looker, and Metabase all produce excellent dashboards when fed clean, well-modelled data. The more important choice is the governance model: who can create new metrics, how are definitions agreed, and how are conflicting numbers resolved when two dashboards show different answers to the same question?',
            'The highest-performing BI programmes we have worked with share one non-negotiable practice: they have a single, officially maintained metric definition for every KPI that appears in any executive dashboard. When every team in the organisation agrees on what "monthly active users" or "gross margin" means — and that definition is version-controlled and auditable — trust in data increases dramatically, and the volume of analytical work that converts into actual decisions follows.'
        ]
    }
];
const team = [
    // Advisory track
    {
        name: 'Oliver Blackwood',
        role: 'Managing Partner',
        track: 'advisory',
        bio: 'Led $40B+ in cross-border transactions as global head of M&A at a top-tier investment bank. Two decades of dealmaking across four continents.',
        image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=800&grayscale=true'
    },
    {
        name: 'Sarah Chen',
        role: 'Partner, Strategic Operations',
        track: 'advisory',
        bio: 'Specialist in post-merger integration and operational turnaround. Scaled technology operations across 14 emerging markets for two Fortune 500 clients.',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800&grayscale=true'
    },
    {
        name: 'Dr. Julian Aris',
        role: 'Head of Data & Intelligence',
        track: 'data',
        bio: 'Pioneer in algorithmic financial forecasting. Built data architectures processing billions of daily records, turning raw enterprise data into predictive operational intelligence.',
        image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800&grayscale=true'
    },
    // Engineering track
    {
        name: 'Ranya Osei',
        role: 'Head of Software Engineering',
        track: 'engineering',
        bio: 'Fifteen years building high-scale software systems for financial services and logistics. Led engineering at two VC-backed start-ups from seed to Series B.',
        image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800&grayscale=true'
    },
    {
        name: 'Marcus Lindqvist',
        role: 'Principal Data Architect',
        track: 'data',
        bio: 'Designed data infrastructure handling billions of daily events for Fortune 500 clients. Expert in real-time streaming architectures and cloud-native data lakes.',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800&grayscale=true'
    },
    {
        name: 'Priya Nair',
        role: 'Partner, Digital Innovation',
        track: 'engineering',
        bio: 'Full-stack engineering leader with deep expertise in React, Node.js, and system integration. Previously CTO at a pan-African FinTech processing $200M in annual transactions.',
        image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800&grayscale=true'
    }
];

})()),
"[project]/src/components/sections/Process.tsx [app-client] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, k: __turbopack_refresh__ }) => (() => {
"use strict";

__turbopack_esm__({
    "default": ()=>Process
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Magnetic$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/ui/Magnetic.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$ProcessIcons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/ui/ProcessIcons.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$TextScramble$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/ui/TextScramble.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/lib/data.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/framer-motion/dist/es/utils/use-in-view.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/gsap/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/gsap/ScrollTrigger.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_import__("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
var _s = __turbopack_refresh__.signature(), _s1 = __turbopack_refresh__.signature();
'use client';
;
;
;
;
;
;
;
;
;
;
if (typeof window !== 'undefined') {
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].registerPlugin(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollTrigger"]);
}
/* ────────────────────────────────────────────
   Deliverables per step — enriched content
   ──────────────────────────────────────────── */ const deliverables = [
    [
        'Stakeholder interview synthesis',
        'Data ecosystem audit',
        'Competitive benchmark report',
        'Technical landscape map'
    ],
    [
        'Strategic roadmap',
        'Data architecture blueprint',
        'Operating model design',
        'Resource & timeline plan'
    ],
    [
        'Financial scenario models',
        'Pipeline proof-of-concept',
        'Assumption stress-tests',
        'Validation sign-off'
    ],
    [
        'Production dashboards',
        'Data pipelines & integrations',
        'Custom software modules',
        'Enterprise documentation'
    ],
    [
        'Launch monitoring playbook',
        'Performance tuning cycles',
        'Team enablement & training',
        'Ongoing support retainer'
    ]
];
function Process() {
    _s();
    const sectionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const pinnedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const stepsContainerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [activeStep, setActiveStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [isDesktop, setIsDesktop] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    /* ── Detect lg breakpoint ── */ const checkDesktop = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setIsDesktop(window.matchMedia('(min-width: 1024px)').matches);
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        checkDesktop();
        window.addEventListener('resize', checkDesktop);
        return ()=>window.removeEventListener('resize', checkDesktop);
    }, [
        checkDesktop
    ]);
    /* ── GSAP ScrollTrigger: pin left, scroll right ── */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!isDesktop || !sectionRef.current || !pinnedRef.current || !stepsContainerRef.current) return;
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReduced) return;
        const stepEls = stepsContainerRef.current.querySelectorAll('.process-step');
        const ctx = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].context(()=>{
            // Pin the section so left column stays fixed while right scrolls
            const trigger = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollTrigger"].create({
                trigger: sectionRef.current,
                start: 'top top',
                end: ()=>`+=${stepsContainerRef.current.scrollHeight - window.innerHeight + 200}`,
                pin: pinnedRef.current,
                pinSpacing: false,
                scrub: false
            });
            // Track which step is active based on scroll position
            stepEls.forEach((step, i)=>{
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollTrigger"].create({
                    trigger: step,
                    start: 'top 55%',
                    end: 'bottom 55%',
                    onToggle: (self)=>{
                        if (self.isActive) setActiveStep(i);
                    }
                });
            });
            return ()=>trigger.kill();
        }, sectionRef);
        return ()=>ctx.revert();
    }, [
        isDesktop
    ]);
    const ActiveIcon = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$ProcessIcons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["processIcons"][activeStep];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        ref: sectionRef,
        id: "process",
        className: "relative bg-background",
        "aria-label": "Our engagement process",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border/50 to-transparent"
            }, void 0, false, {
                fileName: "[project]/src/components/sections/Process.tsx",
                lineNumber: 95,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "hidden lg:flex max-w-[90rem] mx-auto relative",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        ref: pinnedRef,
                        className: "w-[42%] h-screen flex flex-col justify-center pl-10 xl:pl-20 pr-12 sticky top-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[10px] md:text-xs font-mono font-semibold uppercase tracking-[0.3em] text-accent mb-6",
                                children: "How We Engage"
                            }, void 0, false, {
                                fileName: "[project]/src/components/sections/Process.tsx",
                                lineNumber: 105,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "font-syne text-4xl xl:text-5xl 2xl:text-6xl font-bold tracking-tight text-foreground leading-[1.08] mb-8",
                                children: [
                                    "Process",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                        fileName: "[project]/src/components/sections/Process.tsx",
                                        lineNumber: 110,
                                        columnNumber: 20
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-accent",
                                        children: "Architecture."
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/sections/Process.tsx",
                                        lineNumber: 111,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/sections/Process.tsx",
                                lineNumber: 109,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-sans text-base text-muted-foreground leading-relaxed max-w-sm mb-12",
                                children: "A five-phase engagement model refined across 200+ mandates. Every phase has a clear owner, a hard deliverable, and a client sign-off before we advance."
                            }, void 0, false, {
                                fileName: "[project]/src/components/sections/Process.tsx",
                                lineNumber: 114,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-24 h-24 text-accent/80 mb-10",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                    mode: "wait",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                        initial: {
                                            opacity: 0,
                                            scale: 0.85
                                        },
                                        animate: {
                                            opacity: 1,
                                            scale: 1
                                        },
                                        exit: {
                                            opacity: 0,
                                            scale: 0.85
                                        },
                                        transition: {
                                            duration: 0.35,
                                            ease: [
                                                0.16,
                                                1,
                                                0.3,
                                                1
                                            ]
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ActiveIcon, {
                                            animate: true,
                                            className: "w-24 h-24"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/Process.tsx",
                                            lineNumber: 128,
                                            columnNumber: 17
                                        }, this)
                                    }, activeStep, false, {
                                        fileName: "[project]/src/components/sections/Process.tsx",
                                        lineNumber: 121,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sections/Process.tsx",
                                    lineNumber: 120,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/sections/Process.tsx",
                                lineNumber: 119,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-3",
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["processSteps"].map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-1.5 rounded-full transition-all duration-500 ease-out",
                                        style: {
                                            width: i === activeStep ? 32 : 12,
                                            background: i === activeStep ? 'hsl(var(--accent))' : 'hsl(var(--border))'
                                        }
                                    }, i, false, {
                                        fileName: "[project]/src/components/sections/Process.tsx",
                                        lineNumber: 136,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/sections/Process.tsx",
                                lineNumber: 134,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/sections/Process.tsx",
                        lineNumber: 101,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        ref: stepsContainerRef,
                        className: "w-[58%] pr-10 xl:pr-20 py-[25vh]",
                        children: [
                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["processSteps"].map((step, i)=>{
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "process-step min-h-[75vh] flex items-center",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "py-14 border-t border-border/30 w-full transition-opacity duration-500",
                                        style: {
                                            opacity: activeStep === i ? 1 : 0.3
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-mono text-xs font-bold tracking-[0.3em] text-accent/60 block mb-5",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$TextScramble$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextScramble"], {
                                                    text: step.number,
                                                    trigger: activeStep === i,
                                                    duration: 500
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/sections/Process.tsx",
                                                    lineNumber: 167,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/sections/Process.tsx",
                                                lineNumber: 166,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "font-syne text-2xl xl:text-3xl font-bold text-foreground mb-4 leading-tight",
                                                children: step.title
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/sections/Process.tsx",
                                                lineNumber: 170,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "font-sans text-base text-muted-foreground leading-relaxed mb-8 max-w-lg",
                                                children: step.description
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/sections/Process.tsx",
                                                lineNumber: 174,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-2 gap-x-8 gap-y-3",
                                                children: deliverables[i].map((d, j)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-start gap-2.5",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "mt-1.5 block w-1.5 h-1.5 rounded-full bg-accent/50 shrink-0"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/sections/Process.tsx",
                                                                lineNumber: 182,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-sans text-sm text-muted-foreground/80",
                                                                children: d
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/sections/Process.tsx",
                                                                lineNumber: 183,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, j, true, {
                                                        fileName: "[project]/src/components/sections/Process.tsx",
                                                        lineNumber: 181,
                                                        columnNumber: 23
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/sections/Process.tsx",
                                                lineNumber: 179,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/sections/Process.tsx",
                                        lineNumber: 161,
                                        columnNumber: 17
                                    }, this)
                                }, i, false, {
                                    fileName: "[project]/src/components/sections/Process.tsx",
                                    lineNumber: 157,
                                    columnNumber: 15
                                }, this);
                            }),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "py-20 flex gap-4",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Magnetic$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Magnetic"], {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/contact",
                                        className: "inline-flex items-center gap-2 bg-accent text-background px-7 py-4 rounded-full text-sm font-sans font-bold hover:brightness-110 transition-all duration-300",
                                        children: [
                                            "Start an engagement",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                                className: "w-4 h-4"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/sections/Process.tsx",
                                                lineNumber: 200,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/sections/Process.tsx",
                                        lineNumber: 195,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sections/Process.tsx",
                                    lineNumber: 194,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/sections/Process.tsx",
                                lineNumber: 193,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/sections/Process.tsx",
                        lineNumber: 151,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/sections/Process.tsx",
                lineNumber: 98,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "lg:hidden py-20 max-w-3xl mx-auto px-6 md:px-10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[10px] md:text-xs font-mono font-semibold uppercase tracking-[0.3em] text-accent mb-5",
                        children: "How We Engage"
                    }, void 0, false, {
                        fileName: "[project]/src/components/sections/Process.tsx",
                        lineNumber: 210,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "font-syne text-3xl md:text-4xl font-bold tracking-tight text-foreground leading-[1.1] mb-4",
                        children: [
                            "Process ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-accent",
                                children: "Architecture."
                            }, void 0, false, {
                                fileName: "[project]/src/components/sections/Process.tsx",
                                lineNumber: 214,
                                columnNumber: 19
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/sections/Process.tsx",
                        lineNumber: 213,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "font-sans text-base text-muted-foreground leading-relaxed mb-14 max-w-md",
                        children: "Five phases. Hard deliverables. Client sign-off before every advance."
                    }, void 0, false, {
                        fileName: "[project]/src/components/sections/Process.tsx",
                        lineNumber: 216,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-6",
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["processSteps"].map((step, i)=>{
                            const StepIcon = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$ProcessIcons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["processIcons"][i];
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MobileCard, {
                                step: step,
                                index: i,
                                StepIcon: StepIcon,
                                deliverables: deliverables[i]
                            }, i, false, {
                                fileName: "[project]/src/components/sections/Process.tsx",
                                lineNumber: 223,
                                columnNumber: 20
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/src/components/sections/Process.tsx",
                        lineNumber: 220,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-12",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Magnetic$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Magnetic"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/contact",
                                className: "inline-flex items-center gap-2 bg-accent text-background px-7 py-4 rounded-full text-sm font-sans font-bold hover:brightness-110 transition-all duration-300",
                                children: [
                                    "Start an engagement",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/sections/Process.tsx",
                                        lineNumber: 234,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/sections/Process.tsx",
                                lineNumber: 229,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/Process.tsx",
                            lineNumber: 228,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/sections/Process.tsx",
                        lineNumber: 227,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/sections/Process.tsx",
                lineNumber: 208,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border/50 to-transparent"
            }, void 0, false, {
                fileName: "[project]/src/components/sections/Process.tsx",
                lineNumber: 241,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/sections/Process.tsx",
        lineNumber: 88,
        columnNumber: 5
    }, this);
}
_s(Process, "pKX9boKMcbFNzSyurSPd7xt2rN8=");
_c = Process;
/* ── Mobile card with useInView trigger ── */ function MobileCard({ step, index, StepIcon, deliverables }) {
    _s1();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const isInView = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInView"])(ref, {
        once: true,
        margin: '-15%'
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: "relative bg-card/40 backdrop-blur-md border border-border/40 rounded-2xl p-7 md:p-9 transition-all duration-500",
        style: {
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translateY(0)' : 'translateY(32px)',
            transition: `opacity 0.6s ease ${index * 0.08}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 0.08}s`
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-start justify-between mb-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-mono text-xs font-bold tracking-[0.3em] text-accent/60",
                        children: step.number
                    }, void 0, false, {
                        fileName: "[project]/src/components/sections/Process.tsx",
                        lineNumber: 273,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StepIcon, {
                        animate: isInView,
                        className: "w-10 h-10 text-accent/60"
                    }, void 0, false, {
                        fileName: "[project]/src/components/sections/Process.tsx",
                        lineNumber: 276,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/sections/Process.tsx",
                lineNumber: 272,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "font-syne text-xl font-bold text-foreground mb-3 leading-tight",
                children: step.title
            }, void 0, false, {
                fileName: "[project]/src/components/sections/Process.tsx",
                lineNumber: 279,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "font-sans text-sm text-muted-foreground leading-relaxed mb-6",
                children: step.description
            }, void 0, false, {
                fileName: "[project]/src/components/sections/Process.tsx",
                lineNumber: 283,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 sm:grid-cols-2 gap-2",
                children: deliverables.map((d, j)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-start gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "mt-1.5 block w-1.5 h-1.5 rounded-full bg-accent/40 shrink-0"
                            }, void 0, false, {
                                fileName: "[project]/src/components/sections/Process.tsx",
                                lineNumber: 291,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-sans text-xs text-muted-foreground/80",
                                children: d
                            }, void 0, false, {
                                fileName: "[project]/src/components/sections/Process.tsx",
                                lineNumber: 292,
                                columnNumber: 13
                            }, this)
                        ]
                    }, j, true, {
                        fileName: "[project]/src/components/sections/Process.tsx",
                        lineNumber: 290,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/sections/Process.tsx",
                lineNumber: 288,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/sections/Process.tsx",
        lineNumber: 263,
        columnNumber: 5
    }, this);
}
_s1(MobileCard, "DljcBprJKYjULUac3YKdUV9OwZQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInView"]
    ];
});
_c1 = MobileCard;
var _c, _c1;
__turbopack_refresh__.register(_c, "Process");
__turbopack_refresh__.register(_c1, "MobileCard");

})()),
}]);

//# sourceMappingURL=src_530ca4._.js.map
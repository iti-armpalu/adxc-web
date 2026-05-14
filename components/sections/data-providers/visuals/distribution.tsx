// "use client"

// import { useEffect, useRef, useState } from "react"
// import { motion, AnimatePresence } from "motion/react"
// import { useIsMobile } from "@/hooks/use-mobile";

// type Phase = "idle" | "typing" | "thinking" | "answering" | "settled"

// const QUERY = "What are Gen Z spending on beauty in the UK right now?"
// const ANSWER_LINES = [
//     "Gen Z (18–24) UK · beauty category",
//     "Avg spend £42/mo — up 18% YoY",
//     "Top growth: skincare serums (+27%) & fragrance (+21%)",
//     "63% discover via TikTok · 41% buy direct from creators",
// ]

// function useTypewriter(text: string, active: boolean, speed = 38) {
//     const [out, setOut] = useState("")
//     useEffect(() => {
//         if (!active) { setOut(""); return }
//         let i = 0
//         const id = setInterval(() => {
//             i++
//             setOut(text.slice(0, i))
//             if (i >= text.length) clearInterval(id)
//         }, speed)
//         return () => clearInterval(id)
//     }, [text, active, speed])
//     return out
// }

// export function DistributionVisual() {
//     const [phase, setPhase] = useState<Phase>("idle")
//     const [loopKey, setLoopKey] = useState(0)

//     useEffect(() => {
//         let cancelled = false
//         const run = async () => {
//             const wait = (ms: number) =>
//                 new Promise<void>((r) => setTimeout(() => !cancelled && r(), ms))
//             setPhase("typing")
//             await wait(QUERY.length * 38 + 400)
//             if (cancelled) return
//             setPhase("thinking")
//             await wait(900)
//             if (cancelled) return
//             setPhase("answering")
//             await wait(ANSWER_LINES.length * 700 + 600)
//             if (cancelled) return
//             setPhase("settled")
//             await wait(2200)
//             if (cancelled) return
//             setLoopKey((k) => k + 1)
//         }
//         run()
//         return () => { cancelled = true }
//     }, [loopKey])

//     const typed = useTypewriter(QUERY, phase === "typing")
//     const showFull = phase === "thinking" || phase === "answering" || phase === "settled"
//     const queryDisplay = showFull ? QUERY : typed

//     return (
//         <div className="relative w-full h-full rounded-xl overflow-hidden">

//             {/* Miro-like canvas */}
//             <div className="absolute inset-0"
//                 style={{
//                     backgroundColor: "#F7F4F6",
//                     backgroundImage: "radial-gradient(circle, #D8C9D2 1px, transparent 1px)",
//                     backgroundSize: "22px 22px",
//                 }}
//             />

//             {/* Top bar */}
//             {/* <div className="absolute top-0 inset-x-0 h-10 bg-white/90 backdrop-blur border-b border-black/5 flex items-center px-4 gap-3 z-30"> */}
//             {/* <div className="flex gap-1.5"> */}

//             <div className="absolute top-0 inset-x-0 h-11 bg-white/90 backdrop-blur border-b border-black/5 flex items-center px-3 md:px-4 gap-2 md:gap-3 z-30">
//                 <div className="hidden sm:flex gap-1.5">

//                     <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
//                     <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
//                     <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
//                 </div>

//                 {/* <div className="ml-2 flex items-center gap-2 text-[12px] font-medium text-foreground/80"> */}
//                 {/* <div className="w-4 h-4 rounded bg-[#ffd02f] grid place-items-center text-[9px] font-bold text-black/80"> */}


//                 <div className="sm:ml-3 flex items-center gap-2 text-[12px] md:text-[13px] font-medium text-foreground/80 min-w-0">
//                     <div className="w-5 h-5 shrink-0 rounded bg-[#ffd02f] grid place-items-center text-[10px] font-bold text-black/80">

//                         M
//                     </div>
//                     {/* Spring '26 — Gen Z Strategy Board */}
//                     <span className="truncate">Spring '26 — Gen Z Strategy</span>

//                 </div>
//                 {/* <div className="ml-auto flex items-center gap-2"> */}
//                 <div className="ml-auto flex items-center gap-2 shrink-0">

//                     {[["M", "#4f7fe0"], ["J", "#4fb87e"], ["R", "#e07840"]].map(([i, c]) => (
//                         <div key={i} className="w-5 h-5 rounded-full grid place-items-center text-[9px] font-bold text-white ring-2 ring-white"
//                             style={{ backgroundColor: c }}>{i}</div>
//                     ))}
//                     {/* <button className="ml-1 text-[11px] font-semibold px-2.5 py-1 rounded-md bg-[#4262ff] text-white"> */}

//                     <button className="ml-1 md:ml-2 text-xs font-semibold px-2.5 md:px-3 py-1.5 rounded-md bg-[#4262ff] text-white">

//                         Share
//                     </button>
//                 </div>
//             </div>

//             {/* Toolbar */}
//             {/* <div className="absolute left-2 top-1/2 -translate-y-1/2 z-30 bg-white rounded-xl shadow-md ring-1 ring-black/5 p-1 flex flex-col gap-0.5"> */}

//             <div className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 z-30 bg-white rounded-xl shadow-md ring-1 ring-black/5 p-1.5 flex-col gap-1">

//                 {["▢", "○", "✎", "T", "→", "✦"].map((g) => (
//                     <div key={g} className="w-7 h-7 grid place-items-center rounded-lg text-foreground/70 hover:bg-black/5 text-xs">{g}</div>
//                 ))}
//             </div>

//             {/* Canvas content */}
//             <div className="absolute inset-0 pt-10 z-10">
//                 <div className="absolute text-[10px] tracking-[0.2em] uppercase text-foreground/50 font-semibold"
//                     style={{ left: "16%", top: "14%" }}>
//                     Frame · Audience Strategy
//                 </div>
//                 <div className="absolute rounded-2xl border-2 border-dashed border-black/15"
//                     style={{ left: "15.5%", top: "17%", right: "35%", bottom: "8%" }} />

//                 {/* Sticky notes */}
//                 {[
//                     { text: "Gen Z prefers raw, behind-the-scenes content", color: "#FFF3B0", left: "18%", top: "23%", rotate: "-3deg" },
//                     { text: "TikTok > IG for spring drop", color: "#FFD6E0", left: "30%", top: "27%", rotate: "2deg" },
//                     { text: "Creator co-signs drove the most saves", color: "#C8E6FF", left: "19%", top: "46%", rotate: "1deg" },
//                     { text: "Need: real engagement #s by cohort", color: "#D4F5E2", left: "31%", top: "50%", rotate: "-2deg", highlight: true },
//                 ].map((s, i) => (
//                     <div key={i} className="absolute w-[130px] h-[90px] p-2.5 text-[11px] font-medium leading-snug text-black/80 shadow-md"
//                         style={{
//                             backgroundColor: s.color,
//                             left: s.left, top: s.top,
//                             transform: `rotate(${s.rotate})`,
//                             outline: s.highlight ? "2px solid #66023C" : undefined,
//                             outlineOffset: s.highlight ? "3px" : undefined,
//                         }}>
//                         {s.text}
//                     </div>
//                 ))}

//                 {/* Flow arrows */}
//                 <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 600" fill="none">
//                     <defs>
//                         <marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
//                             <path d="M 0 0 L 10 5 L 0 10 z" fill="#7F5F73" />
//                         </marker>
//                     </defs>
//                     <path d="M 270 255 C 330 255, 330 315, 390 315" stroke="#7F5F73" strokeWidth="1.5" strokeDasharray="4 4" markerEnd="url(#arr)" />
//                     <path d="M 245 405 C 310 405, 310 465, 375 465" stroke="#7F5F73" strokeWidth="1.5" strokeDasharray="4 4" markerEnd="url(#arr)" />
//                 </svg>

//                 {/* Mini planning card */}
//                 <div className="absolute bg-white rounded-xl shadow-sm ring-1 ring-black/5 p-2.5 w-[150px]"
//                     style={{ left: "18%", top: "65%", transform: "rotate(-1deg)" }}>
//                     <div className="text-[9px] font-semibold text-foreground/60 uppercase tracking-wider">Launch · Apr 14</div>
//                     <div className="mt-1 text-[11px] font-medium leading-snug">Phase 1 — Creator seeding, 12 voices</div>
//                     <div className="mt-1.5 h-1.5 rounded-full bg-black/5 overflow-hidden">
//                         <div className="h-full w-[64%]" style={{ backgroundColor: "#66023C" }} />
//                     </div>
//                 </div>

//                 {/* Collaborator cursor */}
//                 <motion.div
//                     // className="absolute z-20"
//                     className="hidden md:block absolute z-20 nudge"
//                     style={{ left: "22%", top: "38%" }}
//                     initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
//                     <div className="flex flex-col items-start">
//                         <svg width="14" height="18" viewBox="0 0 18 22" fill="none">
//                             <path d="M2 2 L2 18 L7 14 L10 20 L13 19 L10 13 L16 12 Z" fill="#4f7fe0" stroke="white" strokeWidth="1.2" />
//                         </svg>
//                         <div className="mt-0.5 px-1.5 py-0.5 rounded text-[9px] font-semibold text-white" style={{ backgroundColor: "#4f7fe0" }}>Maya</div>
//                     </div>
//                 </motion.div>
//             </div>

//             {/* ADXC panel */}
//             <motion.div
//                 className="absolute z-40 right-3 top-[52px] w-[280px] rounded-xl overflow-hidden bg-white ring-1 ring-black/10 shadow-xl"
//                 initial={{ opacity: 0, y: 12, scale: 0.98 }}
//                 animate={{ opacity: 1, y: 0, scale: 1 }}
//                 transition={{ duration: 0.5, delay: 0.2 }}
//             >
//                 {/* Header */}
//                 <div className="flex items-center gap-2 px-3 py-2.5"
//                     style={{ background: `#66023C`, color: "white" }}>
//                     <div className="w-5 h-5 rounded-md bg-white/15 grid place-items-center ring-1 ring-white/25">
//                         <span className="text-white text-[11px] font-bold">A</span>
//                     </div>
//                     <div className="text-[12px] font-semibold tracking-tight">ADXC</div>
//                 </div>

//                 {/* Body */}
//                 <div className="p-3 flex flex-col" style={{ height: "294px", backgroundColor: "#F7F4F6" }}>
//                     <div className="flex-1 min-h-0 overflow-hidden flex flex-col gap-2.5">

//                         <AnimatePresence mode="wait">
//                             {phase !== "idle" && phase !== "typing" && (
//                                 <motion.div key={`q-${loopKey}`}
//                                     initial={{ opacity: 0, y: 6, scale: 0.96 }}
//                                     animate={{ opacity: 1, y: 0, scale: 1 }}
//                                     transition={{ duration: 0.25 }}
//                                     className="flex justify-end">
//                                     <div className="max-w-[88%] rounded-2xl rounded-br-sm px-3 py-2 text-[11.5px] leading-snug font-medium text-white"
//                                         style={{ backgroundColor: "#66023C" }}>
//                                         {QUERY}
//                                     </div>
//                                 </motion.div>
//                             )}
//                         </AnimatePresence>

//                         <AnimatePresence mode="wait">
//                             {phase === "thinking" && (
//                                 <motion.div key={`think-${loopKey}`}
//                                     initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
//                                     className="flex items-center gap-1.5 text-[10px] text-foreground/60">
//                                     <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: "#66023C" }} />
//                                     Pulling from your campaign data…
//                                 </motion.div>
//                             )}
//                         </AnimatePresence>

//                         {(phase === "answering" || phase === "settled") && (
//                             <motion.div key={`ans-${loopKey}`}
//                                 initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
//                                 transition={{ duration: 0.35 }}
//                                 className="rounded-2xl rounded-bl-sm bg-white ring-1 ring-black/5 p-2.5 shadow-sm">
//                                 <div className="text-[10px] font-semibold text-foreground/70">ADXC · synthesised answer</div>
//                                 <div className="mt-1.5 space-y-1">
//                                     {ANSWER_LINES.map((line, i) => (
//                                         <StreamLine key={`${loopKey}-${i}`} text={line} index={i} />
//                                     ))}
//                                 </div>

//                                 {/* <motion.div
//                                     initial={{ opacity: 0 }} animate={{ opacity: 1 }}
//                                     transition={{ delay: ANSWER_LINES.length * 0.7 + 0.1 }}
//                                     className="mt-2.5 rounded-lg p-2" style={{ backgroundColor: "#EDE6EA" }}>
//                                     <div className="flex items-end gap-1 h-10">
//                                         {[28, 36, 42, 51, 47, 58, 62].map((h, i) => (
//                                             <motion.div key={`${loopKey}-bar-${i}`}
//                                                 className="flex-1 rounded-sm"
//                                                 style={{ backgroundColor: "#66023C" }}
//                                                 initial={{ height: 0 }}
//                                                 animate={{ height: `${h}%` }}
//                                                 transition={{ delay: ANSWER_LINES.length * 0.7 + 0.15 + i * 0.05, duration: 0.4, ease: "easeOut" }}
//                                             />
//                                         ))}
//                                     </div>
//                                     <div className="mt-1 flex justify-between text-[8px] text-foreground/50 font-medium">
//                                         <span>W1</span><span>W7</span>
//                                     </div>
//                                 </motion.div> */}

//                                 <div className="mt-2 flex items-center gap-1.5 text-[9px] text-foreground/50">
//                                     <span className="px-1.5 py-0.5 rounded font-semibold"
//                                         style={{ backgroundColor: "#EDE6EA", color: "#32002B" }}>
//                                         Source: 4 datasets
//                                     </span>
//                                 </div>
//                             </motion.div>
//                         )}
//                     </div>

//                     {/* Input bar */}
//                     <div className="mt-2.5 flex items-center gap-2 rounded-full bg-white ring-1 ring-black/10 pl-3 pr-1 py-1 shrink-0">
//                         <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: "#C46184" }} />
//                         <div className="text-[10.5px] flex-1 truncate">
//                             {phase === "typing" ? (
//                                 <span className="font-medium" style={{ color: "#2F1F2A" }}>{queryDisplay}</span>
//                             ) : (
//                                 <span className="text-foreground/40">Ask ADXC anything…</span>
//                             )}
//                         </div>
//                         <motion.button
//                             animate={phase === "typing" && queryDisplay.length > 0
//                                 ? { scale: 1, opacity: 1 } : { scale: 0.92, opacity: 0.55 }}
//                             transition={{ duration: 0.2 }}
//                             className="w-5 h-5 rounded-full grid place-items-center text-white text-[10px] shrink-0"
//                             style={{ backgroundColor: "#66023C" }}>
//                             ↑
//                         </motion.button>
//                     </div>
//                 </div>
//             </motion.div>

//         </div>
//     )
// }

// function StreamLine({ text, index }: { text: string; index: number }) {
//     return (
//         <motion.div
//             initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: index * 0.7, duration: 0.3 }}
//             className="text-[11.5px] leading-snug text-foreground/85 font-medium">
//             <span className="font-bold mr-1" style={{ color: "#66023C" }}>·</span>
//             <Typewriter text={text} delay={index * 0.7} />
//         </motion.div>
//     )
// }

// function Typewriter({ text, delay }: { text: string; delay: number }) {
//     const [out, setOut] = useState("")
//     useEffect(() => {
//         setOut("")
//         const start = setTimeout(() => {
//             let i = 0
//             const id = setInterval(() => {
//                 i++
//                 setOut(text.slice(0, i))
//                 if (i >= text.length) clearInterval(id)
//             }, 18)
//             return () => clearInterval(id)
//         }, delay * 1000)
//         return () => clearTimeout(start)
//     }, [text, delay])
//     return <span>{out}</span>
// }



// "use client"

// import { useEffect, useRef, useState } from "react"
// import { motion, AnimatePresence } from "motion/react"
// import { useIsMobile } from "@/hooks/use-mobile"

// type Phase = "idle" | "typing" | "thinking" | "answering" | "settled"

// const QUERY = "What are Gen Z spending on beauty in the UK right now?"
// const ANSWER_LINES = [
//     "Gen Z (18–24) UK · beauty category",
//     "Avg spend £42/mo — up 18% YoY",
//     "Top growth: skincare serums (+27%) & fragrance (+21%)",
//     "63% discover via TikTok · 41% buy direct from creators",
// ]

// function useTypewriter(text: string, active: boolean, speed = 38) {
//     const [out, setOut] = useState("")
//     useEffect(() => {
//         if (!active) { setOut(""); return }
//         let i = 0
//         const id = setInterval(() => {
//             i++
//             setOut(text.slice(0, i))
//             if (i >= text.length) clearInterval(id)
//         }, speed)
//         return () => clearInterval(id)
//     }, [text, active, speed])
//     return out
// }

// export function DistributionVisual() {
//     const ref = useRef<HTMLDivElement>(null)
//     const [phase, setPhase] = useState<Phase>("idle")
//     const [loopKey, setLoopKey] = useState(0)

//     useEffect(() => {
//         let cancelled = false
//         const run = async () => {
//             const wait = (ms: number) =>
//                 new Promise<void>((r) => setTimeout(() => !cancelled && r(), ms))
//             setPhase("typing")
//             await wait(QUERY.length * 38 + 400)
//             if (cancelled) return
//             setPhase("thinking")
//             await wait(900)
//             if (cancelled) return
//             setPhase("answering")
//             await wait(ANSWER_LINES.length * 700 + 600)
//             if (cancelled) return
//             setPhase("settled")
//             await wait(2200)
//             if (cancelled) return
//             setLoopKey((k) => k + 1)
//         }
//         run()
//         return () => { cancelled = true }
//     }, [loopKey])

//     const typed = useTypewriter(QUERY, phase === "typing")
//     const showFull = phase === "thinking" || phase === "answering" || phase === "settled"
//     const queryDisplay = showFull ? QUERY : typed

//     return (
//         <div
//             ref={ref}
//             className="relative mx-auto w-full h-full rounded-2xl"
//             style={{ boxShadow: "0 30px 80px -30px rgba(50,0,43,0.35)" }}
//         >
//             <CanvasBackground />
//             <CanvasContent />
//             <CanvasToolbar />
//             <CanvasTopBar />

//             <motion.div
//                 className="hidden md:block absolute z-20"
//                 style={{ left: "22%", top: "38%" }}
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.6 }}
//             >
//                 <Cursor color="#4f7fe0" name="Maya" />
//             </motion.div>

//             <AdxcPanel phase={phase} queryDisplay={queryDisplay} loopKey={loopKey} />
//         </div>
//     )
// }

// function CanvasBackground() {
//     return (
//         <div
//             className="absolute inset-0"
//             style={{
//                 backgroundColor: "#F7F4F6",
//                 backgroundImage: "radial-gradient(circle, #D8C9D2 1px, transparent 1px)",
//                 backgroundSize: "22px 22px",
//             }}
//         />
//     )
// }

// function CanvasTopBar() {
//     return (
//         <div className="absolute top-0 inset-x-0 h-11 bg-white/90 backdrop-blur border-b border-black/5 flex items-center px-3 md:px-4 gap-2 md:gap-3 z-30">
//             <div className="hidden sm:flex gap-1.5">
//                 <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
//                 <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
//                 <span className="w-3 h-3 rounded-full bg-[#28c840]" />
//             </div>
//             <div className="sm:ml-3 flex items-center gap-2 text-[12px] md:text-[13px] font-medium text-foreground/80 min-w-0">
//                 <div className="w-5 h-5 shrink-0 rounded bg-[#ffd02f] grid place-items-center text-[10px] font-bold text-black/80">M</div>
//                 <span className="truncate">Spring '26 — Gen Z Strategy</span>
//             </div>
//             <div className="ml-auto flex items-center gap-2 shrink-0">
//                 {[["M", "#4f7fe0"], ["J", "#4fb87e"], ["R", "#e07840"]].map(([initial, tone]) => (
//                     <div key={initial}
//                         className="w-6 h-6 rounded-full grid place-items-center text-[10px] font-bold text-white ring-2 ring-white"
//                         style={{ backgroundColor: tone }}>
//                         {initial}
//                     </div>
//                 ))}
//                 <button className="ml-1 md:ml-2 text-xs font-semibold px-2.5 md:px-3 py-1.5 rounded-md bg-[#4262ff] text-white">
//                     Share
//                 </button>
//             </div>
//         </div>
//     )
// }

// function CanvasToolbar() {
//     return (
//         <div className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 z-30 bg-white rounded-xl shadow-md ring-1 ring-black/5 p-1.5 flex-col gap-1">
//             {["▢", "○", "✎", "T", "→", "✦"].map((g) => (
//                 <div key={g} className="w-9 h-9 grid place-items-center rounded-lg text-foreground/70 hover:bg-black/5 text-sm">{g}</div>
//             ))}
//         </div>
//     )
// }

// function CanvasContent() {
//     const isMobile = useIsMobile()

//     if (isMobile) {
//         return (
//             <div className="absolute inset-0 pt-11 z-10">
//                 <div className="absolute left-4 top-[58px] text-[10px] tracking-[0.18em] uppercase text-foreground/50 font-semibold">
//                     Frame · Audience Strategy
//                 </div>
//                 <div className="absolute left-3 right-3 top-[78px] h-[200px] rounded-2xl border-2 border-dashed border-black/15" />
//                 <Sticky text="Gen Z prefers raw, behind-the-scenes content" color="#FFF3B0"
//                     style={{ left: "20px", top: "100px", rotate: "-3deg" }} />
//                 <Sticky text="TikTok > IG for spring drop" color="#FFD6E0"
//                     style={{ right: "20px", top: "120px", rotate: "2deg" }} />
//             </div>
//         )
//     }

//     return (
//         <div className="absolute inset-0 pt-11 z-10">
//             <div className="absolute left-[18%] top-[12%] text-[11px] tracking-[0.2em] uppercase text-foreground/50 font-semibold">
//                 Frame · Audience Strategy
//             </div>
//             <div className="absolute left-[17.5%] top-[16.5%] right-[36%] bottom-[10%] rounded-2xl border-2 border-dashed border-black/15" />

//             <Sticky text="Gen Z prefers raw, behind-the-scenes content" color="#FFF3B0"
//                 style={{ left: "20%", top: "22%", rotate: "-3deg" }} />
//             <Sticky text="TikTok > IG for spring drop" color="#FFD6E0"
//                 style={{ left: "32%", top: "26%", rotate: "2deg" }} />
//             <Sticky text="Creator co-signs drove the most saves" color="#C8E6FF"
//                 style={{ left: "21%", top: "44%", rotate: "1deg" }} />
//             <Sticky text="Need: real engagement #s by cohort" color="#D4F5E2"
//                 style={{ left: "33%", top: "48%", rotate: "-2deg" }} highlight />

//             <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1180 738" fill="none">
//                 <defs>
//                     <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
//                         <path d="M 0 0 L 10 5 L 0 10 z" fill="#7F5F73" />
//                     </marker>
//                 </defs>
//                 <path d="M 320 260 C 380 260, 380 320, 440 320" stroke="#7F5F73" strokeWidth="1.5" strokeDasharray="4 4" markerEnd="url(#arrow)" />
//                 <path d="M 290 410 C 360 410, 360 470, 430 470" stroke="#7F5F73" strokeWidth="1.5" strokeDasharray="4 4" markerEnd="url(#arrow)" />
//             </svg>

//             <div className="absolute bg-white rounded-xl shadow-sm ring-1 ring-black/5 p-3 w-[180px]"
//                 style={{ left: "20%", top: "63%", transform: "rotate(-1deg)" }}>
//                 <div className="text-[10px] font-semibold text-foreground/60 uppercase tracking-wider">Launch · Apr 14</div>
//                 <div className="mt-1 text-[12px] font-medium leading-snug">Phase 1 — Creator seeding, 12 voices</div>
//                 <div className="mt-2 h-1.5 rounded-full bg-black/5 overflow-hidden">
//                     <div className="h-full w-[64%]" style={{ backgroundColor: "#66023C" }} />
//                 </div>
//             </div>
//         </div>
//     )
// }

// function Sticky({ text, color, style, highlight }: {
//     text: string
//     color: string
//     style: React.CSSProperties
//     highlight?: boolean
// }) {
//     return (
//         <div
//             className="absolute w-[160px] h-[110px] p-3 text-[12px] font-medium leading-snug text-black/80 shadow-[0_8px_20px_-10px_rgba(0,0,0,0.25)]"
//             style={{
//                 ...style,
//                 backgroundColor: color,
//                 transform: `${style.transform ?? ""} rotate(${(style as { rotate?: string }).rotate ?? "0deg"})`,
//                 outline: highlight ? "2px solid #66023C" : undefined,
//                 outlineOffset: highlight ? "3px" : undefined,
//             }}
//         >
//             {text}
//         </div>
//     )
// }

// function Cursor({ color, name }: { color: string; name: string }) {
//     return (
//         <div className="flex flex-col items-start">
//             <svg width="18" height="22" viewBox="0 0 18 22" fill="none">
//                 <path d="M2 2 L2 18 L7 14 L10 20 L13 19 L10 13 L16 12 Z" fill={color} stroke="white" strokeWidth="1.2" />
//             </svg>
//             <div className="mt-0.5 px-1.5 py-0.5 rounded text-[10px] font-semibold text-white" style={{ backgroundColor: color }}>
//                 {name}
//             </div>
//         </div>
//     )
// }

// function AdxcPanel({ phase, queryDisplay, loopKey }: {
//     phase: Phase
//     queryDisplay: string
//     loopKey: number
// }) {
//     return (
//         <motion.div
//             className="absolute z-40 left-3 right-3 bottom-3 md:left-auto md:bottom-auto md:right-5 md:top-[52px] md:w-[360px] rounded-xl overflow-hidden bg-white ring-1 ring-black/10"

//             //  className="absolute z-40 right-3 top-[52px] w-[280px] rounded-xl overflow-hidden bg-white ring-1 ring-black/10 shadow-xl"


//             style={{ boxShadow: "0 20px 50px -20px rgba(50,0,43,0.45)" }}
//             initial={{ opacity: 0, y: 12, scale: 0.98 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//         >
//             {/* Header */}
//             <div className="flex items-center gap-2 px-3.5 py-2.5"
//                 style={{ background: "#66023C", color: "white" }}>
//                 <div className="w-6 h-6 rounded-md bg-white/15 grid place-items-center ring-1 ring-white/25">
//                     <span className="text-white text-[12px] font-bold">A</span>
//                 </div>
//                 <div className="text-[13px] font-semibold tracking-tight">ADXC</div>
//             </div>

//             {/* Body */}
//             <div className="p-3 md:p-3.5 flex flex-col h-[420px] md:h-[290px]" style={{ backgroundColor: "#EDE6EA66" }}>
//                 <div className="flex-1 min-h-0 overflow-hidden flex flex-col gap-3">

//                     <AnimatePresence mode="wait">
//                         {phase !== "idle" && phase !== "typing" && (
//                             <motion.div key={`q-${loopKey}`}
//                                 initial={{ opacity: 0, y: 6, scale: 0.96 }}
//                                 animate={{ opacity: 1, y: 0, scale: 1 }}
//                                 transition={{ duration: 0.25, ease: "easeOut" }}
//                                 className="flex justify-end">
//                                 <div className="max-w-[88%] rounded-2xl rounded-br-sm px-3 py-2 text-[10px] leading-snug font-medium text-white"
//                                     style={{ backgroundColor: "#66023C" }}>
//                                     {QUERY}
//                                 </div>
//                             </motion.div>
//                         )}
//                     </AnimatePresence>

//                     <AnimatePresence mode="wait">
//                         {phase === "thinking" && (
//                             <motion.div key={`think-${loopKey}`}
//                                 initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
//                                 className="mt-3 flex items-center gap-1.5 text-[10px] text-foreground/60">
//                                 <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: "#66023C" }} />
//                                 Pulling from your campaign data…
//                             </motion.div>
//                         )}
//                     </AnimatePresence>

//                     {(phase === "answering" || phase === "settled") && (
//                         <motion.div key={`ans-${loopKey}`}
//                             initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
//                             transition={{ duration: 0.35 }}
//                             className="mt-3 rounded-2xl rounded-bl-sm bg-white ring-1 ring-black/5 p-3 shadow-sm">
//                             <div className="text-[10px] font-semibold text-foreground/70">ADXC · synthesised answer</div>

//                             <div className="mt-2 space-y-1.5">
//                                 {ANSWER_LINES.map((line, i) => (
//                                     <StreamLine key={`${loopKey}-${i}`} text={line} index={i} />
//                                 ))}
//                             </div>

//                             <motion.div
//                                 initial={{ opacity: 0 }} animate={{ opacity: 1 }}
//                                 transition={{ delay: ANSWER_LINES.length * 0.7 + 0.1 }}
//                                 className="mt-3 rounded-lg p-2.5" style={{ backgroundColor: "#EDE6EA" }}>
//                                 <div className="flex items-end gap-1.5 h-12">
//                                     {[28, 36, 42, 51, 47, 58, 62].map((h, i) => (
//                                         <motion.div key={`${loopKey}-bar-${i}`}
//                                             className="flex-1 rounded-sm"
//                                             style={{ backgroundColor: "#66023C" }}
//                                             initial={{ height: 0 }}
//                                             animate={{ height: `${h}%` }}
//                                             transition={{ delay: ANSWER_LINES.length * 0.7 + 0.15 + i * 0.05, duration: 0.4, ease: "easeOut" }}
//                                         />
//                                     ))}
//                                 </div>
//                                 <div className="mt-1.5 flex justify-between text-[9px] text-foreground/50 font-medium">
//                                     <span>W1</span><span>W7</span>
//                                 </div>
//                             </motion.div>

//                             <div className="mt-2.5 flex items-center gap-2 text-[10px] text-foreground/50">
//                                 <span className="px-1.5 py-0.5 rounded font-semibold"
//                                     style={{ backgroundColor: "#EDE6EA", color: "#32002B" }}>
//                                     Source: 4 datasets
//                                 </span>
//                                 <span>· updated 2m ago</span>
//                             </div>
//                         </motion.div>
//                     )}
//                 </div>

//                 {/* Input bar */}
//                 <div className="mt-3 flex items-center gap-2 rounded-full bg-white ring-1 ring-black/10 pl-3 pr-1 py-1 shrink-0">
//                     <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: "#C46184" }} />
//                     <div className="text-[11.5px] flex-1 truncate">
//                         {phase === "typing" ? (
//                             <span className="font-medium" style={{ color: "#2F1F2A" }}>{queryDisplay}</span>
//                         ) : (
//                             <span className="text-foreground/40">Ask ADXC anything about your audience…</span>
//                         )}
//                     </div>
//                     <motion.button
//                         animate={phase === "typing" && queryDisplay.length > 0
//                             ? { scale: 1, opacity: 1 } : { scale: 0.92, opacity: 0.55 }}
//                         transition={{ duration: 0.2 }}
//                         className="w-6 h-6 rounded-full grid place-items-center text-white text-[11px] shrink-0"
//                         style={{ backgroundColor: "#66023C" }}>
//                         ↑
//                     </motion.button>
//                 </div>
//             </div>
//         </motion.div>
//     )
// }

// function StreamLine({ text, index }: { text: string; index: number }) {
//     return (
//         <motion.div
//             initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: index * 0.7, duration: 0.3 }}
//             className="text-[10px] leading-snug text-foreground/85 font-medium">
//             <span className="font-bold mr-1.5" style={{ color: "#66023C" }}>·</span>
//             <Typewriter text={text} delay={index * 0.7} />
//         </motion.div>
//     )
// }

// function Typewriter({ text, delay }: { text: string; delay: number }) {
//     const [out, setOut] = useState("")
//     useEffect(() => {
//         setOut("")
//         const start = setTimeout(() => {
//             let i = 0
//             const id = setInterval(() => {
//                 i++
//                 setOut(text.slice(0, i))
//                 if (i >= text.length) clearInterval(id)
//             }, 18)
//             return () => clearInterval(id)
//         }, delay * 1000)
//         return () => clearTimeout(start)
//     }, [text, delay])
//     return <span>{out}</span>
// }



"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { useIsMobile } from "@/hooks/use-mobile"

type Phase = "idle" | "typing" | "thinking" | "answering" | "settled"

const QUERY = "What are Gen Z spending on beauty in the UK right now?"
const ANSWER_LINES = [
    "Gen Z (18–24) UK · beauty category",
    "Avg spend £42/mo — up 18% YoY",
    "Top growth: skincare serums (+27%) & fragrance (+21%)",
    "63% discover via TikTok · 41% buy direct from creators",
]

function useTypewriter(text: string, active: boolean, speed = 38) {
    const [out, setOut] = useState("")
    useEffect(() => {
        if (!active) { setOut(""); return }
        let i = 0
        const id = setInterval(() => {
            i++
            setOut(text.slice(0, i))
            if (i >= text.length) clearInterval(id)
        }, speed)
        return () => clearInterval(id)
    }, [text, active, speed])
    return out
}

export function DistributionVisual() {
    const ref = useRef<HTMLDivElement>(null)
    const [phase, setPhase] = useState<Phase>("idle")
    const [loopKey, setLoopKey] = useState(0)

    useEffect(() => {
        let cancelled = false
        const run = async () => {
            const wait = (ms: number) =>
                new Promise<void>((r) => setTimeout(() => !cancelled && r(), ms))
            setPhase("typing")
            await wait(QUERY.length * 38 + 400)
            if (cancelled) return
            setPhase("thinking")
            await wait(900)
            if (cancelled) return
            setPhase("answering")
            await wait(ANSWER_LINES.length * 700 + 600)
            if (cancelled) return
            setPhase("settled")
            await wait(2200)
            if (cancelled) return
            setLoopKey((k) => k + 1)
        }
        run()
        return () => { cancelled = true }
    }, [loopKey])

    const typed = useTypewriter(QUERY, phase === "typing")
    const showFull = phase === "thinking" || phase === "answering" || phase === "settled"
    const queryDisplay = showFull ? QUERY : typed

    return (
        <div
            ref={ref}
            className="relative mx-auto w-full h-full md:aspect-[16/10] rounded-2xl overflow-hidden"
            style={{ boxShadow: "0 30px 80px -30px rgba(50,0,43,0.35)" }}
        >
            <CanvasBackground />
            <CanvasContent />
            <CanvasToolbar />
            <CanvasTopBar />

            <motion.div
                className="hidden md:block absolute z-20"
                style={{ left: "22%", top: "38%" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
            >
                <Cursor color="#4f7fe0" name="Maya" />
            </motion.div>

            <AdxcPanel phase={phase} queryDisplay={queryDisplay} loopKey={loopKey} />
        </div>
    )
}

function CanvasBackground() {
    return (
        <div
            className="absolute inset-0"
            style={{
                backgroundColor: "#F7F4F6",
                backgroundImage: "radial-gradient(circle, #D8C9D2 1px, transparent 1px)",
                backgroundSize: "22px 22px",
            }}
        />
    )
}

function CanvasTopBar() {
    return (
        <div className="absolute top-0 inset-x-0 h-11 bg-white/90 backdrop-blur border-b border-black/5 flex items-center px-3 md:px-4 gap-2 md:gap-3 z-30">
            <div className="hidden sm:flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <span className="w-3 h-3 rounded-full bg-[#28c840]" />
            </div>
            <div className="sm:ml-3 flex items-center gap-2 text-[12px] md:text-[13px] font-medium text-foreground/80 min-w-0">
                <div className="w-5 h-5 shrink-0 rounded bg-[#ffd02f] grid place-items-center text-[10px] font-bold text-black/80">M</div>
                <span className="truncate">Spring '26 — Gen Z Strategy</span>
            </div>
            <div className="ml-auto flex items-center gap-2 shrink-0">
                {[["M", "#4f7fe0"], ["J", "#4fb87e"], ["R", "#e07840"]].map(([initial, tone]) => (
                    <div key={initial}
                        className="w-6 h-6 rounded-full grid place-items-center text-[10px] font-bold text-white ring-2 ring-white"
                        style={{ backgroundColor: tone }}>
                        {initial}
                    </div>
                ))}
                <button className="ml-1 md:ml-2 text-xs font-semibold px-2.5 md:px-3 py-1.5 rounded-md bg-[#4262ff] text-white">
                    Share
                </button>
            </div>
        </div>
    )
}

function CanvasToolbar() {
    return (
        <div className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 z-30 bg-white rounded-xl shadow-md ring-1 ring-black/5 p-1.5 flex-col gap-1">
            {["▢", "○", "✎", "T", "→", "✦"].map((g) => (
                <div key={g} className="w-9 h-9 grid place-items-center rounded-lg text-foreground/70 hover:bg-black/5 text-sm">{g}</div>
            ))}
        </div>
    )
}

function CanvasContent() {
    const isMobile = useIsMobile()

    if (isMobile) {
        return (
            <div className="absolute inset-0 pt-11 z-10">
                <div className="absolute left-4 top-[58px] text-[10px] tracking-[0.18em] uppercase text-foreground/50 font-semibold">
                    Frame · Audience Strategy
                </div>
                <div className="absolute left-3 right-3 top-[78px] h-[200px] rounded-2xl border-2 border-dashed border-black/15" />
                <Sticky text="Gen Z prefers raw, behind-the-scenes content" color="#FFF3B0"
                    style={{ left: "20px", top: "100px", rotate: "-3deg" }} />
                <Sticky text="TikTok > IG for spring drop" color="#FFD6E0"
                    style={{ right: "20px", top: "120px", rotate: "2deg" }} />
            </div>
        )
    }

    return (
        <div className="absolute inset-0 pt-11 z-10">
            <div className="absolute left-[18%] top-[12%] text-[11px] tracking-[0.2em] uppercase text-foreground/50 font-semibold">
                Frame · Audience Strategy
            </div>
            <div className="absolute left-[17.5%] top-[16.5%] right-[36%] bottom-[10%] rounded-2xl border-2 border-dashed border-black/15" />

            <Sticky text="Gen Z prefers raw, behind-the-scenes content" color="#FFF3B0"
                style={{ left: "20%", top: "22%", rotate: "-3deg" }} />
            <Sticky text="TikTok > IG for spring drop" color="#FFD6E0"
                style={{ left: "32%", top: "26%", rotate: "2deg" }} />
            <Sticky text="Creator co-signs drove the most saves" color="#C8E6FF"
                style={{ left: "21%", top: "44%", rotate: "1deg" }} />
            <Sticky text="Need: real engagement #s by cohort" color="#D4F5E2"
                style={{ left: "33%", top: "48%", rotate: "-2deg" }} highlight />

            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1180 738" fill="none">
                <defs>
                    <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#7F5F73" />
                    </marker>
                </defs>
                <path d="M 320 260 C 380 260, 380 320, 440 320" stroke="#7F5F73" strokeWidth="1.5" strokeDasharray="4 4" markerEnd="url(#arrow)" />
                <path d="M 290 410 C 360 410, 360 470, 430 470" stroke="#7F5F73" strokeWidth="1.5" strokeDasharray="4 4" markerEnd="url(#arrow)" />
            </svg>

            <div className="absolute bg-white rounded-xl shadow-sm ring-1 ring-black/5 p-3 w-[180px]"
                style={{ left: "20%", top: "63%", transform: "rotate(-1deg)" }}>
                <div className="text-[10px] font-semibold text-foreground/60 uppercase tracking-wider">Launch · Apr 14</div>
                <div className="mt-1 text-[12px] font-medium leading-snug">Phase 1 — Creator seeding, 12 voices</div>
                <div className="mt-2 h-1.5 rounded-full bg-black/5 overflow-hidden">
                    <div className="h-full w-[64%]" style={{ backgroundColor: "#66023C" }} />
                </div>
            </div>
        </div>
    )
}

function Sticky({ text, color, style, highlight }: {
    text: string
    color: string
    style: React.CSSProperties
    highlight?: boolean
}) {
    return (
        <div
            className="absolute w-[160px] h-[110px] p-3 text-[12px] font-medium leading-snug text-black/80 shadow-[0_8px_20px_-10px_rgba(0,0,0,0.25)]"
            style={{
                ...style,
                backgroundColor: color,
                transform: `${style.transform ?? ""} rotate(${(style as { rotate?: string }).rotate ?? "0deg"})`,
                outline: highlight ? "2px solid #66023C" : undefined,
                outlineOffset: highlight ? "3px" : undefined,
            }}
        >
            {text}
        </div>
    )
}

function Cursor({ color, name }: { color: string; name: string }) {
    return (
        <div className="flex flex-col items-start">
            <svg width="18" height="22" viewBox="0 0 18 22" fill="none">
                <path d="M2 2 L2 18 L7 14 L10 20 L13 19 L10 13 L16 12 Z" fill={color} stroke="white" strokeWidth="1.2" />
            </svg>
            <div className="mt-0.5 px-1.5 py-0.5 rounded text-[10px] font-semibold text-white" style={{ backgroundColor: color }}>
                {name}
            </div>
        </div>
    )
}

function AdxcPanel({ phase, queryDisplay, loopKey }: {
    phase: Phase
    queryDisplay: string
    loopKey: number
}) {
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [phase, queryDisplay])

    return (
        <motion.div
            className="absolute z-40 left-3 right-3 bottom-3 md:left-auto md:bottom-auto md:right-5 md:top-[52px] md:w-[360px] rounded-xl overflow-hidden bg-white ring-1 ring-black/10"
            style={{ boxShadow: "0 20px 50px -20px rgba(50,0,43,0.45)" }}
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
            {/* Header */}
            <div className="flex items-center gap-2 px-3.5 py-2.5"
                style={{ background: "#66023C", color: "white" }}>
                <div className="w-6 h-6 rounded-md bg-white/15 grid place-items-center ring-1 ring-white/25">
                    <span className="text-white text-[12px] font-bold">A</span>
                </div>
                <div className="text-[13px] font-semibold tracking-tight">ADXC</div>
            </div>

            {/* Body */}
            <div className="p-3 md:p-3.5 flex flex-col h-[460px] md:h-[290px]" style={{ backgroundColor: "#EDE6EA66" }}>
                <div
                    ref={scrollRef}
                    className="flex-1 min-h-0 overflow-y-auto flex flex-col gap-3 scroll-smooth"
                >

                    <AnimatePresence mode="wait">
                        {phase !== "idle" && phase !== "typing" && (
                            <motion.div key={`q-${loopKey}`}
                                initial={{ opacity: 0, y: 6, scale: 0.96 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 0.25, ease: "easeOut" }}
                                className="flex justify-end">
                                <div className="max-w-[88%] rounded-2xl rounded-br-sm px-3 py-2 text-[12.5px] leading-snug font-medium text-white"
                                    style={{ backgroundColor: "#66023C" }}>
                                    {QUERY}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <AnimatePresence mode="wait">
                        {phase === "thinking" && (
                            <motion.div key={`think-${loopKey}`}
                                initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                                className="mt-3 flex items-center gap-1.5 text-[11px] text-foreground/60">
                                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: "#66023C" }} />
                                Pulling from your campaign data…
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {(phase === "answering" || phase === "settled") && (
                        <motion.div key={`ans-${loopKey}`}
                            initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.35 }}
                            className="mt-3 rounded-2xl rounded-bl-sm bg-white ring-1 ring-black/5 p-3 shadow-sm">
                            <div className="text-[11px] font-semibold text-foreground/70">ADXC · synthesised answer</div>

                            <div className="mt-2 space-y-1.5">
                                {ANSWER_LINES.map((line, i) => (
                                    <StreamLine key={`${loopKey}-${i}`} text={line} index={i} />
                                ))}
                            </div>

                            <motion.div
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                transition={{ delay: ANSWER_LINES.length * 0.7 + 0.1 }}
                                className="mt-3 rounded-lg p-2.5" style={{ backgroundColor: "#EDE6EA" }}>
                                <div className="flex items-end gap-1.5 h-12 sm:h-8">
                                    {[28, 36, 42, 51, 47, 58, 62].map((h, i) => (
                                        <motion.div key={`${loopKey}-bar-${i}`}
                                            className="flex-1 rounded-sm"
                                            style={{ backgroundColor: "#66023C" }}
                                            initial={{ height: 0 }}
                                            animate={{ height: `${h}%` }}
                                            transition={{ delay: ANSWER_LINES.length * 0.7 + 0.15 + i * 0.05, duration: 0.4, ease: "easeOut" }}
                                        />
                                    ))}
                                </div>
                                <div className="mt-1.5 flex justify-between text-[9px] text-foreground/50 font-medium">
                                    <span>W1</span><span>W7</span>
                                </div>
                            </motion.div>

                            <div className="mt-2.5 flex items-center gap-2 text-[10px] text-foreground/50">
                                <span className="px-1.5 py-0.5 rounded font-semibold"
                                    style={{ backgroundColor: "#EDE6EA", color: "#32002B" }}>
                                    Source: 4 datasets
                                </span>
                            </div>
                        </motion.div>
                    )}
                </div>

                {/* Input bar */}
                <div className="mt-3 flex items-center gap-2 rounded-full bg-white ring-1 ring-black/10 pl-3 pr-1 py-1 shrink-0">
                    <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: "#C46184" }} />
                    <div className="text-[11.5px] flex-1 truncate">
                        {phase === "typing" ? (
                            <span className="font-medium" style={{ color: "#2F1F2A" }}>{queryDisplay}</span>
                        ) : (
                            <span className="text-foreground/40">Ask ADXC anything about your audience…</span>
                        )}
                    </div>
                    <motion.button
                        animate={phase === "typing" && queryDisplay.length > 0
                            ? { scale: 1, opacity: 1 } : { scale: 0.92, opacity: 0.55 }}
                        transition={{ duration: 0.2 }}
                        className="w-6 h-6 rounded-full grid place-items-center text-white text-[11px] shrink-0"
                        style={{ backgroundColor: "#66023C" }}>
                        ↑
                    </motion.button>
                </div>
            </div>
        </motion.div>
    )
}

function StreamLine({ text, index }: { text: string; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.7, duration: 0.3 }}
            className="text-[12.5px] leading-snug text-foreground/85 font-medium">
            <span className="font-bold mr-1.5" style={{ color: "#66023C" }}>·</span>
            <Typewriter text={text} delay={index * 0.7} />
        </motion.div>
    )
}

function Typewriter({ text, delay }: { text: string; delay: number }) {
    const [out, setOut] = useState("")
    useEffect(() => {
        setOut("")
        const start = setTimeout(() => {
            let i = 0
            const id = setInterval(() => {
                i++
                setOut(text.slice(0, i))
                if (i >= text.length) clearInterval(id)
            }, 18)
            return () => clearInterval(id)
        }, delay * 1000)
        return () => clearTimeout(start)
    }, [text, delay])
    return <span>{out}</span>
}
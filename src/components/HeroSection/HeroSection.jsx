// "use client";
// import React, { useEffect, useRef, useState } from "react";
// import gsap from "gsap";
// import { motion } from "framer-motion";

// export default function HeroSection() {
//   const sectionRef = useRef(null);
//   const videoContainerRef = useRef(null);
//   const videoRef = useRef(null);
//   const loaderRef = useRef(null);
//   const wasPlayingBeforeScroll = useRef(false);
//   const [loaderDone, setLoaderDone] = useState(false);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [currentText, setCurrentText] = useState("ఆదిత్య పోర్ట్‌ఫోలియో");

//   useEffect(() => {
//     if (typeof window === "undefined") return;
//     document.body.style.overflow = "hidden";
//     gsap.set(videoContainerRef.current, { autoAlpha: 0, scale: 1.05 });

//     const tl = gsap.timeline({
//       onComplete: () => {
//         setLoaderDone(true);
//         document.body.style.overflow = "";
//       },
//     });

//     tl.to(loaderRef.current, { y: "-100%", duration: 1.1, ease: "power3.out" }, "start+=3.0");
//     tl.to(videoContainerRef.current, { autoAlpha: 1, scale: 1, duration: 1.2, ease: "power2.out" }, "start+=3.2");

//     const t1 = setTimeout(() => setCurrentText("आदित्य पोर्टफोलियो"), 1000);
//     const t2 = setTimeout(() => setCurrentText("ADITYA PORTFOLIO"), 2000);

//     return () => {
//       tl.kill();
//       clearTimeout(t1);
//       clearTimeout(t2);
//       document.body.style.overflow = "";
//     };
//   }, []);

//   // Scroll chesthe auto-pause, malli paiki scroll chesthe auto-resume
//   useEffect(() => {
//     const section = sectionRef.current;
//     const video = videoRef.current;
//     if (!section || !video) return;

//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (!entry.isIntersecting) {
//           // Kindhiki scroll chesinappudu
//           if (!video.paused) {
//             wasPlayingBeforeScroll.current = true;
//             video.pause();
//             setIsPlaying(false);
//           }
//         } else {
//           // Malli paiki (Hero section ki) vachinappudu
//           if (wasPlayingBeforeScroll.current) {
//             video.play()
//               .then(() => {
//                 setIsPlaying(true);
//                 wasPlayingBeforeScroll.current = false;
//               })
//               .catch(() => {});
//           }
//         }
//       },
//       { threshold: 0.25 } // Hero section 25% kante thakkuva kanipisthe pause avtundi
//     );

//     observer.observe(section);
//     return () => observer.disconnect();
//   }, []);

//   const handleScrollToWork = (e) => {
//     e.preventDefault();
//     const target = document.getElementById("projects-section") || document.getElementById("about");
//     const lenis = window.__lenis;
//     if (lenis) {
//       lenis.scrollTo(target, { duration: 1.4 });
//     } else {
//       target?.scrollIntoView({ behavior: "smooth" });
//     }
//   };

//   const togglePlay = () => {
//     if (!videoRef.current) return;
//     if (isPlaying) {
//       videoRef.current.pause();
//       setIsPlaying(false);
//       wasPlayingBeforeScroll.current = false;
//     } else {
//       videoRef.current.muted = false;
//       videoRef.current.play()
//         .then(() => {
//           setIsPlaying(true);
//           wasPlayingBeforeScroll.current = false;
//         })
//         .catch(err => console.log(err));
//     }
//   };

//   return (
//     <>
//       <div id="loader" ref={loaderRef} style={{ backgroundColor: "#111111", zIndex: 100002, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
//         <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className="flex flex-col items-center justify-center text-center px-4">
//           <img src="/avatar-logo.jpg" alt="Logo" className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border border-white/10 mb-6 object-cover shadow-lg" />
//           <div className="h-10 flex items-center justify-center overflow-hidden">
//             <motion.div key={currentText} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.35 }} className="text-[#F5F1EA] text-2xl sm:text-4xl font-extrabold tracking-widest uppercase">
//               {currentText}
//             </motion.div>
//           </div>
//         </motion.div>
//       </div>

//       <section id="hero-section" ref={sectionRef} className="relative w-full h-screen min-h-[600px] overflow-hidden select-none">
//         <div ref={videoContainerRef} className="absolute inset-0 w-full h-full bg-black">
//           <video ref={videoRef} src="/hero-bg-video.mp4" loop playsInline preload="auto" className="w-full h-full object-cover object-center" />
//         </div>

//         <motion.div initial="hidden" animate={loaderDone ? "visible" : "hidden"}
//                     variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } } }}
//                     className="absolute top-1/2 -translate-y-1/2 left-6 sm:left-12 lg:left-20 z-10 max-w-[520px] p-6 rounded-2xl bg-bg/85 lg:bg-transparent lg:p-0">
//           <motion.span variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="block text-xs font-semibold tracking-[0.22em] text-fg-muted/80 uppercase mb-2">
//             HELLO, I'M ADITYA PALLIKONDA
//           </motion.span>
//           <div className="w-12 h-[1.5px] bg-fg/20 mb-6" />
//           <h1 className="text-4xl sm:text-5xl lg:text-[3.2rem] font-black uppercase leading-[1.05] tracking-tight text-fg mb-6">
//             FULL STACK <br />
//             MERN & NEXT.JS <br />
//             <span className="text-fg-muted/65 font-bold">DEVELOPER</span>
//           </h1>
//           <p className="text-xs sm:text-sm text-fg-muted leading-relaxed mb-8 max-w-[40ch]">
//             Building responsive web interfaces, scalable backend architectures, and intelligent AI-integrated applications.
//           </p>
//           <div className="flex items-center gap-5">
//             <a href="#projects-section" onClick={handleScrollToWork} className="px-6 py-3 bg-fg text-bg rounded-full text-xs font-semibold flex items-center gap-2">
//               <span>View My Work</span>
//               <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-current" strokeWidth="2.5"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
//             </a>
//             <a href="/Adi_SDE.pdf" target="_blank" rel="noopener noreferrer" download className="text-xs font-semibold border-b border-current flex items-center gap-1.5">
//               <span>Download CV</span>
//               <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-current" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>
//             </a>
//           </div>
//         </motion.div>

//         <button onClick={togglePlay} className="absolute bottom-8 right-8 z-20 flex items-center gap-3 bg-bg/85 border border-fg/10 px-4 py-2.5 rounded-full text-fg hover:bg-fg hover:text-bg transition-all active:scale-95 shadow-md">
//           <span className="text-[11px] font-bold tracking-[0.18em] uppercase pr-2">
//             {isPlaying ? "PAUSE VIDEO" : "PLAY VIDEO"}
//           </span>
//         </button>
//       </section>
//     </>
//   );
// }




"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";

export default function HeroSection() {
  const sectionRef = useRef(null);
  const videoContainerRef = useRef(null);
  const videoRef = useRef(null);
  const loaderRef = useRef(null);
  const [loaderDone, setLoaderDone] = useState(false);
  const [currentText, setCurrentText] = useState("ఆదిత్య పోర్ట్‌ఫోలియో");

  useEffect(() => {
    if (typeof window === "undefined") return;
    document.body.style.overflow = "hidden";
    gsap.set(videoContainerRef.current, { autoAlpha: 0, scale: 1.05 });

    const tl = gsap.timeline({
      onComplete: () => {
        setLoaderDone(true);
        document.body.style.overflow = "";
      },
    });

    tl.to(loaderRef.current, { y: "-100%", duration: 1.1, ease: "power3.out" }, "start+=3.0");
    tl.to(videoContainerRef.current, { autoAlpha: 1, scale: 1, duration: 1.2, ease: "power2.out" }, "start+=3.2");

    const t1 = setTimeout(() => setCurrentText("आदित्य पोर्टफोलियो"), 1000);
    const t2 = setTimeout(() => setCurrentText("ADITYA PORTFOLIO"), 2000);

    return () => {
      tl.kill();
      clearTimeout(t1);
      clearTimeout(t2);
      document.body.style.overflow = "";
    };
  }, []);

  // Scroll chesinappudu pause, paiki scroll chesthe play
  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    const playVideo = () => {
      video.play().catch(() => {
        video.muted = true;
        video.play().catch(() => {});
      });
    };

    if (loaderDone) {
      playVideo();
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          playVideo();
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(section);

    // User page lo ekkadaina first click chesthe sound unmute chestundi
    const unlockAudio = () => {
      if (videoRef.current) {
        videoRef.current.muted = false;
        videoRef.current.play().catch(() => {});
      }
      window.removeEventListener("pointerdown", unlockAudio);
    };
    window.addEventListener("pointerdown", unlockAudio);

    return () => {
      observer.disconnect();
      window.removeEventListener("pointerdown", unlockAudio);
    };
  }, [loaderDone]);

  const handleScrollToWork = (e) => {
    e.preventDefault();
    const target = document.getElementById("projects-section") || document.getElementById("about");
    const lenis = window.__lenis;
    if (lenis) {
      lenis.scrollTo(target, { duration: 1.4 });
    } else {
      target?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div id="loader" ref={loaderRef} style={{ backgroundColor: "#111111", zIndex: 100002, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className="flex flex-col items-center justify-center text-center px-4">
          <img src="/avatar-logo.jpg" alt="Logo" className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border border-white/10 mb-6 object-cover shadow-lg" />
          <div className="h-10 flex items-center justify-center overflow-hidden">
            <motion.div key={currentText} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.35 }} className="text-[#F5F1EA] text-2xl sm:text-4xl font-extrabold tracking-widest uppercase">
              {currentText}
            </motion.div>
          </div>
        </motion.div>
      </div>

      <section id="hero-section" ref={sectionRef} className="relative w-full h-screen min-h-[600px] overflow-hidden select-none">
        <div ref={videoContainerRef} className="absolute inset-0 w-full h-full bg-black">
          <video
            ref={videoRef}
            src="/hero-bg-video.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="w-full h-full object-cover object-center"
          />
        </div>

        <motion.div initial="hidden" animate={loaderDone ? "visible" : "hidden"}
                    variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } } }}
                    className="absolute top-1/2 -translate-y-1/2 left-6 sm:left-12 lg:left-20 z-10 max-w-[520px] p-6 rounded-2xl bg-bg/85 lg:bg-transparent lg:p-0">
          <motion.span variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="block text-xs font-semibold tracking-[0.22em] text-fg-muted/80 uppercase mb-2">
            HELLO, I'M ADITYA PALLIKONDA
          </motion.span>
          <div className="w-12 h-[1.5px] bg-fg/20 mb-6" />
          <h1 className="text-4xl sm:text-5xl lg:text-[3.2rem] font-black uppercase leading-[1.05] tracking-tight text-fg mb-6">
            FULL STACK <br />
            MERN & NEXT.JS <br />
            <span className="text-fg-muted/65 font-bold">DEVELOPER</span>
          </h1>
          <p className="text-xs sm:text-sm text-fg-muted leading-relaxed mb-8 max-w-[40ch]">
            Building responsive web interfaces, scalable backend architectures, and intelligent AI-integrated applications.
          </p>
          <div className="flex items-center gap-5">
            <a href="#projects-section" onClick={handleScrollToWork} className="px-6 py-3 bg-fg text-bg rounded-full text-xs font-semibold flex items-center gap-2">
              <span>View My Work</span>
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-current" strokeWidth="2.5"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
            </a>
            <a href="/Adi_SDE.pdf" target="_blank" rel="noopener noreferrer" download className="text-xs font-semibold border-b border-current flex items-center gap-1.5">
              <span>Download CV</span>
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-current" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>
            </a>
          </div>
        </motion.div>
      </section>
    </>
  );
}
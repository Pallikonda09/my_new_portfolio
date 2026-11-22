"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const PROJECTS = [
  {
    name: "AI-Powered Second Brain",
    href: "https://second-brain-ai-liard-five.vercel.app/", // Replace with your live Vercel demo URL
    role: "Next.js • React.js • Node.js • MongoDB",
    kind: "Mar 2026",
    note: "AI note management platform featuring semantic search, AI auto-tagging, conversational chatbot retrieval, and JWT-secured REST APIs deployed on Vercel."
  },
  {
    name: "Full Stack E-Commerce Platform",
    href: "https://ecomerce-ap.netlify.app/", // Replace with your live Netlify demo URL
    role: "MongoDB • Express.js • React.js • Node.js",
    kind: "Dec 2025",
    note: "Complete MERN e-commerce application with user authentication, shopping cart, checkout flow, and scalable schemas deployed on Netlify & Render."
  }
];

const EDUCATION_AND_CAPABILITIES = [
  {
    name: "Master of Computer Applications (MCA)",
    role: "Spectrum Institute of Management & Computer Sciences • Hyderabad",
    href: null,
    kind: "2025 – 2027",
    note: "Pursuing postgraduate studies in computer applications while actively seeking Full Stack & Frontend internships."
  },
  {
    name: "Bachelor of Commerce (Computer Applications)",
    role: "Government Degree College • Armoor, Telangana",
    href: null,
    kind: "2022 – 2025",
    note: "Completed undergraduate degree with a strong foundation in programming, databases, and web technologies."
  },

  {
    name: "Scalable MERN Stack Systems",
    role: "REST APIs • JWT Auth • MongoDB Atlas",
    href: null,
    kind: "Capability",
    note: "Designing end-to-end full-stack architectures with clean state management and cloud deployment."
  }
];

const Row = ({ item, index }) => {
  const hasLink = Boolean(item.href);
  const Wrapper = hasLink ? "a" : "div";

  return (
    <li className="pj-row">
      <Wrapper className={`pj-link${hasLink ? "" : " pj-link--static"}`} {...(hasLink ? { href: item.href, target: "_blank", rel: "noreferrer" } : {})}>
        <span className="pj-num">{String(index + 1).padStart(2, "0")}</span>
        <div className="pj-meta">
          <span className="pj-name">{item.name}</span>
          {item.role && <span className="pj-role">{item.role}</span>}
          {item.note && <span className="pj-note">{item.note}</span>}
        </div>
        <span className="pj-kind">{item.kind}</span>
        <span className="pj-arrow">
          {hasLink ? <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M7 17 17 7m-9 0h9v9"/></svg> : "•"}
        </span>
      </Wrapper>
    </li>
  );
};

export default function Projects() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current.querySelectorAll(".pj-row"), {
        opacity: 0, y: 60, duration: 0.9, stagger: 0.08, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true }
      });
    }, sectionRef.current);
    return () => ctx.revert();
  }, []);

  return (
    <section id="projects-section" ref={sectionRef}>
      <div className="pj-head">
        <span className="pj-label">PROJECTS</span><h2 className="pj-title">selected work</h2>
      </div>
      <ul className="pj-list">
        {PROJECTS.map((p, i) => <Row key={p.name} item={p} index={i} />)}
      </ul>

      <div id="ventures" className="pj-head pj-head--secondary">
        <span className="pj-label">BACKGROUND</span><h2 className="pj-title">education &amp; focus</h2>
      </div>
      <ul className="pj-list">
        {EDUCATION_AND_CAPABILITIES.map((v, i) => <Row key={v.name} item={v} index={i} />)}
      </ul>
    </section>
  );
}
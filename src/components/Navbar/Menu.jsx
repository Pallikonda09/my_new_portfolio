import { useSpring, a } from "@react-spring/web";
import React, { useEffect, useRef, useState } from "react";

const EMAIL = "adityapallikonda66335@gmail.com";
const WHATSAPP_URL = "https://wa.me/917780189558";
const GITHUB_URL = "https://github.com/Pallikonda09";

const scrollToSection = (id) => {
  if (typeof window === "undefined") return;
  const target = id === "top" ? 0 : document.getElementById(id);
  if (target == null) return;
  const lenis = window.__lenis;
  if (lenis && typeof lenis.scrollTo === "function") {
    lenis.scrollTo(target, { offset: 0, duration: 1.4 });
    return;
  }
  if (target === 0) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

const Menu = ({ open, onOutsideClick, onClose }) => {
  const ref = useRef();

  // Handler lives inside the effect, so the only dependency is onOutsideClick
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onOutsideClick?.(event);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [onOutsideClick]);

  const [contents, contentsApi] = useSpring(() => ({
    from: { y: 100, opacity: 0, transform: "rotate(20deg)" },
  }));
  const [news, newsApi] = useSpring(() => ({
    from: { y: 100, opacity: 0, transform: "rotate(-20deg)" },
  }));
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    let timeoutId;
    if (open === false) {
      timeoutId = setTimeout(() => setHidden(false), 500);
    } else {
      setHidden(true);
    }
    contentsApi.start({
      y: open ? 0 : 100,
      opacity: open ? 1 : 0,
      transform: open ? "rotate(0deg)" : "rotate(20deg)",
    });
    newsApi.start({
      y: open ? 0 : 100,
      opacity: open ? 1 : 0,
      transform: open ? "rotate(0deg)" : "rotate(-20deg)",
    });
    return () => clearTimeout(timeoutId);
  }, [open, contentsApi, newsApi]);

  const navItems = [
    { label: "HOME", target: "top" },
    { label: "ABOUT", target: "about" },
    { label: "WORK", target: "projects-section" },
    { label: "CONTACT", target: "contact-section" },
  ];

  const handleNavClick = (e, target) => {
    e.preventDefault();
    scrollToSection(target);
    if (onClose) onClose();
  };

  return (
    <>
      {hidden && (
        <div className="absolute top-[4rem] right-0 w-[20rem]" ref={ref}>
          <a.div className="rounded-xl bg-bg-alt text-fg flex flex-col font-Aeonik text-3xl p-8" style={contents}>
            {navItems.map((item, i) => (
              <a
                key={item.target}
                href={`#${item.target}`}
                onClick={(e) => handleNavClick(e, item.target)}
                className={`flex items-center justify-between transition-colors hover:text-brblue cursor-pointer ${
                  i === 0 ? "pb-3" : i === navItems.length - 1 ? "pt-3" : "py-3"
                }`}
              >
                <span>{item.label}</span>
                <span className="text-fg-muted">•</span>
              </a>
            ))}
          </a.div>
          <a.div className="rounded-xl bg-bg-alt text-fg flex flex-col p-8 my-2" style={news}>
            <div className="font-Aeonik text-3xl leading-tight">
              Open for roles<br />&amp; projects.
            </div>
            <div className="flex flex-col gap-2 mt-5">
              <a
                href={`mailto:${EMAIL}`}
                onClick={() => onClose && onClose()}
                className="flex items-center justify-between bg-fg text-bg rounded-xl px-4 py-3 text-sm tracking-widest font-semibold transition-transform hover:-translate-y-0.5"
              >
                <span>EMAIL ME</span>
                <span>↗</span>
              </a>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer"
                onClick={() => onClose && onClose()}
                className="flex items-center justify-between border-2 border-fg text-fg rounded-xl px-4 py-3 text-sm tracking-widest font-semibold hover:bg-accent-soft"
              >
                <span>GITHUB</span>
                <span>↗</span>
              </a>
            </div>
          </a.div>
        </div>
      )}
    </>
  );
};

export default Menu;
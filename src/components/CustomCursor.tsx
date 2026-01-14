"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const cursorDotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursorDot = cursorDotRef.current;

    if (!cursorDot) return;

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursorDot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: "power2.out",
      });
    };

    const handleMouseEnter = () => {
      gsap.to(cursorDot, { opacity: 1, scale: 1, duration: 0.3 });
    };

    const handleMouseLeave = () => {
      gsap.to(cursorDot, { opacity: 0, scale: 0.5, duration: 0.3 });
    };

    // Hover effect for interactive elements
    const handleLinkEnter = () => {
      gsap.to(cursorDot, { scale: 1.5, duration: 0.3 });
    };

    const handleLinkLeave = () => {
      gsap.to(cursorDot, { scale: 1, duration: 0.3 });
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll("a, button, input, [role='button']");
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleLinkEnter);
      el.addEventListener("mouseleave", handleLinkLeave);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleLinkEnter);
        el.removeEventListener("mouseleave", handleLinkLeave);
      });
    };
  }, []);

  return (
    <div
      ref={cursorDotRef}
      className="fixed pointer-events-none z-[10000]"
      style={{
        width: "12px",
        height: "12px",
        borderRadius: "50%",
        backgroundColor: "#493425",
        transform: "translate(-50%, -50%)",
        top: 0,
        left: 0,
      }}
    />
  );
}

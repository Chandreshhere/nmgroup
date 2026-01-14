"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function PageLoader() {
  const loaderRef = useRef<HTMLDivElement>(null);
  const charsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const circleRef = useRef<HTMLDivElement>(null);
  const innerTextRef = useRef<HTMLDivElement>(null);
  const [isComplete, setIsComplete] = useState(false);

  const text = "livence";

  useEffect(() => {
    // Disable scroll during loader
    document.body.style.overflow = "hidden";

    const loader = loaderRef.current;
    const chars = charsRef.current.filter(Boolean) as HTMLSpanElement[];
    const circle = circleRef.current;
    const innerText = innerTextRef.current;

    if (!loader || chars.length === 0 || !circle || !innerText) return;

    // Create main timeline
    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        setIsComplete(true);
      },
    });

    // Set initial states
    gsap.set(chars, { x: 150, opacity: 0 });
    gsap.set(circle, { scale: 0, opacity: 0, x: 0, y: 0 });
    gsap.set(innerText, { x: 0, y: 0 });
    gsap.set(loader, { clipPath: "inset(0 0 0 0)" });

    // PHASE 1 — TEXT ENTRY (each character one by one, right to left)
    tl.to(chars, {
      x: 0,
      opacity: 1,
      duration: 0.5,
      ease: "power4.out",
      stagger: 0.03,
    });

    // PHASE 2 — CIRCLE APPEARS at center (starts small, grows to 1)
    tl.to(
      circle,
      {
        scale: 1,
        opacity: 1,
        duration: 0.35,
        ease: "power2.out",
      },
      "-=0.15"
    );

    // PHASE 3 — CENTER: Circle breathes slightly
    tl.to(circle, {
      scale: 0.9,
      duration: 0.2,
      ease: "power1.inOut",
    });
    tl.to(circle, {
      scale: 1,
      duration: 0.2,
      ease: "power1.inOut",
    });

    // PHASE 4 — LEFT-TOP: Circle moves to left-top, smaller shape
    tl.to(circle, {
      x: -80,
      y: -25,
      scale: 0.7,
      duration: 0.5,
      ease: "power2.inOut",
    });
    // Inner text moves opposite to keep it fixed in place
    tl.to(innerText, {
      x: 80,
      y: 25,
      duration: 0.5,
      ease: "power2.inOut",
    }, "<");

    // PHASE 5 — MIDDLE-TOP: Circle moves to center-top, bigger shape
    tl.to(circle, {
      x: 0,
      y: -35,
      scale: 1.2,
      duration: 0.5,
      ease: "power2.inOut",
    });
    // Inner text moves opposite
    tl.to(innerText, {
      x: 0,
      y: 35,
      duration: 0.5,
      ease: "power2.inOut",
    }, "<");

    // PHASE 6 — BOTTOM-RIGHT: Circle moves to bottom-right, smaller shape
    tl.to(circle, {
      x: 100,
      y: 30,
      scale: 0.4,
      duration: 0.5,
      ease: "power2.inOut",
    });
    // Inner text moves opposite
    tl.to(innerText, {
      x: -100,
      y: -30,
      duration: 0.5,
      ease: "power2.inOut",
    }, "<");

    // PHASE 6.5 — Circle disappears (shrinks to nothing)
    tl.to(circle, {
      scale: 0,
      opacity: 0,
      duration: 0.25,
      ease: "power2.in",
    });

    // PHASE 7 — BRIEF HOLD
    tl.to({}, { duration: 0.15 });

    // PHASE 8 — EXIT WIPE (bottom to top)
    tl.to(loader, {
      clipPath: "inset(0 0 100% 0)",
      duration: 0.5,
      ease: "power2.inOut",
    });

    return () => {
      tl.kill();
      document.body.style.overflow = "";
    };
  }, []);

  if (isComplete) return null;

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-9999 bg-[#F5F5F3] flex items-center justify-center"
      style={{
        clipPath: "inset(0 0 0 0)",
      }}
    >
      {/* Logo Container - stays centered */}
      <div className="relative flex items-center justify-center">
        {/* Layer 1: Dark text (base layer) */}
        <div
          className="relative font-normal flex"
          style={{
            fontSize: "clamp(48px, 7vw, 90px)",
            letterSpacing: "-0.02em",
            color: "#493425",
          }}
        >
          {text.split("").map((char, index) => (
            <span
              key={index}
              ref={(el) => {
                charsRef.current[index] = el;
              }}
              className="inline-block"
            >
              {char}
            </span>
          ))}
        </div>

        {/* Layer 2: Moving circle with overflow hidden - acts as a mask */}
        <div
          ref={circleRef}
          className="absolute rounded-full overflow-hidden"
          style={{
            width: "clamp(100px, 12vw, 160px)",
            height: "clamp(100px, 12vw, 160px)",
            left: "50%",
            top: "50%",
            marginLeft: "calc(-1 * clamp(50px, 6vw, 80px))",
            marginTop: "calc(-1 * clamp(50px, 6vw, 80px))",
            backgroundColor: "#493425",
            opacity: 0,
          }}
        >
          {/* Inner light text - moves opposite to circle to stay aligned with dark text */}
          <div
            ref={innerTextRef}
            className="absolute font-normal"
            style={{
              fontSize: "clamp(48px, 7vw, 90px)",
              letterSpacing: "-0.02em",
              color: "#E5E2DD",
              whiteSpace: "nowrap",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            {text}
          </div>
        </div>
      </div>
    </div>
  );
}

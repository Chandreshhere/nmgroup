"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";

export default function PageLoader() {
  const loaderRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const innerLogoRef = useRef<HTMLDivElement>(null);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Disable scroll during loader
    document.body.style.overflow = "hidden";

    const loader = loaderRef.current;
    const logo = logoRef.current;
    const circle = circleRef.current;
    const innerLogo = innerLogoRef.current;

    if (!loader || !logo || !circle || !innerLogo) return;

    // Get responsive multiplier based on screen width
    const isMobile = window.innerWidth < 768;
    const multiplier = isMobile ? 0.5 : 1;

    // Create main timeline
    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        setIsComplete(true);
      },
    });

    // Set initial states
    gsap.set(logo, { opacity: 1 });
    gsap.set(circle, { scale: 0, opacity: 0, x: 0, y: 0 });
    gsap.set(innerLogo, { x: 0, y: 0 });
    gsap.set(loader, { clipPath: "inset(0 0 0 0)" });

    // PHASE 1 — CIRCLE APPEARS at center (starts small, grows to 1)
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
      x: -80 * multiplier,
      y: -25 * multiplier,
      scale: 0.7,
      duration: 0.5,
      ease: "power2.inOut",
    });
    // Inner logo moves opposite to keep it fixed in place
    tl.to(innerLogo, {
      x: 80 * multiplier,
      y: 25 * multiplier,
      duration: 0.5,
      ease: "power2.inOut",
    }, "<");

    // PHASE 5 — MIDDLE-TOP: Circle moves to center-top, bigger shape
    tl.to(circle, {
      x: 0,
      y: -35 * multiplier,
      scale: isMobile ? 1 : 1.2,
      duration: 0.5,
      ease: "power2.inOut",
    });
    // Inner logo moves opposite
    tl.to(innerLogo, {
      x: 0,
      y: 35 * multiplier,
      duration: 0.5,
      ease: "power2.inOut",
    }, "<");

    // PHASE 6 — BOTTOM-RIGHT: Circle moves to bottom-right, smaller shape
    tl.to(circle, {
      x: 100 * multiplier,
      y: 30 * multiplier,
      scale: isMobile ? 0.5 : 0.4,
      duration: 0.5,
      ease: "power2.inOut",
    });
    // Inner logo moves opposite
    tl.to(innerLogo, {
      x: -100 * multiplier,
      y: -30 * multiplier,
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
        {/* Layer 1: Dark logo (base layer) */}
        <div
          ref={logoRef}
          className="relative w-[200px] h-[65px] md:w-[clamp(250px,35vw,450px)] md:h-[clamp(80px,12vw,150px)]"
        >
          <Image
            src="/logo.jpg"
            alt="Livence"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Layer 2: Moving circle with overflow hidden - acts as a mask */}
        <div
          ref={circleRef}
          className="absolute rounded-full overflow-hidden w-[80px] h-[80px] md:w-[clamp(100px,12vw,160px)] md:h-[clamp(100px,12vw,160px)]"
          style={{
            left: "50%",
            top: "50%",
            marginLeft: "-40px",
            marginTop: "-40px",
            backgroundColor: "#493425",
            opacity: 0,
          }}
        >
          {/* Inner inverted logo - moves opposite to circle to stay aligned with base logo */}
          <div
            ref={innerLogoRef}
            className="absolute w-[200px] h-[65px] md:w-[clamp(250px,35vw,450px)] md:h-[clamp(80px,12vw,150px)]"
            style={{
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              filter: "invert(1) brightness(1.2)",
            }}
          >
            <Image
              src="/logo.jpg"
              alt="Livence"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}

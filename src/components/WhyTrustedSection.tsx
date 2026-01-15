"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function AnimatedNumber({ value, suffix = "", duration = 1.2 }: { value: number; suffix?: string; duration?: number }) {
  const [displayValue, setDisplayValue] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const trigger = ScrollTrigger.create({
      trigger: element,
      start: "top 90%",
      onEnter: () => {
        if (hasAnimated.current) return;
        hasAnimated.current = true;

        const obj = { val: 0 };
        gsap.to(obj, {
          val: value,
          duration: duration,
          ease: "power2.out",
          onUpdate: () => {
            setDisplayValue(Math.round(obj.val));
          },
        });
      },
    });

    return () => trigger.kill();
  }, [value, duration]);

  return (
    <span ref={elementRef}>
      {displayValue.toLocaleString()}{suffix}
    </span>
  );
}

export default function WhyTrustedSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const clientRefs = useRef<(HTMLDivElement | null)[]>([]);
  const statsHeaderRef = useRef<HTMLParagraphElement>(null);
  const statRefs = useRef<(HTMLDivElement | null)[]>([]);

  const clientTypes = [
    {
      title: "(FOR FUTURE COMMUNITIES)",
      description:
        "Crafting environments that elevate everyday living. We design and develop spaces that enhance quality of life through thoughtful planning, timeless architecture, and sustainable growth—shaping better lifestyles for generations to come.",
    },
    {
      title: "(FOR NATIONAL GROWTH)",
      description:
        "Building leadership through transformation. Rooted in innovation and excellence, NM Group drives planned development across residential, commercial, and retail domains—setting benchmarks in quality, scale, and national impact.",
    },
    {
      title: "(FOR CONSCIOUS DEVELOPMENT)",
      description:
        "Progress guided by responsibility and ethics. We uphold the highest legal, environmental, and ethical standards, ensuring every project reflects our commitment to social responsibility and long-term societal well-being.",
    },
    {
      title: "(FOR ENDURING LEGACY)",
      description:
        "Vision-driven craftsmanship that stands the test of time. Inspired by the philosophy of being the change, we combine advanced technology, refined design, and superior service to create enduring landmarks of trust, value, and excellence.",
    },
  ];

  const stats = [
    {
      value: 13,
      suffix: "",
      label: "Years Legacy",
      hasPlus: true,
    },
    {
      value: 5000,
      suffix: "",
      label: "Happy Families Residing",
      hasPlus: true,
    },
    {
      value: 200,
      suffix: "",
      label: "Acres Land Transformed",
      hasPlus: false,
    },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const description = descriptionRef.current;
    const clients = clientRefs.current.filter(Boolean) as HTMLDivElement[];
    const statsHeader = statsHeaderRef.current;
    const statElements = statRefs.current.filter(Boolean) as HTMLDivElement[];

    if (!section || !header || !description) return;

    // Check if mobile
    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      // Set initial states - slide from left on mobile, from below on desktop
      if (isMobile) {
        gsap.set([header, description], { opacity: 0, x: -80 });
        gsap.set(clients, { opacity: 0, x: -80 });
        gsap.set(statsHeader, { opacity: 0, x: -80 });
        gsap.set(statElements, { opacity: 0, x: -60 });

        // Mobile: Timeline animation on page load (like hero section)
        const tl = gsap.timeline({
          delay: 5.5, // 1 second after hero animation (4.5 + 1)
        });

        // Header slides in from left
        tl.to(header, {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
        });

        // Description slides in from left (slightly overlapping)
        tl.to(description, {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
        }, "-=0.6");

      } else {
        gsap.set([header, description], { opacity: 0, y: 40 });
        gsap.set(clients, { opacity: 0, y: 50 });
        gsap.set(statsHeader, { opacity: 0, y: 40 });
        gsap.set(statElements, { opacity: 0, y: 50 });

        // Desktop: Scroll-triggered animation
        gsap.to(header, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: header,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });

        gsap.to(description, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: header,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        });
      }

      // Client types - each one triggered individually as they scroll into view
      clients.forEach((client, index) => {
        gsap.to(client, {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.6,
          delay: isMobile ? index * 0.1 : 0,
          ease: isMobile ? "power3.out" : "power2.out",
          scrollTrigger: {
            trigger: client,
            start: "top 92%",
            toggleActions: "play none none none",
          },
        });
      });

      // Stats header
      if (statsHeader) {
        gsap.to(statsHeader, {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.6,
          ease: isMobile ? "power3.out" : "power2.out",
          scrollTrigger: {
            trigger: statsHeader,
            start: "top 92%",
            toggleActions: "play none none none",
          },
        });
      }

      // Stats - each one triggered individually with stagger on mobile
      statElements.forEach((stat, index) => {
        gsap.to(stat, {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.6,
          delay: isMobile ? index * 0.1 : 0,
          ease: isMobile ? "power3.out" : "power2.out",
          scrollTrigger: {
            trigger: stat,
            start: "top 92%",
            toggleActions: "play none none none",
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#F5F5F3] pt-4 pb-16 md:pt-6 md:pb-40 lg:pt-8 lg:pb-48 px-5 md:px-12"
      style={{ zIndex: 2 }}
    >
      {/* Top Row */}
      <div className="flex flex-col lg:flex-row gap-6 md:gap-10 lg:gap-0 lg:items-start">
        {/* Left - Why trusted + Description */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-10 lg:gap-20 lg:min-w-140 shrink-0 lg:pt-12">
          <h2
            ref={headerRef}
            className="text-sm font-semibold text-[#493425] shrink-0 whitespace-nowrap"
            style={{ opacity: 0 }}
          >
            Why trusted
          </h2>
          <p
            ref={descriptionRef}
            className="text-sm font-medium text-[#493425]/80 leading-[140%] w-full md:w-44"
            style={{ opacity: 0 }}
          >
            Elite real estate is not an expense, but a strategic investment. We offer
            transparent mechanisms for increasing your capital, regardless of your status
            or location
          </p>
        </div>

        {/* Right - Client Types */}
        <div className="flex-1">
          {clientTypes.map((client, index) => (
            <div
              key={index}
              ref={(el) => {
                clientRefs.current[index] = el;
              }}
              className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-3 md:gap-4 lg:gap-8 py-6 md:py-8 lg:py-10 border-b border-[#493425]/20"
              style={{ opacity: 0 }}
            >
              <h3 className="text-lg md:text-2xl lg:text-3xl font-medium text-[#493425] tracking-tight leading-tight">
                {client.title}
              </h3>
              <p className="text-xs md:text-sm font-medium text-[#8D7660] leading-[160%] text-left">
                {client.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Row - Stats */}
      <div className="mt-10 md:mt-16 flex flex-col lg:flex-row gap-6 md:gap-10 lg:gap-0 lg:items-start">
        {/* Left - Tagline */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-10 lg:gap-20 lg:min-w-140 shrink-0">
          <div className="hidden md:block w-20 shrink-0"></div>
          <p
            ref={statsHeaderRef}
            className="text-sm font-medium text-[#493425]/80 leading-[140%] w-full md:w-44"
            style={{ opacity: 0 }}
          >
            Our journey in numbers
          </p>
        </div>

        {/* Right - Stats */}
        <div className="flex-1 grid grid-cols-3 gap-2 md:gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              ref={(el) => {
                statRefs.current[index] = el;
              }}
              className="text-left"
              style={{ opacity: 0 }}
            >
              <div className="text-2xl md:text-5xl lg:text-6xl font-light text-[#493425] tracking-tight leading-[106%]">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} duration={2} />
                {stat.hasPlus && (
                  <span className="text-lg md:text-3xl lg:text-4xl align-top ml-0.5 md:ml-1">+</span>
                )}
              </div>
              <p className="text-[10px] md:text-sm font-medium text-[#493425]/60 mt-1 md:mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

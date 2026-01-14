"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function WhyTrustedSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const clientRefs = useRef<(HTMLDivElement | null)[]>([]);
  const statsHeaderRef = useRef<HTMLParagraphElement>(null);
  const statRefs = useRef<(HTMLDivElement | null)[]>([]);

  const clientTypes = [
    {
      title: "(INVESTORS)",
      description:
        "Capital growth is guaranteed with a verifiable return on investment (ROI) of 11% or more",
    },
    {
      title: "(NON-RESIDENTS)",
      description:
        "Complete investment management, including remote legal and financial processes, with zero need for physical presence",
    },
    {
      title: "(ENTREPRENEURS)",
      description:
        "Acquire additional elite social status and a reliable, high-yield passive income stream instantly",
    },
    {
      title: "(PUBLIC FIGURES)",
      description:
        "Benefit from secure, absolutely confidential transactions protecting your personal identity and privacy completely",
    },
  ];

  const stats = [
    {
      value: "100%",
      label: "deals with legal support",
    },
    {
      value: "20+",
      label: "countries of satisfied clients",
    },
    {
      value: "15+",
      label: "years on the market",
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

    const ctx = gsap.context(() => {
      // Set initial states - start from below
      gsap.set([header, description], { opacity: 0, y: 80 });
      gsap.set(clients, { opacity: 0, y: 100 });
      gsap.set(statsHeader, { opacity: 0, y: 80 });
      gsap.set(statElements, { opacity: 0, y: 100 });

      // Header animation - first to appear
      gsap.to(header, {
        opacity: 1,
        y: 0,
        duration: 1.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: header,
          start: "top 98%",
          end: "top 60%",
          toggleActions: "play none none none",
        },
      });

      // Description - slightly after header
      gsap.to(description, {
        opacity: 1,
        y: 0,
        duration: 1.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: header,
          start: "top 95%",
          end: "top 60%",
          toggleActions: "play none none none",
        },
      });

      // Client types - each one triggered individually as they scroll into view
      clients.forEach((client) => {
        gsap.to(client, {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: client,
            start: "top 98%",
            end: "top 70%",
            toggleActions: "play none none none",
          },
        });
      });

      // Stats header - "We sell only what we invest in"
      if (statsHeader) {
        gsap.to(statsHeader, {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: statsHeader,
            start: "top 98%",
            end: "top 70%",
            toggleActions: "play none none none",
          },
        });
      }

      // Stats - each one triggered individually
      statElements.forEach((stat) => {
        gsap.to(stat, {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: stat,
            start: "top 98%",
            end: "top 70%",
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
      className="relative bg-[#F5F5F3] py-32 md:py-40 lg:py-48"
      style={{ paddingLeft: "48px", paddingRight: "48px", zIndex: 2 }}
    >
      {/* Top Row */}
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-0 lg:items-start">
        {/* Left - Why trusted + Description */}
        <div className="flex gap-10 lg:gap-20 lg:min-w-140 shrink-0 lg:pt-12">
          <h2
            ref={headerRef}
            className="text-sm font-semibold text-[#493425] shrink-0 whitespace-nowrap"
            style={{ opacity: 0 }}
          >
            Why trusted
          </h2>
          <p
            ref={descriptionRef}
            className="text-sm font-medium text-[#493425]/80 leading-[140%] w-44"
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
              className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 lg:gap-12 py-8 lg:py-10 border-b border-[#493425]/20"
              style={{ opacity: 0 }}
            >
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-medium text-[#493425] tracking-tight leading-none">
                {client.title}
              </h3>
              <p className="text-xs md:text-sm font-medium text-[#8D7660] leading-[140%] lg:w-72 lg:text-left">
                {client.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Row - Stats */}
      <div className="mt-12 md:mt-16 flex flex-col lg:flex-row gap-10 lg:gap-0 lg:items-start">
        {/* Left - Tagline */}
        <div className="flex gap-10 lg:gap-20 lg:min-w-140 shrink-0">
          <div className="w-20 shrink-0"></div>
          <p
            ref={statsHeaderRef}
            className="text-sm font-medium text-[#493425]/80 leading-[140%] w-44"
            style={{ opacity: 0 }}
          >
            We sell only what we invest in
          </p>
        </div>

        {/* Right - Stats */}
        <div className="flex-1 grid grid-cols-3 gap-4 md:gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              ref={(el) => {
                statRefs.current[index] = el;
              }}
              className="text-left"
              style={{ opacity: 0 }}
            >
              <div className="text-4xl md:text-5xl lg:text-6xl font-light text-[#493425] tracking-tight leading-[106%]">
                {stat.value}
              </div>
              <p className="text-xs md:text-sm font-medium text-[#493425]/60 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

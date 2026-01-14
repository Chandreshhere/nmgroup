"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function TeamSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const jamesRef = useRef<HTMLDivElement>(null);
  const ameliaRef = useRef<HTMLDivElement>(null);
  const oliverRef = useRef<HTMLDivElement>(null);
  const arrowsRef = useRef<HTMLDivElement>(null);

  const team = [
    {
      id: 1,
      name: "JAMES WHITMORE",
      role: "Founder & CEO",
      image: "/team1.jpg",
    },
    {
      id: 2,
      name: "AMELIA HARTLEY",
      role: "Head of International Sales",
      image: "/team2.jpg",
    },
    {
      id: 3,
      name: "OLIVER GRANT",
      role: "Chief Real Estate Consultant",
      image: "/team3.jpg",
    },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const james = jamesRef.current;
    const amelia = ameliaRef.current;
    const oliver = oliverRef.current;
    const arrows = arrowsRef.current;

    if (!section || !title || !james || !amelia || !oliver || !arrows) return;

    const ctx = gsap.context(() => {
      // Set initial states - scale from center
      gsap.set(title, { opacity: 0, y: 40 });
      gsap.set(james, { scale: 0.85, opacity: 0, transformOrigin: "center center" });
      gsap.set(amelia, { scale: 0.85, opacity: 0, transformOrigin: "center center" });
      gsap.set(oliver, { scale: 0.85, opacity: 0, transformOrigin: "center center" });
      gsap.set(arrows, { scale: 0.85, opacity: 0, transformOrigin: "center center" });

      // Title animation
      gsap.to(title, {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 60%",
          end: "top 30%",
          toggleActions: "play none none none",
        },
      });

      // James - first to appear with smooth scale
      gsap.to(james, {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 60%",
          end: "top 30%",
          toggleActions: "play none none none",
        },
      });

      // Amelia - second to appear with 1 second delay
      gsap.to(amelia, {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        delay: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 60%",
          end: "top 30%",
          toggleActions: "play none none none",
        },
      });

      // Oliver - third to appear with 2 second delay
      gsap.to(oliver, {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        delay: 2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 60%",
          end: "top 30%",
          toggleActions: "play none none none",
        },
      });

      // Arrows - last to appear after all images
      gsap.to(arrows, {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        delay: 3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 60%",
          end: "top 30%",
          toggleActions: "play none none none",
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#F5F5F3] py-28 md:py-36 lg:py-44"
      style={{ paddingLeft: "48px", paddingRight: "48px", zIndex: 2 }}
    >
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-0">
        {/* Left - Title and Navigation */}
        <div className="lg:min-w-140 shrink-0">
          <h2
            ref={titleRef}
            className="text-sm font-semibold text-[#493425]"
            style={{ opacity: 0 }}
          >
            Team of professionals
          </h2>

          {/* Navigation Arrows */}
          <div
            ref={arrowsRef}
            className="flex items-center gap-4 mt-40 md:mt-60 lg:mt-80"
            style={{ opacity: 0 }}
          >
            {/* Left Arrow */}
            <button className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center text-[#493425]/30 hover:text-[#493425] transition-colors">
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M45 25L30 40L45 55" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M25 15C15 25 10 32 10 40C10 48 15 55 25 65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
                <path d="M55 15C65 25 70 32 70 40C70 48 65 55 55 65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
              </svg>
            </button>

            {/* Right Arrow */}
            <button className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center text-[#493425] hover:text-[#493425]/70 transition-colors">
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M35 25L50 40L35 55" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M25 15C15 25 10 32 10 40C10 48 15 55 25 65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
                <path d="M55 15C65 25 70 32 70 40C70 48 65 55 55 65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Right - Team Cards */}
        <div className="flex-1 flex flex-col md:flex-row gap-6 lg:gap-8 md:-ml-20 lg:-ml-32">
          {/* Main Card - James Whitmore */}
          <div
            ref={jamesRef}
            className="flex flex-col"
          >
            <div className="relative w-full md:w-80 lg:w-96 aspect-[3/4] bg-[#E5E2DD] overflow-hidden">
              <Image
                src={team[0].image}
                alt={team[0].name}
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-sm font-semibold text-[#493425] mt-4">{team[0].name}</h3>
            <p className="text-sm font-medium text-[#8D7660] mt-1">{team[0].role}</p>
          </div>

          {/* Right Column - Two Smaller Cards */}
          <div className="flex flex-col gap-6 lg:gap-8">
            {/* Amelia Hartley */}
            <div
              ref={ameliaRef}
              className="flex flex-col"
            >
              <div className="relative w-full md:w-44 lg:w-52 aspect-[4/5] bg-[#E5E2DD] overflow-hidden">
                <Image
                  src={team[1].image}
                  alt={team[1].name}
                  fill
                  className="object-cover object-top"
                />
              </div>
              <h3 className="text-sm font-semibold text-[#493425] mt-4">{team[1].name}</h3>
              <p className="text-sm font-medium text-[#8D7660] mt-1">{team[1].role}</p>
            </div>

            {/* Oliver Grant */}
            <div
              ref={oliverRef}
              className="flex flex-col md:ml-44 lg:ml-60 md:-mt-16 lg:-mt-24"
            >
              <div className="relative w-full md:w-44 lg:w-52 aspect-[4/5] bg-[#E5E2DD] overflow-hidden">
                <Image
                  src={team[2].image}
                  alt={team[2].name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-sm font-semibold text-[#493425] mt-4">{team[2].name}</h3>
              <p className="text-sm font-medium text-[#8D7660] mt-1">{team[2].role}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function TeamSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const arrowsRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  // Mobile refs
  const mobileCard1Ref = useRef<HTMLDivElement>(null);
  const mobileCard2Ref = useRef<HTMLDivElement>(null);
  const mobileCard3Ref = useRef<HTMLDivElement>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const team = [
    {
      id: 1,
      name: "Mr Niket Mangal",
      role: "Director",
      image: "/t1.jpg",
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

  const getVisibleMembers = () => {
    const len = team.length;
    return [
      team[currentIndex % len],
      team[(currentIndex + 1) % len],
      team[(currentIndex + 2) % len],
    ];
  };

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    const desktopCards = [card1Ref.current, card2Ref.current, card3Ref.current].filter(Boolean);
    const mobileCards = [mobileCard1Ref.current, mobileCard2Ref.current, mobileCard3Ref.current].filter(Boolean);
    const cards = [...desktopCards, ...mobileCards];

    // Fade out
    gsap.to(cards, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        setCurrentIndex(prev => (prev + 1) % team.length);
        // Fade in
        gsap.to(cards, {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
          onComplete: () => setIsAnimating(false)
        });
      }
    });
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    const desktopCards = [card1Ref.current, card2Ref.current, card3Ref.current].filter(Boolean);
    const mobileCards = [mobileCard1Ref.current, mobileCard2Ref.current, mobileCard3Ref.current].filter(Boolean);
    const cards = [...desktopCards, ...mobileCards];

    // Fade out
    gsap.to(cards, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        setCurrentIndex(prev => (prev - 1 + team.length) % team.length);
        // Fade in
        gsap.to(cards, {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
          onComplete: () => setIsAnimating(false)
        });
      }
    });
  };

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const card1 = card1Ref.current;
    const card2 = card2Ref.current;
    const card3 = card3Ref.current;
    const arrows = arrowsRef.current;
    const mobileCard1 = mobileCard1Ref.current;
    const mobileCard2 = mobileCard2Ref.current;
    const mobileCard3 = mobileCard3Ref.current;

    if (!section || !title || !arrows) return;

    const ctx = gsap.context(() => {
      gsap.set(title, { opacity: 0, y: 40 });
      gsap.set(arrows, { opacity: 0, y: 20 });

      // Desktop cards
      if (card1) gsap.set(card1, { opacity: 0, y: 30 });
      if (card2) gsap.set(card2, { opacity: 0, y: 30 });
      if (card3) gsap.set(card3, { opacity: 0, y: 30 });

      // Mobile cards
      if (mobileCard1) gsap.set(mobileCard1, { opacity: 0, y: 30 });
      if (mobileCard2) gsap.set(mobileCard2, { opacity: 0, y: 30 });
      if (mobileCard3) gsap.set(mobileCard3, { opacity: 0, y: 30 });

      gsap.to(title, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 60%",
          toggleActions: "play none none none",
        },
      });

      // Desktop card animations
      if (card1) {
        gsap.to(card1, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 60%",
            toggleActions: "play none none none",
          },
        });
      }

      if (card2) {
        gsap.to(card2, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 60%",
            toggleActions: "play none none none",
          },
        });
      }

      if (card3) {
        gsap.to(card3, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 60%",
            toggleActions: "play none none none",
          },
        });
      }

      // Mobile card animations
      if (mobileCard1) {
        gsap.to(mobileCard1, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 60%",
            toggleActions: "play none none none",
          },
        });
      }

      if (mobileCard2) {
        gsap.to(mobileCard2, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 60%",
            toggleActions: "play none none none",
          },
        });
      }

      gsap.to(arrows, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 60%",
          toggleActions: "play none none none",
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const visibleMembers = getVisibleMembers();

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#F5F5F3] py-16 md:py-36 lg:py-44 px-5 md:px-12"
      style={{ zIndex: 2 }}
    >
      {/* Mobile Layout */}
      <div className="md:hidden">
        {/* Top Row - Title and Navigation */}
        <div className="flex justify-between items-start mb-8">
          <h2
            ref={titleRef}
            className="text-sm font-semibold text-[#493425]"
            style={{ opacity: 0 }}
          >
            Team of
            <br />
            professionals
          </h2>

          {/* Navigation Arrows - Top Right */}
          <div
            ref={arrowsRef}
            className="flex items-center gap-2"
            style={{ opacity: 0 }}
          >
            <button
              onClick={handlePrev}
              disabled={isAnimating}
              className="w-14 h-14 flex items-center justify-center text-[#493425]/30 hover:text-[#493425] transition-colors disabled:opacity-50"
            >
              <svg width="50" height="50" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M45 25L30 40L45 55" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M25 15C15 25 10 32 10 40C10 48 15 55 25 65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
                <path d="M55 15C65 25 70 32 70 40C70 48 65 55 55 65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
              </svg>
            </button>
            <button
              onClick={handleNext}
              disabled={isAnimating}
              className="w-14 h-14 flex items-center justify-center text-[#493425] hover:text-[#493425]/70 transition-colors disabled:opacity-50"
            >
              <svg width="50" height="50" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M35 25L50 40L35 55" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M25 15C15 25 10 32 10 40C10 48 15 55 25 65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
                <path d="M55 15C65 25 70 32 70 40C70 48 65 55 55 65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Team Cards - Mobile */}
        <div className="flex gap-4">
          {/* Main Card - Position 1 (Large) */}
          <div
            ref={mobileCard1Ref}
            className="flex flex-col flex-1"
            style={{ opacity: 0 }}
          >
            <div className="relative w-full aspect-[3/4] bg-[#E5E2DD] overflow-hidden">
              <Image
                src={visibleMembers[0].image}
                alt={visibleMembers[0].name}
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-xs font-semibold text-[#493425] mt-3 uppercase">{visibleMembers[0].name}</h3>
            <p className="text-xs font-medium text-[#8D7660] mt-0.5">{visibleMembers[0].role}</p>
          </div>

          {/* Position 2 - Right side smaller */}
          <div
            ref={mobileCard2Ref}
            className="flex flex-col w-[40%] mt-16"
            style={{ opacity: 0 }}
          >
            <div className="relative w-full aspect-[3/4] bg-[#E5E2DD] overflow-hidden">
              <Image
                src={visibleMembers[1].image}
                alt={visibleMembers[1].name}
                fill
                className="object-cover object-top"
              />
            </div>
            <h3 className="text-xs font-semibold text-[#493425] mt-3 uppercase">{visibleMembers[1].name}</h3>
            <p className="text-xs font-medium text-[#8D7660] mt-0.5">{visibleMembers[1].role}</p>
          </div>
        </div>

        {/* Hidden card3 ref for mobile - needed for animation */}
        <div ref={mobileCard3Ref} className="hidden" style={{ opacity: 0 }} />
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex flex-col lg:flex-row gap-12 lg:gap-0">
        {/* Left - Title and Navigation */}
        <div className="lg:min-w-140 shrink-0">
          <h2
            className="text-sm font-semibold text-[#493425]"
          >
            Team of professionals
          </h2>

          {/* Navigation Arrows - Desktop */}
          <div
            className="flex items-center gap-6 mt-60 lg:mt-80"
          >
            <button
              onClick={handlePrev}
              disabled={isAnimating}
              className="w-40 h-40 flex items-center justify-center text-[#493425]/30 hover:text-[#493425] transition-colors disabled:opacity-50"
            >
              <svg width="120" height="120" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M45 25L30 40L45 55" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M25 15C15 25 10 32 10 40C10 48 15 55 25 65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
                <path d="M55 15C65 25 70 32 70 40C70 48 65 55 55 65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
              </svg>
            </button>

            <button
              onClick={handleNext}
              disabled={isAnimating}
              className="w-40 h-40 flex items-center justify-center text-[#493425] hover:text-[#493425]/70 transition-colors disabled:opacity-50"
            >
              <svg width="120" height="120" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M35 25L50 40L35 55" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M25 15C15 25 10 32 10 40C10 48 15 55 25 65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
                <path d="M55 15C65 25 70 32 70 40C70 48 65 55 55 65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Right - Team Cards Desktop */}
        <div className="flex-1 flex flex-row gap-6 lg:gap-8 -ml-20 lg:-ml-32 relative">
          {/* Main Card - Position 1 (Large) */}
          <div
            ref={card1Ref}
            className="flex flex-col"
            style={{ opacity: 0 }}
          >
            <div className="relative w-80 lg:w-96 aspect-[3/4] bg-[#E5E2DD] overflow-hidden">
              <Image
                src={visibleMembers[0].image}
                alt={visibleMembers[0].name}
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-sm font-semibold text-[#493425] mt-4">{visibleMembers[0].name}</h3>
            <p className="text-sm font-medium text-[#8D7660] mt-1">{visibleMembers[0].role}</p>
          </div>

          {/* Right Column - Two Smaller Cards */}
          <div className="flex flex-col gap-6 lg:gap-8">
            {/* Position 2 */}
            <div
              ref={card2Ref}
              className="flex flex-col"
              style={{ opacity: 0 }}
            >
              <div className="relative w-44 lg:w-52 aspect-[4/5] bg-[#E5E2DD] overflow-hidden">
                <Image
                  src={visibleMembers[1].image}
                  alt={visibleMembers[1].name}
                  fill
                  className="object-cover object-top"
                />
              </div>
              <h3 className="text-sm font-semibold text-[#493425] mt-4">{visibleMembers[1].name}</h3>
              <p className="text-sm font-medium text-[#8D7660] mt-1">{visibleMembers[1].role}</p>
            </div>

            {/* Position 3 */}
            <div
              ref={card3Ref}
              className="flex flex-col ml-44 lg:ml-60 -mt-16 lg:-mt-24"
              style={{ opacity: 0 }}
            >
              <div className="relative w-44 lg:w-52 aspect-[4/5] bg-[#E5E2DD] overflow-hidden">
                <Image
                  src={visibleMembers[2].image}
                  alt={visibleMembers[2].name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-sm font-semibold text-[#493425] mt-4">{visibleMembers[2].name}</h3>
              <p className="text-sm font-medium text-[#8D7660] mt-1">{visibleMembers[2].role}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function ObjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const desc1Ref = useRef<HTMLParagraphElement>(null);
  const desc2Ref = useRef<HTMLParagraphElement>(null);
  const cityRef = useRef<HTMLDivElement>(null);
  const mountainRef = useRef<HTMLDivElement>(null);
  const ruralRef = useRef<HTMLDivElement>(null);
  const heritageRef = useRef<HTMLDivElement>(null);
  const seasideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const desc1 = desc1Ref.current;
    const desc2 = desc2Ref.current;
    const city = cityRef.current;
    const mountain = mountainRef.current;
    const rural = ruralRef.current;
    const heritage = heritageRef.current;
    const seaside = seasideRef.current;

    if (!section || !title || !desc1 || !desc2 || !city || !mountain || !rural || !heritage || !seaside) return;

    const ctx = gsap.context(() => {
      // Set initial states for text
      gsap.set([title, desc1, desc2], { opacity: 0, y: 40 });

      // Set initial states for row 1 images - bottom to top reveal
      gsap.set(city, { clipPath: "inset(100% 0 0 0)" });
      gsap.set(mountain, { clipPath: "inset(100% 0 0 0)" });

      // Set initial states for row 2 images - top to bottom reveal
      gsap.set(rural, { clipPath: "inset(0 0 100% 0)" });
      gsap.set(heritage, { clipPath: "inset(0 0 100% 0)" });
      gsap.set(seaside, { clipPath: "inset(0 0 100% 0)" });

      const isMobileView = window.innerWidth < 768;

      // All three texts animate together
      gsap.to([title, desc1, desc2], {
        opacity: 1,
        y: 0,
        duration: isMobileView ? 0.5 : 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          end: "top 40%",
          toggleActions: "play none none none",
        },
      });

      // City Residences - first to reveal (bottom to top)
      gsap.to(city, {
        clipPath: "inset(0% 0 0 0)",
        duration: isMobileView ? 0.7 : 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: city,
          start: "top 85%",
          end: "top 50%",
          toggleActions: "play none none none",
        },
      });

      // Mountain Retreats - second to reveal with delay (bottom to top)
      gsap.to(mountain, {
        clipPath: "inset(0% 0 0 0)",
        duration: isMobileView ? 0.7 : 1,
        delay: isMobileView ? 0.2 : 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: city,
          start: "top 85%",
          end: "top 50%",
          toggleActions: "play none none none",
        },
      });

      // Rural Estates - first in row 2 (top to bottom)
      gsap.to(rural, {
        clipPath: "inset(0 0 0% 0)",
        duration: isMobileView ? 1.2 : 1.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: rural,
          start: "top 85%",
          end: "top 50%",
          toggleActions: "play none none none",
        },
      });

      // Heritage Homes - after rural with delay (top to bottom)
      gsap.to(heritage, {
        clipPath: "inset(0 0 0% 0)",
        duration: isMobileView ? 1.2 : 1.8,
        delay: isMobileView ? 0.25 : 0.4,
        ease: "power2.out",
        scrollTrigger: {
          trigger: rural,
          start: "top 85%",
          end: "top 50%",
          toggleActions: "play none none none",
        },
      });

      // Seaside Villas - same time as heritage (top to bottom)
      gsap.to(seaside, {
        clipPath: "inset(0 0 0% 0)",
        duration: isMobileView ? 1.2 : 1.8,
        delay: isMobileView ? 0.25 : 0.4,
        ease: "power2.out",
        scrollTrigger: {
          trigger: rural,
          start: "top 85%",
          end: "top 50%",
          toggleActions: "play none none none",
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="objects-section"
      ref={sectionRef}
      className="relative bg-[#F5F5F3] w-full px-5 md:px-12 py-16 md:py-[14vh] overflow-x-clip"
      style={{
        zIndex: 2,
      }}
    >
      {/* Top Text Layout - 3 Column Grid on desktop, stacked on mobile */}
      <div
        className="flex flex-col md:grid gap-6 md:gap-0"
        style={{
          gridTemplateColumns: 'auto 1fr 41vw',
          columnGap: '24px',
        }}
      >
        {/* Left - Title */}
        <div>
          <h2
            ref={titleRef}
            className="text-sm font-semibold text-[#493425] leading-[140%]"
            style={{ opacity: 0 }}
          >
            Shaping the Future of
            <br />
            Modern Living
          </h2>
        </div>

        {/* Middle - Description 1 */}
        <div className="max-w-full md:max-w-[360px]">
          <p
            ref={desc1Ref}
            className="text-sm font-medium text-[#8D7660] leading-[160%]"
            style={{ opacity: 0 }}
          >
            Recognized across leading newspapers and media platforms, NM Group has earned a reputation for delivering landmark developments that redefine contemporary living. Our projects have received multiple accolades for architectural excellence, innovation, and superior construction standards.
          </p>
        </div>

        {/* Right - Description 2 */}
        <div className="max-w-full md:max-w-[360px]">
          <p
            ref={desc2Ref}
            className="text-sm font-medium text-[#8D7660] leading-[160%]"
            style={{ opacity: 0 }}
          >
            Each development reflects a commitment to quality, thoughtful design, and long-term value — going beyond buildings to create environments that elevate lifestyles. As part of the leadership at NM Group, we continue to shape urban landscapes with vision, responsibility, and purpose.
          </p>
        </div>
      </div>

      {/* Image Layout - Editorial Collage */}
      <div className="relative mt-10 md:mt-20">
        {/* Row 1: City Residences + Mountain Retreats */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-end gap-4 md:gap-6">
          {/* Recognized by Leading Media - Small Square */}
          <div className="flex flex-col shrink-0">
            <div
              ref={cityRef}
              className="relative bg-[#E5E2DD] overflow-hidden w-full md:w-[280px] aspect-square"
            >
              <Image
                src="/n3.jpg"
                alt="Recognized by Leading Media"
                fill
                className="object-cover"
              />
            </div>
            <h3
              className="text-[10px] md:text-xs font-semibold text-[#493425] mt-3 md:mt-4 uppercase"
              style={{ letterSpacing: '0.12em' }}
            >
              RECOGNIZED BY LEADING MEDIA
            </h3>
          </div>

          {/* Mountain Retreats - Large Landscape */}
          <div className="flex flex-col">
            <div
              ref={mountainRef}
              className="relative bg-[#E5E2DD] overflow-hidden w-full md:w-[41vw] aspect-[16/10]"
            >
              <Image
                src="/n6.jpg"
                alt="Award-Winning Excellence"
                fill
                className="object-cover"
              />
            </div>
            <h3
              className="text-[10px] md:text-xs font-semibold text-[#493425] mt-3 md:mt-4 uppercase"
              style={{ letterSpacing: '0.12em' }}
            >
              AWARD-WINNING EXCELLENCE
            </h3>
          </div>
        </div>

        {/* Row 2: Rural Estates + Heritage Homes + Seaside Villas */}
        <div className="mt-6 md:mt-8">
          {/* Images row - aligned at bottom */}
          <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-6">
            {/* Rural Estates - Very Wide - with label on mobile */}
            <div className="flex flex-col">
              <div
                ref={ruralRef}
                className="relative bg-[#E5E2DD] overflow-hidden w-full md:w-[52vw] aspect-[16/11]"
              >
                <Image
                  src="/n5.jpg"
                  alt="National Industry Recognition"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Mobile label for Rural - directly under image */}
              <h3
                className="md:hidden text-[10px] font-semibold text-[#493425] mt-3 uppercase"
                style={{ letterSpacing: '0.12em' }}
              >
                NATIONAL INDUSTRY RECOGNITION
              </h3>
            </div>

            {/* Heritage Homes & Seaside Villas - Two Small Side by Side */}
            <div className="flex items-end gap-4 md:gap-6 md:ml-auto">
              {/* Heritage Homes */}
              <div className="flex-1 md:flex-none">
                <div
                  ref={heritageRef}
                  className="relative bg-[#E5E2DD] overflow-hidden w-full md:w-[280px] aspect-[4/5]"
                >
                  <Image
                    src="/n4.jpg"
                    alt="Leadership in Modern Development"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3
                  className="text-[10px] md:text-xs font-semibold text-[#493425] mt-3 md:mt-4 uppercase md:hidden"
                  style={{ letterSpacing: '0.12em' }}
                >
                  LEADERSHIP
                </h3>
              </div>

              {/* Seaside Villas */}
              <div className="flex-1 md:flex-none">
                <div
                  ref={seasideRef}
                  className="relative bg-[#E5E2DD] overflow-hidden w-full md:w-[280px] aspect-[4/5]"
                >
                  <Image
                    src="/n2.jpg"
                    alt="Building a Legacy of Trust"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3
                  className="text-[10px] md:text-xs font-semibold text-[#493425] mt-3 md:mt-4 uppercase md:hidden"
                  style={{ letterSpacing: '0.12em' }}
                >
                  LEGACY
                </h3>
              </div>
            </div>
          </div>

          {/* Labels row - Desktop only */}
          <div className="hidden md:flex gap-6 mt-4">
            <h3
              className="text-xs font-semibold text-[#493425] uppercase"
              style={{ letterSpacing: '0.12em', width: '52vw' }}
            >
              NATIONAL INDUSTRY RECOGNITION
            </h3>
            <div className="flex gap-6 ml-auto">
              <h3
                className="text-xs font-semibold text-[#493425] uppercase"
                style={{ letterSpacing: '0.12em', width: '280px' }}
              >
                LEADERSHIP IN MODERN DEVELOPMENT
              </h3>
              <h3
                className="text-xs font-semibold text-[#493425] uppercase"
                style={{ letterSpacing: '0.12em', width: '280px' }}
              >
                BUILDING A LEGACY OF TRUST
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

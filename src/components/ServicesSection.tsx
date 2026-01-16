"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const serviceRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const services = [
    {
      heading: "(FOR INVESTORS)",
      paragraph:
        "Clear numbers, measurable growth potential, and strategic advice from experienced analysts. We help you identify the most profitable assets, diversify your portfolio, and achieve sustainable capital growth",
      imageMarginLeft: "28vw",
      image: "/invest.jpg",
    },
    {
      heading: "(FOR THOSE ABROAD)",
      paragraph:
        "Full remote management and legal support from anywhere in the world. We take care of all the formalities — from document delivery to secure payments — so you can invest and own property with ease, wherever you are",
      imageMarginLeft: "0",
      image: "/abroad.jpg",
    },
    {
      heading: "(FOR PUBLIC FIGURES)",
      paragraph:
        "Discretion, confidentiality, and premium service 24/7. We understand the importance of privacy and provide tailored assistance that meets the highest standards of exclusivity and personal care",
      imageMarginLeft: "14vw",
      image: "/figures.jpg",
    },
  ];

  // Detect mobile on mount
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle tap to expand on mobile
  const handleTap = (index: number) => {
    if (!isMobile) return;
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  // Animate image on expand/collapse
  useEffect(() => {
    if (!isMobile) return;

    imageRefs.current.forEach((imageEl, index) => {
      if (imageEl) {
        if (expandedIndex === index) {
          // Set initial state for reveal animation
          gsap.set(imageEl, { height: "auto" });
          const height = imageEl.offsetHeight;
          gsap.set(imageEl, { height: 0, opacity: 1 });

          // Animate height from top to bottom
          gsap.to(imageEl, {
            height: height,
            duration: 0.5,
            ease: "power3.out",
          });
        } else {
          gsap.to(imageEl, {
            height: 0,
            duration: 0.4,
            ease: "power3.in",
          });
        }
      }
    });
  }, [expandedIndex, isMobile]);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const description = descriptionRef.current;
    const serviceElements = serviceRefs.current.filter(Boolean) as HTMLDivElement[];

    if (!section || !title || !description) return;

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(title, { opacity: 0, y: 50 });
      gsap.set(description, { opacity: 0, y: 50 });
      gsap.set(serviceElements, { opacity: 0, y: 60 });

      // Title animation - first to appear
      const isMobileView = window.innerWidth < 768;
      gsap.to(title, {
        opacity: 1,
        y: 0,
        duration: isMobileView ? 0.5 : 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          end: "top 40%",
          toggleActions: "play none none none",
        },
      });

      // Description - after title
      gsap.to(description, {
        opacity: 1,
        y: 0,
        duration: isMobileView ? 0.5 : 0.8,
        delay: isMobileView ? 0.1 : 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          end: "top 40%",
          toggleActions: "play none none none",
        },
      });

      // Service rows - staggered reveal one by one
      serviceElements.forEach((service, index) => {
        gsap.to(service, {
          opacity: 1,
          y: 0,
          duration: isMobileView ? 0.5 : 0.8,
          delay: isMobileView ? 0.2 + index * 0.1 : 0.3 + index * 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            end: "top 40%",
            toggleActions: "play none none none",
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  // Handle hover animations for images (desktop only)
  const handleMouseEnter = (index: number) => {
    if (isMobile) return; // Don't animate on mobile
    const imageEl = imageRefs.current[index];
    if (imageEl) {
      gsap.to(imageEl, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const handleMouseLeave = (index: number) => {
    if (isMobile) return; // Don't animate on mobile
    const imageEl = imageRefs.current[index];
    if (imageEl) {
      gsap.to(imageEl, {
        opacity: 0,
        scale: 0.95,
        duration: 0.25,
        ease: "power2.in",
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#F5F5F3] w-full px-5 md:px-12 py-16 md:py-[14vh]"
      style={{
        zIndex: 2,
      }}
    >
      {/* Service Rows */}
      {services.map((service, index) => (
        <div
          key={index}
          ref={(el) => {
            serviceRefs.current[index] = el;
          }}
          className="group"
          style={{ opacity: 0 }}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={() => handleMouseLeave(index)}
        >
          {/* Divider - not before first row */}
          {index > 0 && (
            <div
              className="w-full bg-[#493425]/15"
              style={{
                height: "1px",
                marginTop: "5vh",
                marginBottom: "5vh",
              }}
            />
          )}

          {/* Service Row - Image on left side, Text on right side */}
          <div
            className="flex flex-col md:flex-row relative cursor-pointer group"
            onClick={() => handleTap(index)}
          >
            {/* Left Side - Intro text for first row, Image for others */}
            <div className="w-full md:w-1/2 mb-4 md:mb-0">
              {index === 0 ? (
                /* First row: Intro text + Image */
                <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-[6vw]">
                  {/* Intro Text */}
                  <div className="shrink-0">
                    <h2
                      ref={titleRef}
                      className="text-sm font-semibold text-[#493425] leading-[140%]"
                      style={{ opacity: 0 }}
                    >
                      We know what you
                      <br />
                      prioritize
                    </h2>
                  </div>
                  <p
                    ref={descriptionRef}
                    className="text-sm font-medium text-[#8D7660] leading-[160%] max-w-full md:max-w-[165px]"
                    style={{ opacity: 0 }}
                  >
                    Our approach is built on trust, transparency, and long-term value —
                    ensuring every client feels confident at every stage of their real
                    estate journey
                  </p>
                  {/* Image Placeholder - shows on hover on desktop only */}
                  {!isMobile && (
                    <div
                      ref={(el) => {
                        if (!isMobile) imageRefs.current[index] = el;
                      }}
                      className="bg-[#E5E2DD] shrink-0 overflow-hidden relative w-[180px] h-[180px]"
                      style={{
                        opacity: 0,
                        transform: "scale(1)",
                      }}
                    >
                      <Image
                        src={service.image}
                        alt={service.heading}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
              ) : (
                /* Other rows: Just Image with staggered position on desktop only */
                !isMobile && (
                  <div className="block" style={{ paddingLeft: service.imageMarginLeft }}>
                    <div
                      ref={(el) => {
                        if (!isMobile) imageRefs.current[index] = el;
                      }}
                      className={`bg-[#E5E2DD] overflow-hidden relative ${
                        index === 2
                          ? "w-[260px] h-[160px]"
                          : "w-[180px] h-[180px]"
                      }`}
                      style={{
                        opacity: 0,
                        transform: "scale(1)",
                      }}
                    >
                      <Image
                        src={service.image}
                        alt={service.heading}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                )
              )}
            </div>

            {/* Right Side - Heading + Paragraph */}
            <div className="w-full md:w-1/2 md:pl-[8vw]">
              <div className="flex items-center justify-between">
                <h3
                  className="text-2xl md:text-4xl lg:text-5xl font-normal text-[#493425] tracking-tight leading-[110%] transition-colors duration-300 group-hover:text-[#8D7660]"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  {service.heading}
                </h3>
                {/* Arrow indicator - mobile only */}
                {isMobile && (
                  <div
                    className={`w-8 h-8 flex items-center justify-center transition-transform duration-300 ${
                      expandedIndex === index ? "rotate-180" : ""
                    }`}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4 6L8 10L12 6"
                        stroke="#493425"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}
              </div>
              <p
                className="text-xs md:text-sm font-medium text-[#8D7660] leading-[170%] mt-3 md:mt-6 transition-colors duration-300 group-hover:text-[#493425] max-w-full md:max-w-[380px]"
              >
                {service.paragraph}
              </p>

              {/* Image - shown below text on mobile when expanded */}
              {isMobile && (
                <div
                  ref={(el) => {
                    imageRefs.current[index] = el;
                  }}
                  className="overflow-hidden mt-4"
                  style={{
                    height: 0,
                  }}
                >
                  <div
                    className="bg-[#E5E2DD] relative w-full aspect-square"
                  >
                    <Image
                      src={service.image}
                      alt={service.heading}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* Bottom Divider */}
      <div
        className="w-full bg-[#493425]/15"
        style={{
          height: "1px",
          marginTop: "5vh",
        }}
      />
    </section>
  );
}

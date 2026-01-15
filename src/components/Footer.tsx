"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const lowerFooterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    const logo = logoRef.current;
    const lowerFooter = lowerFooterRef.current;

    if (!footer || !logo || !lowerFooter) return;

    const ctx = gsap.context(() => {
      // Set initial state - hidden below with larger offset for smooth reveal
      gsap.set(logo, { opacity: 0, y: 100 });

      // Animate logo smoothly from bottom to top on scroll
      // Stays visible once animated, only reverses when scrolling back up past start point
      gsap.to(logo, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: lowerFooter,
          start: "top 95%",
          end: "top 70%",
          toggleActions: "play none none reverse",
        },
      });
    }, footer);

    return () => ctx.revert();
  }, []);

  // Left column links
  const leftLinks = [
    { label: "Why trusted", href: "#our-services" },
    { label: "Our Investments", href: "#gallery-section" },
    { label: "Objects", href: "#objects-section" },
    { label: "Services", href: "#our-services" },
    { label: "Reviews", href: "#reviews-section" },
    { label: "FAQ", href: "#contact-section" },
  ];

  // Right column links (with arrows)
  const rightLinks = [
    { label: "TERMS OF SERVICE", href: "/terms" },
    { label: "PRIVACY POLICY", href: "/privacy-policy" },
    { label: "INSTAGRAM", href: "https://instagram.com", external: true },
    { label: "LINKEDIN", href: "https://linkedin.com", external: true },
    { label: "FACEBOOK", href: "https://facebook.com", external: true },
    { label: "YOUTUBE", href: "https://youtube.com", external: true },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const sectionId = href.replace("#", "");
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer ref={footerRef} className="relative w-full bg-[#241B14] text-white" style={{ zIndex: 2 }}>
      {/* Top Section - Contact Info in 4 columns */}
      <div className="px-5 md:px-12 pt-10 md:pt-[8vh] pb-8 md:pb-[6vh]">
        <div className="flex flex-wrap md:flex-nowrap justify-between gap-y-8">
          {/* Address */}
          <div className="w-1/2 md:w-auto md:flex-1 md:pl-[4vw]">
            <p className="text-xs font-semibold text-white/90 mb-2">
              Address
            </p>
            <p className="text-xs font-medium text-white/70 leading-[170%]">
              NM Group. Tower
              <br />
              4th Floor, NM Verge, 8/5,
              <br />
              Indore, Madhya Pradesh 452003
            </p>
          </div>

          {/* Phone */}
          <div className="w-1/2 md:w-auto md:flex-1 md:pl-[4vw]">
            <p className="text-xs font-semibold text-white/90 mb-2">
              Phone
            </p>
            <p className="text-xs font-medium text-white/70">
              +91 731 123 4567
            </p>
          </div>

          {/* Email */}
          <div className="w-1/2 md:w-auto md:flex-1 md:pl-[4vw]">
            <p className="text-xs font-semibold text-white/90 mb-2">
              Email
            </p>
            <a
              href="mailto:sales@thenmgroup.com"
              className="text-xs font-medium text-white/70 hover:text-white transition-colors block"
            >
              sales@thenmgroup.com
            </a>
          </div>

          {/* Working Hours */}
          <div className="w-1/2 md:w-auto md:flex-1 md:pl-[4vw]">
            <p className="text-xs font-semibold text-white/90 mb-2">
              Working hours
            </p>
            <p className="text-xs font-medium text-white/70 leading-[170%]">
              Mon - Fri: 09:00 - 18:00
              <br />
              Sat: 10:00 - 16:00
            </p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-5 md:mx-12 h-[1px] bg-white/20" />

      {/* Middle Section - Navigation Links */}
      <div className="px-5 md:px-12 py-8 md:py-[6vh]">
        <div className="flex justify-between gap-8">
          {/* Left Column - Page Links */}
          <nav className="flex flex-col gap-3">
            {leftLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm font-medium text-white/90 hover:text-white transition-colors cursor-pointer"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Column - Legal & Social Links */}
          <nav className="flex flex-col gap-3 items-end">
            {rightLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="text-sm font-medium text-white/90 hover:text-white transition-colors flex items-center gap-2"
              >
                {link.label}
                <span>↗</span>
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-5 md:mx-12 h-[1px] bg-white/20" />

      {/* Lower Footer - Brand Logo */}
      <div
        ref={lowerFooterRef}
        className="px-5 md:px-12 pt-8 md:pt-[4vh] pb-6 md:pb-[3vh] overflow-hidden"
      >
        <div
          ref={logoRef}
          className="text-white font-normal leading-none text-[3rem] md:text-[clamp(60px,12vw,160px)]"
          style={{
            letterSpacing: "-0.03em",
            opacity: 0,
          }}
        >
          NM Group
        </div>

        {/* Bottom Row - Language Selector */}
        <div className="flex justify-end items-center mt-6 md:mt-8">
          <div className="text-xs font-medium text-white/70">
            EN
          </div>
        </div>
      </div>
    </footer>
  );
}

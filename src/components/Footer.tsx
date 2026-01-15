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
      {/* Navigation Links - Two Column Grid */}
      <div className="px-5 md:px-12 py-10 md:py-[8vh]">
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

        {/* Address & Contact Info */}
        <div className="flex justify-between gap-8 mt-10 md:mt-16">
          {/* Address */}
          <div>
            <p
              className="text-xs font-semibold text-white/90 mb-2"
            >
              Address
            </p>
            <p className="text-xs font-medium text-white/70 leading-[170%]">
              NM Group. Tower
              <br />
              4th Floor, NM Verge, 8/5,
              <br />
              Indore, Madhya Pradesh 452003
            </p>
            <p
              className="text-xs font-semibold text-white/90 mt-4 mb-1"
            >
              Phone
            </p>
            <p className="text-xs font-medium text-white/70">
              +91 731 123 4567
            </p>
          </div>

          {/* Working Hours & Email */}
          <div className="text-right">
            <p
              className="text-xs font-semibold text-white/90 mb-2"
            >
              Working hours
            </p>
            <p className="text-xs font-medium text-white/70 leading-[170%]">
              Mon - Fri: 09:00 - 18:00
              <br />
              Sat: 10:00 - 16:00
            </p>
            <p
              className="text-xs font-semibold text-white/90 mt-4 mb-1"
            >
              Email
            </p>
            <a
              href="mailto:sales@thenmgroup.com"
              className="text-xs font-medium text-white/70 hover:text-white transition-colors"
            >
              sales@thenmgroup.com
            </a>
          </div>
        </div>
      </div>

      {/* Lower Footer - Brand Logo */}
      <div
        ref={lowerFooterRef}
        className="px-5 md:px-12 pt-12 pb-8 md:py-[4vh] overflow-hidden"
      >
        <div
          ref={logoRef}
          className="text-white font-normal leading-none text-[4.5rem] md:text-[clamp(80px,15vw,200px)] -ml-1"
          style={{
            letterSpacing: "-0.03em",
          }}
        >
          NM Group
        </div>
      </div>
    </footer>
  );
}

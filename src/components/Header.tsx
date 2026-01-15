"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const lastScrollY = useRef(0);
  const isHidden = useRef(false);

  // Mobile menu state
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuLinksRef = useRef<(HTMLAnchorElement | null)[]>([]);

  // Set mounted state for portal
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const header = headerRef.current;
    const logo = logoRef.current;
    const nav = navRef.current;
    const cta = ctaRef.current;

    if (!header || !logo || !nav || !cta) return;

    // Set initial states
    gsap.set(header, { opacity: 0, y: 0 });
    gsap.set(logo, { opacity: 0, y: -30 });
    gsap.set(nav, { opacity: 0 });
    gsap.set(cta, { opacity: 0, y: -20 });

    // Create timeline - starts after loader
    const tl = gsap.timeline({
      delay: 3.2,
    });

    // Header background fades in
    tl.to(header, {
      opacity: 1,
      duration: 0.8,
      ease: "power2.out",
    });

    // Logo drops down slowly
    tl.to(logo, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power3.out",
    }, "-=0.4");

    // Nav links fade in
    tl.to(nav, {
      opacity: 1,
      duration: 0.8,
      ease: "power2.out",
    }, "-=0.6");

    // CTA drops down
    tl.to(cta, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
    }, "-=0.4");

    return () => {
      tl.kill();
    };
  }, []);

  // Scroll hide/show logic - separate effect to access isMenuOpen
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const handleScroll = () => {
      // Don't hide header when menu is open
      if (isMenuOpen) return;

      const currentScrollY = window.scrollY;
      const scrollThreshold = 100;

      if (currentScrollY > scrollThreshold) {
        if (currentScrollY > lastScrollY.current && !isHidden.current) {
          // Scrolling down - hide header smoothly
          isHidden.current = true;
          gsap.to(header, {
            y: "-100%",
            duration: 0.8,
            ease: "power3.out",
          });
        } else if (currentScrollY < lastScrollY.current && isHidden.current) {
          // Scrolling up - show header smoothly
          isHidden.current = false;
          gsap.to(header, {
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          });
        }
      } else if (isHidden.current) {
        // At top of page - always show
        isHidden.current = false;
        gsap.to(header, {
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        });
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMenuOpen]);

  // Mobile menu animation
  useEffect(() => {
    const mobileMenu = mobileMenuRef.current;
    const menuLinks = menuLinksRef.current.filter(Boolean) as HTMLAnchorElement[];

    if (!mobileMenu) return;

    if (isMenuOpen) {
      // Open menu animation
      document.body.style.overflow = "hidden";
      gsap.set(mobileMenu, { display: "flex" });

      gsap.fromTo(mobileMenu,
        { clipPath: "circle(0% at calc(100% - 40px) 40px)" },
        {
          clipPath: "circle(150% at calc(100% - 40px) 40px)",
          duration: 0.8,
          ease: "power3.inOut"
        }
      );

      // Stagger animate menu links
      gsap.fromTo(menuLinks,
        { opacity: 0, y: 60, rotateX: -90 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.6,
          stagger: 0.1,
          delay: 0.3,
          ease: "power3.out"
        }
      );
    } else {
      // Close menu animation
      gsap.to(menuLinks, {
        opacity: 0,
        y: -30,
        duration: 0.3,
        stagger: 0.05,
        ease: "power2.in"
      });

      gsap.to(mobileMenu, {
        clipPath: "circle(0% at calc(100% - 40px) 40px)",
        duration: 0.6,
        delay: 0.2,
        ease: "power3.inOut",
        onComplete: () => {
          gsap.set(mobileMenu, { display: "none" });
          document.body.style.overflow = "";
        }
      });
    }
  }, [isMenuOpen]);

  const toggleMenu = () => {
    const header = headerRef.current;
    // If header is hidden, show it when opening menu
    if (!isMenuOpen && isHidden.current && header) {
      isHidden.current = false;
      gsap.to(header, {
        y: 0,
        duration: 0.4,
        ease: "power3.out",
      });
    }
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMobileNavClick = (sectionId: string) => {
    setIsMenuOpen(false);
    setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }, 600);
  };

  const mobileNavLinks = [
    { label: "Services", sectionId: "our-services" },
    { label: "Works", sectionId: "gallery-section" },
    { label: "Reviews", sectionId: "reviews-section" },
    { label: "Contact", sectionId: "contact-section" },
  ];

  return (
    <>
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 bg-[#F5F5F3] px-6 pt-10 pb-5 md:pt-6 md:pb-4 md:px-10 lg:px-12"
      style={{ opacity: 0 }}
    >
      <nav className="flex items-center">
        {/* Logo */}
        <Link
          ref={logoRef}
          href="/"
          className="group block"
          style={{ opacity: 0 }}
        >
          <Image
            src="/logo.jpg"
            alt="Livence"
            width={140}
            height={44}
            className="h-11 w-auto transition-transform duration-500 ease-out group-hover:scale-110"
          />
        </Link>

        {/* Center - Navigation */}
        <div
          ref={navRef}
          className="hidden md:flex items-center gap-8 lg:gap-10 text-sm font-medium tracking-wide ml-auto mr-24 lg:mr-40"
          style={{ opacity: 0 }}
        >
          <a
            href="#our-services"
            onClick={(e) => {
              e.preventDefault();
              const section = document.getElementById("our-services");
              if (section) {
                section.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="text-[#493425] hover:text-[#8D7660] transition-colors cursor-pointer"
          >
            SERVICES
          </a>
          <a
            href="#gallery-section"
            onClick={(e) => {
              e.preventDefault();
              const section = document.getElementById("gallery-section");
              if (section) {
                section.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="text-[#493425] hover:text-[#8D7660] transition-colors cursor-pointer"
          >
            WORKS
          </a>
          <a
            href="#reviews-section"
            onClick={(e) => {
              e.preventDefault();
              const section = document.getElementById("reviews-section");
              if (section) {
                section.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="text-[#493425] hover:text-[#8D7660] transition-colors cursor-pointer"
          >
            REVIEW
          </a>
        </div>

        {/* CTA Button */}
        <a
          ref={ctaRef}
          href="#contact-section"
          onClick={(e) => {
            e.preventDefault();
            const section = document.getElementById("contact-section");
            if (section) {
              section.scrollIntoView({ behavior: "smooth" });
            }
          }}
          className="hidden md:flex items-center gap-2 text-sm font-bold text-[#493425] hover:text-[#8D7660] transition-colors border-b border-[#493425] pb-0.5 cursor-pointer"
          style={{ opacity: 0 }}
        >
          CONTACT
          <span className="text-base">↗</span>
        </a>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className={`md:hidden ml-auto relative z-[70] w-8 h-8 flex flex-col items-end justify-center gap-1 transition-colors duration-300 ${
            isMenuOpen ? "text-white" : "text-[#493425]"
          }`}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          <span
            className={`block h-[1.5px] bg-current transition-all duration-300 origin-right ${
              isMenuOpen ? "w-6 rotate-45 translate-y-[7px]" : "w-3"
            }`}
          />
          <span
            className={`block h-[1.5px] bg-current transition-all duration-300 ${
              isMenuOpen ? "opacity-0 w-0" : "w-5"
            }`}
          />
          <span
            className={`block h-[1.5px] bg-current transition-all duration-300 origin-right ${
              isMenuOpen ? "w-6 -rotate-45 -translate-y-[7px]" : "w-6"
            }`}
          />
        </button>
      </nav>
    </header>

    {/* Full Screen Mobile Menu - rendered via portal to escape header transforms */}
    {isMounted && createPortal(
      <div
        ref={mobileMenuRef}
        className="fixed inset-0 bg-[#241B14] z-[60] flex-col items-center justify-center hidden md:hidden"
        style={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
      >
        {/* Close Button - Top Right */}
        <button
          onClick={toggleMenu}
          className="absolute top-10 right-6 w-8 h-8 flex items-center justify-center text-white z-10"
          aria-label="Close menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <nav className="flex flex-col items-center gap-8" style={{ perspective: "1000px" }}>
          {mobileNavLinks.map((link, index) => (
            <a
              key={link.sectionId}
              ref={(el) => {
                menuLinksRef.current[index] = el;
              }}
              href={`#${link.sectionId}`}
              onClick={(e) => {
                e.preventDefault();
                handleMobileNavClick(link.sectionId);
              }}
              className="text-4xl font-normal text-white hover:text-[#BBA793] transition-colors uppercase tracking-wide"
              style={{ opacity: 0, transformStyle: "preserve-3d" }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Bottom info - Location left, Email right - same baseline */}
        <div className="absolute bottom-12 left-0 right-0 px-6">
          <div className="flex justify-between items-center">
            <p className="text-xs text-white/60 uppercase tracking-widest">
              Indore, Madhya Pradesh, India
            </p>
            <p className="text-xs text-white/60 uppercase tracking-widest">
              sales@thenmgroup.com
            </p>
          </div>
        </div>
      </div>,
      document.body
    )}
    </>
  );
}

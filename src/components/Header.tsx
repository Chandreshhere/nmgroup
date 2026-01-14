"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
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

    // Scroll hide/show logic
    const handleScroll = () => {
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
      tl.kill();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 bg-[#F5F5F3] px-6 pt-10 pb-5 md:px-10 lg:px-12"
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
          <Link href="/objects" className="text-[#493425] hover:text-[#8D7660] transition-colors">
            OBJECTS
          </Link>
          <Link href="/faq" className="text-[#493425] hover:text-[#8D7660] transition-colors">
            FAQ
          </Link>
        </div>

        {/* CTA Button */}
        <Link
          ref={ctaRef}
          href="/selection"
          className="hidden md:flex items-center gap-2 text-sm font-bold text-[#493425] hover:text-[#8D7660] transition-colors border-b border-[#493425] pb-0.5"
          style={{ opacity: 0 }}
        >
          GET A SELECTION FOR ME
          <span className="text-base">↗</span>
        </Link>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-[#493425] ml-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      </nav>
    </header>
  );
}

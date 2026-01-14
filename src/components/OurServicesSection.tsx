"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    number: "01",
    title: ["FULL", "SERVICE", "CYCLE"],
    description1:
      "From finding the right property to finalizing the deal — we take care of every detail",
    description2:
      "Our team manages each step — selection, verification, paperwork, and handover — ensuring a seamless and confident buying experience",
    introTitle: "From request to keys — everything is under control.",
    introText:
      "You simply leave a request, and our team handles every stage with precision and care. From selecting the ideal property and verifying all legal details to managing negotiations and preparing full documentation — we ensure a seamless experience. We accompany you through every step until you receive the keys, guaranteeing comfort, transparency, and complete peace of mind",
    showIntro: true,
    image: "/i1.jpg",
    layout: "default", // text left, image right
  },
  {
    number: "02",
    title: ["LEGAL", "PROTECTION"],
    description1:
      "Complete legal protection at every stage. We conduct thorough due diligence on every property",
    description2:
      "Our legal experts verify ownership, check for encumbrances, and ensure all documentation is flawless before you sign",
    showIntro: false,
    image: "/i2.jpg",
    layout: "imageLeft", // image left, text right
  },
  {
    number: "03",
    title: ["INVESTMENT", "ADVISORY"],
    description1:
      "Strategic investment guidance backed by deep market analysis and local expertise",
    description2:
      "We help you identify high-yield opportunities, assess risks, and build a portfolio that aligns with your financial goals",
    showIntro: false,
    image: "/i3.jpg",
    layout: "imageCenter", // title left, image center, text right
  },
  {
    number: "04",
    title: ["PROPERTY", "MANAGEMENT"],
    description1:
      "Comprehensive property management services for hassle-free ownership",
    description2:
      "From tenant relations to maintenance coordination, we handle every aspect of your property so you can enjoy passive income",
    showIntro: false,
    image: "/i4.jpg",
    layout: "default", // text left, image right
  },
];

export default function OurServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLElement | null)[]>([]);
  const paragraphRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    const cards = cardsRef.current.filter(Boolean) as HTMLElement[];
    const paragraphs = paragraphRefs.current.filter(Boolean) as HTMLParagraphElement[];

    if (!container || cards.length === 0) return;

    const ctx = gsap.context(() => {
      // Pin each card
      // First card pins at top, 2nd at 25%, 3rd at 28%, 4th at 31%
      // All cards stay pinned until the 4th card reaches 31%, then they all unpin together
      const pinPositions = ["top", "25%", "28%", "31%"];
      const lastCard = cards[cards.length - 1];

      cards.forEach((card, index) => {
        const pinStart = index === 0 ? "top top" : `top ${pinPositions[index]}`;

        if (index === cards.length - 1) {
          // Last card (card 4) - pin at 31% with pinSpacing to create scroll distance
          ScrollTrigger.create({
            trigger: card,
            start: `top ${pinPositions[index]}`,
            end: "bottom bottom",
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
          });
        } else {
          // Cards 1, 2, 3 - all stay pinned until the last card finishes (bottom bottom)
          ScrollTrigger.create({
            trigger: card,
            start: pinStart,
            endTrigger: lastCard,
            end: "bottom bottom",
            pin: true,
            pinSpacing: false,
            anticipatePin: 1,
          });
        }
      });

      // First card - text fade in from left to right, then image reveals top-to-bottom
      // Animation starts when section is reached (top 40%)
      const firstCard = cards[0];
      if (firstCard) {
        const firstTextContent = firstCard.querySelector(".service-text-content");
        const firstImage = firstCard.querySelector(".service-image-wrapper");
        const firstIntroContent = firstCard.querySelector(".service-image-content");

        // Set initial states - text starts from left
        if (firstTextContent) {
          gsap.set(firstTextContent, { opacity: 0, x: -80 });
        }
        if (firstIntroContent) {
          gsap.set(firstIntroContent, { opacity: 0, x: -60 });
        }
        if (firstImage) {
          gsap.set(firstImage, { clipPath: "inset(0 0 100% 0)" });
        }

        // Text animation - fade in from left to right (faster)
        if (firstTextContent) {
          gsap.to(firstTextContent, {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: firstCard,
              start: "top 40%",
              end: "top 20%",
              toggleActions: "play none none none",
            },
          });
        }

        // Intro content (right side text) - fade in from left with slight delay
        if (firstIntroContent) {
          gsap.to(firstIntroContent, {
            opacity: 1,
            x: 0,
            duration: 0.6,
            delay: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: firstCard,
              start: "top 40%",
              end: "top 20%",
              toggleActions: "play none none none",
            },
          });
        }

        // Image reveal top-to-bottom - starts after text animation completes
        if (firstImage) {
          gsap.to(firstImage, {
            clipPath: "inset(0 0 0% 0)",
            duration: 0.7,
            delay: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: firstCard,
              start: "top 40%",
              end: "top 20%",
              toggleActions: "play none none none",
            },
          });
        }
      }

      // Animate content for cards 2, 3, 4 - text fade left to right + image bottom-to-top reveal
      cards.forEach((card, index) => {
        if (index === 0) return;

        const textContentAll = card.querySelectorAll(".service-text-content");
        const image = card.querySelector(".service-image-wrapper");

        // Set initial states - text starts from left
        textContentAll.forEach((el) => {
          gsap.set(el, { opacity: 0, x: -60 });
        });
        if (image) {
          gsap.set(image, { clipPath: "inset(100% 0 0 0)" });
        }

        // Text fade animation - left to right (faster)
        textContentAll.forEach((el, i) => {
          gsap.to(el, {
            opacity: 1,
            x: 0,
            duration: 0.6,
            delay: i * 0.05,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 60%",
              end: "top 30%",
              toggleActions: "play none none none",
            },
          });
        });

        // Image reveal bottom-to-top (faster)
        if (image) {
          gsap.to(image, {
            clipPath: "inset(0% 0 0 0)",
            duration: 0.7,
            delay: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 60%",
              end: "top 30%",
              toggleActions: "play none none none",
            },
          });
        }
      });

      // Line-by-line paragraph reveal for introText
      paragraphs.forEach((paragraph) => {
        if (!paragraph) return;

        // Split text into lines manually using spans
        const text = paragraph.textContent || "";
        const words = text.split(" ");
        const lines: string[] = [];
        let currentLine = "";

        // Create a temporary span to measure text width
        const tempSpan = document.createElement("span");
        tempSpan.style.visibility = "hidden";
        tempSpan.style.position = "absolute";
        tempSpan.style.whiteSpace = "nowrap";
        tempSpan.style.font = window.getComputedStyle(paragraph).font;
        document.body.appendChild(tempSpan);

        const maxWidth = paragraph.offsetWidth;

        words.forEach((word) => {
          const testLine = currentLine ? `${currentLine} ${word}` : word;
          tempSpan.textContent = testLine;

          if (tempSpan.offsetWidth > maxWidth && currentLine) {
            lines.push(currentLine);
            currentLine = word;
          } else {
            currentLine = testLine;
          }
        });

        if (currentLine) {
          lines.push(currentLine);
        }

        document.body.removeChild(tempSpan);

        // Replace paragraph content with line spans
        paragraph.innerHTML = lines
          .map((line) => `<span class="line-span" style="display: block; transform-style: preserve-3d;">${line}</span>`)
          .join("");

        const lineSpans = paragraph.querySelectorAll(".line-span");

        // Set initial state for lines
        gsap.set(lineSpans, {
          rotationX: -100,
          transformOrigin: "50% 50% -160px",
          opacity: 0,
        });

        // Animate lines on scroll
        gsap.to(lineSpans, {
          rotationX: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: paragraph,
            start: "top 70%",
            end: "top 40%",
            toggleActions: "play none none none",
          },
        });
      });
    }, container);

    return () => ctx.revert();
  }, []);

  // Render default layout (text left, image right)
  const renderDefaultLayout = (service: typeof services[0], index: number) => (
    <div
      className="grid h-full"
      style={{
        gridTemplateColumns: "1fr 1fr",
        columnGap: "4vw",
      }}
    >
      {/* Left Column - Text Content */}
      <div className="service-text-content">
        {/* Our Services Title - only on first service */}
        {index === 0 && (
          <h2 className="text-sm font-semibold text-[#493425] leading-[140%]">
            Our Services
          </h2>
        )}

        {/* Service Item - positioned lower */}
        <div
          className="flex items-start"
          style={{ marginTop: "35vh", gap: "4vw" }}
        >
          {/* Number with parentheses */}
          <div
            className="text-3xl md:text-4xl font-light text-[#493425] shrink-0"
            style={{ letterSpacing: "-0.02em" }}
          >
            <span className="text-[#493425]/40">(</span>
            <span className="mx-1">{service.number}</span>
            <span className="text-[#493425]/40">)</span>
          </div>

          {/* Service Title */}
          <h3
            className="text-sm font-bold text-[#493425] uppercase leading-[160%] shrink-0"
            style={{ letterSpacing: "0.05em" }}
          >
            {service.title.map((line, i) => (
              <span key={i}>
                {line}
                {i < service.title.length - 1 && <br />}
              </span>
            ))}
          </h3>

          {/* Descriptions - stacked vertically */}
          <div
            className="flex flex-col"
            style={{ gap: "24px", maxWidth: "200px" }}
          >
            <p className="text-sm font-medium text-[#8D7660] leading-[170%]">
              {service.description1}
            </p>
            <p className="text-sm font-medium text-[#8D7660] leading-[170%]">
              {service.description2}
            </p>
          </div>
        </div>
      </div>

      {/* Right Column - Image Content */}
      <div className="service-image-content flex flex-col items-end" style={{ perspective: "1000px" }}>
        {/* Intro Text - only on first service */}
        {service.showIntro && (
          <div style={{ width: "85%" }}>
            <p className="text-sm font-semibold text-[#493425] leading-[170%]">
              {service.introTitle}
            </p>
            <p
              ref={(el) => {
                if (service.showIntro) {
                  paragraphRefs.current[index] = el;
                }
              }}
              className="text-sm font-medium text-[#8D7660] leading-[170%] mt-2"
            >
              {service.introText}
            </p>

            {/* Order a Call CTA */}
            <a
              href="#"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#493425] uppercase tracking-wide border-b border-[#493425] pb-0.5 hover:text-[#8D7660] hover:border-[#8D7660] transition-colors mt-6"
            >
              ORDER A CALL
              <span className="text-base">↗</span>
            </a>
          </div>
        )}

        {/* Large Image - aligned to right edge */}
        <div
          className="service-image-wrapper relative overflow-hidden"
          style={{
            width: service.showIntro ? "85%" : "100%",
            height: service.showIntro ? "auto" : "100vh",
            aspectRatio: service.showIntro ? "4/4" : undefined,
            marginTop: service.showIntro ? "4vh" : "0",
          }}
        >
          <Image
            src={service.image}
            alt={service.title.join(" ")}
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );

  // Render imageLeft layout (image left, text right)
  const renderImageLeftLayout = (service: typeof services[0]) => (
    <div
      className="grid h-full"
      style={{
        gridTemplateColumns: "1fr 1fr",
        columnGap: "4vw",
      }}
    >
      {/* Left Column - Image */}
      <div className="service-image-content flex flex-col items-start">
        <div
          className="service-image-wrapper relative overflow-hidden"
          style={{
            width: "100%",
            height: "100vh",
          }}
        >
          <Image
            src={service.image}
            alt={service.title.join(" ")}
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Right Column - Text Content */}
      <div className="service-text-content">
        <div
          className="flex items-start"
          style={{ marginTop: "35vh", gap: "4vw" }}
        >
          {/* Number with parentheses */}
          <div
            className="text-3xl md:text-4xl font-light text-[#493425] shrink-0"
            style={{ letterSpacing: "-0.02em" }}
          >
            <span className="text-[#493425]/40">(</span>
            <span className="mx-1">{service.number}</span>
            <span className="text-[#493425]/40">)</span>
          </div>

          {/* Service Title */}
          <h3
            className="text-sm font-bold text-[#493425] uppercase leading-[160%] shrink-0"
            style={{ letterSpacing: "0.05em" }}
          >
            {service.title.map((line, i) => (
              <span key={i}>
                {line}
                {i < service.title.length - 1 && <br />}
              </span>
            ))}
          </h3>

          {/* Descriptions - stacked vertically */}
          <div
            className="flex flex-col"
            style={{ gap: "24px", maxWidth: "200px" }}
          >
            <p className="text-sm font-medium text-[#8D7660] leading-[170%]">
              {service.description1}
            </p>
            <p className="text-sm font-medium text-[#8D7660] leading-[170%]">
              {service.description2}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  // Render imageCenter layout (title left, image center, text right)
  const renderImageCenterLayout = (service: typeof services[0]) => (
    <div
      className="grid h-full"
      style={{
        gridTemplateColumns: "0.8fr 1.4fr 0.8fr",
        columnGap: "3vw",
      }}
    >
      {/* Left Column - Title */}
      <div className="service-text-content flex flex-col">
        <div style={{ marginTop: "35vh" }}>
          {/* Number with parentheses */}
          <div
            className="text-3xl md:text-4xl font-light text-[#493425] mb-6"
            style={{ letterSpacing: "-0.02em" }}
          >
            <span className="text-[#493425]/40">(</span>
            <span className="mx-1">{service.number}</span>
            <span className="text-[#493425]/40">)</span>
          </div>

          {/* Service Title */}
          <h3
            className="text-sm font-bold text-[#493425] uppercase leading-[160%]"
            style={{ letterSpacing: "0.05em" }}
          >
            {service.title.map((line, i) => (
              <span key={i}>
                {line}
                {i < service.title.length - 1 && <br />}
              </span>
            ))}
          </h3>
        </div>
      </div>

      {/* Center Column - Image */}
      <div className="service-image-content flex flex-col items-center">
        <div
          className="service-image-wrapper relative overflow-hidden"
          style={{
            width: "100%",
            height: "100vh",
          }}
        >
          <Image
            src={service.image}
            alt={service.title.join(" ")}
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Right Column - Descriptions */}
      <div className="service-text-content flex flex-col">
        <div
          className="flex flex-col"
          style={{ marginTop: "35vh", gap: "24px", maxWidth: "220px" }}
        >
          <p className="text-sm font-medium text-[#8D7660] leading-[170%]">
            {service.description1}
          </p>
          <p className="text-sm font-medium text-[#8D7660] leading-[170%]">
            {service.description2}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div id="our-services" ref={containerRef} className="services-stack-container relative" style={{ zIndex: 2 }}>
      {services.map((service, index) => (
        <section
          key={index}
          ref={(el) => {
            cardsRef.current[index] = el;
          }}
          className="service-card"
          style={{
            zIndex: index + 1,
            boxShadow: index > 0 ? "0 -20px 60px rgba(0, 0, 0, 0.15)" : "none",
          }}
        >
          {service.layout === "imageLeft" && renderImageLeftLayout(service)}
          {service.layout === "imageCenter" && renderImageCenterLayout(service)}
          {(service.layout === "default" || !service.layout) && renderDefaultLayout(service, index)}
        </section>
      ))}
    </div>
  );
}

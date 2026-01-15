"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    number: "01",
    title: ["A LEGACY", "ROOTED IN", "EXPERIENCE"],
    description1:
      "Celebrating Years of Mastery",
    description2:
      "With a legacy built over years of excellence, NM Group stands as a distinguished name in luxury real estate",
    introTitle: "Our journey is defined by an unwavering commitment to quality, precision, and architectural integrity — crafting spaces that go beyond function to become enduring landmarks.",
    introText:
      "Rooted in experience and guided by vision, we have refined our expertise across every aspect of development. Each project reflects thoughtful planning, superior craftsmanship, and a deep understanding of modern living, creating homes that resonate with sophistication and lasting value. As we continue to evolve, our dedication to timeless design, meticulous execution, and uncompromising standards remains at the core of everything we build — ensuring our legacy endures, generation after generation.",
    showIntro: true,
    image: "/building.jpg",
    layout: "default", // text left, image right
  },
  {
    number: "02",
    title: ["CRAFTING", "SPACES BEYOND", "THE ORDINARY"],
    description1:
      "Every detail is an expression of artistry",
    description2:
      "At NM Group, design is more than aesthetics — it's a philosophy. We believe that true luxury lies in the harmony of form, function, and feeling. Our developments are crafted by visionary architects and designers who blend contemporary innovation with timeless elegance, creating environments that inspire and elevate everyday living.",
    showIntro: false,
    image: "/i2.jpg",
    layout: "imageLeft", // image left, text right
  },
  {
    number: "03",
    title: ["EXCELLENCE", "SHAPED BY", "VISION"],
    description1:
      "Excellence Shaped by Vision & Integrity",
    description2:
      "Behind NM Group's success is a leadership team driven by purpose and guided by principles. Our founders and directors bring decades of combined expertise, steering every project with a hands-on approach and an unwavering focus on quality. With a clear vision for the future and deep respect for our roots, we continue to set new standards in luxury development.",
    showIntro: false,
    image: "/i3.jpg",
    layout: "imageCenter", // title left, image center, text right
  },
  {
    number: "04",
    title: ["BUILDING FOR", "GENERATIONS", "TO COME"],
    description1:
      "Shaping tomorrow, one landmark at a time",
    description2:
      "As NM Group looks ahead, our mission remains clear — to build not just spaces, but lasting legacies. With ambitious new projects on the horizon, we are committed to expanding our footprint while staying true to the values that define us: integrity, innovation, and an uncompromising pursuit of excellence.",
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
      className="flex flex-col md:grid h-full"
      style={{
        gridTemplateColumns: "1fr 1fr",
        columnGap: "4vw",
      }}
    >
      {/* Left Column - Text Content */}
      <div className={`service-text-content ${index !== 0 ? "md:flex md:items-start md:h-full" : ""}`}>
        {/* Our Services Title - only on first service */}
        {index === 0 && (
          <h2 className="text-sm font-semibold text-[#493425] leading-[140%]">
            Our Services
          </h2>
        )}

        {/* Service Item - positioned lower for first, higher for others */}
        <div
          className={`flex flex-col md:flex-row md:items-start mt-6 gap-4 md:gap-[4vw] ${index !== 0 ? "md:mt-[20vh]" : "md:mt-0"}`}
        >
          {/* Number with parentheses - hide for first service */}
          {index !== 0 && (
            <div
              className="text-2xl md:text-4xl font-light text-[#493425] shrink-0"
              style={{ letterSpacing: "-0.02em" }}
            >
              <span className="text-[#493425]/40">(</span>
              <span className="mx-1">{service.number}</span>
              <span className="text-[#493425]/40">)</span>
            </div>
          )}

          {/* Service Title */}
          <h3
            className="text-xs md:text-sm font-bold text-[#493425] uppercase leading-[160%] shrink-0"
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
            className="flex flex-col gap-4 md:gap-6 max-w-full md:max-w-[200px]"
          >
            <p className="text-xs md:text-sm font-medium text-[#8D7660] leading-[170%]">
              {service.description1}
            </p>
            <p className="text-xs md:text-sm font-medium text-[#8D7660] leading-[170%]">
              {service.description2}
            </p>
          </div>
        </div>
      </div>

      {/* Right Column - Image Content */}
      <div className="service-image-content flex flex-col items-end mt-6 md:mt-0" style={{ perspective: "1000px" }}>
        {/* Intro Text - only on first service */}
        {service.showIntro && (
          <div className="w-full md:w-[85%]">
            <p className="text-xs md:text-sm font-semibold text-[#493425] leading-[170%]">
              {service.introTitle}
            </p>
            <p
              ref={(el) => {
                if (service.showIntro) {
                  paragraphRefs.current[index] = el;
                }
              }}
              className="text-xs md:text-sm font-medium text-[#8D7660] leading-[170%] mt-2"
            >
              {service.introText}
            </p>
          </div>
        )}

        {/* Large Image - aligned to right edge */}
        <div
          className={`service-image-wrapper relative overflow-hidden mt-4 md:mt-0 ${
            service.showIntro
              ? "w-full md:w-[85%] aspect-square"
              : "w-full aspect-[3/4] md:aspect-auto md:h-screen"
          }`}
          style={{
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
      className="flex flex-col-reverse md:grid h-full"
      style={{
        gridTemplateColumns: "1fr 1fr",
        columnGap: "4vw",
      }}
    >
      {/* Left Column - Image */}
      <div className="service-image-content flex flex-col items-start mt-6 md:mt-0">
        <div
          className="service-image-wrapper relative overflow-hidden w-full aspect-[4/3] md:aspect-auto md:h-screen"
        >
          <Image
            src={service.image}
            alt={service.title.join(" ")}
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Right Column - Text Content - Positioned Higher */}
      <div className="service-text-content md:flex md:items-start md:h-full">
        <div
          className="flex flex-col md:flex-row md:items-start gap-4 md:gap-[4vw] mt-0 md:mt-[20vh]"
        >
          {/* Number with parentheses */}
          <div
            className="text-2xl md:text-4xl font-light text-[#493425] shrink-0"
            style={{ letterSpacing: "-0.02em" }}
          >
            <span className="text-[#493425]/40">(</span>
            <span className="mx-1">{service.number}</span>
            <span className="text-[#493425]/40">)</span>
          </div>

          {/* Service Title */}
          <h3
            className="text-xs md:text-sm font-bold text-[#493425] uppercase leading-[160%] shrink-0"
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
            className="flex flex-col gap-4 md:gap-6 max-w-full md:max-w-[200px]"
          >
            <p className="text-xs md:text-sm font-medium text-[#8D7660] leading-[170%]">
              {service.description1}
            </p>
            <p className="text-xs md:text-sm font-medium text-[#8D7660] leading-[170%]">
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
      className="flex flex-col md:grid h-full"
      style={{
        gridTemplateColumns: "0.8fr 1.4fr 0.8fr",
        columnGap: "3vw",
      }}
    >
      {/* Left Column - Title - Positioned Higher */}
      <div className="service-text-content flex flex-col md:h-full">
        <div className="mt-0 md:mt-[20vh]">
          {/* Number with parentheses */}
          <div
            className="text-2xl md:text-4xl font-light text-[#493425] mb-4 md:mb-6"
            style={{ letterSpacing: "-0.02em" }}
          >
            <span className="text-[#493425]/40">(</span>
            <span className="mx-1">{service.number}</span>
            <span className="text-[#493425]/40">)</span>
          </div>

          {/* Service Title */}
          <h3
            className="text-xs md:text-sm font-bold text-[#493425] uppercase leading-[160%]"
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
      <div className="service-image-content flex flex-col items-center mt-6 md:mt-0 order-last md:order-none">
        <div
          className="service-image-wrapper relative overflow-hidden w-full aspect-[4/3] md:aspect-auto md:h-screen"
        >
          <Image
            src={service.image}
            alt={service.title.join(" ")}
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Right Column - Descriptions - Positioned Higher */}
      <div className="service-text-content flex flex-col md:h-full mt-4 md:mt-0">
        <div
          className="flex flex-col gap-4 md:gap-6 max-w-full md:max-w-[220px] md:mt-[20vh]"
        >
          <p className="text-xs md:text-sm font-medium text-[#8D7660] leading-[170%]">
            {service.description1}
          </p>
          <p className="text-xs md:text-sm font-medium text-[#8D7660] leading-[170%]">
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

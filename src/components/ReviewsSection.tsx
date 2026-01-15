"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const reviews = [
  {
    type: "ENTREPRENEUR",
    from: "SINGAPORE",
    location: "Dubai, UAE",
    year: "2025",
    roi: "11.7%",
    format: "remote",
    paragraph1:
      "I was looking for an apartment that would generate stable passive income without taking much of my time. The team helped me choose a property near Dubai Marina that perfectly fit my investment goals. Within six months, I rented it out with an impressive 11.7% annual yield.",
    paragraph2:
      "Everything — from selection and legal checks to signing and management — was handled remotely with exceptional professionalism. I always felt supported and informed. The process was transparent, smooth, and stress-free. Now I receive steady rental income and complete peace of mind knowing my investment is in reliable hands.",
    images: ["/rev1.jpg", "/rev2.jpg"],
  },
  {
    type: "INVESTOR",
    from: "GERMANY",
    location: "Dubai, UAE",
    year: "2024",
    roi: "9.8%",
    format: "hybrid",
    paragraph1:
      "As a first-time investor in Dubai real estate, I needed guidance I could trust. The team provided detailed market analysis and helped me identify a high-yield property in Business Bay that matched my budget and expectations perfectly.",
    paragraph2:
      "The entire process was handled with remarkable efficiency. From document preparation to final handover, every step was transparent and well-communicated. I now own a profitable asset that generates consistent returns, and I couldn't be happier with the decision.",
    images: ["/rev2.jpg", "/rev2.jpg"],
  },
];

export default function ReviewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const image1Ref = useRef<HTMLDivElement>(null);
  const image1InnerRef = useRef<HTMLDivElement>(null);
  const image2Ref = useRef<HTMLDivElement>(null);
  const image2InnerRef = useRef<HTMLDivElement>(null);

  // Text refs for animations
  const sectionLabelRef = useRef<HTMLParagraphElement>(null);
  const metadataRowRef = useRef<HTMLDivElement>(null);
  const arrowsRef = useRef<HTMLDivElement>(null);
  const factsGridRef = useRef<HTMLDivElement>(null);
  const testimonialRef = useRef<HTMLDivElement>(null);

  const currentReview = reviews[currentIndex];

  useEffect(() => {
    const section = sectionRef.current;
    const image1 = image1Ref.current;
    const image1Inner = image1InnerRef.current;
    const image2 = image2Ref.current;
    const image2Inner = image2InnerRef.current;
    const sectionLabel = sectionLabelRef.current;
    const metadataRow = metadataRowRef.current;
    const arrows = arrowsRef.current;
    const factsGrid = factsGridRef.current;
    const testimonial = testimonialRef.current;

    if (!section || !image1 || !image1Inner || !image2 || !image2Inner) return;

    const ctx = gsap.context(() => {
      // Set initial states for text elements - fade up
      gsap.set(sectionLabel, { opacity: 0, y: 30 });
      gsap.set(metadataRow, { opacity: 0, y: 30 });
      gsap.set(arrows, { opacity: 0, y: 30 });
      gsap.set(factsGrid, { opacity: 0, y: 30 });
      gsap.set(testimonial, { opacity: 0, y: 30 });

      // Set initial states - reveal from top right corner with zoom
      // clipPath inset(top right bottom left) - start with only top-right corner visible
      gsap.set(image1, { clipPath: "inset(0% 0% 100% 100%)" });
      gsap.set(image1Inner, { scale: 1.3 });
      gsap.set(image2, { clipPath: "inset(0% 0% 100% 100%)" });
      gsap.set(image2Inner, { scale: 1.3 });

      // Section label - first to animate
      gsap.to(sectionLabel, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "top 50%",
          toggleActions: "play none none none",
        },
      });

      // Metadata row (ENTREPRENEUR FROM SINGAPORE) - with delay
      gsap.to(metadataRow, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "top 50%",
          toggleActions: "play none none none",
        },
      });

      // Navigation arrows
      gsap.to(arrows, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "top 50%",
          toggleActions: "play none none none",
        },
      });

      // Facts grid (LOCATION, YEAR, ROI, FORMAT)
      gsap.to(factsGrid, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "top 50%",
          toggleActions: "play none none none",
        },
      });

      // Testimonial paragraphs - slower reveal
      gsap.to(testimonial, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "top 50%",
          toggleActions: "play none none none",
        },
      });

      // Image 1 reveal from top right corner - expands to full image
      gsap.to(image1, {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: image1,
          start: "top 90%",
          end: "top 50%",
          toggleActions: "play none none none",
        },
      });

      // Image 1 zoom out
      gsap.to(image1Inner, {
        scale: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: image1,
          start: "top 90%",
          end: "top 50%",
          toggleActions: "play none none none",
        },
      });

      // Image 2 reveal from top right corner - 1 second delay after image 1
      gsap.to(image2, {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 0.8,
        delay: 0.4,
        ease: "power2.out",
        scrollTrigger: {
          trigger: image1,
          start: "top 90%",
          end: "top 50%",
          toggleActions: "play none none none",
        },
      });

      // Image 2 zoom out - 1 second delay
      gsap.to(image2Inner, {
        scale: 1,
        duration: 1,
        delay: 0.4,
        ease: "power2.out",
        scrollTrigger: {
          trigger: image1,
          start: "top 90%",
          end: "top 50%",
          toggleActions: "play none none none",
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const handlePrev = () => {
    if (currentIndex === 0 || isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => prev - 1);
      setIsTransitioning(false);
    }, 300);
  };

  const handleNext = () => {
    if (currentIndex === reviews.length - 1 || isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
      setIsTransitioning(false);
    }, 300);
  };

  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < reviews.length - 1;

  return (
    <section
      id="reviews-section"
      ref={sectionRef}
      className="relative w-full bg-[#F5F5F3] px-5 md:px-12 py-16 md:py-[20vh]"
      style={{
        zIndex: 2,
      }}
    >
      {/* Mobile: Section Label with Navigation Arrows */}
      <div className="flex md:hidden items-start justify-between mb-8">
        <p ref={sectionLabelRef} className="text-sm font-semibold text-[#493425] leading-[140%]" style={{ opacity: 0 }}>Reviews</p>

        {/* Mobile Navigation Arrows - Top Right */}
        <div ref={arrowsRef} className="flex items-center gap-0" style={{ opacity: 0 }}>
          <button
            onClick={handlePrev}
            disabled={!canGoPrev}
            className={`w-14 h-14 flex items-center justify-center transition-opacity duration-200 ${
              canGoPrev ? "opacity-100" : "opacity-30"
            }`}
            aria-label="Previous review"
          >
            <svg
              width="50"
              height="50"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M35 20C25 20 18 30 18 50C18 70 25 80 35 80"
                stroke={canGoPrev ? "#493425" : "#BBA793"}
                strokeWidth="3"
                fill="none"
              />
              <path
                d="M55 35L40 50L55 65"
                stroke={canGoPrev ? "#493425" : "#BBA793"}
                strokeWidth="3"
                fill="none"
              />
              <path
                d="M65 20C75 20 82 30 82 50C82 70 75 80 65 80"
                stroke={canGoPrev ? "#493425" : "#BBA793"}
                strokeWidth="3"
                fill="none"
              />
            </svg>
          </button>
          <button
            onClick={handleNext}
            disabled={!canGoNext}
            className={`w-14 h-14 flex items-center justify-center transition-opacity duration-200 ${
              canGoNext ? "opacity-100" : "opacity-30"
            }`}
            aria-label="Next review"
          >
            <svg
              width="50"
              height="50"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M35 20C25 20 18 30 18 50C18 70 25 80 35 80"
                stroke={canGoNext ? "#493425" : "#BBA793"}
                strokeWidth="3"
                fill="none"
              />
              <path
                d="M45 35L60 50L45 65"
                stroke={canGoNext ? "#493425" : "#BBA793"}
                strokeWidth="3"
                fill="none"
              />
              <path
                d="M65 20C75 20 82 30 82 50C82 70 75 80 65 80"
                stroke={canGoNext ? "#493425" : "#BBA793"}
                strokeWidth="3"
                fill="none"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Desktop: Section Label */}
      <p className="hidden md:block text-sm font-semibold text-[#493425] leading-[140%] mb-[12vh]">Reviews</p>

      {/* Mobile: Metadata Row as Header (ENTREPRENEUR / FROM / SINGAPORE) */}
      <div ref={metadataRowRef} className="md:hidden grid grid-cols-3 gap-2 mb-6" style={{ opacity: 0 }}>
        <span
          className="text-xs font-semibold text-[#493425] uppercase"
          style={{ letterSpacing: "0.05em" }}
        >
          {currentReview.type}
        </span>
        <span
          className="text-xs font-medium text-[#8D7660] uppercase"
          style={{ letterSpacing: "0.05em" }}
        >
          FROM
        </span>
        <span
          className="text-xs font-semibold text-[#493425] uppercase"
          style={{ letterSpacing: "0.05em" }}
        >
          {currentReview.from}
        </span>
      </div>

      {/* Mobile: Facts Grid - 2 rows layout like reference */}
      <div
        ref={factsGridRef}
        className="md:hidden grid grid-cols-4 gap-x-4 gap-y-4 mb-8"
        style={{ opacity: 0 }}
      >
        {/* Row 1: LOCATION, ROI, YEAR, FORMAT labels */}
        <div>
          <p
            className="text-[10px] font-semibold text-[#493425] uppercase mb-1"
            style={{ letterSpacing: "0.05em" }}
          >
            LOCATION
          </p>
          <p className="text-xs font-medium text-[#8D7660]">
            {currentReview.location}
          </p>
        </div>
        <div>
          <p
            className="text-[10px] font-semibold text-[#493425] uppercase mb-1"
            style={{ letterSpacing: "0.05em" }}
          >
            ROI
          </p>
          <p className="text-xs font-medium text-[#8D7660]">
            {currentReview.roi}
          </p>
        </div>
        <div>
          <p
            className="text-[10px] font-semibold text-[#493425] uppercase mb-1"
            style={{ letterSpacing: "0.05em" }}
          >
            YEAR
          </p>
          <p className="text-xs font-medium text-[#8D7660]">
            {currentReview.year}
          </p>
        </div>
        <div>
          <p
            className="text-[10px] font-semibold text-[#493425] uppercase mb-1"
            style={{ letterSpacing: "0.05em" }}
          >
            FORMAT
          </p>
          <p className="text-xs font-medium text-[#8D7660]">
            {currentReview.format}
          </p>
        </div>
      </div>

      {/* Mobile: Testimonial Text */}
      <div
        ref={testimonialRef}
        className={`md:hidden transition-opacity duration-300 ${
          isTransitioning ? "opacity-0" : "opacity-100"
        }`}
        style={{ opacity: 0 }}
      >
        <p
          className="text-sm font-medium text-[#8D7660] italic"
          style={{ lineHeight: "1.7" }}
        >
          {currentReview.paragraph1}
        </p>
        <p
          className="text-sm font-medium text-[#8D7660] italic mt-4"
          style={{ lineHeight: "1.7" }}
        >
          {currentReview.paragraph2}
        </p>
      </div>

      {/* Mobile: Image Gallery */}
      <div
        className={`md:hidden grid grid-cols-2 gap-3 mt-8 transition-opacity duration-300 ${
          isTransitioning ? "opacity-0" : "opacity-100"
        }`}
      >
        <div
          ref={image1Ref}
          className="relative bg-[#E5E2DD] overflow-hidden aspect-[4/5]"
        >
          <div ref={image1InnerRef} className="relative w-full h-full">
            <Image
              src={currentReview.images[0]}
              alt="Property interior"
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div
          ref={image2Ref}
          className="relative bg-[#E5E2DD] overflow-hidden aspect-[4/5]"
        >
          <div ref={image2InnerRef} className="relative w-full h-full">
            <Image
              src={currentReview.images[1]}
              alt="Property interior"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div
        className="hidden md:grid gap-0"
        style={{
          gridTemplateColumns: "1fr 1fr",
          columnGap: "4vw",
        }}
      >
        {/* Left Column */}
        <div>
          {/* Metadata Row */}
          <div className="flex flex-wrap items-baseline gap-[4vw]">
            <span
              className="text-sm font-semibold text-[#493425] uppercase"
              style={{ letterSpacing: "0.05em" }}
            >
              {currentReview.type}
            </span>
            <span
              className="text-sm font-medium text-[#8D7660] uppercase"
              style={{ letterSpacing: "0.05em" }}
            >
              FROM
            </span>
            <span
              className="text-sm font-semibold text-[#493425] uppercase"
              style={{ letterSpacing: "0.05em" }}
            >
              {currentReview.from}
            </span>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center mt-24 gap-[2vw]">
            <button
              onClick={handlePrev}
              disabled={!canGoPrev}
              className={`transition-opacity duration-200 ${
                canGoPrev
                  ? "opacity-100 hover:opacity-70 cursor-pointer"
                  : "opacity-30 cursor-default"
              }`}
              aria-label="Previous review"
            >
              <svg
                width="140"
                height="140"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M35 20C25 20 18 30 18 50C18 70 25 80 35 80"
                  stroke={canGoPrev ? "#493425" : "#BBA793"}
                  strokeWidth="3"
                  fill="none"
                />
                <path
                  d="M55 35L40 50L55 65"
                  stroke={canGoPrev ? "#493425" : "#BBA793"}
                  strokeWidth="3"
                  fill="none"
                />
                <path
                  d="M65 20C75 20 82 30 82 50C82 70 75 80 65 80"
                  stroke={canGoPrev ? "#493425" : "#BBA793"}
                  strokeWidth="3"
                  fill="none"
                />
              </svg>
            </button>
            <button
              onClick={handleNext}
              disabled={!canGoNext}
              className={`transition-opacity duration-200 ${
                canGoNext
                  ? "opacity-100 hover:opacity-70 cursor-pointer"
                  : "opacity-30 cursor-default"
              }`}
              aria-label="Next review"
            >
              <svg
                width="140"
                height="140"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M35 20C25 20 18 30 18 50C18 70 25 80 35 80"
                  stroke={canGoNext ? "#493425" : "#BBA793"}
                  strokeWidth="3"
                  fill="none"
                />
                <path
                  d="M45 35L60 50L45 65"
                  stroke={canGoNext ? "#493425" : "#BBA793"}
                  strokeWidth="3"
                  fill="none"
                />
                <path
                  d="M65 20C75 20 82 30 82 50C82 70 75 80 65 80"
                  stroke={canGoNext ? "#493425" : "#BBA793"}
                  strokeWidth="3"
                  fill="none"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Right Column */}
        <div>
          {/* Facts Grid */}
          <div className="grid grid-cols-4 gap-[3vw]">
            <div>
              <p
                className="text-xs font-medium text-[#8D7660] uppercase mb-2"
                style={{ letterSpacing: "0.05em" }}
              >
                LOCATION
              </p>
              <p className="text-sm font-medium text-[#493425]">
                {currentReview.location}
              </p>
            </div>
            <div>
              <p
                className="text-xs font-medium text-[#8D7660] uppercase mb-2"
                style={{ letterSpacing: "0.05em" }}
              >
                YEAR
              </p>
              <p className="text-sm font-medium text-[#493425]">
                {currentReview.year}
              </p>
            </div>
            <div>
              <p
                className="text-xs font-medium text-[#8D7660] uppercase mb-2"
                style={{ letterSpacing: "0.05em" }}
              >
                ROI
              </p>
              <p className="text-sm font-medium text-[#493425]">
                {currentReview.roi}
              </p>
            </div>
            <div>
              <p
                className="text-xs font-medium text-[#8D7660] uppercase mb-2"
                style={{ letterSpacing: "0.05em" }}
              >
                FORMAT
              </p>
              <p className="text-sm font-medium text-[#493425]">
                {currentReview.format}
              </p>
            </div>
          </div>

          {/* Testimonial Text */}
          <div
            className={`mt-16 transition-opacity duration-300 ${
              isTransitioning ? "opacity-0" : "opacity-100"
            }`}
            style={{ maxWidth: "520px" }}
          >
            <p
              className="text-sm font-medium text-[#8D7660]"
              style={{ lineHeight: "1.7" }}
            >
              {currentReview.paragraph1}
            </p>
            <p
              className="text-sm font-medium text-[#8D7660] mt-6"
              style={{ lineHeight: "1.7" }}
            >
              {currentReview.paragraph2}
            </p>
          </div>
        </div>
      </div>

      {/* Desktop: Image Gallery */}
      <div
        className={`hidden md:grid mt-16 transition-opacity duration-300 gap-[1vw] ${
          isTransitioning ? "opacity-0" : "opacity-100"
        }`}
        style={{
          gridTemplateColumns: "1.4fr 1fr",
        }}
      >
        <div className="relative bg-[#E5E2DD] overflow-hidden aspect-[16/9]">
          <div className="relative w-full h-full">
            <Image
              src={currentReview.images[0]}
              alt="Property interior"
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div className="relative bg-[#E5E2DD] overflow-hidden h-full">
          <div className="relative w-full h-full">
            <Image
              src={currentReview.images[1]}
              alt="Property interior"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

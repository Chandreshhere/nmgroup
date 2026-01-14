"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const galleryData = [
  {
    image: "/mp.jpg",
    title: "NM\nPride",
    details: [
      { label: "PROJECT", value: "NM Pride" },
      { label: "STATUS", value: "Under Construction" },
      { label: "TYPE", value: "Row Houses & Plots" },
      { label: "DEVELOPER", value: "NM Group" },
      { label: "LOCATION", value: "Indore, MP" },
      { label: "ADDRESS", value: "AB Rd, Mangliya" },
      { label: "AREA", value: "Talawali Chanda" },
      { label: "AMENITIES", value: "Premium" },
    ],
    para1: "NM Pride, this distinguished property exudes elegance, with well-appointed spaces designed for the discerning few. NM Pride redefines luxury living through its distinctive architecture and premium amenities. Immerse yourself in the epitome of comfort and sophistication as you make NM Pride your home, where every detail is crafted to enhance your daily life and elevate your living standards.",
    para2: "Features & Amenities: 24x7 Security, Surveillance System, Children's Play Area, Open Gym, Landscape Garden, Basketball Ground, Cricket Ground, Temple, 24x7 Water and Electricity. Located at AB Rd, Mangliya Road, Talawali Chanda, Indore.",
  },
  {
    image: "/spotify.jpg",
    title: "NM\nVerge",
    details: [
      { label: "PROJECT", value: "NM Verge" },
      { label: "YEAR", value: "2024" },
      { label: "FLOORS", value: "3" },
      { label: "DEVELOPER", value: "NM Group" },
      { label: "TYPE", value: "Commercial" },
      { label: "LOCATION", value: "Indore, MP" },
      { label: "STATUS", value: "Completed" },
      { label: "ADDRESS", value: "Yeshwant Niwas Rd" },
    ],
    para1: "NM Verge, nestled in the heart of Indore, epitomizes modern elegance and convenience. Meticulously designed, this premier property offers exclusive residences that celebrate space, natural light, and contemporary aesthetics. NM Verge sets a new standard of living, harmonizing sophisticated design with practicality.",
    para2: "Discover a haven where convenience meets charm, defining a refined lifestyle in the vibrant city of Indore. Located at 4th Floor, NM Verge, 8/5, Yeshwant Niwas Rd, Maan Sarovar, Indore, Madhya Pradesh 452003.",
  },
  {
    image: "/hotel.jpg",
    title: "Upcoming\nProject",
    details: [
      { label: "PROJECT", value: "Upcoming" },
      { label: "STATUS", value: "Coming Soon" },
      { label: "TYPE", value: "Residential" },
      { label: "DEVELOPER", value: "NM Group" },
      { label: "LOCATION", value: "Indore, MP" },
      { label: "ADDRESS", value: "Bicholi Mardana" },
      { label: "PHASE", value: "Planning" },
      { label: "LAUNCH", value: "2025" },
    ],
    para1: "An exciting new development coming soon to Bicholi Mardana, Indore. This upcoming project by NM Group promises to deliver the same exceptional quality and thoughtful design that defines all our developments. Stay tuned for more details as we prepare to unveil our latest vision for modern living.",
    para2: "Gallery coming soon. Register your interest to be among the first to receive updates about this prestigious new development. NM Group continues to expand its footprint in Indore with projects that set new benchmarks in quality and design.",
  },
  {
    image: "/nmg.jpeg",
    title: "NM\nGrande",
    details: [
      { label: "PROJECT", value: "NM Grande" },
      { label: "STATUS", value: "Completed" },
      { label: "TYPE", value: "Residential Spaces" },
      { label: "DEVELOPER", value: "NM Group" },
      { label: "LOCATION", value: "Indore, MP" },
      { label: "ADDRESS", value: "Greater Tirupati Nagar" },
      { label: "AREA", value: "Geeta Bhavan" },
      { label: "AMENITIES", value: "Premium" },
    ],
    para1: "NM Grande stands as an architectural marvel, offering an unparalleled living experience in the vibrant city of Indore. This distinctive property seamlessly integrates modern design with the natural beauty of its surroundings. NM Grande presents spacious and thoughtfully designed residences, each promising a life of tranquility and convenience.",
    para2: "Features & Amenities: 24x7 Security, Surveillance System, Modern Gym, Children's Play Area, Landscape Garden, 2 Lifts, 2 Staircases, Community Hall, Grand Entrance Lobby, Temple, 24x7 Water and Electricity, Narmada & Borewell, Service Floor, Vastu Based Planning, Rain Water Harvesting. Located at 80, Greater Tirupati Nagar, Behind Geeta Bhavan Mandir, Indore.",
  },
  {
    image: "/lv.jpg",
    title: "London\nVillas",
    details: [
      { label: "PROJECT", value: "London Villas" },
      { label: "STATUS", value: "Completed" },
      { label: "TYPE", value: "Plotting Township" },
      { label: "DEVELOPER", value: "NM Group" },
      { label: "LOCATION", value: "Indore, MP" },
      { label: "ADDRESS", value: "Near Aurobindo Hospital" },
      { label: "AREA", value: "Bhawrasla" },
      { label: "PLOTS", value: "Multiple Sizes" },
    ],
    para1: "London is known as one of the most exciting capitals of the world, a cosmopolitan city full of cultural, executive and entertainment activities. But now you don't need to go to London to feel at London. It's all here at Indore itself. Welcome to the world of London Villas, a novel township which draws inspiration from the best city of the world.",
    para2: "Features & Amenities: 24x7 Security, Swimming Pool, Surveillance System, Children's Play Area, Club House, Landscape Garden, Wi-fi Campus, Meditation Hub, Senior Citizens Zone, Vastu Based Planning, Temple, Party Lawn, 24x7 Water and Electricity, Pool Table, Badminton Court, Table Tennis, Extra Common Parking. Plot sizes: 20'x50', 20'x47', 21'x47', 17'x47'. Located near Aurobindo Hospital, Indore Ujjain 4 Lane Highway, Bhawrasla, Indore.",
  },
  {
    image: "/e1.jpg",
    title: "Emerald\nHeights",
    details: [
      { label: "PROJECT", value: "Emerald Heights" },
      { label: "STATUS", value: "Completed" },
      { label: "TYPE", value: "Industrial" },
      { label: "DEVELOPER", value: "NM Group" },
      { label: "LOCATION", value: "Surprise, AZ" },
      { label: "AREA", value: "26,346.74 Sq. Ft." },
      { label: "COMMENCED", value: "18 Jun, 2022" },
      { label: "PRICE", value: "$500k-$1100k" },
    ],
    para1: "Emerald Heights Office Complex stands as a premier industrial development in Surprise, AZ. This meticulously planned property offers state-of-the-art facilities designed to meet the demands of modern businesses. With thoughtful architecture and premium amenities, Emerald Heights represents the pinnacle of commercial real estate excellence.",
    para2: "Features & Amenities: 24x7 Security, Surveillance System, Fitness Center, Children's Play Area, 24 Hour Maintenance, Swimming Pool, Screening Room, Firefighting System, Game Room, Landscape Garden. A comprehensive commercial space designed for productivity and comfort.",
  },
];

export default function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const para1Ref = useRef<HTMLParagraphElement>(null);
  const para2Ref = useRef<HTMLParagraphElement>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const imageInner = imageInnerRef.current;
    const title = titleRef.current;
    const details = detailsRef.current;
    const para1 = para1Ref.current;
    const para2 = para2Ref.current;

    if (!section || !image || !imageInner || !title || !details || !para1 || !para2) return;

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(image, { clipPath: "inset(0 0 100% 100%)" });
      gsap.set(imageInner, { scale: 1.3 });
      gsap.set(title, { opacity: 0, y: 40 });
      gsap.set(details, { opacity: 0, y: 40 });
      gsap.set(para1, { opacity: 0, y: 40 });
      gsap.set(para2, { opacity: 0, y: 40 });

      // Image reveal from top right corner
      gsap.to(image, {
        clipPath: "inset(0 0 0% 0%)",
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          end: "top 40%",
          toggleActions: "play none none none",
        },
      });

      // Image zoom out smoothly
      gsap.to(imageInner, {
        scale: 1,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          end: "top 40%",
          toggleActions: "play none none none",
        },
      });

      // Title animation - first text
      gsap.to(title, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          end: "top 40%",
          toggleActions: "play none none none",
        },
      });

      // Details grid animation - second
      gsap.to(details, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        delay: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          end: "top 40%",
          toggleActions: "play none none none",
        },
      });

      // Paragraph 1 - after details
      gsap.to(para1, {
        opacity: 1,
        y: 0,
        duration: 1.5,
        delay: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          end: "top 40%",
          toggleActions: "play none none none",
        },
      });

      // Paragraph 2 - last to fade in smoothly
      gsap.to(para2, {
        opacity: 1,
        y: 0,
        duration: 1.8,
        delay: 0.9,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          end: "top 40%",
          toggleActions: "play none none none",
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const handleNext = () => {
    if (isAnimating || currentIndex >= galleryData.length - 1) return;
    setIsAnimating(true);

    const image = imageRef.current;
    const imageInner = imageInnerRef.current;
    const title = titleRef.current;
    const details = detailsRef.current;
    const para1 = para1Ref.current;
    const para2 = para2Ref.current;

    // Fade out current content
    gsap.to([title, details, para1, para2], {
      opacity: 0,
      y: -20,
      duration: 0.3,
      ease: "power2.in",
    });

    gsap.to(image, {
      clipPath: "inset(0 0 0 100%)",
      duration: 0.5,
      ease: "power2.in",
      onComplete: () => {
        setCurrentIndex((prev) => prev + 1);

        // Reset and animate in
        gsap.set(image, { clipPath: "inset(0 100% 0 0)" });
        gsap.set(imageInner, { scale: 1.2 });
        gsap.set([title, details, para1, para2], { opacity: 0, y: 30 });

        gsap.to(image, {
          clipPath: "inset(0 0% 0 0)",
          duration: 0.6,
          ease: "power2.out",
        });

        gsap.to(imageInner, {
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
        });

        gsap.to(title, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          delay: 0.2,
          ease: "power2.out",
        });

        gsap.to(details, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          delay: 0.3,
          ease: "power2.out",
        });

        gsap.to(para1, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          delay: 0.4,
          ease: "power2.out",
        });

        gsap.to(para2, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          delay: 0.5,
          ease: "power2.out",
          onComplete: () => setIsAnimating(false),
        });
      },
    });
  };

  const handlePrev = () => {
    if (isAnimating || currentIndex <= 0) return;
    setIsAnimating(true);

    const image = imageRef.current;
    const imageInner = imageInnerRef.current;
    const title = titleRef.current;
    const details = detailsRef.current;
    const para1 = para1Ref.current;
    const para2 = para2Ref.current;

    // Fade out current content
    gsap.to([title, details, para1, para2], {
      opacity: 0,
      y: -20,
      duration: 0.3,
      ease: "power2.in",
    });

    gsap.to(image, {
      clipPath: "inset(0 100% 0 0)",
      duration: 0.5,
      ease: "power2.in",
      onComplete: () => {
        setCurrentIndex((prev) => prev - 1);

        // Reset and animate in
        gsap.set(image, { clipPath: "inset(0 0 0 100%)" });
        gsap.set(imageInner, { scale: 1.2 });
        gsap.set([title, details, para1, para2], { opacity: 0, y: 30 });

        gsap.to(image, {
          clipPath: "inset(0 0 0 0%)",
          duration: 0.6,
          ease: "power2.out",
        });

        gsap.to(imageInner, {
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
        });

        gsap.to(title, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          delay: 0.2,
          ease: "power2.out",
        });

        gsap.to(details, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          delay: 0.3,
          ease: "power2.out",
        });

        gsap.to(para1, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          delay: 0.4,
          ease: "power2.out",
        });

        gsap.to(para2, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          delay: 0.5,
          ease: "power2.out",
          onComplete: () => setIsAnimating(false),
        });
      },
    });
  };

  const currentData = galleryData[currentIndex];

  return (
    <section
      id="gallery-section"
      ref={sectionRef}
      className="relative bg-[#F5F5F3] w-full"
      style={{
        height: '100vh',
        paddingLeft: '48px',
        paddingRight: '48px',
        paddingTop: '10vh',
        paddingBottom: '10vh',
        zIndex: 2,
      }}
    >
      {/* Main Grid */}
      <div
        className="h-full grid"
        style={{
          gridTemplateColumns: '1.3fr 1fr',
          columnGap: '5.5vw',
        }}
      >
        {/* Left Column - Property Image */}
        <div className="relative h-full">
          <div
            ref={imageRef}
            className="relative w-full h-full bg-[#E5E2DD] overflow-hidden"
          >
            <div ref={imageInnerRef} className="relative w-full h-full">
              <Image
                src={currentData.image}
                alt="Luxury property interior"
                fill
                className="object-cover"
              />
            </div>
          </div>

        </div>

        {/* Right Column - Property Details */}
        <div className="flex flex-col h-full">
          {/* Top - Gallery Title & Navigation */}
          <div className="flex items-start justify-between">
            <h2
              ref={titleRef}
              className="text-sm font-medium text-[#493425] leading-[140%] whitespace-pre-line"
              style={{ opacity: 0 }}
            >
              {currentData.title}
            </h2>

            {/* Navigation Arrows */}
            <div className="flex items-center gap-1">
              {/* Left Arrow */}
              <button
                onClick={handlePrev}
                disabled={isAnimating || currentIndex === 0}
                className={`w-24 h-24 flex items-center justify-center transition-colors ${
                  currentIndex === 0
                    ? "text-[#493425]/30 cursor-not-allowed"
                    : "text-[#493425]/50 hover:text-[#493425]"
                }`}
              >
                <svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M50 28L35 45L50 62" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M28 18C18 28 12 36 12 45C12 54 18 62 28 72" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
                  <path d="M62 18C72 28 78 36 78 45C78 54 72 62 62 72" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
                </svg>
              </button>

              {/* Page Indicator */}
              <span className="text-xs font-medium text-[#493425]/60 mx-2">
                {currentIndex + 1} / {galleryData.length}
              </span>

              {/* Right Arrow */}
              <button
                onClick={handleNext}
                disabled={isAnimating || currentIndex === galleryData.length - 1}
                className={`w-24 h-24 flex items-center justify-center transition-colors ${
                  currentIndex === galleryData.length - 1
                    ? "text-[#493425]/30 cursor-not-allowed"
                    : "text-[#493425] hover:text-[#493425]/70"
                }`}
              >
                <svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M40 28L55 45L40 62" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M28 18C18 28 12 36 12 45C12 54 18 62 28 72" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
                  <path d="M62 18C72 28 78 36 78 45C78 54 72 62 62 72" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Property Details Grid */}
          <div
            ref={detailsRef}
            className="grid mt-40"
            style={{
              gridTemplateColumns: 'repeat(4, 1fr)',
              rowGap: '32px',
              columnGap: '24px',
              opacity: 0,
            }}
          >
            {currentData.details.map((detail, index) => (
              <div key={index}>
                <p
                  className="text-xs font-semibold text-[#493425] uppercase mb-2"
                  style={{ letterSpacing: '0.05em' }}
                >
                  {detail.label}
                </p>
                <p className="text-sm font-medium text-[#8D7660]">
                  {detail.value}
                </p>
              </div>
            ))}
          </div>

          {/* Description Text */}
          <div className="mt-auto space-y-6">
            <p
              ref={para1Ref}
              className="text-sm font-medium text-[#8D7660] leading-[170%]"
              style={{ opacity: 0 }}
            >
              {currentData.para1}
            </p>
            <p
              ref={para2Ref}
              className="text-sm font-medium text-[#8D7660] leading-[170%]"
              style={{ opacity: 0 }}
            >
              {currentData.para2}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

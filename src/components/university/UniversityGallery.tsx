"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

interface UniversityGalleryProps {
  universityName: string;
  images: {
    src: string;
    alt: string;
  }[];
}

export function UniversityGallery({ universityName, images }: UniversityGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    if (activeIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveIndex(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeIndex]);

  if (!images.length) return null;

  return (
    <>
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-navy mb-2">Campus & Student Life Gallery</h2>
          <p className="text-sm text-text-secondary mb-8">
            Explore student life, classrooms, hostels, and facilities at {universityName}.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <button
                key={image.src}
                type="button"
                onClick={() => setActiveIndex(index)}
                className="group relative overflow-hidden rounded-2xl card-shadow focus:outline-none focus:ring-2 focus:ring-sky"
                aria-label={`Open image ${index + 1} of ${images.length}`}
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/15 transition-colors" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-navy/85 backdrop-blur-sm p-4 sm:p-8 flex items-center justify-center"
          onClick={() => setActiveIndex(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={() => setActiveIndex(null)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 rounded-full bg-white text-navy flex items-center justify-center hover:bg-surface transition-colors"
            aria-label="Close gallery modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div
            className="relative w-full max-w-5xl aspect-[16/10] rounded-2xl overflow-hidden"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={images[activeIndex].src}
              alt={images[activeIndex].alt}
              fill
              className="object-contain bg-black/30"
              sizes="100vw"
              priority
            />
          </div>
        </div>
      )}
    </>
  );
}

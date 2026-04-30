"use client";

import Image from "next/image";
import type { NormalizedImage } from "@/lib/enhancements/media/imageEngine";

interface ImageGridProps {
  images: NormalizedImage[];
  columns?: 2 | 3 | 4;
  showAttribution?: boolean;
  aspectRatio?: "square" | "video" | "wide";
}

const colClass: Record<number, string> = {
  2: "grid-cols-2",
  3: "grid-cols-2 sm:grid-cols-3",
  4: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
};

const aspectClass: Record<string, string> = {
  square: "aspect-square",
  video: "aspect-video",
  wide: "aspect-[16/7]",
};

export default function ImageGrid({
  images,
  columns = 3,
  showAttribution = false,
  aspectRatio = "video",
}: ImageGridProps) {
  if (!images.length) return null;

  return (
    <div className={`grid gap-3 ${colClass[columns]}`}>
      {images.map((img) => (
        <div key={img.id} className="group relative overflow-hidden rounded-xl">
          <div className={`relative w-full ${aspectClass[aspectRatio]}`}>
            <Image
              src={img.url}
              alt={img.alt}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          </div>
          {showAttribution && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-3 py-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              <a
                href={img.authorUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-white/80 hover:text-white"
              >
                {img.author} · {img.source}
              </a>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

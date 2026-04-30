"use client";

import Image from "next/image";

interface HeroImageProps {
  src: string;
  alt: string;
  caption?: string;
  attribution?: { name: string; url: string; source?: string };
  overlay?: boolean;
  overlayContent?: React.ReactNode;
  priority?: boolean;
  className?: string;
}

export default function HeroImage({
  src,
  alt,
  caption,
  attribution,
  overlay = false,
  overlayContent,
  priority = false,
  className = "",
}: HeroImageProps) {
  return (
    <figure className={`group relative w-full overflow-hidden rounded-2xl ${className}`}>
      <div className="relative aspect-[16/7] w-full">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />

        {overlay && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        )}

        {overlayContent && (
          <div className="absolute inset-0 flex items-end p-6">
            {overlayContent}
          </div>
        )}
      </div>

      {(caption || attribution) && (
        <figcaption className="mt-2 flex items-center justify-between px-1 text-xs text-gray-400">
          {caption && <span>{caption}</span>}
          {attribution && (
            <a
              href={attribution.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-600"
            >
              Photo by {attribution.name}
              {attribution.source ? ` · ${attribution.source}` : ""}
            </a>
          )}
        </figcaption>
      )}
    </figure>
  );
}

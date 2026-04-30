"use client";

import Image from "next/image";
import type { NormalizedImage } from "@/lib/enhancements/media/imageEngine";

interface ImageSectionProps {
  images: NormalizedImage[];
  title?: string;
  subtitle?: string;
  maxImages?: number;
}

export default function ImageSection({
  images,
  title,
  subtitle,
  maxImages = 6,
}: ImageSectionProps) {
  const visible = images.slice(0, maxImages);

  if (!visible.length) return null;

  const [featured, ...rest] = visible;

  return (
    <div className="space-y-4">
      {(title || subtitle) && (
        <div>
          {title && <h3 className="text-lg font-bold text-gray-900">{title}</h3>}
          {subtitle && (
            <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
          )}
        </div>
      )}

      {/* Featured image */}
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl">
        <Image
          src={featured.url}
          alt={featured.alt}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 80vw"
          className="object-cover"
        />
        <div className="absolute bottom-3 left-3">
          <a
            href={featured.authorUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-black/50 px-2.5 py-1 text-xs text-white/80 backdrop-blur-sm hover:text-white"
          >
            Photo by {featured.author}
          </a>
        </div>
      </div>

      {/* Thumbnail strip */}
      {rest.length > 0 && (
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
          {rest.slice(0, 5).map((img) => (
            <div
              key={img.id}
              className="relative aspect-square overflow-hidden rounded-xl"
            >
              <Image
                src={img.thumb}
                alt={img.alt}
                fill
                sizes="120px"
                className="object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

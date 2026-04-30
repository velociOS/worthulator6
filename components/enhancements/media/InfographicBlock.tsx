"use client";

import Image from "next/image";

interface InfographicBlockProps {
  src: string;
  alt: string;
  caption?: string;
  /** Optional descriptive text shown alongside or below the image */
  description?: string;
  /** Display text above the image */
  title?: string;
  /** Layout: stacked (image on top) or side-by-side */
  layout?: "stacked" | "side";
  /** Max width for the image in stacked mode */
  imageMaxWidth?: string;
}

export default function InfographicBlock({
  src,
  alt,
  caption,
  description,
  title,
  layout = "stacked",
  imageMaxWidth = "100%",
}: InfographicBlockProps) {
  const image = (
    <figure style={{ maxWidth: imageMaxWidth }} className="w-full">
      <div className="relative w-full overflow-hidden rounded-2xl border border-gray-200 bg-gray-50">
        {/* Use a regular img tag for SVG/infographic assets that may not have known dimensions */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="h-auto w-full object-contain"
        />
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-xs text-gray-400">
          {caption}
        </figcaption>
      )}
    </figure>
  );

  if (layout === "side") {
    return (
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
        <div className="sm:w-1/2">{image}</div>
        <div className="sm:w-1/2">
          {title && (
            <h3 className="text-lg font-bold text-gray-900">{title}</h3>
          )}
          {description && (
            <p className="mt-3 text-sm leading-relaxed text-gray-500">
              {description}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {title && <h3 className="text-lg font-bold text-gray-900">{title}</h3>}
      {image}
      {description && (
        <p className="text-sm leading-relaxed text-gray-500">{description}</p>
      )}
    </div>
  );
}

/**
 * Image Engine
 * Fetches, normalises, and deduplicates images from Unsplash and Pexels.
 *
 * Usage:
 *   const images = await fetchUnsplash("concrete slab", { perPage: 12, accessKey: "..." });
 *   const merged = mergeImages(unsplashResults, pexelsResults);
 */

export interface NormalizedImage {
  id: string;
  source: "unsplash" | "pexels";
  url: string;          // full-size src
  thumb: string;        // small thumbnail
  alt: string;
  author: string;
  authorUrl: string;
  sourceUrl: string;
  width: number;
  height: number;
}

// ─── Unsplash ────────────────────────────────────────────────────────────────

interface UnsplashPhoto {
  id: string;
  description: string | null;
  alt_description: string | null;
  urls: { full: string; regular: string; thumb: string };
  user: { name: string; links: { html: string } };
  links: { html: string };
  width: number;
  height: number;
}

export interface FetchUnsplashOptions {
  perPage?: number;
  page?: number;
  orientation?: "landscape" | "portrait" | "squarish";
  /** Required — Unsplash Access Key */
  accessKey: string;
}

export async function fetchUnsplash(
  query: string,
  options: FetchUnsplashOptions
): Promise<NormalizedImage[]> {
  const { perPage = 10, page = 1, orientation = "landscape", accessKey } = options;

  const params = new URLSearchParams({
    query,
    per_page: String(perPage),
    page: String(page),
    orientation,
  });

  const res = await fetch(
    `https://api.unsplash.com/search/photos?${params.toString()}`,
    {
      headers: { Authorization: `Client-ID ${accessKey}` },
      next: { revalidate: 3600 },
    }
  );

  if (!res.ok) {
    throw new Error(`Unsplash API error: ${res.status} ${res.statusText}`);
  }

  const json: { results: UnsplashPhoto[] } = await res.json();

  return json.results.map((photo) => ({
    id: `unsplash-${photo.id}`,
    source: "unsplash",
    url: photo.urls.regular,
    thumb: photo.urls.thumb,
    alt: photo.alt_description ?? photo.description ?? query,
    author: photo.user.name,
    authorUrl: photo.user.links.html,
    sourceUrl: photo.links.html,
    width: photo.width,
    height: photo.height,
  }));
}

// ─── Pexels ──────────────────────────────────────────────────────────────────

interface PexelsPhoto {
  id: number;
  width: number;
  height: number;
  url: string;
  alt: string;
  photographer: string;
  photographer_url: string;
  src: { large: string; medium: string; tiny: string };
}

export interface FetchPexelsOptions {
  perPage?: number;
  page?: number;
  orientation?: "landscape" | "portrait" | "square";
  /** Required — Pexels API Key */
  apiKey: string;
}

export async function fetchPexels(
  query: string,
  options: FetchPexelsOptions
): Promise<NormalizedImage[]> {
  const { perPage = 10, page = 1, orientation = "landscape", apiKey } = options;

  const params = new URLSearchParams({
    query,
    per_page: String(perPage),
    page: String(page),
    orientation,
  });

  const res = await fetch(
    `https://api.pexels.com/v1/search?${params.toString()}`,
    {
      headers: { Authorization: apiKey },
      next: { revalidate: 3600 },
    }
  );

  if (!res.ok) {
    throw new Error(`Pexels API error: ${res.status} ${res.statusText}`);
  }

  const json: { photos: PexelsPhoto[] } = await res.json();

  return json.photos.map((photo) => ({
    id: `pexels-${photo.id}`,
    source: "pexels",
    url: photo.src.large,
    thumb: photo.src.tiny,
    alt: photo.alt ?? query,
    author: photo.photographer,
    authorUrl: photo.photographer_url,
    sourceUrl: photo.url,
    width: photo.width,
    height: photo.height,
  }));
}

// ─── Merge + Deduplicate ─────────────────────────────────────────────────────

/**
 * Merges multiple image arrays and removes duplicates by id.
 * Interleaves sources so results alternate rather than block.
 */
export function mergeImages(...sources: NormalizedImage[][]): NormalizedImage[] {
  const seen = new Set<string>();
  const merged: NormalizedImage[] = [];
  const maxLen = Math.max(...sources.map((s) => s.length));

  for (let i = 0; i < maxLen; i++) {
    for (const source of sources) {
      const img = source[i];
      if (img && !seen.has(img.id)) {
        seen.add(img.id);
        merged.push(img);
      }
    }
  }

  return merged;
}

"use client";

import { useState, useCallback } from "react";
import {
  fetchUnsplash,
  fetchPexels,
  mergeImages,
} from "@/lib/enhancements/media/imageEngine";
import type {
  NormalizedImage,
  FetchUnsplashOptions,
  FetchPexelsOptions,
} from "@/lib/enhancements/media/imageEngine";

interface UseImageEngineOptions {
  unsplashAccessKey?: string;
  pexelsApiKey?: string;
  perPage?: number;
}

interface UseImageEngineReturn {
  images: NormalizedImage[];
  loading: boolean;
  error: string | null;
  search: (query: string) => Promise<void>;
  clear: () => void;
}

export function useImageEngine(
  options: UseImageEngineOptions = {}
): UseImageEngineReturn {
  const { unsplashAccessKey, pexelsApiKey, perPage = 10 } = options;

  const [images, setImages] = useState<NormalizedImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(
    async (query: string) => {
      if (!query.trim()) return;

      setLoading(true);
      setError(null);

      const fetchTasks: Promise<NormalizedImage[]>[] = [];

      if (unsplashAccessKey) {
        const opts: FetchUnsplashOptions = { perPage, accessKey: unsplashAccessKey };
        fetchTasks.push(fetchUnsplash(query, opts).catch(() => []));
      }

      if (pexelsApiKey) {
        const opts: FetchPexelsOptions = { perPage, apiKey: pexelsApiKey };
        fetchTasks.push(fetchPexels(query, opts).catch(() => []));
      }

      if (fetchTasks.length === 0) {
        setError("No API keys provided. Supply unsplashAccessKey or pexelsApiKey.");
        setLoading(false);
        return;
      }

      try {
        const results = await Promise.all(fetchTasks);
        setImages(mergeImages(...results));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch images.");
      } finally {
        setLoading(false);
      }
    },
    [unsplashAccessKey, pexelsApiKey, perPage]
  );

  const clear = useCallback(() => {
    setImages([]);
    setError(null);
  }, []);

  return { images, loading, error, search, clear };
}

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // as fotos já saem em WebP; o Next entrega AVIF/WebP no tamanho de cada tela
    formats: ["image/avif", "image/webp"],
    qualities: [75],
  },
};

export default nextConfig;

import { useEffect, useState } from 'react';
import type { VehicleSilhouetteType } from '../data/inventory';
import { VehicleSilhouette } from './VehicleSilhouette';

interface CarPhotoProps {
  src: string;
  alt: string;
  silhouette: VehicleSilhouetteType;
  paintHex: string;
  className?: string;
  priority?: boolean;
}

export function CarPhoto({
  src,
  alt,
  silhouette,
  paintHex,
  className = '',
  priority = false,
}: CarPhotoProps) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [src]);

  if (hasError || !src) {
    return (
      <VehicleSilhouette
        type={silhouette}
        paintHex={paintHex}
        modelLabel={alt}
        className={className}
      />
    );
  }

  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-white/10 bg-[#111111] ${className}`}
    >
      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        referrerPolicy="no-referrer"
        onError={() => setHasError(true)}
        className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.03]"
      />
      {/* Subtle dark vignette scrim to harmonize photography with #0A0A0A / #161616 surfaces */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent"
      />
    </div>
  );
}

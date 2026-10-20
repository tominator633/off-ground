import { useId } from "react";

interface BrandStarProps {
  className?: string;
}

const STAR_PATH =
  "M 102 4 L 125 59.6 L 200 43.6 L 139.3 93.7 L 162.6 149.2 L 102 124.5 L 41.4 174.8 L 64.8 109.4 L 4 85 L 79 69.3 Z";

/**
 * The slanted glitter star of the Off Ground logo: a dark side edge for thickness and a
 * lilac face with sparkles made from SVG noise. Master file: ../logo/off-ground-logo.svg (outside the repo).
 */
export function BrandStar({ className }: BrandStarProps) {
  // Unique ids, because the star is rendered more than once per page (header, footer, hero).
  const id = useId().replace(/[^a-zA-Z0-9-]/g, "");
  const faceId = `star-face-${id}`;
  const glitterId = `star-glitter-${id}`;

  return (
    <svg className={className} viewBox="0 0 212 187" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={faceId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--color-glitter-light)" />
          <stop offset="1" stopColor="var(--color-glitter-dark)" />
        </linearGradient>
        <filter id={glitterId} x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.55" numOctaves="2" seed="4" result="noise" />
          <feColorMatrix
            in="noise"
            type="matrix"
            values="0 0 0 0 1  0 0 0 0 0.93  0 0 0 0 1  6 0 0 0 -3.2"
            result="sparkleLight"
          />
          <feColorMatrix
            in="noise"
            type="matrix"
            values="0 0 0 0 0.35  0 0 0 0 0.18  0 0 0 0 0.4  -6 0 0 0 2.6"
            result="sparkleDark"
          />
          <feMerge result="sparkles">
            <feMergeNode in="sparkleDark" />
            <feMergeNode in="sparkleLight" />
          </feMerge>
          <feComposite in="sparkles" in2="SourceGraphic" operator="in" result="clipped" />
          <feMerge>
            <feMergeNode in="SourceGraphic" />
            <feMergeNode in="clipped" />
          </feMerge>
        </filter>
      </defs>
      <path d={STAR_PATH} transform="translate(6 8)" fill="var(--color-glitter-edge)" />
      <path d={STAR_PATH} fill={`url(#${faceId})`} filter={`url(#${glitterId})`} />
    </svg>
  );
}

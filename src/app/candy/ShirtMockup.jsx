"use client";
import { useId } from "react";
import Image from "next/image";

const BODY =
  "M118 22 C118 46 130 58 150 58 C170 58 182 46 182 22 L214 30 L286 74 L250 126 L228 108 L228 330 L72 330 L72 108 L50 126 L14 74 L86 30 Z";

const COLLAR =
  "M118 22 C118 46 130 58 150 58 C170 58 182 46 182 22 L191 18 C191 53 173 68 150 68 C127 68 109 53 109 18 Z";

const STAR =
  "150,124 155.6,140.2 172.8,140.6 159.1,151 164.1,167.4 150,157.6 135.9,167.4 140.9,151 127.2,140.6 144.4,140.2";

function isLight(hex) {
  const raw = String(hex).replace("#", "");
  const full = raw.length === 3 ? raw.split("").map((c) => c + c).join("") : raw;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  if ([r, g, b].some(Number.isNaN)) return false;
  return 0.2126 * r + 0.7152 * g + 0.0722 * b > 150;
}

export default function ShirtMockup({
  color = "#0B1E3D",
  image = null,
  alt = "",
  sizes = "(max-width: 768px) 90vw, 380px",
  preload = false,
  className = "",
}) {
  const uid = useId().replace(/:/g, "");

  if (image) {
    return (
      <Image
        src={image}
        alt={alt}
        fill
        sizes={sizes}
        preload={preload}
        className={`object-cover ${className}`}
      />
    );
  }

  const print = isLight(color) ? "#0B1E3D" : "#F0B429";

  return (
    <svg
      viewBox="0 0 300 350"
      className={`h-full w-full ${className}`}
      role="img"
      aria-label={alt || "T-shirt mockup"}
    >
      <defs>
        <linearGradient id={`sheen-${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#000" stopOpacity="0.26" />
          <stop offset="16%" stopColor="#000" stopOpacity="0.04" />
          <stop offset="42%" stopColor="#fff" stopOpacity="0.18" />
          <stop offset="68%" stopColor="#000" stopOpacity="0.03" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.28" />
        </linearGradient>
        <linearGradient id={`hem-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="55%" stopColor="#000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.22" />
        </linearGradient>
      </defs>
      <ellipse cx="150" cy="336" rx="96" ry="10" fill="#0B1E3D" opacity="0.12" />
      <path
        d={BODY}
        fill={color}
        stroke="rgba(11,30,61,0.18)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d={BODY} fill={`url(#sheen-${uid})`} />
      <path d={BODY} fill={`url(#hem-${uid})`} />
      <path d={COLLAR} fill={color} />
      <path d={COLLAR} fill="#000" opacity="0.14" />
      <path
        d={COLLAR}
        fill="none"
        stroke="rgba(11,30,61,0.18)"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <g fill="none" stroke="#000" strokeOpacity="0.09" strokeWidth="2" strokeLinecap="round">
        <path d="M104 92 C100 150 104 240 100 322" />
        <path d="M196 92 C200 150 196 240 200 322" />
        <path d="M72 108 L92 118" />
        <path d="M228 108 L208 118" />
        <path d="M250 126 L232 132" />
        <path d="M50 126 L68 132" />
      </g>
      <g opacity="0.92">
        <polygon points={STAR} fill={print} />
        <text
          x="150"
          y="188"
          textAnchor="middle"
          fill={print}
          fontSize="10"
          fontWeight="700"
          letterSpacing="3.2"
          fontFamily="var(--font-body), sans-serif"
        >
          THE STAR
        </text>
      </g>
    </svg>
  );
}

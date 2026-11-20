import React from 'react';

// A drawn scene rather than a photograph: no stock imagery of people, no
// consent to collect, and a few kilobytes instead of a hero-blocking JPEG on a
// mid-range phone. Decorative only — every fact it hints at is also in text.
export function StudyScene({ className = '' }) {
  return <svg className={`study-scene ${className}`} viewBox="0 0 460 420" preserveAspectRatio="xMidYMax slice" role="img"
    aria-label="An illustrated study corner: an open madrassa textbook beside a laptop showing a one-to-one class">
    <defs>
      <clipPath id="arch">
        <path d="M0 160C0 71.6 71.6 0 160 0h140c88.4 0 160 71.6 160 160v255a5 5 0 0 1-5 5H5a5 5 0 0 1-5-5z" />
      </clipPath>
      <linearGradient id="sun" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#f6e8c9" stopOpacity=".95" />
        <stop offset="1" stopColor="#f3ede3" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="screen" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#32604d" />
        <stop offset="1" stopColor="#24473a" />
      </linearGradient>
    </defs>

    <g clipPath="url(#arch)">
      <rect width="460" height="420" fill="#efe9dd" />
      <circle cx="96" cy="86" r="150" fill="url(#sun)" />
      {/* window */}
      <g stroke="#ddd2bd" strokeWidth="2" fill="#f4eee2">
        <rect x="262" y="40" width="150" height="150" rx="6" />
        <path d="M337 40v150M262 115h150" />
      </g>
      {/* ruled wall texture */}
      <g stroke="#e3dccb" strokeWidth="1">
        {[210, 232, 254, 276].map(y => <path key={y} d={`M20 ${y}h190`} />)}
      </g>
      {/* desk */}
      <rect x="0" y="300" width="460" height="120" fill="#e0d2b9" />
      <rect x="0" y="300" width="460" height="7" fill="#d2c0a0" />

      {/* open textbook */}
      <g>
        <path d="M34 300c38-16 74-16 104 0-30 10-66 10-104 0z" fill="#cdbb9c" />
        <path d="M36 298c36-26 70-26 100 0-30 9-64 9-100 0z" fill="#fdfaf1" stroke="#ddd2bb" strokeWidth="1.5" />
        <path d="M86 276v22" stroke="#ddd2bb" strokeWidth="1.5" />
        <g stroke="#9fb08f" strokeWidth="2" strokeLinecap="round" opacity=".85">
          <path d="M46 288h32M44 293h30M96 288h32M98 293h28" />
        </g>
      </g>

      {/* laptop showing a one-to-one class */}
      <g>
        <rect x="168" y="186" width="168" height="108" rx="7" fill="#3b3b35" />
        <rect x="174" y="192" width="156" height="96" rx="4" fill="url(#screen)" />
        <rect x="258" y="200" width="62" height="42" rx="4" fill="#5c7f68" />
        <circle cx="289" cy="215" r="9" fill="#cfe0c0" />
        <path d="M278 234c3-8 19-8 22 0z" fill="#cfe0c0" />
        <g stroke="#d7e3c7" strokeWidth="3" strokeLinecap="round" opacity=".85">
          <path d="M186 206h56M186 216h44M186 226h52M186 236h34" />
        </g>
        <g stroke="#e8b87f" strokeWidth="3" strokeLinecap="round">
          <path d="M186 252h40" />
          <path d="M233 253l5 6 10-12" fill="none" />
        </g>
        <rect x="156" y="294" width="192" height="9" rx="4" fill="#4a4a43" />
      </g>

      {/* plant */}
      <g>
        <path d="M398 300v-26" stroke="#7c8f6c" strokeWidth="3" />
        <path d="M398 284c-16-2-24-14-22-26 13 1 23 12 22 26z" fill="#8ea47c" />
        <path d="M400 282c15-4 21-17 17-28-12 3-20 15-17 28z" fill="#7d9469" />
        <path d="M384 300h30l-4 22h-22z" fill="#c08b63" />
      </g>

      {/* pencil */}
      <g transform="rotate(-9 352 292)">
        <rect x="330" y="289" width="56" height="6" rx="3" fill="#dfc188" />
        <path d="M386 289l12 3-12 3z" fill="#9a7b50" />
      </g>

      {/* light band */}
      <path d="M262 40L140 420h86L348 40z" fill="#fff6dd" opacity=".32" />
    </g>

    <path d="M0 160C0 71.6 71.6 0 160 0h140c88.4 0 160 71.6 160 160v255a5 5 0 0 1-5 5H5a5 5 0 0 1-5-5z"
      fill="none" stroke="#dfd6c3" strokeWidth="2" />
  </svg>;
}

export function PaperTexture() {
  return <svg className="paper-texture" aria-hidden="true" viewBox="0 0 120 120" preserveAspectRatio="none">
    <g stroke="#2a3f33" strokeWidth=".5" opacity=".07">
      {Array.from({ length: 12 }, (_, i) => <path key={i} d={`M0 ${i * 10 + 5}h120`} />)}
    </g>
  </svg>;
}

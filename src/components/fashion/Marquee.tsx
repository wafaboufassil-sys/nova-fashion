'use client';

export default function Marquee() {
  const words = [
    'FUTURISTIC DESIGN',
    '◆',
    'AI-POWERED FASHION',
    '◆',
    'LIMITED DROPS',
    '◆',
    'STREETWEAR REDEFINED',
    '◆',
    'NEON LUXURY',
    '◆',
    'NEXT-GEN STYLE',
    '◆',
    'DIGITAL COUTURE',
    '◆',
  ];

  return (
    <div className="relative overflow-hidden border-y border-white/5 bg-[#0a0014] py-5">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...words, ...words].map((word, i) => (
          <span
            key={i}
            className={`mx-6 text-sm font-light uppercase tracking-[0.3em] ${
              word === '◆'
                ? 'text-[#00d4ff] text-xs'
                : 'text-[rgba(240,240,255,0.3)] hover:text-[#00d4ff]'
            } transition-colors duration-300`}
          >
            {word}
          </span>
        ))}
      </div>

      {/* Gradient fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#0a0014] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#0a0014] to-transparent" />
    </div>
  );
}

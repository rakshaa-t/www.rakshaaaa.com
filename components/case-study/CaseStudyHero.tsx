"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface CaseStudyHeroProps {
  title: string;
  subtitle: string;
  role: string;
  duration: string;
  year: string;
  description: string;
  heroImage: string;
  backgroundColor?: string;
  accentColor?: string;
}

export const CaseStudyHero: React.FC<CaseStudyHeroProps> = ({
  title,
  subtitle,
  role,
  duration,
  year,
  description,
  heroImage,
  backgroundColor = '#F2F2F2',
  accentColor = '#1D3BF1'
}) => {
  return (
    <section className="relative min-h-[80vh] overflow-hidden" style={{ backgroundColor }}>
      {/* Background pattern */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'radial-gradient(rgba(0,0,0,0.03) 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />

      {/* Back button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="absolute left-6 top-6 z-20"
      >
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur-sm px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm hover:shadow-md transition-all hover:bg-white"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back</span>
        </Link>
      </motion.div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 pt-24 pb-16">
        {/* Meta info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap gap-3 mb-6"
        >
          <span
            className="px-3 py-1 rounded-full text-xs font-medium"
            style={{ backgroundColor: `${accentColor}20`, color: accentColor }}
          >
            {role}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-zinc-100 text-zinc-600">
            {duration}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-zinc-100 text-zinc-600">
            {year}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-6xl font-extrabold text-zinc-900 mb-2"
        >
          {title}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-2xl font-medium mb-6"
          style={{ color: accentColor }}
        >
          {subtitle}
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg text-zinc-600 max-w-2xl mb-12"
        >
          {description}
        </motion.p>

        {/* Hero image */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative w-full aspect-[16/9] rounded-[20px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.15)]"
        >
          <Image
            src={heroImage}
            alt={`${title} - ${subtitle}`}
            fill
            className="object-cover"
            sizes="(max-width: 1200px) 100vw, 1200px"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
};

export default CaseStudyHero;

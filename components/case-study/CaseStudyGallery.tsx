"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface CaseStudyGalleryProps {
  images: string[];
  title: string;
}

export const CaseStudyGallery: React.FC<CaseStudyGalleryProps> = ({
  images,
  title
}) => {
  if (!images || images.length === 0) return null;

  return (
    <section className="py-16">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-sm font-semibold uppercase tracking-wider text-zinc-400 mb-8"
      >
        Project Gallery
      </motion.h2>

      <div className="grid gap-6">
        {images.map((image, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="relative w-full aspect-[16/9] rounded-[20px] overflow-hidden bg-zinc-100 shadow-[0_8px_32px_rgba(0,0,0,0.08)]"
          >
            <Image
              src={image}
              alt={`${title} - Image ${i + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CaseStudyGallery;

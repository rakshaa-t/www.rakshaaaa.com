"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { CaseStudy } from '@/lib/case-studies-data';

interface CaseStudyNavProps {
  prev: CaseStudy | null;
  next: CaseStudy | null;
}

export const CaseStudyNav: React.FC<CaseStudyNavProps> = ({ prev, next }) => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="py-16 border-t border-zinc-100"
    >
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        {/* Previous */}
        {prev ? (
          <Link
            href={`/case-studies/${prev.slug}`}
            className="group flex-1 p-6 rounded-[16px] bg-zinc-50 hover:bg-zinc-100 transition-colors"
          >
            <div className="flex items-center gap-2 text-sm text-zinc-400 mb-2">
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              <span>Previous</span>
            </div>
            <p className="font-semibold text-zinc-900">{prev.title}</p>
            <p className="text-sm text-zinc-500">{prev.subtitle}</p>
          </Link>
        ) : (
          <div className="flex-1" />
        )}

        {/* Next */}
        {next ? (
          <Link
            href={`/case-studies/${next.slug}`}
            className="group flex-1 p-6 rounded-[16px] bg-zinc-50 hover:bg-zinc-100 transition-colors text-right"
          >
            <div className="flex items-center justify-end gap-2 text-sm text-zinc-400 mb-2">
              <span>Next</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
            <p className="font-semibold text-zinc-900">{next.title}</p>
            <p className="text-sm text-zinc-500">{next.subtitle}</p>
          </Link>
        ) : (
          <div className="flex-1" />
        )}
      </div>

      {/* Back to all projects */}
      <div className="mt-8 text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to all projects</span>
        </Link>
      </div>
    </motion.nav>
  );
};

export default CaseStudyNav;

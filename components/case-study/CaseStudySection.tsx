"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface CaseStudySectionProps {
  title: string;
  content: string;
  items?: string[];
  highlights?: string[];
  metrics?: { label: string; value: string }[];
  accentColor?: string;
  index?: number;
}

export const CaseStudySection: React.FC<CaseStudySectionProps> = ({
  title,
  content,
  items,
  highlights,
  metrics,
  accentColor = '#1D3BF1',
  index = 0
}) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="py-16 border-b border-zinc-100 last:border-0"
    >
      <div className="max-w-3xl">
        {/* Section title */}
        <h2
          className="text-sm font-semibold uppercase tracking-wider mb-4"
          style={{ color: accentColor }}
        >
          {title}
        </h2>

        {/* Main content */}
        <p className="text-xl text-zinc-700 leading-relaxed mb-8">
          {content}
        </p>

        {/* Process steps */}
        {items && items.length > 0 && (
          <div className="space-y-3">
            {items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex items-start gap-3"
              >
                <span
                  className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold text-white mt-0.5"
                  style={{ backgroundColor: accentColor }}
                >
                  {i + 1}
                </span>
                <p className="text-zinc-600">{item}</p>
              </motion.div>
            ))}
          </div>
        )}

        {/* Highlights */}
        {highlights && highlights.length > 0 && (
          <div className="grid gap-3 sm:grid-cols-2">
            {highlights.map((highlight, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="p-4 rounded-[14px] bg-zinc-50 border border-zinc-100"
              >
                <div
                  className="w-2 h-2 rounded-full mb-3"
                  style={{ backgroundColor: accentColor }}
                />
                <p className="text-sm text-zinc-700">{highlight}</p>
              </motion.div>
            ))}
          </div>
        )}

        {/* Metrics */}
        {metrics && metrics.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-3 mt-8">
            {metrics.map((metric, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="text-center p-6 rounded-[14px] bg-zinc-50"
              >
                <p
                  className="text-3xl font-bold mb-1"
                  style={{ color: accentColor }}
                >
                  {metric.value}
                </p>
                <p className="text-sm text-zinc-500">{metric.label}</p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default CaseStudySection;

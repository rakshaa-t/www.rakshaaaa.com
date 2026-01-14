import React from 'react';

export default function CaseStudyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F2F2F2]">
      {children}
    </div>
  );
}

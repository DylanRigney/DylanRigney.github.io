'use client'
import React from 'react';

export default function KanagawaBg() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-transparent">
      <style jsx>{`
        .composed-bg {
          position: absolute;
          inset: 0;
          background-image: url('/pastel-landscape.jpg');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }
      `}</style>
      
      {/* 
        The finalized pastel composed landscape.
      */}
      <div className="composed-bg" />
      
      {/* 
        A very faint overlay to ensure contrast, but light enough to let the pastel colors shine through.
      */}
      <div className="absolute inset-0 bg-transparent/10 pointer-events-none" />
    </div>
  );
}

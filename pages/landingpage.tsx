"use client";
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

export default function landingpage() {

  return (
    <main className="min-h-screen bg-[#0F172A] text-white font-sans">
      
     

      <Navbar />

     
      <section className="flex flex-col items-center justify-center text-center py-24 px-6">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-[#6E00FF] to-[#0096FF] bg-clip-text text-transparent mt-10">
          Find what others built. Create something better.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-gray-300">
          DevSparq helps indie developers find similar projects to what they're building, get inspired by real-world UI examples, and generate stunning custom SVG backgrounds all in one place.
        </p>
        <Link href="/findsimiliarprojects">
        <button   className="mt-10 cursor-pointer px-6 py-3 bg-gradient-to-r from-[#6E00FF] to-[#0096FF] text-white rounded-2xl text-lg font-medium shadow-lg hover:opacity-90 transition">
          Start Exploring
        </button>
        </Link>
        
      </section>

     
      <section id="what" className="py-20 px-6 bg-[#111827] text-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-6">
            What is DevSparq?
          </h2>
          <p className="text-lg text-gray-400">
            DevSpark helps indie developers find similar projects to what they're building, get inspired by real-world UI examples, and generate stunning custom SVG backgrounds all in one place. It's like having a design assistant that boosts creativity and visual polish without slowing you down.
          </p>
        </div>
      </section>

    
      <section id="features" className="py-20 px-6 bg-[#111827] text-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-center mb-16">
            What you can do with DevSparq
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-[#1F2937] p-6 rounded-2xl shadow-md">
              <h3 className="text-xl font-bold mb-2">Find Similar Projects</h3>
              <p className="text-gray-400">Discover real-world indie products similar to your idea and learn from their UI and structure.</p>
            </div>
            <div className="bg-[#1F2937] p-6 rounded-2xl shadow-md">
              <h3 className="text-xl font-bold mb-2">UI Inspiration Explorer</h3>
              <p className="text-gray-400">Browse through beautiful UI layouts and components to inspire your design process.</p>
            </div>
            <div className="bg-[#1F2937] p-6 rounded-2xl shadow-md">
              <h3 className="text-xl font-bold mb-2">Custom SVG Generator</h3>
              <p className="text-gray-400">Easily create eye-catching SVG backgrounds for your landing page or app with customization options.</p>
            </div>
          </div>
        </div>
      </section>

     
      <section className="py-20 px-6 bg-[#1F2937] text-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-6">
            Who It's For
          </h2>
          <p className="text-lg text-gray-400">
            Whether you're building your first side project or launching your 10th MVP, DevSparq gives you design clarity and creative momentum — fast.
          </p>
        </div>
      </section>

     
      <section id="cta" className="py-20 px-6 bg-gradient-to-r from-[#6E00FF] to-[#0096FF] text-center text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Stop staring at a blank canvas.
        </h2>
        <p className="mb-8 text-lg">Explore, get inspired, and build better — faster.</p>
        <button className="px-6 py-3 cursor-pointer bg-white text-[#0F172A] rounded-2xl font-semibold hover:bg-gray-200 transition">
          Try DevSpark Now
        </button>
      </section>

      <footer className="py-6 px-6 bg-[#111827] text-white text-center">
        <p className="text-sm text-gray-400">&copy; 2025 DevSparq. All rights reserved.</p>
      </footer>
    </main>
  );
}

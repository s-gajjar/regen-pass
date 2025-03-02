"use client";
import { cn } from "../../lib/utils";
import { motion } from "framer-motion";
import React from "react";
import { useNavigate } from "react-router-dom";
import useGlobalStorage from "../../store";
import ClerkAuth from "../ClerkAuth";

export function BackgroundLines({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("relative w-full", className)}>{children}</div>;
}

export function BackgroundLinesDemo() {
  const navigate = useNavigate();

  return (
    <BackgroundLines className="flex items-center justify-center w-full flex-col px-4 mt-[180px] sm:mt-[140px] md:mt-[160px] overflow-hidden relative">
      {/* Background image with gradient overlay */}
      <div className="absolute inset-0 w-full">
        <img
          className="absolute top-0 opacity-10 w-[120%] h-[120%] object-cover scale-125 transform-gpu"
          src="https://cdn.prod.website-files.com/669aeedffebb61f45e26347a/678eb7c9f8fcb0d17dbdaf48_ETHDEN2025_web_background_nopaper_header.webp"
          alt="bg"
          style={{
            transformOrigin: 'center',
            objectPosition: 'center 30%'
          }}
        />
        {/* Gradient overlay for fade effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white" />
      </div>

      {/* Content */}
       <section className="z-10 px-4 text-center pt-10 sm:pt-16">
         <div className="max-w-4xl mx-auto space-y-6 sm:space-y-10">
           {/* Badge */}
           <div className="inline-block px-5 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-sm sm:text-base font-medium text-white shadow-lg">
              Introducing RegenPass
          </div>
          
           {/* Heading */}
           <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 tracking-tight leading-tight max-w-4xl">
              Your Gateway to Regenerative Event Experiences
            </h1>

           {/* Description */}
           <p className="text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto">
             RegenPass transforms traditional event attendance into an immersive, interactive adventure that celebrates regeneration and innovation.
           </p>

           {/* CTA Buttons */}
          <div className="flex flex-row justify-center items-center gap-4 sm:gap-6 pt-4 sm:pt-8">
             <div className="relative w-full sm:w-auto min-w-[160px]">
               <ClerkAuth 
                 buttonText="Join RegenPass" 
                 appearance="custom"
                 className="w-full"
                />
              </div>

            <button className="w-full sm:w-auto min-w-[160px] bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 px-6 sm:px-8 py-3 rounded-full font-medium transition-all duration-300 text-base sm:text-lg text-black/80 hover:text-black hover:scale-105">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </BackgroundLines>
  );
}

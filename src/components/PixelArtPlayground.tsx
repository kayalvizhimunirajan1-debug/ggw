import React from 'react';

/**
 * PixelArtPlayground
 * Pure SVG + CSS retro 8-bit / 16-bit kindergarten playground sprites
 * Features:
 * - Happy Pixel Sun with smiling pixel face & spinning pixel beam rays
 * - Pixel Playground: Slide tower with ladder, wooden swing set swinging, teeter-totter seesaw, sandpit
 * - Pixel Kids animated running across the background behind the content
 */

export const PixelArtPlayground: React.FC = () => {
  return (
    <div 
      className="absolute inset-0 pointer-events-none overflow-hidden pixelated" 
      aria-hidden="true"
    >
      {/* ========================================================================= */}
      {/* 1. PIXEL SUN IN THE SKY (TOP RIGHT) */}
      {/* ========================================================================= */}
      <div className="absolute top-6 right-8 sm:top-10 sm:right-16 md:right-24 z-0">
        <div className="relative animate-pixel-sun-bounce">
          {/* Rotating Pixel Sun Rays */}
          <div className="w-24 h-24 sm:w-28 sm:h-28 animate-pixel-sun-spin">
            <svg 
              viewBox="0 0 48 48" 
              className="w-full h-full drop-shadow-[0_0_12px_rgba(251,191,36,0.5)]"
              shapeRendering="crispEdges"
            >
              {/* Outer 8-point pixel ray teeth */}
              {/* North ray */}
              <rect x="22" y="2" width="4" height="6" fill="#F59E0B" />
              <rect x="23" y="3" width="2" height="4" fill="#FDE047" />
              {/* South ray */}
              <rect x="22" y="40" width="4" height="6" fill="#F59E0B" />
              <rect x="23" y="41" width="2" height="4" fill="#FDE047" />
              {/* East ray */}
              <rect x="40" y="22" width="6" height="4" fill="#F59E0B" />
              <rect x="41" y="23" width="4" height="2" fill="#FDE047" />
              {/* West ray */}
              <rect x="2" y="22" width="6" height="4" fill="#F59E0B" />
              <rect x="3" y="23" width="4" height="2" fill="#FDE047" />
              {/* North-East ray */}
              <rect x="34" y="10" width="4" height="4" fill="#F59E0B" />
              <rect x="35" y="11" width="2" height="2" fill="#FDE047" />
              {/* North-West ray */}
              <rect x="10" y="10" width="4" height="4" fill="#F59E0B" />
              <rect x="11" y="11" width="2" height="2" fill="#FDE047" />
              {/* South-East ray */}
              <rect x="34" y="34" width="4" height="4" fill="#F59E0B" />
              <rect x="35" y="35" width="2" height="2" fill="#FDE047" />
              {/* South-West ray */}
              <rect x="10" y="34" width="4" height="4" fill="#F59E0B" />
              <rect x="11" y="35" width="2" height="2" fill="#FDE047" />
            </svg>
          </div>

          {/* Central Pixel Sun Face (Stays upright, smiling) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <svg 
              viewBox="0 0 32 32" 
              className="w-16 h-16 sm:w-20 sm:h-20"
              shapeRendering="crispEdges"
            >
              {/* Outer Sun Body - Stepped Pixel Circle */}
              <rect x="10" y="4" width="12" height="24" fill="#FBBF24" />
              <rect x="6" y="8" width="20" height="16" fill="#FBBF24" />
              <rect x="4" y="10" width="24" height="12" fill="#FBBF24" />
              
              {/* Inner Warm Center */}
              <rect x="11" y="6" width="10" height="20" fill="#FDE047" />
              <rect x="7" y="10" width="18" height="12" fill="#FDE047" />

              {/* Sun Highlights */}
              <rect x="8" y="8" width="4" height="2" fill="#FEF9C3" />
              <rect x="8" y="10" width="2" height="4" fill="#FEF9C3" />

              {/* Pixel Sunglasses / Happy Pixel Eyes */}
              <rect x="9" y="12" width="4" height="3" fill="#78350F" />
              <rect x="19" y="12" width="4" height="3" fill="#78350F" />
              {/* Eye sparkle */}
              <rect x="9" y="12" width="1" height="1" fill="#FFFFFF" />
              <rect x="19" y="12" width="1" height="1" fill="#FFFFFF" />

              {/* Rosy Pixel Cheeks */}
              <rect x="7" y="16" width="3" height="2" fill="#F472B6" />
              <rect x="22" y="16" width="3" height="2" fill="#F472B6" />

              {/* Sweet Pixel Smile */}
              <rect x="12" y="18" width="8" height="2" fill="#78350F" />
              <rect x="14" y="20" width="4" height="2" fill="#78350F" />
              <rect x="15" y="20" width="2" height="1" fill="#F43F5E" />
            </svg>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. PIXEL PLAYGROUND STRUCTURES (BOTTOM HORIZON) */}
      {/* ========================================================================= */}
      <div className="absolute bottom-6 left-0 right-0 h-40 overflow-hidden opacity-85 select-none">
        {/* Playground Base Grass Floor */}
        <div className="absolute bottom-0 left-0 right-0 h-7 bg-[#86EFAC] border-t-2 border-[#4ADE80]">
          <div className="w-full h-1 bg-[#22C55E]/40" />
          {/* Pixel Flower Tufts in Grass */}
          <div className="flex justify-around items-center h-full px-4 opacity-75">
            {/* Yellow Daisy Pixel */}
            <svg width="10" height="10" viewBox="0 0 10 10" shapeRendering="crispEdges">
              <rect x="4" y="2" width="2" height="6" fill="#FACC15" />
              <rect x="2" y="4" width="6" height="2" fill="#FACC15" />
              <rect x="4" y="4" width="2" height="2" fill="#FEF08A" />
            </svg>
            {/* Green Sprout Pixel */}
            <svg width="8" height="10" viewBox="0 0 8 10" shapeRendering="crispEdges">
              <rect x="3" y="4" width="2" height="6" fill="#15803D" />
              <rect x="1" y="2" width="2" height="2" fill="#4ADE80" />
              <rect x="5" y="3" width="2" height="2" fill="#4ADE80" />
            </svg>
            {/* Pink Blossom Pixel */}
            <svg width="10" height="10" viewBox="0 0 10 10" shapeRendering="crispEdges">
              <rect x="4" y="2" width="2" height="6" fill="#F472B6" />
              <rect x="2" y="4" width="6" height="2" fill="#F472B6" />
              <rect x="4" y="4" width="2" height="2" fill="#FDE047" />
            </svg>
            {/* Green Sprout Pixel */}
            <svg width="8" height="10" viewBox="0 0 8 10" shapeRendering="crispEdges">
              <rect x="3" y="4" width="2" height="6" fill="#15803D" />
              <rect x="1" y="2" width="2" height="2" fill="#4ADE80" />
              <rect x="5" y="3" width="2" height="2" fill="#4ADE80" />
            </svg>
            {/* Sunflower Pixel */}
            <svg width="12" height="12" viewBox="0 0 12 12" shapeRendering="crispEdges">
              <rect x="5" y="1" width="2" height="10" fill="#EAB308" />
              <rect x="1" y="5" width="10" height="2" fill="#EAB308" />
              <rect x="3" y="3" width="6" height="6" fill="#F59E0B" />
              <rect x="5" y="5" width="2" height="2" fill="#78350F" />
            </svg>
            {/* Green Sprout Pixel */}
            <svg width="8" height="10" viewBox="0 0 8 10" shapeRendering="crispEdges">
              <rect x="3" y="4" width="2" height="6" fill="#15803D" />
              <rect x="1" y="2" width="2" height="2" fill="#4ADE80" />
              <rect x="5" y="3" width="2" height="2" fill="#4ADE80" />
            </svg>
            {/* Tulip Pixel */}
            <svg width="10" height="12" viewBox="0 0 10 12" shapeRendering="crispEdges">
              <rect x="4" y="6" width="2" height="6" fill="#15803D" />
              <rect x="2" y="2" width="6" height="5" fill="#EF4444" />
              <rect x="4" y="2" width="2" height="3" fill="#FCA5A5" />
            </svg>
            {/* Green Sprout Pixel */}
            <svg width="8" height="10" viewBox="0 0 8 10" shapeRendering="crispEdges">
              <rect x="3" y="4" width="2" height="6" fill="#15803D" />
              <rect x="1" y="2" width="2" height="2" fill="#4ADE80" />
              <rect x="5" y="3" width="2" height="2" fill="#4ADE80" />
            </svg>
          </div>
        </div>

        {/* --- Structure A: Pixel Swing Set (Left side) --- */}
        <div className="absolute bottom-6 left-6 sm:left-14 w-28 h-28">
          <svg viewBox="0 0 64 64" className="w-full h-full" shapeRendering="crispEdges">
            {/* Wooden A-Frame Legs (Left & Right) */}
            {/* Left A-leg */}
            <line x1="8" y1="60" x2="20" y2="12" stroke="#92400E" strokeWidth="3" />
            <line x1="16" y1="60" x2="20" y2="12" stroke="#B45309" strokeWidth="2" />
            {/* Right A-leg */}
            <line x1="56" y1="60" x2="44" y2="12" stroke="#92400E" strokeWidth="3" />
            <line x1="48" y1="60" x2="44" y2="12" stroke="#B45309" strokeWidth="2" />
            {/* Top Beam */}
            <rect x="16" y="10" width="32" height="4" fill="#78350F" />
            <rect x="17" y="11" width="30" height="2" fill="#D97706" />

            {/* Swing 1 (Animated swinging) */}
            <g className="animate-pixel-swing" style={{ transformOrigin: '26px 12px' }}>
              {/* Chains */}
              <line x1="24" y1="14" x2="24" y2="44" stroke="#64748B" strokeWidth="1.5" strokeDasharray="2 1" />
              <line x1="28" y1="14" x2="28" y2="44" stroke="#64748B" strokeWidth="1.5" strokeDasharray="2 1" />
              {/* Seat */}
              <rect x="22" y="44" width="8" height="3" fill="#DC2626" />
              {/* Little Pixel Teddy bear on the swing */}
              <rect x="23" y="38" width="6" height="6" fill="#B45309" />
              <rect x="24" y="36" width="4" height="3" fill="#D97706" />
              <rect x="24" y="37" width="1" height="1" fill="#000" />
              <rect x="27" y="37" width="1" height="1" fill="#000" />
            </g>

            {/* Swing 2 (Gentle swing) */}
            <g className="animate-pixel-swing" style={{ transformOrigin: '38px 12px', animationDelay: '0.8s' }}>
              <line x1="36" y1="14" x2="36" y2="44" stroke="#64748B" strokeWidth="1.5" strokeDasharray="2 1" />
              <line x1="40" y1="14" x2="40" y2="44" stroke="#64748B" strokeWidth="1.5" strokeDasharray="2 1" />
              <rect x="34" y="44" width="8" height="3" fill="#2563EB" />
            </g>
          </svg>
        </div>

        {/* --- Structure B: Pixel Play Castle Slide Tower (Right side) --- */}
        <div className="absolute bottom-6 right-6 sm:right-16 w-36 h-32">
          <svg viewBox="0 0 80 70" className="w-full h-full" shapeRendering="crispEdges">
            {/* Castle Roof / Flag */}
            <polygon points="50,6 40,20 60,20" fill="#EF4444" />
            <rect x="49" y="1" width="2" height="7" fill="#78350F" />
            <polygon points="51,2 57,4 51,6" fill="#FBBF24" />

            {/* Platform / Cubby House */}
            <rect x="40" y="20" width="20" height="24" fill="#3B82F6" />
            {/* Window */}
            <rect x="46" y="24" width="8" height="8" fill="#FEF08A" />
            <rect x="49" y="24" width="2" height="8" fill="#1E3A8A" />
            <rect x="46" y="27" width="8" height="2" fill="#1E3A8A" />

            {/* Wooden Posts Supporting Tower */}
            <rect x="41" y="44" width="3" height="22" fill="#78350F" />
            <rect x="56" y="44" width="3" height="22" fill="#78350F" />

            {/* Ladder (Right) */}
            <rect x="62" y="24" width="2" height="42" fill="#92400E" />
            <rect x="68" y="24" width="2" height="42" fill="#92400E" />
            <rect x="62" y="30" width="8" height="2" fill="#B45309" />
            <rect x="62" y="38" width="8" height="2" fill="#B45309" />
            <rect x="62" y="46" width="8" height="2" fill="#B45309" />
            <rect x="62" y="54" width="8" height="2" fill="#B45309" />
            <rect x="62" y="62" width="8" height="2" fill="#B45309" />

            {/* Curved Pixel Slide (Yellow slide chute descending to left) */}
            {/* Top entry step */}
            <rect x="36" y="28" width="4" height="4" fill="#EAB308" />
            {/* Slide steps going down-left */}
            <rect x="32" y="31" width="5" height="4" fill="#FACC15" />
            <rect x="27" y="35" width="6" height="4" fill="#FACC15" />
            <rect x="22" y="40" width="6" height="4" fill="#FACC15" />
            <rect x="17" y="46" width="6" height="4" fill="#FACC15" />
            <rect x="12" y="53" width="7" height="4" fill="#FACC15" />
            <rect x="6" y="60" width="8" height="4" fill="#EAB308" />
            {/* Slide red handrails */}
            <rect x="31" y="29" width="6" height="2" fill="#DC2626" />
            <rect x="25" y="33" width="6" height="2" fill="#DC2626" />
            <rect x="20" y="38" width="6" height="2" fill="#DC2626" />
            <rect x="15" y="44" width="6" height="2" fill="#DC2626" />
            <rect x="10" y="51" width="6" height="2" fill="#DC2626" />
            <rect x="4" y="58" width="8" height="2" fill="#DC2626" />
          </svg>
        </div>

        {/* --- Structure C: Pixel Seesaw (Teeter-totter) in Mid-field --- */}
        <div className="hidden sm:block absolute bottom-6 left-1/2 -translate-x-1/2 w-28 h-16">
          <svg viewBox="0 0 64 36" className="w-full h-full" shapeRendering="crispEdges">
            {/* Center Fulcrum Triangle */}
            <polygon points="32,20 26,34 38,34" fill="#475569" />
            <circle cx="32" cy="20" r="2" fill="#CBD5E1" />

            {/* Seesaw Plank with Seats (Animated tilt) */}
            <g className="animate-pixel-seesaw">
              {/* Plank */}
              <rect x="6" y="18" width="52" height="4" fill="#D97706" />
              <rect x="8" y="19" width="48" height="2" fill="#FDE047" />

              {/* Left Handle & Seat */}
              <rect x="9" y="14" width="2" height="5" fill="#DC2626" />
              <rect x="7" y="13" width="6" height="2" fill="#DC2626" />
              {/* Left Passenger: Pixel Bunny */}
              <rect x="8" y="8" width="5" height="5" fill="#F1F5F9" />
              <rect x="9" y="5" width="1" height="4" fill="#F472B6" />
              <rect x="12" y="5" width="1" height="4" fill="#F472B6" />

              {/* Right Handle & Seat */}
              <rect x="53" y="14" width="2" height="5" fill="#2563EB" />
              <rect x="51" y="13" width="6" height="2" fill="#2563EB" />
              {/* Right Passenger: Pixel Duckling */}
              <rect x="52" y="8" width="5" height="5" fill="#FBBF24" />
              <rect x="50" y="10" width="2" height="2" fill="#F97316" />
            </g>
          </svg>
        </div>

        {/* --- Structure D: Pixel Sandcastle & Bucket (Far Left Center) --- */}
        <div className="hidden md:block absolute bottom-6 left-[28%] w-16 h-12">
          <svg viewBox="0 0 32 24" className="w-full h-full" shapeRendering="crispEdges">
            {/* Sand Mound */}
            <ellipse cx="16" cy="20" rx="12" ry="4" fill="#FDE68A" />
            <rect x="10" y="14" width="12" height="6" fill="#F59E0B" />
            <rect x="12" y="10" width="8" height="5" fill="#FDE68A" />
            <rect x="15" y="6" width="2" height="5" fill="#78350F" />
            <polygon points="17,6 22,8 17,10" fill="#EF4444" />
            {/* Red Bucket & Shovel */}
            <polygon points="4,16 8,16 7,22 5,22" fill="#EF4444" />
            <line x1="8" y1="18" x2="11" y2="13" stroke="#0284C7" strokeWidth="1.5" />
          </svg>
        </div>

        {/* --- Structure E: Pixel Garden Pinwheel (Right center) --- */}
        <div className="hidden lg:block absolute bottom-6 right-[28%] w-10 h-16">
          <svg viewBox="0 0 24 36" className="w-full h-full" shapeRendering="crispEdges">
            <rect x="11" y="12" width="2" height="24" fill="#78350F" />
            <g className="animate-pixel-pinwheel" style={{ transformOrigin: '12px 12px' }}>
              <polygon points="12,12 12,2 17,7" fill="#EF4444" />
              <polygon points="12,12 22,12 17,17" fill="#3B82F6" />
              <polygon points="12,12 12,22 7,17" fill="#10B981" />
              <polygon points="12,12 2,12 7,7" fill="#F59E0B" />
              <circle cx="12" cy="12" r="1.5" fill="#FEF08A" />
            </g>
          </svg>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. PIXEL KIDS RUNNING ACROSS THE PLAYGROUND (BACKGROUND HORIZON) */}
      {/* ========================================================================= */}
      
      {/* KID 1: Red Cap Boy running left-to-right (Chasing a soccer ball) */}
      <div className="absolute bottom-8 left-0 animate-kid-run-1 z-0">
        <div className="flex items-center gap-2 animate-kid-bobble">
          {/* Pixel Kid 1 Sprite */}
          <svg width="24" height="28" viewBox="0 0 24 28" shapeRendering="crispEdges">
            {/* Backward red cap */}
            <rect x="7" y="2" width="10" height="4" fill="#EF4444" />
            <rect x="4" y="4" width="4" height="2" fill="#DC2626" />
            {/* Hair */}
            <rect x="7" y="6" width="3" height="2" fill="#78350F" />
            {/* Face */}
            <rect x="10" y="6" width="7" height="6" fill="#FCD34D" />
            <rect x="15" y="8" width="1.5" height="1.5" fill="#1E293B" />
            <rect x="16" y="10" width="2" height="1" fill="#F43F5E" />
            {/* Yellow Shirt */}
            <rect x="8" y="12" width="9" height="7" fill="#FACC15" />
            {/* Pumping Arm */}
            <rect x="17" y="13" width="4" height="2.5" fill="#FCD34D" />
            <rect x="5" y="15" width="3" height="2.5" fill="#FCD34D" />
            {/* Blue Shorts */}
            <rect x="8" y="19" width="9" height="4" fill="#2563EB" />
            {/* Running legs */}
            <rect x="7" y="23" width="3" height="4" fill="#FCD34D" />
            <rect x="15" y="22" width="3" height="4" fill="#FCD34D" />
            {/* Red sneakers */}
            <rect x="6" y="26" width="5" height="2" fill="#EF4444" />
            <rect x="15" y="25" width="5" height="2" fill="#EF4444" />
          </svg>

          {/* Rolling Pixel Soccer Ball */}
          <div className="w-4 h-4 -mt-3">
            <svg viewBox="0 0 16 16" className="w-full h-full animate-spin" style={{ animationDuration: '0.8s' }} shapeRendering="crispEdges">
              <rect x="4" y="1" width="8" height="14" fill="#F8FAFC" />
              <rect x="1" y="4" width="14" height="8" fill="#F8FAFC" />
              <rect x="6" y="6" width="4" height="4" fill="#0F172A" />
              <rect x="2" y="7" width="2" height="2" fill="#0F172A" />
              <rect x="12" y="7" width="2" height="2" fill="#0F172A" />
              <rect x="7" y="2" width="2" height="2" fill="#0F172A" />
              <rect x="7" y="12" width="2" height="2" fill="#0F172A" />
            </svg>
          </div>
        </div>
      </div>

      {/* KID 2: Girl with Pigtails & Purple Dress running with Butterfly Net */}
      <div className="absolute bottom-9 left-0 animate-kid-run-2 z-0">
        <div className="flex items-center gap-1 animate-kid-bobble" style={{ animationDelay: '0.15s' }}>
          {/* Pixel Kid 2 Sprite */}
          <svg width="28" height="30" viewBox="0 0 28 30" shapeRendering="crispEdges">
            {/* Left Pigtail */}
            <rect x="4" y="6" width="3" height="4" fill="#92400E" />
            <rect x="3" y="10" width="3" height="3" fill="#F472B6" />
            {/* Right Pigtail */}
            <rect x="17" y="6" width="3" height="4" fill="#92400E" />
            <rect x="18" y="10" width="3" height="3" fill="#F472B6" />
            {/* Hair Head */}
            <rect x="7" y="3" width="10" height="6" fill="#92400E" />
            {/* Face */}
            <rect x="9" y="7" width="8" height="6" fill="#FED7AA" />
            <rect x="14" y="9" width="1.5" height="1.5" fill="#0F172A" />
            <rect x="15" y="11" width="2" height="1" fill="#FB7185" />
            {/* Purple Overall Dress */}
            <rect x="8" y="13" width="10" height="9" fill="#A855F7" />
            <rect x="10" y="13" width="6" height="3" fill="#C084FC" />
            {/* Arm holding butterfly net high */}
            <rect x="18" y="12" width="4" height="2" fill="#FED7AA" />
            <line x1="22" y1="13" x2="27" y2="4" stroke="#78350F" strokeWidth="1.5" />
            <ellipse cx="26" cy="3" rx="3" ry="3" fill="none" stroke="#38BDF8" strokeWidth="1" />
            <path d="M 23,3 Q 26,9 27,4" fill="rgba(56,189,248,0.3)" />
            {/* Running Legs */}
            <rect x="9" y="22" width="3" height="5" fill="#FED7AA" />
            <rect x="15" y="21" width="3" height="5" fill="#FED7AA" />
            {/* Mint green sneakers */}
            <rect x="8" y="27" width="5" height="2" fill="#34D399" />
            <rect x="15" y="26" width="5" height="2" fill="#34D399" />
          </svg>

          {/* Floating Pixel Butterfly fluttering ahead of her */}
          <div className="w-3.5 h-3.5 -mt-6 animate-pulse">
            <svg viewBox="0 0 12 12" className="w-full h-full" shapeRendering="crispEdges">
              <rect x="1" y="2" width="4" height="4" fill="#F43F5E" />
              <rect x="7" y="2" width="4" height="4" fill="#F43F5E" />
              <rect x="5" y="3" width="2" height="6" fill="#0F172A" />
              <rect x="2" y="7" width="3" height="3" fill="#FB7185" />
              <rect x="7" y="7" width="3" height="3" fill="#FB7185" />
            </svg>
          </div>
        </div>
      </div>

      {/* KID 3: Kid running right-to-left holding a Yellow Star Balloon */}
      <div className="absolute bottom-8 left-0 animate-kid-run-3 z-0">
        <div className="flex items-center gap-1 animate-kid-bobble" style={{ animationDelay: '0.25s' }}>
          {/* Pixel Kid 3 Sprite */}
          <svg width="24" height="28" viewBox="0 0 24 28" shapeRendering="crispEdges">
            {/* Black Curly Hair */}
            <rect x="7" y="2" width="10" height="6" fill="#1E293B" />
            {/* Face */}
            <rect x="9" y="6" width="8" height="6" fill="#BA794C" />
            <rect x="14" y="8" width="1.5" height="1.5" fill="#0F172A" />
            <rect x="15" y="10" width="2" height="1" fill="#991B1B" />
            {/* Green Striped Shirt */}
            <rect x="8" y="12" width="10" height="7" fill="#10B981" />
            <rect x="8" y="14" width="10" height="2" fill="#34D399" />
            {/* Blue Jeans */}
            <rect x="9" y="19" width="8" height="4" fill="#1D4ED8" />
            {/* Legs */}
            <rect x="8" y="23" width="3" height="4" fill="#BA794C" />
            <rect x="14" y="22" width="3" height="4" fill="#BA794C" />
            {/* Yellow Shoes */}
            <rect x="7" y="26" width="5" height="2" fill="#FBBF24" />
            <rect x="14" y="25" width="5" height="2" fill="#FBBF24" />
          </svg>

          {/* Trailing Yellow Balloon String & Star Balloon */}
          <div className="w-5 h-7 -mt-8 flex flex-col items-center">
            <svg viewBox="0 0 16 20" className="w-full h-full" shapeRendering="crispEdges">
              <polygon points="8,1 10,6 15,6 11,9 13,14 8,11 3,14 5,9 1,6 6,6" fill="#FDE047" />
              <polygon points="8,3 9,7 13,7 10,9 11,12 8,10 5,12 6,9 3,7 7,7" fill="#FEF08A" />
              <line x1="8" y1="14" x2="6" y2="20" stroke="#94A3B8" strokeWidth="1" strokeDasharray="1 1" />
            </svg>
          </div>
        </div>
      </div>

      {/* KID 4: Toddler in Dinosaur Onesie playfully stomping across */}
      <div className="absolute bottom-7 left-0 animate-kid-run-4 z-0">
        <div className="flex items-center gap-1 animate-kid-bobble" style={{ animationDelay: '0.08s' }}>
          {/* Pixel Dinosaur Kid Sprite */}
          <svg width="26" height="26" viewBox="0 0 26 26" shapeRendering="crispEdges">
            {/* Dino spikes along back & hood */}
            <rect x="4" y="2" width="2" height="3" fill="#F97316" />
            <rect x="6" y="5" width="2" height="3" fill="#F97316" />
            <rect x="4" y="10" width="2" height="3" fill="#F97316" />
            <rect x="2" y="15" width="2" height="3" fill="#F97316" />
            {/* Green Dino Hood & Onesie */}
            <rect x="7" y="3" width="11" height="9" fill="#15803D" />
            {/* Open face in hood */}
            <rect x="12" y="5" width="6" height="6" fill="#FED7AA" />
            <rect x="15" y="6" width="1.5" height="1.5" fill="#0F172A" />
            <rect x="16" y="8" width="2" height="1" fill="#F43F5E" />
            {/* Dino Body */}
            <rect x="6" y="12" width="12" height="8" fill="#16A34A" />
            <rect x="10" y="14" width="6" height="5" fill="#86EFAC" />
            {/* Stompy Legs */}
            <rect x="7" y="20" width="4" height="4" fill="#15803D" />
            <rect x="14" y="20" width="4" height="4" fill="#15803D" />
            {/* Dino claw feet */}
            <rect x="6" y="23" width="6" height="2" fill="#F97316" />
            <rect x="13" y="23" width="6" height="2" fill="#F97316" />
          </svg>
          <span className="text-[10px] font-bold text-emerald-800/70 -mt-4 font-mono">
            RAWR!
          </span>
        </div>
      </div>
    </div>
  );
};

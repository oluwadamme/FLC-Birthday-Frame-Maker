/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useEffect } from 'react';
import { CardState, TemplateTheme, AspectRatio, LogoType, ImageState } from '../types';
import {
  FlcLogo,
  InfinityPlugLogo,
  MetallicBalloon,
  AcrylicStroke,
  GrungeBottomBlock,
  GlitterOverlay,
  ConfettiBackground,
} from './CardAssets';
import { Upload, ZoomIn, ZoomOut, RotateCw, Move, Type, Eye, Trash2 } from 'lucide-react';

interface BirthdayCardProps {
  state: CardState;
  onChangeState: (updater: (prev: CardState) => CardState) => void;
  exportRef: React.RefObject<HTMLDivElement | null>;
}

export const BirthdayCard: React.FC<BirthdayCardProps> = ({ state, onChangeState, exportRef }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [imageOrigin, setImageOrigin] = useState({ x: 0, y: 0 });
  const frameRef = useRef<HTMLDivElement>(null);

  // Theme attributes lookup
  const getThemeData = (theme: TemplateTheme) => {
    switch (theme) {
      case 'sacred-teal':
        return {
          bg: '#004b52',
          primaryText: '#ffffff',
          accentText: '#79d4de',
          accentStroke: '#298e97',
          brushOverlay: '#11818a',
          badgeBg: '#00666e',
          badgeText: '#ffffff',
          bottomBrush: '#f9f9ff',
          label: 'Sacred Interval Teal'
        };
      case 'sacred-paper':
        return {
          bg: '#f9f9ff',
          primaryText: '#111c2d',
          accentText: '#00666e',
          accentStroke: '#bdc9ca',
          brushOverlay: '#298e97',
          badgeBg: '#e7eeff',
          badgeText: '#111c2d',
          bottomBrush: '#dee8ff',
          label: 'Sacred Interval Paper'
        };
      case 'flc-teal':
        return {
          bg: '#0f5962',
          primaryText: '#ffffff',
          accentText: '#ffe8b5',
          accentStroke: '#31a6b5',
          brushOverlay: '#248895',
          badgeBg: '#248895',
          badgeText: '#ffffff',
          bottomBrush: '#e9f5f6',
          label: 'FLC Teal'
        };
      case 'champagne-gold':
        return {
          bg: '#1f1b16',
          primaryText: '#fcfbf7',
          accentText: '#e3c578',
          accentStroke: '#ebdca8',
          brushOverlay: '#d4af37',
          badgeBg: '#cca125',
          badgeText: '#1f1b16',
          bottomBrush: '#f5f1e6',
          label: 'Champagne Gold'
        };
      case 'emerald-luxury':
        return {
          bg: '#042419',
          primaryText: '#f0faf6',
          accentText: '#e3b33d',
          accentStroke: '#5ea387',
          brushOverlay: '#cca125',
          badgeBg: '#e3b33d',
          badgeText: '#042419',
          bottomBrush: '#ebf5f1',
          label: 'Emerald Luxury'
        };
      case 'dark-charcoal':
        return {
          bg: '#171717',
          primaryText: '#ffffff',
          accentText: '#e5a590',
          accentStroke: '#6b7280',
          brushOverlay: '#e5a590',
          badgeBg: '#374151',
          badgeText: '#ffffff',
          bottomBrush: '#eaeaea',
          label: 'Dark Matte Charcoal'
        };
      case 'royal-blue':
      default:
        return {
          bg: '#081730',
          primaryText: '#ffffff',
          accentText: '#f0b848',
          accentStroke: '#cca125',
          brushOverlay: '#d4af37',
          badgeBg: '#d4af37',
          badgeText: '#081730',
          bottomBrush: '#f5eedb',
          label: 'Royal Blue (Default)'
        };
    }
  };

  const themeData = getThemeData(state.theme);
  const isLightTheme = state.theme === 'sacred-paper';

  // Mouse & Touch events for panning the inner image
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!state.image.url) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    setImageOrigin({ x: state.image.offsetX, y: state.image.offsetY });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !state.image.url) return;
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;
    
    // Scale movement according to zoom ratio to make dragging feel natural
    const scaleFactor = 1.8 / Math.max(state.image.zoom, 0.05);

    onChangeState((prev) => ({
      ...prev,
      image: {
        ...prev.image,
        offsetX: imageOrigin.x + dx * scaleFactor,
        offsetY: imageOrigin.y + dy * scaleFactor,
      },
    }));
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  // Touch event handlers for mobile devices
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!state.image.url || e.touches.length === 0) return;
    setIsDragging(true);
    const touch = e.touches[0];
    setDragStart({ x: touch.clientX, y: touch.clientY });
    setImageOrigin({ x: state.image.offsetX, y: state.image.offsetY });
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging || !state.image.url || e.touches.length === 0) return;
    const touch = e.touches[0];
    const dx = touch.clientX - dragStart.x;
    const dy = touch.clientY - dragStart.y;
    const scaleFactor = 1.8 / Math.max(state.image.zoom, 0.05);

    onChangeState((prev) => ({
      ...prev,
      image: {
        ...prev.image,
        offsetX: imageOrigin.x + dx * scaleFactor,
        offsetY: imageOrigin.y + dy * scaleFactor,
      },
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onChangeState((prev) => ({
          ...prev,
          image: {
            ...prev.image,
            url: event.target?.result as string,
            offsetX: 0,
            offsetY: 0,
            zoom: 1,
            rotate: 0,
          },
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    const el = document.getElementById('image-upload-input');
    el?.click();
  };

  // Drag and Drop handling on the frame area
  const [bDraggingOver, setBDraggingOver] = useState(false);
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setBDraggingOver(true);
  };
  const handleDragLeave = () => {
    setBDraggingOver(false);
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setBDraggingOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onChangeState((prev) => ({
          ...prev,
          image: {
            ...prev.image,
            url: event.target?.result as string,
            offsetX: 0,
            offsetY: 0,
            zoom: 1,
            rotate: 0,
          },
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChangeState((prev) => ({
      ...prev,
      image: {
        ...prev.image,
        url: null,
        offsetX: 0,
        offsetY: 0,
        zoom: 1,
        rotate: 0,
      }
    }));
  };

  // Dimensions of the high-res card to be compiled by html-to-image
  // portrait-4-5: 1080w x 1350h (perfect Instagram post proportion)
  // story-9-16: 1080w x 1920h (standard WhatsApp status / IG story proportion)
  const isStory = state.aspectRatio === 'story-9-16';
  const width = 1080;
  const height = isStory ? 1920 : 1350;

  // Render the logo based on configuration
  const renderLogoSection = () => {
    if (state.logoType === 'none') return null;
    const logoColor = state.theme === 'sacred-paper' 
      ? '#00666e' 
      : (state.theme === 'flc-teal' ? '#a4edf5' : '#ffffff');
    
    if (state.logoType === 'flc') {
      return <FlcLogo className="h-14" color={logoColor} />;
    }
    if (state.logoType === 'infinity-plug') {
      return <InfinityPlugLogo className="h-10" color={logoColor} />;
    }
    if (state.logoType === 'custom' && state.customLogoText) {
      return (
        <div 
          className="font-montserrat font-black tracking-widest uppercase leading-none border-b-2 pb-1 text-sm select-none"
          style={{ 
            borderColor: themeData.accentStroke,
            color: isLightTheme ? '#111c2d' : '#ffffff'
          }}
        >
          {state.customLogoText}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col items-center">
      {/* Aspect Ratio Display Badge */}
      <div className="mb-4 flex items-center justify-between w-full max-w-sm px-4 py-2 bg-slate-800/80 rounded-full border border-slate-700/50 backdrop-blur-sm shadow-md">
        <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 uppercase tracking-wider">
          <Eye className="w-4 h-4 text-emerald-400" /> Resolution: {width} × {height} ({isStory ? '9:16 Story' : '4:5 Feed'})
        </span>
        <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 shadow-inner">
          High-Res Canvas
        </span>
      </div>

      {/* 
        This is the container that houses the ACTUAL 1080px wide card.
        We scale this down visually using CSS scaling so that it fits nicely on any screen size.
        This allows html-to-image to snapshot it at gorgeous full details!
      */}
      <div 
        className="relative overflow-visible rounded-xl card-canvas-shadow border border-slate-700/30 bg-slate-950/20"
        style={{
          width: '100%',
          maxWidth: '380px',
          aspectRatio: isStory ? '9/16' : '4/5',
        }}
      >
        {/* CSS Scaler wrapper */}
        <div 
          className="absolute origin-top-left overflow-hidden bg-slate-900 rounded-lg"
          style={{
            width: `${width}px`,
            height: `${height}px`,
            // Formula to map 1080px down to container width (e.g., 380px)
            transform: `scale(${380 / 1080})`,
            // Prevent anti-aliasing fuzziness in preview
            imageRendering: 'crisp-edges',
          }}
        >
          {/* THE MASTER CARD COMPONENT to be exported */}
          <div
            id="birthday-card-canvas"
            ref={exportRef}
            className="relative w-full h-full flex flex-col font-sans select-none overflow-hidden transition-all duration-300"
            style={{
              backgroundColor: state.useCustomBackground ? state.customBackgroundHex : themeData.bg,
              width: `${width}px`,
              height: `${height}px`,
            }}
          >
            {/* 1. Ambient Sparkle & Glitter Background Overlay */}
            {state.glitterEnabled && (
              <GlitterOverlay colorMode={state.confettiColor} className="opacity-90" />
            )}

            {/* 2. Top Banner Header (Brands, Logos and Custom Badges) */}
            <div className="absolute top-[50px] left-[65px] right-[65px] flex items-center justify-between z-30">
              {/* Brand Logo Container */}
              <div className="flex items-center">
                {renderLogoSection()}
              </div>

              {/* Status Custom Badge (e.g., "PRODUCTION") */}
              {state.showBadge && state.badgeText && (
                <div
                  className="px-4 py-1.5 rounded-md font-montserrat text-xs tracking-widest font-black uppercase shadow-lg select-none"
                  style={{
                    backgroundColor: state.theme === 'flc-teal' ? '#a4edf5' : themeData.badgeBg,
                    color: state.theme === 'flc-teal' ? '#116e7a' : themeData.badgeText,
                    border: state.theme === 'flc-teal' ? 'none' : '1px solid rgba(255,255,255,0.4)',
                  }}
                >
                  {state.badgeText}
                </div>
              )}
            </div>

            {/* 3. Floating Metallic Balloons - Decorative Backdrop elements */}
            <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
              {/* Left Balloon cluster */}
              {state.balloonCount >= 1 && (
                <MetallicBalloon
                  colorStyle={state.balloonStyle}
                  size={195}
                  className="absolute left-[-25px] top-[480px] opacity-95 filter drop-shadow-[5px_15px_15px_rgba(0,0,0,0.5)] transform animate-pulse duration-200"
                  tiltAngle={-8}
                />
              )}
              {state.balloonCount >= 2 && (
                <MetallicBalloon
                  colorStyle={state.balloonStyle}
                  size={155}
                  className="absolute left-[-45px] top-[590px] opacity-90 filter drop-shadow-[5px_15px_15px_rgba(0,0,0,0.4)]"
                  tiltAngle={12}
                />
              )}

              {/* Right Balloon cluster (Primary stack as shown in mock) */}
              {state.balloonCount >= 3 && (
                <MetallicBalloon
                  colorStyle={state.balloonStyle}
                  size={245}
                  className="absolute right-[65px] top-[300px] z-20 filter drop-shadow-[15px_20px_20px_rgba(0,0,0,0.6)]"
                  tiltAngle={10}
                />
              )}
              {state.balloonCount >= 4 && (
                <MetallicBalloon
                  colorStyle={state.balloonStyle}
                  size={220}
                  className="absolute right-[215px] top-[345px] z-10 filter drop-shadow-[10px_15px_15px_rgba(0,0,0,0.5)]"
                  tiltAngle={-15}
                />
              )}
              {state.balloonCount >= 5 && (
                <MetallicBalloon
                  colorStyle={state.balloonStyle}
                  size={175}
                  className="absolute right-[-40px] top-[380px] z-10 opacity-90 filter drop-shadow-[10px_15px_15px_rgba(0,0,0,0.4)]"
                  tiltAngle={15}
                />
              )}
            </div>

            {/* 4. Elegant Text Headers - HAPPY BIRTHDAY */}
            <div className="relative text-center mt-[145px] z-20 select-none">
              <div
                className="font-marker uppercase tracking-wider leading-[1.05]"
                style={{
                  fontSize: '92px',
                  color: themeData.accentText,
                  textShadow: isLightTheme ? 'none' : '3px 6px 12px rgba(0,0,0,0.55), 0 0 40px rgba(0,0,0,0.1)',
                  WebkitTextStroke: isLightTheme ? 'none' : '1px rgba(255,255,255,0.15)',
                }}
              >
                HAPPY
              </div>
              <div
                className="font-marker uppercase tracking-widest leading-[1.05] mt-[-5px]"
                style={{
                  fontSize: '98px',
                  color: themeData.accentText,
                  textShadow: isLightTheme ? 'none' : '3px 6px 12px rgba(0,0,0,0.55), 0 0 40px rgba(0,0,0,0.1)',
                  WebkitTextStroke: isLightTheme ? 'none' : '1px rgba(255,255,255,0.15)',
                }}
              >
                BIRTHDAY
              </div>
            </div>

            {/* 4.5 Confetti Background layer positioned behind the main frame */}
            {state.glitterEnabled && (
              <ConfettiBackground 
                colorMode={state.confettiColor} 
                isStory={isStory} 
                className="absolute inset-0"
                style={{ zIndex: 15 }}
              />
            )}

            {/* 5. Central Portrait Image Viewport & Frame Container */}
            <div 
              className={`absolute left-[165px] top-[365px] w-[560px] h-[730px] z-20 bg-slate-900 transition-colors shadow-[0_20px_50px_rgba(0,0,0,0.7)]`}
              style={{
                border: isLightTheme ? '24px solid #111c2d' : '24px solid #000000',
                outline: `1.5px solid ${themeData.accentStroke}`,
              }}
            >
              {/* Frame Paint Acrylic Overlay top accent */}
              {state.showTopGoldAccent && (
                <div className="absolute top-[-36px] left-[15%] right-[15%] h-[20px] z-40 pointer-events-none">
                  <AcrylicStroke color={themeData.brushOverlay} />
                </div>
              )}

              {/* Active editing interactive area / Crop Window */}
              <div
                ref={frameRef}
                className={`relative w-full h-full overflow-hidden cursor-grab active:cursor-grabbing select-none group flex items-center justify-center ${
                  bDraggingOver ? 'bg-slate-800' : 'bg-slate-950'
                }`}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUpOrLeave}
                onMouseLeave={handleMouseUpOrLeave}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleMouseUpOrLeave}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {state.image.url ? (
                  <>
                    <img
                      src={state.image.url}
                      alt="Celebrant profile"
                      className="max-w-none origin-center pointer-events-none select-none"
                      referrerPolicy="no-referrer"
                      style={{
                        transform: `translate(${state.image.offsetX}px, ${state.image.offsetY}px) scale(${state.image.zoom}) rotate(${state.image.rotate}deg)`,
                      }}
                    />
                    
                    {/* Visual drag hints overlay */}
                    <div className="absolute inset-x-0 bottom-0 py-3 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none duration-200">
                      <Move className="w-4 h-4 text-slate-300" />
                      <span className="text-[10px] font-sans font-medium text-slate-200 tracking-wider uppercase">Drag to reposition photo</span>
                    </div>

                    {/* Delete Photo hover button */}
                    <button
                      onClick={removePhoto}
                      className="absolute top-3 right-3 p-1.5 rounded-full bg-red-600/90 text-white shadow-md hover:bg-red-700 transition"
                      title="Remove image"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  <div 
                    onClick={triggerFileInput}
                    className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center cursor-pointer hover:bg-slate-900/80 transition group"
                  >
                    <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition duration-300 border border-white/20">
                      <Upload className="w-8 h-8 text-slate-100" />
                    </div>
                    <span className="text-sm font-semibold tracking-wide text-slate-200">
                      Upload Celebrant Photo
                    </span>
                    <span className="text-xs text-slate-400 mt-2 max-w-xs font-light leading-relaxed">
                      Click to browse or drag and drop PNG/JPEG file here
                    </span>
                  </div>
                )}
              </div>

              {/* Input fallback hidden file selector */}
              <input
                id="image-upload-input"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

            {/* 6. Dynamic Month and Day Badge Overlays (As styled in mock JUNE 12) */}
            <div className="absolute right-[65px] top-[740px] z-30 select-none text-right flex flex-col items-end leading-none">
              <div
                className="font-marker uppercase tracking-widest leading-none"
                style={{
                  fontSize: '56px',
                  color: themeData.accentText,
                  filter: isLightTheme ? 'none' : 'drop-shadow(3px 5px 5px rgba(0,0,0,0.6))',
                }}
              >
                {state.celebrantMonth}
              </div>
              <div
                className="font-montserrat font-extrabold leading-none tracking-tighter mt-[-4px]"
                style={{
                  fontSize: '92px',
                  color: isLightTheme ? '#111c2d' : '#ffffff',
                  filter: isLightTheme ? 'none' : 'drop-shadow(5px 8px 10px rgba(0,0,0,0.7))',
                }}
              >
                {state.celebrantDay}
              </div>
            </div>

            {/* 7. Celebrant Name Signature Overlay (e.g., Louisiana at frame bottom-left) */}
            <div 
              className="absolute left-[135px] z-30 select-none origin-bottom-left"
              style={{
                // Base Y coordinate around frame bottom (e.g. 1060px) + custom vertical adjustment slider
                top: `${1045 + state.nameYShift}px`,
                transform: 'rotate(-4deg)',
              }}
            >
              <h2
                className="font-script leading-none tracking-wide text-nowrap select-none filter"
                style={{
                  fontSize: `${state.nameFontSize}px`,
                  color: (isLightTheme && (state.nameColor === '#ffffff' || state.nameColor === '#fff')) ? '#00666e' : (state.nameColor || '#ffffff'),
                  filter: isLightTheme ? 'none' : 'drop-shadow(1px 2px 8px rgba(0,0,0,0.8))',
                }}
              >
                {state.celebrantName || 'Louisiana'}
              </h2>
            </div>

            {/* 8. Bottom Message details and Brush blocks */}
            {/* Custom Warm Message text */}
            <div className="absolute left-[80px] right-[80px] bottom-[115px] z-30 select-none text-center px-4">
              <p
                className={`w-full text-center leading-relaxed tracking-wide antialiased transition-all ${
                  isLightTheme ? '' : 'drop-shadow-[1px_2px_5px_rgba(0,0,0,0.5)]'
                } ${
                  state.messageFont === 'serif' ? 'font-serif italic' : state.messageFont === 'script' ? 'font-script text-3xl' : 'font-sans font-light text-md'
                }`}
                style={{
                  fontSize: state.messageFont === 'script' ? '32px' : '22px',
                  color: themeData.primaryText,
                }}
              >
                "{state.customMessage || 'Welcome to your best year yet!'}"
              </p>
            </div>

            {/* Rustic cream grunge bottom brush block */}
            {state.showBottomBrush && (
              <div className="absolute bottom-0 right-0 w-[450px] z-10 pointer-events-none opacity-95">
                <GrungeBottomBlock color={themeData.bottomBrush} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

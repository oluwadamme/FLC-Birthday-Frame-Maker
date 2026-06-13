/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { CardState, TemplateTheme, AspectRatio, LogoType } from './types';
import { BirthdayCard } from './components/BirthdayCard';
import { FlcLogo } from './components/CardAssets';
import * as htmlToImage from 'html-to-image';
import { 
  Download, 
  Sparkles, 
  Settings2, 
  Calendar, 
  User, 
  Image as ImageIcon, 
  RotateCcw, 
  Instagram, 
  Layout, 
  Palette,
  CheckCircle2, 
  Heart,
  Loader2,
  Info,
  Type,
  Upload
} from 'lucide-react';

const INITIAL_STATE: CardState = {
  theme: 'sacred-teal',
  aspectRatio: 'portrait-4-5',
  celebrantName: 'Louisiana',
  nameFontSize: 135,
  nameColor: '#79d4de',
  nameYShift: 0,
  celebrantMonth: 'JUNE',
  celebrantDay: '12',
  customMessage: 'Welcome to your best year yet!',
  messageFont: 'serif',
  image: {
    url: null,
    zoom: 1.0,
    offsetX: 0,
    offsetY: 0,
    rotate: 0,
  },
  logoType: 'flc',
  customLogoText: 'FLC',
  badgeText: 'FAITHFUL',
  showBadge: false,
  balloonCount: 4,
  balloonStyle: 'teal',
  glitterEnabled: true,
  confettiColor: 'teal',
  brushOverlayColor: '#11818a',
  showBottomBrush: true,
  showTopGoldAccent: true,
  customBackgroundHex: '#004b52',
  useCustomBackground: false,
};

export default function App() {
  const [state, setState] = useState<CardState>(INITIAL_STATE);
  const [activeTab, setActiveTab] = useState<'content' | 'adjust' | 'theme' | 'decor'>('content');
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);
  const exportRef = useRef<HTMLDivElement | null>(null);

  // Helper utility to safely update card state using a functional callback
  const handleUpdateState = (updater: (prev: CardState) => CardState) => {
    setState(updater);
  };

  // Safe handler for standard direct updates
  const setDirectState = <K extends keyof CardState>(key: K, value: CardState[K]) => {
    setState((prev) => ({ ...prev, [key]: value }));
  };

  const handleNestedImageUpdate = <K extends keyof CardState['image']>(key: K, value: CardState['image'][K]) => {
    setState((prev) => ({
      ...prev,
      image: {
        ...prev.image,
        [key]: value,
      },
    }));
  };

  // Handle PNG Image Generation & Local Download Trigger
  const handleDownloadPNG = () => {
    if (!exportRef.current) return;
    setIsExporting(true);
    setExportSuccess(false);

    // Wait a brief moment to allow rendering cycles to resolve perfectly
    setTimeout(() => {
      const scaleMultiplier = 2; // Renders the output at 2x resolution (e.g. 2160w x 2700h) for pristine print quality!
      htmlToImage.toPng(exportRef.current!, {
        quality: 1.0,
        pixelRatio: scaleMultiplier,
        style: {
          transform: 'scale(1)',
          transformOrigin: 'top left',
        },
      })
      .then((dataUrl) => {
        const celebrantSlug = state.celebrantName.trim().toLowerCase().replace(/[^a-z0-9]+/g, '_') || 'celebrant';
        const filename = `Birthday_${celebrantSlug}_${state.celebrantMonth.trim().toLowerCase()}_${state.celebrantDay}.png`;
        
        const link = document.createElement('a');
        link.download = filename;
        link.href = dataUrl;
        link.click();
        
        setIsExporting(false);
        setExportSuccess(true);
        setTimeout(() => setExportSuccess(false), 5000);
      })
      .catch((err) => {
        console.error('Failed to generate card PNG:', err);
        setIsExporting(false);
        alert('Could not export high quality image. Please make sure the celebrant photo uploaded is a valid standard file.');
      });
    }, 500);
  };

  // Preloaded templates definitions
  const applyPresetTemplate = (themeName: TemplateTheme) => {
    setState((prev) => {
      let updated = { ...prev, theme: themeName, useCustomBackground: false };
      
      // Fine-tune individual parameters depending on the theme preset style to make it look extraordinary
      if (themeName === 'sacred-teal') {
        updated.balloonStyle = 'teal';
        updated.nameColor = '#79d4de';
        updated.logoType = 'flc';
        updated.confettiColor = 'teal';
        updated.glitterEnabled = true;
        updated.showBottomBrush = true;
        updated.showTopGoldAccent = true;
      } else if (themeName === 'sacred-paper') {
        updated.balloonStyle = 'teal';
        updated.nameColor = '#00666e';
        updated.logoType = 'flc';
        updated.confettiColor = 'teal';
        updated.glitterEnabled = false;
        updated.showBottomBrush = false;
        updated.showTopGoldAccent = true;
      } else if (themeName === 'flc-teal') {
        updated.balloonStyle = 'teal';
        updated.nameColor = '#ffffff';
        updated.logoType = 'flc';
        updated.confettiColor = 'teal';
      } else if (themeName === 'champagne-gold') {
        updated.balloonStyle = 'gold';
        updated.nameColor = '#ffd700';
        updated.logoType = 'flc';
        updated.confettiColor = 'gold';
      } else if (themeName === 'emerald-luxury') {
        updated.balloonStyle = 'gold';
        updated.nameColor = '#f0fdf4';
        updated.logoType = 'flc';
        updated.customLogoText = 'FLC';
        updated.confettiColor = 'gold';
      } else if (themeName === 'dark-charcoal') {
        updated.balloonStyle = 'silver';
        updated.nameColor = '#ffffff';
        updated.logoType = 'flc';
        updated.confettiColor = 'white';
      } else {
        // Royal Blue (Matches user sample)
        updated.balloonStyle = 'rose-gold';
        updated.nameColor = '#ffffff';
        updated.logoType = 'flc';
        updated.confettiColor = 'gold';
      }
      return updated;
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans select-none antialiased">
      {/* 1. Header Toolbar */}
      <header className="bg-slate-900/90 border-b border-slate-800/80 sticky top-0 z-50 backdrop-blur-md px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center border-r border-slate-800/60 pr-5 h-12">
            <FlcLogo className="h-11" color="#248895" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-wider text-white uppercase font-sans">
                Birthday Studio
              </span>
              <span className="text-[10px] uppercase font-black bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded">
                v2.1 PRO
              </span>
            </div>
            <p className="text-xs text-slate-400 font-light mt-0.5">
              Design and download high-resolution birthday flyers for stories & status updates
            </p>
          </div>
        </div>


      </header>

      {/* 2. Main Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left column: Card interactive Canvas preview area (4/5 cols) */}
        <div className="lg:col-span-5 flex flex-col items-center justify-start bg-slate-900/40 border border-slate-800/60 rounded-2xl p-6 lg:p-8 relative shadow-lg">
          <div className="absolute top-4 left-4 flex items-center gap-1 bg-slate-900/80 px-3 py-1 rounded-full border border-slate-800 shadow-sm z-30">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">Editor Workspace</span>
          </div>

          <div className="w-full flex-1 flex items-center justify-center py-4">
            <BirthdayCard 
              state={state} 
              onChangeState={handleUpdateState} 
              exportRef={exportRef} 
            />
          </div>

          {/* Quick helpful notice below preview */}
          <div className="mt-4 p-3 bg-slate-950/60 border border-slate-800/40 rounded-xl text-xs text-slate-400 text-center max-w-sm flex items-center gap-2.5 shadow-inner">
            <Info className="w-4 h-4 text-[#248895] shrink-0" />
            <span>
              <strong>Tip:</strong> Click and drag directly on the portrait photo to pan/adjust positioning perfectly inside the frame!
            </span>
          </div>
        </div>

        {/* Right column: Form customizer controls (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900/40 border border-slate-800/60 rounded-2xl flex flex-col overflow-hidden shadow-lg">
          
          {/* Quick tab switch buttons */}
          <div className="grid grid-cols-4 bg-slate-950/70 border-b border-slate-800/80 p-1">
            <button
              onClick={() => setActiveTab('content')}
              className={`py-3 px-1 text-xs sm:text-sm font-semibold flex flex-col sm:flex-row items-center justify-center gap-1.5 transition ${
                activeTab === 'content'
                  ? 'bg-slate-800 text-white rounded-lg shadow-sm border border-slate-700/50'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Details</span>
            </button>
            <button
              onClick={() => setActiveTab('adjust')}
              className={`py-3 px-1 text-xs sm:text-sm font-semibold flex flex-col sm:flex-row items-center justify-center gap-1.5 transition ${
                activeTab === 'adjust'
                  ? 'bg-slate-800 text-white rounded-lg shadow-sm border border-slate-700/50'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              <span>Photo</span>
            </button>
            <button
              onClick={() => setActiveTab('theme')}
              className={`py-3 px-1 text-xs sm:text-sm font-semibold flex flex-col sm:flex-row items-center justify-center gap-1.5 transition ${
                activeTab === 'theme'
                  ? 'bg-slate-800 text-white rounded-lg shadow-sm border border-slate-700/50'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Palette className="w-4 h-4" />
              <span>Theme</span>
            </button>
            <button
              onClick={() => setActiveTab('decor')}
              className={`py-3 px-1 text-xs sm:text-sm font-semibold flex flex-col sm:flex-row items-center justify-center gap-1.5 transition ${
                activeTab === 'decor'
                  ? 'bg-slate-800 text-white rounded-lg shadow-sm border border-slate-700/50'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Settings2 className="w-4 h-4" />
              <span>Decors</span>
            </button>
          </div>

          {/* Tab content area */}
          <div className="flex-1 p-6 overflow-y-auto space-y-6 max-h-[580px]">
            
            {/* TAB 1: IDENTITY & CELEBRANT DETAILS */}
            {activeTab === 'content' && (
              <div className="space-y-5 animate-fade-in">
                <div className="border-b border-slate-800 pb-3">
                  <h3 className="text-md font-bold text-white flex items-center gap-2">
                    <User className="w-4 h-4 text-[#248895]" /> 1. Celebrant Name & Signature
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Set the name that floats beautifully at the bottom left-side corner
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      Celebrant Name
                    </label>
                    <input
                      type="text"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-[#248895] transition"
                      value={state.celebrantName}
                      placeholder="e.g. Louisiana"
                      onChange={(e) => setDirectState('celebrantName', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      Signature Color
                    </label>
                    <div className="flex gap-2 items-center">
                      <input
                        type="color"
                        className="w-12 h-11 bg-slate-950 border border-slate-800 rounded-xl cursor-pointer p-1"
                        value={state.nameColor}
                        onChange={(e) => setDirectState('nameColor', e.target.value)}
                      />
                      <input
                        type="text"
                        className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-sm text-slate-300 font-mono tracking-widest focus:outline-none"
                        value={state.nameColor}
                        onChange={(e) => setDirectState('nameColor', e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Signature Size
                      </label>
                      <span className="text-xs font-mono font-bold text-slate-400">{state.nameFontSize}px</span>
                    </div>
                    <input
                      type="range"
                      min="90"
                      max="175"
                      step="5"
                      value={state.nameFontSize}
                      className="w-full accent-[#248895] bg-slate-950 rounded-lg appearance-none h-2 cursor-pointer"
                      onChange={(e) => setDirectState('nameFontSize', Number(e.target.value))}
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Signature Vertical Position (Nudge)
                      </label>
                      <span className="text-xs font-mono font-bold text-slate-400">Y: {state.nameYShift}px</span>
                    </div>
                    <input
                      type="range"
                      min="-40"
                      max="40"
                      step="2"
                      value={state.nameYShift}
                      className="w-full accent-[#248895] bg-slate-950 rounded-lg appearance-none h-2 cursor-pointer"
                      onChange={(e) => setDirectState('nameYShift', Number(e.target.value))}
                    />
                  </div>
                </div>

                <div className="border-b border-slate-800 pb-3 pt-4">
                  <h3 className="text-md font-bold text-white flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#248895]" /> 2. Birthday Date Stamp
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Set the big bold painted date stamp visible on the right of the photo frame
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      Month
                    </label>
                    <select
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-[#248895]"
                      value={state.celebrantMonth}
                      onChange={(e) => setDirectState('celebrantMonth', e.target.value)}
                    >
                      {['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUNE', 'JULY', 'AUG', 'SEPT', 'OCT', 'NOV', 'DEC'].map((m) => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      Day
                    </label>
                    <input
                      type="text"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 text-center font-bold"
                      value={state.celebrantDay}
                      maxLength={3}
                      placeholder="e.g. 12"
                      onChange={(e) => setDirectState('celebrantDay', e.target.value)}
                    />
                  </div>
                </div>

                <div className="border-b border-slate-800 pb-3 pt-4">
                  <h3 className="text-md font-bold text-white flex items-center gap-2">
                    <Type className="w-4 h-4 text-[#248895]" /> 3. Bottom Greetings & Prose
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Custom statement or prose printed beautifully under the central frame
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      Personalized Message
                    </label>
                    <textarea
                      rows={2}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-slate-100 text-sm focus:outline-none focus:border-[#248895]"
                      value={state.customMessage}
                      onChange={(e) => setDirectState('customMessage', e.target.value)}
                      placeholder="e.g. Welcome to your best year yet!"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      Message Font Style
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'serif', label: 'Classic Serif' },
                        { id: 'sans', label: 'Modern Sans' },
                        { id: 'script', label: 'Elegant Script' },
                      ].map((fontOpt) => (
                        <button
                          key={fontOpt.id}
                          className={`py-2 px-3 rounded-lg border text-xs font-medium transition ${
                            state.messageFont === fontOpt.id
                              ? 'bg-slate-800 border-[#248895] text-white font-semibold'
                              : 'bg-slate-950 border-slate-850 text-slate-400 hover:text-white'
                          }`}
                          onClick={() => setDirectState('messageFont', fontOpt.id as any)}
                        >
                          {fontOpt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: PORTRAIT PHOTO SETTINGS */}
            {activeTab === 'adjust' && (
              <div className="space-y-5 animate-fade-in">
                <div className="border-b border-slate-800 pb-3">
                  <h3 className="text-md font-bold text-white flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-[#248895]" /> Celebrant Photo Upload & Alignment
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Upload a high resolution JPG or PNG. Reposition it by clicking & dragging inside the photo frame!
                  </p>
                </div>

                <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 text-center">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                    Selected Image
                  </label>
                  {state.image.url ? (
                    <div className="flex flex-col items-center gap-3">
                      <div className="flex items-center gap-2.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow" />
                        <span className="text-xs font-semibold text-slate-300">Photo Loaded Successfully</span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            const el = document.getElementById('image-upload-input');
                            el?.click();
                          }}
                          className="bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold px-4 py-2 rounded-xl border border-slate-700/60 transition"
                        >
                          Replace Photo
                        </button>
                        <button
                          onClick={() => {
                            setState((prev) => ({
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
                          }}
                          className="bg-red-950 hover:bg-red-900 border border-red-500/10 text-red-400 text-xs font-semibold px-4 py-2 rounded-xl transition"
                        >
                          Clear
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <button
                        onClick={() => {
                          const el = document.getElementById('image-upload-input');
                          el?.click();
                        }}
                        className="bg-[#248895] hover:bg-[#1a6e79] text-white text-xs font-semibold px-6 py-3 rounded-xl shadow-lg transition flex items-center gap-2"
                      >
                        <Upload className="w-4 h-4" /> Choose File on Device
                      </button>
                      <span className="text-[10px] text-slate-500 mt-2 font-mono">Supports JPG, PNG, WEBP</span>
                    </div>
                  )}
                </div>

                {/* Adjustment Sliders in case manual precision tweaking is needed */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Manual Fine-Tuning Controls</span>
                    <button
                      onClick={() => {
                        setState((prev) => ({
                          ...prev,
                          image: {
                            ...prev.image,
                            offsetX: 0,
                            offsetY: 0,
                            zoom: 1.0,
                            rotate: 0,
                          }
                        }));
                      }}
                      className="text-[10px] font-bold text-slate-400 flex items-center gap-1 hover:text-white transition uppercase"
                    >
                      <RotateCcw className="w-3.5 h-3.5" /> Reset Positioning
                    </button>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="text-xs font-medium text-slate-400">Position Scale (Zoom)</label>
                      <span className="text-xs font-mono text-slate-400 font-semibold">{state.image.zoom.toFixed(2)}x</span>
                    </div>
                    <input
                      type="range"
                      min="0.05"
                      max="4.0"
                      step="0.01"
                      value={state.image.zoom}
                      className="w-full accent-[#248895] bg-slate-950 rounded-lg appearance-none h-2 cursor-pointer"
                      onChange={(e) => handleNestedImageUpdate('zoom', Number(e.target.value))}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <label className="text-xs font-medium text-slate-400">Horizon Offset (X)</label>
                        <span className="text-xs font-mono text-slate-400">{Math.round(state.image.offsetX)}px</span>
                      </div>
                      <input
                        type="range"
                        min="-400"
                        max="400"
                        step="5"
                        value={state.image.offsetX}
                        className="w-full accent-[#248895] bg-slate-950 rounded-lg appearance-none h-2 cursor-pointer"
                        onChange={(e) => handleNestedImageUpdate('offsetX', Number(e.target.value))}
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <label className="text-xs font-medium text-slate-400">Vertical Offset (Y)</label>
                        <span className="text-xs font-mono text-slate-400">{Math.round(state.image.offsetY)}px</span>
                      </div>
                      <input
                        type="range"
                        min="-400"
                        max="400"
                        step="5"
                        value={state.image.offsetY}
                        className="w-full accent-[#248895] bg-slate-950 rounded-lg appearance-none h-2 cursor-pointer"
                        onChange={(e) => handleNestedImageUpdate('offsetY', Number(e.target.value))}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="text-xs font-medium text-slate-400">Rotational Angle</label>
                      <span className="text-xs font-mono text-slate-400">{state.image.rotate}°</span>
                    </div>
                    <input
                      type="range"
                      min="-180"
                      max="180"
                      step="1"
                      value={state.image.rotate}
                      className="w-full accent-[#248895] bg-slate-950 rounded-lg appearance-none h-2 cursor-pointer"
                      onChange={(e) => handleNestedImageUpdate('rotate', Number(e.target.value))}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: THEME, COLOR WORKSPACE, & ACCENTS */}
            {activeTab === 'theme' && (
              <div className="space-y-5 animate-fade-in">
                
                {/* Visual aspect ratio selections */}
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                    Target Flyer Layout Ratio
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setDirectState('aspectRatio', 'portrait-4-5')}
                      className={`p-4 rounded-xl border flex flex-col items-center gap-2 text-center transition ${
                        state.aspectRatio === 'portrait-4-5'
                          ? 'border-[#248895] bg-[#248895]/10 text-white font-semibold'
                          : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <div className="w-8 h-10 border-2 border-dashed rounded opacity-75 mb-1" />
                      <span className="text-xs tracking-wider uppercase font-bold">Standard feed (4:5)</span>
                      <span className="text-[10px] text-slate-500 font-mono">1080 × 1350 px</span>
                    </button>
                    <button
                      onClick={() => setDirectState('aspectRatio', 'story-9-16')}
                      className={`p-4 rounded-xl border flex flex-col items-center gap-2 text-center transition ${
                        state.aspectRatio === 'story-9-16'
                          ? 'border-[#248895] bg-[#248895]/10 text-white font-semibold'
                          : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <div className="w-6 h-12 border-2 border-dashed rounded opacity-75 mb-1" />
                      <span className="text-xs tracking-wider uppercase font-bold">WhatsApp / Story (9:16)</span>
                      <span className="text-[10px] text-slate-500 font-mono">1080 × 1920 px</span>
                    </button>
                  </div>
                </div>

                <div className="border-b border-slate-800 pb-3 pt-2">
                  <h3 className="text-md font-bold text-white flex items-center gap-2">
                    <Palette className="w-4 h-4 text-[#248895]" /> Template Premium Theme Presets
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Toggle beautiful base presets curated by senior design engineers
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: 'sacred-teal', label: 'Sacred Interval Teal 👑', bg: '#004b52', text: 'teal', desc: 'Serene deep teal brand style' },
                    { id: 'sacred-paper', label: 'Sacred Interval Paper 📖', bg: '#f9f9ff', text: 'slate', desc: 'Clean, elegant, off-white paper canvas' },
                    { id: 'flc-teal', label: 'FLC Corporate Teal', bg: '#0f5962', text: 'brand', desc: 'Curated Faithful Learners Circle colors' },
                    { id: 'champagne-gold', label: 'Champagne Luxury', bg: '#1f1b16', text: 'gold', desc: 'Refined sand tones' },
                    { id: 'emerald-luxury', label: 'Emerald Brass', bg: '#042419', text: 'brass', desc: 'Deep velvet botanical luxury' },
                    { id: 'dark-charcoal', label: 'Onyx Charcoal', bg: '#171717', text: 'white', desc: 'Modern high-fashion look' },
                    { id: 'royal-blue', label: 'Classic Blue Gold', bg: '#081730', text: 'white', desc: 'Sample flyer accurate matching' },
                  ].map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => applyPresetTemplate(preset.id as TemplateTheme)}
                      className={`p-3 rounded-xl border text-left transition flex items-start gap-3 justify-between ${
                        state.theme === preset.id && !state.useCustomBackground
                          ? 'border-[#248895] bg-slate-800'
                          : 'border-slate-800 bg-slate-950/40 hover:bg-slate-900/60'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div 
                          className="w-5 h-5 rounded-full border border-white/20 shrink-0" 
                          style={{ backgroundColor: preset.bg }}
                        />
                        <div>
                          <p className="text-xs font-bold text-white">{preset.label}</p>
                          <p className="text-[10px] text-slate-500 mt-0.5">{preset.desc}</p>
                        </div>
                      </div>
                      {state.theme === preset.id && !state.useCustomBackground && (
                        <CheckCircle2 className="w-4 h-4 text-[#248895] shrink-0" />
                      )}
                    </button>
                  ))}
                </div>

                {/* Custom Color Overrides Option */}
                <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl space-y-3.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Override Custom Backdrop Background
                    </label>
                    <input
                      type="checkbox"
                      className="w-4 h-4 accent-[#248895]"
                      checked={state.useCustomBackground}
                      onChange={(e) => setDirectState('useCustomBackground', e.target.checked)}
                    />
                  </div>
                  {state.useCustomBackground && (
                    <div className="flex gap-2 items-center animate-fade-in">
                      <input
                        type="color"
                        className="w-10 h-10 bg-slate-950 border border-slate-800 rounded-lg cursor-pointer p-1"
                        value={state.customBackgroundHex}
                        onChange={(e) => setDirectState('customBackgroundHex', e.target.value)}
                      />
                      <input
                        type="text"
                        className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-300 font-mono tracking-widest focus:outline-none"
                        value={state.customBackgroundHex}
                        onChange={(e) => setDirectState('customBackgroundHex', e.target.value)}
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 4: DECORATIVE ADDONS, LOGOS, & BADGES */}
            {activeTab === 'decor' && (
              <div className="space-y-6 animate-fade-in">
                
                {/* Brand Logos customization */}
                <div className="space-y-4">
                  <div className="border-b border-slate-800 pb-3">
                    <h3 className="text-md font-bold text-white">Brand Logo Integrations</h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Choose which brand logo to print at the top-left of the template
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3.5">
                    {[
                      { id: 'flc', label: 'FLC Corporate' },
                      { id: 'infinity-plug', label: 'Infinity Plug' },
                      { id: 'custom', label: 'Custom Text' },
                      { id: 'none', label: 'No Logo' },
                    ].map((logoOpt) => (
                      <button
                        key={logoOpt.id}
                        className={`py-3 px-4 rounded-xl border text-xs font-semibold tracking-wide transition ${
                          state.logoType === logoOpt.id
                            ? 'bg-slate-800 border-[#248895] text-white'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                        }`}
                        onClick={() => setDirectState('logoType', logoOpt.id as LogoType)}
                      >
                        {logoOpt.label}
                      </button>
                    ))}
                  </div>

                  {state.logoType === 'custom' && (
                    <div className="space-y-2 animate-fade-in">
                      <label className="text-xs font-semibold text-slate-400 uppercase tracking-widest block">Logo Lettering Text</label>
                      <input
                        type="text"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-200 text-sm focus:outline-none"
                        value={state.customLogoText}
                        onChange={(e) => setDirectState('customLogoText', e.target.value)}
                        placeholder="e.g. UNIQUE"
                      />
                    </div>
                  )}
                </div>

                {/* Custom Status Badges */}
                <div className="space-y-4 pt-2">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div>
                      <h4 className="text-md font-bold text-white">Flyer Corner Status Badge</h4>
                      <p className="text-xs text-slate-400 mt-0.5">Toggle and edit the top-right corner card badge</p>
                    </div>
                    <input
                      type="checkbox"
                      className="w-4 h-4 accent-[#248895] shrink-0"
                      checked={state.showBadge}
                      onChange={(e) => setDirectState('showBadge', e.target.checked)}
                    />
                  </div>

                  {state.showBadge && (
                    <div className="grid grid-cols-1 gap-2 animate-fade-in">
                      <label className="text-xs font-semibold text-slate-400 uppercase tracking-widest block">Badge Text</label>
                      <input
                        type="text"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 text-sm font-bold tracking-widest"
                        value={state.badgeText}
                        onChange={(e) => setDirectState('badgeText', e.target.value)}
                        placeholder="e.g. PRODUCTION"
                      />
                    </div>
                  )}
                </div>

                {/* Balloons Count and colors */}
                <div className="space-y-4 pt-2">
                  <div className="border-b border-slate-800 pb-3">
                    <h3 className="text-md font-bold text-white">Party Balloons & Glitter Overlays</h3>
                    <p className="text-xs text-slate-400 mt-1">Add glorious celebratory elements to your flyer</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                          Balloon Density
                        </label>
                        <span className="text-xs font-semibold text-slate-300">{state.balloonCount} balloons</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="5"
                        step="1"
                        value={state.balloonCount}
                        className="w-full accent-[#248895] bg-slate-950 rounded-lg appearance-none h-2 cursor-pointer"
                        onChange={(e) => setDirectState('balloonCount', Number(e.target.value))}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                        Balloon Metallic Finish
                      </label>
                      <select
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200"
                        value={state.balloonStyle}
                        onChange={(e) => setDirectState('balloonStyle', e.target.value as any)}
                      >
                        <option value="rose-gold">Rose Gold (Shiny Copper)</option>
                        <option value="gold">Luxe Gold (24K Gold)</option>
                        <option value="teal">FLC Ocean Teal</option>
                        <option value="silver">Metallic Silver</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="flex items-center justify-between p-3 bg-slate-950/50 border border-slate-850 rounded-xl">
                      <div>
                        <span className="text-xs font-semibold text-slate-300 block">Sparkle Particle Overlay</span>
                        <span className="text-[10px] text-slate-500 font-light block">Scatters diamond and round glitter</span>
                      </div>
                      <input
                        type="checkbox"
                        className="w-4 h-4 accent-[#248895]"
                        checked={state.glitterEnabled}
                        onChange={(e) => setDirectState('glitterEnabled', e.target.checked)}
                      />
                    </div>

                    {state.glitterEnabled && (
                      <div className="animate-fade-in">
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                          Glitter Tone Profile
                        </label>
                        <select
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200"
                          value={state.confettiColor}
                          onChange={(e) => setDirectState('confettiColor', e.target.value as any)}
                        >
                          <option value="gold">Champagne Gold</option>
                          <option value="multi">Multicolor Party</option>
                          <option value="white">Winter White</option>
                          <option value="teal">Fairy Teal Sparkles</option>
                        </select>
                      </div>
                    )}
                  </div>
                </div>

                {/* Paint Stroke Block Layers */}
                <div className="space-y-4 pt-2">
                  <div className="border-b border-slate-800 pb-3">
                    <h4 className="text-md font-bold text-white">Acrylic Accent Brushes</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Toggle painted vector stroke details</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex items-center justify-between p-3 bg-slate-950/50 border border-slate-850 rounded-xl">
                      <span className="text-xs font-semibold text-slate-300">Top Gold Accent Line</span>
                      <input
                        type="checkbox"
                        className="w-4 h-4 accent-[#248895]"
                        checked={state.showTopGoldAccent}
                        onChange={(e) => setDirectState('showTopGoldAccent', e.target.checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between p-3 bg-slate-950/50 border border-slate-850 rounded-xl">
                      <span className="text-xs font-semibold text-slate-300">Bottom Dry Brush Overlay</span>
                      <input
                        type="checkbox"
                        className="w-4 h-4 accent-[#248895]"
                        checked={state.showBottomBrush}
                        onChange={(e) => setDirectState('showBottomBrush', e.target.checked)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* 3. High-Action Download & Export Pane Footer */}
          <div className="bg-slate-950/80 border-t border-slate-800/80 p-6 space-y-4">
            
            {/* Quick status message toast */}
            {exportSuccess && (
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3 flex items-center gap-3 animate-bounce">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="text-xs text-emerald-300 font-medium">
                  <strong>Success!</strong> Card designed beautifully and downloaded! Go on and post it to your status/stories.
                </span>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              {/* Primary Download trigger */}
              <button
                onClick={handleDownloadPNG}
                disabled={isExporting}
                className="flex-1 bg-[#248895] hover:bg-[#1a7682] active:scale-[0.98] disabled:opacity-50 text-white font-extrabold uppercase py-4 px-6 rounded-xl tracking-widest shadow-lg flex items-center justify-center gap-3 transition"
              >
                {isExporting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Compiling High-Res PNG...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5" />
                    <span>Download Happy Birthday PNG</span>
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  if (confirm('Are you sure you want to reset all modifications back to default?')) {
                    setState(INITIAL_STATE);
                  }
                }}
                className="bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white px-5 py-4 rounded-xl border border-slate-800 font-bold uppercase text-xs tracking-wider transition"
                title="Reset to initial sample"
              >
                Reset Default
              </button>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono pt-1">
              <span>Aspect Ratio: {state.aspectRatio === 'story-9-16' ? '9:16 Story Portrait' : '4:5 Feed Frame'}</span>
              <span className="hover:text-amber-400 cursor-help flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 text-rose-500" /> Powered by FLC Media Engine
              </span>
            </div>
          </div>

        </div>
      </main>
      
      {/* Footer credits bar */}
      <footer className="bg-slate-900/40 border-t border-slate-800/40 text-center py-4 px-6 text-xs text-slate-500 mt-auto font-light">
        © 2026 Faithful Learners Circle. All creative designs and branding assets preserved. Made with Google AI Studio.
      </footer>
    </div>
  );
}

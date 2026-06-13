/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type TemplateTheme = 'royal-blue' | 'flc-teal' | 'champagne-gold' | 'emerald-luxury' | 'dark-charcoal' | 'sacred-teal' | 'sacred-paper';

export interface ImageState {
  url: string | null;
  zoom: number;
  offsetX: number;
  offsetY: number;
  rotate: number;
}

export type AspectRatio = 'portrait-4-5' | 'story-9-16';

export type LogoType = 'flc' | 'infinity-plug' | 'custom' | 'none';

export interface CardState {
  theme: TemplateTheme;
  aspectRatio: AspectRatio;
  celebrantName: string;
  nameFontSize: number;
  nameColor: string;
  nameYShift: number; // offset the name vertically
  celebrantMonth: string;
  celebrantDay: string;
  customMessage: string;
  messageFont: 'serif' | 'sans' | 'script';
  image: ImageState;
  
  // Custom Logos and Badges
  logoType: LogoType;
  customLogoText: string;
  badgeText: string;
  showBadge: boolean;
  
  // Decorative Overlays
  balloonCount: number;
  balloonStyle: 'rose-gold' | 'gold' | 'teal' | 'silver';
  glitterEnabled: boolean;
  confettiColor: 'multi' | 'gold' | 'white' | 'teal';
  brushOverlayColor: string; // Hex for paint stroke
  showBottomBrush: boolean;
  showTopGoldAccent: boolean;
  customBackgroundHex: string;
  useCustomBackground: boolean;
}

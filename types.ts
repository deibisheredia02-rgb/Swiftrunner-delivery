import React from 'react';

export interface NavItem {
  label: string;
  id: string;
}

export interface FeatureCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export type DashboardTab = 'home' | 'orders' | 'prime' | 'favorites';

export interface GeneratedOrder {
  item: string;
  restaurant: string;
  eta: string;
  vibe: string;
}

export type Language = 'en' | 'es' | 'zh' | 'fr';

export interface TranslationStructure {
  hero: {
    subtitle: string;
    badge: string;
    description: string;
    waitlist: string;
    cta: string;
    timeLabels: { d: string; h: string; m: string; s: string };
  };
  features: {
    title: string;
    titleAccent: string;
    card1: { title: string; desc: string };
    card2: { title: string; desc: string };
    card3: { title: string; desc: string };
  };
  dashboard: {
    title: string;
    titleAccent: string;
    tabs: { home: string; orders: string; prime: string; favorites: string };
    emptyState: { title: string; desc: string; button: string; loading: string };
    order: { autoStaged: string; confirm: string; dismiss: string; aiInsight: string };
    activeOrders: { title: string; status: string; delivered: string };
    prime: { saved: string; activity: string };
    favorites: { text: string; subtext: string };
  };
  footer: {
    title: string;
    subtitle: string;
    placeholder: string;
    button: string;
    success: string;
    copyright: string;
    tagline: string;
  };
}
import React from 'react';

export interface Review {
  id: string;
  user: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
}

export interface AppItem {
  id: string;
  name: string;
  category: 'App' | 'Game';
  rating: number;
  image: string;
  isPremium: boolean;
  description: string;
  // New fields for details page
  longDescription?: string;
  screenshots?: string[];
  reviews?: Review[];
  size?: string;
  version?: string;
  developer?: string;
  downloads?: string;
}

export interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  colorClass: string;
}
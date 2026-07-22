export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  iconName: string;
  longDesc: string;
  benefits: string[];
  ctaText: string;
}

export interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  subtitle: string;
  description: string;
  category: 'award' | 'milestone' | 'speaking';
}

export interface TrustBadge {
  id: string;
  title: string;
  subtitle: string;
  iconName: string;
  color: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  quote: string;
  metrics?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

import { KeycapProduct } from './types';

export const shopOwnerEmail = 'orders@keycraftcaps.com';

export const products: KeycapProduct[] = [
  {
    id: 'nebula-mx',
    name: 'Nebula MX Set',
    price: 89,
    image:
      'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=1100&q=80',
    description:
      'Galaxy-inspired gradient PBT caps with shine-through legends designed for gaming and office boards.',
    profile: 'Cherry',
    material: 'Dye-sub PBT'
  },
  {
    id: 'retro-wave',
    name: 'Retro Wave Artist Pack',
    price: 129,
    image:
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1100&q=80',
    description:
      'Neon inspired premium artisan set with UV resistant coating and custom text option per key.',
    profile: 'SA',
    material: 'Double-shot ABS + Resin'
  },
  {
    id: 'minimal-sand',
    name: 'Minimal Sand Pro',
    price: 74,
    image:
      'https://images.unsplash.com/photo-1611079830815-8f6f5954fd94?auto=format&fit=crop&w=1100&q=80',
    description:
      'Soft earth-tone keycap kit perfect for creators who prefer clean aesthetics and durable texture.',
    profile: 'OEM',
    material: 'Textured PBT'
  }
];

export const testimonials = [
  {
    name: 'Ayla M.',
    role: 'Streamer',
    quote:
      'I sent my logo idea and KeyCraft translated it perfectly onto ESC and artisan keys. Delivery was fast too.'
  },
  {
    name: 'Ravi K.',
    role: 'Software Engineer',
    quote:
      'The build quality is excellent. My custom legends are crisp and centered on every key.'
  },
  {
    name: 'Noah P.',
    role: 'Keyboard Collector',
    quote:
      'Finally a store where ordering custom sets is straightforward. Highly recommended for enthusiasts.'
  }
];

export const reviews = [
  { title: 'Best custom legends', rating: 5, author: 'Mina' },
  { title: 'Smooth checkout + payment', rating: 5, author: 'Carlos' },
  { title: 'Color matched exactly', rating: 4, author: 'Jules' }
];

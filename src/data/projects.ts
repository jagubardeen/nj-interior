import { Project, ProjectCategory } from '../types';

export const PROJECTS: Project[] = [
  {
    id: 'p1',
    name: 'JAY RESIDENCE CHENNAI',
    category: 'Wardrobe',
    image: '/img/jay/wardrobe 5.jpeg',
    description: 'A vibe, ultra-modern master walk-in wardrobe using premium charcoal white matte laminates,and tinted glass doors with integrated smart sensor lighting.',
    highlightWork: 'Floor-to-ceiling tinted glass sliding wardrobe with automatic warm LED strip lighting inside.',
    details: [
      'Smart sensor-activated interior LED strip lights',
      'Soft-close telescopic slider mechanism from Hettich',
      'Integrated heavy-duty hydraulic trouser pull-out rack'
    ],
    materials: ['HDHMR carcass', 'Scratch-resistant Acrylic', 'Bronze profile glass doors', 'Hettich runners'],
    dimensions: '14ft x 10ft U-Shaped Wardrobe',
    location: 'guduvancheri, Chennai',
    completionYear: '2026',
    budgetTier: 'Luxury',
    galleryImages: [
      '/img/jay/wardrobe 1.jpeg',
      '/img/jay/wardrobe 4.jpeg',
      '/img/jay/wardrobe 2.jpeg',
      '/img/jay/wardrobe 3.jpeg'
    ],
    slug: 'obsidian-walk-in-wardrobe-Chennai',
    seoTitle: 'The Obsidian Walk-In Wardrobe Guduvancheri Chennai | NJ Interior',
    seoDescription: 'Custom dark luxury walk-in wardrobe featuring bronze tinted glass sliding doors, smart LED sensor lights, and Hettich runners in Guduvancheri, Chennai.',
    seoKeywords: ['Obsidian Walk In Wardrobe', 'Glass Wardrobe Chennai', 'NJ Interior Chennai', 'Custom Sliding Closet']
  },
  {
    id: 'p2',
    name: 'FATHIMA RESIDENCE PUDUKKOTTAI',
    category: 'TV Unit',
    image: '/img/Fathima residence/TV 1.jpeg',
    description: 'A striking statement entertainment zone for the formal living room. This TV unit is backed by high-gloss Italian Statuario marble laminate panels, bordered by handcrafted charcoal louvers.',
    highlightWork: 'Floating TV unit console in warm teak wood combined with marble laminate back panel.',
    details: [
      'Floating deck design with three soft-close push drawers',
      'Concealed media wire channels and integrated subwoofer slot',
      'Golden brass metallic inlay strips between marble joints',
      'Dimmable warm ambient COB backlights behind panels'
    ],
    galleryImages: [
      '/img/Fathima residence/TV 2.jpeg',
      '/img/Fathima residence/TV 3.jpeg',
      '/img/Fathima residence/TV 4.jpeg',
      '/img/Fathima residence/TV 1.jpeg'
    ],
    materials: ['Teak veneer', 'Statuary Marble laminate', 'Charcoal louver panels', 'Golden T-profile inlays'],
    dimensions: '10ft Width x 8.5ft Height',
    location: 'PVR lakshmi street, Pudukkottai',
    completionYear: '2026',
    budgetTier: 'Luxury',
    slug: 'TV-UNIT-in-PVR-LAKSHMI-Street-Pudukkottai',
    seoTitle: 'The TV unit In PVR Lakshmi Street Pudukkottai | NJ Interior',
    seoDescription: 'Custom modern TV unit design in PVR Lakshmi Street, Pudukkottai by NJ Interior. Featuring sleek wall paneling, ambient LED backlighting, and smart storage solutions.',
    seoKeywords: ['TV Unit Pudukkottai', 'TV Unit in PVR Lakshmi Street', 'NJ Interior Pudukkottai', 'Modern TV Cabinet Design']
  },
  {
    id: 'p3',
    name: 'SENTHIL RESIDENCE',
    category: 'Modular Kitchen',
    image: '/img/Senthil Residence/Kitchen 1.jpeg',
    description: 'A contemporary modular kitchen showing beautiful custom sage green acrylic finishes. Optimally designed for convenience with clean quartz worktops and touch-to-open upper cabinets.',
    highlightWork: 'Custom Sage Green handle-less under-counter modular cabinets and pull-outs.',
    details: [
      'Blum Aventos HK lift-up mechanisms for overhead cabinets',
      'Anti-fingerprint ultra-matte finish acrylic',
      'Seamless white quartz countertop with under-mount sink',
      'Pull-out spice rack and deep bottle drawers with glass sides'
    ],
    galleryImages: [
      '/img/Senthil Residence/Kitchen 2.jpeg',
      '/img/Senthil Residence/Kitchen 3.jpeg',
      '/img/Senthil Residence/Kitchen 4.jpeg',
      '/img/Senthil Residence/Kitchen 5.jpeg',
      '/img/Senthil Residence/Kitchen 6.jpeg'
    ],
    materials: ['BWP Marine Plywood', 'Anti-fingerprint Matte Acrylic', 'Carrara Quartz', 'Blum hardware'],
    dimensions: 'L-Shaped Kitchen (12ft x 10ft)',
    location: 'Ashok Nagar, Pudukkottai',
    completionYear: '2025',
    budgetTier: 'Premium',
    slug: 'modular-kitchen-in-ashok-nagar-pudukkottai',
    seoTitle: 'Custom Modular Kitchen Design in Ashok Nagar, Pudukkottai | NJ Interior',
    seoDescription: 'Premium modular kitchen design in PVR Lakshmi Street, Pudukkottai by NJ Interior. Built with water-resistant HDHMR, soft-close hardware, smart storage, and sleek finishes.',
    seoKeywords: ['Modular Kitchen Pudukkottai', 'Modular Kitchen in ASHOK NAGAR', 'NJ Interior Pudukkottai', 'Custom Kitchen Interior Pudukkottai', 'HDHMR Kitchen Cabinets Pudukkottai','Modern Modular Kitchen Design']
  },
  {
    id: 'p4',
    name: 'BAHRUDEEN RESIDENCE',
    category: 'TV Unit',
    image: '/img/Bahrudeen Residence/Tv 1.jpeg',
    description: 'An elegant minimal TV console influenced by Nordic design. It features clean vertical oak wood slats on a soft beige background, paired with a matching wall-hung console.',
    highlightWork: 'Slatted white oak background paneling with a floating wood cabinet.',
    details: [
      'Precision fluted vertical solid oak battens',
      'Matte beige anti-scratch laminate deck',
      'Soft-closing fold-down flap doors with wire-grommets',
      'Integrated floating accent shelf with accent spotlights'
    ],
    galleryImages: [
      '/img/Bahrudeen Residence/Tv 2.jpeg',
      '/img/Bahrudeen Residence/Tv 3.jpeg',
      '/img/Bahrudeen Residence/Tv 4.jpeg'
    ],
    materials: ['Solid White Oak', 'HDHMR base', 'Matte Laminate', 'Hafele flap stays'],
    dimensions: '8ft Width x 7.5ft Height',
    location: 'Pallathur, Karaikudi',
    completionYear: '2026',
    budgetTier: 'Premium',
    slug: 'TV-UNIT-in-Pallathur-Karaikudi',
    seoTitle: 'The TV unit In Pallathur Karaikudi | NJ Interior',
    seoDescription: 'Custom modern TV unit design in Pallathur Karaikudi, by NJ Interior Pudukkottai. Featuring sleek wall paneling, ambient LED backlighting, and smart storage solutions.',
    seoKeywords: ['TV Unit Pallathur Karaikudi', 'TV Unit in Pallathur Karaikudi', 'NJ Interior Pudukkottai', 'Modern TV Cabinet Design']
  },
  {
    id: 'p5',
    name: 'JENSY HOME',
    category: 'Full Home Interior',
    image: '/img/Jensy/1.jpeg',
    description: 'This master bath floating vanity unit uses natural white oak grain. Waterproofed and treated specifically for wet environments, offering maximum space with double wide drawers.',
    highlightWork: 'Bespoke floating oakwood double vanity unit with clean minimalist drawer pulls.',
    details: [
      'Specialist water-resistant polyurethane clear coat over natural oak',
      'Hidden plumbing routing to maximize internal storage space',
      'Tandem-box drawers from Grass with integrated soft dampers',
      'Integrated LED cove accent in the bottom overhang'
    ],
    galleryImages: [
      '/img/Jensy/2.jpeg',
      '/img/Jensy/3.jpeg',
      '/img/Jensy/4.jpeg',
    ],
    materials: ['Waterproof BWP Blockboard', 'Natural White Oak veneer', 'Corian top', 'Grass runners'],
    dimensions: '6ft Width x 2ft Depth x 1.8ft Height',
    location: 'Mettupatti, Pudukkottai',
    completionYear: '2024',
    budgetTier: 'Premium',
    slug: 'FULL-HOME-INTERIOR-METTUPATTI-PUDUKKOTTAI',
    seoTitle: 'The Full Home Interior In Mettupatti Pudukkottai | NJ Interior',
    seoDescription: 'Custom modern Full Home Interior design in Mettupatti Pudukkottai, by NJ Interior Pudukkottai. Featuring sleek wall paneling, ambient LED backlighting, and smart storage solutions.',
    seoKeywords: ['Full Home Interior Mettupatti Pudukkottai', 'Full Home Interior in Mettupatti Pudukkottai', 'NJ Interior Pudukkottai', 'Modern TV Cabinet Design']
  },
];

export const CATEGORIES: ProjectCategory[] = [
  'Commercial',
  'Wardrobe',
  'TV Unit',
  'Modular Kitchen',
  'Full Home Interior'
];

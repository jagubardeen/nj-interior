export type ProjectCategory = 'Commercial' | 'Wardrobe' | 'TV Unit' | 'Modular Kitchen' | 'Full Home Interior';

export interface Project {
  id: string;
  name: string;
  category: ProjectCategory;
  image: string;
  description: string;
  highlightWork: string; // The specific woodwork highlighted (e.g., 'Wardrobe', 'TV Unit')
  details: string[]; // Specific features of the project
  materials: string[]; // Materials used
  dimensions: string; // Size or configuration
  location: string; // Location of project
  completionYear: string; // e.g. "2025"
  budgetTier: 'Classic' | 'Premium' | 'Luxury';
  galleryImages?: string[]; // Extra site photos
  
  // Individual Project SEO
  slug?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
}

export interface ConsultationRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  preferredCategory: ProjectCategory | 'General';
  message: string;
  projectId?: string; // Optional reference to a project they loved
  createdAt: string;
}


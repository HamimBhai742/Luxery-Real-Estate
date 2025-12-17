export interface SubmitBlogData {
  status?: 'draft' | 'published';
  title: string;
  content: string;
  excerpt: string;
  category: string;
  tags: string[];
  image: File | null;
}

export interface Blog {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  image: string;
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
}

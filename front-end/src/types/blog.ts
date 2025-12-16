export interface SubmitBlogData {
  status?: "draft" | "published";
  title: string;
  content: string;
  excerpt: string;
  category: string;
  tags: string[];
  image: File | null;
}

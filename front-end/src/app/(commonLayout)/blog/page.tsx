import BlogClient from '@/components/Blog/BlogClient';

export const metadata = {
  title: 'Blog - Luxury Real Estate',
  description: 'Get the latest news and updates from Luxury Real Estate',
};

const BlogPage = async () => {
  return <BlogClient/>;
};

export default BlogPage;

import SingleBlogClient from '@/components/Blog/SingleBlogClient';
import { notFound } from 'next/navigation';

interface PageProps {
  params: {
    slug: string;
  };
}

const BlogDetailsPage = async ({ params }: PageProps) => {
  const { slug } = await params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/${slug}`);
  const { data: blog } = await res.json();
  console.log(blog, slug);
  if (!blog) {
    notFound();
  }
  return <SingleBlogClient blog={blog} />;
};
export default BlogDetailsPage;

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps) {
  const { slug } =await  params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/${slug}`);
  const { data: blog } = await res.json();
  if (!blog) {
    return {
      title: 'Blog Not Found',
    };
  }
  return {
    title: blog.title,
    description: blog.content,
    openGraph: {
      title: blog.title,
      description: blog.content,
      images: [blog.image],
    },
  };
}

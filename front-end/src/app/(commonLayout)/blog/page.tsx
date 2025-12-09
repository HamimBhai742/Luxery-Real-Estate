import { ImSpinner9 } from "react-icons/im";

export const metadata = {
  title: 'Blog - Luxury Real Estate',
  description: ' Get the latest news and updates from Luxury Real Estate',
};
const BlogPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center gap-4">
      <ImSpinner9 className="animate-spin text-4xl text-gray-900 dark:text-white" />
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Comming Soon..........</h1>
    </div>
  );
};

export default BlogPage;

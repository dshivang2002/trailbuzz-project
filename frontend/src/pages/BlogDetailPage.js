import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/utils';

const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api`;

const BlogDetailPage = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlog();
  }, [slug]);

  const fetchBlog = async () => {
    try {
      const response = await axios.get(`${API_URL}/blogs/slug/${slug}`);
      setBlog(response.data);
    } catch (error) {
      console.error('Failed to fetch blog', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#1A3C6E] mb-4">Blog post not found</h2>
          <Button asChild>
            <Link to="/blog">Back to Blog</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      <div className="container mx-auto px-4 py-12">
        <Breadcrumbs items={[
          { name: 'Blog', path: '/blog' },
          { name: blog.title, path: `/blog/${blog.slug}` }
        ]} />

        <article className="max-w-4xl mx-auto">
          <Button asChild variant="ghost" className="mb-6">
            <Link to="/blog">
              <ArrowLeft size={20} className="mr-2" />
              Back to Blog
            </Link>
          </Button>

          <div className="mb-8">
            <span className="inline-block px-3 py-1 bg-[#F97316]/10 text-[#F97316] rounded-full text-sm mb-4">
              {blog.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-black font-['Poppins'] text-[#1A3C6E] mb-6">
              {blog.title}
            </h1>
            <div className="flex items-center gap-6 text-[#475569]">
              <div className="flex items-center">
                <User size={18} className="mr-2" />
                {blog.author_name}
              </div>
              <div className="flex items-center">
                <Calendar size={18} className="mr-2" />
                {formatDate(blog.created_at)}
              </div>
            </div>
          </div>

          {blog.featured_image && (
            <div className="mb-12 rounded-2xl overflow-hidden">
              <img
                src={blog.featured_image}
                alt={blog.title}
                className="w-full h-auto"
              />
            </div>
          )}

          <div className="prose prose-lg max-w-none">
            <div className="text-[#475569] leading-relaxed whitespace-pre-wrap">
              {blog.content}
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <Button asChild>
              <Link to="/blog">
                <ArrowLeft size={20} className="mr-2" />
                Back to All Posts
              </Link>
            </Button>
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogDetailPage;

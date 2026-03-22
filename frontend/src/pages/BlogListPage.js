import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Calendar, User, Tag } from 'lucide-react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Card } from '@/components/ui/card';
import { formatDate } from '@/lib/utils';

const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api`;

const BlogListPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(`${API_URL}/blogs`);
      setBlogs(response.data);
    } catch (error) {
      console.error('Failed to fetch blogs', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      <div className="bg-[#1A3C6E] text-white py-16">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[{ name: 'Blog', path: '/blog' }]} />
          <h1 className="text-4xl md:text-5xl font-black font-['Poppins'] mb-4">
            Travel Blog
          </h1>
          <p className="text-xl text-white/80">
            Travel tips, destination guides, and inspiration for your next adventure
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            [...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl h-96 animate-pulse"></div>
            ))
          ) : blogs.length > 0 ? (
            blogs.map((blog) => (
              <Link key={blog.id} to={`/blog/${blog.slug}`} className="blog-card group">
                <Card className="overflow-hidden border-[#1A3C6E]/10 h-full">
                  <div className="blog-image h-48 overflow-hidden bg-gray-200">
                    <img
                      src={blog.featured_image || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828'}
                      alt={blog.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-[#475569] mb-3">
                      <span className="px-2 py-1 bg-[#F97316]/10 text-[#F97316] rounded-full">{blog.category}</span>
                      <div className="flex items-center">
                        <Calendar size={14} className="mr-1" />
                        {formatDate(blog.created_at)}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-[#1A3C6E] mb-3 line-clamp-2 group-hover:text-[#F97316] transition-colors">
                      {blog.title}
                    </h3>
                    <p className="text-[#475569] text-sm line-clamp-3 mb-4">
                      {blog.excerpt || blog.content.substring(0, 150)}...
                    </p>
                    <div className="flex items-center text-xs text-[#475569]">
                      <User size={14} className="mr-1" />
                      {blog.author_name}
                    </div>
                  </div>
                </Card>
              </Link>
            ))
          ) : (
            <div className="col-span-3 text-center py-12">
              <p className="text-[#475569]">No blog posts available yet. Check back soon!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogListPage;

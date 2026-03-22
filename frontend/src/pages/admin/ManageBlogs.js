import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import axios from 'axios';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { toast } from 'sonner';

const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api`;

const ManageBlogs = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    featured_image: '',
    category: 'Travel Tips',
    tags: [],
    author_name: 'Yatrika Team',
    status: 'published',
    meta_title: '',
    meta_description: ''
  });

  useEffect(() => {
    if (!user) {
      navigate('/admin/login');
      return;
    }
    fetchBlogs();
  }, [user, navigate]);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(`${API_URL}/blogs?status=all`);
      setBlogs(response.data || []);
    } catch (error) {
      console.error('Failed to fetch blogs', error);
    }
  };

  const handleAddNew = () => {
    setEditingBlog(null);
    setFormData({
      title: '',
      slug: '',
      content: '',
      excerpt: '',
      featured_image: '',
      category: 'Travel Tips',
      tags: [],
      author_name: 'Yatrika Team',
      status: 'published',
      meta_title: '',
      meta_description: ''
    });
    setShowDialog(true);
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setFormData(blog);
    setShowDialog(true);
  };

  const handleDelete = async (blogId) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      await axios.delete(`${API_URL}/blogs/${blogId}`);
      toast.success('Blog deleted');
      fetchBlogs();
    } catch (error) {
      toast.error('Failed to delete');
    }
  };

  const generateSlug = (title) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingBlog) {
        await axios.put(`${API_URL}/blogs/${editingBlog.id}`, formData);
        toast.success('Blog updated');
      } else {
        await axios.post(`${API_URL}/blogs`, formData);
        toast.success('Blog created');
      }
      setShowDialog(false);
      fetchBlogs();
    } catch (error) {
      toast.error('Failed to save');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9] p-8">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-black text-[#1A3C6E]">Manage Blog Posts</h1>
          <div className="flex gap-3">
            <Button onClick={() => navigate('/admin/dashboard')} variant="outline">\u2190 Back</Button>
            <Button onClick={handleAddNew} className="bg-[#22C55E] hover:bg-[#16a34a] text-white">
              <Plus size={20} className="mr-2" />New Post
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {blogs.map((blog) => (
            <Card key={blog.id} className="p-6 border-0 shadow-sm">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-[#1A3C6E] mb-2">{blog.title}</h3>
                  <p className="text-sm text-[#475569] mb-3">{blog.excerpt || blog.content.substring(0, 150)}...</p>
                  <div className="flex items-center gap-4 text-xs text-[#475569]">
                    <span>By {blog.author_name}</span>
                    <span>\u2022</span>
                    <span>{blog.category}</span>
                    <span>\u2022</span>
                    <span className={blog.status === 'published' ? 'text-green-600' : 'text-orange-600'}>
                      {blog.status}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(blog)}>
                    <Edit size={16} />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleDelete(blog.id)} className="text-red-600">
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingBlog ? 'Edit Post' : 'New Post'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value, slug: generateSlug(e.target.value)})} required />
            </div>
            <div>
              <Label>Content</Label>
              <Textarea value={formData.content} onChange={(e) => setFormData({...formData, content: e.target.value})} rows={10} required />
            </div>
            <div>
              <Label>Excerpt</Label>
              <Textarea value={formData.excerpt} onChange={(e) => setFormData({...formData, excerpt: e.target.value})} rows={3} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Category</Label>
                <Input value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} />
              </div>
              <div>
                <Label>Status</Label>
                <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} className="w-full px-3 py-2 border rounded-md">
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowDialog(false)}>Cancel</Button>
              <Button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save'}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageBlogs;

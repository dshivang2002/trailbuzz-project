import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import axios from 'axios';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { formatCurrency } from '@/lib/utils';
import { toast } from 'sonner';

const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api`;

const ManagePackages = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [packages, setPackages] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [editingPackage, setEditingPackage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    destination_state: 'Uttarakhand',
    destination_city: '',
    tour_type: 'Pilgrimage',
    duration_days: 3,
    duration_nights: 2,
    price_per_person: 10000,
    original_price: 12000,
    images: [''],
    highlights: [''],
    overview: '',
    itinerary: [{ day: 1, title: '', description: '', activities: [''] }],
    inclusions: [''],
    exclusions: [''],
    available_vehicles: [],
    difficulty_level: 'Moderate',
    min_group_size: 2,
    max_group_size: 20,
    status: 'published',
    meta_title: '',
    meta_description: '',
    featured_image: ''
  });

  useEffect(() => {
    if (!user) {
      navigate('/admin/login');
      return;
    }
    fetchPackages();
  }, [user, navigate]);

  const fetchPackages = async () => {
    try {
      const response = await axios.get(`${API_URL}/packages`);
      setPackages(response.data);
    } catch (error) {
      console.error('Failed to fetch packages', error);
      toast.error('Failed to load packages');
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setEditingPackage(null);
    setFormData({
      name: '',
      slug: '',
      destination_state: 'Uttarakhand',
      destination_city: '',
      tour_type: 'Pilgrimage',
      duration_days: 3,
      duration_nights: 2,
      price_per_person: 10000,
      original_price: 12000,
      images: [''],
      highlights: [''],
      overview: '',
      itinerary: [{ day: 1, title: '', description: '', activities: [''] }],
      inclusions: [''],
      exclusions: [''],
      available_vehicles: [],
      difficulty_level: 'Moderate',
      min_group_size: 2,
      max_group_size: 20,
      status: 'published',
      meta_title: '',
      meta_description: '',
      featured_image: ''
    });
    setShowDialog(true);
  };

  const handleEdit = (pkg) => {
    setEditingPackage(pkg);
    setFormData(pkg);
    setShowDialog(true);
  };

  const handleDelete = async (packageId) => {
    if (!window.confirm('Are you sure you want to delete this package?')) return;
    
    try {
      await axios.delete(`${API_URL}/packages/${packageId}`);
      toast.success('Package deleted successfully');
      fetchPackages();
    } catch (error) {
      console.error('Failed to delete package', error);
      toast.error('Failed to delete package');
    }
  };

  const generateSlug = (name) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  };

  const handleNameChange = (name) => {
    setFormData({ ...formData, name, slug: generateSlug(name) });
  };

  const addArrayItem = (field, defaultValue = '') => {
    setFormData({ ...formData, [field]: [...formData[field], defaultValue] });
  };

  const removeArrayItem = (field, index) => {
    const newArray = formData[field].filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: newArray });
  };

  const updateArrayItem = (field, index, value) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData({ ...formData, [field]: newArray });
  };

  const addItineraryDay = () => {
    const newDay = { day: formData.itinerary.length + 1, title: '', description: '', activities: [''] };
    setFormData({ ...formData, itinerary: [...formData.itinerary, newDay] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingPackage) {
        await axios.put(`${API_URL}/packages/${editingPackage.id}`, formData);
        toast.success('Package updated successfully');
      } else {
        await axios.post(`${API_URL}/packages`, formData);
        toast.success('Package created successfully');
      }
      setShowDialog(false);
      fetchPackages();
    } catch (error) {
      console.error('Failed to save package', error);
      toast.error('Failed to save package');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9]">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-black font-['Poppins'] text-[#1A3C6E]">Manage Packages</h1>
            <p className="text-[#475569] mt-2">Total: {packages.length} packages</p>
          </div>
          <div className="flex gap-3">
            <Button onClick={() => navigate('/admin/dashboard')} variant="outline">
              ← Back to Dashboard
            </Button>
            <Button onClick={handleAddNew} className="bg-[#22C55E] hover:bg-[#16a34a] text-white">
              <Plus size={20} className="mr-2" />
              Add New Package
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading && packages.length === 0 ? (
            [...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl h-96 animate-pulse"></div>
            ))
          ) : (
            packages.map((pkg) => (
              <Card key={pkg.id} className="overflow-hidden border-0 shadow-sm">
                <div className="h-48 overflow-hidden bg-gray-200">
                  <img
                    src={pkg.featured_image || pkg.images[0] || 'https://via.placeholder.com/400x300'}
                    alt={pkg.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      pkg.status === 'featured' ? 'bg-yellow-100 text-yellow-700' :
                      pkg.status === 'published' ? 'bg-green-100 text-green-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {pkg.status}
                    </span>
                    <span className="text-xs text-[#475569]">{pkg.tour_type}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-[#1A3C6E] mb-2 line-clamp-2">{pkg.name}</h3>
                  <p className="text-sm text-[#475569] mb-3">
                    {pkg.destination_city}, {pkg.destination_state}
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-xs text-[#475569]">Price</span>
                      <div className="text-lg font-bold text-[#1A3C6E]">{formatCurrency(pkg.price_per_person)}</div>
                    </div>
                    <div>
                      <span className="text-xs text-[#475569]">Duration</span>
                      <div className="text-sm font-semibold">{pkg.duration_days}D/{pkg.duration_nights}N</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(pkg)} className="flex-1">
                      <Edit size={16} className="mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline" asChild className="flex-1">
                      <Link to={`/tour-packages/${pkg.slug}`} target="_blank">
                        <Eye size={16} className="mr-1" />
                        View
                      </Link>
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(pkg.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingPackage ? 'Edit Package' : 'Add New Package'}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info */}
            <div className="space-y-4">
              <h3 className="font-semibold text-[#1A3C6E]">Basic Information</h3>
              
              <div>
                <Label>Package Name *</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  required
                />
              </div>

              <div>
                <Label>Slug (URL)</Label>
                <Input value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} required />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Destination State</Label>
                  <Select value={formData.destination_state} onValueChange={(value) => setFormData({ ...formData, destination_state: value })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Uttarakhand">Uttarakhand</SelectItem>
                      <SelectItem value="Himachal Pradesh">Himachal Pradesh</SelectItem>
                      <SelectItem value="Rajasthan">Rajasthan</SelectItem>
                      <SelectItem value="Uttar Pradesh">Uttar Pradesh</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>City</Label>
                  <Input value={formData.destination_city} onChange={(e) => setFormData({ ...formData, destination_city: e.target.value })} required />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Tour Type</Label>
                  <Select value={formData.tour_type} onValueChange={(value) => setFormData({ ...formData, tour_type: value })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pilgrimage">Pilgrimage</SelectItem>
                      <SelectItem value="Adventure">Adventure</SelectItem>
                      <SelectItem value="Honeymoon">Honeymoon</SelectItem>
                      <SelectItem value="Family">Family</SelectItem>
                      <SelectItem value="Heritage">Heritage</SelectItem>
                      <SelectItem value="Hill Station">Hill Station</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Days</Label>
                  <Input type="number" value={formData.duration_days} onChange={(e) => setFormData({ ...formData, duration_days: parseInt(e.target.value) })} required />
                </div>
                <div>
                  <Label>Nights</Label>
                  <Input type="number" value={formData.duration_nights} onChange={(e) => setFormData({ ...formData, duration_nights: parseInt(e.target.value) })} required />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Price per Person (₹)</Label>
                  <Input type="number" value={formData.price_per_person} onChange={(e) => setFormData({ ...formData, price_per_person: parseFloat(e.target.value) })} required />
                </div>
                <div>
                  <Label>Original Price (₹)</Label>
                  <Input type="number" value={formData.original_price} onChange={(e) => setFormData({ ...formData, original_price: parseFloat(e.target.value) })} />
                </div>
              </div>

              <div>
                <Label>Overview *</Label>
                <Textarea value={formData.overview} onChange={(e) => setFormData({ ...formData, overview: e.target.value })} rows={4} required />
              </div>

              <div>
                <Label>Status</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="featured">Featured</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Highlights */}
            <div>
              <Label>Highlights</Label>
              {formData.highlights.map((highlight, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <Input
                    value={highlight}
                    onChange={(e) => updateArrayItem('highlights', index, e.target.value)}
                    placeholder="Enter highlight"
                  />
                  <Button type="button" variant="outline" size="sm" onClick={() => removeArrayItem('highlights', index)}>Remove</Button>
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={() => addArrayItem('highlights', '')}>+ Add Highlight</Button>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowDialog(false)}>Cancel</Button>
              <Button type="submit" disabled={loading} className="bg-[#1A3C6E] hover:bg-[#142d54] text-white">
                {loading ? 'Saving...' : (editingPackage ? 'Update Package' : 'Create Package')}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManagePackages;

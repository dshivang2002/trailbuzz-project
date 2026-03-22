import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import axios from 'axios';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { toast } from 'sonner';

const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api`;

const ManageVehicles = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    model: '',
    image: '',
    capacity: 4,
    ac_type: 'AC',
    features: [''],
    price_per_km: 10,
    best_for: ''
  });

  useEffect(() => {
    if (!user) {
      navigate('/admin/login');
      return;
    }
    fetchVehicles();
  }, [user, navigate]);

  const fetchVehicles = async () => {
    try {
      const response = await axios.get(`${API_URL}/vehicles`);
      setVehicles(response.data);
    } catch (error) {
      console.error('Failed to fetch vehicles', error);
    }
  };

  const handleAddNew = () => {
    setEditingVehicle(null);
    setFormData({
      name: '',
      model: '',
      image: '',
      capacity: 4,
      ac_type: 'AC',
      features: [''],
      price_per_km: 10,
      best_for: ''
    });
    setShowDialog(true);
  };

  const handleEdit = (vehicle) => {
    setEditingVehicle(vehicle);
    setFormData(vehicle);
    setShowDialog(true);
  };

  const handleDelete = async (vehicleId) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      await axios.delete(`${API_URL}/vehicles/${vehicleId}`);
      toast.success('Vehicle deleted');
      fetchVehicles();
    } catch (error) {
      toast.error('Failed to delete');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingVehicle) {
        await axios.put(`${API_URL}/vehicles/${editingVehicle.id}`, formData);
        toast.success('Vehicle updated');
      } else {
        await axios.post(`${API_URL}/vehicles`, formData);
        toast.success('Vehicle created');
      }
      setShowDialog(false);
      fetchVehicles();
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
          <h1 className="text-3xl font-black text-[#1A3C6E]">Manage Vehicles</h1>
          <div className="flex gap-3">
            <Button onClick={() => navigate('/admin/dashboard')} variant="outline">\u2190 Back</Button>
            <Button onClick={handleAddNew} className="bg-[#22C55E] hover:bg-[#16a34a] text-white">
              <Plus size={20} className="mr-2" />Add Vehicle
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map((vehicle) => (
            <Card key={vehicle.id} className="p-6 border-0 shadow-sm">
              <h3 className="text-xl font-semibold text-[#1A3C6E] mb-2">{vehicle.name}</h3>
              <p className="text-sm text-[#475569] mb-4">{vehicle.model}</p>
              <div className="space-y-2 text-sm mb-4">
                <div>Capacity: {vehicle.capacity} seats</div>
                <div>{vehicle.ac_type}</div>
                <div>\u20b9{vehicle.price_per_km}/km</div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => handleEdit(vehicle)} className="flex-1">
                  <Edit size={16} className="mr-1" />Edit
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleDelete(vehicle.id)} className="text-red-600">
                  <Trash2 size={16} />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingVehicle ? 'Edit Vehicle' : 'Add Vehicle'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Vehicle Name</Label>
              <Input value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
            </div>
            <div>
              <Label>Model</Label>
              <Input value={formData.model} onChange={(e) => setFormData({...formData, model: e.target.value})} required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Capacity</Label>
                <Input type="number" value={formData.capacity} onChange={(e) => setFormData({...formData, capacity: parseInt(e.target.value)})} required />
              </div>
              <div>
                <Label>Price/km</Label>
                <Input type="number" value={formData.price_per_km} onChange={(e) => setFormData({...formData, price_per_km: parseFloat(e.target.value)})} required />
              </div>
            </div>
            <div>
              <Label>Best For</Label>
              <Input value={formData.best_for} onChange={(e) => setFormData({...formData, best_for: e.target.value})} />
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

export default ManageVehicles;

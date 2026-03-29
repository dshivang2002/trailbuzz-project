from fastapi import FastAPI, APIRouter, HTTPException, Depends, status, UploadFile, File, Form, Query, Body
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import List, Optional, Dict, Any
from datetime import datetime, timezone, timedelta
from jose import jwt, JWTError
from passlib.context import CryptContext
import os
import logging
import uuid
import razorpay
import aiofiles

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Security
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
security = HTTPBearer()
SECRET_KEY = os.environ.get('JWT_SECRET_KEY', 'your-secret-key-change-in-production')
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 1440

# Razorpay (configurable via settings)
razorpay_client = None

def get_razorpay_client():
    settings = None  # Will fetch from DB dynamically
    # Placeholder for now
    return None

# Logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

app = FastAPI()
api_router = APIRouter(prefix="/api")

# =======================
# PYDANTIC MODELS
# =======================

class AdminLoginRequest(BaseModel):
    email: EmailStr
    password: str

class AdminRegisterRequest(BaseModel):
    email: EmailStr
    password: str
    name: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"

# Package Models
class ItineraryDay(BaseModel):
    day: int
    title: str
    description: str
    activities: List[str] = []

class Package(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    slug: str
    destination_state: str
    destination_city: str
    tour_type: str
    duration_days: int
    duration_nights: int
    price_per_person: float
    original_price: Optional[float] = None
    images: List[str] = []
    highlights: List[str] = []
    overview: str
    itinerary: List[ItineraryDay] = []
    inclusions: List[str] = []
    exclusions: List[str] = []
    available_vehicles: List[str] = []
    difficulty_level: str = "Moderate"
    min_group_size: int = 1
    max_group_size: int = 50
    rating: float = 4.5
    review_count: int = 0
    status: str = "published"  # published, draft, featured
    meta_title: str = ""
    meta_description: str = ""
    featured_image: str = ""
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())
    updated_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class PackageCreate(BaseModel):
    name: str
    slug: str
    destination_state: str
    destination_city: str
    tour_type: str
    duration_days: int
    duration_nights: int
    price_per_person: float
    original_price: Optional[float] = None
    images: List[str] = []
    highlights: List[str] = []
    overview: str
    itinerary: List[ItineraryDay] = []
    inclusions: List[str] = []
    exclusions: List[str] = []
    available_vehicles: List[str] = []
    difficulty_level: str = "Moderate"
    min_group_size: int = 1
    max_group_size: int = 50
    status: str = "published"
    meta_title: str = ""
    meta_description: str = ""
    featured_image: str = ""

class PackageUpdate(BaseModel):
    name: Optional[str] = None
    destination_state: Optional[str] = None
    destination_city: Optional[str] = None
    tour_type: Optional[str] = None
    duration_days: Optional[int] = None
    duration_nights: Optional[int] = None
    price_per_person: Optional[float] = None
    original_price: Optional[float] = None
    images: Optional[List[str]] = None
    highlights: Optional[List[str]] = None
    overview: Optional[str] = None
    itinerary: Optional[List[ItineraryDay]] = None
    inclusions: Optional[List[str]] = None
    exclusions: Optional[List[str]] = None
    available_vehicles: Optional[List[str]] = None
    difficulty_level: Optional[str] = None
    status: Optional[str] = None
    meta_title: Optional[str] = None
    meta_description: Optional[str] = None

# Booking Models
class BookingTraveler(BaseModel):
    full_name: str
    email: EmailStr
    mobile: str
    address: str
    id_proof_type: str
    id_proof_number: str
    emergency_contact_name: str
    emergency_contact_number: str

class Booking(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    booking_id: str = Field(default_factory=lambda: f"BKG{uuid.uuid4().hex[:8].upper()}")
    package_id: str
    package_name: str
    travel_start_date: str
    num_adults: int
    num_children: int
    trip_type: str
    pickup_location: str
    drop_location: str
    traveler: BookingTraveler
    vehicle_id: str
    vehicle_name: str
    base_price: float
    vehicle_charges: float
    tax_amount: float
    total_amount: float
    advance_paid: float
    balance_due: float
    payment_status: str = "pending"  # pending, completed, failed
    booking_status: str = "pending"  # pending, confirmed, cancelled
    razorpay_order_id: Optional[str] = None
    razorpay_payment_id: Optional[str] = None
    special_requirements: str = ""
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())
    updated_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class BookingCreate(BaseModel):
    package_id: str
    package_name: str
    travel_start_date: str
    num_adults: int
    num_children: int
    trip_type: str
    pickup_location: str
    drop_location: str
    traveler: BookingTraveler
    vehicle_id: str
    vehicle_name: str
    base_price: float
    vehicle_charges: float
    tax_amount: float
    total_amount: float
    advance_paid: float
    special_requirements: str = ""

# Vehicle Models
class Vehicle(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    model: str
    image: str = ""
    capacity: int
    ac_type: str  # AC, Non-AC
    features: List[str] = []
    price_per_km: float = 0.0
    best_for: str = ""
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class VehicleCreate(BaseModel):
    name: str
    model: str
    image: str = ""
    capacity: int
    ac_type: str
    features: List[str] = []
    price_per_km: float = 0.0
    best_for: str = ""

# Blog Models
class Blog(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    slug: str
    content: str
    excerpt: str = ""
    featured_image: str = ""
    category: str = ""
    tags: List[str] = []
    author_name: str = "Trailbuzz Team"
    status: str = "published"  # published, draft
    views: int = 0
    meta_title: str = ""
    meta_description: str = ""
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())
    updated_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class BlogCreate(BaseModel):
    title: str
    slug: str
    content: str
    excerpt: str = ""
    featured_image: str = ""
    category: str = ""
    tags: List[str] = []
    author_name: str = "Trailbuzz Team"
    status: str = "published"
    meta_title: str = ""
    meta_description: str = ""

# Inquiry Model
class Inquiry(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: str
    destination: str = ""
    message: str
    status: str = "new"  # new, replied, closed
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class InquiryCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    destination: str = ""
    message: str

# Testimonial Model
class Testimonial(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    location: str
    tour_taken: str
    rating: int
    review: str
    photo: str = ""
    status: str = "pending"  # pending, approved, rejected
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class TestimonialCreate(BaseModel):
    name: str
    location: str
    tour_taken: str
    rating: int
    review: str
    photo: str = ""

# Settings Model
class Settings(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = "global_settings"
    business_name: str = "Trailbuzz"
    tagline: str = "Journey Beyond Limits"
    phone: str = "9198476606"
    email: str = "dshivang208@gmail.com"
    whatsapp: str = "9198476606"
    address: str = "1004, Phase 4, Sector 59, Sahibzada Ajit Singh Nagar, Punjab 160059"
    google_maps_link: str = ""
    razorpay_key_id: str = ""
    razorpay_key_secret: str = ""
    smtp_host: str = ""
    smtp_port: int = 587
    smtp_username: str = ""
    smtp_password: str = ""
    sms_api_key: str = ""
    google_analytics_id: str = ""
    updated_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class SettingsUpdate(BaseModel):
    business_name: Optional[str] = None
    tagline: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    whatsapp: Optional[str] = None
    address: Optional[str] = None
    google_maps_link: Optional[str] = None
    razorpay_key_id: Optional[str] = None
    razorpay_key_secret: Optional[str] = None
    smtp_host: Optional[str] = None
    smtp_port: Optional[int] = None
    smtp_username: Optional[str] = None
    smtp_password: Optional[str] = None
    sms_api_key: Optional[str] = None
    google_analytics_id: Optional[str] = None

# Payment Models
class PaymentOrderRequest(BaseModel):
    booking_id: str
    amount: float

class PaymentVerificationRequest(BaseModel):
    razorpay_order_id: str
    razorpay_payment_id: str
    razorpay_signature: str
    booking_id: str

# =======================
# HELPER FUNCTIONS
# =======================

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_admin(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        token = credentials.credentials
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
        return email
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")

# =======================
# AUTH ROUTES
# =======================

@api_router.post("/auth/register", response_model=TokenResponse)
async def register_admin(request: AdminRegisterRequest):
    existing_user = await db.users.find_one({"email": request.email}, {"_id": 0})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = pwd_context.hash(request.password)
    user_doc = {
        "id": str(uuid.uuid4()),
        "email": request.email,
        "name": request.name,
        "password": hashed_password,
        "role": "admin",
        "created_at": datetime.now(timezone.utc).isoformat()
    }
    await db.users.insert_one(user_doc)
    
    access_token = create_access_token(data={"sub": request.email})
    return {"access_token": access_token, "token_type": "bearer"}

@api_router.post("/auth/login", response_model=TokenResponse)
async def login_admin(request: AdminLoginRequest):
    user = await db.users.find_one({"email": request.email}, {"_id": 0})
    if not user or not pwd_context.verify(request.password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    access_token = create_access_token(data={"sub": request.email})
    return {"access_token": access_token, "token_type": "bearer"}

@api_router.get("/auth/me")
async def get_current_admin_info(current_admin: str = Depends(get_current_admin)):
    user = await db.users.find_one({"email": current_admin}, {"_id": 0, "password": 0})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

# =======================
# PACKAGE ROUTES
# =======================

@api_router.post("/packages", response_model=Package)
async def create_package(package: PackageCreate, current_admin: str = Depends(get_current_admin)):
    package_doc = package.model_dump()
    package_obj = Package(**package_doc)
    doc = package_obj.model_dump()
    await db.packages.insert_one(doc)
    return package_obj

@api_router.get("/packages", response_model=List[Package])
async def get_packages(
    state: Optional[str] = None,
    tour_type: Optional[str] = None,
    status: Optional[str] = None,
    search: Optional[str] = None,
    limit: int = 100
):
    query = {}
    if state:
        query["destination_state"] = state
    if tour_type:
        query["tour_type"] = tour_type
    if status:
        query["status"] = status
    if search:
        query["$or"] = [
            {"name": {"$regex": search, "$options": "i"}},
            {"destination_city": {"$regex": search, "$options": "i"}}
        ]
    
    packages = await db.packages.find(query, {"_id": 0}).to_list(limit)
    return packages

@api_router.get("/packages/featured", response_model=List[Package])
async def get_featured_packages(limit: int = 6):
    packages = await db.packages.find({"status": "featured"}, {"_id": 0}).to_list(limit)
    return packages

@api_router.get("/packages/{package_id}", response_model=Package)
async def get_package(package_id: str):
    package = await db.packages.find_one({"id": package_id}, {"_id": 0})
    if not package:
        raise HTTPException(status_code=404, detail="Package not found")
    return package

@api_router.get("/packages/slug/{slug}", response_model=Package)
async def get_package_by_slug(slug: str):
    package = await db.packages.find_one({"slug": slug}, {"_id": 0})
    if not package:
        raise HTTPException(status_code=404, detail="Package not found")
    return package

@api_router.put("/packages/{package_id}", response_model=Package)
async def update_package(package_id: str, update: PackageUpdate, current_admin: str = Depends(get_current_admin)):
    update_data = {k: v for k, v in update.model_dump().items() if v is not None}
    update_data["updated_at"] = datetime.now(timezone.utc).isoformat()
    
    result = await db.packages.update_one({"id": package_id}, {"$set": update_data})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Package not found")
    
    package = await db.packages.find_one({"id": package_id}, {"_id": 0})
    return package

@api_router.delete("/packages/{package_id}")
async def delete_package(package_id: str, current_admin: str = Depends(get_current_admin)):
    result = await db.packages.delete_one({"id": package_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Package not found")
    return {"message": "Package deleted successfully"}

# =======================
# BOOKING ROUTES
# =======================

@api_router.post("/bookings", response_model=Booking)
async def create_booking(booking: BookingCreate):
    booking_doc = booking.model_dump()
    booking_obj = Booking(**booking_doc)
    doc = booking_obj.model_dump()
    await db.bookings.insert_one(doc)
    return booking_obj

@api_router.get("/bookings", response_model=List[Booking])
async def get_bookings(current_admin: str = Depends(get_current_admin), limit: int = 100):
    bookings = await db.bookings.find({}, {"_id": 0}).sort("created_at", -1).to_list(limit)
    return bookings

@api_router.get("/bookings/{booking_id}", response_model=Booking)
async def get_booking(booking_id: str):
    booking = await db.bookings.find_one({"booking_id": booking_id}, {"_id": 0})
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    return booking

@api_router.put("/bookings/{booking_id}/status")
async def update_booking_status(booking_id: str, status: str = Body(...), current_admin: str = Depends(get_current_admin)):
    result = await db.bookings.update_one(
        {"booking_id": booking_id},
        {"$set": {"booking_status": status, "updated_at": datetime.now(timezone.utc).isoformat()}}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Booking not found")
    return {"message": "Booking status updated successfully"}

# =======================
# VEHICLE ROUTES
# =======================

@api_router.post("/vehicles", response_model=Vehicle)
async def create_vehicle(vehicle: VehicleCreate, current_admin: str = Depends(get_current_admin)):
    vehicle_doc = vehicle.model_dump()
    vehicle_obj = Vehicle(**vehicle_doc)
    doc = vehicle_obj.model_dump()
    await db.vehicles.insert_one(doc)
    return vehicle_obj

@api_router.get("/vehicles", response_model=List[Vehicle])
async def get_vehicles():
    vehicles = await db.vehicles.find({}, {"_id": 0}).to_list(100)
    return vehicles

@api_router.get("/vehicles/{vehicle_id}", response_model=Vehicle)
async def get_vehicle(vehicle_id: str):
    vehicle = await db.vehicles.find_one({"id": vehicle_id}, {"_id": 0})
    if not vehicle:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    return vehicle

@api_router.delete("/vehicles/{vehicle_id}")
async def delete_vehicle(vehicle_id: str, current_admin: str = Depends(get_current_admin)):
    result = await db.vehicles.delete_one({"id": vehicle_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    return {"message": "Vehicle deleted successfully"}

# =======================
# BLOG ROUTES
# =======================

@api_router.post("/blogs", response_model=Blog)
async def create_blog(blog: BlogCreate, current_admin: str = Depends(get_current_admin)):
    blog_doc = blog.model_dump()
    blog_obj = Blog(**blog_doc)
    doc = blog_obj.model_dump()
    await db.blogs.insert_one(doc)
    return blog_obj

@api_router.get("/blogs", response_model=List[Blog])
async def get_blogs(category: Optional[str] = None, status: str = "published", limit: int = 100):
    query = {"status": status}
    if category:
        query["category"] = category
    blogs = await db.blogs.find(query, {"_id": 0}).sort("created_at", -1).to_list(limit)
    return blogs

@api_router.get("/blogs/slug/{slug}", response_model=Blog)
async def get_blog_by_slug(slug: str):
    blog = await db.blogs.find_one({"slug": slug}, {"_id": 0})
    if not blog:
        raise HTTPException(status_code=404, detail="Blog not found")
    # Increment views
    await db.blogs.update_one({"slug": slug}, {"$inc": {"views": 1}})
    return blog

@api_router.delete("/blogs/{blog_id}")
async def delete_blog(blog_id: str, current_admin: str = Depends(get_current_admin)):
    result = await db.blogs.delete_one({"id": blog_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Blog not found")
    return {"message": "Blog deleted successfully"}

# =======================
# INQUIRY ROUTES
# =======================

@api_router.post("/inquiries", response_model=Inquiry)
async def create_inquiry(inquiry: InquiryCreate):
    inquiry_doc = inquiry.model_dump()
    inquiry_obj = Inquiry(**inquiry_doc)
    doc = inquiry_obj.model_dump()
    await db.inquiries.insert_one(doc)
    return inquiry_obj

@api_router.get("/inquiries", response_model=List[Inquiry])
async def get_inquiries(current_admin: str = Depends(get_current_admin), limit: int = 100):
    inquiries = await db.inquiries.find({}, {"_id": 0}).sort("created_at", -1).to_list(limit)
    return inquiries

@api_router.put("/inquiries/{inquiry_id}/status")
async def update_inquiry_status(inquiry_id: str, status: str = Body(...), current_admin: str = Depends(get_current_admin)):
    result = await db.inquiries.update_one({"id": inquiry_id}, {"$set": {"status": status}})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Inquiry not found")
    return {"message": "Inquiry status updated successfully"}

# =======================
# TESTIMONIAL ROUTES
# =======================

@api_router.post("/testimonials", response_model=Testimonial)
async def create_testimonial(testimonial: TestimonialCreate, current_admin: str = Depends(get_current_admin)):
    testimonial_doc = testimonial.model_dump()
    testimonial_obj = Testimonial(**testimonial_doc)
    doc = testimonial_obj.model_dump()
    await db.testimonials.insert_one(doc)
    return testimonial_obj

@api_router.get("/testimonials", response_model=List[Testimonial])
async def get_testimonials(status: str = "approved", limit: int = 100):
    testimonials = await db.testimonials.find({"status": status}, {"_id": 0}).sort("created_at", -1).to_list(limit)
    return testimonials

@api_router.put("/testimonials/{testimonial_id}/status")
async def update_testimonial_status(testimonial_id: str, status: str = Body(...), current_admin: str = Depends(get_current_admin)):
    result = await db.testimonials.update_one({"id": testimonial_id}, {"$set": {"status": status}})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Testimonial not found")
    return {"message": "Testimonial status updated successfully"}

@api_router.delete("/testimonials/{testimonial_id}")
async def delete_testimonial(testimonial_id: str, current_admin: str = Depends(get_current_admin)):
    result = await db.testimonials.delete_one({"id": testimonial_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Testimonial not found")
    return {"message": "Testimonial deleted successfully"}

# =======================
# SETTINGS ROUTES
# =======================

@api_router.get("/settings", response_model=Settings)
async def get_settings():
    settings = await db.settings.find_one({"id": "global_settings"}, {"_id": 0})
    if not settings:
        # Create default settings
        default_settings = Settings()
        await db.settings.insert_one(default_settings.model_dump())
        return default_settings
    return settings

@api_router.put("/settings", response_model=Settings)
async def update_settings(update: SettingsUpdate, current_admin: str = Depends(get_current_admin)):
    update_data = {k: v for k, v in update.model_dump().items() if v is not None}
    update_data["updated_at"] = datetime.now(timezone.utc).isoformat()
    
    await db.settings.update_one(
        {"id": "global_settings"},
        {"$set": update_data},
        upsert=True
    )
    
    settings = await db.settings.find_one({"id": "global_settings"}, {"_id": 0})
    return settings

# =======================
# PAYMENT ROUTES
# =======================

@api_router.post("/payment/create-order")
async def create_payment_order(request: PaymentOrderRequest):
    try:
        settings = await db.settings.find_one({"id": "global_settings"}, {"_id": 0})
        if not settings or not settings.get("razorpay_key_id"):
            return {"message": "Payment gateway not configured. Please configure in admin settings."}
        
        client = razorpay.Client(auth=(settings["razorpay_key_id"], settings["razorpay_key_secret"]))
        
        order_data = {
            "amount": int(request.amount * 100),  # Convert to paise
            "currency": "INR",
            "receipt": request.booking_id[:40],
            "payment_capture": 1
        }
        
        order = client.order.create(data=order_data)
        
        # Update booking with order ID
        await db.bookings.update_one(
            {"booking_id": request.booking_id},
            {"$set": {"razorpay_order_id": order["id"]}}
        )
        
        return {
            "order_id": order["id"],
            "amount": order["amount"],
            "currency": order["currency"],
            "key_id": settings["razorpay_key_id"]
        }
    except Exception as e:
        logger.error(f"Payment order creation failed: {str(e)}")
        raise HTTPException(status_code=500, detail="Payment order creation failed")

@api_router.post("/payment/verify")
async def verify_payment(request: PaymentVerificationRequest):
    try:
        settings = await db.settings.find_one({"id": "global_settings"}, {"_id": 0})
        if not settings or not settings.get("razorpay_key_secret"):
            raise HTTPException(status_code=500, detail="Payment gateway not configured")
        
        client = razorpay.Client(auth=(settings["razorpay_key_id"], settings["razorpay_key_secret"]))
        
        # Verify signature
        params_dict = {
            "razorpay_order_id": request.razorpay_order_id,
            "razorpay_payment_id": request.razorpay_payment_id,
            "razorpay_signature": request.razorpay_signature
        }
        
        client.utility.verify_payment_signature(params_dict)
        
        # Update booking
        await db.bookings.update_one(
            {"booking_id": request.booking_id},
            {"$set": {
                "razorpay_payment_id": request.razorpay_payment_id,
                "payment_status": "completed",
                "booking_status": "confirmed",
                "updated_at": datetime.now(timezone.utc).isoformat()
            }}
        )
        
        return {"message": "Payment verified successfully", "status": "success"}
    except razorpay.errors.SignatureVerificationError:
        raise HTTPException(status_code=400, detail="Invalid payment signature")
    except Exception as e:
        logger.error(f"Payment verification failed: {str(e)}")
        raise HTTPException(status_code=500, detail="Payment verification failed")

# =======================
# STATS ROUTE FOR DASHBOARD
# =======================

@api_router.get("/stats/dashboard")
async def get_dashboard_stats(current_admin: str = Depends(get_current_admin)):
    total_bookings = await db.bookings.count_documents({})
    total_packages = await db.packages.count_documents({})
    total_inquiries = await db.inquiries.count_documents({})
    
    # Calculate total revenue
    bookings = await db.bookings.find({"payment_status": "completed"}, {"_id": 0, "advance_paid": 1}).to_list(1000)
    total_revenue = sum(b.get("advance_paid", 0) for b in bookings)
    
    return {
        "total_bookings": total_bookings,
        "total_packages": total_packages,
        "total_inquiries": total_inquiries,
        "total_revenue": total_revenue
    }

# Include router
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

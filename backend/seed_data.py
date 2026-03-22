import asyncio
import sys
sys.path.append('/app/backend')

from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv

load_dotenv('/app/backend/.env')

mongo_url = os.environ['MONGO_URL']
db_name = os.environ['DB_NAME']

client = AsyncIOMotorClient(mongo_url)
db = client[db_name]

async def seed_data():
    print("Seeding database...")
    
    # Clear existing data
    await db.packages.delete_many({})
    await db.vehicles.delete_many({})
    await db.testimonials.delete_many({})
    
    # Sample Packages
    packages = [
        {
            "id": "pkg-char-dham-001",
            "name": "Char Dham Yatra - Complete Spiritual Journey",
            "slug": "char-dham-yatra",
            "destination_state": "Uttarakhand",
            "destination_city": "Haridwar",
            "tour_type": "Pilgrimage",
            "duration_days": 10,
            "duration_nights": 9,
            "price_per_person": 25000,
            "original_price": 30000,
            "images": [
                "https://images.pexels.com/photos/6808521/pexels-photo-6808521.jpeg",
                "https://images.unsplash.com/photo-1611875371292-a2bbee7c496b"
            ],
            "highlights": [
                "Visit all 4 Dhams - Yamunotri, Gangotri, Kedarnath, Badrinath",
                "Comfortable accommodation throughout",
                "Experienced Purohit for rituals",
                "Helicopter service available for Kedarnath"
            ],
            "overview": "Embark on a divine journey to the Char Dham - the four sacred Hindu pilgrimage sites nestled in the Himalayas. This carefully crafted itinerary ensures a spiritually enriching experience while taking care of all your comfort needs.",
            "itinerary": [
                {
                    "day": 1,
                    "title": "Arrival in Haridwar",
                    "description": "Arrive at Haridwar and check into hotel. Evening Ganga Aarti at Har Ki Pauri.",
                    "activities": ["Hotel check-in", "Ganga Aarti", "Rest"]
                },
                {
                    "day": 2,
                    "title": "Haridwar to Barkot",
                    "description": "Drive to Barkot via Mussoorie. Check into hotel and rest.",
                    "activities": ["Scenic drive", "Mussoorie sightseeing", "Hotel check-in"]
                }
            ],
            "inclusions": [
                "Accommodation in 3-star hotels",
                "All meals (breakfast, lunch, dinner)",
                "Transportation in AC vehicle",
                "All toll taxes and parking fees",
                "Experienced driver"
            ],
            "exclusions": [
                "Helicopter tickets",
                "Personal expenses",
                "Travel insurance",
                "Tips and gratuities"
            ],
            "available_vehicles": ["veh-innova-001", "veh-ertiga-001", "veh-traveller-001"],
            "difficulty_level": "Moderate",
            "min_group_size": 2,
            "max_group_size": 20,
            "rating": 4.8,
            "review_count": 156,
            "status": "featured",
            "meta_title": "Char Dham Yatra Package - Complete Spiritual Journey",
            "meta_description": "Book the best Char Dham Yatra package from Yatrika. Visit Yamunotri, Gangotri, Kedarnath & Badrinath with comfortable stay and transport.",
            "featured_image": "https://images.pexels.com/photos/6808521/pexels-photo-6808521.jpeg",
            "created_at": "2026-01-01T00:00:00Z",
            "updated_at": "2026-01-01T00:00:00Z"
        },
        {
            "id": "pkg-shimla-manali-001",
            "name": "Shimla Manali Honeymoon Package",
            "slug": "shimla-manali-honeymoon",
            "destination_state": "Himachal Pradesh",
            "destination_city": "Shimla",
            "tour_type": "Honeymoon",
            "duration_days": 6,
            "duration_nights": 5,
            "price_per_person": 18000,
            "original_price": 22000,
            "images": [
                "https://images.pexels.com/photos/36213405/pexels-photo-36213405.jpeg",
                "https://images.pexels.com/photos/570031/pexels-photo-570031.jpeg"
            ],
            "highlights": [
                "Romantic stays in premium hotels",
                "Candlelight dinner included",
                "Visit Solang Valley and Rohtang Pass",
                "Mall Road shopping"
            ],
            "overview": "Experience the romance of the Himalayas with our specially curated honeymoon package. Shimla and Manali offer the perfect blend of scenic beauty, adventure, and cozy moments.",
            "itinerary": [
                {
                    "day": 1,
                    "title": "Arrival in Shimla",
                    "description": "Arrive in Shimla and check into your romantic hotel. Evening at Mall Road.",
                    "activities": ["Hotel check-in", "Mall Road walk", "Dinner"]
                }
            ],
            "inclusions": [
                "Luxury accommodation",
                "Breakfast and dinner",
                "Candlelight dinner on one evening",
                "All transfers and sightseeing",
                "Honeymoon cake and decoration"
            ],
            "exclusions": [
                "Lunch",
                "Adventure activities charges",
                "Personal expenses"
            ],
            "available_vehicles": ["veh-innova-crysta-001", "veh-dzire-001"],
            "difficulty_level": "Easy",
            "min_group_size": 2,
            "max_group_size": 10,
            "rating": 4.9,
            "review_count": 234,
            "status": "featured",
            "meta_title": "Shimla Manali Honeymoon Package - Romantic Getaway",
            "meta_description": "Book romantic Shimla Manali honeymoon package with candlelight dinner, luxury stays and beautiful sightseeing.",
            "featured_image": "https://images.pexels.com/photos/36213405/pexels-photo-36213405.jpeg",
            "created_at": "2026-01-01T00:00:00Z",
            "updated_at": "2026-01-01T00:00:00Z"
        },
        {
            "id": "pkg-jaipur-001",
            "name": "Jaipur Heritage Tour - Pink City Exploration",
            "slug": "jaipur-heritage-tour",
            "destination_state": "Rajasthan",
            "destination_city": "Jaipur",
            "tour_type": "Heritage",
            "duration_days": 4,
            "duration_nights": 3,
            "price_per_person": 12000,
            "images": [
                "https://images.pexels.com/photos/570031/pexels-photo-570031.jpeg"
            ],
            "highlights": [
                "Amber Fort visit with elephant ride",
                "City Palace and Jantar Mantar",
                "Hawa Mahal photo stop",
                "Traditional Rajasthani dinner"
            ],
            "overview": "Explore the magnificent Pink City of Jaipur with its royal palaces, historic forts, and vibrant culture. Experience Rajasthani hospitality at its finest.",
            "itinerary": [
                {
                    "day": 1,
                    "title": "Arrival and City Palace",
                    "description": "Arrive in Jaipur and visit City Palace and Jantar Mantar.",
                    "activities": ["City Palace tour", "Jantar Mantar visit", "Local market"]
                }
            ],
            "inclusions": [
                "3-star hotel accommodation",
                "Breakfast included",
                "All monument entry fees",
                "Elephant ride at Amber Fort",
                "AC transportation"
            ],
            "exclusions": [
                "Lunch and dinner",
                "Camera fees at monuments",
                "Shopping expenses"
            ],
            "available_vehicles": ["veh-dzire-001", "veh-ertiga-001"],
            "difficulty_level": "Easy",
            "min_group_size": 2,
            "max_group_size": 15,
            "rating": 4.7,
            "review_count": 189,
            "status": "featured",
            "meta_title": "Jaipur Heritage Tour Package - Pink City",
            "meta_description": "Explore Jaipur's royal palaces and forts with our heritage tour package. Visit Amber Fort, City Palace, Hawa Mahal and more.",
            "featured_image": "https://images.pexels.com/photos/570031/pexels-photo-570031.jpeg",
            "created_at": "2026-01-01T00:00:00Z",
            "updated_at": "2026-01-01T00:00:00Z"
        }
    ]
    
    # Sample Vehicles
    vehicles = [
        {
            "id": "veh-dzire-001",
            "name": "Maruti Suzuki Dzire",
            "model": "2024 Model",
            "image": "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2",
            "capacity": 4,
            "ac_type": "AC",
            "features": ["Music System", "GPS Navigation", "Clean Interior"],
            "price_per_km": 10,
            "best_for": "Couples and small families",
            "created_at": "2026-01-01T00:00:00Z"
        },
        {
            "id": "veh-innova-crysta-001",
            "name": "Toyota Innova Crysta",
            "model": "2024 Model",
            "image": "https://images.unsplash.com/photo-1581540222194-0def2dda95b8",
            "capacity": 6,
            "ac_type": "AC",
            "features": ["Premium Comfort", "Music System", "Spacious", "GPS"],
            "price_per_km": 15,
            "best_for": "Families and small groups",
            "created_at": "2026-01-01T00:00:00Z"
        },
        {
            "id": "veh-ertiga-001",
            "name": "Maruti Ertiga",
            "model": "2024 Model",
            "image": "https://images.unsplash.com/photo-1552519507-da3b142c6e3d",
            "capacity": 7,
            "ac_type": "AC",
            "features": ["Comfortable Seating", "Music System", "Good Luggage Space"],
            "price_per_km": 12,
            "best_for": "Medium groups and families",
            "created_at": "2026-01-01T00:00:00Z"
        },
        {
            "id": "veh-traveller-001",
            "name": "Tempo Traveller",
            "model": "17 Seater",
            "image": "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957",
            "capacity": 17,
            "ac_type": "AC",
            "features": ["Push Back Seats", "Music System", "Large Luggage Space", "Reading Lights"],
            "price_per_km": 25,
            "best_for": "Large groups and tours",
            "created_at": "2026-01-01T00:00:00Z"
        }
    ]
    
    # Sample Testimonials
    testimonials = [
        {
            "id": "test-001",
            "name": "Priya Sharma",
            "location": "Delhi",
            "tour_taken": "Char Dham Yatra",
            "rating": 5,
            "review": "The Char Dham Yatra with Yatrika was a life-changing experience. Everything was well-organized, and our guide was very knowledgeable. Highly recommend!",
            "photo": "",
            "status": "approved",
            "created_at": "2026-01-15T00:00:00Z"
        },
        {
            "id": "test-002",
            "name": "Rahul and Anjali",
            "location": "Mumbai",
            "tour_taken": "Shimla Manali Honeymoon",
            "rating": 5,
            "review": "Our honeymoon in Shimla and Manali was absolutely magical! The candlelight dinner, cozy hotels, and beautiful scenery made it perfect. Thank you Yatrika!",
            "photo": "",
            "status": "approved",
            "created_at": "2026-02-01T00:00:00Z"
        },
        {
            "id": "test-003",
            "name": "Suresh Patel",
            "location": "Ahmedabad",
            "tour_taken": "Jaipur Heritage Tour",
            "rating": 5,
            "review": "Jaipur tour was excellent. We loved visiting the palaces and forts. The elephant ride at Amber Fort was unforgettable. Great service!",
            "photo": "",
            "status": "approved",
            "created_at": "2026-02-10T00:00:00Z"
        }
    ]
    
    # Insert data
    await db.packages.insert_many(packages)
    print(f"Inserted {len(packages)} packages")
    
    await db.vehicles.insert_many(vehicles)
    print(f"Inserted {len(vehicles)} vehicles")
    
    await db.testimonials.insert_many(testimonials)
    print(f"Inserted {len(testimonials)} testimonials")
    
    # Create admin user (password: admin123)
    admin_user = {
        "id": "admin-001",
        "email": "admin@yatrika.com",
        "name": "Admin User",
        "password": "$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIJpL2Nu5.", # admin123
        "role": "admin",
        "created_at": "2026-01-01T00:00:00Z"
    }
    
    existing_admin = await db.users.find_one({"email": "admin@yatrika.com"})
    if not existing_admin:
        await db.users.insert_one(admin_user)
        print("Admin user created: admin@yatrika.com / admin123")
    
    print("Database seeding completed!")

if __name__ == "__main__":
    asyncio.run(seed_data())

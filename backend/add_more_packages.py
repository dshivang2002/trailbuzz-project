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

async def add_packages():
    print("Adding more packages...")
    
    new_packages = [
        {
            "id": "pkg-nainital-001",
            "name": "Nainital Lake City Tour - 3 Days",
            "slug": "nainital-lake-city-tour",
            "destination_state": "Uttarakhand",
            "destination_city": "Nainital",
            "tour_type": "Hill Station",
            "duration_days": 3,
            "duration_nights": 2,
            "price_per_person": 8000,
            "original_price": 10000,
            "images": ["https://images.unsplash.com/photo-1587474260584-136574528ed5"],
            "highlights": ["Naini Lake boating", "Snow View Point", "Naina Devi Temple", "Mall Road shopping"],
            "overview": "Experience the beauty of Nainital, the Lake District of India. Enjoy boating, scenic views, and pleasant weather.",
            "itinerary": [{"day": 1, "title": "Arrival & Lake Tour", "description": "Check-in and Naini Lake visit", "activities": ["Boating", "Mall Road"]}],
            "inclusions": ["2 nights hotel", "Breakfast", "Sightseeing", "Transportation"],
            "exclusions": ["Lunch & dinner", "Personal expenses"],
            "available_vehicles": ["veh-dzire-001", "veh-innova-crysta-001"],
            "difficulty_level": "Easy",
            "min_group_size": 2,
            "max_group_size": 15,
            "rating": 4.6,
            "review_count": 89,
            "status": "published",
            "meta_title": "Nainital Tour Package 3D/2N - Hill Station Holiday",
            "meta_description": "Book Nainital tour package with lake boating, Snow View, and Mall Road. Perfect hill station getaway.",
            "featured_image": "https://images.unsplash.com/photo-1587474260584-136574528ed5",
            "created_at": "2026-01-05T00:00:00Z",
            "updated_at": "2026-01-05T00:00:00Z"
        },
        {
            "id": "pkg-mussoorie-001",
            "name": "Mussoorie Queen of Hills - Weekend Package",
            "slug": "mussoorie-queen-of-hills-weekend",
            "destination_state": "Uttarakhand",
            "destination_city": "Mussoorie",
            "tour_type": "Hill Station",
            "duration_days": 2,
            "duration_nights": 1,
            "price_per_person": 6000,
            "images": ["https://images.unsplash.com/photo-1566996410338-0c2c8b75d8f3"],
            "highlights": ["Kempty Falls", "Gun Hill", "Mall Road", "Camel's Back Road"],
            "overview": "Quick weekend getaway to Mussoorie with waterfalls, viewpoints, and pleasant climate.",
            "itinerary": [{"day": 1, "title": "Arrival & Sightseeing", "description": "Full day Mussoorie tour", "activities": ["Kempty Falls", "Gun Hill ropeway"]}],
            "inclusions": ["1 night hotel", "Breakfast", "Sightseeing"],
            "exclusions": ["Meals", "Cable car charges"],
            "available_vehicles": ["veh-dzire-001", "veh-ertiga-001"],
            "difficulty_level": "Easy",
            "min_group_size": 2,
            "max_group_size": 12,
            "rating": 4.5,
            "review_count": 67,
            "status": "published",
            "meta_title": "Mussoorie Weekend Package 2D/1N",
            "meta_description": "Quick Mussoorie tour with Kempty Falls, Gun Hill, Mall Road. Perfect weekend trip.",
            "featured_image": "https://images.unsplash.com/photo-1566996410338-0c2c8b75d8f3",
            "created_at": "2026-01-06T00:00:00Z",
            "updated_at": "2026-01-06T00:00:00Z"
        },
        {
            "id": "pkg-agra-001",
            "name": "Agra Taj Mahal Day Tour from Delhi",
            "slug": "agra-taj-mahal-day-tour",
            "destination_state": "Uttar Pradesh",
            "destination_city": "Agra",
            "tour_type": "Heritage",
            "duration_days": 1,
            "duration_nights": 0,
            "price_per_person": 4500,
            "images": ["https://images.unsplash.com/photo-1564507592333-c60657eea523"],
            "highlights": ["Taj Mahal sunrise visit", "Agra Fort", "Mehtab Bagh", "Same day return"],
            "overview": "Experience the magnificent Taj Mahal on this day tour from Delhi. Visit UNESCO World Heritage sites.",
            "itinerary": [{"day": 1, "title": "Delhi to Agra Day Trip", "description": "Full day Agra sightseeing", "activities": ["Taj Mahal", "Agra Fort", "Return to Delhi"]}],
            "inclusions": ["AC car from Delhi", "Entry tickets", "Guide", "Lunch"],
            "exclusions": ["Hotel stay", "Personal expenses"],
            "available_vehicles": ["veh-dzire-001", "veh-innova-crysta-001"],
            "difficulty_level": "Easy",
            "min_group_size": 1,
            "max_group_size": 8,
            "rating": 4.8,
            "review_count": 234,
            "status": "featured",
            "meta_title": "Taj Mahal Day Tour from Delhi - Same Day Agra Trip",
            "meta_description": "Visit Taj Mahal and Agra Fort on same day tour from Delhi. Includes transport, guide, tickets.",
            "featured_image": "https://images.unsplash.com/photo-1564507592333-c60657eea523",
            "created_at": "2026-01-07T00:00:00Z",
            "updated_at": "2026-01-07T00:00:00Z"
        },
        {
            "id": "pkg-varanasi-001",
            "name": "Varanasi Spiritual Tour - 3 Days",
            "slug": "varanasi-spiritual-tour",
            "destination_state": "Uttar Pradesh",
            "destination_city": "Varanasi",
            "tour_type": "Pilgrimage",
            "duration_days": 3,
            "duration_nights": 2,
            "price_per_person": 9000,
            "images": ["https://images.unsplash.com/photo-1561361513-2d000a50f0dc"],
            "highlights": ["Ganga Aarti at Dashashwamedh", "Sunrise boat ride", "Kashi Vishwanath Temple", "Sarnath excursion"],
            "overview": "Discover the spiritual heart of India in Varanasi, one of the world's oldest living cities.",
            "itinerary": [{"day": 1, "title": "Arrival & Ganga Aarti", "description": "Evening Ganga Aarti ceremony", "activities": ["Dashashwamedh Ghat", "Temple visit"]}],
            "inclusions": ["2 nights hotel", "Breakfast", "Boat ride", "Sightseeing"],
            "exclusions": ["Lunch & dinner", "Temple donations"],
            "available_vehicles": ["veh-dzire-001", "veh-ertiga-001"],
            "difficulty_level": "Moderate",
            "min_group_size": 1,
            "max_group_size": 20,
            "rating": 4.7,
            "review_count": 145,
            "status": "published",
            "meta_title": "Varanasi Tour Package - Spiritual India Experience",
            "meta_description": "Experience Varanasi's spiritual essence with Ganga Aarti, boat rides, and ancient temples.",
            "featured_image": "https://images.unsplash.com/photo-1561361513-2d000a50f0dc",
            "created_at": "2026-01-08T00:00:00Z",
            "updated_at": "2026-01-08T00:00:00Z"
        },
        {
            "id": "pkg-rishikesh-adventure-001",
            "name": "Rishikesh Adventure - River Rafting & Camping",
            "slug": "rishikesh-adventure-rafting-camping",
            "destination_state": "Uttarakhand",
            "destination_city": "Rishikesh",
            "tour_type": "Adventure",
            "duration_days": 2,
            "duration_nights": 1,
            "price_per_person": 5500,
            "images": ["https://images.unsplash.com/photo-1626621341517-bbf3d9990a23"],
            "highlights": ["16 km river rafting", "Beach camping", "Bonfire & BBQ", "Cliff jumping"],
            "overview": "Adventure packed weekend in Rishikesh with white water rafting, camping under stars, and thrilling activities.",
            "itinerary": [{"day": 1, "title": "Rafting & Camping", "description": "River rafting followed by beach camping", "activities": ["Rafting", "Camping setup", "Bonfire"]}],
            "inclusions": ["Rafting equipment", "Camping tents", "Meals", "Safety gear", "Guide"],
            "exclusions": ["Transport to Rishikesh", "Personal expenses"],
            "available_vehicles": [],
            "difficulty_level": "Moderate to Difficult",
            "min_group_size": 4,
            "max_group_size": 30,
            "rating": 4.9,
            "review_count": 267,
            "status": "featured",
            "meta_title": "Rishikesh River Rafting & Camping Package",
            "meta_description": "Adventure rafting in Rishikesh with beach camping, bonfire, and thrilling water sports.",
            "featured_image": "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23",
            "created_at": "2026-01-09T00:00:00Z",
            "updated_at": "2026-01-09T00:00:00Z"
        }
    ]
    
    for pkg in new_packages:
        existing = await db.packages.find_one({"slug": pkg["slug"]})
        if not existing:
            await db.packages.insert_one(pkg)
            print(f"Added: {pkg['name']}")
        else:
            print(f"Already exists: {pkg['name']}")
    
    print(f"\nTotal packages now: {await db.packages.count_documents({})}")

if __name__ == "__main__":
    asyncio.run(add_packages())

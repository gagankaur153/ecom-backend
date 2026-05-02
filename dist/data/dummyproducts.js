"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dummyProducts = [
    {
        category: "electronics",
        title: "Wireless Bluetooth Headphones",
        price: 2499,
        description: "Comfortable over-ear headphones with deep bass, clear calls, and long battery life.",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80"
    },
    {
        category: "electronics",
        title: "Smart Fitness Watch",
        price: 3499,
        description: "Track workouts, heart rate, sleep, and daily activity from a bright touch display.",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80"
    },
    {
        category: "electronics",
        title: "Portable Bluetooth Speaker",
        price: 1799,
        description: "Splash-resistant speaker with punchy sound for travel, parties, and daily listening.",
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=900&q=80"
    },
    {
        category: "electronics",
        title: "USB-C Fast Charger",
        price: 899,
        description: "Compact fast charger with safe power delivery for phones, tablets, and accessories.",
        image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=900&q=80"
    },
    {
        category: "electronics",
        title: "Mechanical Keyboard",
        price: 4299,
        description: "Tactile mechanical keyboard with backlit keys and a sturdy desk-friendly layout.",
        image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=900&q=80"
    },
    {
        category: "electronics",
        title: "Wireless Mouse",
        price: 999,
        description: "Smooth wireless mouse with ergonomic grip and reliable tracking for work or study.",
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=900&q=80"
    },
    {
        category: "electronics",
        title: "HD Webcam",
        price: 2199,
        description: "Clear HD webcam with built-in microphone for video calls, meetings, and classes.",
        image: "https://images.unsplash.com/photo-1618329027137-a520b57c6606?auto=format&fit=crop&w=900&q=80"
    },
    {
        category: "electronics",
        title: "Power Bank 20000mAh",
        price: 1899,
        description: "High-capacity power bank with dual USB output for charging devices on the go.",
        image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=900&q=80"
    },
    {
        category: "fashion",
        title: "Classic Denim Jacket",
        price: 1999,
        description: "A durable blue denim jacket with a relaxed fit for everyday styling.",
        image: "https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=900&q=80"
    },
    {
        category: "fashion",
        title: "Running Sneakers",
        price: 2799,
        description: "Lightweight sneakers with cushioned soles for walking, running, and daily wear.",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80"
    },
    {
        category: "fashion",
        title: "Casual Cotton T-Shirt",
        price: 599,
        description: "Soft cotton t-shirt with a relaxed everyday fit and breathable fabric.",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80"
    },
    {
        category: "fashion",
        title: "Slim Fit Chinos",
        price: 1499,
        description: "Smart casual chinos with stretch comfort for office, travel, and weekend plans.",
        image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=900&q=80"
    },
    {
        category: "fashion",
        title: "Summer Floral Dress",
        price: 1899,
        description: "Lightweight floral dress with an easy silhouette for warm days and outings.",
        image: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=900&q=80"
    },
    {
        category: "fashion",
        title: "Hooded Sweatshirt",
        price: 1599,
        description: "Cozy hoodie with a kangaroo pocket and ribbed cuffs for casual comfort.",
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=80"
    },
    {
        category: "fashion",
        title: "Formal Leather Belt",
        price: 799,
        description: "Polished leather belt with a classic buckle for office and occasion wear.",
        image: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=900&q=80"
    },
    {
        category: "fashion",
        title: "Sports Track Pants",
        price: 1299,
        description: "Comfortable track pants with an elastic waist for workouts and lounging.",
        image: "https://images.unsplash.com/photo-1506629905607-d9e297d6992c?auto=format&fit=crop&w=900&q=80"
    },
    {
        category: "home",
        title: "Ceramic Coffee Mug Set",
        price: 799,
        description: "Set of four ceramic mugs with a clean matte finish for tea, coffee, and cocoa.",
        image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=900&q=80"
    },
    {
        category: "home",
        title: "Cotton Bedsheet",
        price: 1499,
        description: "Soft breathable cotton bedsheet with pillow covers for a comfortable night's sleep.",
        image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80"
    },
    {
        category: "home",
        title: "Table Lamp",
        price: 1299,
        description: "Modern table lamp with warm light for study desks, bedside tables, and reading corners.",
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80"
    },
    {
        category: "home",
        title: "Non-Stick Cookware Pan",
        price: 999,
        description: "Durable non-stick pan for quick breakfasts, stir fries, and everyday cooking.",
        image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=900&q=80"
    },
    {
        category: "home",
        title: "Storage Basket Set",
        price: 899,
        description: "Handy storage baskets for organizing shelves, closets, toys, towels, and pantry items.",
        image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=80"
    },
    {
        category: "home",
        title: "Wall Clock",
        price: 699,
        description: "Minimal wall clock with clear numbers and a quiet movement for any room.",
        image: "https://images.unsplash.com/photo-1501139083538-0139583c060f?auto=format&fit=crop&w=900&q=80"
    },
    {
        category: "home",
        title: "Scented Candle Pack",
        price: 649,
        description: "Aromatic candle set with soft fragrances for relaxing evenings and cozy spaces.",
        image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=900&q=80"
    },
    {
        category: "home",
        title: "Bath Towel Set",
        price: 1199,
        description: "Absorbent cotton towels with a plush feel for daily bath and travel use.",
        image: "https://images.unsplash.com/photo-1600369671236-e74521d4b6ad?auto=format&fit=crop&w=900&q=80"
    },
    {
        category: "beauty",
        title: "Aloe Vera Face Gel",
        price: 399,
        description: "Cooling aloe vera gel for daily hydration and soothing dry or tired skin.",
        image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=80"
    },
    {
        category: "beauty",
        title: "Matte Lipstick Pack",
        price: 699,
        description: "A pack of rich matte lipstick shades with smooth application and lasting color.",
        image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=900&q=80"
    },
    {
        category: "beauty",
        title: "Vitamin C Face Serum",
        price: 799,
        description: "Lightweight face serum made for brighter-looking and refreshed skin.",
        image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=900&q=80"
    },
    {
        category: "beauty",
        title: "Hydrating Body Lotion",
        price: 549,
        description: "Daily body lotion with a smooth finish for soft and nourished skin.",
        image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=900&q=80"
    },
    {
        category: "beauty",
        title: "Herbal Shampoo",
        price: 449,
        description: "Gentle herbal shampoo for fresh, clean hair and regular scalp care.",
        image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?auto=format&fit=crop&w=900&q=80"
    },
    {
        category: "beauty",
        title: "Perfume Gift Set",
        price: 1499,
        description: "Elegant fragrance gift set with fresh, warm, and floral scent options.",
        image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&q=80"
    },
    {
        category: "grocery",
        title: "Organic Green Tea",
        price: 299,
        description: "Refreshing organic green tea leaves packed for a calm everyday brew.",
        image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?auto=format&fit=crop&w=900&q=80"
    },
    {
        category: "grocery",
        title: "Premium Almonds",
        price: 899,
        description: "Crunchy premium almonds for snacking, baking, and breakfast bowls.",
        image: "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=900&q=80"
    },
    {
        category: "grocery",
        title: "Cold Pressed Olive Oil",
        price: 699,
        description: "Rich olive oil for salad dressings, sauteing, pasta, and everyday cooking.",
        image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=900&q=80"
    },
    {
        category: "grocery",
        title: "Whole Wheat Pasta",
        price: 249,
        description: "Nutritious whole wheat pasta for quick dinners, lunch bowls, and family meals.",
        image: "https://images.unsplash.com/photo-1551462147-ff29053bfc14?auto=format&fit=crop&w=900&q=80"
    },
    {
        category: "grocery",
        title: "Mixed Fruit Jam",
        price: 199,
        description: "Sweet mixed fruit jam for toast, sandwiches, desserts, and quick snacks.",
        image: "https://images.unsplash.com/photo-1604347419566-521306ca9788?auto=format&fit=crop&w=900&q=80"
    },
    {
        category: "grocery",
        title: "Breakfast Cereal",
        price: 349,
        description: "Crispy breakfast cereal for quick mornings with milk, fruit, or yogurt.",
        image: "https://images.unsplash.com/photo-1521483451569-e33803c0330c?auto=format&fit=crop&w=900&q=80"
    },
    {
        category: "accessories",
        title: "Leather Wallet",
        price: 1199,
        description: "Compact leather wallet with card slots, cash pocket, and a simple polished look.",
        image: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=900&q=80"
    },
    {
        category: "accessories",
        title: "Travel Backpack",
        price: 2299,
        description: "Spacious backpack with laptop storage, front pockets, and padded shoulder straps.",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80"
    },
    {
        category: "accessories",
        title: "Polarized Sunglasses",
        price: 1399,
        description: "Stylish polarized sunglasses that reduce glare and complete outdoor looks.",
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=80"
    },
    {
        category: "accessories",
        title: "Canvas Tote Bag",
        price: 499,
        description: "Reusable canvas tote bag for groceries, books, office essentials, and daily errands.",
        image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=80"
    },
    {
        category: "accessories",
        title: "Analog Wrist Watch",
        price: 2499,
        description: "Classic analog wrist watch with a clean dial and comfortable strap.",
        image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=900&q=80"
    },
    {
        category: "accessories",
        title: "Laptop Sleeve",
        price: 799,
        description: "Padded laptop sleeve that protects your device from scratches and bumps.",
        image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=900&q=80"
    }
];
exports.default = dummyProducts;

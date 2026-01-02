const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

router.get('/seed', async (req, res) => {
    try {
        await Product.deleteMany({}); // Clear old data

        const sampleProducts = [
            // --- 1. ELECTRONICS (GADGETS) ---
            { name: "iPhone 15 Pro Max", price: 159900, image: "https://images.unsplash.com/photo-1695639509828-d4260075e370?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGlQaG9uZSUyMDE1JTIwUHJvJTIwTWF4fGVufDB8fDB8fHww", category: "Electronics" },
            { name: "MacBook Air M2", price: 89900, image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=400", category: "Electronics" },
            { name: "Sony WH-1000XM5", price: 14599, image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=400", category: "Electronics" },
            { name: "Apple Watch Ultra", price: 89900, image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=400", category: "Electronics" },
            { name: "Canon EOS R5", price: 345000, image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=400", category: "Electronics" },
            { name: "Gaming PC Setup", price: 425000, image: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?q=80&w=400", category: "Electronics" },
            { name: "iPad Pro M4", price: 106900, image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=400", category: "Electronics" },
            { name: "Marshall Speaker", price: 24999, image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=400", category: "Electronics" },
            { name: "Logitech MX Master", price: 7500, image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=400", category: "Electronics" },
            { name: "Samsung S24 Ultra", price: 129999, image: "https://images.unsplash.com/photo-1706989239865-25552e6f2c9a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8U2Ftc3VuZyUyMFMyNCUyMFVsdHJhfGVufDB8fDB8fHww", category: "Electronics" },

            // --- 2. MEN'S WEAR ---
            { name: "Classic White Shirt", price: 1499, image: "https://images.unsplash.com/photo-1580981425710-eb08a7069635?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDM1fHx8ZW58MHx8fHx8", category: "Men's Wear" },
            { name: "Denim Jacket Blue", price: 1999, image: "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?q=80&w=669&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", category: "Men's Wear" },
            { name: "Streetwear Hoodie", price: 1299, image: "https://plus.unsplash.com/premium_photo-1673866484792-c5a36a6c025e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTE5fHxTdHJlZXR3ZWFyJTIwSG9vZGllfGVufDB8fDB8fHww", category: "Men's Wear" },
            { name: "Slim Fit Chinos", price: 1799, image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=400", category: "Men's Wear" },
            { name: "Formal Black Blazer", price: 4999, image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=400", category: "Men's Wear" },
            { name: "Casual Polo T-Shirt", price: 999, image: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?q=80&w=400", category: "Men's Wear" },
            { name: "Leather Biker Jacket", price: 6500, image: "https://images.unsplash.com/photo-1727515546577-f7d82a47b51d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTN8fExlYXRoZXIlMjBCaWtlciUyMEphY2tldHxlbnwwfHwwfHx8MA%3D%3D", category: "Men's Wear" },
            { name: "Checked Flannel Shirt", price: 1699, image: "https://images.unsplash.com/photo-1698857498629-f7ea3a3d63b2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fENoZWNrZWQlMjBGbGFubmVsJTIwU2hpcnR8ZW58MHx8MHx8fDA%3D", category: "Men's Wear" },

            // --- 3. SAREES ---
            { name: "T-Shirt & Jean", price: 18500, image: "https://plus.unsplash.com/premium_photo-1690338235263-68f2c173b5cc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTk0fHx3b21lbiUyMGZhc2hpb258ZW58MHwwfDB8fHww", category: "women's wear" },
            { name: "Wedding Gown", price: 12500, image: "https://cdn.pixabay.com/photo/2018/10/24/10/36/wedding-dress-3769918_1280.jpg", category: "women's wear" },
            { name: "Daily wear Saree", price: 4500, image: "https://cdn.pixabay.com/photo/2015/04/13/15/30/saree-720716_1280.jpg", category: "women's wear" },
            { name: "Maxi Dress", price: 2200, image: "https://cdn.pixabay.com/photo/2023/02/23/06/11/woman-7807996_1280.jpg", category: "women's wear" },
            { name: "Winter Trench Coat Ensemble", price: 999, image: "https://cdn.pixabay.com/photo/2024/11/17/16/10/girlie-9204184_1280.jpg", category: "women's wear" },
            { name: "Western Collections", price: 5500, image: "https://cdn.pixabay.com/photo/2019/08/22/14/25/clothing-4423661_1280.jpg", category: "women's wear" },
            { name: "Sequin Halter Neck Cut-Out Gown", price: 3200, image: "https://cdn.pixabay.com/photo/2020/03/17/14/44/dress-4940563_1280.jpg", category: "women's wear" },
            { name: "Straight Kurta Set", price: 25000, image: "https://cdn.pixabay.com/photo/2022/12/04/07/03/woman-7633843_1280.jpg", category: "women's wear" },

            // --- 4. FOOTWEAR ---
            { name: "Nike Air Jordan", price: 12400, image: "https://images.unsplash.com/photo-1695748966450-3abe5c25b481?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8TmlrZSUyMEFpciUyMEpvcmRhbnxlbnwwfHwwfHx8MA%3D%3D", category: "Footwear" },
            { name: "Formal Oxford Shoes", price: 3500, image: "https://images.unsplash.com/photo-1603191659812-ee978eeeef76?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fEZvcm1hbCUyME94Zm9yZCUyMFNob2VzfGVufDB8fDB8fHww", category: "Footwear" },
            { name: "White Sneakers", price: 1999, image: "https://images.unsplash.com/photo-1580980637029-926d00ff8052?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fHdoaXRlJTIwc25lYWtlcnN8ZW58MHwwfDB8fHww", category: "Footwear" },
            { name: "Leather Loafers", price: 2400, image: "https://media.istockphoto.com/id/1440533039/photo/mens-black-loafers-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=kJsaSNsg9WaRvySDXZNWjPNxipmaRNvTAGn02XkQuUQ=", category: "Footwear" },
            { name: "Timberland Boots", price: 6500, image: "https://images.unsplash.com/photo-1554133818-7bb790d55236?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fFRpbWJlcmxhbmQlMjBCb290c3xlbnwwfDB8MHx8fDA%3D", category: "Footwear" },
            { name: "Sports Running Shoes", price: 2200, image: "https://images.unsplash.com/photo-1560072810-1cffb09faf0f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTA1fHxTcG9ydHMlMjBSdW5uaW5nJTIwU2hvZXN8ZW58MHwwfDB8fHww", category: "Footwear" },
            { name: "Casual Canvas", price: 999, image: "https://images.unsplash.com/photo-1694278877646-e7ed3e01c7de?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fENhc3VhbCUyMENhbnZhcyUyMHNob2V8ZW58MHwwfDB8fHww", category: "Footwear" },

            // --- 5. ACCESSORIES ---
            { name: "Premium Keychains", price: 120, image: "https://images.unsplash.com/photo-1617519478819-9f578a5df62f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDIxfHx8ZW58MHx8fHx8", category: "Accessories" },
            { name: "Premium Leather Wallet", price: 3500, image: "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=400", category: "Accessories" },
            { name: "Luxury Handbag", price: 4500, image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=400", category: "Accessories" },
            { name: "Sunglasses", price: 6500, image: "https://images.unsplash.com/photo-1590564310418-66304f55a2c2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8U3VuZ2xhc3Nlc3xlbnwwfDB8MHx8fDA%3D", category: "Accessories" },
            { name: "Diamond Solitaire Ring", price: 645000, image: "https://images.unsplash.com/photo-1742240439165-60790db1ee93?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8RGlhbW9uZCUyMFNvbGl0YWlyZSUyMFJpbmd8ZW58MHwwfDB8fHww", category: "Accessories" },
            { name: "Premium Phone Cases", price: 329, image: "https://images.unsplash.com/photo-1692780256774-198bc0a3bbf0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGhvbmUlMjBjYXNlc3xlbnwwfDB8MHx8fDA%3D", category: "Accessories" },
            { name: "Smart Fitness Band", price: 2999, image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?q=80&w=400", category: "Accessories" },

            // --- 6. HOME & KITCHEN ---
            { name: "Non-Stick Cookware Set", price: 3999, image: "https://images.unsplash.com/photo-1588279102658-4230e1c4fb1e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDd8fE5vbi1TdGljayUyMENvb2t3YXJlJTIwU2V0fGVufDB8MHwwfHx8MA%3D%3D", category: "Home & Kitchen" },
            { name: "Modern Table Lamp", price: 1499, image: "https://images.unsplash.com/photo-1651363216111-54431e490eb2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTA0fHxNb2Rlcm4lMjBUYWJsZSUyMExhbXB8ZW58MHwwfDB8fHww", category: "Home & Kitchen" },
            { name: "Ceramic Coffee Mugs", price: 799, image: "https://plus.unsplash.com/premium_photo-1731139674926-e3ea79595576?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fENlcmFtaWMlMjBDb2ZmZWUlMjBNdWdzfGVufDB8MHwwfHx8MA%3D%3D", category: "Home & Kitchen" },
            { name: "Cotton King Bed Sheet", price: 1299, image: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?q=80&w=400", category: "Home & Kitchen" },
            { name: "Smart Mixer Grinder", price: 4500, image: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8TWl4ZXIlMjBHcmluZGVyfGVufDB8MHwwfHx8MA%3D%3D", category: "Home & Kitchen" },
            { name: "Chef Knife Set", price: 2100, image: "https://images.unsplash.com/photo-1589071634465-75d7ce737fa8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Q2hlZiUyMEtuaWZlJTIwU2V0fGVufDB8MHwwfHx8MA%3D%3D", category: "Home & Kitchen" },

            // --- 7. SPORTS ---
            { name: "Cricket Kit", price: 8500, image: "https://plus.unsplash.com/premium_photo-1722086350831-3cc30b7d68a7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y3JpY2tldCUyMGJhdHxlbnwwfDB8MHx8fDA%3D", category: "Sports" },
            { name: "Pro Yoga Mat", price: 1200, image: "https://plus.unsplash.com/premium_photo-1667739346017-fbc9cd35d666?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fFlvZ2ElMjBNYXR8ZW58MHwwfDB8fHww", category: "Sports" },
            { name: "Hex Dumbbells (5kg)", price: 2500, image: "https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8RHVtYmJlbGxzfGVufDB8MHwwfHx8MA%3D%3D", category: "Sports" },
            { name: "FIFA Quality Football", price: 1800, image: "https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aab?q=80&w=400", category: "Sports" },
            { name: "Badminton Racket", price: 2200, image: "https://images.unsplash.com/photo-1646140715711-d118585579b0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTYxfHxCYWRtaW50b24lMjBSYWNrZXR8ZW58MHwwfDB8fHww", category: "Sports" },

            // --- 8. TOYS ---
            { name: "RC Monster Truck", price: 1999, image: "https://images.unsplash.com/photo-1608074851025-2a2d4cbbacd6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fFJDJTIwTW9uc3RlciUyMFRydWNrfGVufDB8MHwwfHx8MA%3D%3D", category: "Toys" },
            { name: "Giant Teddy Bear", price: 1500, image: "https://images.unsplash.com/photo-1648311128165-848a00883496?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fEdpYW50JTIwVGVkZHklMjBCZWFyfGVufDB8MHwwfHx8MA%3D%3D", category: "Toys" },
            { name: "Lego City Set", price: 1200, image: "https://images.unsplash.com/photo-1752322070522-c399ab4125e1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8TGVnbyUyMENpdHklMjBTZXR8ZW58MHwwfDB8fHww", category: "Toys" },
            { name: "Wooden Puzzle", price: 799, image: "https://plus.unsplash.com/premium_photo-1702830270361-09cd9e2e58b2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjF8fFdvb2RlbiUyMFB1enpsZXxlbnwwfDB8MHx8fDA%3D", category: "Toys" },
            { name: "Superhero Action Figure", price: 1050, image: "https://images.unsplash.com/photo-1608889175123-8ee362201f81?q=80&w=400", category: "Toys" }
        ];

        const createdProducts = await Product.insertMany(sampleProducts);
        res.send({ message: "MEGA COLLECTION ADDED! 🚀", count: createdProducts.length });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Error fetching products" });
    }
});

// 3. GET SINGLE PRODUCT BY ID
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error fetching product" });
    }
});

module.exports = router;
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    productDetails: [
      {
        title: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
      },
    ],
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "Electronics",
        "Mobiles & Tablets",
        "Computers & Laptops",
        "Gaming Consoles & Accessories",
        "Cameras & Photography",
        "Audio & Headphones",
        "Wearable Tech",
        "Smart Home Devices",
        "Clothing",
        "Top-Wear",
        "Bottom-Wear",
        "T-shirts",
        "Shirts",
        "Jeans",
        "Kurta",
        "Blessers",
        "Fancy",
        "Genzy",
        "Formals",
        "Casuals",
        "Footwear",
        "Jewelry & Accessories",
        "Watches",
        "Bags & Luggage",
        "Books",
        "E-Books",
        "Movies & TV",
        "Music & Instruments",
        "Home",
        "Furniture",
        "Home Decor",
        "Lighting",
        "Kitchen & Dining",
        "Bedding & Bath",
        "Beauty & Personal Care",
        "Makeup",
        "Skincare",
        "Hair Care",
        "Fragrances",
        "Health & Wellness",
        "Medical Supplies",
        "Sports & Outdoors",
        "Fitness Equipment",
        "Camping & Hiking",
        "Cycling",
        "Water Sports",
        "Toys & Games",
        "Baby Products",
        "Kids Clothing",
        "School Supplies",
        "Grocery",
        "Beverages",
        "Snacks",
        "Organic & Specialty Food",
        "Automotive",
        "Motorbike Accessories",
        "Tools & Hardware",
        "Industrial Supplies",
        "Office Supplies",
        "Stationery",
        "Art & Craft",
        "Pet Supplies",
        "Pet Food",
        "Pet Toys & Accessories",
        "Garden & Outdoor",
        "Plants & Seeds",
        "Outdoor Furniture",
        "Collectibles",
        "Antiques",
        "Gift Cards",
        "Other",
      ],
    },
    highlights: [
      {
        title: {
          type: String,
          required: true,
          trim: true,
        },
        description: {
          type: String,
          required: true,
          trim: true,
        },
      },
    ],
    bestSeller: {
      type: Boolean,
      enum: ["true", "false"],
      default: false,
    },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    sellerName: {
      type: String,
      required: true,
    },
    size: [
        { 
            type: String,
            enum: ["S", "M", "L", "XL", "XXL", "Others"] 
        }
    ],
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    brandName: {
      type: String,
      enum: ["Sony", "Samsung", "LG",
      "Apple", "OnePlus", "Dell", "HP",
      "Microsoft Xbox", "Nintendo", "Canon", "Nikon", "Bose", "JBL", "H&M", "Zara", "Levi's", "Allen Solly", "Peter England", "Van Heusen",
      "Wrangler", "Lee", "Nike", "Adidas", "Puma", "Raymond", "Park Avenue", "Louis Philippe",
      "Fabindia", "Manyavar", "Roadster", "U.S. Polo Assn.", "Flying Machine", "Bata", "Tanishq", "PC Jeweller", "Kalyan Jewellers",
      "Fossil", "Casio", "Rolex", "American Tourister", "Skybags", "Safari","L'Oréal", "Maybelline", "Lakme", "MAC", "Huda Beauty", "Nykaa","Others"],
      required: true,
    },
    returnPolicy: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);

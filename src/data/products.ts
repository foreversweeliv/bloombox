export interface Product {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  oldPrice?: number;
  details: string;
  specs: {
    dimensions: string;
    weight: string;
    materials: string[];
    careInstructions: string[];
  };
}

export const products: Product[] = [
  {
    id: "wooden-bloombox",
    title: "Wooden BloomBox",
    description: "A handcrafted wooden box with a curated miniature garden of succulents and moss.",
    image: "/images/product1.png",
    price: 39.00,
    oldPrice: 45.00,
    details: "The Wooden BloomBox is our signature product, featuring a carefully selected arrangement of drought-resistant succulents and preserved moss in a handcrafted wooden container. Each box is unique and designed to bring a touch of nature to any space with minimal maintenance required.",
    specs: {
      dimensions: "20cm x 15cm x 10cm",
      weight: "1.2kg",
      materials: ["Reclaimed wood", "Preserved moss", "Assorted succulents", "Natural stones"],
      careInstructions: [
        "Place in bright, indirect sunlight",
        "Water sparingly every 2-3 weeks",
        "Avoid direct heat sources",
        "Dust occasionally with a soft brush"
      ]
    }
  },
  {
    id: "vine-stand-display",
    title: "Vine Stand Display",
    description: "A vertical wooden stand with a climbing vine, perfect for wall or shelf decor.",
    image: "/images/product2.png",
    price: 59.00,
    details: "The Vine Stand Display features an elegant wooden frame that supports a trailing vine arrangement, creating a vertical garden effect. This statement piece adds height and visual interest to any room, bringing the feeling of an indoor garden to your space.",
    specs: {
      dimensions: "45cm x 15cm x 60cm",
      weight: "1.8kg",
      materials: ["Sustainable bamboo", "Pothos vine", "Decorative soil cover", "Ceramic base"],
      careInstructions: [
        "Mist leaves weekly",
        "Keep away from air conditioning vents",
        "Water when soil feels dry to touch",
        "Trim occasionally to maintain desired shape"
      ]
    }
  },
  {
    id: "glass-terrarium",
    title: "Glass Terrarium",
    description: "A sleek, transparent terrarium showcasing a miniature ecosystem under glass.",
    image: "/images/product3.png",
    price: 72.00,
    details: "Our Glass Terrarium creates a self-sustaining miniature ecosystem sealed within a beautiful geometric glass container. The clean, modern design makes it a sophisticated addition to any home or office, while the enclosed environment requires minimal maintenance.",
    specs: {
      dimensions: "25cm x 25cm x 30cm",
      weight: "2.5kg",
      materials: ["Hand-blown glass", "Activated charcoal", "Decorative sand", "Ferns and moss"],
      careInstructions: [
        "Keep in bright, indirect light",
        "No regular watering needed",
        "Clean glass exterior with soft cloth",
        "Open once a month to allow fresh air"
      ]
    }
  },
  {
    id: "stone-boulder-pot",
    title: "Stone Boulder Pot",
    description: "A natural-looking pot shaped like a weathered stone, planted with hardy greens.",
    image: "/images/product4.png",
    price: 23.00,
    oldPrice: 25.00,
    details: "The Stone Boulder Pot mimics the appearance of a naturally weathered rock while functioning as a planter for hardy succulents. Its unique organic shape and texture make it an eye-catching accent piece that brings a touch of the outdoors inside.",
    specs: {
      dimensions: "18cm x 18cm x 15cm",
      weight: "1.5kg",
      materials: ["Lightweight concrete composite", "Water-resistant coating", "Drainage layer", "Succulent mix"],
      careInstructions: [
        "Water once every 3-4 weeks",
        "Suitable for indoor or covered outdoor use",
        "Wipe with damp cloth to clean exterior",
        "Repot plants every 12-18 months"
      ]
    }
  }
]; 
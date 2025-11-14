import { Product } from "@/types/store";

export const products: Product[] = [
  {
    id: "tshirt-tradeable-token",
    name: "Every Post is a Tradeable Token - T-Shirt",
    description: "Rep the revolution. This premium tee features our iconic tagline and shows the world you're building the future of the creator economy. Built different. Trade different. Wear different.",
    price: 29.99,
    priceInETH: 0.012,
    image: "/merch/tshirt-tradeable.png",
    category: "apparel",
    sizes: ["XS", "S", "M", "L", "XL", "2XL"],
    colors: ["Black", "White", "Navy", "Purple"],
    inStock: true,
    featured: true,
  },
  {
    id: "hoodie-find-niche",
    name: "Find Your Niche - Hoodie",
    description: "Stay warm while your portfolio heats up. Premium quality hoodie featuring the Find Your Niche logo. For creators who build on Base and never stop grinding.",
    price: 54.99,
    priceInETH: 0.022,
    image: "/merch/hoodie-niche.png",
    category: "apparel",
    sizes: ["S", "M", "L", "XL", "2XL"],
    colors: ["Black", "Charcoal", "Purple", "Navy"],
    inStock: true,
    featured: true,
  },
  {
    id: "hat-creator-economy",
    name: "Creator Economy - Snapback",
    description: "Top off your crypto drip with this clean snapback. Minimal design, maximum statement. Let everyone know you're part of the Web3 creator revolution.",
    price: 24.99,
    priceInETH: 0.01,
    image: "/merch/hat-creator.png",
    category: "accessories",
    colors: ["Black", "Navy", "White"],
    inStock: true,
  },
  {
    id: "sticker-pack",
    name: "Niche Vibes - Sticker Pack",
    description: "Laptop? Phone? Water bottle? Deck it out with Find Your Niche stickers. Featuring our logo, $NICHE coin, and exclusive creator economy artwork.",
    price: 9.99,
    priceInETH: 0.004,
    image: "/merch/stickers-niche.png",
    category: "accessories",
    inStock: true,
    featured: true,
  },
  {
    id: "mug-trade-coins",
    name: "Trade Coins, Sip Coffee, Build Empire - Mug",
    description: "Start your morning right. This ceramic mug holds your coffee while you hold your coins. Microwave and dishwasher safe. Capitalism not included.",
    price: 16.99,
    priceInETH: 0.007,
    image: "/merch/mug-trade.png",
    category: "accessories",
    inStock: true,
  },
  {
    id: "tshirt-build-base",
    name: "Built on Base - T-Shirt",
    description: "Show your Base pride. This tee celebrates the network that makes it all possible. Clean design, premium quality, blockchain energy.",
    price: 29.99,
    priceInETH: 0.012,
    image: "/merch/tshirt-base.png",
    category: "apparel",
    sizes: ["XS", "S", "M", "L", "XL", "2XL"],
    colors: ["Black", "Blue", "White"],
    inStock: true,
  },
];

export const featuredProducts = products.filter(p => p.featured);

export const getProductById = (id: string): Product | undefined => {
  return products.find(p => p.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(p => p.category === category);
};

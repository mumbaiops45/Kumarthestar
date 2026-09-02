
export const WHATSAPP_NUMBER = "919620406020";
export const ORDER_GREETING = "Hi Kumar The Star! I'd like to order from the Candy collection:";

export const inr = (n) => `₹${n.toLocaleString("en-IN")}`;
export const products = [
  {
    id: "star-classic",
    name: "Star Classic Tee", 
    tagline: "The everyday one. Logo small on the chest, nothing shouting.",
    price: 599, 
    mrp: 899,
    badge: "Bestseller",
    fabric: "220 GSM combed cotton",
    fit: "Regular fit",
    colors: [
      { name: "Midnight Navy", slug: "navy", hex: "#0B1E3D", image: null },
      { name: "Bone White", slug: "white", hex: "#FAFAF8", image: null },
      { name: "Deep Maroon", slug: "maroon", hex: "#804501", image: null },
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    soldOut: [],
  },
  {
    id: "topper-oversized",
    name: "Topper Oversized", 
    tagline: "Drop shoulder, boxy cut. The one everyone borrows and never returns.",
    price: 749, 
    mrp: 1099, 
    badge: "New drop",
    fabric: "240 GSM terry cotton", 
    fit: "Oversized",
    colors: [
      { name: "Charcoal", slug: "charcoal", hex: "#1D2433", image: null },
      { name: "Sand", slug: "sand", hex: "#F0EBE0", image: null },
      { name: "Forest", slug: "forest", hex: "#2C4A3B", image: null },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    soldOut: ["XXL"],
  },
  {
    id: "batch-tee",
    name: "Batch Tee", 
    tagline: "Your year on the back. Print the whole batch's names or just yours.",
    price: 699, 
    mrp: 999,
    badge: "Customisable",
    fabric: "200 GSM bio-washed cotton",
    fit: "Regular fit",
    colors: [
      { name: "Bone White", slug: "white", hex: "#FAFAF8", image: null },
      { name: "Midnight Navy", slug: "navy", hex: "#0B1E3D", image: null },
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    soldOut: [],
  },
  // {
  //   id: "gold-standard",
  //   name: "Gold Standard Tee",
  //   tagline: "Foil-pressed star across the chest. Saved for results day.",
  //   price: 849, 
  //   mrp: 1249,
  //   badge: "Limited",
  //   fabric: "220 GSM combed cotton, foil print",
  //   fit: "Regular fit",
  //   colors: [
  //     { name: "Ink Black", slug: "black", hex: "#111318", image: null },
  //     { name: "Midnight Navy", slug: "navy", hex: "#0B1E3D", image: null },
  //   ],
  //   sizes: ["S", "M", "L", "XL"],
  //   soldOut: [],
  // },
  // {
  //   id: "mock-test-crew",
  //   name: "Mock Test Crew", 
  //   tagline: "Soft, unbothered, survives a full Sunday paper.",
  //   price: 649,
  //   mrp: 949, 
  //   fabric: "210 GSM cotton blend", 
  //   fit: "Relaxed fit",
  //   colors: [
  //     { name: "Slate Grey", slug: "grey", hex: "#8A8F9A", image: null },
  //     { name: "Sky", slug: "sky", hex: "#9FC0DE", image: null },
  //     { name: "Bone White", slug: "white", hex: "#FAFAF8", image: null },
  //   ],
  //   sizes: ["S", "M", "L", "XL", "XXL"],
  //   soldOut: [],
  // },
  // {
  //   id: "founders-tee",
  //   name: "Founder's Tee", 
  //   tagline: "A line from the book, printed small on the hem.",
  //   price: 799, 
  //   mrp: 1149, 
  //   fabric: "220 GSM combed cotton", 
  //   fit: "Regular fit",
  //   colors: [
  //     { name: "Deep Maroon", slug: "maroon", hex: "#804501", image: null },
  //     { name: "Bone White", slug: "white", hex: "#FAFAF8", image: null },
  //   ],
  //   sizes: ["S", "M", "L", "XL", "XXL"],
  //   soldOut: ["S"],
  // },
];

export const sizeChart = [
  { size: "XS", chest: 34, length: 25.5, shoulder: 15.5 },
  { size: "S", chest: 36, length: 26.5, shoulder: 16.5 },
  { size: "M", chest: 38, length: 27.5, shoulder: 17.5 },
  { size: "L", chest: 40, length: 28.5, shoulder: 18.5 },
  { size: "XL", chest: 42, length: 29.5, shoulder: 19.5 },
  { size: "XXL", chest: 44, length: 30.5, shoulder: 20.5 },
];


export const faqs = [
  {
    q: "How do I pay?",
    a: "Send your order on WhatsApp and our team confirms stock, then shares a UPI QR or bank details. Nothing is charged on this page — we never ask for card details over chat.",
  },
  {
    q: "How long does delivery take?",
    a: "Campus pickup is same-day once your order is confirmed. Delivery within the city takes 2–3 working days, and the rest of India 4–7 working days.",
  },
  {
    q: "What if the size doesn't fit?",
    a: "Unworn shirts with tags intact can be exchanged for another size within 7 days. Check the size chart above first — it saves everyone a trip.",
  },
  {
    q: "Can we order for the whole batch?",
    a: "Yes, and it's cheaper. Orders of 20 pieces or more get bulk pricing plus free name-and-number printing on the back. Message us with your batch size.",
  },
  {
    q: "Can I put my own design on it?",
    a: "On bulk orders, yes — send us the artwork and we'll share a mockup before printing. Single custom pieces are only available on the Batch Tee.",
  },
];

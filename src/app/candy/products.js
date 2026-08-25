/* ============================================================================
   CANDY T-SHIRTS — THE ONE FILE TO EDIT

   Everything the shop renders comes from this file. When the real photos and
   prices arrive, nothing else needs touching.

   ⚠️  EVERY VALUE BELOW MARKED [PLACEHOLDER] IS INVENTED SCAFFOLDING.
       Product names, prices, MRPs, fabric specs, the size chart and the
       WhatsApp number are all made up so the page can be built and reviewed.
       Replace them before this goes live.

   ── HOW TO DROP IN REAL PHOTOS ─────────────────────────────────────────────
   Until a colour has an `image`, the card draws an SVG shirt tinted to `hex`.
   The moment you set `image`, that colour switches to the real photo — no
   other change needed.

       1. Put the files in  public/tshirts/
       2. Name them  <product-id>-<colour-slug>.jpg   e.g. star-classic-navy.jpg
       3. Set the path on the colour:   image: "/tshirts/star-classic-navy.jpg"

   Shoot or crop them at 4:5 (e.g. 1200×1500). The card container is 4:5 and
   uses object-cover, so anything squarer gets cropped top and bottom.
   ========================================================================= */

/* [PLACEHOLDER] Country code + number, digits only, no +, no spaces.
   India = 91. This is the number that receives every order.
   The same placeholder currently sits in Footer.jsx (tel:+919876543210). */
export const WHATSAPP_NUMBER = "919876543210";

/* Shown in the WhatsApp message the customer sends. */
export const ORDER_GREETING = "Hi Kumar The Star! I'd like to order from the Candy collection:";

export const inr = (n) => `₹${n.toLocaleString("en-IN")}`;

/* ---------------------------------------------------------------------------
   PRODUCTS
   id        — url/key safe, also the photo filename prefix
   price     — what the customer pays, in rupees (number, not string)
   mrp       — struck-through reference price; omit or set null to hide it
   badge     — small gold ribbon on the card; omit for none
   colors    — first one is the default shown
   sizes     — order matters, it is the order of the size pills
   soldOut   — sizes to render disabled
   ------------------------------------------------------------------------ */
export const products = [
  {
    id: "star-classic",
    name: "Star Classic Tee", // [PLACEHOLDER]
    tagline: "The everyday one. Logo small on the chest, nothing shouting.",
    price: 599, // [PLACEHOLDER]
    mrp: 899, // [PLACEHOLDER]
    badge: "Bestseller",
    fabric: "220 GSM combed cotton", // [PLACEHOLDER]
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
    name: "Topper Oversized", // [PLACEHOLDER]
    tagline: "Drop shoulder, boxy cut. The one everyone borrows and never returns.",
    price: 749, // [PLACEHOLDER]
    mrp: 1099, // [PLACEHOLDER]
    badge: "New drop",
    fabric: "240 GSM terry cotton", // [PLACEHOLDER]
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
    name: "Batch Tee", // [PLACEHOLDER]
    tagline: "Your year on the back. Print the whole batch's names or just yours.",
    price: 699, // [PLACEHOLDER]
    mrp: 999, // [PLACEHOLDER]
    badge: "Customisable",
    fabric: "200 GSM bio-washed cotton", // [PLACEHOLDER]
    fit: "Regular fit",
    colors: [
      { name: "Bone White", slug: "white", hex: "#FAFAF8", image: null },
      { name: "Midnight Navy", slug: "navy", hex: "#0B1E3D", image: null },
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    soldOut: [],
  },
  {
    id: "gold-standard",
    name: "Gold Standard Tee", // [PLACEHOLDER]
    tagline: "Foil-pressed star across the chest. Saved for results day.",
    price: 849, // [PLACEHOLDER]
    mrp: 1249, // [PLACEHOLDER]
    badge: "Limited",
    fabric: "220 GSM combed cotton, foil print", // [PLACEHOLDER]
    fit: "Regular fit",
    colors: [
      { name: "Ink Black", slug: "black", hex: "#111318", image: null },
      { name: "Midnight Navy", slug: "navy", hex: "#0B1E3D", image: null },
    ],
    sizes: ["S", "M", "L", "XL"],
    soldOut: [],
  },
  {
    id: "mock-test-crew",
    name: "Mock Test Crew", // [PLACEHOLDER]
    tagline: "Soft, unbothered, survives a full Sunday paper.",
    price: 649, // [PLACEHOLDER]
    mrp: 949, // [PLACEHOLDER]
    fabric: "210 GSM cotton blend", // [PLACEHOLDER]
    fit: "Relaxed fit",
    colors: [
      { name: "Slate Grey", slug: "grey", hex: "#8A8F9A", image: null },
      { name: "Sky", slug: "sky", hex: "#9FC0DE", image: null },
      { name: "Bone White", slug: "white", hex: "#FAFAF8", image: null },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    soldOut: [],
  },
  {
    id: "founders-tee",
    name: "Founder's Tee", // [PLACEHOLDER]
    tagline: "A line from the book, printed small on the hem.",
    price: 799, // [PLACEHOLDER]
    mrp: 1149, // [PLACEHOLDER]
    fabric: "220 GSM combed cotton", // [PLACEHOLDER]
    fit: "Regular fit",
    colors: [
      { name: "Deep Maroon", slug: "maroon", hex: "#804501", image: null },
      { name: "Bone White", slug: "white", hex: "#FAFAF8", image: null },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    soldOut: ["S"],
  },
];

/* [PLACEHOLDER] Measure two of your actual shirts and replace this.
   Wrong numbers here mean exchanges, which is the one cost a
   WhatsApp-order shop cannot absorb. Measurements in inches. */
export const sizeChart = [
  { size: "XS", chest: 34, length: 25.5, shoulder: 15.5 },
  { size: "S", chest: 36, length: 26.5, shoulder: 16.5 },
  { size: "M", chest: 38, length: 27.5, shoulder: 17.5 },
  { size: "L", chest: 40, length: 28.5, shoulder: 18.5 },
  { size: "XL", chest: 42, length: 29.5, shoulder: 19.5 },
  { size: "XXL", chest: 44, length: 30.5, shoulder: 20.5 },
];

/* [PLACEHOLDER] Rewrite each answer to match how you actually operate. */
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

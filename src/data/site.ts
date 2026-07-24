/**
 * Central content for Aurelis Residences.
 * Everything that repeats across sections lives here so the UI stays declarative.
 * All imagery is served from Unsplash (configured in next.config.ts).
 */

export const brand = {
  name: "AURELIS",
  fullName: "Aurelis Residences",
  tagline: "Elevated Living. Timeless Design.",
  location: "Gurugram, Haryana",
  property: "Luxury 3 & 4 BHK Residences",
  startingPrice: "₹1.85 Cr*",
  phone: "+91 98765 43210",
  phoneHref: "+919876543210",
  whatsapp: "919876543210",
  email: "residences@aurelis.in",
  address: "Golf Course Extension Road, Sector 63, Gurugram, Haryana 122102",
};

export type NavLink = { label: string; href: string };

export const navLinks: NavLink[] = [
  { label: "Residences", href: "#residences" },
  { label: "Amenities", href: "#amenities" },
  { label: "Gallery", href: "#gallery" },
  { label: "Location", href: "#location" },
  { label: "About", href: "#about" },
];

export const stats = [
  { value: 12, suffix: "", label: "Acres", detail: "of masterplanned land" },
  { value: 4, suffix: "", label: "Towers", detail: "of curved architecture" },
  { value: 32, suffix: "", label: "Floors", detail: "reaching for the skyline" },
  { value: 420, suffix: "", label: "Residences", detail: "individually crafted" },
  { value: 70, suffix: "%", label: "Open Landscape", detail: "green & breathing" },
];

export type Residence = {
  id: string;
  name: string;
  type: string;
  area: string;
  price: string;
  description: string;
  image: string;
};

export const residences: Residence[] = [
  {
    id: "3bhk",
    name: "3 BHK Residence",
    type: "The Signature",
    area: "2,150 – 2,340 sq.ft.",
    price: "From ₹1.85 Cr*",
    description:
      "Light-filled corner homes with a deep entertaining balcony, a private utility court and a primary suite that opens to the landscaped podium.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "4bhk",
    name: "4 BHK Residence",
    type: "The Grand",
    area: "3,200 – 3,480 sq.ft.",
    price: "From ₹2.95 Cr*",
    description:
      "Expansive four-bedroom homes with a formal living wing, a family lounge and floor-to-ceiling glazing framing uninterrupted skyline views.",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "penthouse",
    name: "Penthouse Collection",
    type: "The Crest",
    area: "5,600+ sq.ft.",
    price: "On request",
    description:
      "A limited collection of duplex penthouses crowned with private sky-decks, plunge pools and panoramic terraces above the city.",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=80",
  },
];

export type Amenity = {
  id: string;
  name: string;
  description: string;
  image: string;
};

export const amenities: Amenity[] = [
  {
    id: "pool",
    name: "Infinity Pool",
    description:
      "A 40-metre temperature-controlled infinity edge that dissolves into the horizon at dusk.",
    image:
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1920&q=80",
  },
  {
    id: "clubhouse",
    name: "Private Clubhouse",
    description:
      "A 30,000 sq.ft. members' clubhouse with a cigar lounge, private dining and a curated library.",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1920&q=80",
  },
  {
    id: "fitness",
    name: "Fitness Studio",
    description:
      "A double-height studio with technogym equipment, a spin room and personal-training suites.",
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1920&q=80",
  },
  {
    id: "gardens",
    name: "Landscaped Gardens",
    description:
      "Seven acres of themed gardens, reflection pools and shaded meditation courts.",
    image:
      "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1920&q=80",
  },
  {
    id: "lounge",
    name: "Residents' Lounge",
    description:
      "An intimate lounge for evenings — soft lighting, a bar and a private screening room.",
    image:
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1920&q=80",
  },
  {
    id: "kids",
    name: "Kids' Play Area",
    description:
      "An imaginative indoor-outdoor play world with a crèche and a discovery garden.",
    image:
      "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=1920&q=80",
  },
  {
    id: "security",
    name: "24/7 Security",
    description:
      "Five-tier security with biometric access, ANPR boom barriers and a manned control room.",
    image:
      "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1920&q=80",
  },
  {
    id: "concierge",
    name: "Concierge",
    description:
      "A white-glove concierge desk handling reservations, housekeeping and travel on request.",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1920&q=80",
  },
];

export type Lifestyle = {
  id: string;
  chapter: string;
  title: string;
  copy: string;
  image: string;
};

export const lifestyle: Lifestyle[] = [
  {
    id: "morning",
    chapter: "01 — Morning",
    title: "Wake to light and long horizons",
    copy: "Sunrise pours across the podium gardens as the city stirs below. Coffee on the balcony, a walk through the reflection court — mornings at Aurelis begin unhurried.",
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "wellness",
    chapter: "02 — Wellness",
    title: "A sanctuary for body and mind",
    copy: "The spa, the lap pool, the yoga deck at dawn. Wellness is woven into the everyday, designed to slow the pace and restore the senses.",
    image:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "community",
    chapter: "03 — Community",
    title: "Neighbours who become friends",
    copy: "Curated gatherings, a residents' calendar and shared spaces built for connection. A community of like-minded families, quietly extraordinary.",
    image:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "evening",
    chapter: "04 — Evening",
    title: "The city glows and slows",
    copy: "As the skyline lights up, the clubhouse comes alive. Dinner on the terrace, a nightcap at the lounge — evenings here feel like a permanent escape.",
    image:
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1600&q=80",
  },
];

export type GalleryImage = {
  id: string;
  category: "Architecture" | "Interiors" | "Amenities" | "Landscape";
  src: string;
  alt: string;
  span?: boolean; // spans wider in the masonry grid
};

export const galleryCategories = [
  "All",
  "Architecture",
  "Interiors",
  "Amenities",
  "Landscape",
] as const;

export const gallery: GalleryImage[] = [
  {
    id: "g1",
    category: "Architecture",
    src: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1400&q=80",
    alt: "Curved concrete facade against a clear sky",
    span: true,
  },
  {
    id: "g2",
    category: "Interiors",
    src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
    alt: "Warm minimalist living room with natural light",
  },
  {
    id: "g3",
    category: "Amenities",
    src: "https://images.unsplash.com/photo-1544984243-ec57ea16fe25?auto=format&fit=crop&w=1200&q=80",
    alt: "Infinity pool overlooking the city",
  },
  {
    id: "g4",
    category: "Landscape",
    src: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1200&q=80",
    alt: "Landscaped garden pathway",
  },
  {
    id: "g5",
    category: "Interiors",
    src: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=80",
    alt: "Designer bedroom with textured headboard",
  },
  {
    id: "g6",
    category: "Architecture",
    src: "https://images.unsplash.com/photo-1470723710355-95304d8aece4?auto=format&fit=crop&w=1200&q=80",
    alt: "Geometric building lines from below",
  },
  {
    id: "g7",
    category: "Amenities",
    src: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=1200&q=80",
    alt: "Modern fitness studio interior",
    span: true,
  },
  {
    id: "g8",
    category: "Landscape",
    src: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=80",
    alt: "Terrace garden at dusk",
  },
  {
    id: "g9",
    category: "Interiors",
    src: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
    alt: "Sculptural minimalist interior corner",
  },
  {
    id: "g10",
    category: "Architecture",
    src: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
    alt: "Glass tower reaching skyward",
  },
];

export type NearbyPlace = {
  id: string;
  name: string;
  time: string;
  // Relative position on the stylised map (percentages).
  x: number;
  y: number;
};

export const nearbyPlaces: NearbyPlace[] = [
  { id: "golf", name: "Golf Course Road", time: "8 min", x: 30, y: 32 },
  { id: "cyber", name: "Cyber City", time: "15 min", x: 66, y: 24 },
  { id: "airport", name: "IGI Airport", time: "25 min", x: 78, y: 68 },
  { id: "school", name: "International School", time: "10 min", x: 22, y: 66 },
  { id: "hospital", name: "Premium Hospital", time: "12 min", x: 54, y: 58 },
];

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "We were not looking for a bigger home. We were looking for a better life. Aurelis understood that difference completely.",
    name: "Rohan & Meera Kapoor",
    role: "Residents, Tower B",
  },
  {
    quote:
      "The restraint is what struck us — nothing shouts, everything considered. It feels less like a project and more like a private address.",
    name: "Aditya Malhotra",
    role: "Resident, Penthouse Collection",
  },
];

export const amenityList = [
  "Infinity Pool",
  "Private Clubhouse",
  "Fitness Studio",
  "Landscaped Gardens",
  "Residents' Lounge",
  "Kids' Play Area",
  "24/7 Security",
  "Concierge",
];

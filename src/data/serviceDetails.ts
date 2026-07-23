export interface ServiceType {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  duration: string;
  image: string;
}

export interface ServiceDetail {
  slug: string;
  name: string;
  category: string;
  description: string;
  bannerImage: string;
  image: string;
  rating: number;
  totalBookings: number;
  isActive: boolean;
  included: string[];
  notIncluded: string[];
  types: ServiceType[];
}

export const serviceDetails: ServiceDetail[] = [
  {
    slug: "sofa-cleaning",
    name: "Sofa & Carpet Cleaning",
    category: "Cleaning",
    description: "Professional sofa and carpet cleaning services to remove stains, dirt, and allergens. Our expert technicians use advanced equipment and eco-friendly solutions to restore your furniture to its original freshness.",
    bannerImage: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&h=400&fit=crop",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=400&fit=crop",
    rating: 4.8,
    totalBookings: 1234,
    isActive: true,
    included: [
      "Surface Cleaning: Vacuuming, brushing, or wiping down the surface to remove dust, dirt, and debris.",
      "Stain Removal: Basic spot treatment for common stains like food, beverage spills, or pet stains.",
      "Fabric Conditioning: Application of fabric conditioner to keep the sofa soft and fresh-smelling.",
      "Vacuuming: Thorough vacuuming of all surfaces including crevices and cushions.",
      "Deodorizing: Neutralization of odors to leave your sofa smelling clean.",
    ],
    notIncluded: [
      "Deep Stains: Heavy-duty or deep stains requiring specialized treatments may not be included in the standard service.",
      "Delicate Fabrics: Some delicate fabrics like silk or velvet might need specialized care and may be excluded.",
      "Structural Repairs: Any tearing, cushion replacement, or frame repairs are not part of the cleaning service.",
      "Chemical Stain Removal: Permanent stains from paint, ink, or dye may require additional treatment.",
    ],
    types: [
      { id: "sc_1", name: "1 Sofa", description: "Single sofa deep cleaning", price: 499, originalPrice: 799, duration: "45 min", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&h=200&fit=crop" },
      { id: "sc_2", name: "2 Sofa", description: "Two sofas deep cleaning", price: 899, originalPrice: 1299, duration: "75 min", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&h=200&fit=crop" },
      { id: "sc_3", name: "Sofa + Mattress", description: "One sofa and mattress cleaning", price: 1199, originalPrice: 1799, duration: "90 min", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&h=200&fit=crop" },
      { id: "sc_4", name: "3 Sofa", description: "Three sofas deep cleaning", price: 1299, originalPrice: 1999, duration: "105 min", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&h=200&fit=crop" },
      { id: "sc_5", name: "Up to 5 Sofa", description: "Five sofas deep cleaning", price: 2199, originalPrice: 3499, duration: "150 min", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&h=200&fit=crop" },
      { id: "sc_6", name: "Up to 10 Sofa", description: "Ten sofas deep cleaning", price: 3999, originalPrice: 6499, duration: "240 min", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&h=200&fit=crop" },
    ],
  },
  {
    slug: "kitchen-cleaning",
    name: "Kitchen Cleaning",
    category: "Cleaning",
    description: "Deep kitchen cleaning service that covers countertops, sink, chimney, stove, cabinets, and floor. We use food-safe cleaning agents to make your kitchen sparkle.",
    bannerImage: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=400&fit=crop",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop",
    rating: 4.7,
    totalBookings: 987,
    isActive: true,
    included: [
      "Countertop Cleaning: Degreasing and sanitizing all kitchen countertops and surfaces.",
      "Sink Cleaning: Deep cleaning of sink, faucet, and drain area with anti-bacterial solutions.",
      "Stove & Hob Cleaning: Removal of grease, food residue, and stains from stove and hob.",
      "Chimney Cleaning: External cleaning of chimney hood and filter degreasing.",
      "Floor Mopping: Thorough mopping with floor-appropriate cleaning agents.",
    ],
    notIncluded: [
      "Cabinet Interior: Cleaning inside closed cabinets is not included in basic and standard packages.",
      "Appliance Repair: Fixing or servicing kitchen appliances like refrigerator, microwave, etc.",
      "Wall Washing: Deep washing of kitchen walls or tile grout is not included in standard service.",
      "Pest Treatment: Any pest or cockroach treatment within the kitchen area.",
    ],
    types: [
      { id: "kc_1", name: "Basic Kitchen", description: "Sink, counter & floor cleaning", price: 399, originalPrice: 599, duration: "30 min", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=200&fit=crop" },
      { id: "kc_2", name: "Standard Kitchen", description: "Basic + stove & chimney", price: 699, originalPrice: 999, duration: "60 min", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=200&fit=crop" },
      { id: "kc_3", name: "Deep Kitchen", description: "Full kitchen deep cleaning", price: 1099, originalPrice: 1599, duration: "90 min", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=200&fit=crop" },
      { id: "kc_4", name: "Premium Kitchen", description: "Deep clean + cabinet interior", price: 1599, originalPrice: 2299, duration: "120 min", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=200&fit=crop" },
    ],
  },
  {
    slug: "tank-cleaning",
    name: "Water Tank Cleaning",
    category: "Cleaning",
    description: "Professional water tank cleaning to remove sludge, algae, and sediment. Ensure clean and safe water supply for your family with our thorough cleaning service.",
    bannerImage: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1200&h=400&fit=crop",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&h=400&fit=crop",
    rating: 4.9,
    totalBookings: 654,
    isActive: true,
    included: [
      "Draining: Complete draining of existing water from the tank.",
      "Sludge Removal: Removal of accumulated sludge, mud, and sediment from the bottom.",
      "Algae Cleaning: Scrubbing and removal of algae growth from tank walls.",
      "Disinfection: Application of tank-safe disinfectant to kill bacteria and germs.",
      "Refilling: Refilling the tank with clean water after the cleaning process.",
    ],
    notIncluded: [
      "Tank Repair: Fixing cracks, leaks, or structural damage to the tank.",
      "Pipe Cleaning: Cleaning of pipes connected to the tank is a separate service.",
      "Overhead Tank Access: Climbing to very high overhead tanks may incur additional charges.",
      "Chemical Treatment: Advanced chemical treatment for hard water stains may cost extra.",
    ],
    types: [
      { id: "tc_1", name: "500L Tank", description: "Up to 500 litre tank cleaning", price: 499, originalPrice: 799, duration: "30 min", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=300&h=200&fit=crop" },
      { id: "tc_2", name: "1000L Tank", description: "Up to 1000 litre tank cleaning", price: 799, originalPrice: 1199, duration: "45 min", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=300&h=200&fit=crop" },
      { id: "tc_3", name: "2000L Tank", description: "Up to 2000 litre tank cleaning", price: 1199, originalPrice: 1799, duration: "60 min", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=300&h=200&fit=crop" },
      { id: "tc_4", name: "Multiple Tanks", description: "Up to 3 tanks cleaning", price: 1999, originalPrice: 2999, duration: "90 min", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=300&h=200&fit=crop" },
    ],
  },
  {
    slug: "washroom-cleaning",
    name: "Washroom Cleaning",
    category: "Cleaning",
    description: "Complete washroom deep cleaning including tiles, sanitary ware, fittings, and floor. We use anti-bacterial solutions to ensure a hygienic washroom.",
    bannerImage: "https://images.unsplash.com/photo-1527515637462-cff94eebd21f?w=1200&h=400&fit=crop",
    image: "https://images.unsplash.com/photo-1527515637462-cff94eebd21f?w=600&h=400&fit=crop",
    rating: 4.8,
    totalBookings: 876,
    isActive: true,
    included: [
      "Tile Cleaning: Scrubbing and cleaning of wall and floor tiles to remove stains and grime.",
      "Sanitary Ware Cleaning: Deep cleaning of toilet, seat, and urinal with disinfectant.",
      "Faucet & Fitting Polishing: Cleaning and polishing of taps, shower, and other fittings.",
      "Mirror & Glass Cleaning: Streak-free cleaning of mirrors and glass surfaces.",
      "Floor Mopping: Anti-bacterial floor mopping with drain cleaning.",
    ],
    notIncluded: [
      "Plumbing Fixes: Repairing leaking taps, clogged drains, or broken fittings.",
      "Grout Recoloring: Re-coloring or regrouting of tile grout lines.",
      "Concealed Area Cleaning: Cleaning behind or inside permanently fixed structures.",
      "Chemical Stain Removal: Hard water or lime scale stains may require extra treatment.",
    ],
    types: [
      { id: "wc_1", name: "1 Washroom", description: "Single washroom deep clean", price: 349, originalPrice: 549, duration: "30 min", image: "https://images.unsplash.com/photo-1527515637462-cff94eebd21f?w=300&h=200&fit=crop" },
      { id: "wc_2", name: "2 Washroom", description: "Two washrooms deep clean", price: 599, originalPrice: 999, duration: "50 min", image: "https://images.unsplash.com/photo-1527515637462-cff94eebd21f?w=300&h=200&fit=crop" },
      { id: "wc_3", name: "3 Washroom", description: "Three washrooms deep clean", price: 849, originalPrice: 1399, duration: "70 min", image: "https://images.unsplash.com/photo-1527515637462-cff94eebd21f?w=300&h=200&fit=crop" },
      { id: "wc_4", name: "4+ Washroom", description: "Four or more washrooms", price: 1199, originalPrice: 1999, duration: "90 min", image: "https://images.unsplash.com/photo-1527515637462-cff94eebd21f?w=300&h=200&fit=crop" },
    ],
  },
  {
    slug: "home-cleaning",
    name: "Full Home Cleaning",
    category: "Cleaning",
    description: "Complete home cleaning service covering all rooms, kitchen, bathrooms, and balconies. Our trained professionals leave every corner spotless.",
    bannerImage: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200&h=400&fit=crop",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&h=400&fit=crop",
    rating: 4.8,
    totalBookings: 2345,
    isActive: true,
    included: [
      "All Rooms: Dusting, vacuuming, and mopping of all bedrooms and living areas.",
      "Kitchen Cleaning: Countertop, sink, stove, and floor cleaning as per standard kitchen service.",
      "Bathroom Cleaning: All washrooms cleaned including tiles, toilet, and fittings.",
      "Balcony Cleaning: Sweeping and mopping of balcony areas.",
      "Window Cleaning: Cleaning of accessible window glass and frames.",
    ],
    notIncluded: [
      "Deep Carpet Cleaning: Carpet shampooing or steam cleaning is a separate service.",
      "Appliance Cleaning: Interior cleaning of refrigerator, oven, washing machine, etc.",
      "Wall Washing: Full wall washing or ceiling cleaning is not included.",
      "Outdoor Areas: Garden, terrace, or parking area cleaning is not part of this service.",
    ],
    types: [
      { id: "hc_1", name: "1 BHK", description: "Full cleaning for 1 BHK", price: 1499, originalPrice: 2299, duration: "120 min", image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=300&h=200&fit=crop" },
      { id: "hc_2", name: "2 BHK", description: "Full cleaning for 2 BHK", price: 2499, originalPrice: 3799, duration: "180 min", image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=300&h=200&fit=crop" },
      { id: "hc_3", name: "3 BHK", description: "Full cleaning for 3 BHK", price: 3499, originalPrice: 5299, duration: "240 min", image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=300&h=200&fit=crop" },
      { id: "hc_4", name: "4 BHK", description: "Full cleaning for 4 BHK", price: 4499, originalPrice: 6999, duration: "300 min", image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=300&h=200&fit=crop" },
      { id: "hc_5", name: "Villa / Bungalow", description: "Full villa deep cleaning", price: 7999, originalPrice: 12999, duration: "420 min", image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=300&h=200&fit=crop" },
    ],
  },
  {
    slug: "plumbing-repair",
    name: "Plumbing Repair",
    category: "Plumbing",
    description: "Expert plumbing services for leak repairs, pipe installation, drain cleaning, and fixture replacement. Licensed and verified plumbers at your doorstep.",
    bannerImage: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=1200&h=400&fit=crop",
    image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=600&h=400&fit=crop",
    rating: 4.8,
    totalBookings: 1234,
    isActive: true,
    included: [
      "Leak Diagnosis: Identification and repair of leaks in taps, pipes, and fixtures.",
      "Drain Unclogging: Clearing blocked drains using professional tools and techniques.",
      "Fixture Installation: Installation of new taps, faucets, showerheads, and connectors.",
      "Pipe Joint Repair: Fixing loose or damaged pipe joints to prevent leakage.",
      "Toilet Repair: Fixing running toilets, flush issues, and seat replacements.",
    ],
    notIncluded: [
      "Major Pipe Replacement: Replacing entire pipe networks or main water lines.",
      "Water Heater Repair: Servicing or repairing geysers and water heaters.",
      "Underground Pipe Work: Digging and repairing underground water or drainage pipes.",
      "Fixture Purchase: Cost of new taps, pipes, or fixtures is charged separately.",
    ],
    types: [
      { id: "pr_1", name: "Leak Repair", description: "Fix tap/pipe leaks", price: 299, originalPrice: 499, duration: "30 min", image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=300&h=200&fit=crop" },
      { id: "pr_2", name: "Drain Cleaning", description: "Unclog drains and pipes", price: 499, originalPrice: 799, duration: "45 min", image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=300&h=200&fit=crop" },
      { id: "pr_3", name: "Tap/Faucet Install", description: "Install new tap or faucet", price: 399, originalPrice: 599, duration: "30 min", image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=300&h=200&fit=crop" },
      { id: "pr_4", name: "Toilet Repair", description: "Fix running or clogged toilet", price: 599, originalPrice: 899, duration: "45 min", image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=300&h=200&fit=crop" },
      { id: "pr_5", name: "Pipe Replacement", description: "Replace damaged pipes", price: 999, originalPrice: 1499, duration: "60 min", image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=300&h=200&fit=crop" },
    ],
  },
  {
    slug: "electrical-work",
    name: "Electrical Work",
    category: "Electrical",
    description: "Licensed electricians for wiring, switch installation, fan mounting, MCB trips, and complete electrical solutions. Safe and certified service.",
    bannerImage: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=1200&h=400&fit=crop",
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&h=400&fit=crop",
    rating: 4.7,
    totalBookings: 987,
    isActive: true,
    included: [
      "Switch Board Installation: Installing or replacing modular and traditional switch boards.",
      "Fan Mounting: Ceiling fan, table fan, and exhaust fan installation.",
      "Light Installation: Wall lights, ceiling lights, tube lights, and chandelier mounting.",
      "MCB/Trip Fixing: Diagnosis and repair of MCB trips and short circuits.",
      "Wire Fitting: Connecting and securing wires for new or existing installations.",
    ],
    notIncluded: [
      "Full House Rewiring: Complete rewiring of an entire house or building.",
      "Inverter Installation: Setting up inverters, batteries, or UPS systems.",
      "Generator Work: Installation or repair of generators or backup power systems.",
      "Meter Board Work: Changes to the main electricity meter or distribution board.",
    ],
    types: [
      { id: "ew_1", name: "Switch Board", description: "Install/replace switch board", price: 299, originalPrice: 499, duration: "30 min", image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=300&h=200&fit=crop" },
      { id: "ew_2", name: "Fan Installation", description: "Install ceiling/wall fan", price: 399, originalPrice: 599, duration: "30 min", image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=300&h=200&fit=crop" },
      { id: "ew_3", name: "Light Installation", description: "Install lights/chandeliers", price: 349, originalPrice: 549, duration: "30 min", image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=300&h=200&fit=crop" },
      { id: "ew_4", name: "MCB/Trip Fix", description: "Fix MCB trips and short circuits", price: 499, originalPrice: 799, duration: "45 min", image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=300&h=200&fit=crop" },
      { id: "ew_5", name: "Full Wiring", description: "Complete room wiring", price: 2499, originalPrice: 3999, duration: "120 min", image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=300&h=200&fit=crop" },
    ],
  },
  {
    slug: "ac-service",
    name: "AC Service & Repair",
    category: "HVAC",
    description: "Professional AC servicing including gas refill, deep cleaning, and repair. Keep your air conditioner running efficiently with our expert technicians.",
    bannerImage: "https://images.unsplash.com/photo-1631545806609-3c480b4c2986?w=1200&h=400&fit=crop",
    image: "https://images.unsplash.com/photo-1631545806609-3c480b4c2986?w=600&h=400&fit=crop",
    rating: 4.9,
    totalBookings: 1567,
    isActive: true,
    included: [
      "Filter Cleaning: Removal, washing, and reinstallation of AC air filters.",
      "Coil Cleaning: Cleaning of evaporator and condenser coils to improve efficiency.",
      "Gas Top-Up: Checking gas levels and topping up refrigerant if needed (in gas refill package).",
      "Thermostat Check: Testing and calibration of thermostat for accurate temperature control.",
      "Drain Pan Cleaning: Clearing the drain pan and line to prevent water leakage.",
    ],
    notIncluded: [
      "Compressor Replacement: Replacing the compressor motor is a major repair service.",
      "Electrical Rewiring: Fixing internal wiring issues or PCB replacement.",
      "Duct Cleaning: Cleaning of AC ductwork is a separate specialized service.",
      "Gas Refill (in basic service): Full gas charging is only included in the gas refill package.",
    ],
    types: [
      { id: "ac_1", name: "AC Service", description: "Basic AC servicing & cleaning", price: 599, originalPrice: 899, duration: "45 min", image: "https://images.unsplash.com/photo-1631545806609-3c480b4c2986?w=300&h=200&fit=crop" },
      { id: "ac_2", name: "AC Deep Clean", description: "Chemical wash & deep clean", price: 999, originalPrice: 1499, duration: "60 min", image: "https://images.unsplash.com/photo-1631545806609-3c480b4c2986?w=300&h=200&fit=crop" },
      { id: "ac_3", name: "Gas Refill", description: "AC gas top-up", price: 1499, originalPrice: 2299, duration: "45 min", image: "https://images.unsplash.com/photo-1631545806609-3c480b4c2986?w=300&h=200&fit=crop" },
      { id: "ac_4", name: "AC Repair", description: "General AC repair service", price: 799, originalPrice: 1199, duration: "60 min", image: "https://images.unsplash.com/photo-1631545806609-3c480b4c2986?w=300&h=200&fit=crop" },
      { id: "ac_5", name: "AC Installation", description: "New AC installation", price: 1999, originalPrice: 2999, duration: "90 min", image: "https://images.unsplash.com/photo-1631545806609-3c480b4c2986?w=300&h=200&fit=crop" },
    ],
  },
  {
    slug: "laundry",
    name: "Laundry Service",
    category: "Laundry",
    description: "Professional laundry service including washing, drying, ironing, and folding. We handle all fabric types with care to give you fresh, clean clothes every time.",
    bannerImage: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=1200&h=400&fit=crop",
    image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=600&h=400&fit=crop",
    rating: 4.7,
    totalBookings: 3456,
    isActive: true,
    included: [
      "Washing: Machine wash with premium detergent for all fabric types.",
      "Drying: Proper drying based on fabric care requirements.",
      "Ironing: Professional ironing for wrinkle-free finish.",
      "Folding: Neatly folded and packaged for pickup or delivery.",
      "Stain Treatment: Basic stain removal for common stains.",
    ],
    notIncluded: [
      "Dry Cleaning: Specialized dry cleaning is a separate service.",
      "Heavy Stains: Permanent stains from paint, ink, or dye may not be fully removed.",
      "Delicate Fabrics: Silk, velvet, and other delicate fabrics require special handling.",
      "Repairs: Sewing, mending, or alterations are not included.",
    ],
    types: [
      { id: "l_1", name: "5 Kg Wash & Iron", description: "Up to 5 kg laundry", price: 199, originalPrice: 349, duration: "24 hrs", image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=300&h=200&fit=crop" },
      { id: "l_2", name: "10 Kg Wash & Iron", description: "Up to 10 kg laundry", price: 349, originalPrice: 599, duration: "24 hrs", image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=300&h=200&fit=crop" },
      { id: "l_3", name: "Wash & Fold", description: "Wash, dry & fold only", price: 149, originalPrice: 249, duration: "24 hrs", image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=300&h=200&fit=crop" },
      { id: "l_4", name: "Iron Only", description: "Ironing service per piece", price: 10, originalPrice: 20, duration: "2 hrs", image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=300&h=200&fit=crop" },
      { id: "l_5", name: "Comforter / Blanket", description: "Single comforter wash", price: 199, originalPrice: 399, duration: "48 hrs", image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=300&h=200&fit=crop" },
    ],
  },
  {
    slug: "car-wash",
    name: "Car Wash & Detailing",
    category: "Car Wash",
    description: "Complete car wash and detailing service including exterior wash, interior vacuuming, dashboard cleaning, and polishing. Keep your car looking brand new.",
    bannerImage: "https://images.unsplash.com/photo-1520340356584-f9918d51c7e7?w=1200&h=400&fit=crop",
    image: "https://images.unsplash.com/photo-1520340356584-f9918d51c7e7?w=600&h=400&fit=crop",
    rating: 4.6,
    totalBookings: 2190,
    isActive: true,
    included: [
      "Exterior Wash: Thorough wash with foam, shampoo, and high-pressure rinse.",
      "Interior Vacuuming: Complete vacuuming of seats, floor mats, and trunk.",
      "Dashboard Cleaning: Wiping and conditioning of dashboard and console.",
      "Window Cleaning: Streak-free cleaning of all windows and mirrors.",
      "Tire Dressing: Application of tire shine for a polished look.",
    ],
    notIncluded: [
      "Paint Correction: Scratch removal and paint correction is a separate service.",
      "Interior Shampooing: Deep shampooing of seats and carpets costs extra.",
      "Engine Bay Cleaning: Cleaning the engine compartment is not included.",
      "Ceramic Coating: Premium paint protection coatings are additional services.",
    ],
    types: [
      { id: "cw_1", name: "Hatchback Basic", description: "Exterior wash + vacuum", price: 399, originalPrice: 599, duration: "30 min", image: "https://images.unsplash.com/photo-1520340356584-f9918d51c7e7?w=300&h=200&fit=crop" },
      { id: "cw_2", name: "Sedan Basic", description: "Exterior wash + vacuum", price: 499, originalPrice: 799, duration: "40 min", image: "https://images.unsplash.com/photo-1520340356584-f9918d51c7e7?w=300&h=200&fit=crop" },
      { id: "cw_3", name: "SUV Basic", description: "Exterior wash + vacuum", price: 599, originalPrice: 999, duration: "45 min", image: "https://images.unsplash.com/photo-1520340356584-f9918d51c7e7?w=300&h=200&fit=crop" },
      { id: "cw_4", name: "Sedan Premium", description: "Full wash + interior detail", price: 999, originalPrice: 1499, duration: "60 min", image: "https://images.unsplash.com/photo-1520340356584-f9918d51c7e7?w=300&h=200&fit=crop" },
      { id: "cw_5", name: "SUV Premium", description: "Full wash + interior detail", price: 1299, originalPrice: 1999, duration: "75 min", image: "https://images.unsplash.com/photo-1520340356584-f9918d51c7e7?w=300&h=200&fit=crop" },
      { id: "cw_6", name: "Full Detailing", description: "Complete interior + exterior detailing", price: 2499, originalPrice: 3999, duration: "120 min", image: "https://images.unsplash.com/photo-1520340356584-f9918d51c7e7?w=300&h=200&fit=crop" },
    ],
  },
  {
    slug: "pest-control",
    name: "Pest Control",
    category: "Pest Control",
    description: "Effective pest control services for cockroaches, termites, mosquitoes, bed bugs, and rodents. Safe, odorless, and long-lasting treatments for your home and office.",
    bannerImage: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1200&h=400&fit=crop",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop",
    rating: 4.8,
    totalBookings: 1876,
    isActive: true,
    included: [
      "Inspection: Thorough inspection of the premises to identify pest infestation.",
      "Treatment: Application of safe and effective pest control solutions.",
      "Spraying: Targeted spraying in affected areas including kitchen, bathroom, and corners.",
      "Gel Application: Application of gel bait in cabinets and hidden areas.",
      "Follow-up: Free follow-up visit within 30 days if pests reappear.",
    ],
    notIncluded: [
      "Termite Treatment: Anti-termite treatment is a separate specialized service.",
      "Fumigation: Full building fumigation requires additional charges.",
      "Structural Sealing: Sealing cracks and gaps in walls is not included.",
      "Pest Removal: Physical removal of large pests like rats may cost extra.",
    ],
    types: [
      { id: "pc_1", name: "General Pest", description: "Cockroach, ant & general pests", price: 499, originalPrice: 799, duration: "30 min", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=300&h=200&fit=crop" },
      { id: "pc_2", name: "Bed Bug Treatment", description: "Bed bug removal service", price: 999, originalPrice: 1499, duration: "45 min", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=300&h=200&fit=crop" },
      { id: "pc_3", name: "Mosquito Treatment", description: "Mosquito repellent spray", price: 699, originalPrice: 999, duration: "30 min", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=300&h=200&fit=crop" },
      { id: "pc_4", name: "Termite Treatment", description: "Anti-termite treatment", price: 2499, originalPrice: 3999, duration: "90 min", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=300&h=200&fit=crop" },
      { id: "pc_5", name: "Complete Package", description: "All pests - one solution", price: 1999, originalPrice: 2999, duration: "60 min", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=300&h=200&fit=crop" },
    ],
  },
];

export function getServiceBySlug(slug: string): ServiceDetail | undefined {
  return serviceDetails.find((s) => s.slug === slug);
}

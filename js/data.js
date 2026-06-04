/* =============================================================================
   SITE TEMPLATE — SINGLE SOURCE OF TRUTH
   -----------------------------------------------------------------------------
   THEME VARIANT: "BARBERSHOP (dark / masculine)".
   Same structure & system as the Beauty template — only the visual skin differs
   (dark palette, condensed display type, squared buttons, grain texture).
   Pick beauty-light or barbershop-dark per client by using the matching folder.

   This is the ONLY file you edit to make a new client site.
   Every page (Home, Services, Gallery, Team, Contact) reads from this object.
   Do NOT edit the HTML/CSS/JS for normal client work — just change values here.

   QUICK MAP (Google Maps business card  ->  field here):
     Business name        -> business.name
     "Barbershop" etc.    -> business.type
     Star rating (4.9)    -> business.rating
     "(412) reviews"      -> business.reviewCount
     Phone                -> business.phone  +  business.phoneTel (digits only, +1...)
     Address              -> business.address
     Pin location         -> business.lat / business.lng  (right-click the pin -> copy)
     Opening hours        -> hours[]
     Services & prices    -> services[]
     Photos               -> hero.image, gallery[], team[].photo  (drop files in /img)
     Reviews              -> reviews[]

   THEME COLOR: change theme.brand to the client's accent color. Everything
   (buttons, headings accents, links) recolors automatically. Pick brandDark a
   few shades darker for hover states. (This variant defaults to whiskey amber.)

   FORM DELIVERY: set business.formEndpoint to a Formspree endpoint
   (https://formspree.io  -> free -> copy the form URL). If left empty, the
   contact form falls back to opening the visitor's email app addressed to
   business.email (mailto). Either way it works with NO server.
   ========================================================================== */

window.SITE = {

  /* ---- BRAND COLOR (change one value, whole site recolors) ---------------- */
  /* Barbershop options: whiskey amber #C8841E · oxblood #8B2331 · brass #B08D57 */
  theme: {
    brand:     "#C8841E",   // whiskey amber — buttons, links, highlights
    brandDark: "#9C6414",   // darker shade for hover/active
    accent:    "#D8A24B",   // brass/gold — stars, small details
  },

  /* ---- BUSINESS BASICS --------------------------------------------------- */
  business: {
    name:        "Ironside Barber Co.",
    type:        "Barbershop & Men's Grooming",
    tagline:     "Sharp cuts. Straight razors. No fuss.",
    intro:       "An old-school barbershop for the modern man — precision cuts, hot-towel shaves and beard work by barbers who take the craft seriously.",
    phone:       "(212) 555-0192",
    phoneTel:    "+12125550192",          // digits only, with +1 country code
    email:       "shop@ironsidebarber.example",
    address:     "118 Bowery, New York, NY 10013",
    lat:         40.7193,                   // map pin latitude
    lng:        -73.9938,                   // map pin longitude
    rating:      4.9,                       // Google star rating
    reviewCount: 412,                       // Google review count
    yearsInBiz:  14,                        // years in business

    bookingLink: "",   // optional external booking URL (Booksy/Squire/etc). Empty = "Book Now" -> contact form.
    formEndpoint:"",   // Formspree URL. Empty = contact form uses mailto to business.email.

    social: {
      instagram: "https://instagram.com/",
      facebook:  "https://facebook.com/",
      tiktok:    "https://tiktok.com/",
      yelp:      "https://yelp.com/",
    },
  },

  /* ---- OPENING HOURS ----------------------------------------------------- */
  hours: [
    { day: "Monday",    open: "10:00 – 20:00" },
    { day: "Tuesday",   open: "10:00 – 20:00" },
    { day: "Wednesday", open: "10:00 – 20:00" },
    { day: "Thursday",  open: "10:00 – 21:00" },
    { day: "Friday",    open: "9:00 – 21:00"  },
    { day: "Saturday",  open: "9:00 – 19:00"  },
    { day: "Sunday",    open: "11:00 – 17:00" },
  ],

  /* ---- HOME HIGHLIGHTS STRIP (3–4 items) --------------------------------- */
  highlights: [
    { big: "4.9★",     small: "412 Google reviews"          },
    { big: "14",       small: "Years on the Bowery"          },
    { big: "7",        small: "Master barbers"               },
    { big: "Walk-ins", small: "Welcome — or book ahead"      },
  ],

  /* ---- HERO -------------------------------------------------------------- */
  hero: {
    image:    "img/hero.jpg",          // swap for a real wide photo (1600×1000+)
    eyebrow:  "Est. 2012 · Lower Manhattan",
    headline: "A proper cut, every time.",
    sub:      "Classic barbering with a modern edge — skin fades, scissor work, beard sculpting and hot-towel shaves.",
  },

  /* ---- SERVICES (grouped by category, with prices) ----------------------- */
  services: [
    {
      category: "Haircuts",
      items: [
        { name: "Signature Haircut",       price: "$45",  duration: "45 min", desc: "Consultation, cut, hot towel, and a clean finish." },
        { name: "Skin Fade",               price: "$50",  duration: "50 min", desc: "Crisp, blended fade tailored to your shape." },
        { name: "Buzz Cut",                price: "$30",  duration: "25 min", desc: "Single-guard clipper cut, fast and sharp." },
        { name: "The Full Service",        price: "$70",  duration: "70 min", desc: "Haircut, beard trim, hot-towel finish — the works." },
      ],
    },
    {
      category: "Beard & Shave",
      items: [
        { name: "Hot Towel Straight Shave",price: "$45",  duration: "45 min", desc: "Traditional straight-razor shave with hot towels and oils." },
        { name: "Beard Sculpt & Trim",     price: "$30",  duration: "30 min", desc: "Line-up, shape, and condition for a defined beard." },
        { name: "Head Shave",              price: "$40",  duration: "40 min", desc: "Clean razor head shave with hot-towel prep." },
      ],
    },
    {
      category: "Grooming & Color",
      items: [
        { name: "Grey Blending",           price: "$35",  duration: "40 min", desc: "Subtle color to knock back the grey, never flat." },
        { name: "Hair & Scalp Treatment",  price: "$25",  duration: "20 min", desc: "Deep cleanse and conditioning for hair and scalp." },
        { name: "Brow & Ear/Nose Detail",  price: "$15",  duration: "15 min", desc: "Tidy up the details that finish the look." },
      ],
    },
    {
      category: "Kids & Extras",
      items: [
        { name: "Kids' Cut (under 12)",    price: "$30",  duration: "30 min", desc: "Patient, sharp cuts for the next generation." },
        { name: "Wash & Style",            price: "$20",  duration: "20 min", desc: "Shampoo, blow-dry, and product finish." },
      ],
    },
  ],

  /* ---- TEAM (cards). Leave [] empty to show a "your team here" note. ------ */
  team: [
    { name: "Marcus Vane",   role: "Owner · Master Barber", photo: "img/team-1.jpg", bio: "14 years on the chair. Scissor work and classic tapers are his signature." },
    { name: "Theo Sandoval", role: "Senior Barber",         photo: "img/team-2.jpg", bio: "Fade specialist with a razor-sharp eye for detail and design lines." },
    { name: "Devin Okafor",  role: "Barber · Beard Expert", photo: "img/team-3.jpg", bio: "Straight-razor shaves and beard sculpting are his craft." },
    { name: "Sal Romano",    role: "Barber",                photo: "img/team-4.jpg", bio: "Old-school technique, modern styles. Great with first-timers and kids." },
  ],

  /* ---- GALLERY (work photos) -------------------------------------------- */
  gallery: [
    { src: "img/gallery-1.jpg", caption: "Textured crop" },
    { src: "img/gallery-2.jpg", caption: "Beard sculpt" },
    { src: "img/gallery-3.jpg", caption: "Classic taper" },
    { src: "img/gallery-4.jpg", caption: "The chair" },
    { src: "img/gallery-5.jpg", caption: "Skin fade" },
    { src: "img/gallery-6.jpg", caption: "Straight-razor finish" },
    { src: "img/gallery-7.jpg", caption: "Scissor work" },
    { src: "img/gallery-8.jpg", caption: "Hot-towel shave" },
  ],

  /* ---- ABOUT ------------------------------------------------------------- */
  about: {
    image: "img/about.jpg",
    heading: "Barbering the way it's meant to be",
    body: [
      "Ironside opened on the Bowery in 2012 with one rule: every man leaves looking sharp. No rushed cuts, no upsell — just skilled barbers, good conversation, and a clean chair.",
      "We're as comfortable with a blade fade as we are a hot-towel shave. Walk in for a quick clean-up or book the full service and take your time. Either way, you're in good hands.",
    ],
  },

  /* ---- REVIEWS (real ones from Google/Yelp) ------------------------------ */
  reviews: [
    { text: "Best fade in the city, hands down. Marcus took his time and the line-up was perfect. Found my barber for life.", author: "James T.", stars: 5, source: "Google" },
    { text: "Hot-towel straight shave was an experience — smoothest shave I've had. Old-school done right.", author: "Andre P.", stars: 5, source: "Yelp" },
    { text: "Took my son for his first real haircut and they were incredible with him. Sharp cut, zero fuss.", author: "Michael R.", stars: 5, source: "Google" },
  ],

  /* ---- CONTACT / BOOKING PAGE COPY -------------------------------------- */
  contact: {
    heading: "Book your chair",
    sub: "Pick your barber and a time — walk-ins welcome, but booking ahead beats the wait.",
  },

  /* ---- BOOKING FORM OPTIONS ---------------------------------------------- */
  booking: {
    daysAhead: 21,          // how many days forward to offer in the Date dropdown
    minLeadMinutes: 60,     // if "today" is picked, hide slots sooner than this many minutes from now
                            // (uses the VISITOR'S own local time/timezone automatically)
    times: [
      "10:00 AM","10:30 AM","11:00 AM","11:30 AM","12:00 PM","12:30 PM",
      "1:00 PM","1:30 PM","2:00 PM","2:30 PM","3:00 PM","3:30 PM",
      "4:00 PM","4:30 PM","5:00 PM","5:30 PM","6:00 PM","6:30 PM",
      "7:00 PM","7:30 PM","8:00 PM",
    ],
  },
};

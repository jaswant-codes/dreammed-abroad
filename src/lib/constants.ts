export const SITE_CONFIG = {
  name: "DreamMed Abroad",
  domain: "dreammedabroad.com",
  url: "https://dreammedabroad.com",
  tagline: "Your Gateway to a Global Medical Career",
  description:
    "DreamMed Abroad is a premium MBBS abroad consultancy helping Indian students get admission in top NMC-approved medical universities worldwide. Expert guidance, affordable fees, and end-to-end support.",
  phones: [
    "+91 82900 21125",
    "+91 78779 37069",
    "+91 73398 20769"
  ],
  email: "contact.dreammed@gmail.com",
  whatsappNumber: "918290021125",
  whatsappMessage:
    "Hi, I want MBBS admission counselling from DreamMed Abroad.",
  address: "DreamMed Abroad, CLC Circle Road, Railway Station Colony, Sikar, Rajasthan - 332001, India",
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3537.537!2d75.1399!3d27.6094!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396ca547ff09e23d%3A0x1!2sCLC%20Circle%2C%20Sikar%2C%20Rajasthan%20332001!5e0!3m2!1sen!2sin!4v1",
  socialLinks: {
    instagram: "https://www.instagram.com/dreammedabroad.in/",
    youtube: "https://www.youtube.com/@dreammedabroad",
    linkedin: "https://www.linkedin.com/company/dreammed-abroad/",
  },
};

export const WHATSAPP_URL = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(SITE_CONFIG.whatsappMessage)}`;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  {
    label: "Study Destinations",
    href: "#",
    children: [
      { label: "MBBS in Uzbekistan", href: "/mbbs-in-uzbekistan" },
      { label: "MBBS in Kyrgyzstan", href: "/mbbs-in-kyrgyzstan" },
      { label: "MBBS in Russia", href: "/mbbs-in-russia" },
      { label: "MBBS in Kazakhstan", href: "/mbbs-in-kazakhstan" },
      { label: "MBBS in Georgia", href: "/mbbs-in-georgia" },
    ],
  },
  { label: "Universities", href: "/universities" },
  { label: "Blog", href: "/blog" },
  {
    label: "MBBS Guide",
    href: "#",
    children: [
      { label: "MBBS in Kazakhstan 2026", href: "/guides/mbbs-in-kazakhstan-2026" },
      { label: "MBBS in Uzbekistan 2026", href: "/guides/mbbs-in-uzbekistan-2026" },
      { label: "MBBS in Russia 2026", href: "/guides/mbbs-in-russia-2026" },
      { label: "MBBS Abroad 2026 Guide", href: "/guides/mbbs-abroad-2026-guide" },
      { label: "NMC Approved Universities", href: "/guides/nmc-approved-medical-universities-2026" },
      { label: "Fees Comparison 2026", href: "/guides/mbbs-abroad-fees-comparison-2026" },
    ],
  },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const STATS = [
  { label: "Students Placed", value: 1500, suffix: "+" },
  { label: "Partner Universities", value: 50, suffix: "+" },
  { label: "Countries", value: 5, suffix: "" },
  { label: "Years Experience", value: 10, suffix: "+" },
];

export const WHY_CHOOSE_US = [
  {
    title: "NMC Approved Universities",
    description:
      "Every university we recommend is recognized by NMC and WHO, ensuring your degree is valid worldwide.",
    icon: "ShieldCheck",
  },
  {
    title: "Affordable Fees",
    description:
      "Study MBBS abroad at a fraction of the cost of private medical colleges in India.",
    icon: "IndianRupee",
  },
  {
    title: "Visa Assistance",
    description:
      "Complete visa processing support with high success rate and documentation guidance.",
    icon: "Plane",
  },
  {
    title: "Hostel & Accommodation",
    description:
      "Comfortable hostel facilities with Indian food options at all partner universities.",
    icon: "Building",
  },
  {
    title: "End-to-End Guidance",
    description:
      "From counselling to departure and post-arrival support — we are with you at every step.",
    icon: "Route",
  },
  {
    title: "Personal Counselling",
    description:
      "One-on-one sessions with expert counsellors who understand your goals and budget.",
    icon: "UserCheck",
  },
];

export const ADMISSION_STEPS = [
  {
    step: 1,
    title: "Free Counselling",
    description:
      "Connect with our expert counsellors to discuss your NEET score, budget, and career goals.",
  },
  {
    step: 2,
    title: "University Selection",
    description:
      "We shortlist the best NMC-approved universities matching your profile and preferences.",
  },
  {
    step: 3,
    title: "Documentation",
    description:
      "Our team handles all paperwork — transcripts, passport, medical certificates, and more.",
  },
  {
    step: 4,
    title: "Admission Letter",
    description:
      "Receive your official admission letter from the chosen university within days.",
  },
  {
    step: 5,
    title: "Visa Processing",
    description:
      "Complete visa assistance with document preparation and embassy appointment scheduling.",
  },
  {
    step: 6,
    title: "Departure & Arrival",
    description:
      "Pre-departure orientation, airport pickup, and settling-in support at the university.",
  },
];

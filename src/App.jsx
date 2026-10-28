import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  ShieldCheck,
  Award,
  Truck,
  FileCheck,
  MapPin,
  Phone,
  Coins,
  Sparkles,
  CheckCircle2,
  Navigation,
  Clock,
  ArrowRight,
  UploadCloud,
  AlertCircle,
  QrCode,
  Printer,
  Download,
  Search,
  Share2,
  Heart,
  Smile,
  ExternalLink,
  Lock,
  User,
  Mail,
  Compass,
  Eye,
  X,
  ChevronRight,
  ChevronDown,
  Filter,
  Check,
  Leaf,
  Flame,
  Thermometer,
  Volume2,
  VolumeX,
  MessageSquare,
  CreditCard,
  Camera,
  Activity,
  Layers,
  Building2,
  TrendingUp,
  FileText,
  Scan,
  Globe2,
  Send,
  Copy,
  CheckCircle,
  HelpCircle,
  BarChart3
} from 'lucide-react';

// ==========================================
// SYSTEM CONFIGURATION & INITIAL DATA
// ==========================================
const API_BASE = '/api/v1';

const ROLES = [
  {
    id: 'DONOR',
    name: 'Food Donor',
    sub: 'Commercial Kitchens, Banquets & Hotels',
    icon: Building2,
    badge: 'bg-amber-50 text-amber-800 border-amber-200',
    desc: 'Log cooked surplus in 60s, attach photo, and earn Potbhar Green Impact Credits.',
  },
  {
    id: 'ASSESSOR',
    name: 'Food Safety Officer / Nutritionist',
    sub: 'Certified Lab & Inspection Desk',
    icon: ShieldCheck,
    badge: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    desc: 'Perform mandatory thermal core probe, acidity, and seal testing before shelter clearance.',
  },
  {
    id: 'RECIPIENT',
    name: 'Recipient Shelter / NGO',
    sub: 'Orphanages, Old Age Homes & Shelters',
    icon: Heart,
    badge: 'bg-blue-50 text-blue-800 border-blue-200',
    desc: 'Accept doctor-certified wholesome meals with live courier ETA and reception receipts.',
  },
  {
    id: 'LOGISTICS',
    name: 'Fleet Logistics Rider',
    sub: 'Insulated Cold/Hot Transit Couriers',
    icon: Truck,
    badge: 'bg-indigo-50 text-indigo-800 border-indigo-200',
    desc: '3-leg routing: Donor pickup ➡️ Lab inspection clearance ➡️ Doorstep shelter delivery.',
  },
  {
    id: 'GAUSHALA',
    name: 'Gaushala & Bio-Compost Partner',
    sub: 'Zero-Landfill Circular Repurposing',
    icon: Leaf,
    badge: 'bg-green-50 text-green-800 border-green-200',
    desc: '100% circular fallback: non-passed organic surplus transformed into cattle feed & compost.',
  },
];

const FOOD_PHOTO_PRESETS = [
  {
    title: 'Dum Biryani with Mirchi Salan & Raita',
    url: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop&q=60',
    category: 'Cooked Banquet Buffet',
    temp: 64.5,
  },
  {
    title: 'Paneer Butter Masala & Tawa Rotis',
    url: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=800&auto=format&fit=crop&q=60',
    category: 'North Indian Cuisine',
    temp: 62.0,
  },
  {
    title: 'Steamed Basmati Rice & Dal Tadka',
    url: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&auto=format&fit=crop&q=60',
    category: 'Vegetarian Meals',
    temp: 59.5,
  },
  {
    title: 'Tawa Chapatis & Seasonal Sabzi',
    url: 'https://images.unsplash.com/photo-1505253758473-96b3d5ebcd9a?w=800&auto=format&fit=crop&q=60',
    category: 'Breads & Rotis',
    temp: 58.0,
  },
  {
    title: 'Clean Prep Trimmings (Cattle Feed & Compost)',
    url: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800&auto=format&fit=crop&q=60',
    category: 'Kitchen Organic Prep Scrap',
    temp: 24.0,
  },
];

const INITIAL_BATCHES = [
  {
    id: 'PB-BATCH-801',
    food_title: 'Dum Biryani with Mirchi Salan & Raita',
    category: 'Cooked Banquet Buffet',
    description: 'Fresh afternoon wedding banquet surplus, sealed in food-grade insulated Cambro containers',
    quantity_kg: 35,
    servings: 88,
    cooked_time: '12:30 PM (2 hrs ago)',
    shelf_life_hours: 4.5,
    container_type: 'Insulated Stainless Cambro (Sealed)',
    temp_celsius: 64.5,
    donor_name: 'Grand Pavilion Banquets',
    donor_phone: '+91 98230 11223',
    donor_location: 'Senapati Bapat Road, Pune',
    donor_coords: { lat: 18.5308, lng: 73.8288 },
    nutritionist_name: 'Dr. Ananya Verma (FSSAI Auditor #A882)',
    nutritionist_lab: 'POTBHAR Central Inspection Hub, Shivaji Nagar',
    nutritionist_coords: { lat: 18.5314, lng: 73.8446 },
    recipient_name: 'Asha Community Shelter & Care Home',
    recipient_phone: '+91 98230 77889',
    recipient_location: 'Lajpat Nagar Shelter Center, Pune',
    recipient_coords: { lat: 18.5089, lng: 73.8567 },
    rider_name: 'Vikram Singh (Fleet Unit #04)',
    rider_phone: '+91 98230 99001',
    status: 'IN_TRANSIT_TO_SHELTER',
    safety_cert_id: 'CERT-FSSAI-8841-A',
    ph_level: 6.4,
    optical_score: 96,
    credits_awarded: 350,
    food_image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop&q=60',
    rider_tip: 50,
  },
  {
    id: 'PB-BATCH-802',
    food_title: 'Paneer Butter Masala & Tawa Rotis',
    category: 'North Indian Cuisine',
    description: 'Freshly sealed chafing containers from afternoon convention',
    quantity_kg: 24,
    servings: 60,
    cooked_time: '1:15 PM (1 hr ago)',
    shelf_life_hours: 5,
    container_type: 'Double-walled Thermal Chest',
    temp_celsius: 62.0,
    donor_name: 'Mayur Convention Center',
    donor_phone: '+91 98230 44112',
    donor_location: 'Kothrud, Pune',
    donor_coords: { lat: 18.5074, lng: 73.8077 },
    nutritionist_name: 'Dr. Ananya Verma',
    nutritionist_lab: 'POTBHAR Central Inspection Hub, Shivaji Nagar',
    nutritionist_coords: { lat: 18.5314, lng: 73.8446 },
    recipient_name: 'Balaji Child Welfare Home',
    recipient_phone: '+91 98230 55223',
    recipient_location: 'Karve Road, Pune',
    recipient_coords: { lat: 18.4988, lng: 73.8211 },
    rider_name: 'Vikram Singh (Fleet Unit #04)',
    rider_phone: '+91 98230 99001',
    status: 'AT_INSPECTION',
    safety_cert_id: null,
    ph_level: 6.2,
    optical_score: 94,
    credits_awarded: 240,
    food_image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=800&auto=format&fit=crop&q=60',
    rider_tip: 0,
  },
  {
    id: 'PB-BATCH-803',
    food_title: 'Steamed Rice, Dal Tadka & Sautéed Beans',
    category: 'Vegetarian Meals',
    description: 'Hot held lunch buffet surplus awaiting initial courier pickup',
    quantity_kg: 30,
    servings: 75,
    cooked_time: '2:00 PM (30 mins ago)',
    shelf_life_hours: 4,
    container_type: 'Sealed Food-Grade Chafers',
    temp_celsius: 59.5,
    donor_name: 'City View Convention Banquets',
    donor_phone: '+91 98230 88990',
    donor_location: 'Shivaji Nagar, Pune',
    donor_coords: { lat: 18.5314, lng: 73.8446 },
    nutritionist_name: 'Dr. Ananya Verma',
    nutritionist_lab: 'POTBHAR Central Inspection Hub',
    nutritionist_coords: { lat: 18.5314, lng: 73.8446 },
    recipient_name: 'Pending Certification Matching',
    recipient_phone: '',
    recipient_location: 'Nearest Verified Orphanage',
    recipient_coords: { lat: 18.5204, lng: 73.8567 },
    rider_name: 'Assigning Transit Courier',
    rider_phone: '',
    status: 'REPORTED',
    safety_cert_id: null,
    ph_level: 6.5,
    optical_score: 91,
    credits_awarded: 300,
    food_image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&auto=format&fit=crop&q=60',
    rider_tip: 0,
  },
  {
    id: 'PB-BATCH-804',
    food_title: 'Vegetable Trimmings, Peelings & Clean Organic Trim',
    category: 'Kitchen Organic Prep Scrap',
    description: 'Clean pre-consumer vegetable ends diverted for cattle fodder and bio-compost',
    quantity_kg: 50,
    servings: 0,
    cooked_time: '11:00 AM',
    shelf_life_hours: 24,
    container_type: 'Heavy-duty Aerated Bins',
    temp_celsius: 24.0,
    donor_name: 'Grand Pavilion Banquets',
    donor_phone: '+91 98230 11223',
    donor_location: 'Senapati Bapat Road, Pune',
    donor_coords: { lat: 18.5308, lng: 73.8288 },
    nutritionist_name: 'Dr. Ananya Verma',
    nutritionist_lab: 'POTBHAR Central Inspection Hub',
    nutritionist_coords: { lat: 18.5314, lng: 73.8446 },
    recipient_name: 'Vrindavan Gaushala & Soil Trust',
    recipient_phone: '+91 98230 33445',
    recipient_location: 'Aundh Gaushala Facility, Pune',
    recipient_coords: { lat: 18.5583, lng: 73.8077 },
    rider_name: 'Green Transit Eco-Van',
    rider_phone: '+91 98230 66778',
    status: 'DIVERTED_TO_GAUSHALA',
    safety_cert_id: 'CERT-GAUSHALA-0922',
    ph_level: 5.8,
    optical_score: 85,
    credits_awarded: 250,
    food_image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800&auto=format&fit=crop&q=60',
    rider_tip: 0,
  }
];

const LIVE_TICKER_EVENTS = [
  {
    van: 'Van #04 (Indiranagar)',
    desc: '→ 65kg hot surplus collected from Grand Pavilion Banquets',
    status: '68.2°C PASS',
    time: '1 min ago',
    dot: 'bg-emerald-500',
  },
  {
    van: 'Van #11 (Central Hub)',
    desc: '→ 180 portions delivered & verified at Asha Shelter Home',
    status: 'INTAKE VERIFIED',
    time: '3 mins ago',
    dot: 'bg-emerald-500',
  },
  {
    van: 'Van #07 (Shivaji Nagar)',
    desc: '→ En route to Convention Center for 800-guest wedding surplus',
    status: 'ETA 6 MINS',
    time: 'Live GPS',
    dot: 'bg-amber-500',
  },
  {
    van: 'Van #02 (Kothrud)',
    desc: '→ Laboratory inspection cleared by Dr. Ananya Verma',
    status: 'CERT-FSSAI-8841-A',
    time: 'Just now',
    dot: 'bg-emerald-500',
  },
];

const FAQ_ITEMS = [
  {
    q: 'Are food donors protected from liability under Indian law?',
    a: 'Yes. Donors acting in good faith are legally protected under the Food Safety and Standards Act (FSSAI) guidelines and national Good Samaritan frameworks. Potbhar further provides a certified inspection shield: our licensed food safety officers test every batch before delivery to shelters.',
  },
  {
    q: 'How does the mandatory nutritionist testing work?',
    a: 'Every dispatched batch is first routed to the nearest accredited Potbhar testing desk. A certified officer checks thermal holding temperatures (>60°C or <5°C), optical freshness, pH balance, and container seal integrity before signing a digital certificate of fitness.',
  },
  {
    q: 'What happens to food that does not meet human consumption criteria?',
    a: 'Zero food goes to landfills. Any batch that does not meet strict human consumption guidelines is immediately redirected through our secondary circular pathway to partner gaushalas for sacred cattle feed or bio-methanation and organic composting.',
  },
  {
    q: 'Can corporate banquets claim CSR & ESG tax benefits?',
    a: 'Yes. For every verified kilogram of food recovered, donors receive official digitally-signed reception receipts from registered 80G/12A NGOs, alongside Potbhar Green Impact Credits for ESG audit reporting.',
  },
];

export default function App() {
  // Navigation View: 'landing' (mockup-reskinned) | 'portal' (dedicated persona workspaces)
  const [currentView, setCurrentView] = useState('landing');

  // Active Authenticated User & Role
  const [currentUser, setCurrentUser] = useState({
    id: 'usr_donor_01',
    role: 'DONOR',
    name: 'Ravi Sharma',
    orgName: 'Grand Pavilion Banquets',
    email: 'ravi.sharma@grandpavilion.in',
    phone: '+91 98230 11223',
    license: 'FSSAI Lic #11521034000892',
    credits: 1420,
    city: 'Pune, Maharashtra',
  });

  // Modal States
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('SIGN_IN'); // 'SIGN_IN' | 'REGISTER'
  const [authMethod, setAuthMethod] = useState('OTP'); // 'OTP' | 'PASSWORD'
  const [authSelectedRole, setAuthSelectedRole] = useState('DONOR');
  const [authPhone, setAuthPhone] = useState('+91 98230 11223');
  const [authEmail, setAuthEmail] = useState('donor@grandpavilion.in');
  const [authPassword, setAuthPassword] = useState('••••••••');
  const [authOtpCode, setAuthOtpCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpTimer, setOtpTimer] = useState(30);

  // Registration Specific Fields
  const [regOrgName, setRegOrgName] = useState('');
  const [regFullName, setRegFullName] = useState('');
  const [regLicense, setRegLicense] = useState('');
  const [regCity, setRegCity] = useState('Pune');

  // Certificate Modals
  const [activeCert, setActiveCert] = useState(null); // { type: 'SAFETY' | 'SHELTER' | 'GAUSHALA', batch: object }

  // Accessibility Audio Narrator (Optional toggle)
  const [accessibilityAudioEnabled, setAccessibilityAudioEnabled] = useState(false);

  // SMS System States
  const [smsNotification, setSmsNotification] = useState(null);
  const [smsDrawerOpen, setSmsDrawerOpen] = useState(false);
  const [smsLang, setSmsLang] = useState('MR'); // 'MR' | 'HI' | 'EN'
  const [smsLogs, setSmsLogs] = useState([
    {
      id: 'SMS-101',
      to: 'Grand Pavilion Banquets (+91 98230 11223)',
      time: '12 mins ago',
      status: 'DELIVERED • Airtel Gateway',
      mr: 'नमस्कार Grand Pavilion Banquets! Potbhar कडून धन्यवाद: तुमचे 35 kg Dum Biryani सुरक्षितपणे तपासले गेले व Asha Shelter ला वितरित झाले. 88 भुकेल्या मुलांना ताजे अन्न मिळाले! तुम्हाला +350 Potbhar Impact Credits मिळाले आहेत.',
      hi: 'नमस्ते Grand Pavilion Banquets! पोटभर की ओर से धन्यवाद: आपका 35 kg दम बिरयानी सुरक्षित जांच के बाद आशा शेल्टर में पहुंचाया गया। 88 जरूरतमंदों को पौष्टिक भोजन मिला! आपको +350 इम्पैक्ट क्रेडिट मिले हैं।',
      en: 'POTBHAR Alert: Your 35 kg Dum Biryani surplus was safety-certified by Dr. Ananya Verma and delivered to Asha Community Shelter. 88 wholesome meals served! +350 Impact Credits awarded. Thank you for eliminating hunger with dignity.',
    },
  ]);

  // Interactive Impact Calculator State
  const [calculatorKg, setCalculatorKg] = useState(60);

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // Batches Data
  const [batches, setBatches] = useState(INITIAL_BATCHES);

  // Donor Create Batch Form State (Custom Input)
  const [donorFoodTitle, setDonorFoodTitle] = useState('');
  const [donorCategory, setDonorCategory] = useState('Cooked Banquet Buffet');
  const [donorQuantityKg, setDonorQuantityKg] = useState(25);
  const [donorCookedTime, setDonorCookedTime] = useState('1:00 PM Today');
  const [donorShelfLife, setDonorShelfLife] = useState(4.5);
  const [donorContainer, setDonorContainer] = useState('Insulated Stainless Cambro (Sealed)');
  const [donorTemp, setDonorTemp] = useState(64.5);
  const [donorNotes, setDonorNotes] = useState('Sealed in food-grade insulated boxes immediately after banquet');
  const [donorLocationStr, setDonorLocationStr] = useState('Grand Pavilion Banquets, SB Road, Pune');
  const [donorFoodImageUrl, setDonorFoodImageUrl] = useState('');
  const fileInputRef = useRef(null);

  // Rider Tipping modal / selection
  const [tippingBatchId, setTippingBatchId] = useState(null);
  const [tipAmount, setTipAmount] = useState(50);

  // Live Map Selected Batch
  const [selectedMapBatchId, setSelectedMapBatchId] = useState('PB-BATCH-801');
  const [mapAnimatedStep, setMapAnimatedStep] = useState(2); // 1 = Donor, 2 = Safety Lab, 3 = Shelter

  // Countdown timer for OTP
  useEffect(() => {
    let interval = null;
    if (otpSent && otpTimer > 0) {
      interval = setInterval(() => setOtpTimer(prev => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [otpSent, otpTimer]);

  // Optional TTS Audio Helper
  const triggerAudioNarration = (text) => {
    if (!accessibilityAudioEnabled) return;
    try {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.0;
        window.speechSynthesis.speak(utterance);
      }
    } catch (e) {}
  };

  // Switch to Persona Portal
  const switchRole = (roleKey) => {
    const roleUsers = {
      DONOR: {
        id: 'usr_donor_01',
        role: 'DONOR',
        name: 'Ravi Sharma',
        orgName: 'Grand Pavilion Banquets',
        email: 'ravi.sharma@grandpavilion.in',
        phone: '+91 98230 11223',
        license: 'FSSAI Lic #11521034000892',
        credits: 1420,
        city: 'Pune',
      },
      ASSESSOR: {
        id: 'usr_assessor_01',
        role: 'ASSESSOR',
        name: 'Dr. Ananya Verma',
        orgName: 'POTBHAR Central Food Safety Inspection Desk',
        email: 'dr.ananya@potbhar.gov.in',
        phone: '+91 98230 44556',
        license: 'FSSAI Lead Auditor #A882',
        credits: 0,
        city: 'Pune',
      },
      RECIPIENT: {
        id: 'usr_recipient_01',
        role: 'RECIPIENT',
        name: 'Priya Nair',
        orgName: 'Asha Community Shelter & Care Home',
        email: 'priya.nair@ashashelter.org',
        phone: '+91 98230 77889',
        license: 'NGO Darpan #MH/2018/00918',
        credits: 0,
        city: 'Pune',
      },
      LOGISTICS: {
        id: 'usr_rider_01',
        role: 'LOGISTICS',
        name: 'Vikram Singh',
        orgName: 'POTBHAR Rapid Transit Fleet (Rider #04)',
        email: 'vikram.fleet@potbhar.in',
        phone: '+91 98230 99001',
        license: 'DL MH-12-2019-004481',
        credits: 0,
        city: 'Pune',
      },
      GAUSHALA: {
        id: 'usr_gaushala_01',
        role: 'GAUSHALA',
        name: 'Maharaj Ji',
        orgName: 'Vrindavan Gaushala & Soil Carbon Trust',
        email: 'vrindavan.trust@gaushala.org',
        phone: '+91 98230 33445',
        license: 'AWBI Reg #MH-PUN-084',
        credits: 0,
        city: 'Pune',
      },
    };

    const targetUser = roleUsers[roleKey] || roleUsers.DONOR;
    setCurrentUser(targetUser);
    setCurrentView('portal');
    triggerAudioNarration(`Switched to ${targetUser.orgName} workspace.`);
  };

  // Handle Auth Form Submission (OTP / Password)
  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (authMethod === 'OTP' && !otpSent) {
      setOtpSent(true);
      setOtpTimer(30);
      setAuthOtpCode('728491');
      return;
    }
    switchRole(authSelectedRole);
    setAuthModalOpen(false);
    setOtpSent(false);
    setAuthOtpCode('');
  };

  // Handle Registration
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      id: `usr_${authSelectedRole.toLowerCase()}_${Date.now().toString().slice(-4)}`,
      role: authSelectedRole,
      name: regFullName || 'Authorized Representative',
      orgName: regOrgName || 'Registered Enterprise',
      email: authEmail,
      phone: authPhone,
      license: regLicense || 'FSSAI Pending Verification',
      credits: 100,
      city: regCity,
    };
    setCurrentUser(newUser);
    setCurrentView('portal');
    setAuthModalOpen(false);
    triggerAudioNarration(`Welcome ${newUser.orgName}. Workspace activated.`);
  };

  // Geolocation detection simulation
  const handleDetectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => {
          setDonorLocationStr('Grand Pavilion Banquets, Senapati Bapat Road, Pune (18.5308° N, 73.8288° E)');
        },
        () => {
          setDonorLocationStr('Grand Pavilion Banquets, Senapati Bapat Road, Pune');
        }
      );
    } else {
      setDonorLocationStr('Grand Pavilion Banquets, Senapati Bapat Road, Pune');
    }
  };

  // Image Upload handler
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setDonorFoodImageUrl(previewUrl);
    }
  };

  // 1. DONOR: Submit Surplus Food Batch
  const handleCreateBatch = (e) => {
    e.preventDefault();
    if (!donorFoodTitle.trim()) return;

    const newBatchId = `PB-BATCH-${Math.floor(810 + Math.random() * 80)}`;
    const calcServings = Math.floor(donorQuantityKg * 2.5);
    const earnedCredits = Math.floor(donorQuantityKg * 10);

    const newBatch = {
      id: newBatchId,
      food_title: donorFoodTitle,
      category: donorCategory,
      description: donorNotes,
      quantity_kg: parseFloat(donorQuantityKg),
      servings: calcServings,
      cooked_time: donorCookedTime,
      shelf_life_hours: parseFloat(donorShelfLife),
      container_type: donorContainer,
      temp_celsius: parseFloat(donorTemp),
      donor_name: currentUser.orgName,
      donor_phone: currentUser.phone,
      donor_location: donorLocationStr,
      donor_coords: { lat: 18.5308, lng: 73.8288 },
      nutritionist_name: 'Dr. Ananya Verma (FSSAI Auditor #A882)',
      nutritionist_lab: 'POTBHAR Central Inspection Hub, Shivaji Nagar',
      nutritionist_coords: { lat: 18.5314, lng: 73.8446 },
      recipient_name: 'Asha Community Shelter & Care Home',
      recipient_phone: '+91 98230 77889',
      recipient_location: 'Lajpat Nagar Shelter Center, Pune',
      recipient_coords: { lat: 18.5089, lng: 73.8567 },
      rider_name: 'Vikram Singh (Fleet Unit #04)',
      rider_phone: '+91 98230 99001',
      status: 'REPORTED',
      safety_cert_id: null,
      ph_level: 6.4,
      optical_score: 95,
      credits_awarded: earnedCredits,
      food_image: donorFoodImageUrl || 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&auto=format&fit=crop&q=60',
      rider_tip: 0,
    };

    setBatches([newBatch, ...batches]);
    setSelectedMapBatchId(newBatchId);

    setCurrentUser(prev => ({
      ...prev,
      credits: prev.credits + earnedCredits,
    }));

    setDonorFoodTitle('');
    setDonorNotes('');
    setDonorFoodImageUrl('');

    triggerAudioNarration(`Surplus batch ${newBatchId} registered.`);
  };

  // 2. LOGISTICS RIDER: Advance Workflow Stepper & Trigger SMS
  const advanceBatchStatus = (batchId, targetStatus) => {
    setBatches(prev =>
      prev.map(b => {
        if (b.id === batchId) {
          const updated = { ...b, status: targetStatus };

          if (targetStatus === 'DELIVERED') {
            const smsTextEn = `POTBHAR Official Alert: Your surplus batch of ${b.quantity_kg} kg ${b.food_title} was safely inspected, certified by Dr. Ananya Verma, and delivered to ${b.recipient_name}. ${b.servings} wholesome meals served! You earned +${b.credits_awarded} Potbhar Impact Credits. Thank you for eliminating hunger with dignity.`;
            const smsTextMr = `नमस्कार ${b.donor_name}! Potbhar कडून धन्यवाद: तुमचे ${b.quantity_kg} kg ${b.food_title} सुरक्षितपणे तपासले गेले व ${b.recipient_name} ला वितरित झाले. ${b.servings} भुकेल्या मुलांना ताजे अन्न मिळाले! तुम्हाला +${b.credits_awarded} Potbhar Impact Credits मिळाले आहेत.`;
            const smsTextHi = `नमस्ते ${b.donor_name}! पोटभर की ओर से धन्यवाद: आपका ${b.quantity_kg} kg ${b.food_title} सुरक्षित जांच के बाद ${b.recipient_name} में पहुंचाया गया। ${b.servings} जरूरतमंदों को पौष्टिक भोजन मिला! आपको +${b.credits_awarded} इम्पैक्ट क्रेडिट मिले हैं।`;

            const smsMsg = {
              id: `SMS-${Math.floor(100 + Math.random() * 900)}`,
              to: `${b.donor_name} (${b.donor_phone})`,
              time: 'Just now',
              status: 'DELIVERED • Airtel Gateway',
              text: smsTextEn,
              mr: smsTextMr,
              hi: smsTextHi,
              en: smsTextEn,
            };

            setSmsNotification(smsMsg);
            setSmsLogs(old => [smsMsg, ...old]);
            triggerAudioNarration(`Delivery complete. SMS sent to ${b.donor_name}.`);
          }

          return updated;
        }
        return b;
      })
    );
  };

  // 3. NUTRITIONIST: Certification & Decision
  const handleNutritionistDecision = (batchId, decision) => {
    const certId = `CERT-FSSAI-${Math.floor(8800 + Math.random() * 200)}-V`;
    setBatches(prev =>
      prev.map(b => {
        if (b.id === batchId) {
          if (decision === 'APPROVED') {
            return {
              ...b,
              status: 'CERTIFIED_SAFE',
              safety_cert_id: certId,
            };
          } else {
            return {
              ...b,
              status: 'DIVERTED_TO_GAUSHALA',
              safety_cert_id: `CERT-GAUSHALA-${Math.floor(900 + Math.random() * 90)}`,
              recipient_name: 'Vrindavan Gaushala & Soil Carbon Trust',
              recipient_location: 'Aundh Gaushala Center, Pune',
              recipient_phone: '+91 98230 33445',
            };
          }
        }
        return b;
      })
    );

    triggerAudioNarration(
      decision === 'APPROVED'
        ? 'Batch certified safe for human consumption.'
        : 'Batch redirected to Gaushala for animal feed.'
    );
  };

  // 4. TIPPING RIDER
  const submitRiderTip = (batchId) => {
    setBatches(prev =>
      prev.map(b => (b.id === batchId ? { ...b, rider_tip: tipAmount } : b))
    );
    setTippingBatchId(null);
  };

  // Trigger Instant Test SMS
  const triggerTestSms = () => {
    const testMsg = {
      id: `SMS-${Math.floor(100 + Math.random() * 900)}`,
      to: `${currentUser.orgName} (${currentUser.phone})`,
      time: 'Just now',
      status: 'DELIVERED • Simulated Gateway',
      mr: `नमस्कार ${currentUser.orgName}! Potbhar Alert: 35 kg Dum Biryani सुरक्षितपणे वितरित झाले. 88 मुले तृप्त! +350 Credits मिळाले आहेत.`,
      hi: `नमस्ते ${currentUser.orgName}! पोटभर Alert: 35 kg दम बिरयानी सुरक्षित रूप से शेल्टर में पहुंचाया गया। 88 भोजन वितरित!`,
      en: `POTBHAR Official Alert: Your surplus was certified by Dr. Ananya Verma and delivered to Asha Shelter. 88 meals served! +350 Credits.`,
      text: `POTBHAR Official Alert: Your surplus was certified by Dr. Ananya Verma and delivered to Asha Shelter. 88 meals served! +350 Credits.`,
    };
    setSmsNotification(testMsg);
    setSmsLogs(old => [testMsg, ...old]);
  };

  // Real Data Calculations for Stats Strip
  const totalDeliveredKg = useMemo(() => {
    return batches
      .filter(b => b.status === 'DELIVERED')
      .reduce((acc, curr) => acc + curr.quantity_kg, 1420);
  }, [batches]);

  const totalMealsFed = useMemo(() => Math.floor(totalDeliveredKg * 2.5), [totalDeliveredKg]);

  const totalDivertedKg = useMemo(() => {
    return batches
      .filter(b => b.status === 'DIVERTED_TO_GAUSHALA')
      .reduce((acc, curr) => acc + curr.quantity_kg, 310);
  }, [batches]);

  const totalDivertedTons = useMemo(() => {
    return (totalDivertedKg / 1000).toFixed(1);
  }, [totalDivertedKg]);

  const activeMapBatch = useMemo(() => {
    return batches.find(b => b.id === selectedMapBatchId) || batches[0];
  }, [batches, selectedMapBatchId]);

  return (
    <div className="min-h-screen bg-[#FBF3E4] text-[#3A352A] font-sans flex flex-col selection:bg-[#E8F5EE] selection:text-[#1F4D2E] relative antialiased">
      
      {/* ============================================================== */}
      {/* SIMULATED SMS ALERT POPUP (Triggers on Delivery)                */}
      {/* ============================================================== */}
      {smsNotification && (
        <div className="fixed top-24 right-6 z-50 max-w-md w-full animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="bg-[#1E1A0E] text-white p-5 rounded-3xl shadow-2xl border border-white/20 relative overflow-hidden">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#0E9F4F] flex items-center justify-center text-white">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#D9993A] uppercase tracking-wider">SMS • POTBHAR Official Gateway</div>
                  <div className="text-[11px] text-stone-300">{smsNotification.to}</div>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setSmsDrawerOpen(true)}
                  className="text-xs text-[#0E9F4F] font-bold hover:underline px-2 py-0.5 bg-white/10 rounded-full"
                >
                  Open Phone View
                </button>
                <button
                  onClick={() => setSmsNotification(null)}
                  className="text-stone-300 hover:text-white p-1 rounded-lg"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            <p className="text-xs text-stone-200 leading-relaxed font-mono">
              "{smsNotification.text}"
            </p>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* LIVE DISPATCH TICKER STRIP (Top of Page)                       */}
      {/* ============================================================== */}
      <div className="bg-[#1E1A0E] text-stone-300 text-xs py-2 px-4 border-b border-white/10 overflow-hidden">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 shrink-0">
            <span className="w-2 h-2 rounded-full bg-[#0E9F4F] animate-ping"></span>
            <span className="font-bold text-white uppercase text-[10px] tracking-wider">Live Fleet Radar:</span>
          </div>
          <div className="overflow-x-auto whitespace-nowrap flex items-center gap-8 py-0.5 scrollbar-none text-[11px]">
            {LIVE_TICKER_EVENTS.map((item, idx) => (
              <span key={idx} className="inline-flex items-center gap-2">
                <span className={`w-1.5 h-1.5 rounded-full ${item.dot}`}></span>
                <strong className="text-white">{item.van}</strong>
                <span>{item.desc}</span>
                <span className="px-1.5 py-0.5 rounded bg-white/10 text-emerald-400 font-mono font-bold text-[10px]">{item.status}</span>
                <span className="text-stone-400">({item.time})</span>
              </span>
            ))}
          </div>
          <button
            onClick={() => setSmsDrawerOpen(true)}
            className="shrink-0 hidden md:flex items-center gap-1.5 text-[11px] font-bold text-[#D9993A] hover:underline"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>SMS Logs</span>
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* NAVBAR (Cream Background, ~72px Tall, Mockup Styled)            */}
      {/* ============================================================== */}
      <header className="bg-[#FBF3E4] h-[72px] sticky top-0 z-40 px-4 sm:px-8 flex items-center justify-between border-b border-[#EDE6D8]/60">
        <div className="max-w-[1200px] w-full mx-auto flex items-center justify-between">
          
          {/* Left: POTBHAR Logo with Bowl/Pot as O */}
          <button
            onClick={() => setCurrentView('landing')}
            className="flex items-center gap-2.5 focus:outline-none group text-left"
          >
            <div className="flex items-center">
              <img
                src="/assets/img/potbhar-main-logo.png"
                alt="POTBHAR"
                className="h-10 w-auto object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <span className="font-extrabold text-2xl tracking-tight text-[#1F4D2E] font-heading flex items-center ml-1">
                P
                <span className="inline-flex items-center justify-center mx-0.5">
                  <svg className="w-6 h-6 inline-block" viewBox="0 0 24 24" fill="none">
                    <path d="M4 11C4 16.5 8 19 12 19C16 19 20 16.5 20 11H4Z" fill="#D9993A" stroke="#1F4D2E" strokeWidth="1.5"/>
                    <path d="M12 4V8M12 4C10.5 4 9 5.5 9 7M12 4C13.5 4 15 5.5 15 7" stroke="#1B6B35" strokeWidth="1.8" strokeLinecap="round"/>
                  </svg>
                </span>
                TBHAR
              </span>
            </div>
          </button>

          {/* Center: Nav links */}
          <nav className="hidden md:flex items-center gap-7 text-[#1E1A0E] text-sm font-medium">
            <button
              onClick={() => setCurrentView('landing')}
              className={`hover:text-[#0E9F4F] transition-colors py-1 ${
                currentView === 'landing' ? 'text-[#0E9F4F] font-bold border-b-2 border-[#0E9F4F]' : ''
              }`}
            >
              Home
            </button>
            <button
              onClick={() => {
                const el = document.getElementById('live-map-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-[#0E9F4F] transition-colors py-1"
            >
              Live Radar
            </button>
            <button
              onClick={() => {
                const el = document.getElementById('calculator-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-[#0E9F4F] transition-colors py-1"
            >
              Calculator
            </button>
            <button
              onClick={() => {
                const el = document.getElementById('safety-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-[#0E9F4F] transition-colors py-1"
            >
              Lab Testing
            </button>
            <button
              onClick={() => {
                const el = document.getElementById('persona-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-[#0E9F4F] transition-colors py-1"
            >
              Workspaces
            </button>
            <button
              onClick={() => {
                const el = document.getElementById('faq-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-[#0E9F4F] transition-colors py-1"
            >
              FAQ
            </button>
          </nav>

          {/* Right: SMS Gateway, Sign In / Register & "Report Surplus" Pill Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSmsDrawerOpen(true)}
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-2 rounded-full border border-[#EDE6D8] bg-white hover:border-[#1F4D2E] text-xs font-bold text-[#1E1A0E] transition-all shadow-xs"
              title="Open Simulated SMS Delivery System"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#0E9F4F]" />
              <span>SMS Gateway</span>
            </button>

            <button
              onClick={() => {
                setAuthMode('SIGN_IN');
                setAuthModalOpen(true);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#EDE6D8] bg-white hover:border-[#1F4D2E] text-xs font-bold text-[#1E1A0E] transition-all shadow-xs"
            >
              <Lock className="w-3.5 h-3.5 text-[#0E9F4F]" />
              <span>Sign In / OTP</span>
            </button>

            <button
              onClick={() => switchRole('DONOR')}
              className="btn-pill px-5 py-2.5 bg-[#1F4D2E] hover:bg-[#163821] text-white text-xs sm:text-sm font-bold shadow-xs flex items-center gap-2"
            >
              <span>Report Surplus</span>
            </button>

            {/* Optional Accessibility Narration Toggle */}
            <button
              onClick={() => {
                const n = !accessibilityAudioEnabled;
                setAccessibilityAudioEnabled(n);
                if (n) triggerAudioNarration('Accessibility Audio Narration enabled.');
              }}
              className="p-2 rounded-full border border-[#EDE6D8] bg-white text-[#3A352A] hover:text-[#1F4D2E] transition-colors"
              title="Toggle Audio Guide"
            >
              {accessibilityAudioEnabled ? <Volume2 className="w-4 h-4 text-[#0E9F4F]" /> : <VolumeX className="w-4 h-4 text-stone-400" />}
            </button>
          </div>
        </div>
      </header>

      {/* ============================================================== */}
      {/* VIEWPORT CONTROLLER                                            */}
      {/* ============================================================== */}
      <main className="flex-1">

        {/* ------------------------------------------------------------ */}
        {/* VIEW 1: MOCKUP-MATCHED LANDING PAGE WITH ALL FULL SECTIONS    */}
        {/* ------------------------------------------------------------ */}
        {currentView === 'landing' && (
          <div className="w-full">
            
            {/* HERO SECTION (Two Columns on Desktop) */}
            <section className="bg-[#FBF3E4] pt-8 pb-20 px-4 sm:px-8">
              <div className="max-w-[1200px] mx-auto grid lg:grid-cols-12 gap-8 items-center">
                
                {/* Left Column */}
                <div className="lg:col-span-6 space-y-5 text-left">
                  {/* Small Green Tagline */}
                  <div className="text-sm font-bold text-[#1B6B35] tracking-wide">
                    Har Pet Bhare, Har Nivala Sambhale
                  </div>

                  {/* Large 2-Line H1 Headline */}
                  <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold text-[#1E1A0E] leading-[1.12] tracking-tight">
                    Recovering Surplus,<br />
                    Nourishing Communities.
                  </h1>

                  {/* Supporting Paragraph */}
                  <p className="text-base sm:text-lg text-[#3A352A] leading-relaxed max-w-[520px]">
                    Potbhar connects commercial banquets directly to shelters within 90 minutes. Every batch undergoes mandatory nutritionist testing and laboratory certification before doorstep handover. Surplus that fails human parameters is 100% diverted to gaushala animal feed.
                  </p>

                  {/* Two Pill Buttons Side by Side */}
                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <button
                      onClick={() => switchRole('DONOR')}
                      className="btn-pill px-7 py-3.5 bg-[#0E9F4F] hover:bg-[#0C8944] text-white text-base font-bold shadow-md"
                    >
                      Donate Surplus Food
                    </button>

                    <button
                      onClick={() => switchRole('RECIPIENT')}
                      className="btn-pill px-7 py-3.5 bg-[#D9993A] hover:bg-[#C4872E] text-[#1E1A0E] text-base font-bold shadow-sm"
                    >
                      Find Food
                    </button>
                  </div>
                </div>

                {/* Right Column: Illustration on Cream Background */}
                <div className="lg:col-span-6 flex items-center justify-center">
                  <div className="w-full max-w-[540px] aspect-[4/3] flex items-center justify-center">
                    <img
                      src="/assets/img/hero-illustration.svg"
                      alt="Community sharing surplus harvest food"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* STATS STRIP (Overlaps the Hero's Bottom Edge) */}
            <section id="stats-strip" className="relative -mt-12 z-20 px-4 sm:px-8">
              <div className="max-w-[1200px] mx-auto">
                <div className="bg-white rounded-[20px] stats-card-halo p-6 sm:p-7 border border-[#EDE6D8]/80">
                  <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#EDE6D8]">
                    
                    {/* Column 1: Surplus Recovered */}
                    <div className="flex items-center gap-4 px-4 py-3 md:py-1">
                      <div className="w-14 h-14 rounded-2xl bg-[#F0ECF8] flex items-center justify-center text-[#7C5AC2] shrink-0">
                        <UploadCloud className="w-7 h-7" />
                      </div>
                      <div>
                        <div className="text-2xl sm:text-[28px] font-extrabold text-[#1E1A0E] font-heading leading-tight">
                          {totalDeliveredKg.toLocaleString()} kg
                        </div>
                        <div className="text-xs sm:text-sm font-normal text-[#6B5E55]">
                          Surplus Recovered
                        </div>
                      </div>
                    </div>

                    {/* Column 2: Meals Served */}
                    <div className="flex items-center gap-4 px-4 py-3 md:py-1">
                      <div className="w-14 h-14 rounded-2xl bg-[#FDF0E6] flex items-center justify-center text-[#D97736] shrink-0">
                        <Smile className="w-7 h-7" />
                      </div>
                      <div>
                        <div className="text-2xl sm:text-[28px] font-extrabold text-[#1E1A0E] font-heading leading-tight">
                          {totalMealsFed.toLocaleString()}
                        </div>
                        <div className="text-xs sm:text-sm font-normal text-[#6B5E55]">
                          Meals Served
                        </div>
                      </div>
                    </div>

                    {/* Column 3: Waste Processed */}
                    <div className="flex items-center gap-4 px-4 py-3 md:py-1">
                      <div className="w-14 h-14 rounded-2xl bg-[#E8F5EE] flex items-center justify-center text-[#0E9F4F] shrink-0">
                        <Leaf className="w-7 h-7" />
                      </div>
                      <div>
                        <div className="text-2xl sm:text-[28px] font-extrabold text-[#1E1A0E] font-heading leading-tight">
                          {totalDivertedTons} Tons
                        </div>
                        <div className="text-xs sm:text-sm font-normal text-[#6B5E55]">
                          Waste Processed
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </section>

            {/* FEATURE CARDS + HOW IT WORKS (One Row on Desktop) */}
            <section className="bg-white pt-14 pb-16 px-4 sm:px-8 mt-6">
              <div className="max-w-[1200px] mx-auto">
                <div className="grid lg:grid-cols-12 gap-6 items-stretch">
                  
                  {/* Left Side: Two Image-Style Cards (~320px wide, ~320px tall) */}
                  <div className="lg:col-span-6 grid sm:grid-cols-2 gap-4">
                    
                    {/* Card 1: Image Quality Scanner */}
                    <div className="bg-card-dark-green rounded-[20px] p-5 flex flex-col justify-between text-white shadow-md relative overflow-hidden h-[330px]">
                      {/* Phone Mockup with Food & Green Target Box */}
                      <div className="flex items-center justify-center pt-2">
                        <div className="w-36 h-44 bg-[#12100E] rounded-2xl p-1.5 border-2 border-[#2E6B42] shadow-2xl relative">
                          <div className="w-full h-full rounded-xl overflow-hidden relative">
                            <img
                              src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&auto=format&fit=crop&q=60"
                              alt="Bowl of food scan"
                              className="w-full h-full object-cover"
                            />
                            {/* Green Bounding Box Target */}
                            <div className="absolute inset-3 border-2 border-[#0E9F4F] rounded-lg pointer-events-none flex items-center justify-center">
                              <span className="w-2 h-2 rounded-full bg-[#0E9F4F] animate-ping"></span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="pt-2">
                        <h4 className="font-extrabold text-base text-white">Image Quality Scanner</h4>
                      </div>
                    </div>

                    {/* Card 2: Risk Assessment Engine with Semicircular Gauge */}
                    <div className="bg-card-dark-purple rounded-[20px] p-5 flex flex-col justify-between text-white shadow-md relative overflow-hidden h-[330px]">
                      {/* Semicircular Gauge */}
                      <div className="flex flex-col items-center justify-center pt-1">
                        <svg className="w-48 h-28" viewBox="0 0 200 115">
                          {/* Semicircle Track Sectors: Green, Yellow, Orange, Red */}
                          <path d="M 20 100 A 80 80 0 0 1 65 35" fill="none" stroke="#2FA84F" strokeWidth="18" strokeLinecap="round" />
                          <path d="M 68 32 A 80 80 0 0 1 100 20" fill="none" stroke="#F2C230" strokeWidth="18" />
                          <path d="M 103 20 A 80 80 0 0 1 135 32" fill="none" stroke="#F08A24" strokeWidth="18" />
                          <path d="M 138 35 A 80 80 0 0 1 180 100" fill="none" stroke="#D93A2B" strokeWidth="18" strokeLinecap="round" />
                          
                          {/* Needle pointing to Low-Risk Zone */}
                          <line x1="100" y1="95" x2="62" y2="52" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
                          <circle cx="100" cy="95" r="7" fill="#FFFFFF" />
                        </svg>

                        <div className="text-xs font-bold text-[#2FA84F] mt-1">Low Risk</div>
                      </div>

                      <div>
                        <h4 className="font-extrabold text-base text-white">Risk Assessment Engine</h4>
                        <div className="my-2 border-t border-white/20"></div>
                        <div className="flex items-center gap-1.5 text-xs text-[#2FA84F] font-semibold">
                          <CheckCircle2 className="w-4 h-4 text-[#2FA84F]" />
                          <span>Assessment Complete</span>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Right Side: How It Works (H2 + 4 Cards) */}
                  <div className="lg:col-span-6 flex flex-col justify-between">
                    <div>
                      <h2 className="text-[32px] font-extrabold text-[#1E1A0E] mb-4">How It Works</h2>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {/* Step 1: Report */}
                      <div className="how-it-works-card bg-white rounded-[16px] border border-[#EDE6D8] p-5 flex flex-col items-center text-center shadow-xs">
                        <div className="w-[72px] h-[72px] rounded-full bg-[#FDF0E6] flex items-center justify-center text-[#D97736] mb-4">
                          <UploadCloud className="w-8 h-8" />
                        </div>
                        <div className="text-base font-semibold text-[#1E1A0E] leading-tight">
                          1. Report
                        </div>
                      </div>

                      {/* Step 2: AI Quality Check */}
                      <div className="how-it-works-card bg-white rounded-[16px] border border-[#EDE6D8] p-5 flex flex-col items-center text-center shadow-xs">
                        <div className="w-[72px] h-[72px] rounded-full bg-[#E8F5EE] flex items-center justify-center text-[#0E9F4F] mb-4">
                          <Scan className="w-8 h-8" />
                        </div>
                        <div className="text-base font-semibold text-[#1E1A0E] leading-tight">
                          2. AI Quality Check
                        </div>
                      </div>

                      {/* Step 3: Smart Matching */}
                      <div className="how-it-works-card bg-white rounded-[16px] border border-[#EDE6D8] p-5 flex flex-col items-center text-center shadow-xs">
                        <div className="w-[72px] h-[72px] rounded-full bg-[#FDF0E6] flex items-center justify-center text-[#D97736] mb-4">
                          <Globe2 className="w-8 h-8" />
                        </div>
                        <div className="text-base font-semibold text-[#1E1A0E] leading-tight">
                          3. Smart Matching
                        </div>
                      </div>

                      {/* Step 4: Verified Handoff */}
                      <div className="how-it-works-card bg-white rounded-[16px] border border-[#EDE6D8] p-5 flex flex-col items-center text-center shadow-xs">
                        <div className="w-[72px] h-[72px] rounded-full bg-[#E8F5EE] flex items-center justify-center text-[#0E9F4F] mb-4">
                          <Truck className="w-8 h-8" />
                        </div>
                        <div className="text-base font-semibold text-[#1E1A0E] leading-tight">
                          4. Verified Handoff
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* LIVE 3-WAYPOINT FOOD TRACKING MAP & RADAR */}
            <section id="live-map-section" className="bg-[#FBF3E4] py-16 px-4 sm:px-8 border-t border-[#EDE6D8]">
              <div className="max-w-[1200px] mx-auto">
                <div className="text-center max-w-2xl mx-auto mb-10">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-[#1F4D2E] bg-[#E8F5EE] px-3 py-1 rounded-full border border-[#0E9F4F]/30">
                    Live Telemetry Network
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E1A0E] mt-3">
                    3-Waypoint Route: Donor ➡️ Nutritionist ➡️ Shelter
                  </h2>
                  <p className="text-sm text-[#3A352A] mt-2">
                    Couriers are strictly mandated to route via the central laboratory for testing before food is transported to the shelter.
                  </p>
                </div>

                <div className="bg-white rounded-[20px] border border-[#EDE6D8] p-6 sm:p-8 shadow-sm">
                  {/* Active Batch Selector Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-[#EDE6D8] gap-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={activeMapBatch.food_image}
                        alt={activeMapBatch.food_title}
                        className="w-14 h-14 rounded-2xl object-cover border border-[#EDE6D8] shadow-xs"
                      />
                      <div>
                        <div className="text-xs font-bold text-[#0E9F4F] uppercase tracking-wider">Currently Tracking:</div>
                        <h3 className="text-xl font-black text-[#1E1A0E]">{activeMapBatch.food_title}</h3>
                        <div className="text-xs text-[#3A352A]">
                          {activeMapBatch.quantity_kg} kg • Dispatched from {activeMapBatch.donor_name}
                        </div>
                      </div>
                    </div>

                    {/* Batch selector pills */}
                    <div className="flex items-center gap-2 overflow-x-auto">
                      {batches.map(b => (
                        <button
                          key={b.id}
                          onClick={() => setSelectedMapBatchId(b.id)}
                          className={`btn-pill px-3.5 py-1.5 text-xs font-mono font-bold transition-all ${
                            selectedMapBatchId === b.id
                              ? 'bg-[#1F4D2E] text-white shadow-xs'
                              : 'bg-[#FBF3E4] text-[#3A352A] border border-[#EDE6D8] hover:border-[#1F4D2E]'
                          }`}
                        >
                          {b.id}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Visual 3-Node Route Canvas */}
                  <div className="bg-[#1E1A0E] text-white rounded-2xl p-6 sm:p-8 relative overflow-hidden">
                    <div className="flex items-center justify-between text-xs text-stone-400 mb-8 pb-3 border-b border-white/10">
                      <span className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#0E9F4F] animate-ping"></span>
                        <span className="font-bold text-white">Live Courier GPS Radar • Unit #04</span>
                      </span>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-[#D9993A] font-bold">Speed: 34 km/h • ETA: ~14 mins</span>
                        <button
                          onClick={triggerTestSms}
                          className="px-2.5 py-1 rounded-full bg-[#0E9F4F] hover:bg-[#0C8944] text-white text-[11px] font-bold transition-all"
                        >
                          Simulate SMS Alert
                        </button>
                      </div>
                    </div>

                    {/* 3 Waypoints Grid with Route Line */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
                      {/* Waypoint 1 */}
                      <div
                        onClick={() => setMapAnimatedStep(1)}
                        className={`p-4 rounded-xl border transition-all cursor-pointer ${
                          mapAnimatedStep === 1
                            ? 'bg-white/15 border-[#D9993A] shadow-md ring-2 ring-[#D9993A]/50'
                            : 'bg-white/5 border-white/10 hover:border-white/30'
                        }`}
                      >
                        <div className="w-10 h-10 rounded-full bg-[#D9993A] text-[#1E1A0E] flex items-center justify-center font-bold text-sm mb-2 shadow-sm">
                          1
                        </div>
                        <div className="text-xs font-bold text-white">1. Donor Banquet</div>
                        <div className="text-[11px] text-stone-300 mt-0.5">{activeMapBatch.donor_name}</div>
                        <div className="text-[10px] text-stone-400 mt-1">{activeMapBatch.donor_location}</div>
                        <div className="text-[10px] text-[#0E9F4F] font-bold mt-2">✓ Picked Up & Sealed</div>
                      </div>

                      {/* Waypoint 2 */}
                      <div
                        onClick={() => setMapAnimatedStep(2)}
                        className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                          mapAnimatedStep === 2
                            ? 'bg-white/15 border-[#0E9F4F] shadow-lg ring-2 ring-[#0E9F4F]/50'
                            : 'bg-white/10 border-white/20 hover:border-white/40'
                        }`}
                      >
                        <div className="w-10 h-10 rounded-full bg-[#0E9F4F] text-white flex items-center justify-center font-bold text-sm mb-2 shadow-md">
                          2
                        </div>
                        <div className="text-xs font-bold text-[#86EFAC]">2. Food Safety Lab</div>
                        <div className="text-[11px] text-stone-200 mt-0.5">{activeMapBatch.nutritionist_name}</div>
                        <div className="text-[10px] text-stone-400 mt-1">{activeMapBatch.nutritionist_lab}</div>
                        <div className="text-[10px] text-[#86EFAC] font-bold mt-2">
                          {activeMapBatch.safety_cert_id ? '✓ Certified Cleared (FSSAI)' : '⏳ Testing in Progress'}
                        </div>
                      </div>

                      {/* Waypoint 3 */}
                      <div
                        onClick={() => setMapAnimatedStep(3)}
                        className={`p-4 rounded-xl border transition-all cursor-pointer ${
                          mapAnimatedStep === 3
                            ? 'bg-white/15 border-white shadow-md ring-2 ring-white/50'
                            : 'bg-white/5 border-white/10 hover:border-white/30'
                        }`}
                      >
                        <div className="w-10 h-10 rounded-full bg-white text-[#1E1A0E] flex items-center justify-center font-bold text-sm mb-2 shadow-sm">
                          3
                        </div>
                        <div className="text-xs font-bold text-white">3. Destination</div>
                        <div className="text-[11px] text-stone-300 mt-0.5">{activeMapBatch.recipient_name}</div>
                        <div className="text-[10px] text-stone-400 mt-1">{activeMapBatch.recipient_location}</div>
                        <div className="text-[10px] text-amber-400 font-bold mt-2">
                          {activeMapBatch.status === 'DELIVERED' ? '✓ Delivered & Satiated' : 'Approaching Doorstep'}
                        </div>
                      </div>
                    </div>

                    {/* Live Telemetry Sensor Bar */}
                    <div className="mt-8 pt-4 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                      <div>
                        <div className="text-[10px] uppercase text-stone-400">Core Holding Temp</div>
                        <div className="font-mono text-base font-extrabold text-[#0E9F4F] mt-0.5">{activeMapBatch.temp_celsius}°C (Safe)</div>
                      </div>
                      <div>
                        <div className="text-[10px] uppercase text-stone-400">Current Phase</div>
                        <div className="font-mono text-xs font-bold text-stone-200 mt-1">{activeMapBatch.status.replace(/_/g, ' ')}</div>
                      </div>
                      <div>
                        <div className="text-[10px] uppercase text-stone-400">Assigned Courier</div>
                        <div className="font-mono text-xs font-bold text-stone-200 mt-1">{activeMapBatch.rider_name}</div>
                      </div>
                      <div>
                        <div className="text-[10px] uppercase text-stone-400">Official Safety Cert</div>
                        <button
                          onClick={() => setActiveCert({ type: 'SAFETY', batch: activeMapBatch })}
                          className="text-xs font-bold text-[#D9993A] hover:underline mt-0.5 inline-block"
                        >
                          {activeMapBatch.safety_cert_id || 'View FSSAI Cert'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* INTERACTIVE IMPACT & CARBON OFFSET CALCULATOR */}
            <section id="calculator-section" className="bg-white py-16 px-4 sm:px-8 border-t border-[#EDE6D8]">
              <div className="max-w-[1200px] mx-auto">
                <div className="text-center max-w-2xl mx-auto mb-10">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-[#1F4D2E] bg-[#E8F5EE] px-3 py-1 rounded-full border border-[#0E9F4F]/30">
                    Circularity Simulator
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E1A0E] mt-3">
                    Calculate Your Surplus Food Impact
                  </h2>
                  <p className="text-sm text-[#3A352A] mt-2">
                    Move the slider to estimate how many wholesome meals your banquet or kitchen can provide, and carbon emissions saved.
                  </p>
                </div>

                <div className="bg-[#FBF3E4] rounded-3xl p-6 sm:p-10 border border-[#EDE6D8] max-w-3xl mx-auto shadow-sm">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-extrabold text-[#1E1A0E] uppercase tracking-wide">
                        Surplus Food Quantity (kg)
                      </label>
                      <span className="font-mono text-2xl font-black text-[#1F4D2E] bg-white px-4 py-1 rounded-2xl border border-[#EDE6D8]">
                        {calculatorKg} kg
                      </span>
                    </div>

                    <input
                      type="range"
                      min="10"
                      max="300"
                      step="5"
                      value={calculatorKg}
                      onChange={(e) => setCalculatorKg(parseInt(e.target.value))}
                      className="w-full accent-[#0E9F4F] cursor-pointer h-2 bg-[#EDE6D8] rounded-lg"
                    />

                    <div className="flex justify-between text-xs text-stone-500 font-mono">
                      <span>10 kg (Buffet Surplus)</span>
                      <span>150 kg (Convention Center)</span>
                      <span>300 kg (Grand Wedding)</span>
                    </div>
                  </div>

                  {/* 4 Outcome Cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-[#EDE6D8]">
                    <div className="bg-white p-4 rounded-2xl border border-[#EDE6D8] text-center shadow-xs">
                      <div className="text-2xl font-black text-[#1F4D2E] font-heading">
                        {Math.floor(calculatorKg * 2.5)}
                      </div>
                      <div className="text-xs font-bold text-[#6B5E55] mt-1">Meals Served</div>
                      <div className="text-[10px] text-stone-400">~250g portions</div>
                    </div>

                    <div className="bg-white p-4 rounded-2xl border border-[#EDE6D8] text-center shadow-xs">
                      <div className="text-2xl font-black text-[#0E9F4F] font-heading">
                        {(calculatorKg * 2.5).toFixed(0)} kg
                      </div>
                      <div className="text-xs font-bold text-[#6B5E55] mt-1">CO₂e Prevented</div>
                      <div className="text-[10px] text-stone-400">Zero landfill decay</div>
                    </div>

                    <div className="bg-white p-4 rounded-2xl border border-[#EDE6D8] text-center shadow-xs">
                      <div className="text-2xl font-black text-[#D97736] font-heading">
                        {(calculatorKg * 180).toLocaleString()} L
                      </div>
                      <div className="text-xs font-bold text-[#6B5E55] mt-1">Water Saved</div>
                      <div className="text-[10px] text-stone-400">Virtual crop water</div>
                    </div>

                    <div className="bg-white p-4 rounded-2xl border border-[#EDE6D8] text-center shadow-xs">
                      <div className="text-2xl font-black text-[#7C5AC2] font-heading">
                        {calculatorKg * 10}
                      </div>
                      <div className="text-xs font-bold text-[#6B5E55] mt-1">Impact Credits</div>
                      <div className="text-[10px] text-stone-400">ESG CSR Tier</div>
                    </div>
                  </div>

                  <div className="mt-8 text-center">
                    <button
                      onClick={() => {
                        setDonorQuantityKg(calculatorKg);
                        switchRole('DONOR');
                      }}
                      className="btn-pill px-8 py-3.5 bg-[#0E9F4F] hover:bg-[#0C8944] text-white text-sm font-bold shadow-md inline-flex items-center gap-2"
                    >
                      <span>Donate {calculatorKg} kg Surplus Now</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* MANDATORY NUTRITIONIST CERTIFICATION & ZERO-LANDFILL CIRCULAR GUARANTEE */}
            <section id="safety-section" className="bg-[#FBF3E4] py-16 px-4 sm:px-8 border-t border-[#EDE6D8]">
              <div className="max-w-[1200px] mx-auto grid lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[#E8F5EE] text-[#1F4D2E] border border-[#0E9F4F]/30">
                    <ShieldCheck className="w-4 h-4 text-[#0E9F4F]" />
                    <span>FSSAI-Aligned Protocol • 100% Zero Landfill</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E1A0E]">
                    Scientific Testing Before Delivery.<br />
                    Animal Feed & Compost as Fallback.
                  </h2>
                  <p className="text-sm text-[#3A352A] leading-relaxed">
                    Unlike ordinary donation networks, Potbhar verifies holding temperature, sensory quality, and container seals through accredited officers like Dr. Ananya Verma. Food that passes goes to orphanages and care homes. Surplus that does not pass human parameters is immediately redirected to partner gaushalas for cattle feed and organic composting. Zero food touches landfills.
                  </p>
                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => setActiveCert({ type: 'SAFETY', batch: batches[0] })}
                      className="btn-pill px-6 py-2.5 bg-[#1F4D2E] hover:bg-[#163821] text-white text-xs font-bold shadow-xs flex items-center gap-2"
                    >
                      <FileText className="w-3.5 h-3.5 text-[#0E9F4F]" />
                      <span>Inspect Doctor Safety Certificate</span>
                    </button>
                    <button
                      onClick={() => setActiveCert({ type: 'GAUSHALA', batch: batches[3] })}
                      className="btn-pill px-6 py-2.5 bg-[#FBF3E4] hover:bg-[#F2E7D3] text-[#1E1A0E] border border-[#EDE6D8] text-xs font-bold flex items-center gap-2"
                    >
                      <Leaf className="w-3.5 h-3.5 text-[#0E9F4F]" />
                      <span>Inspect Gaushala Diversion Cert</span>
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-white rounded-[20px] p-6 border border-[#EDE6D8] text-center space-y-3 shadow-xs">
                  <div className="w-16 h-16 rounded-2xl bg-[#FBF3E4] border border-[#EDE6D8] mx-auto flex items-center justify-center text-3xl shadow-xs">
                    🐄
                  </div>
                  <h3 className="font-extrabold text-lg text-[#1E1A0E]">Vrindavan Gaushala Network</h3>
                  <p className="text-xs text-[#3A352A] leading-relaxed">
                    Partner gaushala facility receiving clean prep trimmings and non-standard food batches for sacred cattle fodder and nutrient-dense soil bio-compost.
                  </p>
                  <div className="font-mono text-xl font-black text-[#1F4D2E] pt-2">
                    {totalDivertedKg} kg Diverted
                  </div>
                </div>
              </div>
            </section>

            {/* DEDICATED PERSONA WORKSPACES SHOWCASE (DIRECT 1-CLICK ACCESS) */}
            <section id="persona-section" className="bg-white py-16 px-4 sm:px-8 border-t border-[#EDE6D8]">
              <div className="max-w-[1200px] mx-auto">
                <div className="text-center max-w-2xl mx-auto mb-10">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-[#1F4D2E] bg-[#FBF3E4] px-3 py-1 rounded-full border border-[#EDE6D8]">
                    Role-Based Operational Architecture
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E1A0E] mt-3">
                    Dedicated Workspace for Every Persona
                  </h2>
                  <p className="text-sm text-[#3A352A] mt-2">
                    Access specialized dashboards with separate role-specific capabilities.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  {ROLES.map(role => {
                    const RoleIcon = role.icon;
                    return (
                      <div
                        key={role.id}
                        className="p-5 rounded-[20px] bg-[#FBF3E4] border border-[#EDE6D8] flex flex-col justify-between hover:border-[#0E9F4F] transition-all group shadow-xs"
                      >
                        <div>
                          <div className="w-12 h-12 rounded-2xl bg-white border border-[#EDE6D8] flex items-center justify-center text-[#1F4D2E] mb-3 group-hover:scale-105 transition-transform">
                            <RoleIcon className="w-6 h-6 text-[#0E9F4F]" />
                          </div>
                          <h4 className="font-extrabold text-sm text-[#1E1A0E]">{role.name}</h4>
                          <div className="text-[10px] font-bold text-[#D9993A] mt-0.5">{role.sub.split(',')[0]}</div>
                          <p className="text-[11px] text-[#3A352A] mt-2 leading-relaxed">{role.desc}</p>
                        </div>

                        <button
                          onClick={() => switchRole(role.id)}
                          className="btn-pill mt-6 w-full py-2.5 bg-[#1F4D2E] hover:bg-[#163821] text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                        >
                          <span>Open Workspace</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* FREQUENTLY ASKED QUESTIONS (FAQ) */}
            <section id="faq-section" className="bg-[#FBF3E4] py-16 px-4 sm:px-8 border-t border-[#EDE6D8]">
              <div className="max-w-[800px] mx-auto">
                <div className="text-center mb-10">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-[#1F4D2E] bg-[#E8F5EE] px-3 py-1 rounded-full border border-[#0E9F4F]/30">
                    Transparent Governance
                  </span>
                  <h2 className="text-3xl font-extrabold text-[#1E1A0E] mt-3">
                    Frequently Asked Questions
                  </h2>
                </div>

                <div className="space-y-3">
                  {FAQ_ITEMS.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-2xl border border-[#EDE6D8] overflow-hidden shadow-xs"
                    >
                      <button
                        onClick={() => setOpenFaqIndex(openFaqIndex === idx ? -1 : idx)}
                        className="w-full p-5 text-left flex items-center justify-between font-extrabold text-sm text-[#1E1A0E] hover:text-[#0E9F4F] transition-colors"
                      >
                        <span>{item.q}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform ${openFaqIndex === idx ? 'rotate-180 text-[#0E9F4F]' : 'text-stone-400'}`} />
                      </button>
                      {openFaqIndex === idx && (
                        <div className="px-5 pb-5 pt-1 text-xs text-[#6B5E55] leading-relaxed border-t border-[#EDE6D8]/50">
                          {item.a}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* FOOTER (Cream Background, ~32px Padding, Mockup Styled) */}
            <footer className="bg-[#FBF3E4] pt-8 pb-10 border-t border-[#EDE6D8] px-4 sm:px-8">
              <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                
                {/* Left: POTBHAR Logo + Links + Socials */}
                <div className="flex flex-wrap items-center gap-6">
                  {/* Footer Logo */}
                  <div className="flex items-center">
                    <img
                      src="/assets/img/potbhar-main-logo.png"
                      alt="POTBHAR"
                      className="h-8 w-auto object-contain mr-1"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                    <span className="font-extrabold text-xl tracking-tight text-[#1F4D2E] font-heading flex items-center">
                      P
                      <span className="inline-flex items-center justify-center mx-0.5">
                        <svg className="w-5 h-5 inline-block" viewBox="0 0 24 24" fill="none">
                          <path d="M4 11C4 16.5 8 19 12 19C16 19 20 16.5 20 11H4Z" fill="#D9993A" stroke="#1F4D2E" strokeWidth="1.5"/>
                          <path d="M12 4V8M12 4C10.5 4 9 5.5 9 7M12 4C13.5 4 15 5.5 15 7" stroke="#1B6B35" strokeWidth="1.8" strokeLinecap="round"/>
                        </svg>
                      </span>
                      TBHAR
                    </span>
                  </div>

                  {/* Inline Links */}
                  <div className="flex items-center gap-5 text-sm text-[#3A352A] font-medium">
                    <a href="#about" onClick={(e) => { e.preventDefault(); setCurrentView('landing'); }} className="hover:text-[#1F4D2E]">About</a>
                    <a href="#calculator-section" onClick={(e) => { e.preventDefault(); const el = document.getElementById('calculator-section'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-[#1F4D2E]">Calculator</a>
                    <a href="#safety-section" onClick={(e) => { e.preventDefault(); const el = document.getElementById('safety-section'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-[#1F4D2E]">Food Safety</a>
                    <a href="#faq-section" onClick={(e) => { e.preventDefault(); const el = document.getElementById('faq-section'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-[#1F4D2E]">FAQ</a>
                  </div>

                  {/* Social Icons */}
                  <div className="flex items-center gap-3 text-stone-500">
                    <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="hover:text-[#1F4D2E]">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/></svg>
                    </a>
                    <a href="https://x.com" target="_blank" rel="noreferrer" aria-label="X (Twitter)" className="hover:text-[#1F4D2E]">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-[#1F4D2E]">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.63 1.63 0 1 0 0-3.26 1.63 1.63 0 0 0 0 3.26M7.86 18.5V10.13H5.07v8.37h2.79z"/></svg>
                    </a>
                    <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube" className="hover:text-[#1F4D2E]">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M21.58 7.19a2.5 2.5 0 0 0-1.77-1.77C18.25 5 12 5 12 5s-6.25 0-7.81.42a2.5 2.5 0 0 0-1.77 1.77A26.54 26.54 0 0 0 2 12a26.54 26.54 0 0 0 .42 4.81 2.5 2.5 0 0 0 1.77 1.77C5.75 19 12 19 12 19s6.25 0 7.81-.42a2.5 2.5 0 0 0 1.77-1.77A26.54 26.54 0 0 0 22 12a26.54 26.54 0 0 0-.42-4.81zM10 15V9l5.2 3-5.2 3z"/></svg>
                    </a>
                  </div>
                </div>

                {/* Right: FSSAI Compliance & Copyright */}
                <div className="text-right flex flex-col md:items-end gap-1 text-xs text-stone-500">
                  <div className="flex items-center gap-2">
                    <img
                      src="/assets/img/fssai-logo.svg"
                      alt="FSSAI"
                      className="h-6 w-auto"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                    <span className="text-[11px] text-[#3A352A]">In compliance with FSSAI guidance</span>
                  </div>
                  <div>© 2026 POTBHAR. All rights reserved.</div>
                </div>

              </div>
            </footer>
          </div>
        )}

        {/* ------------------------------------------------------------ */}
        {/* VIEW 2: DEDICATED PERSONA DASHBOARDS (SEPARATE FROM LANDING) */}
        {/* ------------------------------------------------------------ */}
        {currentView === 'portal' && (
          <div className="max-w-[1200px] mx-auto px-4 sm:px-8 py-8 space-y-8">
            
            {/* Top Workspace Ribbon */}
            <div className="bg-white rounded-3xl border border-[#EDE6D8] p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#FDF0E6] flex items-center justify-center text-[#D9993A] font-black text-xl">
                  {currentUser.role === 'DONOR' && <Building2 className="w-6 h-6" />}
                  {currentUser.role === 'ASSESSOR' && <ShieldCheck className="w-6 h-6" />}
                  {currentUser.role === 'RECIPIENT' && <Heart className="w-6 h-6" />}
                  {currentUser.role === 'LOGISTICS' && <Truck className="w-6 h-6" />}
                  {currentUser.role === 'GAUSHALA' && <Leaf className="w-6 h-6" />}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#1F4D2E] bg-[#E8F5EE] px-2.5 py-0.5 rounded-full border border-[#0E9F4F]/30">
                      Workspace: {ROLES.find(r => r.id === currentUser.role)?.name}
                    </span>
                    <span className="text-xs text-stone-500 font-mono">{currentUser.license}</span>
                  </div>
                  <h2 className="text-2xl font-black text-[#1E1A0E] mt-1">{currentUser.orgName}</h2>
                  <div className="text-xs text-[#6B5E55]">
                    Account Officer: <strong>{currentUser.name}</strong> • Phone: {currentUser.phone}
                  </div>
                </div>
              </div>

              {/* Workspace Switcher & Landing Return */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setCurrentView('landing')}
                  className="btn-pill px-4 py-2 text-xs font-bold bg-[#FBF3E4] text-[#1E1A0E] border border-[#EDE6D8] hover:border-[#1F4D2E]"
                >
                  ← Back to Landing
                </button>
                {ROLES.map(r => (
                  <button
                    key={r.id}
                    onClick={() => switchRole(r.id)}
                    className={`btn-pill px-3.5 py-2 text-xs font-bold transition-all ${
                      currentUser.role === r.id
                        ? 'bg-[#1F4D2E] text-white shadow-xs'
                        : 'bg-white text-[#6B5E55] hover:text-[#1E1A0E] border border-[#EDE6D8]'
                    }`}
                  >
                    {r.name.split('/')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* DASHBOARD: FOOD DONOR */}
            {currentUser.role === 'DONOR' && (
              <div className="space-y-8">
                {/* Donor Impact Credits */}
                <div className="grid sm:grid-cols-4 gap-4">
                  <div className="bg-white p-5 rounded-3xl shadow-xs border border-[#EDE6D8]">
                    <div className="flex items-center justify-between text-xs text-[#6B5E55] mb-1">
                      <span>Impact Credits</span>
                      <Coins className="w-4 h-4 text-[#D9993A]" />
                    </div>
                    <div className="font-mono text-3xl font-black text-[#1F4D2E]">{currentUser.credits}</div>
                    <div className="text-[11px] text-[#0E9F4F] font-bold mt-1">Tier: Gold Sustainer</div>
                  </div>

                  <div className="bg-white p-5 rounded-3xl shadow-xs border border-[#EDE6D8]">
                    <div className="flex items-center justify-between text-xs text-[#6B5E55] mb-1">
                      <span>Total Rescued</span>
                      <TrendingUp className="w-4 h-4 text-[#0E9F4F]" />
                    </div>
                    <div className="font-mono text-3xl font-black text-[#1E1A0E]">{totalDeliveredKg} kg</div>
                    <div className="text-[11px] text-[#0E9F4F] font-bold mt-1">100% Zero Landfill</div>
                  </div>

                  <div className="bg-white p-5 rounded-3xl shadow-xs border border-[#EDE6D8]">
                    <div className="flex items-center justify-between text-xs text-[#6B5E55] mb-1">
                      <span>Meals Facilitated</span>
                      <Heart className="w-4 h-4 text-[#D97736]" />
                    </div>
                    <div className="font-mono text-3xl font-black text-[#1E1A0E]">{totalMealsFed} Portions</div>
                    <div className="text-[11px] text-[#6B5E55] mt-1">Across partner shelters</div>
                  </div>

                  <div className="bg-white p-5 rounded-3xl shadow-xs border border-[#EDE6D8] flex flex-col justify-between">
                    <div>
                      <div className="text-xs text-[#6B5E55]">Corporate CSR Offset</div>
                      <div className="text-xs font-bold text-[#1E1A0E] mt-0.5">ESG Compliance Audit</div>
                    </div>
                    <button
                      onClick={() => {
                        setActiveCert({
                          type: 'SHELTER',
                          batch: batches[0],
                        });
                      }}
                      className="text-xs font-bold text-[#0E9F4F] hover:underline flex items-center gap-1 pt-2"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download CSR Receipt</span>
                    </button>
                  </div>
                </div>

                {/* Form & Active Dispatches */}
                <div className="grid lg:grid-cols-12 gap-8">
                  <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-[#EDE6D8] shadow-xs">
                    <h3 className="font-extrabold text-base text-[#1E1A0E] mb-4 pb-2 border-b border-[#EDE6D8]">
                      Post Surplus Food Batch
                    </h3>
                    <form onSubmit={handleCreateBatch} className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-[#1E1A0E] uppercase mb-1">
                          Food Title / Prepared Dish Description *
                        </label>
                        <input
                          type="text"
                          required
                          value={donorFoodTitle}
                          onChange={e => setDonorFoodTitle(e.target.value)}
                          placeholder="e.g. Vegetable Dum Biryani & Dal Tadka"
                          className="w-full bg-[#FBF3E4] border border-[#EDE6D8] rounded-xl px-3.5 py-2.5 text-sm font-semibold"
                        />
                      </div>

                      {/* Quick Preset Buttons for Rapid Image & Detail Fill */}
                      <div>
                        <label className="block text-[11px] font-bold text-stone-500 uppercase mb-1">
                          Quick Presets (With Food Photos):
                        </label>
                        <div className="flex items-center gap-2 overflow-x-auto pb-1">
                          {FOOD_PHOTO_PRESETS.map((p, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => {
                                setDonorFoodTitle(p.title);
                                setDonorCategory(p.category);
                                setDonorTemp(p.temp);
                                setDonorFoodImageUrl(p.url);
                              }}
                              className="shrink-0 p-1.5 rounded-xl border border-[#EDE6D8] bg-[#FBF3E4] hover:border-[#0E9F4F] transition-all flex items-center gap-1.5 text-left"
                            >
                              <img src={p.url} alt="" className="w-6 h-6 rounded-lg object-cover" />
                              <span className="text-[11px] font-bold text-[#1E1A0E] max-w-[100px] truncate">{p.title.split(' ')[0]}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-[#1E1A0E] uppercase mb-1">Category</label>
                          <select
                            value={donorCategory}
                            onChange={e => setDonorCategory(e.target.value)}
                            className="w-full bg-[#FBF3E4] border border-[#EDE6D8] rounded-xl px-3 py-2 text-xs font-semibold"
                          >
                            <option value="Cooked Banquet Buffet">Cooked Banquet Buffet</option>
                            <option value="Breads & Rotis">Breads & Rotis</option>
                            <option value="Curries & Gravy">Curries & Gravy</option>
                            <option value="Packed Box Meals">Packed Box Meals</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-[#1E1A0E] uppercase mb-1">Net Weight (kg) *</label>
                          <input
                            type="number"
                            min="2"
                            max="500"
                            required
                            value={donorQuantityKg}
                            onChange={e => setDonorQuantityKg(e.target.value)}
                            className="w-full bg-[#FBF3E4] border border-[#EDE6D8] rounded-xl px-3 py-2 text-xs font-mono font-bold"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-[#1E1A0E] uppercase mb-1">Preparation Time</label>
                          <input
                            type="text"
                            value={donorCookedTime}
                            onChange={e => setDonorCookedTime(e.target.value)}
                            className="w-full bg-[#FBF3E4] border border-[#EDE6D8] rounded-xl px-3 py-2 text-xs font-semibold"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-[#1E1A0E] uppercase mb-1">Holding Temp (°C)</label>
                          <input
                            type="number"
                            step="0.5"
                            value={donorTemp}
                            onChange={e => setDonorTemp(e.target.value)}
                            className="w-full bg-[#FBF3E4] border border-[#EDE6D8] rounded-xl px-3 py-2 text-xs font-mono font-bold"
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-xs font-bold text-[#1E1A0E] uppercase">Pickup Address & GPS *</label>
                          <button
                            type="button"
                            onClick={handleDetectLocation}
                            className="text-[11px] font-bold text-[#0E9F4F] hover:underline flex items-center gap-1"
                          >
                            <Navigation className="w-3 h-3" /> Detect Location
                          </button>
                        </div>
                        <input
                          type="text"
                          required
                          value={donorLocationStr}
                          onChange={e => setDonorLocationStr(e.target.value)}
                          className="w-full bg-[#FBF3E4] border border-[#EDE6D8] rounded-xl px-3 py-2 text-xs font-medium"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#1E1A0E] uppercase mb-1">Food Image</label>
                        <input
                          type="file"
                          accept="image/*"
                          ref={fileInputRef}
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="px-4 py-2 rounded-xl bg-[#FBF3E4] border border-[#EDE6D8] text-xs font-bold flex items-center gap-1.5 hover:border-[#0E9F4F]"
                          >
                            <Camera className="w-3.5 h-3.5 text-[#0E9F4F]" />
                            <span>Attach Custom Photo</span>
                          </button>
                        </div>
                        {donorFoodImageUrl && (
                          <div className="mt-3 flex items-center gap-3 p-2 rounded-xl bg-[#E8F5EE] border border-[#0E9F4F]/30">
                            <img src={donorFoodImageUrl} alt="" className="w-12 h-12 rounded-lg object-cover" />
                            <div>
                              <div className="text-xs text-[#0E9F4F] font-bold">✓ Food Photo Attached</div>
                              <div className="text-[10px] text-[#1F4D2E]">Optical FreshGuard Confidence: 96%</div>
                            </div>
                          </div>
                        )}
                      </div>

                      <button
                        type="submit"
                        className="btn-pill w-full py-3.5 bg-[#0E9F4F] hover:bg-[#0C8944] text-white font-bold text-sm shadow-md"
                      >
                        Dispatch for Mandatory Inspection
                      </button>
                    </form>
                  </div>

                  {/* Active Batches */}
                  <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-[#EDE6D8] shadow-xs space-y-4">
                    <h3 className="font-extrabold text-base text-[#1E1A0E] pb-2 border-b border-[#EDE6D8]">
                      Active Surplus Dispatches
                    </h3>
                    {batches.map(b => (
                      <div key={b.id} className="p-4 rounded-2xl border border-[#EDE6D8] bg-[#FBF3E4] space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <img
                              src={b.food_image}
                              alt={b.food_title}
                              className="w-14 h-14 rounded-xl object-cover border border-[#EDE6D8]"
                            />
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-xs font-bold bg-white px-2 py-0.5 rounded border border-[#EDE6D8]">
                                  {b.id}
                                </span>
                                <span className="font-bold text-sm text-[#1E1A0E]">{b.food_title}</span>
                              </div>
                              <div className="text-xs text-[#6B5E55] mt-0.5">{b.quantity_kg} kg • ~{b.servings} portions</div>
                            </div>
                          </div>
                          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-white text-[#1F4D2E] border border-[#EDE6D8]">
                            {b.status.replace(/_/g, ' ')}
                          </span>
                        </div>
                        <div className="text-xs text-[#6B5E55] flex flex-wrap gap-4 pt-1 border-t border-[#EDE6D8]/60">
                          <span>Inspection: <strong>{b.nutritionist_lab.split(',')[0]}</strong></span>
                          <span>•</span>
                          <span>Shelter: <strong>{b.recipient_name.split(' ')[0]}</strong></span>
                          <span>•</span>
                          <span>Core Temp: <strong>{b.temp_celsius}°C</strong></span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* DASHBOARD: NUTRITIONIST / SAFETY INSPECTOR */}
            {currentUser.role === 'ASSESSOR' && (
              <div className="bg-white p-6 rounded-3xl border border-[#EDE6D8] shadow-xs space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-[#EDE6D8]">
                  <h3 className="font-extrabold text-lg text-[#1E1A0E]">Central Food Safety & Nutrition Laboratory</h3>
                  <span className="text-xs font-bold text-[#0E9F4F] bg-[#E8F5EE] px-3 py-1 rounded-full border border-[#0E9F4F]/20">
                    Lead Inspector: Dr. Ananya Verma
                  </span>
                </div>
                <div className="space-y-4">
                  {batches.map(batch => (
                    <div key={batch.id} className="p-4 rounded-2xl border border-[#EDE6D8] bg-[#FBF3E4] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={batch.food_image}
                          alt={batch.food_title}
                          className="w-14 h-14 rounded-xl object-cover border border-[#EDE6D8]"
                        />
                        <div>
                          <div className="font-bold text-sm text-[#1E1A0E]">{batch.id} • {batch.food_title}</div>
                          <div className="text-xs text-[#6B5E55] mt-1">Holding Temp: <strong>{batch.temp_celsius}°C</strong> • pH: <strong>{batch.ph_level}</strong> • Donor: {batch.donor_name}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {['REPORTED', 'AT_INSPECTION'].includes(batch.status) ? (
                          <>
                            <button
                              onClick={() => handleNutritionistDecision(batch.id, 'APPROVED')}
                              className="btn-pill px-4 py-2 bg-[#0E9F4F] hover:bg-[#0C8944] text-white text-xs font-bold shadow-xs"
                            >
                              Certify Safe for Humans
                            </button>
                            <button
                              onClick={() => handleNutritionistDecision(batch.id, 'REJECTED')}
                              className="btn-pill px-4 py-2 bg-[#D9993A] hover:bg-[#C4872E] text-[#1E1A0E] text-xs font-bold"
                            >
                              Divert to Gaushala
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => setActiveCert({ type: 'SAFETY', batch })}
                            className="btn-pill px-4 py-2 bg-white border border-[#EDE6D8] text-xs font-bold hover:border-[#1F4D2E]"
                          >
                            View Safety Cert
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* DASHBOARD: RECIPIENT SHELTER */}
            {currentUser.role === 'RECIPIENT' && (
              <div className="bg-white p-6 rounded-3xl border border-[#EDE6D8] shadow-xs space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-[#EDE6D8]">
                  <h3 className="font-extrabold text-lg text-[#1E1A0E]">Certified Wholesome Surplus Offers</h3>
                  <span className="text-xs font-bold text-[#1F4D2E] bg-[#E8F5EE] px-3 py-1 rounded-full">
                    Asha Community Shelter
                  </span>
                </div>
                <div className="space-y-4">
                  {batches.filter(b => b.status !== 'DIVERTED_TO_GAUSHALA').map(batch => (
                    <div key={batch.id} className="p-4 rounded-2xl border border-[#EDE6D8] bg-[#FBF3E4] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={batch.food_image}
                          alt={batch.food_title}
                          className="w-14 h-14 rounded-xl object-cover border border-[#EDE6D8]"
                        />
                        <div>
                          <div className="font-bold text-sm text-[#1E1A0E]">{batch.food_title} ({batch.quantity_kg} kg)</div>
                          <div className="text-xs text-[#6B5E55] mt-1">Status: {batch.status.replace(/_/g, ' ')} • From: {batch.donor_name}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {['IN_TRANSIT_TO_SHELTER', 'CERTIFIED_SAFE'].includes(batch.status) && (
                          <button
                            onClick={() => advanceBatchStatus(batch.id, 'DELIVERED')}
                            className="btn-pill px-4 py-2 bg-[#0E9F4F] hover:bg-[#0C8944] text-white text-xs font-bold"
                          >
                            Confirm Handover & Satiation
                          </button>
                        )}
                        {batch.status === 'DELIVERED' && (
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-[#0E9F4F]">✓ Satiated</span>
                            <button
                              onClick={() => setTippingBatchId(batch.id)}
                              className="btn-pill px-3 py-1 bg-[#FDF0E6] text-[#D97736] border border-[#D97736]/30 text-xs font-bold"
                            >
                              Tip Courier
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* DASHBOARD: LOGISTICS RIDER */}
            {currentUser.role === 'LOGISTICS' && (
              <div className="bg-white p-6 rounded-3xl border border-[#EDE6D8] shadow-xs space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-[#EDE6D8]">
                  <h3 className="font-extrabold text-lg text-[#1E1A0E]">Transit Fleet Operations</h3>
                  <span className="text-xs font-bold text-[#D9993A] bg-[#FDF0E6] px-3 py-1 rounded-full">
                    Courier: Vikram Singh
                  </span>
                </div>
                <div className="space-y-4">
                  {batches.map(batch => (
                    <div key={batch.id} className="p-4 rounded-2xl border border-[#EDE6D8] bg-[#FBF3E4] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="font-bold text-sm text-[#1E1A0E]">{batch.food_title} ({batch.quantity_kg} kg)</div>
                        <div className="text-xs text-[#6B5E55] mt-1">Leg: Donor ➡️ Safety Lab ➡️ Shelter</div>
                      </div>
                      <div className="flex items-center gap-2">
                        {batch.status === 'REPORTED' && (
                          <button
                            onClick={() => advanceBatchStatus(batch.id, 'AT_INSPECTION')}
                            className="btn-pill px-4 py-2 bg-[#1F4D2E] text-white text-xs font-bold"
                          >
                            Pickup & Go to Lab
                          </button>
                        )}
                        {batch.status === 'CERTIFIED_SAFE' && (
                          <button
                            onClick={() => advanceBatchStatus(batch.id, 'IN_TRANSIT_TO_SHELTER')}
                            className="btn-pill px-4 py-2 bg-[#0E9F4F] text-white text-xs font-bold"
                          >
                            Depart Lab ➡️ Deliver
                          </button>
                        )}
                        {batch.status === 'IN_TRANSIT_TO_SHELTER' && (
                          <button
                            onClick={() => advanceBatchStatus(batch.id, 'DELIVERED')}
                            className="btn-pill px-4 py-2 bg-[#0E9F4F] text-white text-xs font-bold"
                          >
                            Complete Handover
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* DASHBOARD: GAUSHALA */}
            {currentUser.role === 'GAUSHALA' && (
              <div className="bg-white p-6 rounded-3xl border border-[#EDE6D8] shadow-xs space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-[#EDE6D8]">
                  <h3 className="font-extrabold text-lg text-[#1E1A0E]">Gaushala & Bio-Compost Facility</h3>
                  <span className="text-xs font-bold text-[#0E9F4F] bg-[#E8F5EE] px-3 py-1 rounded-full">
                    Vrindavan Trust
                  </span>
                </div>
                <div className="space-y-4">
                  {batches.filter(b => b.status === 'DIVERTED_TO_GAUSHALA').map(batch => (
                    <div key={batch.id} className="p-4 rounded-2xl border border-[#EDE6D8] bg-[#FBF3E4] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="font-bold text-sm text-[#1E1A0E]">{batch.food_title} ({batch.quantity_kg} kg)</div>
                        <div className="text-xs text-[#6B5E55] mt-1">Clean Pre-Consumer Trimmings for Cattle Feed</div>
                      </div>
                      <button
                        onClick={() => setActiveCert({ type: 'GAUSHALA', batch })}
                        className="btn-pill px-4 py-2 bg-[#0E9F4F] text-white text-xs font-bold"
                      >
                        View Diversion Cert
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* ============================================================== */}
      {/* SEPARATE LOGIN & SIGN UP MODAL (OTP & PASSWORD)                */}
      {/* ============================================================== */}
      {authModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-[24px] border border-[#EDE6D8] p-6 sm:p-8 max-w-lg w-full shadow-2xl relative max-h-[92vh] overflow-y-auto">
            <button
              onClick={() => {
                setAuthModalOpen(false);
                setOtpSent(false);
              }}
              className="absolute top-5 right-5 text-stone-400 hover:text-[#1E1A0E]"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Tabs: Sign In vs Create Account */}
            <div className="flex border-b border-[#EDE6D8] mb-5">
              <button
                type="button"
                onClick={() => setAuthMode('SIGN_IN')}
                className={`flex-1 pb-3 text-sm font-extrabold transition-all ${
                  authMode === 'SIGN_IN'
                    ? 'border-b-2 border-[#1F4D2E] text-[#1F4D2E]'
                    : 'text-stone-400 hover:text-[#1E1A0E]'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setAuthMode('REGISTER')}
                className={`flex-1 pb-3 text-sm font-extrabold transition-all ${
                  authMode === 'REGISTER'
                    ? 'border-b-2 border-[#1F4D2E] text-[#1F4D2E]'
                    : 'text-stone-400 hover:text-[#1E1A0E]'
                }`}
              >
                Create Account / Register
              </button>
            </div>

            {/* TAB 1: SIGN IN */}
            {authMode === 'SIGN_IN' && (
              <form onSubmit={handleAuthSubmit} className="space-y-4">
                {/* Method Switcher: OTP vs Password */}
                <div className="flex items-center gap-2 p-1 bg-[#FBF3E4] rounded-xl border border-[#EDE6D8]">
                  <button
                    type="button"
                    onClick={() => setAuthMethod('OTP')}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      authMethod === 'OTP' ? 'bg-white text-[#1F4D2E] shadow-xs' : 'text-[#6B5E55]'
                    }`}
                  >
                    📱 Mobile Phone (SMS OTP)
                  </button>
                  <button
                    type="button"
                    onClick={() => setAuthMethod('PASSWORD')}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      authMethod === 'PASSWORD' ? 'bg-white text-[#1F4D2E] shadow-xs' : 'text-[#6B5E55]'
                    }`}
                  >
                    🔑 Email & Password
                  </button>
                </div>

                {/* 1-Click Persona Quick Access */}
                <div className="p-3 rounded-2xl bg-[#FDF0E6] border border-[#D9993A]/30">
                  <div className="text-[10px] font-black text-[#D97736] uppercase tracking-wider mb-2">
                    ⚡ 1-Click Instant Persona Sign-In:
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {ROLES.map(r => (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => {
                          switchRole(r.id);
                          setAuthModalOpen(false);
                        }}
                        className="text-left p-2 rounded-xl bg-white border border-[#EDE6D8] hover:border-[#1F4D2E] transition-all"
                      >
                        <div className="text-xs font-extrabold text-[#1E1A0E] truncate">{r.name.split('/')[0]}</div>
                        <div className="text-[10px] text-stone-500 truncate">{r.sub.split(',')[0]}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1E1A0E] uppercase mb-1">Select Persona Role</label>
                  <div className="grid grid-cols-2 gap-2">
                    {ROLES.map(r => (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => setAuthSelectedRole(r.id)}
                        className={`p-2 rounded-xl border text-left text-xs font-bold transition-all ${
                          authSelectedRole === r.id
                            ? 'border-[#0E9F4F] bg-[#E8F5EE] text-[#1F4D2E]'
                            : 'border-[#EDE6D8] bg-[#FBF3E4] text-[#3A352A]'
                        }`}
                      >
                        {r.name.split('/')[0]}
                      </button>
                    ))}
                  </div>
                </div>

                {authMethod === 'OTP' ? (
                  <>
                    <div>
                      <label className="block text-xs font-bold text-[#1E1A0E] uppercase mb-1">Mobile Phone (OTP)</label>
                      <input
                        type="tel"
                        required
                        value={authPhone}
                        onChange={e => setAuthPhone(e.target.value)}
                        className="w-full bg-[#FBF3E4] border border-[#EDE6D8] rounded-xl px-3.5 py-2 text-sm font-mono font-bold"
                      />
                    </div>

                    {otpSent && (
                      <div className="p-3 rounded-xl bg-[#E8F5EE] border border-[#0E9F4F]/30 space-y-2">
                        <div className="flex items-center justify-between text-xs font-bold text-[#0E9F4F]">
                          <span>Enter 6-Digit Code</span>
                          <span>Resend in {otpTimer}s</span>
                        </div>
                        <input
                          type="text"
                          maxLength={6}
                          required
                          value={authOtpCode}
                          onChange={e => setAuthOtpCode(e.target.value)}
                          className="w-full bg-white border border-[#0E9F4F] rounded-xl px-3 py-2 text-center text-lg font-mono font-black"
                        />
                        <button
                          type="button"
                          onClick={() => setAuthOtpCode('728491')}
                          className="text-[10px] text-stone-500 hover:underline block mx-auto text-center"
                        >
                          Fill Simulated Code (728491)
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div>
                      <label className="block text-xs font-bold text-[#1E1A0E] uppercase mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        value={authEmail}
                        onChange={e => setAuthEmail(e.target.value)}
                        className="w-full bg-[#FBF3E4] border border-[#EDE6D8] rounded-xl px-3.5 py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#1E1A0E] uppercase mb-1">Password</label>
                      <input
                        type="password"
                        required
                        value={authPassword}
                        onChange={e => setAuthPassword(e.target.value)}
                        className="w-full bg-[#FBF3E4] border border-[#EDE6D8] rounded-xl px-3.5 py-2 text-sm"
                      />
                    </div>
                  </>
                )}

                <button
                  type="submit"
                  className="btn-pill w-full py-3.5 bg-[#0E9F4F] hover:bg-[#0C8944] text-white font-bold text-sm shadow-md mt-4"
                >
                  {authMethod === 'OTP' && !otpSent ? 'Send SMS Verification Code' : 'Verify & Enter Workspace'}
                </button>
              </form>
            )}

            {/* TAB 2: REGISTER */}
            {authMode === 'REGISTER' && (
              <form onSubmit={handleRegisterSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-[#1E1A0E] uppercase mb-1">Role You Are Registering</label>
                  <div className="grid grid-cols-2 gap-2">
                    {ROLES.map(r => (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => setAuthSelectedRole(r.id)}
                        className={`p-2 rounded-xl border text-left text-xs font-bold transition-all ${
                          authSelectedRole === r.id
                            ? 'border-[#0E9F4F] bg-[#E8F5EE] text-[#1F4D2E]'
                            : 'border-[#EDE6D8] bg-[#FBF3E4] text-[#3A352A]'
                        }`}
                      >
                        {r.name.split('/')[0]}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1E1A0E] uppercase mb-1">Organization / Banquet / Shelter Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Royal Palace Banquets"
                    value={regOrgName}
                    onChange={e => setRegOrgName(e.target.value)}
                    className="w-full bg-[#FBF3E4] border border-[#EDE6D8] rounded-xl px-3 py-2 text-xs font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1E1A0E] uppercase mb-1">Contact Person Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rajesh Kulkarni"
                    value={regFullName}
                    onChange={e => setRegFullName(e.target.value)}
                    className="w-full bg-[#FBF3E4] border border-[#EDE6D8] rounded-xl px-3 py-2 text-xs font-semibold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#1E1A0E] uppercase mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={authPhone}
                      onChange={e => setAuthPhone(e.target.value)}
                      className="w-full bg-[#FBF3E4] border border-[#EDE6D8] rounded-xl px-3 py-2 text-xs font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#1E1A0E] uppercase mb-1">City / District *</label>
                    <input
                      type="text"
                      required
                      value={regCity}
                      onChange={e => setRegCity(e.target.value)}
                      className="w-full bg-[#FBF3E4] border border-[#EDE6D8] rounded-xl px-3 py-2 text-xs font-semibold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1E1A0E] uppercase mb-1">FSSAI / NGO Darpan / AWBI License #</label>
                  <input
                    type="text"
                    placeholder="e.g. FSSAI #11521034000892"
                    value={regLicense}
                    onChange={e => setRegLicense(e.target.value)}
                    className="w-full bg-[#FBF3E4] border border-[#EDE6D8] rounded-xl px-3 py-2 text-xs font-mono font-bold"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-pill w-full py-3.5 bg-[#0E9F4F] hover:bg-[#0C8944] text-white font-bold text-sm shadow-md mt-4"
                >
                  Create Organization Account
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* SIMULATED SMS GATEWAY PHONE DRAWER                             */}
      {/* ============================================================== */}
      {smsDrawerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#12100E] text-white rounded-[32px] border-4 border-stone-700 p-6 max-w-sm w-full shadow-2xl relative">
            <button
              onClick={() => setSmsDrawerOpen(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Smartphone Top Notch & Header */}
            <div className="flex flex-col items-center pb-4 border-b border-white/10 mb-4">
              <div className="w-24 h-4 bg-stone-800 rounded-full mb-3"></div>
              <div className="w-10 h-10 rounded-full bg-[#0E9F4F] flex items-center justify-center text-white mb-2 shadow-md">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div className="font-extrabold text-sm text-white">VM-POTBHR</div>
              <div className="text-[10px] text-[#D9993A] font-mono">Official Indian Telecom Gateway</div>
            </div>

            {/* Language Switcher for SMS */}
            <div className="flex items-center justify-center gap-2 mb-4">
              {['MR', 'HI', 'EN'].map(lang => (
                <button
                  key={lang}
                  onClick={() => setSmsLang(lang)}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                    smsLang === lang
                      ? 'bg-[#0E9F4F] text-white'
                      : 'bg-white/10 text-stone-400 hover:text-white'
                  }`}
                >
                  {lang === 'MR' && 'मराठी'}
                  {lang === 'HI' && 'हिंदी'}
                  {lang === 'EN' && 'English'}
                </button>
              ))}
            </div>

            {/* Message Bubble Container */}
            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {smsLogs.map((log) => (
                <div key={log.id} className="p-3.5 rounded-2xl bg-white/10 border border-white/10 space-y-1">
                  <div className="flex items-center justify-between text-[10px] text-stone-400">
                    <span>{log.to}</span>
                    <span>{log.time}</span>
                  </div>
                  <p className="text-xs text-stone-200 leading-relaxed font-mono">
                    {smsLang === 'MR' && (log.mr || log.text)}
                    {smsLang === 'HI' && (log.hi || log.text)}
                    {smsLang === 'EN' && (log.en || log.text)}
                  </p>
                  <div className="text-[9px] text-[#0E9F4F] font-mono pt-1">
                    ✓ {log.status}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-white/10 mt-4 flex items-center gap-2">
              <button
                onClick={triggerTestSms}
                className="btn-pill w-full py-2.5 bg-[#0E9F4F] hover:bg-[#0C8944] text-white text-xs font-bold"
              >
                Send Test Delivery SMS
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* OFFICIAL CERTIFICATE MODALS                                    */}
      {/* ============================================================== */}
      {activeCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-white rounded-[20px] border border-[#EDE6D8] p-8 max-w-2xl w-full shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveCert(null)}
              className="absolute top-5 right-5 text-stone-400 hover:text-[#1E1A0E]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-8 border-4 border-double border-[#1F4D2E] rounded-2xl bg-[#FFFCF7]">
              <div className="text-center pb-6 border-b-2 border-[#1F4D2E] mb-6">
                <div className="font-mono text-xs font-bold text-[#0E9F4F] tracking-widest uppercase">
                  POTBHAR REDISTRIBUTION NETWORK • OFFICIAL CLEARANCE
                </div>
                <h3 className="text-2xl font-black text-[#1E1A0E] tracking-tight mt-1">
                  {activeCert.type === 'SAFETY' && 'FOOD SAFETY & NUTRITION CLEARANCE CERTIFICATE'}
                  {activeCert.type === 'SHELTER' && 'FOOD DONATION RECEPTION & CSR RECEIPT'}
                  {activeCert.type === 'GAUSHALA' && 'ZERO-LANDFILL CIRCULAR DIVERSION CERTIFICATE'}
                </h3>
                <div className="text-xs font-mono text-stone-500 mt-1">
                  Ref: {activeCert.batch.safety_cert_id || 'CERT-FSSAI-8841-A'}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs mb-6">
                <div>
                  <span className="text-stone-500 font-mono text-[10px]">Batch Ref:</span>
                  <div className="font-bold text-[#1E1A0E]">{activeCert.batch.id}</div>
                </div>
                <div>
                  <span className="text-stone-500 font-mono text-[10px]">Meal Description:</span>
                  <div className="font-bold text-[#1E1A0E]">{activeCert.batch.food_title}</div>
                </div>
                <div>
                  <span className="text-stone-500 font-mono text-[10px]">Donor Entity:</span>
                  <div className="font-bold text-[#1E1A0E]">{activeCert.batch.donor_name}</div>
                </div>
                <div>
                  <span className="text-stone-500 font-mono text-[10px]">Verified Recipient:</span>
                  <div className="font-bold text-[#1E1A0E]">{activeCert.batch.recipient_name}</div>
                </div>
                <div>
                  <span className="text-stone-500 font-mono text-[10px]">Net Weight / Servings:</span>
                  <div className="font-bold text-[#1E1A0E]">{activeCert.batch.quantity_kg} kg (~{activeCert.batch.servings} portions)</div>
                </div>
                <div>
                  <span className="text-stone-500 font-mono text-[10px]">Holding Core Temp:</span>
                  <div className="font-bold text-[#0E9F4F]">{activeCert.batch.temp_celsius}°C (Verified Safe)</div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#1F4D2E]/20 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-[#1E1A0E]">Dr. Ananya Verma</div>
                  <div className="text-[10px] text-stone-500">Lead FSSAI Auditor & Certified Nutritionist</div>
                </div>
                <button
                  onClick={() => window.print()}
                  className="btn-pill px-4 py-2 bg-[#1F4D2E] text-white text-xs font-bold flex items-center gap-1.5"
                >
                  <Printer className="w-4 h-4" /> Print Document
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* RIDER TIPPING MODAL                                            */}
      {/* ============================================================== */}
      {tippingBatchId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-[20px] border border-[#EDE6D8] p-6 max-w-sm w-full shadow-2xl relative text-center">
            <button
              onClick={() => setTippingBatchId(null)}
              className="absolute top-4 right-4 text-stone-400 hover:text-[#1E1A0E]"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="w-12 h-12 rounded-2xl bg-[#FDF0E6] text-[#D97736] mx-auto flex items-center justify-center mb-3">
              <Coins className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-[#1E1A0E]">Tip Courier Vikram Singh</h3>
            <p className="text-xs text-[#6B5E55] mt-1 mb-5">
              100% of your appreciation goes directly to the courier ensuring rapid insulated food transit.
            </p>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {[50, 100, 200].map(amt => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setTipAmount(amt)}
                  className={`btn-pill py-2 text-xs font-mono font-bold border transition-all ${
                    tipAmount === amt
                      ? 'bg-[#1F4D2E] text-white border-[#1F4D2E]'
                      : 'bg-[#FBF3E4] text-[#1E1A0E] border-[#EDE6D8]'
                  }`}
                >
                  ₹{amt}
                </button>
              ))}
            </div>
            <button
              onClick={() => submitRiderTip(tippingBatchId)}
              className="btn-pill w-full py-3 bg-[#0E9F4F] hover:bg-[#0C8944] text-white font-bold text-xs shadow-md"
            >
              Confirm Tip of ₹{tipAmount}
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

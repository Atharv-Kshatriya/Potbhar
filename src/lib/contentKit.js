// PotBhar Bilingual Content Kit (English + मराठी)
// Configured per updated operational workflow:
// Fill details & location -> Priority suggestion (Orphanage/Shelter > Gaushala > Compost)
// -> Donor decides & picks Self-Deliver or Rider -> Recipient checks food (Accept -> Notify donor; Deny -> Reroute to Compost & Notify donor)

export const MARATHI_BRAND_LINE = '\u0935\u0926\u0928\u0940 \u0915\u0935\u0933 \u0918\u0947\u0924\u093e \u0928\u093e\u092e \u0918\u094d\u092f\u093e \u0936\u094d\u0930\u0940\u0939\u0930\u0940\u091a\u0947 \u0964';

export const CONTENT_KIT = {
  brand: {
    name: 'PotBhar',
    taglinePrimary: {
      en: "Today's Surplus, Tonight's Meal",
      mr: "आजचं उरलेलं अन्न, आज रात्रीचं जेवण"
    },
    taglineSecondary: {
      en: "वदनी कवळ घेता नाम घ्या श्रीहरीचे ।",
      mr: "वदनी कवळ घेता नाम घ्या श्रीहरीचे ।"
    },
  },

  nav: {
    about: { en: 'About Us', mr: 'आमच्याबद्दल' },
    story: { en: 'Our Story', mr: 'आमची गोष्ट' },
    howItWorks: { en: 'How it works', mr: 'हे कसं चालतं' },
    qualityCheck: { en: 'Food Quality', mr: 'अन्न गुणवत्ता' },
    portals: { en: 'Dedicated Portals', mr: 'स्वतंत्र पोर्टल्स' },
    impact: { en: 'Impact', mr: 'प्रभाव' },
    faq: { en: 'FAQ', mr: 'प्रश्नोत्तरं' },
    signin: { en: 'Sign in', mr: 'साइन इन' },
    donateFood: { en: 'Donate surplus food', mr: 'अन्न दान करा' },
    findFood: { en: 'Find food / NGO Intake', mr: 'अन्न मिळवा / संस्था' },
  },

  hero: {
    eyebrow: {
      en: 'वदनी कवळ घेता नाम घ्या श्रीहरीचे ।',
      mr: 'वदनी कवळ घेता नाम घ्या श्रीहरीचे ।'
    },
    headline: {
      en: "Today's Surplus,\nTonight's Meal.",
      mr: "आजचं उरलेलं अन्न,\nआज रात्रीचं जेवण."
    },
    sub: {
      en: "Turn your surplus food into a warm meal for children and elders. What is not eatable by humans goes safely to Gaushalas or Bio-Compost. Every single morsel has a purpose.",
      mr: "जे अन्न तुम्ही संपवू शकत नाही, ते गरजूंसाठी गरम जेवण बनवा; आणि माणसांच्या खाण्यायोग्य नसलेलं अन्न गोशाळा किंवा खतासाठी पाठवा. अन्नाचा प्रत्येक कण उपयोगात येईल."
    },
    ctaDonate: { en: 'Donate surplus food', mr: 'उरलेलं अन्न दान करा' },
    ctaFind: { en: 'Find food / NGO Intake', mr: 'अन्न मिळवा / संस्था' },
    ctaHow: { en: 'See how it works', mr: 'हे कसं चालतं ते पहा' },
    badgePilot: { en: 'Live Community Pilot: Pune & Mumbai Region', mr: 'थेट समुदाय पायलट: पुणे व मुंबई परिसर' }
  },

  statsStrip: {
    recovered: { value: '3,540 kg', label: { en: 'surplus recovered', mr: 'अन्न वाचवले' } },
    meals: { value: '10,114', label: { en: 'wholesome meals served', mr: 'गरजूंची भूक भागवली' } },
    composted: { value: '1,420 kg', label: { en: 'diverted to organic compost', mr: 'सेंद्रिय खत तयार' } },
  },

  theProblem: {
    title: {
      en: "The food exists. The people exist. What's missing is the next 20 minutes.",
      mr: "अन्न आहे. माणसंही आहेत. कमी आहे ती फक्त पुढची वीस मिनिटं."
    },
    subtitle: {
      en: "Every day, thousands of kilograms of untouched food are discarded because there is no immediate, verified bridge between surplus and hunger.",
      mr: "दररोज हजारो किलो पौष्टिक अन्न फक्त या कारणाने वाया जातं कारण अतिरिक्त अन्न आणि गरजूंमध्ये थेट, सुरक्षित जोडणी नसते."
    },
    cards: [
      {
        figure: '78.2 Million Tonnes',
        figureMr: '७.८२ कोटी टन',
        label: {
          en: 'Food wasted at household & commercial levels in India per year',
          mr: 'भारतात दरवर्षी घरांमध्ये व हॉटेल्समध्ये वाया जाणारं अन्न'
        },
        source: 'UNEP Food Waste Index Report'
      },
      {
        figure: '194.4 Million',
        figureMr: '१९.४४ कोटी',
        label: {
          en: 'People facing undernourishment across India',
          mr: 'भारतातील कुपोषणाचा सामना करणारे नागरिक'
        },
        source: 'FAO State of Food Security (SOFI)'
      },
      {
        figure: '~40%',
        figureMr: '~४०%',
        label: {
          en: 'Share of harvest and prepared food lost before consumption',
          mr: 'उत्पादित अन्नापैकी ताटापर्यंत न पोहोचणारा वाटा'
        },
        source: 'Ministry of Food Processing / FAO'
      }
    ]
  },

  howItWorks: {
    title: { en: 'How PotBhar Works in 4 Steps', mr: 'PotBhar कसं चालतं: ४ पायऱ्या' },
    subtitle: {
      en: 'A transparent, priority-gated system connecting donors directly to orphanages, gaushalas, or compost.',
      mr: 'अतिरिक्त अन्नाला गरजू अनाथाश्रम, गोशाळा किंवा खत प्रकल्पापर्यंत थेट व सुरक्षितपणे पोहोचवणारी व्यवस्था.'
    },
    steps: [
      {
        num: '01',
        title: { en: 'Enter Food & Location', mr: 'अन्न व ठिकाणाची नोंद' },
        desc: {
          en: 'Donor inputs food details, quantity, time cooked, and location. If batch is small (< 5 kg), system suggests convenient self-delivery dropoff.',
          mr: 'दाते अन्नाचा प्रकार, प्रमाण, शिजवण्याची वेळ आणि पत्ता नोंदवतात. प्रमाण लहान असल्यास (< ५ किलो) स्वतः जवळ नेऊन देण्याचा सोपा पर्याय सुचवला जातो.'
        },
        image: '/images/hero-illustration.png'
      },
      {
        num: '02',
        title: { en: 'Priority Recommendation', mr: 'प्राधान्य शिफारस' },
        desc: {
          en: 'System evaluates safety parameters and recommends priority: Orphanage/Shelter first, Gaushala second, or Bio-Compost. Donor reviews and confirms.',
          mr: 'प्रणाली निकष तपासून प्राधान्य सुचवते: आधी अनाथाश्रम/निवारा, नंतर गोशाळा, किंवा सेंद्रिय खत. दाते शिफारस तपासून पुष्टी करतात.'
        },
        image: '/images/quality-check-reference.png'
      },
      {
        num: '03',
        title: { en: 'Self-Deliver or Rider', mr: 'स्वतः किंवा रायडर द्वारे वहन' },
        desc: {
          en: 'Donor chooses to deliver directly or dispatch a volunteer rider with optimized live GPS tracking on the map.',
          mr: 'दाते स्वतः पोहोचवण्याचा किंवा नकाशावर थेट GPS ट्रॅकिंग असलेल्या स्वयंसेवक रायडरचा पर्याय निवडतात.'
        },
        image: '/images/delivery-reference.png'
      },
      {
        num: '04',
        title: { en: 'Recipient Check & Notify', mr: 'स्वीकारकर्त्याची तपासणी व पावती' },
        desc: {
          en: 'Recipient inspects food on arrival. If eatable, it is accepted and donor is notified with gratitude. If not eatable, it is instantly rerouted to compost and donor is respectfully updated.',
          mr: 'अन्न पोहोचल्यावर संस्था प्रत्यक्ष तपासणी करते. खाण्यायोग्य असल्यास स्वीकारून दात्याला पावती दिली जाते; योग्य नसल्यास लगेच खताकडे वळवले जाते व दात्याला तसे कळवले जाते.'
        },
        image: '/images/community-serving.png'
      }
    ]
  },

  quotes: [
    {
      en: "Somewhere, a kitchen is closing with food left over. Somewhere, a kitchen is wondering what to cook.",
      mr: "कुठेतरी एका स्वयंपाकघरात जेवण उरलंय; कुठेतरी दुसऱ्या स्वयंपाकघरात आज काय शिजवायचं हा प्रश्न आहे."
    },
    {
      en: "Hunger is not a shortage of food. It is a shortage of connection.",
      mr: "भूक म्हणजे अन्नाची कमतरता नव्हे; ती जोडणीची कमतरता आहे."
    },
    {
      en: "A full plate wasted is a story unfinished. Let's finish it together.",
      mr: "वाया गेलेलं भरलेलं ताट म्हणजे अर्धवट राहिलेली गोष्ट. चला, ती मिळून पूर्ण करूया."
    },
    {
      en: "Safe food to people. Simple food to animals. Everything else back to the soil. Nothing wasted.",
      mr: "सुरक्षित अन्न माणसांना, साधं अन्न प्राण्यांना, बाकी सगळं मातीला. काहीही वाया नाही."
    }
  ],

  stories: [
    {
      id: 'caterer',
      role: { en: 'The Caterer', mr: 'केटरर' },
      name: 'Rameshwar Shinde (Pune)',
      before: {
        en: 'After a wedding reception, a caterer scrapes 40 kg of untouched food into bins because no one can be reached at 11 pm.',
        mr: 'लग्नाच्या स्वागतसमारंभानंतर रात्री ११ वाजता कोणाशीच संपर्क होत नसल्यामुळे केटरर हात न लावलेलं ४० किलो अन्न कचऱ्यात टाकतो.'
      },
      withPotbhar: {
        en: 'He lists it in 2 minutes. The system prioritizes a nearby shelter 3 km away. A volunteer rider picks it up before midnight, and the shelter confirms food arrival.',
        mr: 'तो २ मिनिटांत माहिती भरतो. प्रणाली ३ किमी वरील निवारा केंद्राला प्राधान्य देते. स्वयंसेवक रायडर मध्यरात्रीपूर्वी ते घेऊन जातो आणि निवारा केंद्र जेवण मिळाल्याची खात्री देतं.'
      },
      metric: { en: '40 kg saved = 114 meals served', mr: '४० किलो अन्न वाचले = ११४ जणांचे जेवण' }
    },
    {
      id: 'orphanage',
      role: { en: 'The Orphanage Cook', mr: 'अनाथाश्रमातील स्वयंपाकी' },
      name: 'Vimalatai (Shivajinagar Children Home)',
      before: {
        en: 'At the end of the month, the pantry is thin. The cook stretches dal and rice and hopes for a kind donor to stop by.',
        mr: 'महिन्याच्या शेवटी कोठार जवळजवळ रिकामं असतं. स्वयंपाकी डाळ-भात पुरवून पुरवून वापरते आणि कोणीतरी मदत करेल अशी आशा करते.'
      },
      withPotbhar: {
        en: 'The orphanage posts urgent needs on their portal. Neighbouring donors see the verified request, and inspected nutritious meals arrive directly twice a week.',
        mr: 'अनाथाश्रम पोर्टलवर गरज नोंदवतं. आसपासचे दाते ती पाहतात, आणि आठवड्यातून दोनदा थेट ताजे जेवण पोहोचते.'
      },
      metric: { en: 'Regular fresh supply for 45 children', mr: '४५ मुलांसाठी नियमित पौष्टिक आहार' }
    },
    {
      id: 'gaushala',
      role: { en: 'The Gaushala Caretaker', mr: 'गोशाळा सेवक' },
      name: 'Dattatreya Joshi (Alandi Gaushala)',
      before: {
        en: 'A household sends yesterday’s mixed leftovers: spicy, heavily salted, with onion. The caretaker has to throw most of it away to keep cows safe.',
        mr: 'एका घरातून कालचं उरलेलं अन्न गोशाळेत येतं: तिखट, खारट आणि कांदा घातलेलं. जनावरांच्या आरोग्यासाठी सेवकाला ते फेकून द्यावं लागतं.'
      },
      withPotbhar: {
        en: 'PotBhar routes only plain rotis, unspiced grains, and clean fruit/vegetable trimmings to the gaushala. Spicy or spoiled food is sent directly to bio-compost.',
        mr: 'PotBhar गोशाळेला फक्त साध्या पोळ्या, न खारवलेले धान्य आणि स्वच्छ भाजीपाला पाठवतं; तिखट किंवा खराब अन्न थेट सेंद्रिय खताकडे जातं.'
      },
      metric: { en: '100% cattle-safe plain feed guarantee', mr: '१००% जनावरांसाठी सुरक्षित अन्नाची हमी' }
    },
    {
      id: 'compost',
      role: { en: 'The Bio-Compost Facility', mr: 'सेंद्रिय खत प्रकल्प' },
      name: 'Pune Green Soil Project',
      before: {
        en: 'Food that turns sour in hot weather ends up in overflowing municipal landfills producing dangerous methane gas.',
        mr: 'उष्ण हवामानामुळे खराब झालेले अन्न कचरा डेपोमध्ये सडत पडते आणि मिथेन वायूचे प्रदूषण निर्माण करते.'
      },
      withPotbhar: {
        en: 'Whenever food is rejected as uneatable by human or animal shelters, it is immediately diverted to compost pits, producing organic fertilizer for local farmers.',
        mr: 'जेव्हा अन्न खाण्यायोग्य नसल्यामुळे नाकारले जाते, तेव्हा ते तत्काळ सेंद्रिय खताच्या खड्ड्यांकडे वळवले जाते, ज्यामुळे स्थानिक शेतकऱ्यांसाठी उत्तम सेंद्रिय खत तयार होते.'
      },
      metric: { en: 'Zero landfill dumping, rich organic compost', mr: 'कचऱ्यात शून्य अन्न, उत्तम सेंद्रिय खत' }
    }
  ],

  portals: {
    title: { en: 'Dedicated Workspaces for Every Partner', mr: 'प्रत्येक घटकासाठी स्वतंत्र पोर्टल्स' },
    subtitle: {
      en: 'Each stakeholder has a dedicated portal with purpose-built workflows, permissions, and theme accents.',
      mr: 'प्रत्येक घटकासाठी त्यांची विशिष्ट कामे, सुरक्षितता आणि रंगसंगतीसह डिझाइन केलेली स्वतंत्र पोर्टल्स.'
    },
    items: [
      {
        id: 'donor',
        title: { en: 'Donor Portal', mr: 'दाता पोर्टल' },
        roleName: { en: 'Households, Caterers, Restaurants, Hostels', mr: 'हॉटेल्स, केटरर्स, मेस व नागरिक' },
        accent: '#F28C28',
        accentBg: '#FFF0DE',
        badge: { en: 'Universal Donor • Min 5kg limit', mr: 'सर्व दाते • किमान ५ किलो' },
        desc: {
          en: 'Post surplus in 2 minutes, get system priority recommendation (Orphanage > Gaushala > Compost), choose Self-Delivery or Volunteer Rider, and track food progress in real time.',
          mr: '२ मिनिटांत अन्न नोंदणी, प्रणालीचे प्राधान्य सुचवणे, स्वतः किंवा रायडरने पोहोचवण्याचा पर्याय आणि थेट प्रगती ट्रॅकिंग.'
        },
        actions: ['Location & Quantity Input', 'Priority Suggestion (Tier 1/2/3)', 'Self-Deliver or Rider Choice', 'Live Food Flow Tracker']
      },
      {
        id: 'orphanage',
        title: { en: 'Orphanage Portal', mr: 'अनाथाश्रम पोर्टल' },
        roleName: { en: 'Child Care Institutions & Shelters', mr: 'बाल सुधार व अनाथाश्रम' },
        accent: '#F6C343',
        accentBg: '#FEF6D9',
        badge: { en: 'Priority 1 • Human Consumption', mr: 'प्राधान्य १ • मानवी आहार' },
        desc: {
          en: 'Only accepts fresh food within safe time window. Mandatory on-site check before serving. If eatable -> accept & donor is thanked; if not eatable -> immediately diverted to compost & donor is notified.',
          mr: 'केवळ ताजे व सुरक्षित वेळेतील अन्न स्वीकारणे. प्रत्यक्ष तपासणी बंधनकारक: खाण्यायोग्य असल्यास स्वीकारून दात्याचे आभार; योग्य नसल्यास लगेच खताकडे वळवणे.'
        },
        actions: ['Arrivals & On-Site Sensory Gate', 'Accept / Deny Controls', 'Automatic Reroute to Compost', 'Needs Bulletin Board']
      },
      {
        id: 'shelter',
        title: { en: 'Shelter Portal', mr: 'निवारा केंद्र पोर्टल' },
        roleName: { en: 'Homeless & Old-Age Shelters', mr: 'वृद्धाश्रम व बेघर निवारा' },
        accent: '#2BA6A0',
        accentBg: '#E6F6F5',
        badge: { en: 'Priority 1 • Bulk Feeding', mr: 'प्राधान्य १ • मोठ्या प्रमाणावर' },
        desc: {
          en: 'Intake for large banquet batches, night-time delivery coordination, capacity management, and on-site inspection.',
          mr: 'मोठ्या प्रमाणातील अन्न स्वीकारणे, रात्रीच्या पिकअपचा समन्वय आणि घटनास्थळी प्रत्यक्ष तपासणी.'
        },
        actions: ['Bulk Food Intake', 'Capacity Management', 'Volunteer Dispatch Sync', 'Food Arrival Countdown']
      },
      {
        id: 'gaushala',
        title: { en: 'Gaushala Portal', mr: 'गोशाळा पोर्टल' },
        roleName: { en: 'Cattle Shelters & Sanctuaries', mr: 'गोशाळा व प्राणी निवारा' },
        accent: '#4E9A59',
        accentBg: '#EAF5EC',
        badge: { en: 'Priority 2 • Animal-Safe Feed', mr: 'प्राधान्य २ • जनावरांचा चारा' },
        desc: {
          en: 'Dedicated animal feed workspace. Pure vegetarian plain grains, rotis, fresh greens and fruits. Automatically excludes spices, non-veg, onion, and garlic.',
          mr: 'केवळ साधे धान्य, पोळ्या, हिरवा चारा व फळे. कांदा, लसूण, मसाले व मांसाहार आपोआप गाळला जातो.'
        },
        actions: ['Cattle-Safe Diet Filter', 'Herd Capacity Tracker', 'Feed Quality Inspection', 'Delivery Confirmation']
      },
      {
        id: 'compost',
        title: { en: 'Bio-Compost Portal', mr: 'सेंद्रिय खत प्रकल्प' },
        roleName: { en: 'Organic Waste & Soil Renewal Units', mr: 'सेंद्रिय कचरा व खत प्रकल्प' },
        accent: '#8A5A3B',
        accentBg: '#F6EFEA',
        badge: { en: 'Priority 3 • Soil Return', mr: 'प्राधान्य ३ • मातीत परती' },
        desc: {
          en: 'Dedicated composting workspace. Receives food rejected as not eatable by human shelters or gaushalas, converting it into rich organic fertilizer for local farmers.',
          mr: 'संस्थांनी नाकारलेले खाण्यास अयोग्य अन्न सेंद्रिय खतामध्ये रूपांतरित करणे. लँडफिलमध्ये जाण्यापासून रोखलेला कचरा व मिथेन बचत ट्रॅकिंग.'
        },
        actions: ['Diverted Food Batches Intake', 'Packaging-Free Gate', 'Compost Pit Inoculation', 'Farmer Distribution Log']
      },
      {
        id: 'volunteer',
        title: { en: 'Rider Logistics & Live Map', mr: 'रायडर व वाहतूक पोर्टल' },
        roleName: { en: 'Volunteer Delivery Drivers & Riders', mr: 'स्थानिक वाहतूक व मदतनीस' },
        accent: '#4FA3E0',
        accentBg: '#EBF5FC',
        badge: { en: 'On-Ground Logistics • Live GPS', mr: 'थेट मदतनीस • थेट GPS' },
        desc: {
          en: 'Live optimized location tracker with interactive street map, turn-by-turn route, donor and recipient pins, speed and ETA.',
          mr: 'नकाशावर थेट लोकेशन ट्रॅकिंग, वळणावळणाचे मार्गदर्शन, दाते व संस्थांचे ठिकाण, वेग आणि अंदाजे वेळ.'
        },
        actions: ['Interactive Live Street Map', 'Turn-by-Turn Navigation', 'QR / OTP Verification', 'Volunteering Hours Log']
      },
      {
        id: 'admin',
        title: { en: 'Admin Command', mr: 'प्रशासन पोर्टल' },
        roleName: { en: 'PotBhar Operations & Verification', mr: 'PotBhar मुख्य व्यवस्थापन' },
        accent: '#4B5BD7',
        accentBg: '#EDEFFC',
        badge: { en: 'Operations & Safety Rules', mr: 'मुख्य नियंत्रण' },
        desc: {
          en: 'Review and approve pending NGO registrations, monitor live city operations, configure safety thresholds, and inspect audit logs.',
          mr: 'संस्थांची कागदपत्र पडताळणी, थेट शहर नकाशा, अखंड ऑडिट लॉग आणि सुरक्षा नियमांचे व्यवस्थापन.'
        },
        actions: ['Document Verification Queue', 'Live Operations Monitor', 'Safety Thresholds Config', 'Immutable Audit Trail']
      }
    ]
  },

  aboutUs: {
    title: { en: 'About PotBhar', mr: 'आमच्याबद्दल' },
    headline: {
      en: 'Food is for eating, not for dumping.',
      mr: 'अन्न खाण्यासाठी आहे, फेकण्यासाठी नाही.'
    },
    missionText: {
      en: "PotBhar was created with a heartfelt belief: every single morsel of food has immense value. In Indian cities, good surplus food is thrown away just a few kilometres from children and elders who sleep on hungry stomachs. PotBhar bridges this gap cleanly and responsibly: donors enter their surplus and location, our smart system prioritizes child homes and shelters, then gaushalas, and finally bio-compost. Donors choose to self-deliver or request a volunteer rider with live map tracking. Recipient organizations conduct on-site freshness checks: if accepted, the donor is thanked; if not eatable, it is diverted to compost so nothing is wasted.",
      mr: "PotBhar ची स्थापना एका साध्या विश्वासातून झाली: अन्नाचा प्रत्येक कण अनमोल आहे. आपल्या शहरांमध्ये उत्तम अन्न कचऱ्यात फेकले जाते, तर अवघ्या काही किलोमीटरवर लहान मुले आणि वृद्ध उपाशीपोटी झोपतात. PotBhar हा दुरावा जबाबदारीने मिटवतो: दाते अन्नाची माहिती आणि ठिकाण भरतात, प्रणाली आधी अनाथाश्रम/निवारा, नंतर गोशाळा आणि शेवटी सेंद्रिय खताला प्राधान्य सुचवते. दाते स्वतः किंवा थेट नकाशा ट्रॅकिंग असलेल्या रायडर द्वारे अन्न पोहोचवू शकतात. संस्था पोहोचल्यावर तपासणी करते: खाण्यायोग्य असल्यास दात्याचे आभार मानले जातात; योग्य नसल्यास लगेच खतासाठी पाठवले जाते."
    },
    values: [
      { title: { en: 'Safety First', mr: 'आधी सुरक्षा' }, desc: { en: 'Recipient on-site physical check ensures children and elders only receive safe, wholesome food.', mr: 'अन्न पोहोचल्यावर प्रत्यक्ष वास व तपासणीद्वारे मुलांपर्यंत फक्त ताजे व उत्तम जेवणच पोहोचते.' } },
      { title: { en: 'Dignified Partnerships', mr: 'सन्मानपूर्वक सहकार्य' }, desc: { en: 'Receivers are equal community partners, never treated as mere beneficiaries.', mr: 'स्वीकारणाऱ्या संस्था आमचे आदरणीय भागीदार आहेत, कोणीही याचक नाही.' } },
      { title: { en: 'Zero Food to Landfills', mr: 'कचऱ्यात शून्य अन्न' }, desc: { en: 'What feeds humans feeds humans; what does not feeds animals or enriches soil as compost.', mr: 'माणसांसाठी योग्य ते माणसांना, साधे जनावरांना, आणि उरलेले सेंद्रिय खतात रूपांतरित.' } },
      { title: { en: 'Complete Transparency', mr: 'पूर्ण पारदर्शकता' }, desc: { en: 'Live GPS location tracker for riders, instant notifications, and honest metrics.', mr: 'रायडरचे थेट GPS नकाशा ट्रॅकिंग, झटपट सूचना आणि प्रत्येक अन्नाची पारदर्शक नोंद.' } }
    ]
  },

  faqs: [
    {
      q: { en: 'Can anyone donate food on PotBhar?', mr: 'PotBhar वर कोणीही अन्न दान करू शकते का?' },
      a: {
        en: 'Yes! Anyone can donate—households, caterers, restaurants, wedding halls, hostels, and offices. If your batch is smaller than 5 kg, the system recommends self-delivery to a nearby verified shelter so volunteer riders are reserved for bulk batches.',
        mr: 'होय! सामान्य कुटुंबे, केटरर्स, हॉटेल्स, मेस, कार्यालये कोणीही अन्न दान करू शकतात. जर अन्नाचे प्रमाण ५ किलोपेक्षा कमी असेल, तर स्वयंसेवक रायडरचा वेळ वाचवण्यासाठी जवळच्या केंद्रावर स्वतः नेऊन देण्याची शिफारस केली जाते.'
      }
    },
    {
      q: { en: 'How does the priority recommendation work?', mr: 'प्रणाली प्राधान्य कसे सुचवते?' },
      a: {
        en: 'When you input category, time cooked, storage, and smell: if food is fresh cooked/sealed within safe window, Priority 1 is Orphanages and Shelters. If food is plain and animal-safe, Priority 2 is Gaushalas. If food has turned sour, expired, or consists of raw scraps, Priority 3 is Bio-Compost Units. The donor always reviews and confirms the priority.',
        mr: 'तुम्ही वेळ, तापमान आणि साठवणूक भरल्यानंतर: अन्न ताजे व सुरक्षित वेळेत असल्यास प्राधान्य १ अनाथाश्रम/निवारा केंद्राला मिळते. अन्न साधे व जनावरांसाठी सुरक्षित असल्यास प्राधान्य २ गोशाळेला मिळते. अन्न आंबलेले किंवा खराब असल्यास प्राधान्य ३ सेंद्रिय खताला मिळते.'
      }
    },
    {
      q: { en: 'Can donors deliver the food themselves?', mr: 'दाते स्वतः अन्न पोहोचवू शकतात का?' },
      a: {
        en: 'Yes! Donors can choose "Deliver by Self" (we provide the direct navigation address and contact of the matched shelter), or request a "Volunteer Rider" who picks it up and provides live GPS tracking.',
        mr: 'होय! दाते स्वतः अन्न नेऊन देण्याचा पर्याय निवडू शकतात (आम्ही जवळच्या संस्थेचा नकाशा व संपर्क देतो), किंवा थेट नकाशावर ट्रॅक होणाऱ्या स्वयंसेवक रायडरची विनंती करू शकतात.'
      }
    },
    {
      q: { en: 'What happens if the recipient finds the food not eatable?', mr: 'संस्थेने अन्न खाण्यायोग्य नसल्याचे आढळल्यास काय होते?' },
      a: {
        en: 'The recipient on-site inspection is the final safeguard. If food has soured during transit or is unsafe, the recipient clicks "Deny - Not Eatable". The system immediately reroutes the batch to a nearby Bio-Compost unit, and notifies the donor respectfully so they know it is turning into soil nutrients.',
        mr: 'संस्थेची प्रत्यक्ष तपासणी हा मुख्य सुरक्षा कवच आहे. प्रवासातील उष्णतेमुळे अन्न आंबले असल्यास संस्था ते नाकारते. प्रणाली ते अन्न तत्काळ जवळच्या सेंद्रिय खत प्रकल्पाकडे वळवते आणि दात्याला सौम्यपणे त्याची माहिती देते.'
      }
    },
    {
      q: { en: 'Are Compost and Gaushala separate portals?', mr: 'गोशाळा आणि खत केंद्र स्वतंत्र पोर्टल्स आहेत का?' },
      a: {
        en: 'Yes, completely separate. Gaushalas manage cattle-safe feed, herd counts, and vegetable peelings. Compost units handle spoiled food, wet waste, and organic manure processing.',
        mr: 'होय, दोन्ही पूर्णपणे स्वतंत्र पोर्टल्स आहेत. गोशाळा जनावरांच्या साध्या चाऱ्याचे व्यवस्थापन करते, तर खत केंद्र खराब अन्न व ओल्या कचऱ्यापासून खतनिर्मितीचे काम करते.'
      }
    }
  ],

  ctaBand: {
    tagline: { en: "वदनी कवळ घेता नाम घ्या श्रीहरीचे ।", mr: "वदनी कवळ घेता नाम घ्या श्रीहरीचे ।" },
    headline: {
      en: "Connect abundance to need in under 20 minutes.",
      mr: "अतिरिक्त अन्नाला गरजूंपर्यंत २० मिनिटांत पोहोचवा."
    },
    sub: {
      en: "Whether you have 5 kg of homemade khichdi or 80 kg from a wedding banquet, ensure it nourishes lives tonight.",
      mr: "घरातील ५ किलो अन्न असो किंवा लग्नातील ८० किलो जेवण, आज रात्री एकाही अन्नाचा कण वाया जाऊ देऊ नका."
    },
    btnDonate: { en: 'Donate Surplus Food', mr: 'उरलेले अन्न दान करा' },
    btnJoin: { en: 'Register as Shelter / Gaushala / Compost', mr: 'संस्था / गोशाळा / खत केंद्र म्हणून नोंदणी करा' }
  },

  footer: {
    desc: {
      en: "PotBhar is an India-first surplus food redistribution platform connecting donors with orphanages, shelters, gaushalas, and bio-compost units.",
      mr: "PotBhar हे भारतातील अतिरिक्त अन्न गरजू अनाथाश्रम, निवारा केंद्रे, गोशाळा आणि सेंद्रिय खत प्रकल्पांशी जोडणारे व्यासपीठ आहे."
    },
    guidance: {
      en: "Designed around surplus food safety and dignity. Mandatory recipient on-site check gates all human distribution.",
      mr: "अन्न सुरक्षा आणि प्रत्येकाच्या सन्मानावर आधारलेले. प्रत्यक्ष तपासणीनंतरच जेवण वाढले जाते."
    },
    copyright: {
      en: "© 2026 PotBhar. All rights reserved.",
      mr: "© 2026 PotBhar. वदनी कवळ घेता नाम घ्या श्रीहरीचे । सर्व हक्क राखीव.",
    }
  }
};

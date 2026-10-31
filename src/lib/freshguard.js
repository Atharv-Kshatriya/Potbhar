// FreshGuard AI Deterministic Rule Engine
// As specified in §8 of newARCH/POTBHAR_ARCHITECTURE.md

export const FRESHGUARD_CONFIG = {
  version: 1,
  windows_hours: {
    cooked_veg:       { ambient: 4,  hot_held: 4,  chilled: 24 },
    cooked_nonveg:    { ambient: 2,  hot_held: 4,  chilled: 24 },
    dairy_based:      { ambient: 2,  hot_held: 2,  chilled: 24 },
    bakery_dry:       { ambient: 24, hot_held: 24, chilled: 72 },
    raw_produce:      { ambient: 24, hot_held: 24, chilled: 72 },
    packaged_sealed:  { ambient: null, hot_held: null, chilled: null, rule: "use_expiry_date" }
  },
  min_buffer_minutes_for_tier1: 60,
  tier_thresholds: {
    tier1_max: 34, // 0-34: Tier 1 (Human Consumption - Orphanages, Shelters)
    tier2_max: 64  // 35-64: Tier 2 (Animal Feed - Gaushalas)
                   // >= 65: Tier 3 (Organic Compost)
  },
  weights: {
    elapsed_ratio: 40,
    storage_mismatch: 15,
    opened_package: 10,
    texture_colour_change: 20,
    photo_mold_probability: 25
  },
  meal_kg: 0.35
};

export const FOOD_CATEGORIES = [
  { id: 'cooked_veg', labelEn: 'Cooked Vegetarian (Dal, Sabzi, Rice, Roti)', labelMr: 'शिजवलेले शाकाहारी अन्न (डाळ, भाजी, भात, पोळी)' },
  { id: 'cooked_nonveg', labelEn: 'Cooked Non-Vegetarian', labelMr: 'शिजवलेले मांसाहारी अन्न' },
  { id: 'dairy_based', labelEn: 'Dairy / Sweets (Kheer, Paneer, Mithai)', labelMr: 'दुग्धजन्य / मिठाई (खीर, पनीर, मिठाई)' },
  { id: 'bakery_dry', labelEn: 'Bakery & Dry Food (Bread, Pav, Biscuits)', labelMr: 'बेकरी व सुका खाऊ (पाव, ब्रेड, बिस्कीट)' },
  { id: 'raw_produce', labelEn: 'Raw Fresh Produce (Vegetables, Fruits)', labelMr: 'कच्ची ताजी फळे व भाज्या' },
  { id: 'packaged_sealed', labelEn: 'Sealed Packaged Food', labelMr: 'सील केलेले पॅक अन्न' },
];

export const STORAGE_TYPES = [
  { id: 'ambient', labelEn: 'Room Temperature (Ambient)', labelMr: 'खोलीचे तापमान' },
  { id: 'hot_held', labelEn: 'Hot-Held (≥ 60 °C)', labelMr: 'गरम ठेवलेले (≥ 60 °C)' },
  { id: 'chilled', labelEn: 'Chilled / Refrigerated (≤ 5 °C)', labelMr: 'थंड / फ्रीजमध्ये ठेवलेले (≤ 5 °C)' },
];

/**
 * Deterministic assessment based on §8 rules
 */
export function assessFoodFreshness({
  category = 'cooked_veg',
  storage = 'ambient',
  preparedHoursAgo = 1.5,
  smell = 'normal', // 'normal' | 'off'
  moldOrSlime = false,
  textureChanged = false,
  packaging = 'sealed', // 'sealed' | 'opened' | 'bulging' | 'damaged'
  plateLeftover = false,
  isAnimalSafe = true,
  containsOnionGarlic = false,
  containsNonVeg = false,
}) {
  const hardFails = [];
  const reasonsEn = [];
  const reasonsMr = [];

  // Hard Fails (§8.3)
  if (moldOrSlime) {
    hardFails.push('mold_or_slime');
    reasonsEn.push('Mold or slime detected on food item.');
    reasonsMr.push('अन्नावर बुरशी किंवा चिकटपणा आढळला आहे.');
  }

  if (packaging === 'bulging') {
    hardFails.push('packaging_bulging');
    reasonsEn.push('Packaging is bulging, indicating dangerous gas buildup/fermentation.');
    reasonsMr.push('पॅकेट फुगलेले आहे, जे धोकादायक सूक्ष्मजीवांची वाढ दर्शवते.');
  }

  if (smell === 'off') {
    hardFails.push('smell_off');
    reasonsEn.push('Noticeable off smell or sourness reported.');
    reasonsMr.push('अन्नाला आंबट किंवा विचित्र वास येत आहे.');
  }

  if (plateLeftover) {
    hardFails.push('plate_leftovers');
    reasonsEn.push('Food includes plate leftovers, unserved surplus only is permitted for safety.');
    reasonsMr.push('ताटातील उरलेले अन्न सुरक्षिततेसाठी माणसांना किंवा जनावरांना देता येत नाही.');
  }

  // Calculate Safe Time Window
  const catConfig = FRESHGUARD_CONFIG.windows_hours[category] || FRESHGUARD_CONFIG.windows_hours.cooked_veg;
  let maxSafeHours = 4;
  if (catConfig[storage] !== undefined && catConfig[storage] !== null) {
    maxSafeHours = catConfig[storage];
  } else if (category === 'packaged_sealed') {
    maxSafeHours = 72; // default if not expired
  }

  const elapsedHours = Math.max(0, parseFloat(preparedHoursAgo) || 0);
  const remainingHours = maxSafeHours - elapsedHours;
  const remainingMinutes = Math.max(0, Math.round(remainingHours * 60));

  if (remainingHours <= 0) {
    hardFails.push('time_window_exceeded');
    reasonsEn.push(`Safe time window of ${maxSafeHours} hrs exceeded (${elapsedHours} hrs since preparation).`);
    reasonsMr.push(`अन्न शिजवल्यानंतरची सुरक्षित मर्यादा (${maxSafeHours} तास) उलटून गेली आहे (${elapsedHours} तास झाले).`);
  }

  // If any hard fails, route to Tier 3 (Compost)
  if (hardFails.length > 0) {
    return {
      tier: 'compost',
      tierLabelEn: 'Tier 3: Organic Compost',
      tierLabelMr: 'स्तर ३: सेंद्रिय खतनिर्मिती',
      riskScore: 92,
      riskLevel: 'critical',
      riskLevelEn: 'High Risk / Unfit for Consumption',
      riskLevelMr: 'असुरक्षित / खतासाठी योग्य',
      hardFails,
      reasonsEn,
      reasonsMr,
      timeLeftMinutes: 0,
      allowedDestinations: ['compost'],
      safeWindowHours: maxSafeHours,
      elapsedHours,
      color: '#8A5A3B'
    };
  }

  // Compute Risk Score
  let score = 5; // Base low risk
  const elapsedRatio = elapsedHours / maxSafeHours;
  score += Math.round(elapsedRatio * FRESHGUARD_CONFIG.weights.elapsed_ratio);

  if (textureChanged) {
    score += FRESHGUARD_CONFIG.weights.texture_colour_change;
    reasonsEn.push('Minor texture or colour change noted.');
    reasonsMr.push('पोत किंवा रंगात थोडा फरक नोंदवला गेला आहे.');
  }

  if (packaging === 'opened' || packaging === 'damaged') {
    score += FRESHGUARD_CONFIG.weights.opened_package;
    reasonsEn.push('Container opened or package seal broken.');
    reasonsMr.push('पॅकेट उघडलेले किंवा सील तुटलेले आहे.');
  }

  // Storage optimization bonus/penalty
  if (storage === 'chilled') {
    score = Math.max(5, score - 8);
  } else if (storage === 'ambient' && (category === 'cooked_nonveg' || category === 'dairy_based')) {
    score += FRESHGUARD_CONFIG.weights.storage_mismatch;
    reasonsEn.push('Perishable item kept at room temperature.');
    reasonsMr.push('नाशवंत अन्न खोलीच्या तापमानावर ठेवले आहे.');
  }

  // Ensure within 0-100
  const finalScore = Math.min(100, Math.max(0, score));

  // Determine Tier and Allowed Destinations
  let tier = 'human';
  let allowedDestinations = ['human', 'animal', 'compost'];
  let riskLevelEn = 'Low Risk (Safe for People)';
  let riskLevelMr = 'कमी जोखीम (माणसांसाठी पूर्णपणे सुरक्षित)';
  let tierLabelEn = 'Tier 1: Human Consumption';
  let tierLabelMr = 'स्तर १: माणसांच्या जेवणासाठी';
  let color = '#1F5C3A';

  if (finalScore <= FRESHGUARD_CONFIG.tier_thresholds.tier1_max && remainingMinutes >= FRESHGUARD_CONFIG.min_buffer_minutes_for_tier1) {
    tier = 'human';
    tierLabelEn = 'Tier 1: Human Consumption';
    tierLabelMr = 'स्तर १: माणसांच्या जेवणासाठी (अनाथाश्रम, निवारा केंद्र)';
    allowedDestinations = ['human', 'animal', 'compost'];
    reasonsEn.unshift(`Within safe ${maxSafeHours}h window. Passes all FreshGuard hygiene parameters.`);
    reasonsMr.unshift(`सुरक्षित वेळेच्या मर्यादेत आहे. सर्व FreshGuard सुरक्षा निकष पूर्ण करतो.`);
    color = '#1F5C3A';
  } else if (finalScore <= FRESHGUARD_CONFIG.tier_thresholds.tier2_max) {
    tier = 'animal';
    tierLabelEn = 'Tier 2: Animal Feed (Gaushalas)';
    tierLabelMr = 'स्तर २: गोशाळा व प्राण्यांसाठी';
    riskLevelEn = 'Moderate Risk (Animal-Safe Only)';
    riskLevelMr = 'मध्यम जोखीम (फक्त गोशाळा/प्राण्यांसाठी सुरक्षित)';
    allowedDestinations = ['animal', 'compost'];
    color = '#4E9A59';

    if (containsNonVeg || containsOnionGarlic || !isAnimalSafe) {
      tier = 'compost';
      tierLabelEn = 'Tier 3: Organic Compost';
      tierLabelMr = 'स्तर ३: सेंद्रिय खतनिर्मिती';
      allowedDestinations = ['compost'];
      color = '#8A5A3B';
      reasonsEn.push('Contains non-vegetarian or garlic/onion/spices unfit for Gaushala cattle; routed to Compost.');
      reasonsMr.push('मांसाहार, कांदा, लसूण किंवा तीव्र मसाले असल्यामुळे गोशाळेसाठी अयोग्य; खतासाठी वळवले.');
    } else {
      reasonsEn.push('Passed safe window for people, but clean, plain and fit for cattle / animals.');
      reasonsMr.push('माणसांसाठी वेळ संपली आहे, परंतु अन्न स्वच्छ, साधे आणि जनावरांसाठी सुरक्षित आहे.');
    }
  } else {
    tier = 'compost';
    tierLabelEn = 'Tier 3: Organic Compost';
    tierLabelMr = 'स्तर ३: सेंद्रिय खतनिर्मिती';
    riskLevelEn = 'High Risk (Compost Only)';
    riskLevelMr = 'जास्त जोखीम (केवळ खतनिर्मितीसाठी)';
    allowedDestinations = ['compost'];
    color = '#8A5A3B';
    reasonsEn.push('Risk score exceeds safe consumption threshold. Enriched organic compost processing recommended.');
    reasonsMr.push('जोखीम गुण सुरक्षित मर्यादेपेक्षा जास्त आहे. सेंद्रिय खतासाठी वापरणे योग्य.');
  }

  return {
    tier,
    tierLabelEn,
    tierLabelMr,
    riskScore: finalScore,
    riskLevel: finalScore <= 34 ? 'low' : finalScore <= 64 ? 'moderate' : 'high',
    riskLevelEn,
    riskLevelMr,
    hardFails,
    reasonsEn,
    reasonsMr,
    timeLeftMinutes: remainingMinutes,
    allowedDestinations,
    safeWindowHours: maxSafeHours,
    elapsedHours,
    color
  };
}


// ── SCORES ────────────────────────────────────────────────────────────────────
export const SCORES = {
  A: { label:'A', bg:'#1D9E75', text:'Excellent',    detail:'Pêche durable, traçable, circuit court' },
  B: { label:'B', bg:'#3B6D11', text:'Bien',         detail:'Pratiques responsables, quelques axes d\'amélioration' },
  C: { label:'C', bg:'#BA7517', text:'Moyen',        detail:'Label reconnu mais critères insuffisants' },
  D: { label:'D', bg:'#D85A30', text:'Médiocre',     detail:'Surpêché ou origine peu transparente' },
  E: { label:'E', bg:'#A32D2D', text:'Mauvais',      detail:'Pratiques destructrices détectées' },
  F: { label:'F', bg:'#501313', text:'Très mauvais', detail:'Chalutage de fond, espèce menacée' },
}

// ── PÊCHEURS ──────────────────────────────────────────────────────────────────
export const FISHERMEN = [
  {
    id: 'marco-ferreira',
    name: 'Marco Ferreira',
    location: 'Douarnenez, Bretagne',
    since: 2011,
    method: 'Filet dérivant · Zone FAO 27 · Manche Est',
    species: ['Maquereau', 'Sardine', 'Bar de ligne'],
    bio: "Fils de pêcheur, Marco a repris le bateau familial en 2011. Il vend aujourd'hui 80% de sa pêche en direct grâce à MaréeForce, ce qui lui a permis d'augmenter ses revenus de 34%.",
    quote: "Avant FishTrace, je bradais mon poisson à des grossistes. Maintenant mes clients savent exactement d'où il vient.",
    revenue_increase: '+34%',
    certified: true,
    emoji: '🎣',
  },
  {
    id: 'sylvie-kernevez',
    name: 'Sylvie Kernevez',
    location: 'Saint-Malo, Bretagne',
    since: 2008,
    method: 'Ligne de traîne · Zone FAO 27 · Côte normande',
    species: ['Bar de ligne', 'Daurade', 'Maquereau'],
    bio: "Sylvie est l'une des rares femmes patronnes de pêche en Bretagne. Elle milite pour une pêche artisanale reconnue et durable.",
    quote: "Le label MaréeForce nous donne enfin une vraie valeur face aux industriels.",
    revenue_increase: '+28%',
    certified: true,
    emoji: '⚓',
  },
  {
    id: 'pierre-lebas',
    name: 'Pierre Lebas',
    location: 'Boulogne-sur-Mer, Hauts-de-France',
    since: 2015,
    method: 'Casiers · Zone FAO 27 · Manche Ouest',
    species: ['Homard', 'Tourteau', 'Coquilles Saint-Jacques'],
    bio: "Pierre s'est reconverti dans la pêche artisanale après 10 ans dans l'industrie agroalimentaire.",
    quote: "J'ai vu comment fonctionnait l'industrie de l'intérieur. FishTrace, c'est la transparence qu'on attendait.",
    revenue_increase: '+41%',
    certified: true,
    emoji: '🦞',
  },
]

// ── PRODUITS ──────────────────────────────────────────────────────────────────
export const PRODUCTS = [
  {
    id: 'saumon-msc-chili',
    name: 'Saumon Atlantique',
    brand: 'Pescanova',
    label: 'MSC',
    family: 'Poissons gras',
    origin: 'Chili',
    method: 'Élevage intensif en cage',
    score: 'D',
    intermediaries: 3,
    zone: 'Pacifique Sud-Est (FAO 87)',
    emoji: '🐟',
    warning: 'Ce label MSC ne garantit pas une pêche durable ici. Des critiques documentées existent (Seaspiracy, 2021).',
    critiques: [
      { label:'Zone de pêche',    value:2, max:5, note:'Surpêché dans cette zone depuis 2018 (IFREMER)' },
      { label:'Méthode',          value:1, max:5, note:'Élevage intensif en cage, antibiotiques détectés' },
      { label:'Intermédiaires',   value:1, max:5, note:'3 intermédiaires, traçabilité très limitée' },
      { label:'Fiabilité du label', value:2, max:5, note:'MSC critiqué pour ses critères insuffisants' },
    ],
  },
  {
    id: 'thon-boite',
    name: 'Thon en boîte',
    brand: 'Petit Navire',
    label: 'MSC',
    family: 'Poissons gras',
    origin: 'Océan Indien',
    method: 'Senne coulissante + DCP',
    score: 'E',
    intermediaries: 4,
    zone: 'Océan Indien (FAO 51)',
    emoji: '🐠',
    warning: 'La pêche au DCP est l\'une des méthodes les plus destructrices pour les écosystèmes marins.',
    critiques: [
      { label:'Zone de pêche',    value:1, max:5, note:'Stock en déclin critique (FAO 2023)' },
      { label:'Méthode',          value:1, max:5, note:'DCP : dispositifs de concentration de poissons, très destructeurs' },
      { label:'Intermédiaires',   value:1, max:5, note:'4 intermédiaires, origine non vérifiable' },
      { label:'Fiabilité du label', value:2, max:5, note:'Label contesté pour cette espèce' },
    ],
  },
  {
    id: 'maquereau-marco',
    name: 'Maquereau de ligne',
    brand: 'Marco Ferreira',
    label: 'MaréeForce',
    family: 'Poissons gras',
    origin: 'Douarnenez, Bretagne',
    method: 'Ligne de traîne · Artisanal',
    score: 'A',
    intermediaries: 0,
    zone: 'Atlantique Nord-Est (FAO 27)',
    emoji: '🐡',
    fisherman_id: 'marco-ferreira',
    critiques: [
      { label:'Zone de pêche',    value:5, max:5, note:'Stock abondant, suivi IFREMER annuel' },
      { label:'Méthode',          value:5, max:5, note:'Pêche à la ligne, zéro bycatch' },
      { label:'Intermédiaires',   value:5, max:5, note:'Direct pêcheur → consommateur' },
      { label:'Fiabilité du label', value:5, max:5, note:'Certifié MaréeForce, traçabilité totale' },
    ],
  },
  {
    id: 'bar-sylvie',
    name: 'Bar de ligne',
    brand: 'Sylvie Kernevez',
    label: 'MaréeForce',
    family: 'Poissons blancs',
    origin: 'Saint-Malo, Bretagne',
    method: 'Ligne de traîne · Saisonnière',
    score: 'A',
    intermediaries: 0,
    zone: 'Atlantique Nord-Est (FAO 27)',
    emoji: '🐟',
    fisherman_id: 'sylvie-kernevez',
    critiques: [
      { label:'Zone de pêche',    value:5, max:5, note:'Côte normande, stock bien géré' },
      { label:'Méthode',          value:5, max:5, note:'Ligne individuelle, très sélective' },
      { label:'Intermédiaires',   value:5, max:5, note:'Circuit direct certifié MaréeForce' },
      { label:'Fiabilité du label', value:5, max:5, note:'Certifié MaréeForce' },
    ],
  },
  {
    id: 'coquilles-pierre',
    name: 'Coquilles Saint-Jacques',
    brand: 'Pierre Lebas',
    label: 'MaréeForce',
    family: 'Coquillages',
    origin: 'Boulogne-sur-Mer',
    method: 'Casiers · Pêche saisonnière',
    score: 'A',
    intermediaries: 0,
    zone: 'Manche Ouest (FAO 27)',
    emoji: '🐚',
    fisherman_id: 'pierre-lebas',
    critiques: [
      { label:'Zone de pêche',    value:5, max:5, note:'Zone Manche, quotas respectés' },
      { label:'Méthode',          value:5, max:5, note:'Casiers, zéro impact sur les fonds marins' },
      { label:'Intermédiaires',   value:5, max:5, note:'Vente directe au port' },
      { label:'Fiabilité du label', value:5, max:5, note:'Certifié MaréeForce' },
    ],
  },
]

// ── ALTERNATIVES ──────────────────────────────────────────────────────────────
export const ALTERNATIVES = {
  'saumon-msc-chili': [
    { product_id:'maquereau-marco',  distance:2.4, available:true  },
    { product_id:'bar-sylvie',       distance:3.8, available:true  },
    { product_id:'coquilles-pierre', distance:5.1, available:false },
  ],
  'thon-boite': [
    { product_id:'maquereau-marco',  distance:1.8, available:true  },
    { product_id:'coquilles-pierre', distance:4.2, available:true  },
    { product_id:'bar-sylvie',       distance:6.3, available:false },
  ],
}

// ── PLANS ─────────────────────────────────────────────────────────────────────
export const PLANS = [
  {
    id:'free', name:'Gratuit', price:0, billing:'',
    badge:null, recommended:false,
    features:[
      { text:'Scan code-barre illimité',      ok:true  },
      { text:'Score durabilité A→F',          ok:true  },
      { text:'Explication du score',          ok:true  },
      { text:'1 alternative durable',         ok:true  },
      { text:'3 alternatives complètes',      ok:false },
      { text:'Profil pêcheur complet',        ok:false },
      { text:'Filtre par espèce',             ok:false },
      { text:'Historique des scans',          ok:false },
    ],
    cta:"Commencer gratuitement",
  },
  {
    id:'freemium', name:'Premium', price:4, billing:'/mois',
    badge:'Consommateurs & artisans', recommended:true,
    features:[
      { text:'Scan code-barre illimité',      ok:true },
      { text:'Score durabilité A→F',          ok:true },
      { text:'Explication du score',          ok:true },
      { text:'1 alternative durable',         ok:true },
      { text:'3 alternatives complètes',      ok:true },
      { text:'Profil pêcheur complet',        ok:true },
      { text:'Filtre par espèce',             ok:true },
      { text:'QR traçabilité artisan',        ok:true },
    ],
    cta:"S'abonner pour 4€/mois",
  },
  {
    id:'pro', name:'Pro Restaurant', price:10, billing:'/mois',
    badge:'Restaurateurs', recommended:false,
    features:[
      { text:'Tout le plan Premium',          ok:true },
      { text:'Label restaurant éco-responsable', ok:true },
      { text:'QR menu relié aux artisans',    ok:true },
      { text:'Fiche origine pour les clients', ok:true },
      { text:'Badge salle et carte',          ok:true },
      { text:'Rapport impact mensuel',        ok:true },
      { text:'Mise en avant MaréeForce',      ok:true },
      { text:'Support prioritaire',           ok:true },
    ],
    cta:"Devenir restaurant Pro",
  },
]

// ── STATS IMPACT ──────────────────────────────────────────────────────────────
export const IMPACT_STATS = {
  scans: 12847,
  artisans: 47,
  kg_saved: 3200,
  users: 5130,
}

// ── HELPERS ───────────────────────────────────────────────────────────────────
export const getProduct  = id => PRODUCTS.find(p => p.id === id) || null
export const getFisherman = id => FISHERMEN.find(f => f.id === id) || null
export const getAlternatives = productId =>
  (ALTERNATIVES[productId] || []).map(a => ({
    ...a,
    product: getProduct(a.product_id),
    fisherman: (() => { const p = getProduct(a.product_id); return p?.fisherman_id ? getFisherman(p.fisherman_id) : null })(),
  }))

// All station content lives here, so it can be edited without touching the components.
// Images: put files in /public/images and set the `image` paths below.
// Missing images fall back to the gradient artwork automatically.

export const STATION = {
  name: 'Classic 1220 AM',
  callSign: 'CFAJ',
  tagline: 'Hometown Radio',
  owner: 'A Radio Dhun radio station',
  logo: '/images/classic-new-logo.png',
  address: '20 Lake St., St. Catharines, ON L2R 5W8',
  phone: '905-684-6765',
  emails: {
    general: 'info@classic1220.ca',
    sales: 'sales@classic1220.ca',
    news: 'news@classic1220.ca',
    xzone: 'xzone@classic1220.ca',
    ella: 'ella.mack@classic1220.ca',
  },
  // Paste the station's live stream URL here (e.g. the TuneIn / Icecast / Shoutcast stream).
  streamUrl: '',
  tuneInUrl: 'https://tunein.com/radio/CLASSIC-1220-s350181/',
  tuneInImage: '/images/tunein.png',
  nowPlaying: {
    show: 'Morning Wake Up Call',
    host: 'Tony Stuart',
    time: 'Monday – Friday, 6 – 9 AM',
    recentSong: '[Song Title] — [Artist]',
  },
};

export const NAV = [
  { label: 'On Air', href: '/on-air' },
  { label: 'Hosts', href: '/hosts' },
  { label: 'About Us', href: '/about-us' },
  { label: 'Advertise', href: '/advertise' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' },
];

export const SHOWS = {
  weekdays: [
    {
      slug: 'morning-wake-up-call',
      name: 'Morning Wake Up Call',
      host: 'Tony Stuart',
      time: 'MON–FRI · 6–9 AM',
      image: '/images/tony-stuart.jpg',
      blurb: 'Former Canadian Armed Forces musician and retired music teacher Tony Stuart starts your day with the classics.',
    },
    {
      slug: 'ella-mack',
      name: 'Ella Mack Smart Living Show',
      host: 'Ella Mack',
      time: 'MON–FRI · 3–6 PM · RETURNS SOON',
      image: '/images/ella.jpeg',
      blurb: 'Back home in Niagara after years in Australia, Ella brings her creative, athletic energy to your afternoons.',
    },
    {
      slug: 'x-zone-radio',
      name: "The 'X' Zone Radio/TV Show",
      host: 'Rob McConnell',
      time: 'MON–FRI · 10 PM–12 AM',
      image: '/images/x-zone.jpg',
      blurb: 'The paranormal, the unexplained, UFOs and cover-ups — with the "who’s who" of the field.',
    },
  ],
  weekends: [
    {
      slug: '8-days-this-week',
      name: '8 Days This Week',
      host: 'Tony Stuart & Aaron Badgley',
      time: 'SAT & SUN · 11 AM–12 PM',
      image: '/images/8-days-this-week.jpg',
      blurb: 'The top 8 stories from the week-that-was in rock ’n roll history, and how they connect.',
    },
    {
      slug: 'from-memphis-to-merseyside',
      name: 'From Memphis to Merseyside',
      host: 'Classic 1220',
      time: 'SAT & SUN · 1–3 PM',
      image: '/images/memphis-to-merseyside.jpg',
      blurb: 'From Elvis at Sun Records in 1954 to 1980 — a new theme and a Billboard chart every week.',
    },
    {
      slug: 'musicology',
      name: 'Musicology',
      host: 'Larry Love',
      time: 'SAT & SUN · 6–7 PM',
      image: '/images/musicology.png',
      blurb: 'Timeless classics, B-sides and rarities — and the facts behind them, from a 35-year broadcast veteran.',
    },
    {
      slug: 'rock-n-roll-bandstand',
      name: 'Rock N Roll Bandstand',
      host: 'Robert E Sox',
      time: 'SAT & SUN · 7–9 PM',
      image: '/images/rock-n-roll-bandstand.jpg',
      blurb: 'Great music from the 50s, 60s and 70s — the best era in rock & roll, straight from Playas, Ecuador.',
    },
    {
      slug: 'old-school-dance',
      name: 'Old School Dance',
      host: 'Walter Scott James & Allnight Esquire',
      time: 'SAT & SUN · 9–11 PM',
      image: '/images/old-school-dance.png',
      blurb: 'Oldies from the 50s, 60s and 70s, spun like a night at the old school dance.',
    },
  ],
  comingSoon: 'Ella Mack Smart Living Show',
};

export const STORY = [
  {
    year: '1967',
    title: '1220 CHSC goes on air',
    text: 'Founded by Robert (Bob) Redmond on Queenston Street in St. Catharines — home to a "who’s who" of Niagara radio for over four decades.',
  },
  { year: '2010', title: 'An era closes', text: 'After years under various ownership groups, 1220 CHSC signs off.' },
  {
    year: 'Today',
    title: 'Classic 1220 CFAJ',
    text: 'Hometown radio returns to 1220 AM with the best of the 60’s, 70’s and 80’s for St. Catharines and Thorold.',
  },
];

export const TRIBUTE = {
  name: 'John Larocque, "The Mayor of the Morning"',
  text: "A tireless supporter of St. Catharines, seen at hundreds of events each year. Rotary Paul Harris Fellow, Canada 125 Medal (1993), St. Catharines Citizen of the Year (1997) and Queen's Golden Jubilee Medal (2003). Classic 1220 proudly carries his legacy, and that of 1220 CHSC.",
};

export const HOSTS = [
  { name: 'Tony Stuart', show: 'Morning Wake Up Call · 8 Days This Week', image: '/images/tony-stuart.jpg' },
  { name: 'Ella Mack', show: 'Weekdays 3–6 PM', image: '/images/ella.jpeg' },
  { name: 'Rob McConnell', show: "The 'X' Zone", image: '/images/hosts/rob-mcconnell.jpg' },
  { name: 'Aaron Badgley', show: '8 Days This Week', image: '/images/8-days-this-week.jpg' },
  { name: 'Larry Love', show: 'Musicology', image: '/images/musicology.png' },
  { name: 'Robert E Sox', show: 'Rock N Roll Bandstand', image: '/images/hosts/robert-e-sox.jpg' },
  { name: 'Walter Scott James', show: 'Old School Dance', image: '/images/old-school-dance.png' },
  { name: 'Allnight Esquire', show: 'Old School Dance', image: '/images/old-school-dance.png' },
];

export const AD_POINTS = [
  {
    title: 'Reach buyers at the right time',
    text: 'Radio regularly reaches consumers within two hours of their largest purchase of the day — in-store or online.',
  },
  { title: 'Costs less', text: 'Radio advertising costs less than any other major form of advertising.' },
  { title: 'The true mobile medium', text: 'In the car, at work and at play — radio goes wherever your customers go.' },
  {
    title: 'Website ad banners',
    text: 'Put your brand in front of a targeted Niagara audience interested in local news, events and businesses.',
  },
];

export const CAREERS = [
  {
    title: 'Sales Team Member',
    text: 'Join a dynamic sales team where your passion for broadcasting meets innovation, creativity and community.',
  },
];

// Brand gradients, cycled through cards, rings and artwork.
export const GRADIENTS = [
  'linear-gradient(150deg, #5B2C9F 0%, #C2407E 100%)',
  'linear-gradient(150deg, #C2407E 0%, #F7941D 100%)',
  'linear-gradient(150deg, #2E1460 0%, #5B2C9F 100%)',
  'linear-gradient(150deg, #F7941D 0%, #C2407E 100%)',
  'linear-gradient(150deg, #3E1C78 0%, #C2407E 100%)',
  'linear-gradient(150deg, #E8505B 0%, #FFB23F 100%)',
];

export const SHOW_BIOS = {
  "morning-wake-up-call": "Tony Stuart is a North Bay native, a former Canadian Armed Forces musician and a retired high school music teacher who now lives in Perth, Ontario. He starts your weekday with the classics, and also co-hosts two weekend programs with Aaron Badgley.",
  "ella-mack": "Ella Mack is a Canadian media personality who has returned home to Niagara after years in Australia. She holds a media degree, worked as a journalist in Asia and Australia, and was admitted as a barrister and solicitor in Australia. The Smart Living Show returns soon, weekdays 3–6 PM on CFAJ.",
  "x-zone-radio": "Created and hosted by Rob McConnell, The 'X' Zone covers the paranormal, UFOs, conspiracies and the unexplained, with the \"who’s who\" of the field as guests. Weeknights from 10 PM to midnight.",
  "8-days-this-week": "Tony Stuart and Aaron Badgley review the top 8 rock ’n’ roll history stories and music news of the week-that-was, and how they connect.",
  "from-memphis-to-merseyside": "A journey from Elvis at Sun Records in 1954 to 1980. Each episode has a new theme and a Billboard chart, hosted by Tony Stuart and Aaron Badgley.",
  "musicology": "Classic tracks, B-sides and rarities, and the facts behind them, presented by Larry Love, a broadcaster with over 35 years of experience.",
  "rock-n-roll-bandstand": "Robert E Sox (born Robert Stephen Legault in Toronto) is a former drummer and mobile DJ, later of the WRNR Radio Road Show. Now retired in Playas, Ecuador, he returned to the air in May 2021 with the best of the 50s, 60s and 70s. Walter Scott James produces the show.",
  "old-school-dance": "Walter Scott James and Allnight Esquire spin oldies from the 50s through the 90s, like a night at the old school dance, with live shows and syndicated programming."
};

export const SHOW_EXTRAS = {
  'x-zone-radio': { email: 'xzone@classic1220.ca', gallery: ['/images/xzone-award.jpg'] },
  'ella-mack': { email: 'ella.mack@classic1220.ca' },
  musicology: { email: 'MusicologyAM@radiologist.net' },
};

export const ALL_SHOWS = [...SHOWS.weekdays, ...SHOWS.weekends].map((s) => ({ ...s, bio: SHOW_BIOS[s.slug], ...SHOW_EXTRAS[s.slug] }));
export const getShow = (slug) => ALL_SHOWS.find((s) => s.slug === slug);

export const HOST_SHOW_SLUG = {
  'Tony Stuart': 'morning-wake-up-call',
  'Ella Mack': 'ella-mack',
  'Rob McConnell': 'x-zone-radio',
  'Aaron Badgley': '8-days-this-week',
  'Larry Love': 'musicology',
  'Robert E Sox': 'rock-n-roll-bandstand',
  'Walter Scott James': 'old-school-dance',
  'Allnight Esquire': 'old-school-dance',
};

export const EXTERNAL = {
  weather: 'https://forecast7.com/en/43d16n79d25/st-catharines/',
  niagaraBridges: 'https://www.niagarafallsbridges.com/',
  seawayBridges: 'https://greatlakes-seaway.com/en/recreational-boating/bridge-status/',
};

export const TRAFFIC = [
  { title: 'Niagara Falls bridges', image: '/images/traffic-niagara.webp', href: EXTERNAL.niagaraBridges },
  { title: 'St. Lawrence Seaway bridge status', image: '/images/traffic-seaway.webp', href: EXTERNAL.seawayBridges },
];

export const SPONSORS = [
  { name: 'CheckSite Websites & SEO', image: '/images/checksite.png', href: 'https://checksite.ca' },
  { name: 'Immigration & Visa Consulting', image: '/images/icc.png', href: 'https://iccimmigration.ca/' },
  { name: 'ITC School', image: '/images/itcschool.png', href: 'https://ictschools.com/' },
  { name: 'Little Peter and the Elegants', image: '/images/little-peter.png', href: 'https://www.littlepeterandtheelegants.com/' },
];

export const BUMPERS = ['/images/bumper-1.png', '/images/bumper-2.png', '/images/bumper-3.png', '/images/bumper-4.png'];

export const ABOUT_HISTORY = [
  'Classic 1220 CFAJ AM serves St. Catharines, Thorold and the surrounding area in the beautiful Niagara Region.',
  'Our predecessor, 1220 CHSC, was founded by Robert (Bob) Redmond on Queenston Street in St. Catharines and operated from 1967 to 2010. For over four decades it was home to a “who’s who” of Niagara radio personalities and staff.',
  'Classic 1220 brings hometown radio back to 1220 AM with the best of the 60’s, 70’s and 80’s music, together with the news, sports and events that affect your daily life here and around the Golden Horseshoe.',
  'Thank you for making Classic 1220 your hometown radio station. After all, we’re All About This Town.',
];

export const AD_EXTRA = {
  headline: 'Promote your business on Classic 1220 and watch your business grow.',
  banner: {
    title: "We're selling website ad banners",
    text: 'Put your brand in front of a targeted Niagara audience interested in local news, events and businesses. Contact our sales team for rates and availability.',
  },
};

export const PRIVACY = [
  ['Information we collect', 'We collect information you give us when you subscribe, send an enquiry or apply for a position, along with general website usage data such as pages visited.'],
  ['Cookies and analytics', 'This website may use cookies and analytics tools, such as Google Analytics, to understand how the site is used. You can disable cookies in your browser settings.'],
  ['How we use your information', 'We use it to respond to enquiries, send the newsletter, contests and special offers you asked for, and improve the website. We do not sell your personal information.'],
  ['Security and transfers', 'We take reasonable steps to protect your information. Some service providers may process data outside Canada.'],
  ['Third-party links', 'Our site links to other websites (TuneIn, sponsors, traffic and weather services). We are not responsible for their privacy practices.'],
  ['Your rights', 'You may ask to access, correct or delete your personal information, or unsubscribe at any time, by contacting info@classic1220.ca.'],
  ['Changes to this policy', 'We may update this policy from time to time. The latest version is always on this page.'],
];

// Rotating headline slides for the home-page hero.
export const HERO_SLIDES = [
  { top: 'The soundtrack', accent: 'of your life.', text: "Re-discover Classic 1220 — the best in 60's, 70's and 80's music in the Niagara Region, plus the news, sports and events that matter here at home." },
  { top: 'Your hometown', accent: 'radio station.', text: 'Serving St. Catharines, Thorold and the surrounding area in the beautiful Niagara Region.' },
  { top: "The best of the", accent: "60's, 70's & 80's.", text: 'Songs that have become the soundtrack of your lives — all day, every day on 1220 AM.' },
  { top: 'All about', accent: 'this town.', text: 'Local news, sports and events that affect your daily life here and around the Golden Horseshoe.' },
  { top: 'Listen live,', accent: 'anywhere.', text: 'On the dial at 1220 AM, online, or on TuneIn — Classic 1220 goes wherever you do.' },
];

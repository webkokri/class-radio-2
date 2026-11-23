// Content for the /advertise page (modelled on classic-radio.vercel.app/advertise).

export const AD_OPTIONS = [
  { id: 'radio', chip: 'Radio spots', tag: 'ON AIR', onAir: true, spec: ':15 · :30 · :60', title: 'Radio spots', blurb: 'Your ad on 1220 AM during the shows your customers listen to. We can write and voice it for you.' },
  { id: 'sponsor', chip: 'Show sponsorship', tag: 'ON AIR', onAir: true, spec: 'Per show', title: 'Show sponsorship', blurb: '“Brought to you by” mentions on a favourite like Morning Wake Up Call, Old School Dance or From Memphis to Merseyside.' },
  { id: 'web', chip: 'Website banners', tag: 'ONLINE', onAir: false, spec: '728 × 90 · 300 × 250', title: 'Website banners', blurb: 'Leaderboard at the top of every page (A) or the sidebar beside local news and weather (B).' },
  { id: 'mobile', chip: 'Mobile banner', tag: 'ONLINE', onAir: false, spec: '320 × 50', title: 'Mobile banner', blurb: 'Reach listeners on their phones as they check the schedule or tune in (C).' },
  { id: 'listing', chip: 'Featured listing', tag: 'ONLINE', onAir: false, spec: 'Community board', title: 'Featured listing', blurb: 'Pin your business, sale or event to the top of the Community board, with an optional on-air mention.' },
  { id: 'events', chip: 'Event promotion', tag: 'ON AIR + ONLINE', onAir: true, spec: 'Campaign', title: 'Event promotion', blurb: 'A short burst of spots, banners and a listing to fill the room for your concert, opening or fundraiser.' },
];

export const AD_PACKAGES = [
  { name: 'Online Starter', short: 'Online Starter', pitch: 'Get your name on the site this month.', price: null, featured: false, items: ['Sidebar banner (300 × 250)', 'Mobile banner (320 × 50)', 'Featured business listing'] },
  { name: 'On Air + Online', short: 'On Air + Online', pitch: 'Heard on 1220 AM and seen on every page.', price: null, featured: true, items: ['Weekly radio spots', 'Leaderboard banner (728 × 90)', 'Mobile banner (320 × 50)', 'Free ad production for your spot'] },
  { name: 'Presenting Sponsor', short: 'Presenting Sponsor', pitch: 'Own a show your customers love.', price: null, featured: false, items: ['“Presented by” on a show you pick', 'Logo on that show’s page', 'Everything in On Air + Online'] },
];

export const AD_WHY = [
  { stat: '2 hrs', title: 'Close to the moment of purchase', text: 'Radio reaches consumers within about two hours of their largest daily purchase.' },
  { icon: '💲', title: 'Costs less than other major media', text: 'Campaigns are sized to your budget, from a single banner to a full on-air schedule.' },
  { icon: '📍', title: 'Truly local to Niagara', text: 'Your message reaches listeners in St. Catharines, Thorold and across the region, on air and online.' },
];

export const AD_STEPS = [
  { title: 'Tell us about your business', text: 'Fill in the form or call the sales line. We’ll ask who your customers are and what you want to spend.' },
  { title: 'We build your campaign', text: 'Send your banner and script, or let our team write and voice your spot.' },
  { title: 'Go live across Niagara', text: 'Your ad runs on 1220 AM and classic1220.ca, and we keep you posted on how it’s doing.' },
];

export const AD_BUDGETS = ['Not sure yet — help me decide', 'Under $500', '$500 – $1,500', 'Over $1,500'];

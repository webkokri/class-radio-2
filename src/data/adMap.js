// Single source of truth for the "where your banner appears" diagram.
// The diagram on the Advertise and Home pages is drawn automatically from this file.
// Coordinates are percentages (x, y, w, h) inside each device wireframe. Add or edit a placement and the map and legend update.

export const DEVICES = {
  web: { title: 'Website', sub: 'classic1220.ca · desktop & tablet', ratio: '16 / 11' },
  app: { title: 'Mobile app', sub: 'iOS & Android', ratio: '9 / 17' },
};

// Decorative wireframe blocks (not for sale)
export const BLOCKS = {
  web: [
    { x: 0, y: 0, w: 100, h: 8, label: 'Header & menu' },
    { x: 0, y: 8, w: 100, h: 4, label: 'Live ticker' },
    { x: 4, y: 24, w: 92, h: 14, label: 'Hero · live player' },
    { x: 4, y: 41, w: 28, h: 14, label: 'Shows' },
    { x: 34, y: 41, w: 28, h: 14, label: 'Shows' },
    { x: 4, y: 58, w: 36, h: 20, label: 'Weather & border' },
    { x: 42, y: 58, w: 28, h: 20, label: 'Markets' },
  ],
  app: [
    { x: 0, y: 0, w: 100, h: 7, label: 'App bar' },
    { x: 4, y: 17, w: 92, h: 12, label: 'Now playing' },
    { x: 4, y: 32, w: 92, h: 14, label: 'Weather & border' },
    { x: 4, y: 49, w: 92, h: 11, label: 'Shows' },
    { x: 4, y: 76, w: 92, h: 7, label: 'Mini player' },
    { x: 0, y: 94, w: 100, h: 6, label: 'Tab bar' },
  ],
};

// Sellable ad placements
export const PLACEMENTS = [
  { id: 'web-leaderboard', device: 'web', n: 1, name: 'Leaderboard', size: '728 × 90', where: 'Top of every page', x: 14, y: 14, w: 72, h: 7 },
  { id: 'web-rectangle', device: 'web', n: 2, name: 'Sidebar rectangle', size: '300 × 250', where: 'Niagara Today widgets · Home & /traffic', x: 72, y: 41, w: 24, h: 37 },
  { id: 'web-sponsors', device: 'web', n: 3, name: 'Footer sponsor strip', size: '1000 × 200', where: 'Bottom of every page', x: 4, y: 84, w: 92, h: 10 },
  { id: 'app-top', device: 'app', n: 4, name: 'Top banner', size: '320 × 50', where: 'Under the app bar on every screen', x: 4, y: 8, w: 92, h: 6 },
  { id: 'app-infeed', device: 'app', n: 5, name: 'In-feed rectangle', size: '300 × 250', where: 'Between Home widgets', x: 4, y: 62, w: 92, h: 12 },
  { id: 'app-player', device: 'app', n: 6, name: 'Player banner', size: '320 × 50', where: 'Above the tab bar, beside the mini player', x: 4, y: 85, w: 92, h: 7 },
];

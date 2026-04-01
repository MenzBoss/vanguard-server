require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const slugify = require('slugify');
const connectDB = require('../config/db');
const News = require('../models/News');
const Player = require('../models/Player');
const Match = require('../models/Match');
const Gallery = require('../models/Gallery');
const Video = require('../models/Video');
const Transfer = require('../models/Transfer');
const Admin = require('../models/Admin');

const news = [
  {
    title: 'FC Vanguard Sign Striker Marcus Adeola from Riverside FC',
    slug: 'fc-vanguard-sign-striker-marcus-adeola',
    excerpt: 'The club is delighted to announce the signing of prolific striker Marcus Adeola on a three-year deal.',
    content: '<p>FC Vanguard are thrilled to confirm the signing of striker <strong>Marcus Adeola</strong> from Riverside FC for an undisclosed fee. The 24-year-old Nigerian international joins the club on a three-year deal with an option to extend.</p><p>Adeola scored 18 goals in all competitions last season and is widely regarded as one of the most exciting young forwards in the division.</p><p>"I am very happy to be here. This club has huge ambitions and I want to be part of that journey," said Adeola after completing his medical.</p>',
    image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&q=80',
    category: 'Transfer',
    featured: true,
    published: true,
  },
  {
    title: 'Match Report: Vanguard Win 3-1 in Derby Classic',
    slug: 'match-report-vanguard-win-3-1-derby',
    excerpt: 'A stunning first-half performance propelled FC Vanguard to a comprehensive victory over city rivals North City.',
    content: '<p>FC Vanguard delivered one of their finest performances of the season in Sunday\'s local derby, running out <strong>3-1</strong> winners against rivals North City at Vanguard Stadium.</p><p>Goals from Carlos Mendes (12\'), Liam Hughes (34\', pen) and substitute Daniel Park (78\') gave Vanguard their eighth home win of the season.</p><p>Head coach James Hartley praised his side\'s intensity and clinical edge in front of goal.</p>',
    image: 'https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=800&q=80',
    category: 'Match Report',
    featured: true,
    published: true,
  },
  {
    title: 'Youth Academy Players Called Up to National U-21 Squad',
    slug: 'youth-academy-u21-national-call-up',
    excerpt: 'Three FC Vanguard Academy graduates have received their first international call-ups for the Under-21 national team.',
    content: '<p>FC Vanguard are extremely proud to announce that three members of our Academy have received their first call-ups to the national Under-21 squad for the upcoming European qualifiers.</p><p>Midfielder <strong>Tyler Brooks</strong>, winger <strong>Kojo Mensah</strong> and goalkeeper <strong>Ryan Slater</strong> have all been named in the squad, rewarding years of hard work and dedication at the Academy.</p>',
    image: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=800&q=80',
    category: 'Youth',
    featured: true,
    published: true,
  },
  {
    title: 'New Kit Launch: The 2024/25 Home & Away Strip Revealed',
    slug: 'new-kit-launch-2024-25',
    excerpt: 'FC Vanguard have unveiled their stunning new home and away kits for the 2024/25 season in collaboration with the official kit partner.',
    content: '<p>FC Vanguard are delighted to reveal the new home and away kits for the <strong>2024/25 season</strong>. The new home kit maintains the classic navy and gold colour scheme but features a bold new crest design and modern tailoring for improved performance on the pitch.</p><p>The away kit introduces a clean all-white design with gold trim, inspired by the club\'s historic European campaigns.</p>',
    image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&q=80',
    category: 'Club News',
    featured: true,
    published: true,
  },
  {
    title: 'Community Open Day: Join Us at Vanguard Stadium',
    slug: 'community-open-day-vanguard-stadium',
    excerpt: 'FC Vanguard invites all fans and families to a free Community Open Day at the stadium this Sunday.',
    content: '<p>We are excited to invite the entire FC Vanguard community to our annual <strong>Community Open Day</strong> this Sunday, 10am–4pm. Entry is free for all!</p><p>Activities include pitch tours, meet-the-players sessions, autograph signings, a kids football clinic, and much more.</p>',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80',
    category: 'Community',
    featured: false,
    published: true,
  },
  {
    title: 'Manager Hartley Signs New Two-Year Contract Extension',
    slug: 'manager-hartley-contract-extension',
    excerpt: 'FC Vanguard are delighted to announce that Head Coach James Hartley has signed a new two-year contract extension.',
    content: '<p>The club is delighted to confirm that <strong>Head Coach James Hartley</strong> has put pen to paper on a new two-year contract extension, keeping him at FC Vanguard until 2027.</p><p>Hartley, who was appointed three years ago, has led the club to two consecutive top-three finishes and a League Cup triumph last season.</p>',
    image: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&q=80',
    category: 'Club News',
    featured: false,
    published: true,
  },
];

const players = [
  { name: 'Ryan Slater', position: 'Goalkeeper', number: 1, nationality: 'English', age: 25, appearances: 28, goals: 0, assists: 0 },
  { name: 'Tobias Lehmann', position: 'Goalkeeper', number: 13, nationality: 'German', age: 29, appearances: 4, goals: 0, assists: 0 },
  { name: 'Anthony Diallo', position: 'Defender', number: 2, nationality: 'French', age: 27, appearances: 26, goals: 1, assists: 3 },
  { name: 'Brett Morrison', position: 'Defender', number: 4, nationality: 'Scottish', age: 31, appearances: 28, goals: 2, assists: 1 },
  { name: 'Oluwaseun Bello', position: 'Defender', number: 5, nationality: 'Nigerian', age: 23, appearances: 22, goals: 0, assists: 0 },
  { name: 'Lucas Ferreira', position: 'Defender', number: 3, nationality: 'Brazilian', age: 28, appearances: 25, goals: 1, assists: 4 },
  { name: 'James Holt', position: 'Defender', number: 6, nationality: 'English', age: 26, appearances: 20, goals: 0, assists: 1 },
  { name: 'Tyler Brooks', position: 'Midfielder', number: 8, nationality: 'English', age: 21, appearances: 18, goals: 3, assists: 5 },
  { name: 'Carlos Mendes', position: 'Midfielder', number: 10, nationality: 'Portuguese', age: 29, appearances: 27, goals: 9, assists: 8 },
  { name: 'Kojo Mensah', position: 'Midfielder', number: 7, nationality: 'Ghanaian', age: 22, appearances: 24, goals: 4, assists: 7 },
  { name: 'Declan Walsh', position: 'Midfielder', number: 14, nationality: 'Irish', age: 24, appearances: 21, goals: 2, assists: 3 },
  { name: 'Paulo Santos', position: 'Midfielder', number: 16, nationality: 'Spanish', age: 26, appearances: 19, goals: 1, assists: 6 },
  { name: 'Marcus Adeola', position: 'Forward', number: 9, nationality: 'Nigerian', age: 24, appearances: 28, goals: 18, assists: 4 },
  { name: 'Liam Hughes', position: 'Forward', number: 11, nationality: 'Welsh', age: 27, appearances: 26, goals: 12, assists: 3 },
  { name: 'Daniel Park', position: 'Forward', number: 19, nationality: 'Korean', age: 23, appearances: 22, goals: 7, assists: 5 },
];

const matches = [
  { homeTeam: 'FC Vanguard', awayTeam: 'North City', date: new Date('2025-01-12'), matchday: 21, competition: 'League', status: 'completed', homeScore: 3, awayScore: 1 },
  { homeTeam: 'Riverside FC', awayTeam: 'FC Vanguard', date: new Date('2025-01-19'), matchday: 22, competition: 'League', status: 'completed', homeScore: 0, awayScore: 2 },
  { homeTeam: 'FC Vanguard', awayTeam: 'Eastford AFC', date: new Date('2025-01-26'), matchday: 23, competition: 'League', status: 'completed', homeScore: 1, awayScore: 1 },
  { homeTeam: 'Southern Utd', awayTeam: 'FC Vanguard', date: new Date('2025-02-02'), matchday: 24, competition: 'League', status: 'completed', homeScore: 0, awayScore: 1 },
  { homeTeam: 'FC Vanguard', awayTeam: 'West Park', date: new Date('2025-02-09'), matchday: 25, competition: 'League', status: 'completed', homeScore: 4, awayScore: 0 },
  { homeTeam: 'Central Town', awayTeam: 'FC Vanguard', date: new Date('2025-02-16'), matchday: 26, competition: 'League', status: 'completed', homeScore: 1, awayScore: 2 },
  { homeTeam: 'FC Vanguard', awayTeam: 'Harbor City', date: new Date('2025-02-23'), matchday: 27, competition: 'League', status: 'completed', homeScore: 2, awayScore: 0 },
  { homeTeam: 'North City', awayTeam: 'FC Vanguard', date: new Date('2025-03-02'), matchday: 28, competition: 'League', status: 'completed', homeScore: 1, awayScore: 2 },
  { homeTeam: 'FC Vanguard', awayTeam: 'Riverside FC', date: new Date('2025-03-23'), matchday: 29, competition: 'League', venue: 'Vanguard Stadium', status: 'upcoming' },
  { homeTeam: 'Eastford AFC', awayTeam: 'FC Vanguard', date: new Date('2025-03-30'), matchday: 30, competition: 'League', status: 'upcoming' },
  { homeTeam: 'FC Vanguard', awayTeam: 'Southern Utd', date: new Date('2025-04-06'), matchday: 31, competition: 'League', venue: 'Vanguard Stadium', status: 'upcoming' },
  { homeTeam: 'Harbor City', awayTeam: 'FC Vanguard', date: new Date('2025-04-13'), matchday: 32, competition: 'League', status: 'upcoming' },
  { homeTeam: 'FC Vanguard', awayTeam: 'Central Town', date: new Date('2025-04-20'), matchday: 33, competition: 'League', venue: 'Vanguard Stadium', status: 'upcoming' },
  { homeTeam: 'FC Vanguard', awayTeam: 'North City', date: new Date('2025-04-27'), matchday: 34, competition: 'Cup', venue: 'Vanguard Stadium', status: 'upcoming' },
];

const gallery = [
  { title: 'Match Day Action', image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&q=80', category: 'Match Day', featured: true },
  { title: 'Vanguard Stadium', image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80', category: 'Stadium', featured: true },
  { title: 'Morning Training', image: 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?w=800&q=80', category: 'Training', featured: true },
  { title: 'Goal Celebration', image: 'https://images.unsplash.com/photo-1571771019784-3ff35f4f4277?w=800&q=80', category: 'Match Day', featured: true },
  { title: 'Night Match', image: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&q=80', category: 'Match Day', featured: true },
  { title: 'Trophy Cabinet', image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&q=80', category: 'Events', featured: true },
  { title: 'Community Day', image: 'https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=800&q=80', category: 'Community', featured: false },
  { title: 'Player Warmup', image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&q=80', category: 'Training', featured: false },
];

const transfers = [
  { playerName: 'Marcus Adeola', type: 'IN', fromClub: 'Riverside FC', fee: '£4.2M', position: 'Forward', nationality: 'Nigerian', date: new Date('2025-01-10'), season: '2024/25' },
  { playerName: 'Paulo Santos', type: 'IN', fromClub: 'Atletico Sevilla', fee: '£2.8M', position: 'Midfielder', nationality: 'Spanish', date: new Date('2024-08-20'), season: '2024/25' },
  { playerName: 'Tyler Brooks', type: 'IN', fromClub: 'Academy', fee: 'Free', position: 'Midfielder', nationality: 'English', date: new Date('2024-07-01'), season: '2024/25' },
  { playerName: 'Raymond Cole', type: 'OUT', toClub: 'West Park', fee: '£1.5M', position: 'Forward', nationality: 'English', date: new Date('2024-08-31'), season: '2024/25' },
  { playerName: 'Stefan Novak', type: 'OUT', toClub: 'Central Town', fee: 'Free', position: 'Defender', nationality: 'Czech', date: new Date('2024-08-25'), season: '2024/25' },
  { playerName: 'Kwame Otieno', type: 'LOAN IN', fromClub: 'Premier Giants FC', fee: 'Loan', position: 'Defender', nationality: 'Kenyan', date: new Date('2025-01-31'), season: '2024/25' },
];

const videos = [
  { title: 'Match Highlights: Epic 3-2 Comeback Victory', youtubeId: 'FfW16nGbJRA', duration: '8:47', category: 'Match Highlights', featured: true },
  { title: 'Best Goals of the Season | Top 10 Stunning Strikes', youtubeId: 'aEWNNbiEaltE', duration: '10:23', category: 'Match Highlights', featured: true },
  { title: 'Training Session | Skills & Drills Behind the Scenes', youtubeId: 'VcB_vHPLmH4', duration: '5:12', category: 'Training', featured: false },
  { title: 'Tactical Analysis | Breaking Down the 4-3-3 Formation', youtubeId: 'D0CjyJz_5zs', duration: '7:18', category: 'Behind the Scenes', featured: false },
  { title: 'Youth Academy Highlights | Rising Stars Showcase', youtubeId: 'ThrS9IA5RjY', duration: '6:05', category: 'Youth Academy', featured: false },
  { title: 'Player Interview: Captain\'s Thoughts on Derby Match', youtubeId: 'Gzs-3sMksTA', duration: '12:34', category: 'Interviews', featured: false },
];

async function seed() {
  try {
    await connectDB();
    console.log('Connected to MongoDB. Seeding...');

    await Promise.all([
      News.deleteMany({}),
      Player.deleteMany({}),
      Match.deleteMany({}),
      Gallery.deleteMany({}),
      Video.deleteMany({}),
      Transfer.deleteMany({}),
      Admin.deleteMany({}),
    ]);

    await News.insertMany(news);
    console.log(`✓ ${news.length} news articles seeded`);

    await Player.insertMany(players);
    console.log(`✓ ${players.length} players seeded`);

    await Match.insertMany(matches);
    console.log(`✓ ${matches.length} matches seeded`);

    await Gallery.insertMany(gallery);
    console.log(`✓ ${gallery.length} gallery images seeded`);

    await Video.insertMany(videos);
    console.log(`✓ ${videos.length} videos seeded`);

    await Transfer.insertMany(transfers);
    console.log(`✓ ${transfers.length} transfers seeded`);

    const admin = await Admin.create({
      name: 'Admin',
      email: process.env.ADMIN_EMAIL || 'admin@fcvanguard.com',
      password: process.env.ADMIN_PASSWORD || 'admin123',
    });
    console.log(`✓ Admin created: ${admin.email}`);

    console.log('\n✅ Database seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

seed();

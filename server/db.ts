import Database from 'better-sqlite3';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { v4 as uuidv4 } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dbPath = process.env.DATABASE_PATH || './database.sqlite';
const db = new Database(dbPath);

// Initialize database
export function initDatabase() {
  const schema = readFileSync(join(__dirname, 'schema.sql'), 'utf-8');
  db.exec(schema);
  console.log('✅ Database initialized');
  
  // Seed sample posts if empty
  const count = db.prepare('SELECT COUNT(*) as count FROM posts').get() as { count: number };
  
  if (count.count === 0) {
    seedPosts();
  }
}

function seedPosts() {
  const posts = [
    {
      id: uuidv4(),
      slug: 'fast-modern-sites',
      title: 'Fast & Modern Sites: Why Performance Matters',
      author: 'Maria Papadopoulos',
      date: new Date('2024-12-15').toISOString(),
      categories: 'Website Tips,Local SEO',
      excerpt: 'Learn why website speed is critical for small businesses and how to achieve blazing-fast load times that convert visitors into customers.',
      content: `# Fast & Modern Sites: Why Performance Matters

In today's digital landscape, website speed isn't just a nice-to-have—it's essential for small business success. Studies show that 53% of mobile users abandon sites that take longer than 3 seconds to load.

## Why Speed Matters for Small Businesses

When you're competing with larger companies, every advantage counts. A fast website:

- **Improves user experience**: Visitors stay longer and explore more pages
- **Boosts SEO rankings**: Google prioritizes fast-loading sites
- **Increases conversions**: Faster sites convert better—it's that simple
- **Reduces bounce rates**: Users won't wait around for slow pages

## Key Performance Principles

### 1. Optimize Images

Images are often the biggest culprit in slow load times. Use modern formats like WebP, compress files, and implement lazy loading for images below the fold.

### 2. Minimize JavaScript

Heavy JavaScript frameworks can bloat your site. Choose lightweight solutions and only load what you need.

### 3. Leverage Browser Caching

Configure your server to cache static assets, reducing load times for returning visitors.

### 4. Use a CDN

Content Delivery Networks distribute your site across multiple servers worldwide, serving content from the closest location to each user.

## Measuring Success

Use tools like Google Lighthouse, PageSpeed Insights, and WebPageTest to measure your site's performance. Aim for:

- **First Contentful Paint**: Under 1.8 seconds
- **Largest Contentful Paint**: Under 2.5 seconds
- **Time to Interactive**: Under 3.8 seconds

## Getting Started

At GreenPeak Solutions, we build performance into every site from day one. Our sites consistently score 90+ on Google Lighthouse, giving our clients a competitive edge.

Ready to speed up your site? [Get in touch](/contact) for a free performance audit.`,
      featured_image: '/images/placeholders/performance.jpg',
      published: 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: uuidv4(),
      slug: 'local-seo-basics',
      title: 'Local SEO Basics: Get Found in Your Community',
      author: 'Dimitris Antonopoulos',
      date: new Date('2024-12-10').toISOString(),
      categories: 'Local SEO,Content Marketing',
      excerpt: 'Master the fundamentals of local SEO and help nearby customers discover your small business online. Practical tips for immediate results.',
      content: `# Local SEO Basics: Get Found in Your Community

For small businesses, local SEO is one of the most powerful (and affordable) marketing strategies available. When someone in your area searches for your services, you want to be the first result they see.

## What is Local SEO?

Local SEO optimizes your online presence to attract customers from relevant local searches. Think "coffee shop near me" or "plumber in Athens"—these searches have strong purchase intent.

## Essential Local SEO Strategies

### 1. Claim Your Google Business Profile

Your Google Business Profile (formerly Google My Business) is crucial. Make sure to:

- Complete every section of your profile
- Add high-quality photos of your business
- Encourage and respond to customer reviews
- Keep your hours and contact info updated
- Post regular updates and offers

### 2. Optimize for Local Keywords

Include your city, neighborhood, or region in:

- Page titles and meta descriptions
- Header tags and body content
- Image alt text
- URL structures

Natural integration is key—avoid keyword stuffing.

### 3. Build Local Citations

List your business on relevant directories:

- Industry-specific directories
- Local chamber of commerce
- Online yellow pages
- Review sites like Yelp

Ensure your NAP (Name, Address, Phone) is consistent across all platforms.

### 4. Gather Customer Reviews

Reviews are social proof and a ranking factor. Encourage satisfied customers to leave reviews on:

- Google Business Profile
- Facebook
- Industry-specific review sites

Always respond professionally to both positive and negative reviews.

### 5. Create Location-Specific Content

Write blog posts about:

- Local events you're involved in
- Community news related to your industry
- Guides specific to your area
- Customer success stories

## Mobile Optimization is Critical

Most local searches happen on mobile devices. Ensure your site:

- Loads quickly on mobile networks
- Has clear, tappable buttons
- Displays your phone number prominently
- Is easy to navigate with thumbs

## Tracking Your Results

Monitor your progress with:

- Google Business Profile insights
- Google Analytics (local traffic)
- Local ranking tools
- Conversion tracking

## Take Action Today

Local SEO isn't complicated, but it does require consistent effort. Start with your Google Business Profile and build from there.

Need help with your local SEO strategy? [Contact us](/contact) for a free consultation.`,
      featured_image: '/images/placeholders/local-seo.jpg',
      published: 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: uuidv4(),
      slug: 'sustainable-marketing-101',
      title: 'Sustainable Marketing 101: Grow Without the Greenwashing',
      author: 'Maria Papadopoulos',
      date: new Date('2024-12-05').toISOString(),
      categories: 'Content Marketing,Case Studies',
      excerpt: 'Authentic sustainable marketing strategies for small businesses. Build trust, attract conscious customers, and grow responsibly.',
      content: `# Sustainable Marketing 101: Grow Without the Greenwashing

Sustainable marketing isn't just a trend—it's the future of business. Consumers increasingly prefer brands that share their values, but they're also quick to spot greenwashing. Here's how to market sustainably and authentically.

## What is Sustainable Marketing?

Sustainable marketing promotes products and practices that benefit society and the environment while building long-term customer relationships. It's about:

- Honest communication
- Genuine environmental commitment
- Social responsibility
- Long-term thinking over quick wins

## Why Small Businesses Have an Advantage

Large corporations struggle with authenticity because of complex supply chains and bureaucracy. Small businesses can:

- Make changes quickly
- Communicate directly with customers
- Show real impact at a local level
- Build genuine community relationships

## Avoid Greenwashing

Greenwashing erodes trust. Avoid these pitfalls:

### Don't Make Vague Claims

❌ "Eco-friendly"  
✅ "Made with 100% recycled materials from local sources"

### Don't Hide Trade-offs

Be transparent about areas where you're still improving. Customers appreciate honesty.

### Don't Use Misleading Imagery

Green colors and nature photos don't make products sustainable. Show real practices.

## Sustainable Marketing Strategies

### 1. Content Marketing with Purpose

Create valuable content that educates and empowers:

- How-to guides that help customers make better choices
- Transparent behind-the-scenes looks at your practices
- Honest discussions about industry challenges
- Community stories and partnerships

### 2. Digital-First Approach

Reduce environmental impact:

- Choose energy-efficient web hosting
- Optimize website performance (faster = less energy)
- Use digital tools instead of printed materials
- Embrace remote collaboration

### 3. Community Engagement

Build relationships beyond transactions:

- Partner with local environmental initiatives
- Support community causes authentically
- Create customer referral programs
- Host educational workshops or events

### 4. Measure and Share Impact

Track your efforts:

- Carbon footprint reduction
- Local economic impact
- Community contributions
- Waste reduction

Share results honestly, including areas for improvement.

## The Long-Term Approach

Sustainable marketing is marathon, not a sprint:

- Focus on customer lifetime value over quick sales
- Build community, not just audience
- Invest in content that remains valuable
- Prioritize authentic relationships

## Our Commitment

At GreenPeak Solutions, we practice what we preach:

- Energy-efficient hosting for all websites
- Performance optimization reduces energy use
- We support local environmental initiatives
- Our advice helps businesses grow responsibly

## Getting Started

You don't need to be perfect to start. Choose one area:

1. Audit your current practices
2. Pick one improvement to implement
3. Communicate changes honestly
4. Measure and iterate

Small steps compound over time.

Ready to build a sustainable marketing strategy? [Let's talk](/form) about your goals.`,
      featured_image: '/images/placeholders/sustainable.jpg',
      published: 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ];

  const insert = db.prepare(`
    INSERT INTO posts (id, slug, title, author, date, categories, excerpt, content, featured_image, published, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  for (const post of posts) {
    insert.run(
      post.id,
      post.slug,
      post.title,
      post.author,
      post.date,
      post.categories,
      post.excerpt,
      post.content,
      post.featured_image,
      post.published,
      post.created_at,
      post.updated_at
    );
  }

  console.log('✅ Seeded 3 sample blog posts');
}

export default db;

// Run initialization if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  initDatabase();
  db.close();
}

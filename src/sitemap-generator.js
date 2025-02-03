const { SitemapStream, streamToPromise } = require('sitemap');
const fs = require('fs');

const links = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/courses', changefreq: 'weekly', priority: 0.9 },
  { url: '/blogs', changefreq: 'weekly', priority: 0.8 },
  { url: '/contact', changefreq: 'monthly', priority: 0.7 },
  { url: '/aboutus', changefreq: 'monthly', priority: 0.7 },
  { url: '/services/101', priority: 0.6 },
  { url: '/services/102', priority: 0.6 },
  { url: '/course/1', priority: 0.8 },
  { url: '/course/2', priority: 0.8 },
  { url: '/profile/123', priority: 0.5 },
  { url: '/profile/456', priority: 0.5 },
  { url: '/jobs', priority: 0.7 },
  { url: '/jobs/j1', priority: 0.6 },
  { url: '/jobs/j2', priority: 0.6 },
  { url: '/login', priority: 0.4 },
  { url: '/signup', priority: 0.4 },
  { url: '/request', priority: 0.6 },
  { url: '/admin/users', priority: 0.3 },
  { url: '/admin/manage-courses', priority: 0.3 },
  { url: '/admin/create-course', priority: 0.3 },
  { url: '/admin/contacts', priority: 0.3 },
  { url: '/admin/bookings', priority: 0.3 },
  { url: '/admin/book-services', priority: 0.3 },
];

const stream = new SitemapStream({ hostname: 'https://dataskillshub.com' });

streamToPromise(links.map(link => stream.write(link)))
  .then(data => {
    fs.writeFileSync('./public/sitemap.xml', data.toString());
    console.log('✅ Sitemap successfully generated!');
  })
  .catch(err => console.error('❌ Error generating sitemap:', err));

stream.end();

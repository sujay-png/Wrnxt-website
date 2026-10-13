import type { ServicePageData } from '../types/services';

export const marketingService: ServicePageData = {
  title: 'Marketing', headline: 'Target the Right Audience Who Need Your Solution',
  description: 'We run social media ads, Google ads, and SEO campaigns that put your business in front of the right people and turn that attention into customers.',
  image: '/images/marketing-hero-img.png', imageAlt: 'Digital marketing team collaborating on a campaign',
  intro: [
    "A great product or service means nothing if your customers can't find you online. We build strategies that reach the right people at the right moment, whether that's a search result, social feed, or paid ad.",
    'We track what works and keep improving your results, so every rupee you invest works harder and delivers measurable returns.'
  ],
  sections: [
    { title: 'Social Media Ads', description: 'Campaigns designed to reach the right audience and drive meaningful action.', items: ['Facebook and Instagram campaigns','Audience research and targeting','Ad creative design and copywriting','A/B testing','Retargeting campaigns','Performance tracking and reporting'] },
    { title: 'Google Ads', description: 'Reach customers at the exact moment they are searching for what you offer.', items: ['Search campaigns','Display and remarketing ads','Shopping ads for e-commerce','Keyword research and bidding','Conversion-focused landing pages','Campaign monitoring and optimisation'] },
    { title: 'Search Engine Optimisation', description: 'Improve your visibility in search and bring the right customers to your website organically.', items: ['Keyword research and strategy','On-page SEO optimisation','Technical SEO audits','Search-focused content optimisation','Local SEO','Monthly performance reporting'] }
  ],
  audience: ['E-commerce businesses seeking consistent, converting traffic','Startups building visibility and credibility','Local businesses reaching nearby customers','Service businesses seeking qualified leads','Established brands improving return on ad spend','Businesses ready to grow beyond word-of-mouth'],
  ctaTitle: "Let's Get Your Business Found",
  ctaDescription: "Tell us about your business. We'll identify where your customers are searching and build a plan to put you in front of them."
};

export const mediaHouseService: ServicePageData = {
  title: 'Media House', headline: 'Grow Your Brand Online With End-to-End Media House Services',
  description: 'We create media that captures attention, tells your story, and turns viewers into paying customers.',
  image: '/images/MediaHouse18.jpeg', imageAlt: 'Creative media production',
  intro: [
    'Your audience scrolls past hundreds of posts, ads, and videos every day. Standing out takes media with the right visual, the right voice, and the right moment to grab attention.',
    'We create graphics, videos, and content that communicate your brand clearly and move your audience to act. From a single striking visual to a full campaign, we handle every stage so your brand shows up consistently and professionally.'
  ],
  sections: [
    { title: 'Graphic Design', description: 'Visuals that communicate your brand across social media, print, packaging, and more.', items: ['Social media graphics and creatives','Brand identity and logo design','Print and packaging design','Marketing collateral and brochures','Infographics and presentations','Banner and display ad design'] },
    { title: 'Visual Effects', description: 'The visual polish that makes content look bigger, bolder, and more memorable.', items: ['Motion graphics and animation','Green screen compositing','3D visual effects','Title sequences and lower thirds','Product visualisation effects','Film and video enhancement'] },
    { title: 'Photography & Video', description: 'Professional, authentic imagery and footage made for the platforms your audience uses.', items: ['Product photography','Corporate and event photography','Brand and lifestyle shoots','Video production and shooting','Drone photography and videography','On-location and studio shoots'] },
    { title: 'Editing & Content Writing', description: 'Turn raw footage and rough ideas into clear, engaging stories.', items: ['Video editing and post-production','Colour correction and grading','Blog and website content','Social media copywriting','Video and ad scripts','SEO-focused content'] },
    { title: 'Promotional Video', description: 'Explain what you do, build trust, and move viewers toward a decision.', items: ['Brand and product promos','Explainer videos','Corporate profile videos','Social media ad videos','Event highlight videos','Testimonials and case studies'] },
    { title: 'Voice Over & Reels', description: 'Short-form content built for how people watch, listen, and share today.', items: ['Professional voice recording','Instagram and YouTube reels','Short-form video content','Multilingual voice options','Reels scripting and concepts','Trend-aligned social content'] }
  ],
  audience: ['E-commerce brands needing product photography and ads','Startups building an identity and launch content','Restaurants and hospitality businesses','Educational institutions building trust','Corporate teams needing professional video and photography','Event organisers promoting memorable experiences','Growing brands whose content needs to catch up with ambition'],
  ctaTitle: "Let's Create Media That Gets Noticed",
  ctaDescription: "Tell us what you're promoting, and we'll show you how we'd bring it to life with content built around your brand."
};

export const hardwareSolutionsService: ServicePageData = {
  title: 'Hardware Solutions', headline: 'Hardware Solutions That Keep Your Business Running Securely',
  description: 'We set up, secure, and manage the servers, networks, and systems your business depends on, so your team stays focused on work.',
  image: '/images/Hardware29.jpeg', imageAlt: 'Business hardware and network infrastructure',
  intro: [
    'Software and strategy only get you so far if the hardware behind them keeps failing. A network that drops, a server that crashes, or an unknown security gap can cost you in downtime.',
    'We build and manage the physical infrastructure your business relies on, including servers, networks, and security systems. Your team spends less time troubleshooting and more time doing the work that grows your business.'
  ],
  sections: [
    { title: 'Server & Network Setup', description: 'Servers and networks designed around your business and its real workload.', items: ['Server installation and configuration','Network design and setup','Wired and wireless deployments','Server virtualisation','Firewall and network security','Performance testing and optimisation'] },
    { title: 'CCTV & Security Systems', description: 'Security systems that help protect your premises, assets, and people.', items: ['CCTV camera installation','Remote monitoring setup','Access control systems','Alarm and intrusion detection','Video storage and backup','System maintenance and support'] },
    { title: 'IT Infrastructure Management', description: 'End-to-end infrastructure management that catches issues before they become downtime.', items: ['Infrastructure monitoring','Preventive maintenance','System upgrades and patching','Backup and disaster recovery','IT asset management','Helpdesk and on-call support'] },
    { title: 'Hardware Procurement & Support', description: 'The right equipment for your needs and budget, with support throughout its lifecycle.', items: ['Hardware sourcing and procurement','Vendor coordination','Installation and configuration','Warranty and repair coordination','Equipment upgrades and replacements','Ongoing technical support'] }
  ],
  audience: ['Offices needing dependable networks and servers','Retail stores protecting stock and staff','Educational institutions securing campus networks','Healthcare facilities protecting sensitive data','Warehouses and industrial sites scaling infrastructure','Growing businesses outgrowing their current setup'],
  ctaTitle: "Let's Secure Your Infrastructure",
  ctaDescription: "Tell us what you're running on, and we'll help identify the gaps and build a plan to address them before they cost you."
};

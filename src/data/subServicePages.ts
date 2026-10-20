export interface SubServiceSection {
  heading: string;
  paragraphs: string[];
}

export interface SubServiceDeliverable {
  title: string;
  desc: string;
  points?: string[];
  extra?: string;
  sections?: SubServiceSection[];
}

export interface SubServiceMetric {
  val: string;
  label: string;
}

export interface SubServiceAccordionItem {
  title: string;
  desc: string;
}

export interface SubServiceData {
  slug: string;
  heading?: string;
  heading2?: string;
  subheading?: string;
  subheading2?: string;
  title: string;
  eyebrow: string;
  subtitle: string;
  intro?: string[];
  capabilities?: string[];
  accordion?: SubServiceAccordionItem[];
  benefitsAccordion?: SubServiceAccordionItem[];
  benefits?: string[];
  commitment?: {
    title: string;
    text: string;
  };
  previewTitle: string;
  previewTag: string;
  metrics: SubServiceMetric[];
  deliverables: SubServiceDeliverable[];
  stack: string[];
  idealFor: string;
  process: {
    step: string;
    title: string;
    desc: string;
  }[];
  relatedProjects: {
    title: string;
    client: string;
    category: string;
    href: string;
    desc: string;
  }[];
}

export const subServicesData: Record<string, SubServiceData> = {
  'web-app-development': {
    slug: 'web-app-development',
    heading:"What We Offer",
    subheading: "End-to-End Capabilities",
    heading2: "Key Benefits",
    subheading2: "Measurable Business Impact",
    title: 'Web App Development',
    eyebrow: 'Custom Software Engineering',
    subtitle: 'We build web applications that simplify how your customers interact with your business — scalable, secure, and designed to perform across every device.',
    intro: [
      "A successful web app simplifies how your customers interact with your business. At Akshara Digital, we specialise in web app development that drives digital transformation, combining the right technology & process to deliver results.",
      "We architect web apps that are user-friendly, scalable, and cost-effective; taking you from proof-of-concept to full-scale launch across web platforms.",
      "With 10+ years of experience, we have refined our methods and tools to accelerate delivery without compromising quality. From concept to launch, we build web apps that achieve maximum performance and deliver measurable results."
    ],
    capabilities: [
      'High-end web design',
      'Advanced and custom web development',
      'Customer Relationship Management (CRM)',
      'Cloud-based development solutions',
      'Enterprise web development',
      'Big data analytics',
      'E-commerce, B2B, and B2C development',
      'Payment gateway and third-party integrations'
    ],
    benefits: [
      'Higher user retention and improved conversion rates',
      'Enhanced performance, offline functionality, and a seamless user experience',
      'Faster load times across devices',
      'Push notifications and home-screen installation to drive re-engagement',
      "Automation of tasks that don't need human intervention, freeing your team to focus elsewhere"
    ],
    commitment: {
      title: 'Our Commitment',
      text: "We act as your trusted advisor, bringing expertise and integrity to every engagement. We tailor our approach to your specific needs, drawing on our experience and flexibility to deliver the outcome you're after — efficiently and without surprises."
    },
    previewTitle: 'Cloud SaaS, CRM & Enterprise Portal Architecture',
    previewTag: 'Next.js • Node.js • PostgreSQL • AWS',
    metrics: [
      { val: '99.98%', label: 'Cloud Uptime SLA' },
      { val: '<120ms', label: 'API Response Time' },
      { val: 'Multi-Tenant', label: 'Role-Based Security' }
    ],
    deliverables: [
      {
        title: 'Planning',
        desc: 'We plan every web app with the same discipline we bring to delivery. Our planning covers:',
        points: [
          'Gathering and analysing requirements',
          'Prototyping',
          'Running user-centric design workshops and iterations',
          'Planning test phases — integration, UAT, performance, and non-functional testing',
          'Managing stakeholder engagement throughout',
          'Preparing the team through training'
        ]
      },
      {
        title: 'Training',
        desc: 'We prepare a complete training plan to support your team as we roll out a new web app. Wherever possible, we partner closely with your in-house developers and transfer knowledge continuously throughout delivery. This reduces the need for a rushed training session at the end — your team learns as we build, not after we leave.'
      },
      {
        title: 'Quality Assurance & Performance Testing',
        desc: 'We test every app against the highest standards of quality and performance, so you can trust its reliability from day one. Our testing process includes:',
        points: [
          'Test strategy — we build an end-to-end testing strategy with full requirement traceability, the right test framework, test data management, and execution planning',
          'Test harness development — we set up the tooling and processes needed for repeatable, production-like test execution',
          'High-volume test management — we manage execution performance, identify bottlenecks, and tune for scale',
          'Test execution — we lead or support your team, contractors, or other suppliers through every test phase, through to a successful go-live'
        ]
      },
      {
        title: 'Ongoing Support',
        desc: 'We support your app wherever it lives:',
        points: [
          'On hosting or software you provide',
          'On hosting or software we provide',
          'On hosting or software a third party provides'
        ],
        extra: "We manage hosting across major cloud platforms, including AWS and support services like Firebase, Cloudflare & Vercel. We monitor your app's operational status, flag performance or stability issues early, and step in before they become downtime. We also track the lifecycle of every service you run, upgrading outdated components before they become a security risk. On the cost side, we optimize spending and resource allocation, so your investment keeps delivering returns — not just overhead."
      }
    ],
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'MongoDB', 'AWS', 'Docker', 'GitHub Actions'],
    idealFor: 'Startups building SaaS MVPs, service-based businesses automating client workflows, and enterprises modernising legacy operations.',
    process: [
      { step: '01', title: 'Careful Planning & Discovery', desc: 'We map your business goals, user flows, and technical architecture before writing code.' },
      { step: '02', title: 'UX-First Interface Design', desc: 'Clean, high-craft prototypes designed around real customer behavior and conversion.' },
      { step: '03', title: 'Clean Execution & Testing', desc: 'Iterative development sprints, API integrations, and thorough pre-launch QA.' },
      { step: '04', title: '24/7 Post-Launch Support', desc: 'Support that doesn’t disappear after launch — continuous monitoring and updates.' }
    ],
    relatedProjects: [
      {
        title: 'Empowering Communication. Connecting the Future',
        client: 'Electro Core Systems',
        category: 'High-Performing Website & IoT',
        href: '/projects/electro-core-systems',
        desc: 'Enterprise product showcase & dealer inquiry platform for commercial communication networks.'
      },
      {
        title: 'Your Brand, Our Craftsmanship — Bespoke Corporate Gifting',
        client: 'Abbeygate England / PUP Exports',
        category: 'Corporate Gifting & Bespoke Leather',
        href: '/projects/abbeygate-england',
        desc: 'Digital showcase for luxury bespoke leather goods and corporate merchandise.'
      }
    ]
  },

  'mobile-app-development': {
    slug: 'mobile-app-development',
    heading: 'Benefits of a Mobile App',
    subheading: 'Why Your Business Needs a Dedicated Mobile App',
    heading2: 'Who Needs a Mobile App',
    subheading2: 'A mobile app isn\'t only for tech giants and retail chains. If your business depends on repeat customers, time-sensitive transactions, or frequent customer contact, an app gives you a direct line to the people who keep your business running.',
    title: 'Make Your Brand Stand Out With Custom Mobile App',
    eyebrow: 'iOS & Android Engineering',
    subtitle: 'We build mobile apps that drive sales, strengthen loyalty, and grow your lifetime customer value',
    intro: [
      "We design and build custom mobile apps so you spend less on winning customers back and more time growing the relationships you already have. We follow the same disciplined process that goes into enterprise software and web application development.",
      
    ],
    accordion: [
      {
        title: 'Build a stronger brand.',
        desc: 'Mobile apps work as an extension of the brand by delivering the right service at the right moment. It also gives a direct line into how customers behave, so you can spot recurring issues and sharpen your product or service in response.'
      },
      {
        title: 'Connect with customers better.',
        desc: 'Users spend significantly more time using apps than mobile browsers. A mobile app reaches your customers wherever they are. Push notifications let you reach users with offers, updates, and reminders in a space with far less competition for attention than email or social media so your message is far more likely to actually get seen.'
      },
      {
        title: 'Capitalize on a niche.',
        desc: "A well-built app can help you stand out in a crowded market, especially if your competitors haven't invested in one yet. 85% shoppers prefer buying through an app over a mobile browser Features like an in-app chatbot or a faster, app-only checkout give customers a reason to choose you specifically, so you're meeting them where they already want to be."
      },
      {
        title: 'Improve customer engagement.',
        desc: 'People spend far more time inside apps than browsing a mobile site, which means more chances for you to engage them meaningfully. Features like saved favourites, wish lists, or built-in review prompts turn passive users into active participants and give you a direct channel to hear from your most engaged customers.'
      },
      {
        title: 'Personalize a marketing channel.',
        desc: "Today's customers expect offers that feel built for them. A mobile app lets you tailor discounts, recommendations, and promotions to each user individually, at scale. You can even use it to recognise meaningful moments such as a birthday, an anniversary, a milestone turning a transactional touchpoint into a personal one."
      },
      {
        title: 'Boost profits.',
        desc: 'Every investment you spend on improving customer experience shows up on your bottom line. Engaged, loyal app users convert more often and need less paid advertising to bring them back, which means your marketing budget stretches further. Investing in the user experience yields as much as 100% .'
      }
    ],
    capabilities: [
      'Native iOS App Development (Swift)',
      'Native Android App Development (Kotlin)',
      'Cross-Platform Apps (Flutter & React Native)',
      'Intuitive UI/UX & Micro-Interactions',
      'Realtime Cloud & Database Sync',
      'Offline-First Storage & Data Caching',
      'Payment Gateways & Hardware APIs',
      'App Store & Play Store Deployment'
    ],
    benefitsAccordion: [
      {
        title: 'E-commerce & Retail',
        desc: 'Retail brands compete for the same shoppers as everyone else in their category. An app gives a faster checkout and saved payment details so customers buy from you instead of opening a browser and comparing prices elsewhere.'
      },
      {
        title: 'Healthcare & Clinics',
        desc: 'Patients need to book appointments, access reports, and get reminders without calling front desk. An app enhances user engagement with automated reminders and gives patients a faster, more private way to manage their healthcare which builds trust and keeps them coming back.'
      },
      {
        title: 'Real Estate',
        desc: 'Buyers browse listings constantly. An app lets you push new listings, price drops, and viewing reminders directly to serious buyers, so you stay top of mind through a long, multi-week decision instead of getting lost in the email inbox.'
      },
      {
        title: 'Education & E-learning',
        desc: 'Students expect to learn on their schedule. An app gives them access to courses, assignments, and progress tracking from anywhere, which increases completion rates and keeps your institution relevant to a mobile-first generation.'
      },
      {
        title: 'Logistics & Delivery Services',
        desc: 'Customers want to know exactly where their order is, in real time. An app with live tracking and delivery notifications cuts down support calls and builds the kind of reliability customers talk about.'
      },
      {
        title: 'Fitness & Wellness Studios',
        desc: 'Members need to book classes, track progress, and stay motivated between visits. An app keeps your brand in their pocket every day not just on the days they walk through your door which directly improves membership renewals.'
      },
      {
        title: 'Hospitality — Hotels & Resorts',
        desc: "Your guests expect convenience before they even arrive. An app that handles bookings, digital check-in, and personalized offers turns a one-time stay into a direct relationship, so your next booking doesn't go through a third-party travel site."
      },
      {
        title: 'Service-Based Businesses',
        desc: 'If your business runs on appointments, an app that handles bookings, reminders, and repeat scheduling saves your staff time and reduces the missed appointments that cost you revenue.'
      },
      {
        title: 'B2B & SaaS Companies',
        desc: 'Your clients need to manage accounts, track usage, or access support without logging into a desktop portal. A mobile app makes your platform usable on the go, which strengthens retention and reduces the chance clients drift toward a more accessible competitor.'
      }
    ],
    benefits: [
      'Higher daily active user engagement and retention',
      'Direct mobile reach via native push notifications',
      'Instant offline access and seamless data synchronization',
      'Frictionless mobile payments and device hardware access',
      'Streamlined App Store and Play Store compliance & updates'
    ],
    commitment: {
      title: 'Our Commitment',
      text: "We act as your trusted advisor, bringing expertise and integrity to every engagement. We tailor our approach to your specific needs, drawing on our experience and flexibility to deliver the outcome you're after — efficiently and without surprises."
    },
    previewTitle: 'iOS, Android & Cross-Platform Mobile Engineering',
    previewTag: 'Flutter • React Native • Swift • Kotlin • Firebase',
    metrics: [
      { val: 'iOS + Android', label: 'Native & Cross-Platform' },
      { val: '60 FPS', label: 'UX-First Fluidity' },
      { val: 'End-to-End', label: 'Store Publishing Handled' }
    ],
    deliverables: [
      {
        title: 'Finding the Right Idea',
        desc: 'Every app starts with a problem worth solving. We help you sharpen your idea around your target market, so you\'re not just building an app; you\'re building a solution people actually want. Once we\'ve nailed the problem, we move into development with a clear direction.'
      },
      {
        title: 'Wireframes & Prototyping',
        desc: 'Before we write a single line of code, we map out your app in wireframes so you see exactly how it will work for your users before we spend time building it. At this stage, we work through:',
        points: [
          "How the app solves the user's problem",
          'The journey a user takes through the app',
          'Where users might get stuck or drop off',
          'Where menus, navigation, and content sit on the screen'
        ],
        extra: "A wireframe gives you a two-dimensional blueprint of your app. From there, we build a clickable prototype, so you can experience your app the way your users will before it's fully built. This means you catch design issues early, when they're cheap to fix during the initial stage."
      },
      {
        title: 'Defining the Front End and Back End',
        desc: 'With your prototype approved, we define the two halves of your app that work together behind the scenes.',
        sections: [
          {
            heading: 'Front End — What Your Users See and Touch',
            paragraphs: [
              'The front end is everything your user interacts with: the visuals, the layout, the buttons, the flow. We focus here on making every interaction feel natural, so your users never have to think about how to use your app, they just use it. Front end is what gets downloaded on their phone and what they open every time they tap your app icon.',
              'A small app might need just one or two developers; an enterprise-grade app gets a dedicated team covering each part of the workflow so you get the right level of resourcing for your project, not a one-size-fits-all team.'
            ]
          },
          {
            heading: 'Back End — What Keeps Your App Running',
            paragraphs: [
              'The back end handles the data and logic your app relies on, usually hosted by a third-party cloud provider or managed directly by you. We prefer trusted infrastructure partners like Supabase and Firebase, because they give your app reliable uptime and maintenance support.',
              'We integrate Front end to back end through APIs — built by our team or provided by back-end service providers. User information gets stored in the cloud rather than on the user\'s device, which keeps your app lightweight and fast to download. We engineer these APIs carefully, so users never feel the lag of data traveling from the cloud and they just experience a fast, responsive app.'
            ]
          }
        ]
      },
      {
        title: 'Local & Global Testing',
        desc: 'We test apps from every angle before it reaches your users. Local testing confirms local servers run smoothly, checks user experience and front-end APIs integrate correctly. Global testing verifies the app performs reliably once the back end is live in the cloud so wherever users open your app, it works the way it should.'
      },
      {
        title: 'Publishing Your App',
        desc: 'Once your app passes every test, we take it live publishing to the App Store and Google Play, so your users can find it, download it, and start using what we built together.'
      },
    
    ],
    stack: ['Flutter', 'React Native', 'Swift', 'Kotlin', 'Expo', 'Firebase', 'Node.js', 'UI/UX Design'],
    idealFor: 'Consumer brands, healthcare providers launching patient apps, educational institutions, and on-demand delivery or booking platforms.',
    process: [
      { step: '01', title: 'User Flow & Prototype', desc: 'Wireframing user journeys and click-through interactive prototypes for feedback.' },
      { step: '02', title: 'Native & Cross-Platform Coding', desc: 'Clean, modular mobile codebase optimized for battery, memory, and fast startup.' },
      { step: '03', title: 'Device Matrix QA', desc: 'Exhaustive testing across real iOS and Android models under varying network conditions.' },
      { step: '04', title: 'App Store Deployment', desc: 'Handling certificates, metadata, screenshots, and guidelines for smooth store approvals.' }
    ],
    relatedProjects: [
      {
        title: 'Empowering Communication. Connecting the Future',
        client: 'Electro Core Systems',
        category: 'High-Performing Website & IoT',
        href: '/projects/electro-core-systems',
        desc: 'Enterprise product showcase & dealer inquiry platform for commercial communication networks.'
      },
      {
        title: 'Mastering the Board — Strategic Coaching Hub',
        client: 'Venture Chess Academy',
        category: 'Web Platform & Sports Portal',
        href: '/projects/venture-chess-academy',
        desc: 'Interactive learning and booking portal for chess students and international grandmasters.'
      }
    ]
  },

  'website-development': {
    slug: 'website-development',
    heading:"",
    title: 'Website Development',
    eyebrow: 'High-Performance Web',
    subtitle: 'We build websites that do more than look good — they load fast, rank well, and turn visitors into customers.',
    intro: [
      "Your website is the digital front door to your business. At Akshara Digital, we craft fast, search-optimised websites that make an immediate impression and turn visitors into customers.",
      "We engineer custom editorial builds that load in under a second, adhere to modern SEO best practices, and offer flexible CMS controls so your team stays agile.",
      "From high-traffic e-commerce storefronts to corporate brand hubs, our websites are engineered to scale seamlessly and deliver measurable business ROI."
    ],
    capabilities: [
      'High-end custom website design',
      'Ultra-fast Astro & Next.js development',
      'Mobile-first responsive architecture',
      'Search engine optimization (SEO)',
      'Intuitive headless CMS integration',
      'High-converting landing pages',
      'E-commerce & payment gateway setup',
      'Edge CDN hosting & 24/7 maintenance'
    ],
    benefits: [
      'Higher Google search rankings with sub-second page loads',
      'Optimized conversion funnels that turn visitors into paying clients',
      'Flawless responsive display across phones, tablets, and desktops',
      'Simple, intuitive content editing without touching code',
      'Robust edge CDN security and zero-maintenance uptime'
    ],
    commitment: {
      title: 'Our Commitment',
      text: "We act as your trusted advisor, bringing expertise and integrity to every engagement. We tailor our approach to your specific needs, drawing on our experience and flexibility to deliver the outcome you're after — efficiently and without surprises."
    },
    previewTitle: 'High-Converting, SEO-Engineered Web Architecture',
    previewTag: 'Astro • Next.js • Tailwind CSS • Headless CMS • Cloudflare',
    metrics: [
      { val: '99/100', label: 'Lighthouse Speed Score' },
      { val: 'SEO-Ready', label: 'Structured Schema Markup' },
      { val: '<0.9s', label: 'First Contentful Paint' }
    ],
    deliverables: [
      {
        title: 'Custom website design and development',
        desc: 'Editorial, brand-first websites handcrafted without bloated templates — engineered to set your business apart.'
      },
      {
        title: 'Responsive, mobile-optimised builds',
        desc: 'Pixel-accurate fluid layouts that adapt seamlessly across smartphones, tablets, laptops, and large desktop monitors.'
      },
      {
        title: 'SEO-ready architecture',
        desc: 'Clean semantic HTML, sub-second page loads, automated sitemaps, OpenGraph tags, and technical SEO foundations built in from day one.'
      },
      {
        title: 'CMS integration for easy content updates',
        desc: 'Simple, intuitive content management dashboards so your team can publish blogs, update pricing, and edit pages without touching code.'
      },
      {
        title: 'E-commerce-ready websites',
        desc: 'Fast product catalogs, cart & checkout flows, payment gateway integration, and order management built to convert browsers into buyers.'
      },
      {
        title: 'Targeted Landing page with performance tracking',
        desc: 'Campaign-specific landing pages wired with analytics, conversion funnels, and lead-capture forms for measurable ad ROI.'
      },
      {
        title: 'Website maintenance and support',
        desc: 'SSL security, Cloudflare CDN caching, regular backups, content updates, and continuous performance monitoring.'
      }
    ],
    stack: ['Astro', 'Next.js', 'Tailwind CSS', 'TypeScript', 'UI/UX Design', 'Vercel', 'Nginx', 'Cloudflare'],
    idealFor: 'Corporate brands, B2B exporters (like Electro Core Systems & PUP Exports), e-commerce stores, and high-growth service businesses.',
    process: [
      { step: '01', title: 'Content & Visual Strategy', desc: 'Crafting persuasive messaging, brand typography, and high-impact visual design.' },
      { step: '02', title: 'Lightning-Fast Development', desc: 'Modern Astro and static builds yielding near-perfect Lighthouse scores.' },
      { step: '03', title: 'SEO & Analytics Setup', desc: 'Configuring schema markup, OpenGraph social meta, GA4, and Google Search Console.' },
      { step: '04', title: 'Managed Launch & Hosting', desc: 'Zero-downtime deployment on global edge CDN networks with auto SSL.' }
    ],
    relatedProjects: [
      {
        title: 'Empowering Communication. Connecting the Future',
        client: 'Electro Core Systems',
        category: 'High-Performing Website & IoT',
        href: '/projects/electro-core-systems',
        desc: 'Enterprise product showcase & dealer inquiry platform for commercial communication networks.'
      },
      {
        title: 'Your Brand, Our Craftsmanship — Bespoke Corporate Gifting',
        client: 'Abbeygate England / PUP Exports',
        category: 'Corporate Gifting & Bespoke Leather',
        href: '/projects/abbeygate-england',
        desc: 'Digital showcase for luxury bespoke leather goods and corporate merchandise.'
      }
    ]
  }
};


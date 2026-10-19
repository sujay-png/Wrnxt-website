export interface SubServiceDeliverable {
  title: string;
  desc: string;
  points?: string[];
  extra?: string;
}

export interface SubServiceMetric {
  val: string;
  label: string;
}

export interface SubServiceData {
  slug: string;
  title: string;
  eyebrow: string;
  subtitle: string;
  intro?: string[];
  capabilities?: string[];
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
    title: 'Mobile App Development',
    eyebrow: 'iOS & Android Engineering',
    subtitle: 'We build mobile apps that drive sales, strengthen loyalty, and grow your lifetime customer value',
    intro: [
      "We design and build custom mobile apps so you spend less on winning customers back and more time growing the relationships you already have. We follow the same disciplined process that goes into enterprise software and web application development.",
      
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
        title: 'iOS and Android app development',
        desc: 'Native Swift/Kotlin builds and high-performance Flutter & React Native applications that run smoothly across every iPhone and Android device.'
      },
      {
        title: 'UX-first interface design',
        desc: 'Intuitive, thumb-friendly mobile interfaces, micro-interactions, and frictionless onboarding designed for daily user retention.'
      },
      {
        title: 'Secure, encrypted architecture',
        desc: 'Biometric authentication (FaceID / Fingerprint), encrypted local storage, secure token sessions, and protected API communication.'
      },
      {
        title: 'API and backend integration',
        desc: 'Real-time push notifications, live location tracking, payment SDKs, offline mode sync, and cloud media streaming.'
      },
      {
        title: 'Thorough pre-launch testing',
        desc: 'Rigorous QA across physical iOS and Android devices, battery & memory profiling, and beta testing via TestFlight.'
      },
      {
        title: 'App Store and Google Play publishing',
        desc: 'End-to-end submission management, store listing assets, compliance approvals, and automated over-the-air release pipelines.'
      }
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


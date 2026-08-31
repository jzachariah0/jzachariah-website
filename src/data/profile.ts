export type ExperienceCategory =
  | "security"
  | "ai"
  | "research"
  | "leadership"
  | "consulting"
  | "education";

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  start: string;
  end: string | null;
  location?: string;
  category: ExperienceCategory;
  logo?: string;
  tech: string[];
  highlights: string[];
}

export interface FocusArea {
  id: string;
  label: string;
  color: string;
  summary: string;
  detail: string;
}

export interface StorySection {
  id: string;
  title: string;
  paragraphs: string[];
  image?: string;
  imageAlt?: string;
}

export interface Project {
  slug: string;
  name: string;
  role: string;
  featured: boolean;
  description: string;
  tech: string[];
  url?: string;
  appStoreUrl?: string;
  logo?: string;
  period?: string;
}

export const profile = {
  name: "Joshua Zachariah",
  domain: "joshuazachariah.com",
  seeking:
    "Prev. Cybersecurity Engineer Intern at PayPal, #1 New Release Author, Top 0.01% Technology Sales Consultant",
  title: "Cybersecurity Engineer/Consultant",
  headline:
    "PayPal Cybersecurity Engineer Intern. ISC2 certified. #1 New Release Author. UT Dallas, Class of 2027.",
  bio: "I have interned in cybersecurity at PayPal, deploy enterprise IAM through JJZAC LLC, and build detection and security systems in my own labs. Other work in AI, research, and community supports that same security foundation.",
  recognition:
    "National Cyber Scholar (top 2% nationwide). ISC² Certified in Cybersecurity (CC).",
  location: "Dallas, TX",
  email: "joshuaszachariah@gmail.com",
  phone: "469-858-5532",
  links: {
    linkedin: "https://www.linkedin.com/in/joshzachariah",
    github: "https://github.com/jzachariah0",
    calendly: "https://calendly.com/joshuaszachariah/30min",
    resume: "/resume",
  },
  about: [
    "Cybersecurity-focused Computer Engineering Honors student at UT Dallas (Collegium V, Academic Excellence Scholarship), graduating May 2027.",
    "National Cyber Scholar (2024) and ISC² CC. Experience across product security, IAM, and security engineering, with additional work in research and community education.",
  ],
  proofStats: [
    {
      value: "Top 0.01%",
      label: "Best Buy nationwide ranking",
      numeric: 0.01,
      prefix: "Top ",
      suffix: "%",
      decimals: 2,
    },
    {
      value: "5,000+",
      label: "users on Entra ID IAM at Clyde",
      numeric: 5000,
      suffix: "+",
      decimals: 0,
    },
    {
      value: "12 wks",
      label: "PayPal program concept to production",
      numeric: 12,
      suffix: " wks",
      decimals: 0,
    },
    {
      value: "Top 2%",
      label: "National Cyber Scholar, 45,000+",
      numeric: 2,
      prefix: "Top ",
      suffix: "%",
      decimals: 0,
    },
  ],
  proof: [
    {
      label: "PayPal",
      role: "Cybersecurity Engineer Intern",
      metric: "12 weeks",
      detail:
        "Introduced PayPal’s first shift-left security front door, taking it from concept to company-wide production. Led Product Change Reviews for customer-facing payment and AI features across security, privacy, and risk.",
      logo: "/logos/paypal.svg",
    },
    {
      label: "Clyde Companies",
      role: "Security Consultant via JJZAC",
      metric: "5,000+ users",
      detail:
        "Shipped Entra ID Entitlement Management across 300+ enterprise apps. Access reviews automated with Graph, PowerShell, and Logic Apps.",
      logo: "/logos/clyde.jpg",
    },
    {
      label: "Best Buy",
      role: "Computing Lead",
      metric: "Top 0.01%",
      detail:
        "Nationwide ranking. Advise SMB and enterprise clients on cybersecurity risk and cloud adoption.",
      logo: "/logos/best-buy.png",
    },
    {
      label: "National Cyber Scholar",
      role: "CyberStart America",
      metric: "Top 2%",
      detail: "Finished in the top 2% of 45,000+ competitors (2024).",
      logo: "/logos/csa.png",
    },
    {
      label: "ISC²",
      role: "Certified in Cybersecurity",
      metric: "ISC² Certified",
      detail: "Industry credential covering security principles, access control, network security, and incident response.",
      logo: "/logos/isc2-logo.jpg",
    },
  ],
  focusAreas: [
    {
      id: "security",
      label: "Security",
      color: "#0A84FF",
      summary: "Product security reviews, identity governance, and security engineering.",
      detail:
        "Built PayPal’s security engagement program in 12 weeks and deployed identity governance for 5,000+ users across 300+ applications.",
    },
    {
      id: "ai",
      label: "AI / ML",
      color: "#00C2A8",
      summary: "Secure AI products, authentication, rate limits, and cloud controls.",
      detail:
        "Hardened LLM endpoints for Thevenin AI’s international users and shipped machine-learning proofs of concept at Insurity.",
    },
    {
      id: "research",
      label: "Research",
      color: "#7C5CFC",
      summary: "Humanoid robotics, computer vision, and real-time IoT systems.",
      detail:
        "Lead an eight-person robotics team at UT Dallas and built distributed Rust sensor pipelines at Rice University.",
    },
    {
      id: "writing",
      label: "Writing",
      color: "#F5A623",
      summary: "Books and clear communication about technology and healthcare.",
      detail:
        "Published a #1 Amazon New Release and co-authored Pumping Life: The Power of Your Heart.",
    },
    {
      id: "community",
      label: "Community",
      color: "#FF5A5F",
      summary: "Accessible STEM education, healthcare tools, and technical mentorship.",
      detail:
        "Reached 5,000+ students through Coding Central, taught with Stanford Code in Place, and earned 100K+ educational video views.",
    },
    {
      id: "consulting",
      label: "Consulting",
      color: "#635BFF",
      summary: "IAM, cloud security, and enterprise technology advisory.",
      detail:
        "Principal of JJZAC since 2017 and ranked in the top 0.01% nationally at Best Buy for client technology consulting.",
    },
  ] satisfies FocusArea[],
  story: {
    mission:
      "Build a career in cybersecurity: product security, identity, and systems that protect people and organizations at scale.",
    sections: [
      {
        id: "origin",
        title: "The spark",
        image: "/origin.webp",
        imageAlt: "Joshua as a child at his father's office",
        paragraphs: [
          "I was three when my father, a Senior Network and Security Engineer at 3M, first took me to his office. Monitors, cables, and the hum of the server room stuck with me.",
          "What started as curiosity about keyboards and blinking lights turned into building robots, troubleshooting Linux on a YouTube channel at ten, and eventually a career in engineering and security.",
        ],
      },
      {
        id: "evolution",
        title: "Building in public",
        paragraphs: [
          "I launched Itz Josh on YouTube to walk through networking and Linux problems in plain language. Later I published The Digital Odyssey, which hit #1 New Release on Amazon.",
          "In 2022 I started Coding Central to give students the kind of mentorship I wished more people had access to. Partners now include Microsoft, Google, Adobe, Garland ISD, and Kenyatta University.",
        ],
      },
      {
        id: "today",
        title: "Now",
        paragraphs: [
          "I am a Computer Engineering Honors student at UT Dallas (Collegium V), National Cyber Scholar, and ISC² CC certified, graduating May 2027.",
          "Outside class I keep building: research on campus, products and non-profit work, and consulting through JJZAC.",
        ],
      },
      {
        id: "philosophy",
        title: "How I think",
        paragraphs: [
          "I am the person who takes things apart to understand them, whether that is a network trace, a piano piece, or a policy question about AI deployment.",
          "Security is not a checklist. It is understanding how people and systems actually behave, and designing for that. I care about responsible innovation, especially where AI meets regulated environments.",
        ],
      },
    ] satisfies StorySection[],
    books: [
      {
        title: "The Digital Odyssey: Navigating the Impact of Technology",
        note: "Amazon #1 New Release",
        cover: "/logos/book-cover.jpg",
        url: "https://a.co/d/0iBNhmwW",
      },
      {
        title: "Pumping Life: The Power of Your Heart",
        note: "Co-author, Amazon",
        cover: "/logos/pumping-life.webp",
        url: "https://www.amazon.com/Pumping-Life-Power-Your-Heart/dp/B0GHSCZQ4L",
      },
    ],
    youtube: {
      name: "Itz Josh",
      logo: "/logos/youtube.jpg",
      url: "https://www.youtube.com",
      subscribers: "1K+",
      views: "100K+",
    },
  },
  education: {
    school: "The University of Texas at Dallas",
    degree: "B.S. Computer Engineering (Honors)",
    graduation: "May 2027",
    logo: "/logos/utd-logo.jpg",
    details: [
      "Collegium V Honors Program",
      "Academic Excellence Scholarship",
      "Concentration: Information Security & AI",
      "CodePath Cybersecurity with Honors",
    ],
  },
  experience: [
    {
      id: "clyde",
      company: "Clyde Companies",
      role: "IAM Security Engineer",
      period: "Feb 2026 to Present",
      start: "2026-02",
      end: null,
      category: "security",
      logo: "/logos/clyde.jpg",
      tech: [
        "Microsoft Entra ID",
        "PowerShell",
        "Microsoft Graph",
        "Azure Logic Apps",
      ],
      highlights: [
        "Deployed Entra ID Entitlement Management for 5,000+ users across 300+ enterprise applications.",
        "Built Microsoft Graph, PowerShell, and Azure Logic Apps automation for access-review workflows.",
      ],
    },
    {
      id: "paypal",
      company: "PayPal",
      role: "Cybersecurity Engineer Intern",
      period: "May 2026 to Aug 2026",
      start: "2026-05",
      end: "2026-08",
      location: "Business Information Security Officer Group/Security Consulting",
      category: "security",
      logo: "/logos/paypal.svg",
      tech: [
        "Product security",
        "Security consulting",
        "Workflow design",
        "Stakeholder alignment",
      ],
      highlights: [
        "Built PayPal's company-wide Early Engagement program from concept to production in 12 weeks.",
        "Led Product Change Reviews for customer-facing payment and AI features across security, privacy, and risk.",
      ],
    },
    {
      id: "edme",
      company: "EdMe",
      role: "AI/ML & Security Research Engineer",
      period: "Jun 2025 to Present",
      start: "2025-06",
      end: null,
      location: "IIT Bombay Incubator",
      category: "ai",
      logo: "/logos/edme-ai.webp",
      tech: ["Neo4j", "MongoDB", "LangChain", "GDPR", "COPPA"],
      highlights: [
        "Lead security strategy for AI/ML pipelines with GDPR, COPPA, and DPDP compliance embedded into workflows.",
        "Built hybrid AI systems with hallucination mitigation and Neo4j knowledge graphs.",
      ],
    },
    {
      id: "hbs",
      company: "UT Dallas, HBS Laboratory",
      role: "AI/Robotics Research Lead",
      period: "Jan 2025 to Present",
      start: "2025-01",
      end: null,
      location: "Richardson, TX",
      category: "research",
      logo: "/logos/utd-logo.jpg",
      tech: ["Python", "OpenCV", "Raspberry Pi", "Arduino"],
      highlights: [
        "Lead an 8-person team building a socially assistive humanoid robot with real-time navigation and computer vision.",
      ],
    },
    {
      id: "insurity",
      company: "Insurity",
      role: "AI Software Engineer Intern",
      period: "Oct 2025 to Jan 2026",
      start: "2025-10",
      end: "2026-01",
      location: "Hartford, CT",
      category: "ai",
      logo: "/logos/insurity_logo.jpg",
      tech: ["Python", "Angular", ".NET", "Azure DevOps", "SQL Server"],
      highlights: [
        "Designed and deployed ML models for Sure BaaS billing, payments, and policy management.",
        "Delivered AI proofs-of-concept adopted by product leadership.",
      ],
    },
    {
      id: "bestbuy",
      company: "Best Buy",
      role: "Technology Sales Consultant, Computing Lead",
      period: "Oct 2023 to Present",
      start: "2023-10",
      end: null,
      location: "Garland, TX",
      category: "consulting",
      logo: "/logos/best-buy.png",
      tech: ["Tableau", "Power BI", "Cybersecurity advisory"],
      highlights: [
        "Ranked top 0.01% nationwide. Advise SMB and enterprise clients on cybersecurity risk and cloud adoption.",
      ],
    },
    {
      id: "mathnasium",
      company: "Mathnasium",
      role: "Mathematics Instructor",
      period: "Nov 2023 to May 2024",
      start: "2023-11",
      end: "2024-05",
      location: "Sunnyvale, TX",
      category: "education",
      logo: "/logos/mathnasium.png",
      tech: ["Instruction", "Curriculum design"],
      highlights: [
        "One-on-one and group instruction across algebra through calculus.",
      ],
    },
    {
      id: "rice",
      company: "Rice University",
      role: "IoT Research Intern",
      period: "Jul 2023 to Aug 2023",
      start: "2023-07",
      end: "2023-08",
      location: "Houston, TX",
      category: "research",
      logo: "/logos/rice.png",
      tech: ["Rust", "IoT", "Streaming algorithms"],
      highlights: [
        "Built IoT data pipelines in Rust with real-time streaming for distributed sensor networks.",
      ],
    },
  ] satisfies Experience[],
  projects: [
    {
      slug: "thevenin-ai",
      name: "Thevenin AI",
      role: "Co-Founder and Security Engineer",
      featured: true,
      period: "Mar 2026 to Present",
      logo: "/logos/thevenin-logo.png",
      description:
        "AI STEM Solver used internationally. Built the security layer: Firebase Auth with RBAC Firestore rules, Secrets Manager vaulting, rate-limiting on LLM endpoints, and Cloud Run input validation.",
      tech: ["Firebase", "Cloud Run", "Firebase Auth", "Secrets Manager"],
      url: "https://thevenin.ai",
      appStoreUrl:
        "https://apps.apple.com/us/app/thevenin-ai-stem-solver/id6759879628",
    },
    {
      slug: "wayanad",
      name: "Wayanad AI & Data Center Park",
      role: "Strategy & Infrastructure",
      featured: true,
      period: "Dec 2025 to Present",
      description:
        "Regional AI and data center park with government stakeholders on policy, land use, and infrastructure. Designing cloud, compute, and sustainability architecture for research, startups, and workforce development.",
      tech: ["Cloud architecture", "Infrastructure planning", "Policy"],
    },
    {
      slug: "soc-lab",
      name: "SOC Lab",
      role: "Personal lab",
      featured: false,
      description:
        "Multi-VM Security Operations Center with Splunk SIEM on AWS EC2, Suricata IDS, and pfSense firewall. Adversary emulations mapped to MITRE ATT&CK with custom correlation dashboards.",
      tech: ["Splunk", "AWS EC2", "Suricata", "pfSense", "MITRE ATT&CK"],
    },
  ] satisfies Project[],
  community: [
    {
      name: "Coding Central",
      role: "Founder & President",
      metric: "5,000+",
      metricLabel: "students taught",
      logo: "/logos/codingcentral_logo.jpg",
      detail:
        "Free STEM education for 5,000+ students. Partners include Microsoft, Google, Adobe, Garland ISD, and Kenyatta University.",
    },
    {
      name: "Garland ISD",
      role: "CTE Panel Member",
      metric: "50,000+",
      metricLabel: "students impacted",
      logo: "/logos/GISD.png",
      detail: "Cybersecurity, IT, and AI curriculum for 50,000+ students.",
    },
    {
      name: "Cardily",
      role: "Head of Product & Strategy",
      period: "Dec 2025 to Present",
      metric: "AED map",
      metricLabel: "underserved access",
      logo: "/logos/cardily_logo.jpg",
      detail:
        "AI-enabled healthcare platform, including AED mapping for underserved communities.",
    },
    {
      name: "Stanford University",
      role: "Section Leader, Code in Place",
      period: "Apr 2026 to May 2026",
      metric: "CIP",
      metricLabel: "global cohort",
      logo: "/logos/stanford.webp",
      detail:
        "Mentored a global cohort through Stanford's introductory CS program with weekly Python instruction.",
    },
  ],
  achievements: [
    {
      title: "National Cyber Scholar",
      detail: "Top 2% of 45,000+ competitors, CyberStart America",
      year: "2024",
    },
    {
      title: "#1 Amazon New Release Author",
      detail: "The Digital Odyssey: Navigating the Impact of Technology",
      year: "2023",
    },
    {
      title: "Co-Author",
      detail: "Pumping Life: The Power of Your Heart, #1 Amazon New Release",
      year: "2026",
    },
  ],
  certifications: [
    {
      name: "ISC² Certified in Cybersecurity (CC)",
      logo: "/logos/isc2-logo.jpg",
    },
  ],
};

export const accentPalette = [
  "#0A84FF",
  "#00C2A8",
  "#7C5CFC",
  "#F5A623",
  "#FF5A5F",
  "#635BFF",
];

export const experienceCategoryColors: Record<ExperienceCategory, string> = {
  security: "#0A84FF",
  ai: "#00C2A8",
  research: "#7C5CFC",
  education: "#F5A623",
  leadership: "#FF5A5F",
  consulting: "#635BFF",
};

export function accentAt(index: number): string {
  return accentPalette[index % accentPalette.length];
}

export const navLinks = [
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "About", href: "#about" },
  { label: "Connect", href: "#connect" },
];

export function getExperiences(limit?: number): Experience[] {
  const sorted = [...profile.experience].sort((a, b) =>
    b.start.localeCompare(a.start),
  );
  return limit ? sorted.slice(0, limit) : sorted;
}

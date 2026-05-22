import type { HomepageContent, Service, Project, Testimonial, BlogPost, Inquiry, QuoteRequest } from "./types";

export const SEED_HOMEPAGE: HomepageContent = {
  id: "11111111-1111-1111-1111-111111111111",
  key: "default",
  content: {
    hero: {
      title: "Premium Engineering & Infrastructure Solutions",
      subtitle: "Obawak Consult delivers industry-leading electrical installations, intelligent security systems, structured cabling, and sustainable solar energy networks for high-end residential, commercial, and industrial clients.",
      ctaText: "Request Custom Quote",
      ctaLink: "/quote",
      stats: [
        { label: "Years Experience", value: "15+" },
        { label: "Completed Projects", value: "500+" },
        { label: "Client Satisfaction", value: "100%" },
        { label: "Service Availability", value: "24/7" }
      ]
    },
    aboutPreview: {
      title: "Pioneering Technical Excellence Since 2011",
      subtitle: "WHO WE ARE",
      text: "Obawak Consult has established an elite reputation for technical mastery, meticulous craftsmanship, and robust support systems. We engineer customized infrastructural environments that empower companies and premium homeowners with modern power, networking, and safety systems.",
      bullets: [
        "Fully Certified Master Electrical Engineers & Technicians",
        "Rigorous Safety Protocols complying with International Standards",
        "State-of-the-Art Material Selection with Extended Warranties",
        "Dedicated 24/7 Post-Installation Support & Maintenance Desk"
      ]
    },
    whyChooseUs: {
      title: "Engineered for Unmatched Reliability",
      subtitle: "THE OBAWAK ADVANTAGE",
      items: [
        {
          title: "Safety-First Paradigm",
          description: "All designs and physical deployments undergo rigorous dual-layer safety reviews and load-testing configurations to guarantee long-term operational integrity.",
          icon: "ShieldAlert"
        },
        {
          title: "Precision Execution",
          description: "We utilize cutting-edge diagnostics, advanced planning models, and premium components to construct projects exactly to client specification.",
          icon: "Cpu"
        },
        {
          title: "Sustainable Practices",
          description: "We lead the industry in green building initiatives, introducing smart load-shedding systems, power factor correction, and solar arrays.",
          icon: "Leaf"
        },
        {
          title: "Comprehensive SLA Support",
          description: "Our team provides tailored Service Level Agreements that guarantee emergency response times within hours, ensuring continuous operation.",
          icon: "PhoneCall"
        }
      ]
    },
    contactInfo: {
      phone: "+234 7066692068, +234 9065515720, +234 8138632387",
      email: "inquiries@obawakconsult.com",
      address: "B3, Center Point Plaza, Kola Adegbola road, Dugbe, Ibadan, Oyo State",
      hours: "Mon - Fri: 8:00 AM - 5:00 PM | Emergency Support: 24/7"
    }
  },
  updated_at: new Date().toISOString()
};

export const SEED_SERVICES: Service[] = [
  {
    id: "22222222-2222-2222-2222-222222222222",
    slug: "electrical-installations",
    title: "Electrical Engineering & Installations",
    icon: "Zap",
    short_description: "Comprehensive power distribution, industrial wiring, panel upgrade, and custom lighting designs for premium projects.",
    long_description: "At Obawak Consult, we deliver robust, high-performance electrical systems. From commercial skyscrapers to luxury residential estates, our certified engineers handle comprehensive power distribution planning, smart panel installations, three-phase balancing, surge protections, and high-efficiency lighting architectures.",
    benefits: [
      "Optimal power load balancing preventing phase overload failures.",
      "High-grade surge suppression shielding expensive hardware.",
      "Premium conduit routing ensuring extreme physical protection.",
      "Comprehensive digital testing logs delivered at handoff."
    ],
    process_steps: [
      { title: "Load Assessment & Blueprint Design", description: "Analyzing thermal and capacity constraints to engineer optimal circuit schematics." },
      { title: "First-Fix Infrastructure Routing", description: "Deploying high-impact fire-retardant conduits and industrial cable trays." },
      { title: "Second-Fix Component Mounting", description: "Wiring distribution boards, circuit breakers, smart control switches, and fixtures." },
      { title: "Testing, Commissioning & Documentation", description: "Executing dielectric insulation resistance checks, load tests, and supplying handoff drawings." }
    ],
    faqs: [
      { question: "What safety certificates do your electrical works carry?", answer: "All installations undergo rigorous testing compliant with IEEE and local building codes, accompanied by official certificates of completion." },
      { question: "Do you offer industrial power factor correction services?", answer: "Yes, we analyze industrial inductive loads and install custom capacitor banks to optimize your power factor, significantly lowering utility tariffs." }
    ],
    image_url: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80",
    is_featured: true,
    created_at: new Date().toISOString()
  },
  {
    id: "33333333-3333-3333-3333-333333333333",
    slug: "smart-security-systems",
    title: "Intelligent Security & Surveillance",
    icon: "Shield",
    short_description: "AI-powered CCTV arrays, biometric access control, fire detection, and unified perimeter alarm integrations.",
    long_description: "Protecting your commercial asset or private home requires a unified, proactive security infrastructure. Obawak Consult engineers cutting-edge IP-based CCTV networks with visual analytics, advanced access control gates, perimeter fence sensors, and smart fire safety networks that send instant notifications.",
    benefits: [
      "AI human and vehicular detection filtering out false alarms.",
      "Biometric and RFID access controls log-recording all entrants.",
      "Centralized security dashboards accessible globally from mobile apps.",
      "Fail-safe power redundancy keeping surveillance online 24/7."
    ],
    process_steps: [
      { title: "Vulnerability & Blind-spot Analysis", description: "Performing strategic sightline assessments to place cameras and detectors optimally." },
      { title: "High-Bandwidth Network Backbone Setup", description: "Routing dedicated Cat6 PoE cabling and configuring secure local recording switches." },
      { title: "Hardware Mount & Analytics Mapping", description: "Installing 4K starlight cameras, access card portals, and setting up tripwire detection zones." },
      { title: "System Calibration & Admin Handover", description: "Tuning alert sensitivities and registering administrators on unified management consoles." }
    ],
    faqs: [
      { question: "Can I monitor cameras offline or during power outages?", answer: "Yes, we integrate intelligent deep-cycle inverter systems and battery back-ups that keep the entire security system running through power disruptions." },
      { question: "Is security footage encrypted to prevent hacking?", answer: "Absolutely. All video data is encrypted during transit and at rest, and admin access requires secure, multi-factor authorization." }
    ],
    image_url: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80",
    is_featured: true,
    created_at: new Date().toISOString()
  },
  {
    id: "44444444-4444-4444-4444-444444444444",
    slug: "network-structured-cabling",
    title: "Network Infrastructure & Structured Cabling",
    icon: "Network",
    short_description: "Gigabit fiber optic backbones, structured Cat6a Ethernet grids, managed network cabinets, and high-density Wi-Fi deployment.",
    long_description: "A fast, resilient local network is the modern corporate foundation. We design and install structured cabling solutions that future-proof your office, featuring high-speed optical fiber links, premium patch panels, managed enterprise switches, and professional Wi-Fi access point grids that prevent dropped signals.",
    benefits: [
      "Clean, labeled structured wiring making troubleshooting instant.",
      "Enterprise-grade switches supporting massive local data transfers.",
      "Seamless Wi-Fi roaming keeping employees connected across large sites.",
      "Server room optimization with thermal management and robust containment."
    ],
    process_steps: [
      { title: "Site Connectivity Audit", description: "Analyzing bandwidth demands, office layouts, and potential electromagnetic interference." },
      { title: "Precision Containment Layout", description: "Installing overhead cable runways, under-desk trays, and central rack mounts." },
      { title: "Ethernet & Fiber Termination", description: "Pulling premium copper/fiber cables, testing terminations with Fluke certifiers." },
      { title: "Active Network Provisioning", description: "Configuring VLANs, firewalls, band-steering Wi-Fi controllers, and naming patch panels." }
    ],
    faqs: [
      { question: "What is structured cabling, and why is it better?", answer: "Structured cabling organizes network wires into a single unified system. This prevents clutter, reduces data loss, and makes upgrading simple." },
      { question: "Do you certify the installed cables?", answer: "Yes, every cable is tested and certified using industrial Fluke network analyzers to guarantee maximum gigabit performance." }
    ],
    image_url: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80",
    is_featured: false,
    created_at: new Date().toISOString()
  },
  {
    id: "55555555-5555-5555-5555-555555555555",
    slug: "solar-energy-systems",
    title: "Smart Solar & Energy Solutions",
    icon: "Sun",
    short_description: "Custom solar arrays, lithium-ion storage inverters, power audits, and high-efficiency backup generators.",
    long_description: "Mitigate unreliable power tariffs and power grid blackouts. Obawak Consult engineers custom renewable energy packages, including monocrystalline solar grids, intelligent hybrid storage inverters, and premium lithium iron phosphate (LiFePO4) battery setups engineered to last for decades.",
    benefits: [
      "Immediate, dramatic reduction in monthly generator diesel and utility bills.",
      "Zero-second automatic transition during outages protecting sensitive electronics.",
      "Eco-friendly corporate branding with certified carbon footprint reduction.",
      "Long-life battery banks with advanced built-in battery management."
    ],
    process_steps: [
      { title: "Power Consumption Logging", description: "Deploying data loggers to capture your true peak and idle consumption profiles." },
      { title: "Solar Array & Battery Engineering", description: "Sizing solar panel square footage, solar charger controllers, and inverter power outputs." },
      { title: "Roof Integrity Mounting", description: "Installing heavy-gauge wind-resistant aluminum racks and anchoring high-efficiency solar cells." },
      { title: "Inverter Integration & Live Handoff", description: "Linking batteries, wire connections, configuring smart energy priorities on digital displays." }
    ],
    faqs: [
      { question: "How long do solar panels and lithium batteries last?", answer: "Our premium solar panels carry a 25-year performance warranty, and our high-end lithium battery systems are rated for over 6,000 charge cycles (typically 10-15 years)." },
      { question: "Can a solar system power high-load appliances like air conditioners?", answer: "Yes, we design robust high-capacity systems specifically tailored to handle heavy inductive loads like ACs, water pumps, and industrial equipment." }
    ],
    image_url: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80",
    is_featured: true,
    created_at: new Date().toISOString()
  }
];

export const SEED_PROJECTS: Project[] = [
  {
    id: "66666666-6666-6666-6666-666666666666",
    slug: "chevron-office-integration",
    title: "Chevron Corporate HQ Infrastructure",
    description: "Obawak Consult executed a master infrastructural overhaul for Chevron's corporate regional headquarters. This project encompassed complete architectural structured cabling of over 450 network nodes, a centralized secure server room featuring precision thermal cooling systems, and an AI-driven CCTV network comprising 84 starlight IP cameras with intelligent boundary protection.",
    client: "Chevron International",
    service_id: "service-3",
    service_title: "Network Infrastructure & Structured Cabling",
    location: "Lekki Peninsula, Lagos",
    completion_date: "2025-11-14",
    is_featured: true,
    cover_image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
    ],
    created_at: new Date().toISOString()
  },
  {
    id: "77777777-7777-7777-7777-777777777777",
    slug: "banana-island-smart-estate",
    title: "Banana Island Luxury Smart Estate",
    description: "A comprehensive design-build smart electrical installation for a luxury private estate in Banana Island. The scope featured complete home automation including motorized blinds control, customized architectural ambient LED lighting scenes, premium electrical power distribution panel boards with safety surge controls, and a robust 30kW Hybrid Monocrystalline Solar Array with 60kWh Lithium-ion energy storage.",
    client: "Dr. Alimi (Private Client)",
    service_id: "service-4",
    service_title: "Smart Solar & Energy Solutions",
    location: "Banana Island, Lagos",
    completion_date: "2026-02-10",
    is_featured: true,
    cover_image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80"
    ],
    created_at: new Date().toISOString()
  },
  {
    id: "88888888-8888-8888-8888-888888888888",
    slug: "ikeja-industrial-plant",
    title: "Ikeja Manufacturing Plant Electrical Overhaul",
    description: "Engineering and overhaul of the main power grid distribution systems for a leading food packaging factory. We upgraded the aged main distribution boards, balanced industrial three-phase inductive motor networks, installed a 1250kVA automatic generator transfer grid, and integrated power factor correction capacitor modules that successfully lowered average factory current demand.",
    client: "Packwell Industrial Ltd",
    service_id: "service-1",
    service_title: "Electrical Engineering & Installations",
    location: "Ikeja Industrial Zone, Lagos",
    completion_date: "2025-08-30",
    is_featured: true,
    cover_image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80"
    ],
    created_at: new Date().toISOString()
  }
];

export const SEED_TESTIMONIALS: Testimonial[] = [
  {
    id: "99999999-9999-9999-9999-999999999999",
    name: "Engr. Tunde Oladipo",
    role: "Director of Infrastructure",
    company: "Lagos Port Terminal",
    content: "Obawak Consult exceeded our high operational standards. They completely re-engineered our main power distribution grids during minimal downtime windows. The technical precision, detailed documentation, and commitment to strict safety rules are highly commendable.",
    rating: 5,
    photo_url: "",
    is_approved: true,
    created_at: new Date().toISOString()
  },
  {
    id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
    name: "Sandra Nwachukwu",
    role: "Head of Operations",
    company: "Apex Tech Hubs",
    content: "We hired them to design and execute our entire structured cabling network and smart security grids. Our team now enjoys unified Wi-Fi access with absolute coverage, and our IT staff has complete remote management of our server cabinets. Outstanding service!",
    rating: 5,
    photo_url: "",
    is_approved: true,
    created_at: new Date().toISOString()
  },
  {
    id: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb",
    name: "Chief Femi Adebayo",
    role: "Estate Managing Partner",
    company: "Crown Premium Estates",
    content: "Our residential estate suffered continuous grid disruptions until Obawak designed our custom centralized backup system and microgrid solar plan. Their technical execution was fast, tidy, and extremely reliable. Our utility expenses dropped by nearly 65% in the first quarter.",
    rating: 5,
    photo_url: "",
    is_approved: true,
    created_at: new Date().toISOString()
  }
];

export const SEED_BLOGS: BlogPost[] = [
  {
    id: "cccccccc-cccc-cccc-cccc-cccccccccccc",
    slug: "maximizing-industrial-energy-efficiency",
    title: "Maximizing Industrial Energy Efficiency: The Power Factor Correction Guide",
    summary: "Discover how commercial and manufacturing plants significantly slash utility tariffs and extend infrastructure lifetime using smart capacitor bank installations.",
    content: `## The Hidden Cost of Reactive Power

In large industrial and commercial environments, massive motors, air conditioning compressors, and high-frequency transformers pull electrical current that is out of phase with active voltage. This creates **reactive power (kVAR)**, which is non-productive energy that utility suppliers penalize with hefty tariffs.

The ratio between actual working power (kW) and apparent total power (kVA) is defined as the **Power Factor**. 
A perfect Power Factor is **1.0**. However, most commercial plants hover around **0.75 - 0.82**.

### What is Power Factor Correction (PFC)?

Power Factor Correction is the process of neutralizing reactive power by integrating specialized, computer-monitored **Capacitor Banks** directly inline with your main distribution panel boards. These capacitors act as local energy storage reservoirs, supplying the required reactive current directly to inductive machinery locally.

\`\`\`
Power Factor = kW / kVA
High kVAR (Reactive Power) -> Low Power Factor -> Heavy Utility Tariffs + Voltage Drops
\`\`\`

### 3 Major Benefits of Installing PFC Systems:

1. **Elimination of Utility Penalties:** Most utility distributors levy substantial penalty charges if your power factor drops below a minimum threshold (typically 0.90). PFC instantly brings your index above 0.95, eliminating these extra costs.
2. **Enhanced Circuit Capacity:** By removing useless reactive current from the electrical circuit, the thermal load in cables and transformers drops significantly, freeing up space to connect new equipment without upgrading expensive wiring.
3. **Voltage Stabilization:** High reactive loads lead to voltage dips, causing motors to run hotter and fail prematurely. PFC stabilizes terminal voltages, keeping machinery running efficiently.

### Choosing the Right System for Your Business

At **Obawak Consult**, our certified engineers perform comprehensive energy log analyzes, capturing current trends across multiple business cycles to size and construct the perfect capacitor bank module. Contact our team today to request a comprehensive power audit!`,
    featured_image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    category: "Energy Systems",
    published: true,
    published_at: new Date().toISOString(),
    seo_title: "Industrial Power Factor Correction Guide | Obawak Consult",
    seo_description: "Slash utility bills and protect manufacturing equipment. Read our expert guide on installing custom power factor correction systems.",
    created_at: new Date().toISOString()
  },
  {
    id: "dddddddd-dddd-dddd-dddd-dddddddddddd",
    slug: "designing-bulletproof-office-structured-cabling",
    title: "Designing a Bulletproof Office Network: Structured Cabling Best Practices",
    summary: "Learn why neat, structured wire pathways are the bedrock of reliable high-speed data transmission and how to design your server rack room.",
    content: `## The Danger of Cable Chaos

Walk into any disorganized server closet, and you will see a colorful waterfall of tangled, unlabeled Ethernet cords hanging from patch panels. This chaotic environment leads to dropped packets, severe electromagnetic interference, and extended troubleshooting times during emergency network outages.

**Structured Cabling** represents a highly organized design blueprint that groups communication wires into standardized, labeled pathways, patch bays, and central distribution cabinets.

### Key Rules of Structured Cabling Design:

1. **Establish a High-Bandwidth Fiber Backbone:** Link server cabinets and multiple office floors with multi-mode optical fiber lines to ensure massive speeds that never bottleneck.
2. **Strict Distance Limitations:** Keep horizontal Cat6a Ethernet drops below **90 meters (295 feet)**. Wires exceeding this limit suffer from natural electrical signal degradation.
3. **Strategic Cable Containment:** Route cables inside heavy-duty steel wire runways and fire-retardant wall conduits. Keep network wires separated from high-voltage electrical mains by at least **6 inches** to prevent signal noise.
4. **Intuitive Labeling Nomenclature:** Ensure both ends of every single cable carry a corresponding, waterproof tag identifying its exact office port and server rack location.

### Why Certified Testing Matters

It is not enough to pull cables; you must certify them. At **Obawak Consult**, our teams inspect every termination with state-of-the-art Fluke cable analyzers, measuring cross-talk, return loss, and gigabit transport integrity before handoff.

A bulletproof layout saves time, eases employee onboarding, and secures your high-speed internet. Partner with our network engineers today to structure your enterprise.`,
    featured_image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80",
    category: "Networking",
    published: true,
    published_at: new Date().toISOString(),
    seo_title: "Structured Cabling Design & Best Practices | Obawak Consult",
    seo_description: "Build a high-performance office network. Our certified engineers explain organized wiring structures and server rack room layouts.",
    created_at: new Date().toISOString()
  }
];

export const SEED_INQUIRIES: Inquiry[] = [
  {
    id: "eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee",
    name: "Alabi Joseph",
    email: "alabi@kudapartner.com",
    phone: "+2348029993333",
    subject: "Industrial CCTV & Access Control Quote",
    message: "Hello, we are expanding our warehouse facility in Ikeja and require a complete price breakdown to deploy 12 high-definition IP cameras, 3 biometric security doors, and unified local recording servers. Let us know when your engineers can visit for a site audit.",
    status: "unread",
    created_at: new Date().toISOString()
  }
];

export const SEED_QUOTES: QuoteRequest[] = [
  {
    id: "ffffffff-ffff-ffff-ffff-ffffffffffff",
    name: "Florence Williams",
    email: "fwilliams@ekoatlantic.com",
    phone: "+2347031114444",
    company: "Eko Atlantic City Properties",
    services: ["Smart Solar & Energy Solutions", "Electrical Engineering & Installations"],
    project_scale: "commercial",
    timeline: "1-3 months",
    budget: "$20k+",
    description: "We are designing a new high-rise office showroom and wish to incorporate an eco-friendly smart hybrid solar power system as the main backup power supply. The peak consumption of the building is calculated around 45kVA, and we require high-grade lithium batteries.",
    status: "pending",
    created_at: new Date().toISOString()
  }
];

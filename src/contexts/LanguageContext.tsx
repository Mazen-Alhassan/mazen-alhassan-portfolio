"use client";

import React, { createContext, useContext, useState } from "react";

type Language = "en" | "ar";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    about: "About",
    experience: "Experience",
    projects: "Projects",
    skills: "Skills",
    contact: "Contact",

    // Hero Section
    heroTitle: "Mazen Alhassan",
    heroSubtitle: "Cybersecurity Researcher & Security Engineer",
    heroDescription:
      "Building secure systems and conducting cutting-edge research in network security, MITRE ATT&CK frameworks, and threat detection at Université Laval",
    viewWork: "View My Work",
    getInTouch: "Get In Touch",

    // About Section
    aboutTitle: "About Me",
    aboutText1:
      "I'm a passionate cybersecurity researcher pursuing my Bachelor's degree in Information Technology/Network Technology at Carleton University, with an expected graduation in April 2027.",
    aboutText2:
      "Currently working as a Research Intern at Université Laval, I specialize in building MITRE ATT&CK-driven attack-flow generators, modeling secure databases, and conducting comprehensive cybersecurity research. I have experience as a full-stack developer and continue to apply those skills in my security research.",
    availableForOpportunities: "Available for opportunities",
    basedInCanada: "Based in Canada",
    quickFacts: "Quick Facts",
    fact1: "🎓 Information Technology Student at Carleton University",
    fact2: "🔬 Research Intern at Université Laval",
    fact3: "🛡️ Cybersecurity Foundations Certified",
    fact4: "💻 Experienced Full-Stack Developer (Python, JavaScript, C++)",
    fact5: "🌐 Network Security Specialist",

    // Companies Section
    companiesTitle: "Companies I've Worked For",

    // Projects Section
    projectsTitle: "Featured Projects",
    socTitle: "SOC Implementation",
    socDescription:
      "Deployed Microsoft Sentinel with custom workbook and analytics rules to visualize and alert on RDP brute-force activity",
    socFeature1: "• Real-time threat detection and alerting",
    socFeature2: "• Custom analytics and visualizations",
    socFeature3: "• Automated incident response",

    ccnaTitle: "CCNA Practice Platform",
    ccnaDescription:
      "Interactive web platform for CCNA certification preparation with 50+ active users providing valuable learning insights",
    ccnaFeature1: "• Interactive learning modules",
    ccnaFeature2: "• Secure user authentication",
    ccnaFeature3: "• Responsive design across devices",

    honeypotTitle: "Honeypot Network Analysis",
    honeypotDescription:
      "Advanced threat detection system analyzing attack patterns from 50+ global locations with real-time monitoring",
    honeypotFeature1: "• Multi-region threat detection",
    honeypotFeature2: "• Advanced pattern analysis",
    honeypotFeature3: "• Real-time alert correlation",

    // Skills Section
    skillsTitle: "Skills & Technologies",
    programming: "Programming",
    cybersecurity: "Cybersecurity",
    toolsPlatforms: "Tools & Platforms",

    // Project Features (for Arabic translation)
    realTimeDetection: "Real-time threat detection and alerting",
    customAnalytics: "Custom analytics and visualizations",
    automatedResponse: "Automated incident response",
    interactiveLearning: "Interactive learning modules",
    secureAuth: "Secure user authentication",
    responsiveDesign: "Responsive design across devices",
    multiRegionDetection: "Multi-region threat detection",
    advancedPatterns: "Advanced pattern analysis",
    realTimeCorrelation: "Real-time alert correlation",
    certifications: "LinkedIn Certifications",
    cert1: "Cybersecurity Foundations",
    cert2: "Cybersecurity Foundations: Governance, Risk, and Compliance (GRC)",
    cert3: "IT Service Desk: Service Management",
    cert4:
      "Microsoft Security Essentials: Concepts, Solutions, and AI-Powered Protection",

    // Project translations
    socTitle: "SOC Implementation & Honeypot Analysis",
    socDescription:
      "Advanced threat detection system with Microsoft Sentinel SOC deployment, analyzing attack patterns from 50+ global locations with real-time monitoring and alerting",
    ccnaTitle: "CCNA Practice Platform",
    ccnaDescription:
      "Interactive web platform for CCNA certification preparation with 50+ active users providing valuable learning insights",
    mitreTitle: "MITRE ATT&CK Flow Generator",
    mitreDescription:
      "Advanced Python tool generating visual attack flow diagrams based on MITRE ATT&CK framework with comprehensive threat modeling capabilities",
    sportsTitle: "Sports Analytics Platform",
    sportsDescription:
      "Advanced real-time sports analytics platform with multi-API integration, statistical modeling, automated notifications, and comprehensive data visualization",

    // Contact Section
    contactTitle: "Let's Connect",
    contactDescription:
      "Interested in cybersecurity research, full-stack development, or just want to chat about technology? I'd love to hear from you.",
    email: "Email",
    phone: "Phone",
    readyToCollaborate: "Want to collaborate?",
    collaborateDescription:
      "I'm actively seeking opportunities in cybersecurity engineering, threat analysis, and full-stack development roles. With hands-on experience in MITRE ATT&CK frameworks, SOC implementation, and secure application development, I'm ready to contribute to your team's security initiatives.",
    startConversation: "Start a Conversation",
    connectWithMe: "Connect with me",

    // Footer
    builtWith: "Built with Next.js and Tailwind CSS.",
    deployedOn: "Deployed on Vercel",
    designedWithSecurity: "Designed with security in mind",
  },
  ar: {
    // Navigation
    about: "نبذة عني",
    experience: "الخبرة",
    projects: "المشاريع",
    skills: "المهارات",
    contact: "التواصل",

    // Hero Section
    heroTitle: "مازن الحسن",
    heroSubtitle: "باحث أمن سيبراني ومهندس أمان",
    heroDescription:
      "بناء أنظمة آمنة وإجراء بحوث متطورة في أمان الشبكات وإطارات MITRE ATT&CK واكتشاف التهديدات في جامعة لافال",
    viewWork: "عرض أعمالي",
    getInTouch: "تواصل معي",

    // About Section
    aboutTitle: "نبذة عني",
    aboutText1:
      "أنا باحث شغوف في الأمن السيبراني أسعى للحصول على درجة البكالوريوس في تكنولوجيا المعلومات/تكنولوجيا الشبكات من جامعة كارلتون، مع التخرج المتوقع في أبريل 2027.",
    aboutText2:
      "أعمل حاليًا كمتدرب باحث في جامعة لافال، وأتخصص في بناء مولدات تدفق الهجمات المدفوعة بـ MITRE ATT&CK، ونمذجة قواعد البيانات الآمنة، وإجراء بحوث شاملة في الأمن السيبراني. لدي خبرة كمطور مكدس كامل وأستمر في تطبيق هذه المهارات في أبحاث الأمان.",
    availableForOpportunities: "متاح للفرص",
    basedInCanada: "مقيم في كندا",
    quickFacts: "حقائق سريعة",
    fact1: "🎓 طالب تكنولوجيا المعلومات في جامعة كارلتون",
    fact2: "🔬 متدرب باحث في جامعة لافال",
    fact3: "🛡️ حاصل على شهادة أسس الأمن السيبراني",
    fact4: "💻 مطور مكدس كامل ذو خبرة (Python, JavaScript, C++)",
    fact5: "🌐 متخصص أمن الشبكات",

    // Companies Section
    companiesTitle: "الشركات التي عملت معها",

    // Projects Section
    projectsTitle: "المشاريع المميزة",
    socTitle: "تطبيق مركز العمليات الأمنية",
    socDescription:
      "نشر Microsoft Sentinel مع مصنف مخصص وقواعد تحليلات لتصور وتنبيه أنشطة القوة الغاشمة RDP",
    socFeature1: "• كشف التهديدات والتنبيه في الوقت الفعلي",
    socFeature2: "• التحليلات والتصورات المخصصة",
    socFeature3: "• الاستجابة التلقائية للحوادث",

    ccnaTitle: "منصة تدريب CCNA",
    ccnaDescription:
      "منصة ويب تفاعلية لإعداد شهادة CCNA مع أكثر من 50 مستخدم نشط يقدمون رؤى تعليمية قيمة",
    ccnaFeature1: "• وحدات تعلم تفاعلية",
    ccnaFeature2: "• مصادقة مستخدم آمنة",
    ccnaFeature3: "• تصميم متجاوب عبر الأجهزة",

    honeypotTitle: "تحليل شبكة العسل",
    honeypotDescription:
      "نظام كشف تهديدات متقدم يحلل أنماط الهجمات من أكثر من 50 موقعًا عالميًا مع المراقبة في الوقت الفعلي",
    honeypotFeature1: "• كشف التهديدات متعدد المناطق",
    honeypotFeature2: "• تحليل الأنماط المتقدم",
    honeypotFeature3: "• ربط التنبيهات في الوقت الفعلي",

    // Skills Section
    skillsTitle: "المهارات والتقنيات",
    programming: "البرمجة",
    cybersecurity: "الأمن السيبراني",
    toolsPlatforms: "الأدوات والمنصات",
    certifications: "شهادات LinkedIn",
    cert1: "أسس الأمن السيبراني",
    cert2: "أسس الأمن السيبراني: الحوكمة والمخاطر والامتثال",
    cert3: "مكتب خدمة تقنية المعلومات: إدارة الخدمة",
    cert4:
      "أساسيات أمان مايكروسوفت: المفاهيم والحلول والحماية بالذكاء الاصطناعي",

    // Project translations
    socTitle: "تطبيق مركز العمليات الأمنية وتحليل شبكة العسل",
    socDescription:
      "نظام كشف التهديدات المتقدم مع نشر SOC مايكروسوفت سنتينل، تحليل أنماط الهجمات من أكثر من 50 موقعاً عالمياً مع المراقبة والتنبيه في الوقت الفعلي",
    ccnaTitle: "منصة تدريب CCNA",
    ccnaDescription:
      "منصة ويب تفاعلية لإعداد شهادة CCNA مع أكثر من 50 مستخدماً نشطاً يوفرون رؤى تعليمية قيمة",
    mitreTitle: "مولد مخططات تدفق هجمات MITRE ATT&CK",
    mitreDescription:
      "أداة بايثون متقدمة لتوليد مخططات تدفق الهجمات البصرية بناءً على إطار عمل MITRE ATT&CK مع قدرات نمذجة التهديدات الشاملة",
    sportsTitle: "منصة تحليلات الرياضة",
    sportsDescription:
      "منصة تحليلات رياضية متقدمة في الوقت الفعلي مع تكامل متعدد APIs، النمذجة الإحصائية، الإشعارات الآلية، وتصور البيانات الشامل",

    // Contact Section
    contactTitle: "لنتواصل",
    contactDescription:
      "مهتم ببحوث الأمن السيبراني أو تطوير المكدس الكامل أو تريد فقط الدردشة حول التكنولوجيا؟ أحب أن أسمع منك.",
    email: "البريد الإلكتروني",
    phone: "الهاتف",
    readyToCollaborate: "تريد التعاون؟",
    collaborateDescription:
      "أبحث بنشاط عن فرص في هندسة الأمن السيبراني وتحليل التهديدات وأدوار تطوير المكدس الكامل. مع خبرة عملية في أطر MITRE ATT&CK وتطبيق مراكز العمليات الأمنية وتطوير التطبيقات الآمنة، أنا مستعد للمساهمة في مبادرات الأمان لفريقكم.",
    startConversation: "ابدأ محادثة",
    connectWithMe: "تواصل معي",

    // Footer
    builtWith: "مبني باستخدام Next.js و Tailwind CSS.",
    deployedOn: "منشور على Vercel",
    designedWithSecurity: "مصمم مع مراعاة الأمان",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "ar" : "en"));
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      <div
        className={language === "ar" ? "rtl" : "ltr"}
        dir={language === "ar" ? "rtl" : "ltr"}
      >
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

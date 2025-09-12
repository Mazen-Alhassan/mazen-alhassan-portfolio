"use client";

import { useState, useEffect } from "react";
import ParticleBackground from "../components/ParticleBackground";
import ProjectCard from "../components/ProjectCard";
import CompanyLogos from "../components/CompanyLogos";
import { useLanguage } from "../contexts/LanguageContext";
import {
  useScrollAnimation,
  useParallax,
} from "../components/ScrollAnimations";
import {
  CertificationBadge,
  PulseElement,
} from "../components/UnlockAnimations";

export default function Home() {
  const [, setActiveSection] = useState("hero");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const { language, toggleLanguage, t } = useLanguage();
  // Using original Red Team theme as default (no theme switching)
  const theme = "light";

  const heroRef = useScrollAnimation();
  const aboutRef = useScrollAnimation();
  // const experienceRef = useScrollAnimation(); // Removed as we're using CompanyLogos component
  const projectsRef = useScrollAnimation();
  const skillsRef = useScrollAnimation();
  const contactRef = useScrollAnimation();

  const parallaxRef1 = useParallax(0.3);
  const parallaxRef2 = useParallax(0.5);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setScrollY(window.scrollY);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
    }
  };

  return (
    <div
      className="min-h-screen relative overflow-x-hidden transition-colors duration-500"
      style={{
        background: `linear-gradient(to right, #050505 0%, #0f0505 25%, #1a0808 50%, #0f0303 75%, #000000 100%)`,
      }}
    >
      <ParticleBackground />
      {/* Navigation */}
      <nav
        className={`fixed top-4 left-4 right-4 z-50 transition-all duration-300 rounded-2xl ${
          isScrolled ? "glass-red animate-red-pulse" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="flex items-center justify-between h-16">
            <PulseElement pulseType="heartbeat">
              <div className="text-white font-bold text-xl gradient-red-gold">
                MA
              </div>
            </PulseElement>
            <div className="hidden md:flex space-x-8 items-center">
              {[
                { key: "about", label: t("about") },
                { key: "experience", label: t("experience") },
                { key: "projects", label: t("projects") },
                { key: "skills", label: t("skills") },
                { key: "contact", label: t("contact") },
              ].map((item) => (
                <button
                  key={item.key}
                  onClick={() => scrollToSection(item.key)}
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium"
                >
                  {item.label}
                </button>
              ))}

              {/* Arabic Toggle Button */}
              <button
                onClick={toggleLanguage}
                className="ml-4 px-4 py-2 rounded-full bg-gradient-to-r from-red-600/20 to-red-800/20 border border-red-500/30 text-white text-sm font-medium hover:from-red-600/30 hover:to-red-800/30 transition-all duration-300 magnetic animate-red-pulse"
              >
                {language === "en" ? "Arabic" : "English"}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="hero"
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
        ref={heroRef}
      >
        {/* Dynamic background elements - Darker overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-black/50 via-red-900/40 to-black/60"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        ></div>

        {/* Floating elements */}
        <PulseElement pulseType="red">
          <div
            ref={parallaxRef1}
            className="absolute top-20 left-10 animate-float"
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-red-600/40 to-red-800/40 blur-xl"></div>
          </div>
        </PulseElement>
        <PulseElement pulseType="gold">
          <div
            ref={parallaxRef2}
            className="absolute bottom-20 right-10 animate-float"
            style={{ animationDelay: "2s" }}
          >
            <div className="w-32 h-32 rounded-full bg-gradient-to-r from-red-700/30 to-red-900/30 blur-xl"></div>
          </div>
        </PulseElement>

        {/* Mouse follower */}
        <div
          className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-red-600/15 to-red-900/15 blur-3xl pointer-events-none transition-all duration-1000 ease-out"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        ></div>

        <div className="relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center min-h-[80vh]">
              {/* Left side - Text content */}
              <div className="text-center md:text-left">
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight gradient-red-gold">
                  {t("heroTitle")}
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 mb-8">
                  {t("heroSubtitle")}
                </p>
                <p className="text-lg text-gray-400 mb-12">
                  {t("heroDescription")}
                </p>
              </div>
              
              {/* Right side - Profile photo */}
              <div className="flex justify-center md:justify-end">
                <div className="relative group">
                  <div className="w-80 h-80 rounded-full overflow-hidden glass-dark p-3 magnetic">
                    <img
                      src="/profile.jpg"
                      alt="Mazen Alhassan Profile"
                      className="w-full h-full rounded-full object-cover transition-all duration-300 group-hover:scale-105"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src =
                          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='320' viewBox='0 0 320 320'%3E%3Crect width='320' height='320' fill='%23374151'/%3E%3Ctext x='50%25' y='45%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial, sans-serif' font-size='16' fill='%23D1D5DB'%3EAdd profile.jpg%3C/text%3E%3Ctext x='50%25' y='55%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial, sans-serif' font-size='16' fill='%23D1D5DB'%3Eto /public folder%3C/text%3E%3C/svg%3E";
                      }}
                    />
                  </div>
                  {/* Enhanced glow effect */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500/30 via-red-700/20 to-red-900/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-4 -right-4 w-72 h-72 bg-red-600 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-red-pulse"></div>
          <div className="absolute -bottom-8 -left-4 w-72 h-72 bg-red-800 rounded-full mix-blend-multiply filter blur-xl opacity-25 animate-gold-pulse"></div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-20 px-4 sm:px-6 lg:px-8 relative"
        ref={aboutRef}
        style={{
          background: `linear-gradient(180deg, transparent 0%, rgba(40, 10, 10, 0.3) 50%, transparent 100%)`,
        }}
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12 text-center gradient-text">
            {t("aboutTitle")}
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* About Text */}
            <div>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                {t("aboutText1")}
              </p>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                {t("aboutText2")}
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center text-gray-300">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                  {t("availableForOpportunities")}
                </div>
                <div className="flex items-center text-gray-300">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                  {t("basedInCanada")}
                </div>
              </div>
            </div>
            <div className="glass-dark p-8 rounded-2xl magnetic hover:border-blue-500/50 transition-all duration-300">
              <h3 className="text-xl font-semibold text-white mb-4">
                {t("quickFacts")}
              </h3>
              <ul className="space-y-3 text-gray-300">
                <li>{t("fact1")}</li>
                <li>{t("fact2")}</li>
                <li>{t("fact3")}</li>
                <li>{t("fact4")}</li>
                <li>{t("fact5")}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Company Logos Section */}
      <CompanyLogos />

      {/* Projects Section */}
      <section
        id="projects"
        className="py-20 px-4 sm:px-6 lg:px-8"
        ref={projectsRef}
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">
            Featured Projects
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8">
            {/* SOC Implementation & Honeypot Analysis */}
            <ProjectCard
              title="SOC Implementation & Honeypot Analysis"
              description="Advanced threat detection system with Microsoft Sentinel SOC deployment, analyzing attack patterns from 50+ global locations with real-time monitoring and alerting"
              technologies={["Microsoft Azure", "Sentinel", "Network Security"]}
              gradient="from-red-500 to-purple-500"
              techColors={[
                "bg-red-500/20 text-red-300",
                "bg-purple-500/20 text-purple-300",
                "bg-blue-500/20 text-blue-300",
              ]}
              features={[
                "• Real-time threat detection and alerting",
                "• Multi-region attack pattern analysis", 
                "• Custom analytics and visualizations",
              ]}
            />

            <ProjectCard
              title="CCNA Practice Platform"
              description="Interactive web platform for CCNA certification preparation with 50+ active users providing valuable learning insights"
              technologies={["JavaScript", "HTML/CSS", "HTTPS"]}
              gradient="from-blue-500 to-cyan-500"
              techColors={[
                "bg-yellow-500/20 text-yellow-300",
                "bg-orange-500/20 text-orange-300",
                "bg-green-500/20 text-green-300",
              ]}
              features={[
                "• Interactive learning modules",
                "• Secure user authentication",
                "• Responsive design across devices",
              ]}
              websiteUrl="https://mazen-alhassan.github.io/CCNA-Practice-Quiz-/#"
            />

            <ProjectCard
              title="MITRE ATT&CK Flow Generator"
              description="Advanced Python tool generating visual attack flow diagrams based on MITRE ATT&CK framework with comprehensive threat modeling capabilities"
              technologies={["Python", "NetworkX", "Matplotlib"]}
              gradient="from-green-500 to-emerald-500"
              techColors={[
                "bg-green-500/20 text-green-300",
                "bg-emerald-500/20 text-emerald-300",
                "bg-cyan-500/20 text-cyan-300",
              ]}
              features={[
                "• Multi-asset attack flow generation",
                "• Interactive CLI with guided prompts",
                "• High-quality PNG and JSON export",
              ]}
              websiteUrl="https://github.com/Mazen-Alhassan/mitre-attack-flow-generator"
            />

            <ProjectCard
              title="Sports Analytics Platform"
              description="Advanced real-time sports analytics platform with multi-API integration, statistical modeling, automated notifications, and comprehensive data visualization"
              technologies={["Flask", "Python", "APIs"]}
              gradient="from-indigo-500 to-purple-500"
              techColors={[
                "bg-indigo-500/20 text-indigo-300",
                "bg-purple-500/20 text-purple-300",
                "bg-blue-500/20 text-blue-300",
              ]}
              features={[
                "• Real-time multi-API data integration",
                "• Statistical analysis and visualization",
                "• Email/SMS notification system",
              ]}
              websiteUrl="https://github.com/Mazen-Alhassan/sports-analytics-platform"
            />
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section
        id="skills"
        className="py-20 px-4 sm:px-6 lg:px-8 relative"
        ref={skillsRef}
        style={{
          background: `linear-gradient(180deg, transparent 0%, rgba(10, 5, 5, 0.5) 50%, transparent 100%)`,
        }}
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12 text-center gradient-text">
            Skills & Technologies
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Programming */}
            <div className="glass-dark p-6 rounded-2xl magnetic hover:border-blue-500/50 transition-all duration-300">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                <span className="w-3 h-3 bg-blue-500 rounded-full mr-3"></span>
                Programming
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "Python",
                  "JavaScript/TypeScript",
                  "C++",
                  "C",
                  "SQL",
                  "PowerShell",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Cybersecurity */}
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-6 rounded-2xl border border-gray-700/50">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                <span className="w-3 h-3 bg-red-500 rounded-full mr-3"></span>
                Cybersecurity
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "MITRE ATT&CK",
                  "Network Security",
                  "Threat Detection",
                  "SOC Analysis",
                  "Incident Response",
                  "Penetration Testing",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-red-500/20 text-red-300 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Tools & Platforms */}
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-6 rounded-2xl border border-gray-700/50">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                <span className="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
                Tools & Platforms
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "Microsoft Azure",
                  "Docker",
                  "Git/GitHub",
                  "Linux",
                  "Active Directory",
                  "NetworkX",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Certifications with Unlock Animations */}
          <div className="mt-16 text-center">
            <PulseElement pulseType="gold">
              <h3 className="text-2xl font-semibold text-white mb-8 gradient-red-gold">
                🏆 {t("certifications")}
              </h3>
            </PulseElement>
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              <CertificationBadge
                certification={t("cert1")}
                delay={200}
                gradient="bg-gradient-to-r from-red-900/20 to-red-700/20 text-red-300 border-red-700/30"
              />
              <CertificationBadge
                certification={t("cert2")}
                delay={400}
                gradient="bg-gradient-to-r from-red-800/20 to-red-900/20 text-red-300 border-red-600/30"
              />
              <CertificationBadge
                certification={t("cert3")}
                delay={600}
                gradient="bg-gradient-to-r from-red-700/20 to-red-800/20 text-red-300 border-red-500/30"
              />
              <CertificationBadge
                certification={t("cert4")}
                delay={800}
                gradient="bg-gradient-to-r from-red-600/20 to-red-800/20 text-red-300 border-red-700/30"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-20 px-4 sm:px-6 lg:px-8 relative"
        ref={contactRef}
        style={{
          background: `linear-gradient(180deg, transparent 0%, rgba(25, 10, 10, 0.2) 50%, transparent 100%)`,
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-8 gradient-text">
            Let&apos;s Connect
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            Interested in cybersecurity research, full-stack development, or
            just want to chat about technology? I&apos;d love to hear from you.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <a
              href="mailto:Mazen.alhassan@gmail.com"
              className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-6 rounded-2xl border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 transform hover:scale-105"
            >
              <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-500/30 transition-colors">
                <span className="text-blue-400 text-xl">✉</span>
              </div>
              <h3 className="text-white font-semibold mb-2">Email</h3>
              <p className="text-gray-400">Mazen.alhassan@gmail.com</p>
            </a>

            <a
              href="https://linkedin.com/in/mazen-alhassan3489"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-6 rounded-2xl border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 transform hover:scale-105"
            >
              <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-500/30 transition-colors">
                <span className="text-blue-400 text-xl">💼</span>
              </div>
              <h3 className="text-white font-semibold mb-2">LinkedIn</h3>
              <p className="text-gray-400">Connect with me</p>
            </a>

            <div className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-6 rounded-2xl border border-gray-700/50">
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-400 text-xl">📞</span>
              </div>
              <h3 className="text-white font-semibold mb-2">Phone</h3>
              <p className="text-gray-400">613-294-4133</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-600/10 to-blue-600/10 p-8 rounded-2xl border border-purple-500/20">
            <h3 className="text-2xl font-semibold text-white mb-4">
              Ready to collaborate?
            </h3>
            <p className="text-gray-300 mb-6">
              Whether you&apos;re looking for cybersecurity research
              collaboration, full-stack development expertise, or consulting on
              network security projects, I&apos;m always excited to work on
              challenging problems.
            </p>
            <a
              href="mailto:Mazen.alhassan@gmail.com?subject=Collaboration Opportunity"
              className="inline-flex items-center bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-full font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
            >
              Start a Conversation
              <span className="ml-2">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/40 border-t border-gray-800 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">
            © 2025 Mazen Alhassan. Built with Next.js and Tailwind CSS.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Deployed on Vercel • Designed with security in mind
          </p>
        </div>
      </footer>
    </div>
  );
}

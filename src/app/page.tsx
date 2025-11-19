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
import { PulseElement } from "../components/UnlockAnimations";

export default function Home() {
  const [, setActiveSection] = useState("hero");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const { language, toggleLanguage, t } = useLanguage();
  // Using original Red Team theme as default (no theme switching)

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
        background: `linear-gradient(to right, #000000 0%, #0a0a0a 25%, #1a1a1a 50%, #0a0a0a 75%, #000000 100%)`,
      }}
    >
      <ParticleBackground />
      {/* Navigation */}
      <nav
        className={`fixed top-4 left-4 right-4 z-50 transition-all duration-300 rounded-2xl ${
          isScrolled ? "glass-silver" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="flex items-center justify-between h-16">
            <div className="text-white font-bold text-xl gradient-silver-white">
              MA
            </div>
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
                className="ml-4 px-4 py-2 rounded-full bg-gradient-to-r from-gray-600/20 to-gray-800/20 border border-gray-500/30 text-white text-sm font-medium hover:from-gray-600/30 hover:to-gray-800/30 transition-all duration-300 magnetic animate-silver-pulse"
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
          className="absolute inset-0 bg-gradient-to-r from-black/80 via-gray-900/20 to-black/80"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        ></div>

        {/* Floating elements */}
        <PulseElement pulseType="silver">
          <div
            ref={parallaxRef1}
            className="absolute top-20 left-10 animate-float"
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-gray-600/40 to-gray-800/40 blur-xl"></div>
          </div>
        </PulseElement>
        <PulseElement pulseType="grey">
          <div
            ref={parallaxRef2}
            className="absolute bottom-20 right-10 animate-float"
            style={{ animationDelay: "2s" }}
          >
            <div className="w-32 h-32 rounded-full bg-gradient-to-r from-gray-700/30 to-gray-900/30 blur-xl"></div>
          </div>
        </PulseElement>

        {/* Mouse follower */}
        <div
          className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-gray-600/15 to-gray-900/15 blur-3xl pointer-events-none transition-all duration-1000 ease-out"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        ></div>

        <div className="relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-center min-h-[80vh]">
              {/* Text content - centered */}
              <div className="text-center max-w-4xl">
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight gradient-silver-white">
                  {t("heroTitle")}
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 mb-8">
                  {t("heroSubtitle")}
                </p>
                <p className="text-lg text-gray-400 mb-12">
                  {t("heroDescription")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-4 -right-4 w-72 h-72 bg-gray-600 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-silver-pulse"></div>
          <div className="absolute -bottom-8 -left-4 w-72 h-72 bg-gray-800 rounded-full mix-blend-multiply filter blur-xl opacity-25 animate-grey-pulse"></div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-20 px-4 sm:px-6 lg:px-8 relative"
        ref={aboutRef}
        style={{
          background: `linear-gradient(180deg, transparent 0%, rgba(10, 0, 0, 0.2) 50%, transparent 100%)`,
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
              title={t("socTitle")}
              description={t("socDescription")}
              technologies={["Microsoft Azure", "Sentinel", "Network Security"]}
              gradient="from-gray-700 to-gray-900"
              techColors={[
                "bg-gray-700/30 text-gray-300",
                "bg-gray-800/30 text-gray-300",
                "bg-gray-900/30 text-gray-300",
              ]}
              features={[
                "• Real-time threat detection and alerting",
                "• Multi-region attack pattern analysis",
                "• Custom analytics and visualizations",
              ]}
            />

            <ProjectCard
              title={t("ccnaTitle")}
              description={t("ccnaDescription")}
              technologies={["JavaScript", "HTML/CSS", "HTTPS"]}
              gradient="from-gray-700 to-gray-900"
              techColors={[
                "bg-gray-700/30 text-gray-300",
                "bg-gray-800/30 text-gray-300",
                "bg-gray-900/30 text-gray-300",
              ]}
              features={[
                "• Interactive learning modules",
                "• Secure user authentication",
                "• Responsive design across devices",
              ]}
              websiteUrl="https://mazen-alhassan.github.io/CCNA-Practice-Quiz-/#"
            />

            <ProjectCard
              title={t("mitreTitle")}
              description={t("mitreDescription")}
              technologies={["Python", "NetworkX", "Matplotlib"]}
              gradient="from-gray-700 to-gray-900"
              techColors={[
                "bg-gray-700/30 text-gray-300",
                "bg-gray-800/30 text-gray-300",
                "bg-gray-900/30 text-gray-300",
              ]}
              features={[
                "• Multi-asset attack flow generation",
                "• Interactive CLI with guided prompts",
                "• High-quality PNG and JSON export",
              ]}
              websiteUrl="https://github.com/Mazen-Alhassan/mitre-attack-flow-generator"
            />

            <ProjectCard
              title={t("sportsTitle")}
              description={t("sportsDescription")}
              technologies={["Flask", "Python", "APIs"]}
              gradient="from-gray-700 to-gray-900"
              techColors={[
                "bg-gray-700/30 text-gray-300",
                "bg-gray-800/30 text-gray-300",
                "bg-gray-900/30 text-gray-300",
              ]}
              features={[
                "• Real-time multi-API data integration",
                "• Statistical analysis and visualization",
                "• Email/SMS notification system",
              ]}
              websiteUrl="https://github.com/Mazen-Alhassan/sports-analytics-platform"
            />

            <ProjectCard
              title={t("keyStudyTitle")}
              description={t("keyStudyDescription")}
              technologies={["Web Platform", "Education", "Student Resources"]}
              gradient="from-gray-700 to-gray-900"
              techColors={[
                "bg-gray-700/30 text-gray-300",
                "bg-gray-800/30 text-gray-300",
                "bg-gray-900/30 text-gray-300",
              ]}
              features={[
                "• Affordable access to study materials",
                "• CourseHero document access",
                "• Cost-effective learning resources",
              ]}
              websiteUrl="https://keystudy.org"
            />
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section
        id="skills"
        className="py-12 px-4 sm:px-6 lg:px-8 relative"
        ref={skillsRef}
        style={{
          background: `linear-gradient(180deg, transparent 0%, rgba(5, 0, 0, 0.3) 50%, transparent 100%)`,
        }}
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-8 text-center gradient-text">
            Skills & Technologies
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {/* Programming Languages */}
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-6 rounded-2xl border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                <span className="w-3 h-3 bg-gray-500 rounded-full mr-3"></span>
                Programming
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "Python",
                  "JavaScript",
                  "TypeScript",
                  "C++",
                  "C",
                  "SQL",
                  "PowerShell",
                  "HTML/CSS",
                  "PHP",
                  "Bash",
                  "MATLAB",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-gray-700/30 text-gray-300 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Frameworks & Tools */}
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-6 rounded-2xl border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                <span className="w-3 h-3 bg-gray-500 rounded-full mr-3"></span>
                Frameworks & Tools
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "React.js",
                  "Next.js",
                  "Flask",
                  "Django",
                  "Express.js",
                  "NetworkX",
                  "Pandas",
                  "XCode",
                  "Jenkins",
                  "Kubernetes",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-gray-700/30 text-gray-300 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Cybersecurity */}
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-6 rounded-2xl border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                <span className="w-3 h-3 bg-gray-500 rounded-full mr-3"></span>
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
                    className="px-3 py-1 bg-gray-700/30 text-gray-300 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Tools & Platforms */}
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-6 rounded-2xl border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                <span className="w-3 h-3 bg-gray-500 rounded-full mr-3"></span>
                Tools & Platforms
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "Microsoft Azure",
                  "Docker",
                  "Git/GitHub",
                  "Linux",
                  "Active Directory",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-gray-700/30 text-gray-300 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Resume Download Section */}
          <div className="mt-12 text-center">
            <h3 className="text-2xl font-semibold text-white mb-6 gradient-silver-white">
              📄 {t("resume")}
            </h3>
            <div className="max-w-2xl mx-auto">
              <p className="text-gray-300 mb-6 text-lg">
                {t("resumeDescription")}
              </p>
              <button
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = "/Mazen Alhassan CV copy.pdf";
                  link.download = "Mazen_Alhassan_Resume.pdf";
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
                className="bg-gradient-to-r from-gray-600 to-gray-800 text-white px-8 py-4 rounded-lg font-medium hover:from-gray-700 hover:to-gray-900 transition-all duration-300 transform hover:scale-105 inline-flex items-center space-x-3 text-lg"
              >
                <span>📄</span>
                <span>{t("downloadResume")}</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="pt-8 pb-20 px-4 sm:px-6 lg:px-8 relative"
        ref={contactRef}
        style={{
          background: `linear-gradient(180deg, transparent 0%, rgba(5, 0, 0, 0.15) 50%, transparent 100%)`,
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-8 gradient-text">
            {t("contactTitle")}
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            {t("contactDescription")}
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <a
              href="mailto:Mazen.alhassan@gmail.com"
              className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-6 rounded-2xl border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 transform hover:scale-105"
            >
              <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-500/30 transition-colors">
                <svg
                  className="w-6 h-6 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-2">{t("email")}</h3>
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
              <p className="text-gray-400">{t("connectWithMe")}</p>
            </a>

            <div className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-6 rounded-2xl border border-gray-700/50">
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-400 text-xl">📞</span>
              </div>
              <h3 className="text-white font-semibold mb-2">{t("phone")}</h3>
              <p className="text-gray-400">613-294-4133</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-gray-900/20 to-gray-700/20 p-8 rounded-2xl border border-gray-500/30">
            <h3 className="text-2xl font-semibold text-white mb-4">
              {t("readyToCollaborate")}
            </h3>
            <p className="text-gray-300 mb-6">{t("collaborateDescription")}</p>
            <a
              href="mailto:Mazen.alhassan@gmail.com?subject=Collaboration Opportunity"
              className="inline-flex items-center bg-gradient-to-r from-gray-600 to-gray-800 text-white px-8 py-3 rounded-full font-medium hover:from-gray-700 hover:to-gray-900 transition-all duration-300 transform hover:scale-105"
            >
              {t("startConversation")}
              <span className="ml-2">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/40 border-t border-gray-800 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">
            © 2025 Mazen Alhassan. {t("builtWith")}
          </p>
          <p className="text-gray-500 text-sm mt-2">
            {t("deployedOn")} • {t("designedWithSecurity")}
          </p>
        </div>
      </footer>
    </div>
  );
}

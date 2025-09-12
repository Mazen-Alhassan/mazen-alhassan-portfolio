"use client";

import { useState, useEffect } from "react";
import ParticleBackground from "../components/ParticleBackground";
import ProjectCard from "../components/ProjectCard";
import { useScrollAnimation, useParallax } from "../components/ScrollAnimations";

export default function Home() {
  const [, setActiveSection] = useState("hero");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  
  const heroRef = useScrollAnimation();
  const aboutRef = useScrollAnimation();
  const experienceRef = useScrollAnimation();
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-x-hidden">
      <ParticleBackground />
      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-black/80 backdrop-blur-md border-b border-white/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="text-white font-bold text-xl">MA</div>
            <div className="hidden md:flex space-x-8">
              {["About", "Experience", "Projects", "Skills", "Contact"].map(
                (item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium"
                  >
                    {item}
                  </button>
                )
              )}
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
        {/* Dynamic background elements */}
        <div 
          className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-teal-600/20"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        ></div>
        
        {/* Floating elements */}
        <div ref={parallaxRef1} className="absolute top-20 left-10 animate-float">
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500/30 to-purple-500/30 blur-xl"></div>
        </div>
        <div ref={parallaxRef2} className="absolute bottom-20 right-10 animate-float" style={{ animationDelay: '2s' }}>
          <div className="w-32 h-32 rounded-full bg-gradient-to-r from-cyan-500/20 to-teal-500/20 blur-xl"></div>
        </div>
        
        {/* Mouse follower */}
        <div
          className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-3xl pointer-events-none transition-all duration-1000 ease-out"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        ></div>
        
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
          <div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight gradient-text">
              Mazen Alhassan
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Cybersecurity Researcher & Full-Stack Developer
            </p>
            <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
              Building secure systems and conducting cutting-edge research in
              network security, MITRE ATT&CK frameworks, and threat detection at
              Université Laval
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => scrollToSection("projects")}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
              >
                View My Work
              </button>
              <a
                href="mailto:Mazen.alhassan@gmail.com"
                className="border border-white/30 text-white px-8 py-3 rounded-full font-medium hover:bg-white/10 transition-all duration-300"
              >
                Get In Touch
              </a>
            </div>
          </div>
        </div>

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-4 -right-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-8 -left-4 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8" ref={aboutRef}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12 text-center gradient-text">
            About Me
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                I&apos;m a passionate cybersecurity researcher and full-stack
                developer pursuing my Bachelor&apos;s degree in Information
                Technology/Network Technology at Carleton University, with an
                expected graduation in April 2027.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Currently working as a Research Intern at Université Laval, I
                specialize in building MITRE ATT&CK-driven attack-flow
                generators, modeling secure databases, and conducting
                comprehensive cybersecurity research.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center text-gray-300">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                  Available for opportunities
                </div>
                <div className="flex items-center text-gray-300">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                  Based in Canada
                </div>
              </div>
            </div>
            <div className="glass-dark p-8 rounded-2xl magnetic hover:border-blue-500/50 transition-all duration-300">
              <h3 className="text-xl font-semibold text-white mb-4">
                Quick Facts
              </h3>
              <ul className="space-y-3 text-gray-300">
                <li>
                  🎓 Information Technology Student at Carleton University
                </li>
                <li>🔬 Research Intern at Université Laval</li>
                <li>🛡️ Cybersecurity Foundations Certified</li>
                <li>💻 Full-Stack Developer (Python, JavaScript, C++)</li>
                <li>🌐 Network Security Specialist</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section
        id="experience"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-black/20"
        ref={experienceRef}
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12 text-center gradient-text">
            Experience
          </h2>
          <div className="space-y-8">
            {/* Research Intern */}
            <div className="glass-dark p-8 rounded-2xl hover:border-purple-500/50 transition-all duration-300 magnetic group">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-semibold text-white">
                    Research Intern
                  </h3>
                  <p className="text-purple-400 font-medium">
                    Université Laval
                  </p>
                </div>
                <span className="text-gray-400 font-medium">
                  Jun. 2025 – Present
                </span>
              </div>
              <ul className="space-y-3 text-gray-300">
                <li>
                  • Built a MITRE ATT&CK-driven attack-flow generator in Python
                  (NetworkX, Matplotlib), modeling databases and web apps for
                  confidentiality and integrity with 30+ multi-step paths
                </li>
                <li>
                  • Unified isolated paths into a stitched, capability-tagged
                  DAG so attackers can pivot across paths mid-flow, producing
                  one comprehensive graph instead of separate visuals
                </li>
                <li>
                  • Designed a risk model (probability × impact) with
                  per-technique metadata to score nodes and rank the most
                  consequential attack routes
                </li>
                <li>
                  • Conducted comprehensive review and analysis of 25+
                  cybersecurity research papers to identify gaps in current
                  attack modeling methodologies
                </li>
              </ul>
            </div>

            {/* IT Support Consultant */}
            <div className="glass-dark p-8 rounded-2xl hover:border-blue-500/50 transition-all duration-300 magnetic group">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-semibold text-white">
                    IT Support Consultant
                  </h3>
                  <p className="text-blue-400 font-medium">
                    Carleton University
                  </p>
                </div>
                <span className="text-gray-400 font-medium">
                  Sep. 2024 – Apr. 2025
                </span>
              </div>
              <ul className="space-y-3 text-gray-300">
                <li>
                  • Resolved 150+ hardware/software tickets for faculty, staff,
                  and students across Windows 10/11 and macOS using remote tools
                </li>
                <li>
                  • Provisioned and secured 200+ devices with BitLocker
                  (Windows) and FileVault (macOS); enforced role-based access
                  via Active Directory
                </li>
                <li>
                  • Performed account administration (on/off-boarding, group
                  membership, password resets) and wrote user-facing how-tos
                </li>
              </ul>
            </div>

            {/* Full Stack Dev Intern */}
            <div className="glass-dark p-8 rounded-2xl hover:border-green-500/50 transition-all duration-300 magnetic group">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-semibold text-white">
                    Full Stack Dev / QA Tester Intern
                  </h3>
                  <p className="text-green-400 font-medium">Locym</p>
                </div>
                <span className="text-gray-400 font-medium">
                  Mar. 2025 – May 2025
                </span>
              </div>
              <ul className="space-y-3 text-gray-300">
                <li>
                  • Designed and implemented a comprehensive end-to-end testing
                  framework for a Next.js application by creating 50+ automated
                  test cases
                </li>
                <li>
                  • Reduced manual QA overhead by 60% by writing 75+ unit and
                  integration tests and establishing GitHub Actions CI pipelines
                </li>
                <li>
                  • Improved production system reliability by 40% by
                  investigating 15+ critical production issues, implementing
                  targeted testing strategies
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

        {/* Projects Section */}
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8" ref={projectsRef}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">
            Featured Projects
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* SOC Implementation */}
            <ProjectCard
              title="SOC Implementation"
              description="Deployed Microsoft Sentinel with custom workbook and analytics rules to visualize and alert on RDP brute-force activity"
              technologies={["Microsoft Azure", "Sentinel", "PowerShell"]}
              gradient="from-red-500 to-orange-500"
              techColors={[
                "bg-red-500/20 text-red-300",
                "bg-orange-500/20 text-orange-300",
                "bg-blue-500/20 text-blue-300"
              ]}
              features={[
                "• Real-time threat detection and alerting",
                "• Custom analytics and visualizations",
                "• Automated incident response"
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
                "bg-green-500/20 text-green-300"
              ]}
              features={[
                "• Interactive learning modules",
                "• Secure user authentication",
                "• Responsive design across devices"
              ]}
            />

            <ProjectCard
              title="Honeypot Network Analysis"
              description="Advanced threat detection system analyzing attack patterns from 50+ global locations with real-time monitoring"
              technologies={["Network Security", "Threat Intel", "Log Analysis"]}
              gradient="from-purple-500 to-pink-500"
              techColors={[
                "bg-purple-500/20 text-purple-300",
                "bg-pink-500/20 text-pink-300",
                "bg-blue-500/20 text-blue-300"
              ]}
              features={[
                "• Multi-region threat detection",
                "• Advanced pattern analysis",
                "• Real-time alert correlation"
              ]}
            />
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-black/20" ref={skillsRef}>
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

          {/* Certifications */}
          <div className="mt-12 text-center">
            <h3 className="text-2xl font-semibold text-white mb-6">
              Certifications
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 px-6 py-3 rounded-full border border-purple-500/30">
                <span className="text-purple-300 font-medium">
                  Cybersecurity Foundations - LinkedIn Learning
                </span>
              </div>
              <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 px-6 py-3 rounded-full border border-blue-500/30">
                <span className="text-blue-300 font-medium">
                  IT Service Desk - LinkedIn Learning
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8" ref={contactRef}>
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

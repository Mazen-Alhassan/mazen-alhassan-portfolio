"use client";

import { useTiltEffect } from "./ScrollAnimations";
import { useLanguage } from "../contexts/LanguageContext";

interface Company {
  name: string;
  website: string;
  logo: string;
  description: string;
}

const companies: Company[] = [
  {
    name: "Carleton University",
    website: "https://carleton.ca/",
    logo: "/carleton-logo.png", // Add carleton-logo.png to /public folder
    description: "IT Support Consultant",
  },
  {
    name: "LOCVM",
    website: "https://www.locvm.ca/",
    logo: "/locvm-logo.png", // Add locvm-logo.png to /public folder
    description: "Full Stack Dev / QA Tester Intern",
  },
  {
    name: "Université Laval",
    website: "https://www.ulaval.ca/",
    logo: "/laval-logo.png", // Add laval-logo.png to /public folder
    description: "Research Intern",
  },
  {
    name: "Kelly Santini LLP",
    website: "https://www.kellysantini.com/",
    logo: "/kelly-santini-logo.png", // Add kelly-santini-logo.png to /public folder
    description: "Office Assistant",
  },
];

export default function CompanyLogos() {
  const { t } = useLanguage();

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 bg-black/20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-white mb-12 text-center gradient-text">
          {t("companiesTitle")}
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {companies.map((company) => (
            <CompanyCard key={company.name} company={company} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CompanyCard({ company }: { company: Company }) {
  const tiltRef = useTiltEffect();

  const handleClick = () => {
    window.open(company.website, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      ref={tiltRef}
      onClick={handleClick}
      className="group glass-dark p-8 rounded-2xl cursor-pointer transition-all duration-500 transform-gpu magnetic hover:border-blue-500/50 relative overflow-hidden"
    >
      {/* Logo Container */}
      <div className="flex items-center justify-center mb-6 h-24">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={company.logo}
          alt={`${company.name} logo`}
          className="max-h-full max-w-full object-contain filter brightness-90 group-hover:brightness-100 transition-all duration-300"
          onError={(e) => {
            // Fallback to text if image fails to load
            const target = e.target as HTMLImageElement;
            target.style.display = "none";
            const parent = target.parentElement;
            if (parent) {
              parent.innerHTML = `<div class="text-white font-bold text-lg text-center">${company.name}</div>`;
            }
          }}
        />
      </div>

      {/* Company Name */}
      <h3 className="text-xl font-semibold text-white text-center mb-2 group-hover:neon-blue transition-all duration-300">
        {company.name}
      </h3>

      {/* Description */}
      <p className="text-gray-400 text-center text-sm group-hover:text-gray-300 transition-colors duration-300">
        {company.description}
      </p>

      {/* Hover Effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-cyan-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-cyan-500/10 transition-all duration-500 pointer-events-none"></div>

      {/* Click Indicator */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center">
          <span className="text-blue-400 text-xs">↗</span>
        </div>
      </div>
    </div>
  );
}

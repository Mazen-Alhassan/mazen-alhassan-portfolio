"use client";

import { useTiltEffect } from "./ScrollAnimations";

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  gradient: string;
  techColors: string[];
  features: string[];
  websiteUrl?: string;
}

export default function ProjectCard({
  title,
  description,
  technologies,
  gradient,
  techColors,
  features,
  websiteUrl,
}: ProjectCardProps) {
  const tiltRef = useTiltEffect();

  const handleClick = () => {
    if (websiteUrl) {
      window.open(websiteUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div
      ref={tiltRef}
      className={`group glass p-6 rounded-2xl border border-gray-700/50 hover:border-purple-500/50 transition-all duration-500 transform-gpu magnetic ${
        websiteUrl ? "cursor-pointer hover:scale-105" : ""
      }`}
      onClick={handleClick}
    >
      <div
        className={`h-2 bg-gradient-to-r ${gradient} rounded-full mb-6 animate-glow`}
      ></div>

      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-white group-hover:neon-blue transition-all duration-300">
          {title}
        </h3>
        {websiteUrl && (
          <div className="flex items-center gap-2 text-gray-400 group-hover:text-blue-400 transition-colors duration-300">
            <svg
              className="w-5 h-5 transform group-hover:scale-110 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
            <span className="text-sm font-medium">Visit Site</span>
          </div>
        )}
      </div>

      <p className="text-gray-300 mb-4 leading-relaxed">{description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {technologies.map((tech, index) => (
          <span
            key={tech}
            className={`px-3 py-1 ${techColors[index]} rounded-full text-sm font-medium transition-all duration-300 hover:scale-110`}
          >
            {tech}
          </span>
        ))}
      </div>

      <ul className="text-gray-400 text-sm space-y-1">
        {features.map((feature) => (
          <li
            key={feature}
            className="hover:text-gray-300 transition-colors duration-200"
          >
            {feature}
          </li>
        ))}
      </ul>

      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-cyan-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-cyan-500/10 transition-all duration-500 pointer-events-none"></div>
    </div>
  );
}

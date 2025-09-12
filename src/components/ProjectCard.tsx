"use client";

import { useTiltEffect } from "./ScrollAnimations";

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  gradient: string;
  techColors: string[];
  features: string[];
}

export default function ProjectCard({
  title,
  description,
  technologies,
  gradient,
  techColors,
  features,
}: ProjectCardProps) {
  const tiltRef = useTiltEffect();

  return (
    <div
      ref={tiltRef}
      className="group glass p-6 rounded-2xl border border-gray-700/50 hover:border-purple-500/50 transition-all duration-500 transform-gpu magnetic"
    >
      <div
        className={`h-2 bg-gradient-to-r ${gradient} rounded-full mb-6 animate-glow`}
      ></div>

      <h3 className="text-xl font-semibold text-white mb-4 group-hover:neon-blue transition-all duration-300">
        {title}
      </h3>

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

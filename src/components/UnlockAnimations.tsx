import { useEffect, useState, useRef } from "react";

// Hook for unlock animations on scroll
export const useUnlockAnimation = (delay: number = 0) => {
  const [isUnlocked, setIsUnlocked] = useState(delay === 0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If no delay, skip animation entirely
    if (delay === 0) {
      setIsUnlocked(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isUnlocked) {
          setTimeout(() => {
            setIsUnlocked(true);
          }, delay);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [delay, isUnlocked]);

  return { ref, isUnlocked };
};

// Certification Badge Component (simplified - no animations)
interface CertificationBadgeProps {
  certification: string;
  gradient: string;
}

export const CertificationBadge: React.FC<CertificationBadgeProps> = ({
  certification,
  gradient,
}) => {
  // Simple static component - no animations to avoid React Hooks issues
  return (
    <div
      className={`${gradient} px-6 py-4 rounded-full border relative overflow-hidden transform-gpu min-h-[60px] flex items-center justify-center opacity-100`}
    >
      {/* Certification text */}
      <span className="font-medium relative z-10">{certification}</span>
    </div>
  );
};

// Pulse effect component
interface PulseElementProps {
  children: React.ReactNode;
  pulseType?: "silver" | "grey" | "heartbeat";
  className?: string;
}

export const PulseElement: React.FC<PulseElementProps> = ({
  children,
  pulseType = "silver",
  className = "",
}) => {
  const pulseClass = {
    silver: "animate-silver-pulse",
    grey: "animate-grey-pulse",
    heartbeat: "animate-heartbeat",
  }[pulseType];

  return <div className={`${pulseClass} ${className}`}>{children}</div>;
};

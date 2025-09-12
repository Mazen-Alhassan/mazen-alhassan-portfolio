import { useEffect, useState, useRef } from "react";

// Hook for unlock animations on scroll
export const useUnlockAnimation = (delay: number = 0) => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
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

// Certification Badge Component with unlock animation
interface CertificationBadgeProps {
  certification: string;
  delay: number;
  gradient: string;
}

export const CertificationBadge: React.FC<CertificationBadgeProps> = ({
  certification,
  delay,
  gradient,
}) => {
  const { ref, isUnlocked } = useUnlockAnimation(delay);

  return (
    <div
      ref={ref}
      className={`${gradient} px-6 py-4 rounded-full border relative overflow-hidden transform-gpu min-h-[60px] flex items-center justify-center ${
        isUnlocked
          ? "animate-badge-unlock opacity-100"
          : "opacity-0 scale-0 rotate-180"
      }`}
    >
      {/* Lock icon overlay that disappears */}
      {!isUnlocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
          <span className="text-2xl">🔒</span>
        </div>
      )}

      {/* Certification text */}
      <span className="font-medium relative z-10">{certification}</span>

      {/* Unlock effect */}
      {isUnlocked && (
        <div className="absolute top-0 right-2 text-green-400 animate-bounce">
          ✓
        </div>
      )}
    </div>
  );
};

// Pulse effect component
interface PulseElementProps {
  children: React.ReactNode;
  pulseType?: "red" | "gold" | "heartbeat";
  className?: string;
}

export const PulseElement: React.FC<PulseElementProps> = ({
  children,
  pulseType = "red",
  className = "",
}) => {
  const pulseClass = {
    red: "animate-red-pulse",
    gold: "animate-gold-pulse",
    heartbeat: "animate-heartbeat",
  }[pulseType];

  return <div className={`${pulseClass} ${className}`}>{children}</div>;
};

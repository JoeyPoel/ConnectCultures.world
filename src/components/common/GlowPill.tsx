import React from "react";

interface GlowPillProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "terracotta" | "amber" | "gold" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  icon?: React.ReactNode;
}

/**
 * Editorial Glow Pill button.
 * Encapsulates tactile button styles with ambient starlight and Earth blue atmospheric glow.
 */
export const GlowPill: React.FC<GlowPillProps> = ({
  variant = "terracotta",
  size = "md",
  children,
  icon,
  className = "",
  ...props
}) => {
  const sizeClasses = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  const variantClasses = {
    terracotta:
      "bg-earth-ocean text-stars-pureWhite border border-earth-cyan/60 hover:bg-earth-atmosphere hover:shadow-glow-cyan",
    amber:
      "bg-earth-cyan/15 text-earth-cyan border border-earth-cyan/40 hover:bg-earth-cyan/25 hover:shadow-glow-cyan",
    gold:
      "bg-earth-atmosphere/20 text-stars-starlight border border-earth-atmosphere/50 hover:bg-earth-atmosphere/30 hover:shadow-glow-earth",
    ghost:
      "bg-space-surface/85 text-stars-starlight border border-stars-hairline hover:border-earth-cyan/60 hover:bg-space-elevated backdrop-blur-md",
  };

  return (
    <button
      {...props}
      className={`group relative inline-flex items-center justify-center gap-2.5 rounded-full font-sans font-medium tracking-wide transition-all duration-300 transform active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      {icon && <span className="transition-transform group-hover:scale-110">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};

export default GlowPill;

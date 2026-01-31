import logoIcon from "@assets/swipesblue_logo_1769875241948.png";

interface LogoProps {
  variant?: "default" | "small" | "large";
  className?: string;
  showIcon?: boolean;
  showUrl?: boolean;
}

export default function Logo({ 
  variant = "default", 
  className = "", 
  showIcon = false,
  showUrl = false
}: LogoProps) {
  // Font sizes for different variants
  const fontSizes = {
    small: "18px",
    default: "24px",
    large: "32px"
  };
  
  const iconSizes = {
    small: "h-7 w-auto",
    default: "h-10 w-auto",
    large: "h-12 w-auto"
  };

  const fontSize = fontSizes[variant];
  const iconSize = iconSizes[variant];
  
  // Text shadow effects: black shadow (1px offset) + white glow (100px blur at 10% opacity)
  const swipesTextShadow = `
    1px 1px 0px #000000,
    0px 0px 100px rgba(255, 255, 255, 0.1),
    0px 0px 100px rgba(255, 255, 255, 0.1)
  `;
  
  const blueTextShadow = `
    1px 1px 0px #000000,
    0px 0px 100px rgba(255, 255, 255, 0.1),
    0px 0px 100px rgba(255, 255, 255, 0.1)
  `;
  
  return (
    <div className={`flex items-center gap-2 ${className}`} data-testid="logo-container">
      {/* Icon - only show when showIcon is true */}
      {showIcon && (
        <img 
          src={logoIcon} 
          alt="" 
          className={iconSize}
          data-testid="img-logo-icon"
        />
      )}
      
      {/* Company Name with font styling */}
      <div className="flex items-baseline" data-testid="company-name">
        <span 
          className="font-archivo-semi-expanded font-bold lowercase"
          style={{ 
            color: "#E00420",
            fontSize: fontSize,
            textShadow: swipesTextShadow,
            letterSpacing: "0.02em"
          }}
        >
          swipes
        </span>
        <span 
          className="font-archivo-narrow font-bold lowercase"
          style={{ 
            color: "#0000FF",
            fontSize: fontSize,
            textShadow: blueTextShadow,
            letterSpacing: "0.02em"
          }}
        >
          blue
        </span>
        {showUrl && (
          <span 
            className="font-archivo font-bold lowercase"
            style={{ 
              color: "#00FF40",
              fontSize: fontSize,
              letterSpacing: "-0.02em"
            }}
          >
            .com
          </span>
        )}
      </div>
    </div>
  );
}

import logoIcon from "@assets/SwipesBlue_logo_-_icon_1769846994249.png";

interface LogoProps {
  variant?: "default" | "small" | "large";
  className?: string;
  showIcon?: boolean;
  iconOnly?: boolean;
  showUrl?: boolean;
}

export default function Logo({ 
  variant = "default", 
  className = "", 
  showIcon = false,
  iconOnly = false,
  showUrl = false
}: LogoProps) {
  const textSizes = {
    small: "text-lg",
    default: "text-2xl",
    large: "text-4xl"
  };
  
  const iconSizes = {
    small: "h-6 w-auto",
    default: "h-8 w-auto",
    large: "h-12 w-auto"
  };

  const textSize = textSizes[variant];
  const iconSize = iconSizes[variant];
  
  if (iconOnly) {
    return (
      <img 
        src={logoIcon} 
        alt="SwipesBlue" 
        className={`${iconSize} ${className}`}
        data-testid="img-logo-icon"
      />
    );
  }
  
  return (
    <div className={`flex items-center gap-2 ${className}`} data-testid="logo-container">
      {showIcon && (
        <img 
          src={logoIcon} 
          alt="SwipesBlue Logo" 
          className={iconSize}
          data-testid="img-logo-icon"
        />
      )}
      <div className="flex items-baseline gap-0">
        <span 
          className={`font-archivo-semi-expanded font-bold ${textSize} tracking-tight`} 
          style={{ color: "#E00420" }}
        >
          swipes
        </span>
        <span 
          className={`font-archivo font-bold ${textSize} tracking-tight`} 
          style={{ color: "#0000FF" }}
        >
          blue
        </span>
        {showUrl && (
          <span 
            className={`font-archivo font-bold ${textSize} tracking-tight`} 
            style={{ color: "#00FF40" }}
          >
            .com
          </span>
        )}
      </div>
    </div>
  );
}

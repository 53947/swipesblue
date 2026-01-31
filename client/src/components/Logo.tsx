import logoIcon from "@assets/swipesblue approved brandmark_1761367228448.png";

interface LogoProps {
  variant?: "default" | "small" | "large";
  className?: string;
  showIcon?: boolean;
  iconOnly?: boolean;
}

export default function Logo({ 
  variant = "default", 
  className = "", 
  showIcon = false,
  iconOnly = false 
}: LogoProps) {
  const textSizes = {
    small: "text-lg",
    default: "text-2xl",
    large: "text-4xl"
  };
  
  const iconSizes = {
    small: "h-6 w-6",
    default: "h-10 w-10",
    large: "h-14 w-14"
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
      </div>
    </div>
  );
}

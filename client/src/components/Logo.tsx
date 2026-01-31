import logoWithText from "@assets/SwipesBlue_logo_-_icon_1769846994249.png";

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
  const logoSizes = {
    small: "h-8 w-auto",
    default: "h-10 w-auto",
    large: "h-14 w-auto"
  };

  const logoSize = logoSizes[variant];
  
  if (showIcon) {
    return (
      <div className={`flex items-center ${className}`} data-testid="logo-container">
        <img 
          src={logoWithText} 
          alt="SwipesBlue" 
          className={logoSize}
          data-testid="img-logo"
        />
      </div>
    );
  }
  
  const textSizes = {
    small: "text-lg",
    default: "text-xl",
    large: "text-3xl"
  };

  const textSize = textSizes[variant];
  
  return (
    <div className={`flex items-center gap-1.5 ${className}`} data-testid="logo-container">
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

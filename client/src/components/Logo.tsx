import logoImage from "@assets/swipesblue brandmark potential_1761287293569.png";

export default function Logo({ variant = "default", className = "", showIcon = false }: { variant?: "default" | "small"; className?: string; showIcon?: boolean }) {
  const textSize = variant === "small" ? "text-lg" : "text-2xl";
  const iconSize = variant === "small" ? "h-8" : "h-12";
  
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {showIcon && (
        <img 
          src={logoImage} 
          alt="SwipesBlue Logo" 
          className={iconSize}
          data-testid="img-swoosh-logo"
        />
      )}
      <div className="flex items-center gap-0">
        <span className={`font-archivo-semi-expanded font-bold ${textSize} ml-[1px] mr-[1px]`} style={{ color: "#FF0040" }}>
          SWIPES
        </span>
        <span className={`font-archivo font-bold ${textSize} ml-[1px] mr-[1px]`} style={{ color: "#0000FF" }}>
          BLUE
        </span>
        <span className={`font-archivo font-bold ${textSize} ml-[1px] mr-[1px]`} style={{ color: "#00FF40" }}>
          .COM
        </span>
      </div>
    </div>
  );
}

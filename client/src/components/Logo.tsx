export default function Logo({ variant = "default", className = "" }: { variant?: "default" | "small"; className?: string }) {
  const textSize = variant === "small" ? "text-lg" : "text-2xl";
  
  return (
    <div className={`flex items-center gap-0 ${className}`}>
      <span className={`font-archivo font-bold ${textSize}`} style={{ color: "#0000FF" }}>
        Swipes
      </span>
      <span className={`font-archivo font-bold ${textSize}`} style={{ color: "#00FF40" }}>
        .com
      </span>
    </div>
  );
}

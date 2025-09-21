export default function LoaderDotsBetter({ color = "orange", size = 6 }) {
  const dots = [0, 1, 2];
  return (
    <div className="h-full flex items-center justify-end  space-x-1">
      {dots.map((dot, i) => (
        <span
          key={i}
          className={`rounded-full inline-block`}
          style={{
            width: `${size}px`,
            height: `${size}px`,
            backgroundColor: color === "orange" ? "#F97316" : color,
            animation: "bounceDot 0.6s infinite",
            animationDelay: `${i * 0.2}s`,
          }}
        ></span>
      ))}

      <style>
        {`
          @keyframes bounceDot {
            0%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-6px); }
          }
        `}
      </style>
    </div>
  );
}
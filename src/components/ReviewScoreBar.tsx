import { useEffect, useRef, useState } from "react";

interface ReviewScoreBarProps {
  label: string;
  value: number;
  maxValue?: number;
}

export function ReviewScoreBar({ label, value, maxValue = 10 }: ReviewScoreBarProps) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const percentage = (value / maxValue) * 100;

  return (
    <div ref={ref} className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">{label}</span>
        <span className="text-sm font-bold text-foreground">{value.toFixed(1)}</span>
      </div>
      <div className="score-bar-track">
        <div
          className="score-bar-fill"
          style={{
            width: visible ? `${percentage}%` : "0%",
            "--score-width": `${percentage}%`,
          } as React.CSSProperties}
        />
      </div>
    </div>
  );
}

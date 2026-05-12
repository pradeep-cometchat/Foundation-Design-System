import React from "react";
import type { ProgressBarProps, ProgressCircleProps, ProgressCircleSize } from "./ProgressIndicator.types";
import "./ProgressIndicator.css";

/**
 * ProgressBar — a horizontal bar showing progress from 0–100%.
 * Supports label positions: right, top-floating, or none (slider with thumb).
 */
export const ProgressBar: React.FC<ProgressBarProps> = ({
  value = 0,
  label = "none",
  className,
}) => {
  const clamped = Math.max(0, Math.min(100, value));
  const classes = ["progress-bar", `progress-bar--label-${label}`, className].filter(Boolean).join(" ");

  return (
    <div className={classes} role="progressbar" aria-valuenow={clamped} aria-valuemin={0} aria-valuemax={100}>
      <div className="progress-bar__track">
        <div className="progress-bar__fill" style={{ width: `${clamped}%` }}>
          {label === "top-floating" && (
            <div className="progress-bar__floating-label">
              <span className="progress-bar__floating-text">{clamped}%</span>
            </div>
          )}
          {label === "none" && (
            <span className="progress-bar__thumb" />
          )}
        </div>
      </div>
      {label === "right" && (
        <span className="progress-bar__label-right">{clamped}%</span>
      )}
    </div>
  );
};

/**
 * ProgressCircle — a circular/ring progress indicator.
 * Sizes: xxs (64px), xs (160px), sm (200px).
 */
export const ProgressCircle: React.FC<ProgressCircleProps> = ({
  value = 0,
  size = "sm",
  label = "Active users",
  className,
}) => {
  const clamped = Math.max(0, Math.min(100, value));
  const classes = ["progress-circle", `progress-circle--${size}`, className].filter(Boolean).join(" ");

  const sizeMap: Record<ProgressCircleSize, { diameter: number; stroke: number }> = {
    sm: { diameter: 180, stroke: 20 },
    xs: { diameter: 144, stroke: 16 },
    xxs: { diameter: 56, stroke: 8 },
  };

  const { diameter, stroke } = sizeMap[size];
  const radius = (diameter - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clamped / 100) * circumference;

  return (
    <div className={classes} role="progressbar" aria-valuenow={clamped} aria-valuemin={0} aria-valuemax={100}>
      <svg className="progress-circle__svg" viewBox={`0 0 ${diameter} ${diameter}`}>
        {/* Background ring */}
        <circle
          className="progress-circle__bg"
          cx={diameter / 2}
          cy={diameter / 2}
          r={radius}
          strokeWidth={stroke}
          fill="none"
        />
        {/* Progress ring */}
        <circle
          className="progress-circle__ring"
          cx={diameter / 2}
          cy={diameter / 2}
          r={radius}
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${diameter / 2} ${diameter / 2})`}
        />
      </svg>
      {size === "xxs" ? (
        <span className="progress-circle__label-below">{label}</span>
      ) : (
        <div className="progress-circle__content">
          <span className="progress-circle__label">{label}</span>
          <span className="progress-circle__value">{clamped}%</span>
        </div>
      )}
    </div>
  );
};

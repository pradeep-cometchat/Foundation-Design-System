import React from "react";
import type { VideoPlayerProps, VideoPlayerSize } from "./VideoPlayer.types";
import "./VideoPlayer.css";

const sizeMap: Record<VideoPlayerSize, { width: number; height: number }> = {
  sm: { width: 320, height: 180 },
  md: { width: 560, height: 315 },
  lg: { width: 720, height: 405 },
};

/**
 * VideoPlayer — a 16:9 video player with controls overlay.
 * Sizes: sm (320×180), md (560×315), lg (720×405).
 */
export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  size = "lg",
  playing = false,
  progress = 0,
  buffered = 0,
  currentTime = "00:00",
  remainingTime = "-08:24",
  volume = 80,
  playbackSpeed = "1x",
  poster,
  className,
}) => {
  const { width, height } = sizeMap[size];
  const classes = ["video-player", `video-player--${size}`, playing && "video-player--playing", className].filter(Boolean).join(" ");

  return (
    <div className={classes} style={{ width, height }}>
      {poster && <img src={poster} alt="" className="video-player__poster" />}

      {!playing && (
        <div className="video-player__overlay">
          <button type="button" className="video-player__play-btn" aria-label="Play">
            <PlayIcon />
          </button>
        </div>
      )}

      <div className="video-player__bar">
        <div className="video-player__bar-content">
          {size !== "sm" ? (
            <>
              <ActionButton><PlaySmallIcon playing={playing} /></ActionButton>

              <div className="video-player__volume">
                <ActionButton><VolumeIcon /></ActionButton>
                <div className="video-player__volume-slider">
                  <div className="video-player__volume-track">
                    <div className="video-player__volume-fill" style={{ width: `${volume}%` }} />
                  </div>
                  <div className="video-player__volume-thumb" style={{ left: `${volume}%` }} />
                </div>
              </div>

              <div className="video-player__progress">
                <span className="video-player__time">{currentTime}</span>
                <div className="video-player__progress-track">
                  <div className="video-player__progress-buffered" style={{ width: `${buffered}%` }} />
                  <div className="video-player__progress-fill" style={{ width: `${progress}%` }} />
                  <div className="video-player__progress-thumb" style={{ left: `${progress}%` }} />
                </div>
                <span className="video-player__time">{remainingTime}</span>
              </div>

              <ActionButton><SpeedIcon speed={playbackSpeed} /></ActionButton>
              <ActionButton><FullscreenIcon /></ActionButton>
            </>
          ) : (
            <>
              <div className="video-player__sm-actions">
                <ActionButton><PlaySmallIcon playing={playing} /></ActionButton>
                <ActionButton><VolumeIcon /></ActionButton>
              </div>
              <ActionButton><FullscreenIcon /></ActionButton>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

/* ─── Helpers ──────────────────────────────────────────────────────────────── */

function ActionButton({ children }: { children: React.ReactNode }) {
  return (
    <button type="button" className="video-player__action-btn">
      {children}
    </button>
  );
}

/* ─── SVG Icons (extracted from Figma) ─────────────────────────────────────── */

function PlayIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M8 5.14v13.72a1 1 0 0 0 1.5.86l11.14-6.86a1 1 0 0 0 0-1.72L9.5 4.28a1 1 0 0 0-1.5.86z" fill="currentColor" />
    </svg>
  );
}

function PlaySmallIcon({ playing }: { playing?: boolean }) {
  if (playing) {
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M12.92 15.42c-.34 0-.64-.12-.88-.37a1.2 1.2 0 0 1-.37-.88V5.83c0-.34.12-.63.37-.88.25-.25.54-.37.88-.37h.62c.34 0 .64.12.88.37.25.25.37.54.37.88v8.34c0 .34-.12.63-.37.88-.25.25-.54.37-.88.37h-.62zM6.46 15.42c-.34 0-.64-.12-.88-.37a1.2 1.2 0 0 1-.37-.88V5.83c0-.34.12-.63.37-.88.25-.25.54-.37.88-.37h.62c.34 0 .64.12.88.37.25.25.37.54.37.88v8.34c0 .34-.12.63-.37.88-.25.25-.54.37-.88.37h-.62z" fill="white"/>
      </svg>
    );
  }
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M7.08 13.7V6.3c0-.22.08-.4.23-.55.15-.14.33-.21.53-.21.06 0 .13.01.2.03.07.02.13.04.2.08l5.83 3.71c.11.08.2.17.26.28.05.11.08.23.08.36 0 .13-.03.25-.09.36-.05.11-.14.2-.26.28l-5.83 3.71c-.06.04-.13.06-.2.08-.07.02-.13.03-.2.03-.2 0-.37-.07-.53-.21a.72.72 0 0 1-.22-.55z" fill="white"/>
    </svg>
  );
}

function VolumeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M15.71 9.98c0-1.15-.31-2.2-.92-3.14a6.36 6.36 0 0 0-2.47-2.12c-.16-.08-.28-.19-.36-.34a.47.47 0 0 1-.02-.46c.07-.17.18-.29.35-.35.17-.07.34-.06.52.01a7.6 7.6 0 0 1 3.02 2.58 7.53 7.53 0 0 1 1.13 3.82 7.53 7.53 0 0 1-1.13 3.82 7.6 7.6 0 0 1-3.02 2.58c-.17.07-.35.08-.52.01a.52.52 0 0 1-.35-.35.47.47 0 0 1 .02-.46c.08-.15.2-.26.36-.34a6.36 6.36 0 0 0 2.47-2.12c.61-.95.92-1.99.92-3.14zM6.14 12.08H3.8c-.22 0-.39-.07-.54-.22a.72.72 0 0 1-.21-.53V8.67c0-.21.07-.4.21-.54.15-.14.33-.22.54-.22h2.34l2.49-2.49c.2-.2.43-.25.69-.14.26.11.39.3.39.59v8.25c0 .28-.13.48-.39.59-.26.11-.49.06-.69-.14l-2.49-2.49zm7.32-2.08c0 .52-.11 1.01-.32 1.48-.22.46-.51.86-.88 1.17-.12.08-.24.09-.37.02-.13-.06-.2-.17-.2-.31V7.6c0-.15.07-.25.2-.31.13-.06.25-.06.37.02.37.33.66.73.88 1.2.21.47.32.97.32 1.49z" fill="white"/>
    </svg>
  );
}

function FullscreenIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M5.83 14.17h2.71c.18 0 .33.06.45.18.12.12.18.27.18.45 0 .18-.06.32-.18.44a.61.61 0 0 1-.45.18H5.34a.72.72 0 0 1-.54-.22.72.72 0 0 1-.22-.53v-3.21c0-.18.06-.33.18-.45a.61.61 0 0 1 .45-.18c.18 0 .33.06.45.18.12.12.18.27.18.45v2.71zm8.34-8.34h-2.71a.61.61 0 0 1-.45-.18.61.61 0 0 1-.18-.44c0-.18.06-.33.18-.45a.61.61 0 0 1 .45-.18h3.2c.22 0 .4.07.54.22.15.14.22.33.22.54v3.2c0 .18-.06.33-.18.45a.61.61 0 0 1-.45.18.61.61 0 0 1-.44-.18.61.61 0 0 1-.18-.45V5.83z" fill="white"/>
    </svg>
  );
}

function SpeedIcon({ speed = "1x" }: { speed?: string }) {
  const num = speed.replace("x", "");
  return (
    <div className="video-player__speed-icon">
      <span className="video-player__speed-num">{num}</span>
      <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
        <path d="M6 2L2 6M2 2L6 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}

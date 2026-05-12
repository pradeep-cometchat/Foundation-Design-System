export type VideoPlayerSize = "sm" | "md" | "lg";

export interface VideoPlayerProps {
  /** Size variant: sm (320×180), md (560×315), lg (720×405) */
  size?: VideoPlayerSize;
  /** Whether the video is currently playing */
  playing?: boolean;
  /** Current progress 0–100 */
  progress?: number;
  /** Buffered progress 0–100 */
  buffered?: number;
  /** Current time label */
  currentTime?: string;
  /** Remaining time label */
  remainingTime?: string;
  /** Volume level 0–100 */
  volume?: number;
  /** Playback speed label */
  playbackSpeed?: string;
  /** Poster/thumbnail image URL */
  poster?: string;
  /** Custom class name */
  className?: string;
}

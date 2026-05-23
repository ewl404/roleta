export interface WheelSegment {
  id: string;
  label: string;
  color?: string;
  weight: number;
}

export interface SpinResult {
  id: string;
  segmentId: string;
  label: string;
  timestamp: number;
}

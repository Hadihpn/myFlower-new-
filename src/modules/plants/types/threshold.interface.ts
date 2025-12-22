export interface ThresholdRange {
  min: number;
  max: number;
  ideal: {
    min: number;
    max: number;
  };
}

export interface PlantThresholds {
  temperature: ThresholdRange;
  moisture: ThresholdRange;
  light: ThresholdRange;
}
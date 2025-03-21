
export interface EnergyActivity {
  id: string;
  startTime: string;
  endTime: string;
  description?: string;
  energyRating: number;
  date: Date;
}

export type EnergyRating = 1 | 2 | 3 | 4 | 5;


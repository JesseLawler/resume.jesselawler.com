export const LOW_PRIORITY = 100;

export interface Month {
  year: number;
  month: number;
}

export interface Experience {
  institution: string;
  role: string;
  department?: string;
  description: string;
  start: Month;
  end: Month;
}

export interface Skill {
  name: string;
  level?: number; // 0 - 10
  priority?: number;
  url?: string;
  icon?: string;
}

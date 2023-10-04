export interface Month {
  year: number;
  month: number;
}

export interface Experience {
  company: string;
  role: string;
  description: string;
  start: Month;
  end: Month;
}

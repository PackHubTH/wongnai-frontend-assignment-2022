export interface Restaurant {
  name: string;
  id: number;
  coverImage: string;
  activeTimePeriod: {
    open: string;
    close: string;
  };
  page: number;
  pageAmount: number;
}

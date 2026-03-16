export type Menu = {
  id: number;
  title: string;
  path?: string;
  newTab: boolean;
  highlight?: boolean;
  prefetch?: boolean;
  submenu?: Menu[];
  icon?: any;
};

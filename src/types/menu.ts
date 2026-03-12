export type Menu = {
  id: number;
  title: string;
  path?: string;
  newTab: boolean;
  highlight?: boolean;
  submenu?: Menu[];
  icon?: any;
};

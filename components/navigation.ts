export interface Menu {
  header?: string;
  title?: string;
  icon?: string;
  to?: string;
  divider?: boolean;
  // chip?: string;
  // chipColor?: string;
  // chipVariant?: string;
  // chipIcon?: string;
  children?: Menu[];
  disabled?: boolean;
  type?: string;
  // subCaption?: string;
}

export const topNavigation: Array<Menu> = [
  {
    title: 'My Kids',
    icon: 'mdi-account-child',
    to: 'children'
  },
  {
    title: 'Shop',
    icon: 'mdi-cart',
    to: 'shopping'
  },
]

export const bottomNavigation: Array<Menu> = [
  {
    title: 'About',
    icon: 'mdi-information',
    to: 'about'
  }
]
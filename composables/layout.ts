type Sidebar  = {
  show: boolean,
  mini: boolean
}

export const useSidebar = () => useState<Sidebar>('sidebar', () => ({
  show: true,
  mini: false,
}))

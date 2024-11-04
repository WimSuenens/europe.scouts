import { useDisplay } from "vuetify"

type Sidebar  = {
  show: boolean,
  mini: boolean
}


export const useSidebar = () => useState<Sidebar>('sidebar', () => {
  const { mobile } = useDisplay();
  return {
    show: !mobile.value,
    mini: !mobile.value,
  }
})

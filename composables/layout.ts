import { useDisplay } from "vuetify"

type Sidebar  = {
  show: boolean,
  mini: boolean
}


export const useSidebar = () => useState<Sidebar>('sidebar', () => {
  const { mobile, md } = useDisplay();
  watch(mobile, (value) => {
    console.log('useSidebar - mobile', value)
  })
  watch(md, (value) => {
    console.log('useSidebar - md', value)
  })
  return reactive({
    show: !mobile.value,
    mini: !mobile.value,
  })
})

export const useSnackbar = () => useState('snackbar', () => {
  return reactive({
    show: false,
    text: '',
  })
})
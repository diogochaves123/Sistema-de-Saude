export function useTheme() {
  const isDark = useState('theme-dark', () => false)

  const applyTheme = (dark: boolean) => {
    isDark.value = dark
    if (import.meta.client) {
      document.documentElement.classList.toggle('dark', dark)
      localStorage.setItem('sismed-theme', dark ? 'dark' : 'light')
    }
  }

  const toggleTheme = () => applyTheme(!isDark.value)

  const initTheme = () => {
    if (!import.meta.client) return
    const stored = localStorage.getItem('sismed-theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    applyTheme(stored ? stored === 'dark' : prefersDark)
  }

  onMounted(() => initTheme())

  return { isDark, toggleTheme, applyTheme, initTheme }
}

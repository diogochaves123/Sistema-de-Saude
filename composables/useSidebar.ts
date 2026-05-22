export function useSidebar() {
  const isOpen = useState('sidebar-open', () => false)
  const isCollapsed = useState('sidebar-collapsed', () => false)

  const open = () => { isOpen.value = true }
  const close = () => { isOpen.value = false }
  const toggle = () => { isOpen.value = !isOpen.value }
  const toggleCollapse = () => { isCollapsed.value = !isCollapsed.value }

  return { isOpen, isCollapsed, open, close, toggle, toggleCollapse }
}

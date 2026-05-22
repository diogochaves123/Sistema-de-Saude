export function useModal() {
  const isOpen = useState('modal-open', () => false)
  const title = useState('modal-title', () => '')
  const size = useState<'sm' | 'md' | 'lg' | 'xl'>('modal-size', () => 'md')

  const open = (modalTitle = '', modalSize: 'sm' | 'md' | 'lg' | 'xl' = 'md') => {
    title.value = modalTitle
    size.value = modalSize
    isOpen.value = true
  }

  const close = () => {
    isOpen.value = false
  }

  return { isOpen, title, size, open, close }
}

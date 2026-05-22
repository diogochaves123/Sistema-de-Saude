import type { Toast } from '~/types'

export function useToast() {
  const toasts = useState<Toast[]>('toasts', () => [])

  const add = (message: string, type: Toast['type'] = 'info', duration = 4000) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2)}`
    toasts.value.push({ id, message, type, duration })
    if (import.meta.client && duration > 0) {
      setTimeout(() => remove(id), duration)
    }
  }

  const remove = (id: string) => {
    toasts.value = toasts.value.filter((t) => t.id !== id)
  }

  const success = (msg: string) => add(msg, 'success')
  const error = (msg: string) => add(msg, 'error')
  const info = (msg: string) => add(msg, 'info')
  const warning = (msg: string) => add(msg, 'warning')

  return { toasts, add, remove, success, error, info, warning }
}

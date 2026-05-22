import { patients, getPatientById, getPatientByCarteirinha } from '~/data/mock/patients'
import type { Patient } from '~/types'

export function usePatients() {
  const searchQuery = useState('patient-search', () => '')
  const statusFilter = useState<string | null>('patient-status-filter', () => null)
  const isLoading = useState('patients-loading', () => false)

  const filteredPatients = computed(() => {
    let result = [...patients]
    const q = searchQuery.value.trim().toLowerCase()

    if (q) {
      result = result.filter(
        (p) =>
          p.nome.toLowerCase().includes(q) ||
          p.carteirinha.toLowerCase().includes(q) ||
          p.cpf.includes(q) ||
          p.convenio.toLowerCase().includes(q),
      )
    }

    if (statusFilter.value) {
      result = result.filter((p) => p.status === statusFilter.value)
    }

    return result
  })

  const simulateLoading = async (ms = 600) => {
    isLoading.value = true
    await new Promise((r) => setTimeout(r, ms))
    isLoading.value = false
  }

  const findByCarteirinha = (numero: string) => getPatientByCarteirinha(numero)

  const findById = (id: string) => getPatientById(id)

  return {
    patients,
    filteredPatients,
    searchQuery,
    statusFilter,
    isLoading,
    simulateLoading,
    findByCarteirinha,
    findById,
  }
}

export const formatPhone = (phone: string): string => phone.replace(/^(\d{3})(\d{3})(\d{4})$/, '+1 ($1) $2-$3')

export const parseNumber = (phone: string): string => phone.replace(/\D/g, '').slice(1)

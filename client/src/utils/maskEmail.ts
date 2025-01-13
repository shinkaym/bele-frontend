const maskEmail = (email: string): string => {
  const [localPart, domain] = email.split('@') // Tách phần trước và sau @
  if (!localPart || !domain) return email // Kiểm tra email hợp lệ

  // Xử lý phần localPart (trước @)
  const localPartMasked =
    localPart.length <= 2
      ? localPart // Nếu localPart quá ngắn, không mask
      : localPart[0] + '*'.repeat(localPart.length - 2) + localPart[localPart.length - 1]

  // Xử lý phần domain (sau @)
  const [domainName, domainExtension] = domain.split('.') // Tách tên miền và phần mở rộng
  const domainMasked =
    domainName.length <= 2
      ? domainName // Nếu domainName quá ngắn, không mask
      : domainName[0] + '*'.repeat(domainName.length - 2) + domainName[domainName.length - 1]

  // Kết hợp lại toàn bộ email
  return `${localPartMasked}@${domainMasked}.${domainExtension || ''}`
}

export default maskEmail

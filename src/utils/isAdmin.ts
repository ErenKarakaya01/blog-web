const isAdmin = (uid: string) => {
  const adminList = [
    "Xh7z8uSKFgOrEIpBLfTAuwqS49H2",
    "2GLIPPawLqO3t8WIb74Z2MpBic03",
    "qpG3Sl2k3sXsspLVATM9uxwDTnG2"
  ]

  return adminList.includes(uid)
}

export default isAdmin

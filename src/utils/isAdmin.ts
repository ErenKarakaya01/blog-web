const isAdmin = (uid: string) => {
  const adminList = [
    "Xh7z8uSKFgOrEIpBLfTAuwqS49H2",
    "2GLIPPawLqO3t8WIb74Z2MpBic03",
  ]

  return adminList.includes(uid)
}

export default isAdmin

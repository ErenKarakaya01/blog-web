const isAdmin = (uid: string) => {
  const adminList = ["Xh7z8uSKFgOrEIpBLfTAuwqS49H2"]

  return adminList.includes(uid)
}

export default isAdmin

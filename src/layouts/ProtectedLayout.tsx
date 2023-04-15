import { Navigate, useNavigate } from "react-router-dom"
import Loading from "../components/skeletons/Loading"
import { useAppSelector } from "../redux/hooks"
import { useEffect } from "react"

const ProtectedLayout = ({
  condition,
  children,
}: {
  condition: string
  children: React.ReactNode
}) => {
  const { user } = useAppSelector((state) => state.user)

  // user in redux store is null when it's still loading
  if (user === null) return <Loading />

  // user in redux store is false when user is not logged in
  else if (!user && condition === "authenticated")
    return <Navigate to="/login" />

  // user in redux store is an object when user is logged in
  else if (user && condition === "unauthenticated") return <Navigate to="/" />

  // user in redux store is an object when user is logged in
  else if ((!user || !user.admin) && condition === "admin")
    return <Navigate to="/" />

  return <>{children}</>
}

export default ProtectedLayout

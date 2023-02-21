import Login from "./pages/login"
import Register from "./pages/register"
import { useRoutes } from "react-router-dom"
import { useEffect, useState } from "react"
import { auth } from "./firebase/firebase"
import { onAuthStateChanged } from 'firebase/auth'

const App = () => {


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("user is logged in")
        console.log(user)
      } else {
        console.log("user is logged out")
      }
    })

    return () => {
      unsubscribe()
    }
  }, [])

  const element = useRoutes([
    {
      path: "/",
      element: <div />,
      children: [],
    },
    { path: "login", element: <Login /> },
    { path: "register", element: <Register /> },
    { path: "*", element: <h1>Not Found</h1> },
  ])

  return <div className="App">{element}</div>
}
export default App

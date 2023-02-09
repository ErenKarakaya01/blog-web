import Login from "./pages/login"
import Register from "./pages/register"
import { useRoutes } from "react-router-dom"

const App = () => {
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

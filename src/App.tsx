import Login from "./pages/login"
import Register from "./pages/register"
import { useRoutes } from "react-router-dom"
import { useEffect } from "react"
import { auth } from "./firebase/firebase"
import { onAuthStateChanged } from "firebase/auth"
import Home from "./pages/home"
import AddPost from "./pages/addPost"
import Post from "./pages/post"
import UpdateRight from "./pages/updateRight"
import AdminPosts from "./pages/adminPosts"
import EditPost from "./pages/editPost"
import Category from "./pages/category"
import ProtectedLayout from "./layouts/ProtectedLayout"
import { useAppDispatch } from "./redux/hooks"
import { setUser } from "./redux/user/userSlice"
import isAdmin from "./utils/isAdmin"

interface Page {
  path: string
  element: React.ReactNode
  condition: string
}

const App = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    /* const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          setUser({
            uid: user.uid,
            email: user.email ? user.email : "",
            displayName: user.displayName ? user.displayName : "",
            photoURL: `https://ui-avatars.com/api/?name=${
              user.email ? user.email : ""
            }&background=0D8ABC&color=fff`,
            admin: isAdmin(user.uid) ? true : false,
          })
        )
      } else {
        dispatch(setUser(false))
      }
    })

    return () => {
      unsubscribe()
    } */
  }, [])

  const pages: Page[] = [
    // authenticated
    {
      path: "/",
      element: <Home />,
      condition: "",
    },
    {
      path: "/category/:category",
      element: <Category />,
      condition: "",
    },
    {
      path: "post/:id",
      element: <Post />,
      condition: "",
    },
    { path: "*", element: <h1>Not Found</h1>, condition: "" },

    // unauthenticated
    { path: "login", element: <Login />, condition: "unauthenticated" },
    { path: "register", element: <Register />, condition: "unauthenticated" },

    // admin
    { path: "add-post", element: <AddPost />, condition: "admin" },
    {
      path: "edit-post/:id",
      element: <EditPost />,
      condition: "admin",
    },
    {
      path: "admin-posts",
      element: <AdminPosts />,
      condition: "admin",
    },
    {
      path: "update-right",
      element: <UpdateRight />,
      condition: "admin",
    },
  ]

  const element = useRoutes(
    pages.map((page) => ({
      path: page.path,
      element: (
        <ProtectedLayout condition={page.condition}>
          {page.element}
        </ProtectedLayout>
      ),
    }))
  )

  return <div className="App">{element}</div>
}
export default App

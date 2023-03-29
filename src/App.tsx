import Login from "./pages/login"
import Register from "./pages/register"
import { useRoutes } from "react-router-dom"
import { useEffect, useState } from "react"
import { auth } from "./firebase/firebase"
import { onAuthStateChanged } from "firebase/auth"
import Home from "./pages/home"
import Turkey from "./pages/posts"
import PostsLayout from "./layouts/PostsLayout"
import AddPost from "./pages/addPost"
import Post from "./pages/post"
import UpdateRight from "./pages/updateRight"
import AdminPosts from "./pages/adminPosts"
import EditPost from './pages/editPost';

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
      element: <Home />,
      children: [],
    },
    {
      path: "/posts",
      element: <PostsLayout url={""} />,
      children: [
        {
          path: "turkey",
          element: <Turkey />,
        },
      ],
    },
    { path: "login", element: <Login /> },
    {
      path: "post",
      element: <Post />,
    },
    {
      path: "update-right",
      element: <UpdateRight />,
    },
    {
      path: "admin-posts",
      element: <AdminPosts />,
    },
    {
      path: "edit-post/:id",
      element: <EditPost />,
    },
    { path: "register", element: <Register /> },
    { path: "add-post", element: <AddPost /> },
    { path: "*", element: <h1>Not Found</h1> },
  ])

  return <div className="App">{element}</div>
}
export default App

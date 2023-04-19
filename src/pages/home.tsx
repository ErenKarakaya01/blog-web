import React from "react"
import PostsLayout from "../layouts/PostsLayout"
import { useSearchParams } from "react-router-dom"

const Home = () => {
  const [searchParams] = useSearchParams()

  return <PostsLayout title={searchParams.get("title")} />
}

export default Home

import React from "react"
import Layout from "../layouts/Layout"
import homeStyles from "../sass/home.module.scss"
import PostList from "./../components/PostList"

const posts = [
  {
    id: "1",
    title: "Post 1",
    content: "Post 1 content",
  },
  {
    id: "2",
    title: "Post 2",
    content: "Post 2 content",
  },
  {
    id: "3",
    title: "Post 3",
    content: "Post 3 content",
  },
]

const AdminPosts = () => {
  return (
    <Layout>
      <div className={homeStyles.content}>
        <PostList posts={posts} />
      </div>
    </Layout>
  )
}

export default AdminPosts

import React from "react"
import Layout from "../layouts/Layout"
import homeStyles from "../sass/home.module.scss"
import PostList from "./../components/PostList"
import usePosts from "../hooks/usePosts"

const AdminPosts = () => {
  const { posts } = usePosts({})

  return (
    <Layout>
      <div className={homeStyles.content}>
        <PostList posts={posts} />
      </div>
    </Layout>
  )
}

export default AdminPosts

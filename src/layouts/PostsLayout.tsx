import React, { useState } from "react"
import Navbar from "./Navbar"
import { Divider, ScrollArea } from "@mantine/core"
import homeStyles from "../sass/home.module.scss"
import BlogPostCard from "../components/BlogPostCard"
import CardsCarousel from "../components/Carousel"
import Layout from "./Layout"
import RightBar from "../components/RightBar"
import usePosts from "../hooks/usePosts"
import PostCardSkeleton from "../components/skeletons/PostCardSkeleton"

interface Post {
  id: string
  title: string
  content: string
  created: {
    seconds: number
    nanoseconds: number
  }
  category: string
}

const PostsLayout = ({
  category,
  title,
}: {
  category?: string
  title?: string | null
}) => {
  const { posts, loading } = usePosts({ category, title })

  return (
    <Layout>
      <div className={homeStyles.content}>
        <div className={homeStyles.carousel}>
          <CardsCarousel />
        </div>

        <Divider className={homeStyles.divider} />

        <div className={homeStyles.blog__posts}>
          {loading ? (
            <PostCardSkeleton />
          ) : (
            posts?.map((post: Post) => (
              <BlogPostCard
                key={post.id}
                id={post.id}
                created={post.created}
                title={post.title}
                content={post.content}
                category={post.category}
              />
            ))
          )}
        </div>
      </div>
    </Layout>
  )
}

export default PostsLayout

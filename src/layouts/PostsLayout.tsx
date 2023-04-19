import React from "react"
import { Divider } from "@mantine/core"
import homeStyles from "../sass/home.module.scss"
import BlogPostCard from "../components/BlogPostCard"
import CardsCarousel from "../components/Carousel"
import Layout from "./Layout"
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
  place: string
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
          ) : !loading && posts.length === 0 ? (
            <p>Bu konuda yazı bulunamadı.</p>
          ) : !loading ? (
            posts?.map((post: Post) => (
              <BlogPostCard
                key={post.id}
                id={post.id}
                created={post.created}
                title={post.title}
                content={post.content}
                category={post.category}
                place={post.place}
              />
            ))
          ) : null}
        </div>
      </div>
    </Layout>
  )
}

export default PostsLayout

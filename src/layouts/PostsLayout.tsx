import React from "react"
import Navbar from "./Navbar"
import { Divider, ScrollArea } from "@mantine/core"
import homeStyles from "../sass/home.module.scss"
import BlogPostCard from "../components/BlogPostCard"
import CardsCarousel from "../components/Carousel"
import Layout from "./Layout"

const PostsLayout = ({ url }: { url: string }) => {
  return (
    <Layout>
      <div className={homeStyles.content}>
        <div className={homeStyles.carousel}>
          <CardsCarousel />
        </div>

        <Divider className={homeStyles.divider} />

        <div className={homeStyles.blog__posts}>
          <BlogPostCard />
        </div>
      </div>
    </Layout>
  )
}

export default PostsLayout

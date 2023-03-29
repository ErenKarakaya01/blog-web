import React from "react"
import Navbar from "./Navbar"
import { Divider, ScrollArea } from "@mantine/core"
import homeStyles from "../sass/home.module.scss"
import BlogPostCard from "../components/BlogPostCard"
import CardsCarousel from "../components/Carousel"
import Layout from "./Layout"
import RightBar from '../components/RightBar'

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
      <RightBar
        imgUrl="https://picsum.photos/1000/1000"
        title="You've won a million dollars in cash!"
        text="Please click anywhere on this card to claim your reward, this is not a
        fraud, trust us"
      />
    </Layout>
  )
}

export default PostsLayout

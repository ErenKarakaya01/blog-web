import { Affix, Button, Divider, Transition } from "@mantine/core"
import CardsCarousel from "../components/Carousel"
import LeftBar from "../components/LeftBar"
import Layout from "../layouts/Layout"
import PostsLayout from "../layouts/PostsLayout"
import homeStyles from "../sass/home.module.scss"
import BlogPostCard from "../components/BlogPostCard"
import RightBar from "./../components/RightBar"
import Comments from "../components/Comments"
import { useRef } from "react"

const Post = () => {
  return (
    <Layout>
      <LeftBar />
      <div className={homeStyles.content}>
        <div className={homeStyles.carousel}>
          <CardsCarousel />
        </div>

        <Divider className={homeStyles.divider} />

        <div className={homeStyles.blog__posts}>
          <BlogPostCard />
        </div>

        <Divider className={homeStyles.divider} />

        <Comments />
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

export default Post

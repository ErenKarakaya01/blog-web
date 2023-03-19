import { Divider } from "@mantine/core"
import CardsCarousel from "../components/Carousel"
import LeftBar from "../components/LeftBar"
import Layout from "../layouts/Layout"
import PostsLayout from "../layouts/PostsLayout"
import homeStyles from "../sass/home.module.scss"
import BlogPostCard from "../components/BlogPostCard"
import RightBar from "./../components/RightBar"
import Comments from '../components/Comments'

const Post = () => {
  return (
    <Layout>
      <RightBar />
      <LeftBar />
      <div className={homeStyles.carousel}>
        <CardsCarousel />
      </div>

      <Divider className={homeStyles.divider} />

      <div className={homeStyles.blog__posts}>
        <BlogPostCard />
      </div>
      <Comments />
    </Layout>
  )
}

export default Post

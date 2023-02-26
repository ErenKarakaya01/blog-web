import React from "react"
import Navbar from "../layouts/Navbar"
import { ScrollArea } from "@mantine/core"
import homeStyles from "../sass/home.module.scss"
import BlogPostCard from "./../components/BlogPostCard"
import CardsCarousel from "../components/Carousel"

const Home = () => {
  return (
    <div>
      <Navbar
        links={[
          { link: "sadgas", label: "dsag" },
          { link: "sadgasdga", label: "dsaggdsa" },
        ]}
        user={{
          name: "Eren",
          image: "https://via.placeholder.com/150 ",
        }}
      />

      <ScrollArea className={homeStyles.container}>
        <div className={homeStyles.content}>
          <div className={homeStyles.carousel}>
            <CardsCarousel />
          </div>
          <div className={homeStyles.blog__posts}>
            <BlogPostCard />
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}

export default Home

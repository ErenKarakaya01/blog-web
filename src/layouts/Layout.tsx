import React, { ReactNode } from "react"
import Navbar from "../layouts/Navbar"
import { Divider, ScrollArea } from "@mantine/core"
import homeStyles from "../sass/home.module.scss"
import BlogPostCard from "./../components/BlogPostCard"
import CardsCarousel from "../components/Carousel"
import { faker } from "@faker-js/faker"

const Layout = ({ children }: { children: ReactNode }) => {


  return (
    <ScrollArea className={homeStyles.container}>
      <Navbar
        links={[
          { link: "/turkey", label: "Türkiye" },
          { link: "/world", label: "Dünya" },
        ]}
        user={{
          name: "Eren",
          image: faker.image.avatar(),
        }}
      />

      <div className={homeStyles.content}>{children}</div>
    </ScrollArea>
  )
}

export default Layout

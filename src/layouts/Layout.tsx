import React, { ReactNode } from "react"
import Navbar from "../layouts/Navbar"
import {
  Affix,
  Button,
  Divider,
  ScrollArea,
  Transition,
} from "@mantine/core"
import homeStyles from "../sass/home.module.scss"
import BlogPostCard from "./../components/BlogPostCard"
import CardsCarousel from "../components/Carousel"
import { faker } from "@faker-js/faker"
import { useWindowScroll } from "@mantine/hooks"
import { IconArrowUp } from "@tabler/icons-react"
import Footer from "./Footer"

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

      <div className={homeStyles.content_outline}>{children}</div>

      <Footer />
    </ScrollArea>
  )
}

export default Layout

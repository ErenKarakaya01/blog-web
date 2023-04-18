import React, { ReactNode, useState } from "react"
import Navbar from "../layouts/Navbar"
import { Affix, Button, Divider, ScrollArea, Transition } from "@mantine/core"
import homeStyles from "../sass/home.module.scss"
import BlogPostCard from "./../components/BlogPostCard"
import CardsCarousel from "../components/Carousel"
import { faker } from "@faker-js/faker"
import { useWindowScroll } from "@mantine/hooks"
import { IconArrowUp } from "@tabler/icons-react"
import Footer from "./Footer"
import RightBar from "../components/RightBar"
import useRightBar from "../hooks/useRightBar"
import RightBarSkeleton from "../components/skeletons/RightBarSkeleton"
import { useAppDispatch, useAppSelector } from "../redux/hooks"

const Layout = ({ children }: { children: ReactNode }) => {
  const { right, loading } = useRightBar()
  const { user } = useAppSelector((state) => state.user)
  const [scrollPosition, onScrollPositionChange] = useState({ x: 0, y: 0 });

  return (
    <>
      <Navbar
        links={[
          { link: "/category/turkey", label: "Türkiye" },
          { link: "/category/world", label: "Dünya" },
        ]}
        user={user}
        scrollPosition={scrollPosition}
      />
      <ScrollArea className={homeStyles.container} onScrollPositionChange={onScrollPositionChange}>
        <div className={homeStyles.content_outline}>
          {children}
          {loading ? (
            <RightBarSkeleton />
          ) : (
            <RightBar
              imgUrl={right.img}
              title={right.title}
              text={right.description}
            />
          )}
        </div>

        <Footer />
      </ScrollArea>
    </>
  )
}

export default Layout

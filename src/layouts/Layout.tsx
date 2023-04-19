import React, { ReactNode, useEffect, useRef, useState } from "react"
import Navbar from "../layouts/Navbar"
import { ScrollArea, Text } from "@mantine/core"
import homeStyles from "../sass/home.module.scss"
import Footer from "./Footer"
import RightBar from "../components/RightBar"
import useRightBar from "../hooks/useRightBar"
import RightBarSkeleton from "../components/skeletons/RightBarSkeleton"
import { useAppSelector } from "../redux/hooks"
import { Link } from "react-router-dom"

const Layout = ({ children }: { children: ReactNode }) => {
  const { right, loading } = useRightBar()
  const { user } = useAppSelector((state) => state.user)
  const scrollArea = useRef(null)

  return (
    <>
      <div id="#topbar" className={homeStyles.topbar}>
        <Link to="/">
          <Text
            variant="gradient"
            gradient={{ from: "white", to: "white", deg: 45 }}
            ta="center"
            fz="xl"
            fw={700}
            className={homeStyles.topbarText}
          >
            ESEN BLOG
          </Text>
        </Link>
      </div>
      <Navbar
        links={[
          { link: "/category/turkey", label: "Türkiye" },
          { link: "/category/world", label: "Dünya" },
        ]}
        user={user}
      />
      <ScrollArea id="#scrollArea" className={homeStyles.container} ref={scrollArea}>
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

import React, { ReactNode } from "react"
import Navbar from "../layouts/Navbar"
import { ScrollArea } from "@mantine/core"
import homeStyles from "../sass/home.module.scss"
import Footer from "./Footer"
import RightBar from "../components/RightBar"
import useRightBar from "../hooks/useRightBar"
import RightBarSkeleton from "../components/skeletons/RightBarSkeleton"
import { useAppSelector } from "../redux/hooks"

const Layout = ({ children }: { children: ReactNode }) => {
  const { right, loading } = useRightBar()
  const { user } = useAppSelector((state) => state.user)

  return (
    <>
      <Navbar
        links={[
          { link: "/category/turkey", label: "Türkiye" },
          { link: "/category/world", label: "Dünya" },
          { link: "/category/mathematics", label: "Matematik" },
        ]}
        user={user}
      />
      <ScrollArea className={homeStyles.container}>
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

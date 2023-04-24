import React from "react"
import { Link } from "react-router-dom"
import { Text } from "@mantine/core"
import homeStyles from "../sass/home.module.scss"

const TopBar = () => {
  return (
    <div className={homeStyles.topbar}>
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
  )
}

export default TopBar

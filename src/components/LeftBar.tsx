import React, { useEffect, useMemo, useState } from "react"
import FavoriteIcon from "@mui/icons-material/Favorite"
import SpeakerNotesIcon from "@mui/icons-material/SpeakerNotes"
import homeStyles from "../sass/home.module.scss"
import { IconButton } from "@mui/material"
import { Indicator } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"

const LeftBar = () => {
  const [liked, { toggle }] = useDisclosure(true)
  const [count, setCount] = useState(0)
  const likedCount = useMemo(() => (liked ? count + 1 : count), [liked])

  
  const scroll = () => {
    const section = document.querySelector("#comments")
    section?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <div className={homeStyles.left_bar}>
      <div className={homeStyles.like}>
        <IconButton onClick={toggle}>
          {liked ? (
            <FavoriteIcon
              sx={{
                color: "red",
              }}
              className={homeStyles.liked}
            />
          ) : (
            <FavoriteBorderIcon />
          )}
        </IconButton>

        <span className={homeStyles.count}>{likedCount}</span>
      </div>
      <div className="comment">
        <IconButton color="warning" onClick={scroll}>
          <SpeakerNotesIcon />
        </IconButton>
      </div>
    </div>
  )
}

export default LeftBar

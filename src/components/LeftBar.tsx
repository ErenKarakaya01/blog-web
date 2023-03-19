import React, { useEffect, useState } from "react"
import FavoriteIcon from "@mui/icons-material/Favorite"
import SpeakerNotesIcon from "@mui/icons-material/SpeakerNotes"
import homeStyles from "../sass/home.module.scss"
import { IconButton } from "@mui/material"
import { Indicator } from "@mantine/core"
import { useDisclosure } from '@mantine/hooks';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const LeftBar = () => {
  const [liked, {toggle}] = useDisclosure(true)
  const [count, setCount] = useState(0)

  return (
    <div className={homeStyles.left_bar}>
      <div className={homeStyles.like}>
        <IconButton color="error" onClick={toggle}>
          {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>

        <span className={homeStyles.count}>{liked ? count + 1 : count}</span>
      </div>
      <div className="comment">
        <IconButton color="warning">
          <SpeakerNotesIcon />
        </IconButton>
      </div>
    </div>
  )
}

export default LeftBar

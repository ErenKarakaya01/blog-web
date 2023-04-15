import React, { useEffect, useMemo, useState } from "react"
import FavoriteIcon from "@mui/icons-material/Favorite"
import SpeakerNotesIcon from "@mui/icons-material/SpeakerNotes"
import homeStyles from "../sass/home.module.scss"
import { IconButton } from "@mui/material"
import { Indicator } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import NeedLoginModal from "./NeedLoginModal"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import {
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore"
import { db, likeCollection } from "../firebase/firebase"
import { useParams } from "react-router-dom"
import useLikes from "../hooks/useLikes"

const LeftBar = () => {
  const [authNeededOpened, modal] = useDisclosure(false)
  const { user } = useAppSelector((state) => state.user)
  const { id } = useParams()
  const { liked, toggle, count, setCount, likeId, setLikeId } = useLikes(
    user ? user.uid : "",
    id ? id : ""
  )

  const scroll = () => {
    const section = document.querySelector("#comments")
    section?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const toggleLike = async () => {
    if (!user) {
      modal.toggle()
    } else {
      if (liked) {
        deleteDoc(doc(db, "likes", likeId)).then(() => {
          toggle()
          setLikeId("")
          setCount(count - 1)
        })
      } else {
        addDoc(likeCollection, {
          user: user.uid,
          post: id,
        }).then((docRef) => {
          toggle()
          setLikeId(docRef.id)
          setCount(count + 1)
        })
      }
    }
  }

  return (
    <div className={homeStyles.left_bar}>
      <div className={homeStyles.like}>
        <IconButton onClick={toggleLike}>
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

        <span className={homeStyles.count}>{count}</span>
      </div>
      <div className="comment">
        <IconButton color="warning" onClick={scroll}>
          <SpeakerNotesIcon />
        </IconButton>
      </div>

      <NeedLoginModal opened={authNeededOpened} toggle={modal.toggle} />
    </div>
  )
}

export default LeftBar

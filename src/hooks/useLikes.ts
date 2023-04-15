import React, { useEffect, useMemo, useState } from "react"
import { likeCollection } from "../firebase/firebase"
import { getCountFromServer, getDocs, query, where } from "firebase/firestore"
import { useDisclosure } from "@mantine/hooks"

const useLikes = (uid: string, postId: string) => {
  const [liked, { toggle }] = useDisclosure(false)
  const [count, setCount] = useState(0)
  const [likeId, setLikeId] = useState("")

  const likeQuery = query(
    likeCollection,
    where("user", "==", uid),
    where("post", "==", postId)
  )

  const likeCountQuery = query(likeCollection, where("post", "==", postId))

  useEffect(() => {
    getDocs(likeQuery).then((snapshot) => {
      if (snapshot.docs.length > 0) {
        setLikeId(snapshot.docs[0].id)
        toggle()
      }
    })

    getCountFromServer(likeCountQuery).then((snapshot) => {
      setCount(snapshot.data().count)
    })

    return () => {
      setCount(0)
    }
  }, [uid, postId])

  return { liked, toggle, count, setCount, likeId, setLikeId }
}

export default useLikes

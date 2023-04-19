import React, { useState } from "react"
import commentsStyles from "../sass/comments.module.scss"
import { useAppSelector } from "../redux/hooks"
import { useDisclosure } from "@mantine/hooks"
import NeedLoginModal from "./NeedLoginModal"
import { Timestamp, addDoc, collection } from "firebase/firestore"
import formatTimestamp from "../utils/formatTimestamp"
import { db } from "../firebase/firebase"
import { useParams } from "react-router-dom"
import useComments from "../hooks/useComments"

const Comments = () => {
  const [newComment, setNewComment] = useState<string>("")
  const { user } = useAppSelector((state) => state.user)
  const [authNeededOpened, { toggle }] = useDisclosure(false)
  const { id } = useParams()
  const { comments, setComments } = useComments(id)

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()
    if (newComment.trim() !== "") {
      const comment = {
        content: newComment,
        author: user ? user.email : "",
        created: Timestamp.now(),
      }

      await addDoc(collection(db, "comments"), {
        ...comment,
        created: Timestamp.now(),
        uid: user ? user.uid : "",
        post_id: id,
      })

      setComments([...comments, comment])
      setNewComment("")
    }
  }

  return (
    <div id="comments" className={commentsStyles.comments}>
      <h2>Yorumlar</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="new-comment">Yorum Ekle:</label>
        <div className={commentsStyles.input_container}>
          <input
            id="new-comment"
            type="text"
            placeholder="Yorumunuzu buraya yazın..."
            value={newComment}
            onChange={(event) => setNewComment(event.target.value)}
            onFocusCapture={(event) => {
              if (!user) {
                event.currentTarget.blur()
                toggle()
              }
            }}
          />
          <button type="submit">Gönder</button>
        </div>
      </form>
      {comments.length === 0 && (
        <p>Henüz yorum yapılmamış. İlk yorumu sen yap!</p>
      )}
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>
            <div className={commentsStyles.avatar}>
              <img
                src={
                  user ? user.photoURL : require("../assets/images/user.png")
                }
                alt="Avatar"
              />
            </div>
            <div className={commentsStyles.details}>
              <div className={commentsStyles.author}>{comment.author}</div>
              <div className={commentsStyles.time}>
                {formatTimestamp(comment.created)}
              </div>
              <div className={commentsStyles.content}>{comment.content}</div>
            </div>
          </li>
        ))}
      </ul>

      <NeedLoginModal opened={authNeededOpened} toggle={toggle} />
    </div>
  )
}

export default Comments

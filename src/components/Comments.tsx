import React, { useState } from "react"
import commentsStyles from "../sass/comments.module.scss"

interface Comment {
  content: string
  author: string
  time: Date
}

const Comments = () => {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState<string>("")

  function handleSubmit(event: { preventDefault: () => void }) {
    event.preventDefault()
    if (newComment.trim() !== "") {
      setComments([
        ...comments,
        { content: newComment, author: "Anonymous", time: new Date() },
      ])
      setNewComment("")
    }
  }

  return (
    <div className={commentsStyles.comments}>
      <h2>Comments</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="new-comment">Add a comment:</label>
        <div className={commentsStyles.input_container}>
          <input
            id="new-comment"
            type="text"
            placeholder="Write your comment here"
            value={newComment}
            onChange={(event) => setNewComment(event.target.value)}
          />
          <button type="submit">Comment</button>
        </div>
      </form>
      {comments.length === 0 && (
        <p>No comments yet. Be the first to comment!</p>
      )}
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>
            <div className={commentsStyles.avatar}>
              <img src="https://i.pravatar.cc/100" alt="Avatar" />
            </div>
            <div className={commentsStyles.details}>
              <a className={commentsStyles.author} href="#">
                {comment.author}
              </a>
              <div className={commentsStyles.time}>
                {comment.time.toLocaleString()}
              </div>
              <div className={commentsStyles.content}>{comment.content}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Comments

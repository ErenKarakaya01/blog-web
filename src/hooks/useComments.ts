import { getDocs, orderBy, query, where, Timestamp } from "firebase/firestore"
import { useEffect, useState } from "react"
import { commentCollection } from "../firebase/firebase"

interface Comment {
  content: string
  author: string
  created: Timestamp
}

const useComments = (id: string | undefined) => {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)

  // prepare query
  const q = query(
    commentCollection,
    where("post_id", "==", id),
    orderBy("created", "desc")
  )

  useEffect(() => {
    if (!id) return

    getDocs(q).then((snapshot) => {
      const comments = snapshot.docs.map((doc) => ({
        id: doc.id,
        content: doc.data().content,
        author: doc.data().author,
        created: doc.data().created,
      }))

      setComments(comments)
      setLoading(false)
    })

    return () => setComments([])
  }, [id])

  return { comments, setComments, loading }
}

export default useComments

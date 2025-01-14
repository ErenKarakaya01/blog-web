import { getDoc, doc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { postCollection } from "../firebase/firebase"
import { useNavigate } from "react-router-dom"

const usePost = (id: string | undefined) => {
  const [post, setPost] = useState<any>(null)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return

    getDoc(doc(postCollection, id)).then((doc) => {
      if (!doc.exists()) {
        return navigate("/404")
      }

      const post = {
        id: doc.id,
        ...doc.data(),
      }

      setPost(post)
      setLoading(false)
    })

    return () => setPost(null)
  }, [id])

  return { post, loading }
}

export default usePost

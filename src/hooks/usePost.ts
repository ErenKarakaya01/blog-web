import { getDoc, doc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { postCollection } from "../firebase/firebase"
import { useNavigate } from "react-router-dom"

const usePost = (id: string | undefined) => {
  const [post, setPost] = useState<any>(null)
  const navigate = useNavigate()

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

      console.log(post)

      setPost(post)
    })
  }, [])

  return post
}

export default usePost

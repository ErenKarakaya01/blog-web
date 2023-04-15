import { getDoc, doc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { rightCollection } from "../firebase/firebase"
import { useNavigate } from "react-router-dom"

const useRightBar = () => {
  const [right, setRight] = useState<any>(null)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getDoc(doc(rightCollection, "QqNMHcZxYHgWOykUiYkd")).then((doc) => {
      if (!doc.exists()) {
        return navigate("/404")
      }

      const rightObj = {
        id: doc.id,
        ...doc.data(),
      }

      setRight(rightObj)
      setLoading(false)
    })
  }, [])

  return { right, loading }
}

export default useRightBar

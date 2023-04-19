import { getDocs, orderBy, query, where, limit } from "firebase/firestore"
import { useEffect, useState } from "react"
import { postCollection } from "../firebase/firebase"

const usePosts = ({
  category,
  title,
  num,
}: {
  category?: string
  title?: string | null
  num?: number
}) => {
  const [posts, setPosts] = useState<any>([])
  const [loading, setLoading] = useState(true)

  let strSearch = title?.toLowerCase() || "a"
  let strlength = strSearch.length
  let strFrontCode = strSearch.slice(0, strlength - 1)
  let strEndCode = strSearch.slice(strlength - 1, strSearch.length)

  let startcode = strSearch
  let endcode = strFrontCode + String.fromCharCode(strEndCode.charCodeAt(0) + 1)

  // query constraints
  const constraints = []

  if (title)
    constraints.push(
      where("title", ">=", startcode),
      where("title", "<", endcode),
      orderBy("title", "desc")
    )
  if (category)
    constraints.push(where("category", "==", category.toLowerCase()))
  if (num) constraints.push(limit(num))

  // prepare query
  const q = query(postCollection, ...constraints, orderBy("created", "desc"))

  useEffect(() => {
    getDocs(q).then((snapshot) => {
      const posts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setPosts(posts)
      setLoading(false)
    })

    return () => setPosts([])
  }, [category, title, num])

  return { posts, loading }
}

export default usePosts

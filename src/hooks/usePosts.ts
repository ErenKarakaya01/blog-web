import { getDocs, orderBy, query, where, limit } from "firebase/firestore"
import { useEffect, useState } from "react"
import { postCollection } from "../firebase/firebase"

const usePosts = ({
  category,
  title,
  num,
}: {
  category?: string
  title?: string
  num?: number
}) => {
  const [posts, setPosts] = useState<any>([])

  // query constraints
  const constraints = []

  if (title) constraints.push(where("title", ">=", title.toLowerCase()))
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
    })
  }, [])

  console.log(posts)

  return posts
}

export default usePosts

import { useParams } from "react-router-dom"
import PostsLayout from "../layouts/PostsLayout"

const Category = () => {
  const { category } = useParams()
  
  return <PostsLayout category={category} />
}

export default Category

import { useSearchParams } from "react-router-dom"
import PostsLayout from "../layouts/PostsLayout"

const Search = () => {
  const [searchParams] = useSearchParams()

  return <PostsLayout title={searchParams.get("title")} />
}

export default Search

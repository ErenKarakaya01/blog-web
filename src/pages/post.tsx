import LeftBar from "../components/LeftBar"
import Layout from "../layouts/Layout"
import PostView from "../components/PostView"
import { useParams } from "react-router-dom"
import usePost from "../hooks/usePost"
import PostSkeleton from "../components/skeletons/PostSkeleton"

const Post = () => {
  /* const { id } = useParams()
  const { post, loading } = usePost(id)

  return (
    <Layout>
      <LeftBar />

      {loading ? <PostSkeleton /> : <PostView {...post} />}
    </Layout>
  ) */

  return <div>gsd</div>
}

export default Post

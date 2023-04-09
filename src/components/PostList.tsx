import React from "react"
import postListStyles from "../sass/postList.module.scss"
import { Button } from "@mantine/core"
import { Link } from "react-router-dom"

interface Post {
  id: string
  title: string
}

const PostList = ({ posts }: { posts: Post[] }) => {
  return (
    <ul className={postListStyles.post_list}>
      {posts?.map((post) => (
        <li key={post.id} className={postListStyles.post_item}>
          <Link to={`/post/${post.id}`} key={post.id}>
            <h2 className={postListStyles.post_title}>{post.title}</h2>
          </Link>

          <div className={postListStyles.post_buttons}>
            <Link to={`/edit-post/${post.id}`}>
              <Button variant="outline" color="yellow">
                Düzenle
              </Button>
            </Link>
            
            <Button variant="outline" color="red">
              Sil
            </Button>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default PostList

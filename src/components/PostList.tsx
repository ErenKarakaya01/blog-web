import React from "react"
import postListStyles from "../sass/postList.module.scss"
import { Button } from "@mantine/core"

interface Post {
  id: string
  title: string
}

const PostList = ({ posts }: { posts: Post[] }) => {
  return (
    <ul className={postListStyles.post_list}>
      {posts.map((post) => (
        <li key={post.id} className={postListStyles.post_item}>
          <h2 className={postListStyles.post_title}>{post.title}</h2>

          <div className={postListStyles.post_buttons}>
            <Button variant="outline" color="yellow">
              Düzenle
            </Button>

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

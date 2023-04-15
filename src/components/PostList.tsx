import React, { useState } from "react"
import postListStyles from "../sass/postList.module.scss"
import { Button } from "@mantine/core"
import { Link } from "react-router-dom"
import { useDisclosure } from "@mantine/hooks"
import DeleteDialog from "./DeleteDialog"

interface Post {
  id: string
  title: string
}

const PostList = ({ posts }: { posts: Post[] }) => {
  const [deleteOpened, { toggle }] = useDisclosure(false)
  const [deleteId, setDeleteId] = useState<string>("")
  const [deletedPosts, setDeletedPosts] = useState<string[]>([])

  return (
    <ul className={postListStyles.post_list}>
      {posts
        ?.filter((post) => !deletedPosts.includes(post.id))
        .map((post) => (
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

              <Button
                variant="outline"
                color="red"
                onClick={() => {
                  setDeleteId(post.id)
                  toggle()
                }}
              >
                Sil
              </Button>
            </div>
          </li>
        ))}
      <DeleteDialog
        open={deleteOpened}
        toggle={toggle}
        id={deleteId}
        setDeletedPosts={setDeletedPosts}
      />
    </ul>
  )
}

export default PostList

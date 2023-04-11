import React from "react"
import postListStyles from "../sass/postList.module.scss"
import { Button } from "@mantine/core"
import { Link } from "react-router-dom"
import { useDisclosure } from '@mantine/hooks'
import DeleteDialog from './DeleteDialog'

interface Post {
  id: string
  title: string
}

const PostList = ({ posts }: { posts: Post[] }) => {
  const [deleteOpened, { toggle }] = useDisclosure(false)

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
            
            <Button variant="outline" color="red" onClick={toggle}>
              Sil
            </Button>

            <DeleteDialog open={deleteOpened} toggle={toggle} id={post.id} />
          </div>
        </li>
      ))}
    </ul>
  )
}

export default PostList

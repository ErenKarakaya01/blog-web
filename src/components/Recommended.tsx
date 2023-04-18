import { Avatar, Badge, Card, Text } from "@mantine/core"
import homeStyles from "../sass/home.module.scss"
import { Link, useParams } from "react-router-dom"
import getRandomColor from "../utils/getRandomColor"
import usePosts from "../hooks/usePosts"
import React, { Fragment } from "react"

interface Post {
  id: string
  title: string
  tags: string[]
}
const Recommended = () => {
  const { posts, loading }: { posts: Post[]; loading: boolean } = usePosts({
    num: 10,
  })
  const { id } = useParams<string>()

  return (
    <Card shadow="sm" p={0} className={homeStyles.recommended}>
      <Card.Section className={homeStyles.recommended_title}>
        Önerilen
      </Card.Section>

      <Card.Section className={homeStyles.recommended_posts}>
        {posts
          ?.filter((post) => post.id !== id)
          .map((post) => (
            <Link
              to={`/post/${post.id}`}
              className={homeStyles.recommended_post}
              key={post.id}
            >
              <Text
                className={homeStyles.recommended_text}
                weight={500}
                size="sm"
                pl={20}
                lineClamp={2}
              >
                {post.title}
              </Text>
              
              <div className={homeStyles.recommended_post_tags}>
                <Avatar.Group spacing="sm" mx={20}>
                  {post.tags.map((tag) => (
                    <Fragment key={tag}>
                      <Badge color={getRandomColor()}>#{tag}</Badge>
                    </Fragment>
                  ))}
                </Avatar.Group>
              </div>
            </Link>
          ))}
      </Card.Section>
    </Card>
  )
}

export default Recommended

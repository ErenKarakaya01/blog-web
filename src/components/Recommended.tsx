import { Avatar, Badge, Card, Text } from "@mantine/core"
import homeStyles from "../sass/home.module.scss"
import useRandomColor from "../hooks/useRandomColor"
import { Link } from "react-router-dom"

const Recommended = ({
  posts,
}: {
  posts: {
    id: string
    title: string
    tags: string[]
  }[]
}) => {
  const getRandomColor = useRandomColor()

  return (
    <Card shadow="sm" p={0} className={homeStyles.recommended}>
      <Card.Section className={homeStyles.recommended_title}>
        Önerilen
      </Card.Section>

      <Card.Section className={homeStyles.recommended_posts}>
        {posts.map((post) => (
          <Link to={`/post/${post.id}`} className={homeStyles.recommended_post}>
            <div className={homeStyles.recommended_post_tags}>
              <Avatar.Group spacing="sm" mx={20}>
                {post.tags.map((tag) => (
                  <Badge color={getRandomColor()}>#{tag}</Badge>
                ))}
              </Avatar.Group>
            </div>

            <Text
              className={homeStyles.recommended_text}
              weight={500}
              size="sm"
              pl={20}
              lineClamp={2}
            >
              {post.title}
            </Text>
          </Link>
        ))}
      </Card.Section>
    </Card>
  )
}

export default Recommended

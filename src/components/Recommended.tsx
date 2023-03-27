import { Avatar, Badge, Card, Text } from "@mantine/core"
import homeStyles from "../sass/home.module.scss"
import useRandomColor from "../hooks/useRandomColor"
import { Link } from "react-router-dom"

const Recommended = () => {
  const tags = ["tag1", "tag2", "tag", "tag4", "tag5", "tag6", "tag7", "tag8"]
  const getRandomColor = useRandomColor()
  return (
    <Card shadow="sm" p={0} className={homeStyles.recommended}>
      <Card.Section className={homeStyles.recommended_title}>
        Recommended
      </Card.Section>

      <Card.Section className={homeStyles.recommended_posts}>
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <Link to={`/post/${i}`} className={homeStyles.recommended_post}>
              <div className={homeStyles.recommended_post_tags}>
                <Avatar.Group spacing="sm" mx={20}>
                  {tags.map((tag) => (
                    <Badge color={getRandomColor()}>#{tag}</Badge>
                  ))}
                </Avatar.Group>
              </div>

              <Text className={homeStyles.recommended_text} weight={500} size="sm" pl={20} lineClamp={2}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </Text>
            </Link>
          ))}
      </Card.Section>
    </Card>
  )
}

export default Recommended

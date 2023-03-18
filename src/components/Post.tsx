import {
  Avatar,
  Badge,
  Divider,
  Indicator,
  Tooltip,
  TypographyStylesProvider,
  useMantineTheme,
} from "@mantine/core"
import homeStyles from "../sass/home.module.scss"
import PostFormLayoutStyles from "../sass/postFormLayout.module.scss"
import { useAppSelector } from "../redux/hooks"
import { Text } from "@mantine/core"
import "../sass/global.css"
import useRandomColor from "./../hooks/useRandomColor"

const Post = () => {
  const title = useAppSelector((state) => state.post.title)
  const category = useAppSelector((state) => state.post.category)
  const place = useAppSelector((state) => state.post.place)
  const tags = useAppSelector((state) => state.post.tags)
  const content = useAppSelector((state) => state.post.content)

  const getRandomColor = useRandomColor()

  return (
    <div className={homeStyles.content}>
      <div
        style={{
          display: "flex",
          alignItems: "start",
          justifyContent: "space-between",
          color: useMantineTheme().colors.gray[6],
          flexDirection: "column",
        }}
      >
        <Indicator
          label={category}
          color={getRandomColor()}
          inline
          size={16}
          radius={8}
        >
          <Text
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: useMantineTheme().colors.dark[6],
              marginBottom: "0.5em",
              fontSize: "3em",
            }}
            size="xl"
            weight={700}
          >
            {title}
          </Text>
        </Indicator>

        <Text
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: useMantineTheme().colors.gray[6],
            marginBottom: "0.5em",
          }}
          size="sm"
          weight={500}
        >
          <span style={{ color: "black" }}>{place}</span>・
          {new Date().toLocaleDateString()} tarihinde yayınlandı
        </Text>
      </div>

      <Divider style={{ marginBottom: "1em" }} />

      <Avatar.Group spacing="sm" p={20}>
        {tags.map((tag) => (
          <Badge color={getRandomColor()}>#{tag}</Badge>
        ))}
      </Avatar.Group>

      <div
        className={PostFormLayoutStyles.container}
        style={{
          padding: "0",
        }}
      >
        <TypographyStylesProvider>
          <div className={PostFormLayoutStyles.display}>
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        </TypographyStylesProvider>
      </div>
    </div>
  )
}

export default Post

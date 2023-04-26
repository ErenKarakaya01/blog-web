import {
  Avatar,
  Badge,
  Divider,
  Indicator,
  TypographyStylesProvider,
  useMantineTheme,
} from "@mantine/core"
import homeStyles from "../sass/home.module.scss"
import PostFormLayoutStyles from "../sass/postFormLayout.module.scss"
import { Text } from "@mantine/core"
import "../sass/global.css"
import CardsCarousel from "./Carousel"
import getRandomColor from "../utils/getRandomColor"
import React, { Fragment } from "react"
import formatTimestamp from "../utils/formatTimestamp"
import Comments from "./Comments"
import { useParams } from "react-router-dom"

const PostView = ({
  title,
  category,
  place,
  tags,
  content,
  created,
}: {
  title: string
  category: string
  place: string
  tags: string[]
  content: string
  created: { seconds: number; nanoseconds: number }
}) => {
  const { id } = useParams()

  return (
    <div className={homeStyles.content}>
      <div className={homeStyles.carousel}>
        <CardsCarousel />
      </div>

      <Divider className={homeStyles.divider} />

      <div
        style={{
          display: "flex",
          alignItems: "start",
          justifyContent: "space-between",
          color: useMantineTheme().colors.gray[6],
          flexDirection: "column",
          textTransform: "capitalize",
          marginTop: "1em",
        }}
      >
        <Indicator
          label={
            category === "turkey"
              ? "Türkiye"
              : category === "world"
              ? "Dünya"
              : "Matematik"
          }
          color={getRandomColor()}
          inline
          size={16}
          radius={8}
          style={{
            maxWidth: "80%",
          }}
        >
          <Text
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: useMantineTheme().colors.dark[6],
              marginBottom: "0.5em",
              fontSize: "3em",
              textTransform: "capitalize",
              wordBreak: "break-word",
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
          {formatTimestamp(created)} tarihinde yayınlandı
        </Text>
      </div>

      <Divider style={{ marginBottom: "1em" }} />

      <Avatar.Group spacing="sm" p={20}>
        {tags?.map((tag) => (
          <Fragment key={tag}>
            <Badge color={getRandomColor()}>#{tag}</Badge>
          </Fragment>
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

      <Divider className={homeStyles.divider} />

      {id && <Comments />}
    </div>
  )
}

export default PostView

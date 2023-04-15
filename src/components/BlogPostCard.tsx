import React, { useCallback, useMemo } from "react"
import blogPostCardStyles from "../sass/blogPostCard.module.scss"
import { Indicator, Modal, Text, useMantineTheme } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { useNavigate } from "react-router-dom"
import getRandomColor from "../utils/getRandomColor"
import formatTimestamp from "../utils/formatTimestamp"

const BlogPostCard = ({
  id,
  created,
  title,
  content,
  category,
}: {
  id: string
  created: {
    seconds: number
    nanoseconds: number
  }
  title: string
  content: string
  category: string
}) => {
  const [opened, { toggle }] = useDisclosure(false)
  const navigate = useNavigate()
  const randomColor = useMemo(() => getRandomColor(), [])

  return (
    <>
      <Modal opened={opened} onClose={toggle} centered size="auto">
        <img
          className={blogPostCardStyles.modal__img}
          src="https://picsum.photos/200"
          alt="img"
        />
      </Modal>

      <div className={blogPostCardStyles.card}>
        <div className={blogPostCardStyles.card__img}>
          <div className={blogPostCardStyles.card__img__overlay}>
            <Indicator
              label={category === "turkey" ? "Türkiye" : "Dünya"}
              color={randomColor}
              inline
              size={20}
              radius={9}
              withBorder
            >
              <img src="https://picsum.photos/200" alt="img" onClick={toggle} />
            </Indicator>
          </div>
        </div>

        <div className={blogPostCardStyles.card__content}>
          <Text
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "start",
              color: useMantineTheme().colors.gray[6],
              marginBottom: "0.5em",
            }}
            size="sm"
            weight={500}
          >
            <span style={{ color: "black" }}>{"place"}</span>・
            {formatTimestamp(created)} tarihinde yayınlandı
          </Text>
          <Text lineClamp={1} className={blogPostCardStyles.card__title}>
            {title}
          </Text>

          <div className={blogPostCardStyles.card__text__overlay}>
            <Text
              lineClamp={window.innerWidth <= 576 ? 6 : 4}
              className={blogPostCardStyles.card__text}
            >
              <div dangerouslySetInnerHTML={{ __html: content }} />
            </Text>
          </div>

          <div className={blogPostCardStyles.card__btn__overlay}>
            <button
              className={blogPostCardStyles.card__btn}
              onClick={() => navigate(`/post/${id}`)}
            >
              Daha fazla
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default BlogPostCard

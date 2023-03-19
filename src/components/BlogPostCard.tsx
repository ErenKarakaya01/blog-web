import React, { useCallback, useMemo } from "react"
import blogPostCardStyles from "../sass/blogPostCard.module.scss"
import { Indicator, Modal, Text, useMantineTheme } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { useNavigate } from "react-router-dom"
import useRandomColor from "../hooks/useRandomColor"

const BlogPostCard = () => {
  const [opened, { toggle }] = useDisclosure(false)
  const navigate = useNavigate()
  const getRandomColor = useRandomColor()
  const indicatorColor = useMemo(() => getRandomColor(), [getRandomColor])

  return (
    <>
      <Modal opened={opened} onClose={toggle} centered size="auto">
        <img
          className={blogPostCardStyles.modal__img}
          src="https://random.imagecdn.app/300/150"
          alt="img"
        />
      </Modal>

      <div className={blogPostCardStyles.card}>
        <div className={blogPostCardStyles.card__img}>
          <div className={blogPostCardStyles.card__img__overlay}>
            <Indicator
              label={"Category"}
              color={indicatorColor}
              inline
              size={20}
              radius={9}
              withBorder
            >
              <img
                src="https://random.imagecdn.app/300/150"
                alt="img"
                onClick={toggle}
              />
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
            {new Date().toLocaleDateString()}
          </Text>
          <Text lineClamp={1} className={blogPostCardStyles.card__title}>
            Title
          </Text>

          <div className={blogPostCardStyles.card__text__overlay}>
            <Text
              lineClamp={window.innerWidth <= 576 ? 6 : 4}
              className={blogPostCardStyles.card__text}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Praesentium aut odit voluptas laudantium pariatur ducimus nemo
              doloremque sequi eius maiores. Consectetur esse perferendis
              quisquam iste inventore cumque soluta neque voluptatibus. Lorem
              ipsum dolor sit amet consectetur adipisicing elit. Praesentium aut
              odit voluptas laudantium pariatur ducimus nemo doloremque sequi
              eius maiores. Consectetur esse perferendis quisquam iste inventore
              cumque soluta neque voluptatibus.
            </Text>
          </div>

          <div className={blogPostCardStyles.card__btn__overlay}>
            <button
              className={blogPostCardStyles.card__btn}
              onClick={() => navigate("/1")}
            >
              Read More
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default BlogPostCard

import React from "react"
import blogPostCardStyles from "../sass/blogPostCard.module.scss"
import { Modal, Text } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { useNavigate } from "react-router-dom"

const date = new Date()
const month = date.toLocaleString("default", { month: "long" })
const day = date.toString().split(" ")[2]
const year = date.toString().split(" ")[3]

const BlogPostCard = () => {
  const [opened, { toggle }] = useDisclosure(false)
  const navigate = useNavigate()

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
            <img
              src="https://random.imagecdn.app/300/150"
              alt="img"
              onClick={toggle}
            />
          </div>
        </div>
        <div className={blogPostCardStyles.card__content}>
          <div className={blogPostCardStyles.card__date}>
            {`${day} ${month} ${year}`}
          </div>
          <Text lineClamp={1} className={blogPostCardStyles.card__title}>
            Titleasdgasdgasdgasdgsadgasdgasdgagsdg
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

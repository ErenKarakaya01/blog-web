import React from "react"
import blogPostCardStyles from "../sass/blogPostCard.module.scss"
import { Text } from "@mantine/core"

const BlogPostCard = () => {
  const date = new Date()
  const month = date.toLocaleString("default", { month: "long" })
  const day = date.toString().split(" ")[2]
  const year = date.toString().split(" ")[3]

  console.log(month, day, year)

  return (
    <div className={blogPostCardStyles.card}>
      <div className={blogPostCardStyles.card__img}>
        <div className={blogPostCardStyles.card__img__overlay}>
          <img src="https://random.imagecdn.app/150/150" alt="img" />
        </div>
      </div>
      <div className={blogPostCardStyles.card__content}>
        <div className={blogPostCardStyles.card__date}>
          {`${day} ${month} ${year}`}
        </div>
        <div className={blogPostCardStyles.card__title}>Title</div>

        <Text lineClamp={4} className={blogPostCardStyles.card__text}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium
          aut odit voluptas laudantium pariatur ducimus nemo doloremque sequi
          eius maiores. Consectetur esse perferendis quisquam iste inventore
          cumque soluta neque voluptatibus. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Praesentium aut odit voluptas laudantium
          pariatur ducimus nemo doloremque sequi eius maiores. Consectetur esse
          perferendis quisquam iste inventore cumque soluta neque voluptatibus.
        </Text>

        <button className={blogPostCardStyles.card__btn}>Read More</button>
      </div>
    </div>
  )
}

export default BlogPostCard

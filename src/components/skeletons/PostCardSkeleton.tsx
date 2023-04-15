import { Indicator, Skeleton, useMantineTheme, Text } from "@mantine/core"
import React from "react"
import BlogPostCard from "../BlogPostCard"
import blogPostCardStyles from "../../sass/blogPostCard.module.scss"

const PostCardSkeleton = () => {
  return (
    <div className={blogPostCardStyles.card}>
      <div className={blogPostCardStyles.card__img}>
        <div className={blogPostCardStyles.card__img__overlay}>
          <Skeleton width={"12vw"} height={"12vw"} radius={20} />
        </div>
      </div>

      <div className={blogPostCardStyles.card__content}>
        <Skeleton width={"40%"} height={20} mt={6} />
        <Skeleton width={"30%"} height={20} mt={20} />
        <Skeleton width={"100%"} height={20} mt={20} />
        <Skeleton width={"100%"} height={20} mt={6} />
        <Skeleton width={"100%"} height={20} mt={6} />
        <Skeleton width={"100%"} height={20} mt={6} />
        <Skeleton width={"70%"} height={20} mt={6} />
        
      </div>
    </div>
  )
}

export default PostCardSkeleton

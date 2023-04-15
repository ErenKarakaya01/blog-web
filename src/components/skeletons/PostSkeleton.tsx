import { Divider, Skeleton } from "@mantine/core"
import React from "react"
import homeStyles from "../../sass/home.module.scss"

const PostSkeleton = () => {
  return (
    <div className={homeStyles.content}>
      <Skeleton width={"40%"} height={40} />

      <Skeleton width={"30%"} height={15} mt={50} />

      <Divider className={homeStyles.divider} />

      <Skeleton width={"35%"} height={15} mt={50} />

      <Skeleton width={"90%"} height={30} mt={60} />
      <Skeleton width={"80%"} height={30} mt={20} />
      <Skeleton width={"100%"} height={30} mt={20} />
      <Skeleton width={"60%"} height={30} mt={20} />
    </div>
  )
}

export default PostSkeleton

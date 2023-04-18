import { Card, Image, Text } from "@mantine/core"
import homeStyles from "../sass/home.module.scss"
import { Divider } from "@mui/material"
import Recommended from "./Recommended"
import RightBarSkeleton from './skeletons/RightBarSkeleton'

const RightBar = ({
  imgUrl,
  title,
  text,
}: {
  imgUrl: string
  title: string
  text: string
}) => {
  return (
    <div className={homeStyles.right_outline}>
      <Card shadow="sm" p={10} className={homeStyles.right_bar}>
        <Card.Section p={10}>
          <Image
            src={imgUrl}
            className={homeStyles.image}
            alt="No way!"
            radius={4}
          />
        </Card.Section>

        <Divider className={homeStyles.divider} />

        <Text weight={500} size="lg" mt="md">
          {title}
        </Text>

        <Text mt="xs" color="dimmed" size="sm">
          {text}
        </Text>
      </Card>

      <Divider className={homeStyles.divider} />

      <Recommended />
    </div>
  )
}

export default RightBar

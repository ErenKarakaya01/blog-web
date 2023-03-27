import { Card, Image, Text } from "@mantine/core"
import homeStyles from "../sass/home.module.scss"
import { Divider } from "@mui/material"
import Recommended from "./Recommended"

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
      <Card shadow="sm" p={10} className={homeStyles.right_bar} radius={10}>
        <Card.Section withBorder pb="xs">
          <Image
            src={imgUrl}
            className={homeStyles.image}
            alt="No way!"
          />
        </Card.Section>

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

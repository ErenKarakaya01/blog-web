import { Card, Image, Text } from "@mantine/core"
import homeStyles from "../sass/home.module.scss"
import { Divider } from '@mui/material';

const RightBar = () => {
  return (
    <Card
      shadow="sm"
      p={10}
      component="a"
      href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
      target="_blank"
      className={homeStyles.right_bar}
    >
      <Card.Section withBorder pb="xs">
        <Image
          src="https://picsum.photos/1000/1000"
          height={"15vw"}
          alt="No way!"
        />
      </Card.Section>

      <Text weight={500} size="lg" mt="md">
        You&apos;ve won a million dollars in cash!
      </Text>

      <Text mt="xs" color="dimmed" size="sm">
        Please click anywhere on this card to claim your reward, this is not a
        fraud, trust us
      </Text>
    </Card>
  )
}

export default RightBar

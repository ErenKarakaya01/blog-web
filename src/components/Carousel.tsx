import { Carousel } from "@mantine/carousel"
import { useMediaQuery } from "@mantine/hooks"
import {
  createStyles,
  Paper,
  Text,
  Title,
  Button,
  useMantineTheme,
} from "@mantine/core"
import usePosts from "../hooks/usePosts"
import CarouselSkeleton from "./skeletons/CarouselSkeleton"

const useStyles = createStyles((theme) => ({
  card: {
    height: 370,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 900,
    color: theme.white,
    lineHeight: 1.2,
    fontSize: 32,
    marginTop: theme.spacing.xs,
    wordBreak: "break-word",
  },

  category: {
    color: theme.white,
    opacity: 0.7,
    fontWeight: 700,
    textTransform: "uppercase",
  },
}))

interface CardProps {
  image: string
  title: string
  category: string
}

function Card({ image, title, category }: CardProps) {
  const { classes } = useStyles()

  return (
    <Paper
      shadow="md"
      p="xl"
      radius="md"
      sx={{ backgroundImage: `url(${image})` }}
      className={classes.card}
    >
      <div>
        <Text className={classes.category} size="xs">
          {category}
        </Text>
        <Title order={3} className={classes.title} lineClamp={3}>
          {title}
        </Title>
      </div>
      <Button variant="white" color="dark">
        Oku
      </Button>
    </Paper>
  )
}

interface DataItem {
  id: string
  title: string
  category: string
  images: string[]
}

const CardsCarousel = () => {
  const { posts, loading } = usePosts({ num: 10 })
  const theme = useMantineTheme()
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`)
  const slides = posts?.map((item: DataItem) => (
    <Carousel.Slide key={item.id}>
      <Card {...{ ...item, image: item.images[0] }} />
    </Carousel.Slide>
  ))

  return (
    <>
      {loading ? (
        <CarouselSkeleton />
      ) : (
        <Carousel
          slideSize="40%"
          breakpoints={[{ maxWidth: "sm", slideSize: "100%", slideGap: 2 }]}
          slideGap={mobile ? 2 : 4}
          loop
          align="start"
          slidesToScroll={mobile ? 1 : 2}
        >
          {slides}
        </Carousel>
      )}
    </>
  )
}

export default CardsCarousel

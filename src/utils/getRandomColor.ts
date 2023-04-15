const getRandomColor = () => {
  const colors = [
    "red",
    "green",
    "blue",
    "yellow",
    "teal",
    "cyan",
    "violet",
    "pink",
    "orange",
    "lime",
    "indigo",
    "gray",
  ]

  return colors[Math.floor(Math.random() * colors.length)]
}

export default getRandomColor
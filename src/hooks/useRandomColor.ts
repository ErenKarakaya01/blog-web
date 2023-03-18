import { useCallback } from "react"

const useRandomColor = () => {
  const getRandomColor = useCallback(() => {
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
  }, [])

  return getRandomColor
}

export default useRandomColor

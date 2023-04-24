const formatTimestamp: (timestamp?: { seconds: number }) => string = (
  timestamp
) => {
  return timestamp ? new Date(timestamp.seconds * 1000).toLocaleDateString("tr-TR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }) : "Bilinmiyor"
}

export default formatTimestamp

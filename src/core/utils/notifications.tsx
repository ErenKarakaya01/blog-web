import { showNotification } from "@mantine/notifications"
import { IconCheck, IconX } from "@tabler/icons"
import React from "react"

const showSuccess = (message: string) =>
  showNotification({
    title: "Success",
    message,
    color: "green",
    icon: <IconCheck />,
  })

const showError = (message: string) =>
  showNotification({
    title: "Error",
    message,
    color: "red",
    icon: <IconX />,
  })

export { showSuccess, showError }

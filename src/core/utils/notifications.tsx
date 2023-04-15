import { showNotification } from "@mantine/notifications"
import { IconCheck, IconX, IconAlertTriangle } from "@tabler/icons"
import React from "react"

const showSuccess = (message: string) =>
  showNotification({
    title: "Success",
    message,
    color: "green",
    icon: <IconCheck />,
  })

const showWarning = (message: string) =>
  showNotification({
    title: "Warning",
    message,
    color: "yellow",
    icon: <IconAlertTriangle />,
  })

const showError = (message: string) =>
  showNotification({
    title: "Error",
    message,
    color: "red",
    icon: <IconX />,
  })

const showLoading = (message: string) =>
  showNotification({
    title: "Loading",
    message,
    color: "blue",
    loading: true,
  })

export { showSuccess, showWarning, showError, showLoading }

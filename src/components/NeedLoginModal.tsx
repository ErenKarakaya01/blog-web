import { Link } from "react-router-dom"
import { Button, Modal, useMantineTheme } from "@mantine/core"
import { useMediaQuery } from "@mui/material"

const NeedLoginModal = ({
  opened,
  toggle,
}: {
  opened: boolean
  toggle: () => void
}) => {
  const isMobile = useMediaQuery("(max-width: 50em)")
  const theme = useMantineTheme()

  return (
    <Modal
      opened={opened}
      onClose={toggle}
      title="Yorum yapmak için giriş yapmalısınız!"
      fullScreen={isMobile}
      sx={{ transition: "fade", duration: 200 }}
      overlayBlur={isMobile ? 0 : 3}
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      size={isMobile ? "xs" : "400px"}
      centered
    >
      <Link to="/login">
        <Button
          color="green"
          variant="filled"
          size="lg"
          style={{ width: "100%" }}
        >
          Giriş Yap
        </Button>
      </Link>

      <Link to="/register">
        <Button
          color="blue"
          variant="outline"
          size="lg"
          style={{ width: "100%", margin: "1rem 0" }}
        >
          Kayıt Ol
        </Button>
      </Link>
    </Modal>
  )
}

export default NeedLoginModal

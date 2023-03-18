import { useMediaQuery } from "@mantine/hooks"
import { Modal, useMantineTheme } from "@mantine/core"
import { useAppSelector } from "../redux/hooks"
import Post from "./Post"

const PreviewModal = ({
  opened,
  toggle,
}: {
  opened: boolean
  toggle: () => void
}) => {
  const isMobile = useMediaQuery("(max-width: 50em)")
  const theme = useMantineTheme()

  return (
    <>
      <Modal
        opened={opened}
        onClose={toggle}
        title="ÖNİZLEME"
        fullScreen={isMobile}
        sx={{ transition: "fade", duration: 200 }}
        overlayBlur={isMobile ? 0 : 3}
        overlayColor={
          theme.colorScheme === "dark"
            ? theme.colors.dark[9]
            : theme.colors.gray[2]
        }
        overlayOpacity={0.55}
        size={isMobile ? "xs" : "960px"}
      >
        <Post />
      </Modal>
    </>
  )
}

export default PreviewModal

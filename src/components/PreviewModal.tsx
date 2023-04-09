import { useMediaQuery } from "@mantine/hooks"
import { Modal, useMantineTheme } from "@mantine/core"
import { useAppSelector } from "../redux/hooks"
import PostView from "./PostView"
import { Timestamp } from 'firebase/firestore'

const PreviewModal = ({
  opened,
  toggle,
}: {
  opened: boolean
  toggle: () => void
}) => {
  const isMobile = useMediaQuery("(max-width: 50em)")
  const theme = useMantineTheme()
  const post = useAppSelector((state) => state.post)

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
        <PostView {...post} created={Timestamp.fromDate(new Date())} />
      </Modal>
    </>
  )
}

export default PreviewModal

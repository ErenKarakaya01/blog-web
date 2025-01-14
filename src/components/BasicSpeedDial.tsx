import { useState } from "react"
import Box from "@mui/material/Box"
import SpeedDial from "@mui/material/SpeedDial"
import SendIcon from "@mui/icons-material/Send"
import PublishDialog from "./PublishDialog"
import { SpeedDialAction } from "@mui/material"
import VisibilityIcon from "@mui/icons-material/Visibility"
import { useDisclosure } from "@mantine/hooks"
import PreviewModal from "./PreviewModal"

export default function BasicSpeedDial({ id }: { id: string | undefined }) {
  const [open, setOpen] = useState(false)
  const [previewOpened, { toggle }] = useDisclosure(false)

  return (
    <Box
      sx={{
        height: 320,
        transform: "translateZ(0px)",
        flexGrow: 1,
        position: "fixed",
        bottom: 10,
        right: 10,
      }}
    >
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        onClick={toggle}
        icon={<VisibilityIcon />}
        FabProps={{
          sx: {
            bgcolor: "success.main",
            "&:hover": {
              bgcolor: "success.dark",
            },
          },
        }}
      >
        <SpeedDialAction
          key={"publish"}
          icon={<SendIcon />}
          tooltipTitle={"Paylaş"}
          onClick={(e) => {
            e.stopPropagation()
            setOpen(true)
          }}
          FabProps={{
            sx: {
              bgcolor: "primary.main",
              "&:hover": {
                bgcolor: "primary.dark",
              },
            },
          }}
        />
      </SpeedDial>
      <PublishDialog open={open} setOpen={setOpen} id={id} />
      <PreviewModal opened={previewOpened} toggle={toggle} />
    </Box>
  )
}

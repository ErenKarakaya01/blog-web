import { useState } from "react"
import Box from "@mui/material/Box"
import SpeedDial from "@mui/material/SpeedDial"
import SpeedDialIcon from "@mui/material/SpeedDialIcon"
/* import SpeedDialAction from "@mui/material/SpeedDialAction"
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined"


import PrintIcon from "@mui/icons-material/Print"
import ShareIcon from "@mui/icons-material/Share" */
import SendIcon from "@mui/icons-material/Send"
import PublishDialog from "./PublishDialog"
import { SpeedDialAction } from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import PreviewIcon from "@mui/icons-material/Preview"
import VisibilityIcon from "@mui/icons-material/Visibility"
import { useDisclosure } from "@mantine/hooks"
import PreviewModal from "./PreviewModal"
/* const actions = [
  { icon: <FileCopyIcon />, name: "Copy" },
  { icon: <SaveIcon />, name: "Save" },
  { icon: <PrintIcon />, name: "Print" },
  { icon: <ShareIcon />, name: "Share" },
] */

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

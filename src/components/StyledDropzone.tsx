import { Group, Text, useMantineTheme } from "@mantine/core"
import { IconUpload, IconPhoto, IconX, IconCheck } from "@tabler/icons-react"
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from "@mantine/dropzone"
import { showSuccess, showError } from "../core/utils/notifications"
import { showNotification } from '@mantine/notifications'


const StyledDropzone = ({ setImg }: { setImg: React.Dispatch<File> }) => {
  const theme = useMantineTheme()
  return (
    <Dropzone
      onDrop={(files) => {
        setImg(files[0])
        showSuccess("Resim yüklendi")
        console.log(files[0])
      }}
      onReject={(files) => {
        showError("Resim yüklenemedi")
      }}
      maxSize={3 * 1024 ** 2}
      accept={IMAGE_MIME_TYPE}
    >
      <Group
        position="center"
        spacing="xl"
        style={{ minHeight: 220, pointerEvents: "none" }}
      >
        <Dropzone.Accept>
          <IconUpload
            size="3.2rem"
            stroke={1.5}
            color={
              theme.colors[theme.primaryColor][
                theme.colorScheme === "dark" ? 4 : 6
              ]
            }
          />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <IconX
            size="3.2rem"
            stroke={1.5}
            color={theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]}
          />
        </Dropzone.Reject>
        <Dropzone.Idle>
          <IconPhoto size="3.2rem" stroke={1.5} />
        </Dropzone.Idle>

        <div>
          <Text size="xl" inline>
            Drag images here or click to select files
          </Text>
          <Text size="sm" color="dimmed" inline mt={7}>
            Attach as many files as you like, each file should not exceed 5mb
          </Text>
        </div>
      </Group>
    </Dropzone>
  )
}

export default StyledDropzone

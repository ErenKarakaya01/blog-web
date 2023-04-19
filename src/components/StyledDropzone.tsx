import { Group, Text, useMantineTheme } from "@mantine/core"
import { IconUpload, IconPhoto, IconX } from "@tabler/icons-react"
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone"
import { showError, showLoading } from "../core/utils/notifications"

const StyledDropzone = ({ setImg }: { setImg: React.Dispatch<File> }) => {
  const theme = useMantineTheme()
  return (
    <Dropzone
      onDrop={(files) => {
        setImg(files[0])
        showLoading("Resim yükleniyor")
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
            Resim yükle
          </Text>
          <Text size="sm" color="dimmed" inline mt={7}>
            Resim yüklemek için tıklayın
          </Text>
        </div>
      </Group>
    </Dropzone>
  )
}

export default StyledDropzone

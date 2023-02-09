import formStyles from "../sass/form.module.scss"
import { Grid, Col, Center, Stack } from "@mantine/core"
import { Divider, Chip } from "@mui/material"
import FormPageBackground from "./FormPageBackground"
import { FC } from "react"

const FormPage = ({
  Form,
  image,
  dividerText,
}: {
  Form: FC
  image: string
  dividerText: string
}) => {
  return (
    <Grid columns={24} className={formStyles.grid}>
      <Col span={18} className={formStyles.backgroundCol}>
        <FormPageBackground />
      </Col>
      <Col span={6} className={formStyles.col}>
        <Center className={formStyles.center}>
          <Divider
            orientation="vertical"
            className={formStyles.divider}
            flexItem
          >
            <Chip className={formStyles.chip} label={dividerText} variant="outlined" />
          </Divider>
          <Stack className={formStyles.inputs}>
            <Center className={formStyles.image}>
              <img src={image} alt="nextjs" />
            </Center>
            <Form />
          </Stack>
        </Center>
      </Col>

      <Center className={formStyles.portal}>
        <FormPageBackground />
      </Center>
    </Grid>
  )
}

export default FormPage

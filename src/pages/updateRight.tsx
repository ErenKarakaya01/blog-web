import { Divider, TextInput, Textarea } from "@mantine/core"
import Layout from "../layouts/Layout"
import homeStyles from "../sass/home.module.scss"
import PostFormLayoutStyles from "../sass/postFormLayout.module.scss"
import { useState } from "react"
import StyledDropzone from "./../components/StyledDropzone"
import RightBar from "./../components/RightBar"

const UpdateRight = () => {
  const [img, setImg] = useState<File | null>(null)
  const [attributes, setAttributes] = useState({
    title: "",
    text: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAttributes({ ...attributes, [e.target.name]: e.target.value })
  }

  return (
    <Layout>
      <div className={homeStyles.content}>
        <div className={PostFormLayoutStyles.container}>
          <StyledDropzone setImg={setImg} />

          <Divider style={{ margin: "1em 0" }} />

          <TextInput
            value={attributes.title}
            name="title"
            onChange={handleChange}
            label="Başlık"
            placeholder="Başlık giriniz"
            description="Biz kimiz vs."
            required
          />

          <Divider style={{ margin: "1em 0" }} />

          <Textarea
            label="Açıklama"
            placeholder="Açıklama giriniz"
            autosize
            minRows={2}
            maxRows={4}
            maxLength={200}
          />

          <Divider style={{ margin: "1em 0" }} />
        </div>
      </div>
    </Layout>
  )
}

export default UpdateRight

import { Divider, TextInput } from "@mantine/core"
import Layout from "../layouts/Layout"
import homeStyles from "../sass/home.module.scss"
import PostFormLayoutStyles from "../sass/postFormLayout.module.scss"
import { useState } from "react"
import StyledDropzone from "./../components/StyledDropzone"
import RightBar from "./../components/RightBar"

const UpdateRight = () => {
  const [attributes, setAttributes] = useState({
    imgUrl: "",
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
          <StyledDropzone />

          <Divider style={{ margin: "1em 0" }} />

          <TextInput
            value={attributes.title}
            name="title"
            onChange={handleChange}
            label="Başlık"
            placeholder="Başlık giriniz"
            description="İtalya gezi rehberi, İtalya'da neler yapılır vs."
            required
          />

          <Divider style={{ margin: "1em 0" }} />

          <TextInput
            value={attributes.text}
            name="text"
            onChange={handleChange}
            label="Şehir, Bölge, İlçe vs."
            placeholder="Yer giriniz"
            description="Roma, Kapadokya, Kadıköy vs."
            required
          />

          <Divider style={{ margin: "1em 0" }} />
        </div>
      </div>
    </Layout>
  )
}

export default UpdateRight

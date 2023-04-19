import { Button, Divider, TextInput, Textarea } from "@mantine/core"
import Layout from "../layouts/Layout"
import homeStyles from "../sass/home.module.scss"
import PostFormLayoutStyles from "../sass/postFormLayout.module.scss"
import { MouseEventHandler, useState } from "react"
import StyledDropzone from "./../components/StyledDropzone"
import useStorage from "../hooks/useStorage"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "../firebase/firebase"
import { showSuccess } from "../core/utils/notifications"

const UpdateRight = () => {
  const [img, setImg] = useState<File | null>(null)
  const [attributes, setAttributes] = useState({
    title: "",
    text: "",
  })
  const { url } = useStorage(img)

  const handleChange: React.ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAttributes({ ...attributes, [e.target.name]: e.target.value })
  }

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault()

    await updateDoc(doc(db, "right", "QqNMHcZxYHgWOykUiYkd"), {
      title: attributes.title,
      description: attributes.text,
      img: url,
    })

    showSuccess("Başarıyla güncellendi")
  }

  return (
    <Layout>
      <form className={homeStyles.content}>
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
            value={attributes.text}
            name="text"
            onChange={handleChange}
            placeholder="Açıklama giriniz"
            autosize
            minRows={2}
            maxRows={4}
            maxLength={200}
            wrap="soft"
          />

          <Divider style={{ margin: "1em 0" }} />

          <Button
            fullWidth
            variant="filled"
            color="green"
            type="submit"
            onClick={handleSubmit}
          >
            Kaydet
          </Button>
        </div>
      </form>
    </Layout>
  )
}

export default UpdateRight

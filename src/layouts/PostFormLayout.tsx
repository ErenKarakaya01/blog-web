import React from "react"
import Layout from "./Layout"
import { Divider, TextInput } from "@mantine/core"
import RichTextEditor from "@mantine/rte"
import PostFormLayoutStyles from "../sass/postFormLayout.module.scss"

const PostFormLayout = () => {
  return (
    <Layout>
      <div className={PostFormLayoutStyles.container}>
        <TextInput
          label="Başlık"
          placeholder="Başlık giriniz"
          description="İtalya gezi rehberi, Almanyada neler yapılır vs."
        />

        <Divider style={{ margin: "2em 0" }} />

        <RichTextEditor
          className={PostFormLayoutStyles.richTextEditor}
          onImageUpload={(image: File) => {
            console.log(image)
            return new Promise((resolve) => {
              resolve("https://picsum.photos/200")
            })
          }}
        />
      </div>
    </Layout>
  )
}

export default PostFormLayout

import React from "react"
import Layout from "./Layout"
import { Divider, TextInput } from "@mantine/core"
import RichTextEditor from "@mantine/rte"
import StyledTextEditor from '../components/StyledTextEditor'
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

        <StyledTextEditor />
      </div>
    </Layout>
  )
}

export default PostFormLayout

import React, { useState } from "react"
import Layout from "./Layout"
import {
  Divider,
  MultiSelect,
  NativeSelect,
  Select,
  TextInput,
} from "@mantine/core"
import RichTextEditor from "@mantine/rte"
import PostFormLayoutStyles from "../sass/postFormLayout.module.scss"
import StyledTextEditorv2 from "./../components/StyledTextEditorv2"
import "../sass/global.css"
import BasicSpeedDial from "./../components/BasicSpeedDial"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import {
  setTitle,
  setCategory,
  setPlace,
  setTags,
} from "../redux/post/postSlice"
import homeStyles from "../sass/home.module.scss"

const PostFormLayout = () => {
  const [data, setData] = useState([
    { value: "türkiye", label: "Türkiye" },
    { value: "dünya", label: "Dünya" },
  ])
  const [searchValue, onSearchChange] = useState("")
  const title = useAppSelector((state) => state.post.title)
  const category = useAppSelector((state) => state.post.category)
  const place = useAppSelector((state) => state.post.place)
  const tags = useAppSelector((state) => state.post.tags)
  const dispatch = useAppDispatch()

  return (
    <Layout>
      <div className={homeStyles.content}>
        <div className={PostFormLayoutStyles.container}>
          <TextInput
            value={title}
            onChange={(e) => dispatch(setTitle(e.target.value))}
            label="Başlık"
            placeholder="Başlık giriniz"
            description="İtalya gezi rehberi, İtalya'da neler yapılır vs."
            required
          />

          <Divider style={{ margin: "1em 0" }} />

          <Select
            label="Kategori"
            data={[
              { value: "Türkiye", label: "Türkiye" },
              { value: "Dünya", label: "Dünya" },
            ]}
            description="Dünya, Türkiye"
            placeholder="Kategori seçiniz"
            nothingFound="Birşey bulunamadı"
            value={category}
            onChange={(value) => dispatch(setCategory(value as string))}
            required
          />

          <Divider style={{ margin: "1em 0" }} />

          <TextInput
            value={place}
            onChange={(e) => dispatch(setPlace(e.target.value))}
            label="Şehir, Bölge, İlçe vs."
            placeholder="Yer giriniz"
            description="Roma, Kapadokya, Kadıköy vs."
            required
          />

          <Divider style={{ margin: "1em 0" }} />

          <MultiSelect
            value={tags}
            onChange={(value) => dispatch(setTags(value))}
            data={data}
            label="Tagler"
            placeholder="Tag ekleyiniz"
            searchable
            searchValue={searchValue}
            onSearchChange={onSearchChange}
            creatable
            getCreateLabel={(query) => `+ Oluştur ${query}`}
            onCreate={(query) => {
              const item = { value: query, label: query }
              setData((data) => [...data, item])
              return item
            }}
            required
          />

          <Divider style={{ margin: "1em 0" }} />

          <StyledTextEditorv2 />
          <BasicSpeedDial />
        </div>
      </div>
    </Layout>
  )
}

export default PostFormLayout

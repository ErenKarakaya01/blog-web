import React, { useEffect, useState } from "react"
import Layout from "./Layout"
import { Divider, MultiSelect, Select, TextInput } from "@mantine/core"
import StyledTextEditorv2 from "../components/StyledTextEditor"
import "../sass/global.css"
import BasicSpeedDial from "./../components/BasicSpeedDial"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import {
  setTitle,
  setCategory,
  setPlace,
  setTags,
  setContent,
  resetPost,
  setImages,
} from "../redux/post/postSlice"
import homeStyles from "../sass/home.module.scss"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../firebase/firebase"
import { useNavigate } from "react-router-dom"

// id is for edit post page, if id is undefined, it means create post
const PostFormLayout = ({ id }: { id?: string }) => {
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
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(resetPost())

    if (id) {
      // fetch post from api
      // set post data to redux
      getDoc(doc(db, "posts", id)).then((snapshot) => {
        if (!snapshot.exists()) {
          return navigate("/404")
        }

        dispatch(setTitle(snapshot.data()?.title))
        dispatch(setCategory(snapshot.data()?.category))
        dispatch(setPlace(snapshot.data()?.place))
        dispatch(setTags(snapshot.data()?.tags))
        dispatch(setContent(snapshot.data()?.content))
        dispatch(setImages(snapshot.data()?.images))
      })
    }

    return () => {
      dispatch(resetPost())
    }
  }, [id])

  return (
    <Layout>
      <div className={homeStyles.content}>
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
            { value: "turkey", label: "Türkiye" },
            { value: "world", label: "Dünya" },
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
          data={tags || data}
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
      </div>
      <BasicSpeedDial id={id} />
    </Layout>
  )
}

export default PostFormLayout

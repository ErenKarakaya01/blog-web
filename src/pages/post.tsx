import { Affix, Button, Divider, Transition } from "@mantine/core"
import CardsCarousel from "../components/Carousel"
import LeftBar from "../components/LeftBar"
import Layout from "../layouts/Layout"
import PostsLayout from "../layouts/PostsLayout"
import homeStyles from "../sass/home.module.scss"
import BlogPostCard from "../components/BlogPostCard"
import RightBar from "./../components/RightBar"
import Comments from "../components/Comments"
import { useEffect, useRef, useState } from "react"
import PostView from "../components/PostView"
import { useNavigate, useParams } from "react-router-dom"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../firebase/firebase"
import usePost from "../hooks/usePost"

const Post = () => {
  const { id } = useParams()
  const post = usePost(id)

  return (
    <Layout>
      <LeftBar />

      <PostView {...post} />

      <RightBar
        imgUrl="https://picsum.photos/1000/1000"
        title="You've won a million dollars in cash!"
        text="Please click anywhere on this card to claim your reward, this is not a
        fraud, trust us"
      />
    </Layout>
  )
}

export default Post

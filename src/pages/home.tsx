import React from "react"
import Navbar from "../layouts/Navbar"
import { Divider, ScrollArea } from "@mantine/core"
import homeStyles from "../sass/home.module.scss"
import BlogPostCard from "./../components/BlogPostCard"
import CardsCarousel from "../components/Carousel"
import { faker } from "@faker-js/faker"
import PostsLayout from "../layouts/PostsLayout"
import { useSearchParams } from 'react-router-dom'

const Home = () => {
  const [searchParams] = useSearchParams()

  return <PostsLayout title={searchParams.get("title")} />
}

export default Home

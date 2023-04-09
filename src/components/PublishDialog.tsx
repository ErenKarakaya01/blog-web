import { useState } from "react"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import { Timestamp, addDoc, doc, updateDoc } from "firebase/firestore"
import firebase, { db } from "../firebase/firebase"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { postCollection } from "../firebase/firebase"
import { showError } from "../core/utils/notifications"
import { resetPost, setTitle } from "../redux/post/postSlice"

export default function AlertDialog({
  open,
  setOpen,
  id,
}: {
  open: boolean
  setOpen: (value: boolean) => void
  id: string | undefined
}) {
  const post = useAppSelector((state) => state.post)
  const dispatch = useAppDispatch()

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = () => {
    if (
      !post.title ||
      !post.category ||
      !post.place ||
      !post.tags ||
      !post.content
    )
      return showError("Lütfen tüm alanları doldurunuz.")

    const postObj = {
      ...post,
      title: post.title.toLowerCase(),
      category: post.category.toLowerCase(),
      created: Timestamp.fromDate(new Date()),
    }

    try {
      if (id) {
        updateDoc(doc(db, "posts", id), postObj)
      } else {
        addDoc(postCollection, postObj)
      }
    } catch (error) {
      console.log(error)
    } finally {
      dispatch(resetPost(true))
      dispatch(setTitle(""))
      setOpen(false)
    }
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Paylaşmak istediğinize emin misiniz?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hayır</Button>
          <Button onClick={handleSubmit} autoFocus>
            Evet
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

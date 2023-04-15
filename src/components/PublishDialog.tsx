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
import { showError, showSuccess } from "../core/utils/notifications"
import { resetPost, setTitle } from "../redux/post/postSlice"
import { useNavigate } from "react-router-dom"

const PublishDialog = ({
  open,
  setOpen,
  id,
}: {
  open: boolean
  setOpen: (value: boolean) => void
  id: string | undefined
}) => {
  const post = useAppSelector((state) => state.post)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = async () => {
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
      created: Timestamp.now(),
    }

    try {
      if (id) {
        await updateDoc(doc(db, "posts", id), postObj)
        showSuccess("Yazı başarıyla güncellendi.")
      } else {
        await addDoc(postCollection, postObj)
        showSuccess("Yazı başarıyla paylaşıldı.")
      }
    } catch (error) {
      showError("Yazı paylaşılırken bir hata oluştu.")
    } finally {
      dispatch(resetPost())
      setOpen(false)
      navigate("/")
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
          {"Paylaşma İşlemi"}
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

export default PublishDialog
import { useState } from "react"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import { Timestamp, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore"
import firebase, { db } from "../firebase/firebase"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { postCollection } from "../firebase/firebase"
import { showError } from "../core/utils/notifications"
import { resetPost, setTitle } from "../redux/post/postSlice"
import { useNavigate } from "react-router-dom"

const DeleteDialog = ({
  open,
  toggle,
  id,
}: {
  open: boolean
  toggle: () => void
  id: string
}) => {
  const handleClose = () => {
    toggle()
  }

  const handleSubmit = () => {
    try {
      deleteDoc(doc(db, "posts", id))
    } catch (error) {
      console.log(error)
    } finally {
      toggle()
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

export default DeleteDialog

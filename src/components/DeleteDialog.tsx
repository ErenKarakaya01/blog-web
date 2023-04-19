import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import { deleteDoc, doc } from "firebase/firestore"
import { db } from "../firebase/firebase"
import { showError, showSuccess } from "../core/utils/notifications"

const DeleteDialog = ({
  open,
  toggle,
  id,
  setDeletedPosts,
}: {
  open: boolean
  toggle: () => void
  id: string
  setDeletedPosts: React.Dispatch<React.SetStateAction<string[]>>
}) => {
  const handleSubmit = async () => {
    try {
      await deleteDoc(doc(db, "posts", id))
      setDeletedPosts((prev) => [...prev, id])
      showSuccess("Yazı başarıyla silindi.")
    } catch (error) {
      showError("Yazı silinirken bir hata oluştu.")
    } finally {
      toggle()
    }
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={toggle}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Silme İşlemi"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bu yazıyı silmek istediğinize emin misiniz?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={toggle}>Hayır</Button>
          <Button onClick={handleSubmit} autoFocus>
            Evet
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default DeleteDialog

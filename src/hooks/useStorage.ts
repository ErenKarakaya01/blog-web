import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage"
import { useEffect, useState } from "react"
import { showError, showSuccess } from "../core/utils/notifications"

const useStorage = (file: File | null) => {
  const [url, setUrl] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<Error | null>(null)

  const storage = getStorage()

  // Create the file metadata
  /** @type {any} */
  const metadata = {
    contentType: "image/jpeg",
  }

  useEffect(() => {
    if (!file) return

    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(storage, "images/" + file.name + Date.now())
    const uploadTask = uploadBytesResumable(storageRef, file, metadata)

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log("Upload is " + progress + "% done")
        setProgress(progress)

        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused")
            break
          case "running":
            console.log("Upload is running")
            break
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        showError("Resim yüklenirken bir hata oluştu")
        setError(error)
        /* switch (error.code) {
        case "storage/unauthorized":
          // User doesn't have permission to access the object

          break
        case "storage/canceled":
          // User canceled the upload
          break

        // ...

        case "storage/unknown":
          // Unknown error occurred, inspect error.serverResponse
          break
      } */
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          showSuccess("Resim yüklendi")
          setUrl(downloadURL)
        })
      }
    )
  }, [file])

  return { url, progress, error }
}

export default useStorage

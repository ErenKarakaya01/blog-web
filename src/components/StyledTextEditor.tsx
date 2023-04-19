import React, { useEffect, useRef, useState } from "react"
import Quill from "quill"
import "quill/dist/quill.core.css"
import "quill/dist/quill.bubble.css"
import "quill/dist/quill.snow.css"
import "quill-divider"
import PostFormLayoutStyles from "../sass/postFormLayout.module.scss"
import { setContent, addImage } from "../redux/post/postSlice"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import useStorage from "../hooks/useStorage"
import { useParams } from "react-router-dom"

const StyledTextEditorv2 = () => {
  const [file, setFile] = useState<File | null>(null)
  const { url } = useStorage(file)
  const editorRef = useRef(null)
  const dispatch = useAppDispatch()
  const content = useAppSelector((state) => state.post.content)
  const images = useAppSelector((state) => state.post.images)
  const { id } = useParams()
  const [editor, setEditor] = useState<Quill | null>(null)

  useEffect(() => {
    if (url) {
      dispatch(addImage(url))

      const range = editor?.getSelection(true)
      editor?.pasteHTML(
        range!.index + 1,
        `<img src="${url}" >`
      )
    }
  }, [url])

  useEffect(() => {
    // edit check edit post
    if (!content && id) return

    if (editorRef.current) {
      const editor = new Quill(editorRef.current, {
        theme: "snow",
        modules: {
          toolbar: {
            container: [
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
              [{ font: [] }],
              [{ align: "center" }, { align: "right" }],
              [{ color: [] }, { background: [] }],
              ["bold", "italic", "underline", "strike"],
              [
                { list: "ordered" },
                { list: "bullet" },
                //{ indent: "-1" },
                //{ indent: "+1" },
              ],
              ["image", "link", "video"],
              /* ["direction", { align: [] }], */
              [{ script: "super" }, { script: "sub" }],
              ["blockquote" /*, "code-block" */],
              ["divider"],
              ["clean"],
            ],
            handlers: {
              image: async (value: boolean) => {
                const input = document.createElement("input")
                input.setAttribute("type", "file")
                input.setAttribute("accept", "image/*")
                input.click()

                input.onchange = async () => {
                  const file = input.files![0]

                  setFile(file)
                }
              },
            },
          },
          divider: {
            // default
            cssText:
              "border: none;border-top-width: 1px;border-top-color: #ced4da;border-top-style: solid; max-width: 98vw; margin: 2em 0px;",
          },
        },
      })

      setEditor(editor)

      editor.on("text-change", () => {
        dispatch(setContent(editor.root.innerHTML))
      })

      editor.root.innerHTML = content

      editor.root.onkeydown = (e) => {
        if (e.key === " ") {
          e.preventDefault()
          const selection = editor.getSelection()
          const cursorPosition = selection ? selection.index : 0
          editor.insertText(cursorPosition, "\u00A0")
        }
      }
    }

    return () => {
      editorRef.current = null
    }
  }, [content, dispatch, id])

  return (
    <div className={PostFormLayoutStyles.content}>
      <div
        className={PostFormLayoutStyles.display}
        ref={editorRef}
        style={{ height: "400px" }}
      />
    </div>
  )
}

export default StyledTextEditorv2

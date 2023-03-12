import React, { useEffect, useRef, useState } from "react"
import Quill from "quill"
import "quill/dist/quill.core.css"
import "quill/dist/quill.bubble.css"
import "quill/dist/quill.snow.css"
import "quill-divider"
import { TypographyStylesProvider } from "@mantine/core"
import PostFormLayoutStyles from "../sass/postFormLayout.module.scss"
import { RichTextEditor } from "@mantine/rte"

const StyledTextEditorv2 = () => {
  const [content, setContent] = useState("")
  const editorRef = useRef(null)

  useEffect(() => {
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
              ["blockquote", "code-block"],
              ["divider"],
              ["clean"],
            ],
            handlers: {
              image: function (value: any) {},
            },
          },
          divider: {
            // default
            cssText: "border: none;border-bottom: 1px inset;",
          },
        },
      })

      editor.on("text-change", () => {
        setContent(editor.root.innerHTML)
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

      // custom handler to upload images
      const handleImageUpload = async () => {
        const input = document.createElement("input")
        input.setAttribute("type", "file")
        input.setAttribute("accept", "image/*")
        input.click()

        input.onchange = async () => {
          const file = input.files![0]
          console.log(file)
          const formData = new FormData()
          formData.append("image", file)

          const range = editor.getSelection(true)
          editor.pasteHTML(
            range.index + 1,
            `<img src="https://img-s3.onedio.com/id-541084251e19448517acb112/rev-0/w-620/f-jpg/s-35a6982c8daa73402de71031952b51523044f528.jpg" >`
          )
        }
      }

      // add custom handler to image upload button
      const imageButton = editor
        .getModule("toolbar")
        .container.querySelector(".ql-image")

      imageButton.addEventListener("click", async () => {
        handleImageUpload()
        editor.focus()
      })
    }
  }, [])

  return (
    <div className={PostFormLayoutStyles.richTextEditor}>
      <div ref={editorRef} style={{ height: "400px" }} />
      <TypographyStylesProvider>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </TypographyStylesProvider>
    </div>
  )
}

export default StyledTextEditorv2

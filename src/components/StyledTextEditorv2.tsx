import React, { useEffect, useRef, useState } from "react"
import Quill from "quill"
import "quill/dist/quill.core.css"
import "quill/dist/quill.bubble.css"
import "quill/dist/quill.snow.css"
import "quill-divider"
import { TypographyStylesProvider } from "@mantine/core"

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
          },
          divider: {
            // default
            cssText: "border: none;border-bottom: 1px inset;",
          },
        },
      })

      editor.on("text-change", () => {
        console.log(editor.root.innerHTML)
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

        input.onchange = async () => {
          const file = input.files![0]
          const formData = new FormData()
          formData.append("image", file)

          return new Promise((resolve) => {
            console.log(file)
            resolve("https://picsum.photos/200")
          })
        }
      }

      // add custom handler to image upload button
      const imageButton = editor
        .getModule("toolbar")
        .container.querySelector(".ql-image")

      imageButton.addEventListener("click", async () => {
        const url = await handleImageUpload()
        editor.focus()
        const range = editor.getSelection(true)
        editor.insertEmbed(range.index, "", url)
        editor.pasteHTML(range.index + 1, "<img src=" + "https://picsum.photos/200" + ">")
      })
    }
  }, [])

  return (
    <div>
      <div ref={editorRef} style={{ height: "400px" }} />
      <TypographyStylesProvider>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </TypographyStylesProvider>
    </div>
  )
}

export default StyledTextEditorv2

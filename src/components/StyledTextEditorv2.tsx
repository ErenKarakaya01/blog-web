import React, { useEffect, useRef, useState } from "react"
import Quill from "quill"
import "quill/dist/quill.snow.css"

const StyledTextEditorv2 = () => {
  const [content, setContent] = useState("")
  const editorRef = useRef(null)

  const handleInsertHR = () => {
    const cursorPosition = editorRef.current
    if (cursorPosition !== undefined) {
      setContent((prevContent) => {
        return prevContent.substring(0, cursorPosition) + '\n<hr>\n' + prevContent.substring(cursorPosition);
      });
    }
  };
  

  useEffect(() => {
    if (editorRef.current) {
      const editor = new Quill(editorRef.current, {
        theme: "snow",
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ font: [] }],
            [{ align: [] }],
            [{ color: [] }, { background: [] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["image", "link", "video"],
            [{ header: 1 }, { header: 2 }],
            [{ script: "sub" }, { script: "super" }],
            [{ indent: "-1" }, { indent: "+1" }],
            [{ direction: "rtl" }, { direction: "ltr" }],
            ["hr"], // Add horizontal line button to toolbar
            ["clean"],
          ],
        },
      })

      editor.on("text-change", () => {
        setContent(editor.root.innerHTML)
      })

      editor.root.innerHTML = content
    }
  }, [])

  return (
    <div>
      <div ref={editorRef} style={{ height: "400px" }} />
      {/* <div dangerouslySetInnerHTML={{ __html: content }} /> */}
    </div>
  )
}

export default StyledTextEditorv2

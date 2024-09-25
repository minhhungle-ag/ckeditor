import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { uploadApi } from "../api/upload";
// Import CSS của CKEditor

import "./editor.css";
export function MyEditor() {
  const [editorData, setEditorData] = React.useState("");

  const uploadAdapter = (loader) => {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          const data = new FormData();
          loader.file.then((file) => {
            data.append("", file);

            const formData = new FormData();
            formData.append("", file);

            uploadApi
              .uploadFile(formData)
              .then((res) => {
                resolve({
                  default: res,
                });
              })
              .catch((error) => {
                reject(error);
              });
          });
        });
      },
    };
  };

  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return uploadAdapter(loader);
    };
  }
  return (
    <>
      <div style={{ width: "100%" }}>
        <h2>CKEditor 5 with React</h2>
        <CKEditor
          editor={ClassicEditor}
          config={{
            extraPlugins: [uploadPlugin],
            toolbar: [
              "heading",
              "|",
              "bold",
              "italic",
              "link",
              "bulletedList",
              "numberedList",
              "blockQuote",
              "alignment",
              "|",
              "undo",
              "redo",
              "imageUpload",
            ],
            alignment: {
              options: ["left", "center", "right", "justify"],
            },
            image: {
              toolbar: [
                "imageTextAlternative",
                "imageStyle:full",
                "imageStyle:side",
              ],
              upload: {
                panel: {
                  items: ["insertImageViaUrl"],
                },
                types: ["png", "jpeg", "jpg"],
              },
            },
          }}
          data={editorData}
          onReady={(editor) => {
            console.log("Editor is ready to use!", editor);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            console.log({ data });
            setEditorData(data);
          }}
          // onBlur={(event, editor) => {
          //   console.log("Blur.", editor);
          // }}
          // onFocus={(event, editor) => {
          //   console.log("Focus.", editor);
          // }}
        />
      </div>

      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",

          maxWidth: "800px",
          width: "100%",
          margin: "0 auto",
        }}
      >
        <div dangerouslySetInnerHTML={{ __html: editorData }} />
      </div>
    </>
  );
}

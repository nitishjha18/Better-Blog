import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';
import conf from '../conf/conf';

export default function RTE({ name = "content", control, label, defaultValue = "" }) {
  return (
    <div className="w-full">
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => (
          <Editor
            apiKey={conf.tinymceApiKey}
            value={value}
            init={{
              menubar: false,
              height: 500, // Lowered for mobile comfort
              width: "100%",
              plugins: [
                "advlist", "autolink", "lists", "link", "image", "charmap", "preview",
                "anchor", "searchreplace", "visualblocks", "code", "fullscreen",
                "insertdatetime", "media", "table", "help", "wordcount"
              ],
              toolbar:
                "undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | image | code | help",
              content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              mobile: {
                menubar: false,
                toolbar: [
                  "undo redo | bold italic | bullist numlist | link image",
                  "alignleft aligncenter alignright | removeformat"
                ],
                toolbar_mode: "sliding",
                statusbar: false,
              },
              resize: false,
              setup: (editor) => {
                editor.on("init", () => {
                  const container = editor.getContainer();
                  if (container) {
                    container.style.width = '100%';
                    container.style.maxWidth = '100%';
                  }
                });
              },
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
}

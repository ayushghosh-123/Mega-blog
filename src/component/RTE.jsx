
import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'
import conf from '../Config/Config'

export default function RTE({name, control, label, defaultvalue = ""}) {
  return (
    <div className='w-full'>
        {label && <label className='inline-block mb-2 pl-1 font-semibold text-slate-300'>{label}</label>}
        <Controller
        name={name || "content"}
        control={control}
        render={({field: {onChange}}) =>(
          <Editor 
          apiKey={conf.tinyMCEApiKey}
          initialValue={defaultvalue}
          init={{
            initialValue: defaultvalue,
            height: 500,
            menubar: true,
            plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
            ],
            toolbar:
            "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
            content_style: "body { font-family:Inter,Helvetica,Arial,sans-serif; font-size:16px; background-color: #0f172a; color: #e2e8f0; }",
            skin: "oxide-dark",
            content_css: "dark",
          }}
          onEditorChange={onChange}
          />
        )}
        />
    </div>
  )
}

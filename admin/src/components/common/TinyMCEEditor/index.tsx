import React from 'react'
import { Editor } from '@tinymce/tinymce-react'

interface TinyMCEEditorProps {
  value?: string
  onChange?: (value: string) => void
  className?: string
}

const TinyMCEEditor: React.FC<TinyMCEEditorProps> = ({ value, onChange, className }) => {
  return (
    <div className={className}>
      <Editor
        apiKey='gko88rbjelxdxuqbmyszul3tsrbpobjpc20hs3okajngldve' // Thay bằng API Key của bạn
        value={value}
        onEditorChange={onChange}
        init={{
          height: 400,
          menubar: true,
          plugins: [
            'advlist',
            'autolink',
            'lists',
            'link',
            'image',
            'charmap',
            'preview',
            'anchor',
            'searchreplace',
            'visualblocks',
            'code',
            'fullscreen',
            'insertdatetime',
            'media',
            'table',
            'code',
            'help',
            'wordcount'
          ],
          toolbar:
            'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
      />
    </div>
  )
}

export default TinyMCEEditor

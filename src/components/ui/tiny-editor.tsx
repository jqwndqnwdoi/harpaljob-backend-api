
import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

interface TinyEditorProps {
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
  height?: number;
}

export const TinyEditor = ({ value, onChange, placeholder = "Enter description...", height = 400 }: TinyEditorProps) => {
  return (
    <Editor
      apiKey='6cinzataio3ci1qrnuxb7k44773y12dgz10vrhtzt03lndyd'
      value={value}
      onEditorChange={onChange}
      init={{
        height,
        menubar: false,
        plugins: [
          'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
          'checklist', 'mediaembed', 'casechange', 'formatpainter', 'pageembed'
        ],
        toolbar: 'undo redo | blocks fontsize | bold italic underline strikethrough | link image media table | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
        placeholder,
        content_style: 'body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif; font-size: 14px }',
        branding: false
      }}
    />
  );
};

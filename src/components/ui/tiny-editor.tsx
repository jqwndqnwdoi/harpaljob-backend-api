
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
          // Core editing features
          'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
          // Premium features
          'checklist', 'mediaembed', 'casechange', 'formatpainter', 'pageembed', 'a11ychecker', 'tinymcespellchecker', 'permanentpen', 'powerpaste', 'advtable', 'advcode', 'editimage', 'advtemplate', 'ai', 'mentions', 'tinycomments', 'tableofcontents', 'footnotes', 'mergetags', 'autocorrect', 'typography', 'inlinecss', 'markdown', 'importword', 'exportword', 'exportpdf'
        ],
        toolbar: [
          'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough',
          'link image media table mergetags | align lineheight',
          'checklist numlist bullist indent outdent | emoticons charmap',
          'addcomment showcomments | spellcheckdialog a11ycheck typography | removeformat'
        ],
        toolbar_mode: 'sliding',
        placeholder,
        content_style: 'body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif; font-size: 14px }',
        branding: false,
        tinycomments_mode: 'embedded',
        tinycomments_author: 'Author name',
        mergetags_list: [
          { value: 'First.Name', title: 'First Name' },
          { value: 'Email', title: 'Email' },
        ],
        ai_request: (request: any, respondWith: any) => respondWith.string(() => Promise.reject('See docs to implement AI Assistant')),
        // Image configuration to allow URL source
        image_title: true,
        image_description: false,
        automatic_uploads: true,
        file_picker_types: 'image',
        file_picker_callback: (cb: any, value: any, meta: any) => {
          const input = document.createElement('input');
          input.setAttribute('type', 'file');
          input.setAttribute('accept', 'image/*');

          input.addEventListener('change', (e: any) => {
            const file = e.target.files[0];

            const reader = new FileReader();
            reader.addEventListener('load', () => {
              const id = 'blobid' + (new Date()).getTime();
              const blobCache = (window as any).tinymce.activeEditor.editorUpload.blobCache;
              const base64 = (reader.result as string).split(',')[1];
              const blobInfo = blobCache.create(id, file, base64);
              blobCache.add(blobInfo);

              cb(blobInfo.blobUri(), { title: file.name });
            });
            reader.readAsDataURL(file);
          });

          input.click();
        },
        // Enable image URL dialog
        image_advtab: true,
        image_uploadtab: true,
        images_upload_handler: (blobInfo: any, success: any, failure: any) => {
          // This allows images to be uploaded as base64
          const reader = new FileReader();
          reader.onload = function() {
            success(reader.result);
          };
          reader.readAsDataURL(blobInfo.blob());
        },
        // Ensure proper initialization
        setup: (editor: any) => {
          editor.on('init', () => {
            console.log('TinyMCE editor initialized successfully');
          });
        },
        // Fix for premium features
        promotion: false,
        license_key: 'gpl'
      }}
    />
  );
};

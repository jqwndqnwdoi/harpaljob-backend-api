
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
    <div className="w-full">
      <Editor
        apiKey='6cinzataio3ci1qrnuxb7k44773y12dgz10vrhtzt03lndyd'
        value={value}
        onEditorChange={onChange}
        init={{
          height,
          menubar: false,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'help', 'wordcount', 'emoticons'
          ],
          toolbar: 'undo redo | formatselect | bold italic backcolor | ' +
            'alignleft aligncenter alignright alignjustify | ' +
            'bullist numlist outdent indent | removeformat | image media link | help',
          toolbar_mode: 'wrap',
          placeholder,
          content_style: `
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; 
              font-size: 14px;
              line-height: 1.6;
              margin: 1rem;
            }
          `,
          branding: false,
          promotion: false,
          
          // Image configuration
          image_advtab: true,
          image_uploadtab: true,
          image_title: true,
          image_description: false,
          
          // Custom image dialog
          file_picker_types: 'image',
          file_picker_callback: function (callback, value, meta) {
            if (meta.filetype === 'image') {
              // Create input element for file selection
              const input = document.createElement('input');
              input.setAttribute('type', 'file');
              input.setAttribute('accept', 'image/*');

              input.onchange = function () {
                const file = (this as HTMLInputElement).files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = function () {
                    const base64 = reader.result as string;
                    callback(base64, {
                      alt: file.name,
                      title: file.name
                    });
                  };
                  reader.readAsDataURL(file);
                }
              };

              input.click();
            }
          },

          // Image upload handler
          images_upload_handler: function (blobInfo, success, failure) {
            const reader = new FileReader();
            reader.onload = function() {
              success(reader.result as string);
            };
            reader.onerror = function() {
              failure('Failed to upload image');
            };
            reader.readAsDataURL(blobInfo.blob());
          },

          // Setup function for proper initialization
          setup: function (editor) {
            editor.on('init', function () {
              console.log('TinyMCE editor initialized successfully');
            });
            
            // Custom image button with URL option
            editor.ui.registry.addButton('customimage', {
              icon: 'image',
              tooltip: 'Insert/Edit Image',
              onAction: function () {
                editor.windowManager.open({
                  title: 'Insert Image',
                  body: {
                    type: 'panel',
                    items: [
                      {
                        type: 'input',
                        name: 'src',
                        label: 'Image URL',
                        placeholder: 'Enter image URL or click Browse to upload'
                      },
                      {
                        type: 'input',
                        name: 'alt',
                        label: 'Alt Text',
                        placeholder: 'Image description'
                      },
                      {
                        type: 'input',
                        name: 'width',
                        label: 'Width',
                        placeholder: 'e.g. 300 or 100%'
                      },
                      {
                        type: 'input',
                        name: 'height',
                        label: 'Height', 
                        placeholder: 'e.g. 200'
                      }
                    ]
                  },
                  buttons: [
                    {
                      type: 'cancel',
                      text: 'Cancel'
                    },
                    {
                      type: 'submit',
                      text: 'Insert',
                      primary: true
                    },
                    {
                      type: 'custom',
                      text: 'Browse Files',
                      name: 'browse'
                    }
                  ],
                  onAction: function (api, details) {
                    if (details.name === 'browse') {
                      const input = document.createElement('input');
                      input.type = 'file';
                      input.accept = 'image/*';
                      input.onchange = function () {
                        const file = (this as HTMLInputElement).files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = function () {
                            api.setData({
                              src: reader.result as string,
                              alt: file.name
                            });
                          };
                          reader.readAsDataURL(file);
                        }
                      };
                      input.click();
                    }
                  },
                  onSubmit: function (api) {
                    const data = api.getData();
                    if (data.src) {
                      let imgHtml = `<img src="${data.src}"`;
                      if (data.alt) imgHtml += ` alt="${data.alt}"`;
                      if (data.width) imgHtml += ` width="${data.width}"`;
                      if (data.height) imgHtml += ` height="${data.height}"`;
                      imgHtml += ' />';
                      
                      editor.insertContent(imgHtml);
                    }
                    api.close();
                  }
                });
              }
            });
          },

          // Content filtering
          valid_elements: '*[*]',
          extended_valid_elements: 'img[*]',
          
          // Paste options
          paste_data_images: true,
          paste_as_text: false,
          
          // Resize options
          resize: true,
          statusbar: true,
          
          // Link options
          link_default_target: '_blank',
          link_assume_external_targets: true
        }}
      />
    </div>
  );
};

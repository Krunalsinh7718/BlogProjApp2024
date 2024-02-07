import { Editor } from '@tinymce/tinymce-react';
import { useRef, useState } from 'react';
import { Controller } from 'react-hook-form';
import conf from "../conf/conf";

function RTE({ name, control, label, defaultValue = "" }) {
    const [blogCharLength, setBlogCharLength] = useState(defaultValue.length || 0);

    const handleInit = (evt, editor) => {
        setBlogCharLength(editor.getContent({ format: "text" }).length); //A method for retrieving the character count in the textarea
    };

    const handleCountUpdate = (value, editor) => {
        const dataTextLength = editor.getContent({ format: "text" }).length;
        setBlogCharLength(dataTextLength);

    };

    return (
        <>
            <div className='w-full'>
                {label && <label className='text-base font-medium text-gray-900'>{label}</label>}
                <Controller
                    name={name || "content"}
                    control={control}
                    render={({ field: { onChange } }) => (
                        <>
                            <Editor

                                initialValue={defaultValue}
                                apiKey={conf.tinymiceApiKey}
                                init={{
                                    height: 500,
                                    menubar: false,
                                    plugins: [
                                        'advlist autolink lists link image charmap print preview anchor',
                                        'searchreplace visualblocks code fullscreen',
                                        'insertdatetime media table paste code help wordcount'
                                    ],
                                    toolbar: 'undo redo  | h1 h2 h3 h4 | formatselect | ' +
                                        'bold italic backcolor | alignleft aligncenter ' +
                                        'alignright alignjustify | bullist numlist outdent indent | ' +
                                        'removeformat | help',
                                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                }}
                                onEditorChange={(updatedText, editor) => {
                                    console.log(updatedText);
                                    // onChange();
                                    handleCountUpdate(updatedText, editor);
                                }}
                                // onEditorChange={onChange }
                                onInit={handleInit}
                            />
                            <p className="text-right">{blogCharLength}</p>
                        </>

                    )}
                />
            </div>

        </>
    );
}

export default RTE;
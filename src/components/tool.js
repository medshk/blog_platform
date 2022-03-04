import Embed from '@editorjs/embed'
import Table from '@editorjs/table'
import Paragraph from '@editorjs/paragraph'
import List from '@editorjs/list'
import Warning from '@editorjs/warning'
import Code from '@editorjs/code'
import LinkTool from '@editorjs/link'
import Image from '@editorjs/image'
import Raw from '@editorjs/raw'
import Header from '@editorjs/header'
import Quote from '@editorjs/quote'
import Marker from '@editorjs/marker'
import CheckList from '@editorjs/checklist'
import Delimiter from '@editorjs/delimiter'
import InlineCode from '@editorjs/inline-code'
import SimpleImage from '@editorjs/simple-image'
import { imageArray, uploadImage } from '../firebaseConfig'
export const EDITOR_JS_TOOLS = {
  // NOTE: Paragraph is default tool. Declare only when you want to change paragraph option.
  // paragraph: Paragraph,
  embed: Embed,
  table: Table,
  list: List,
  warning: Warning,
  code: Code,
  linkTool: LinkTool,
  image:{
    class: Image,
    config: {
      uploader: {
        /**
         * Upload file to the server and return an uploaded image data
         * @param {File} file - file selected from the device or pasted by drag-n-drop
         * @return {Promise.<{success, file: {url}}>}
         */
         async uploadByFile(file) {
        // stock images to an image array
          imageArray.push(file)
         console.log(imageArray);

         const reader = new FileReader();

        let p = new Promise((resolve, reject) => {

          reader.onloadend= ()=>{
            resolve(reader.result)
         }})

         reader.readAsDataURL(file);

         const url = await p;

          return  {
            "success" : 1,
            "file": {
                "url" : url
                // ... and any additional fields you want to store, such as width, height, color, extension, etc
            }
                 }
        }
    }}
  },
  raw: Raw,
  header: Header,
  quote: Quote,
  marker: Marker,
  checklist: CheckList,
  delimiter: Delimiter,
  inlineCode: InlineCode,
  simpleImage: SimpleImage,
}
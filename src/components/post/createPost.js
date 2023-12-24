import { getAuth } from "firebase/auth";
import { useRef, useCallback, useState } from "react";
import { createReactEditorJS } from "react-editor-js";
import { useAuth } from "../../contexts/authContext";
import {
  addPost,
  imageArray,
  uploadImage,
  getAuthor,
} from "../../firebaseConfig";
import Loader from "../layout/loader";
import { EDITOR_JS_TOOLS } from "../tool";

const CreatePost = () => {
  const ReactEditorJS = createReactEditorJS();
  const editorJS = useRef(null);
  const form = useRef(null);
  const user = useAuth();
  const author = getAuthor(user.uid);
  let coverImage = "";

  // init editor js
  const handleInitialize = useCallback((instance) => {
    editorJS.current = instance;
  }, []);

  // save the blog content in fireBase
  const handleSave = async (e) => {
    e.preventDefault();
    // editor js data
    const savedData = await editorJS.current.save();

    // post body
    const body = await getNewUrl(savedData, imageArray);
    //imageArray = []
    //console.log(body);
    // post title
    const title = form.current.title.value;

    // post topic
    const topic = form.current.topic.value;

    // post object
    const post = {
      author: user.uid,
      title: title,
      topic: topic,
      body: body,
      coverImage: coverImage,
      createdAt: Date.now(),
    };
    // add post to fireBase database
    const docId = await addPost(post);
    author.then((result) => {
      imageArray = [];
      console.log("posts", result.posts);
      // add post id to author post collection
    });
  };

  // change images url of editorJs doc to images url returned by firestore
  const getNewUrl = async (editorJsdata, images) => {
    const body = new Promise(async (resolve, reject) => {
      let i = 0;
      let img = [];
      images.forEach((image) => img.push(uploadImage(image)));
      let result = await Promise.all(img);
      coverImage = result[0];
      editorJsdata.blocks.forEach(async (block) => {
        if (block.type !== "image") return;
        block.data.file.url = result[i];
        i++;
      });
      resolve(editorJsdata);
    });
    return body;
  };

  return (
    <div className="post-container">
      <form
        className="submit-form"
        ref={form}
        onSubmit={(e) => {
          handleSave(e);
        }}
      >
        <input
          type="text"
          name="title"
          required
          placeholder="your title here"
        />
        <input
          type="text"
          name="topic"
          required
          placeholder="enter the topic"
        />
        <h2>your blog content</h2>
        <ReactEditorJS
          onInitialize={handleInitialize}
          tools={EDITOR_JS_TOOLS}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default CreatePost;

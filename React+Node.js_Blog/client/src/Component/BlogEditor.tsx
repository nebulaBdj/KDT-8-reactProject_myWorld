import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css';
import React, { useState, useRef } from 'react';
import axios from 'axios';

import Navbar from "./Nav";
import Editor from "@toast-ui/editor";


export default function Blog_Editor() {
    const [text, setText] = useState<string>(''); // 에디터의 내용을 저장할 상태
    const inputRef = useRef<HTMLInputElement | undefined>();

    // 에디터 내용이 변경될 때 실행될 콜백
    const handleTextChange = (value: string) => {
      setText(value);
      console.log('state', text);
    };

    const upload = async() => {
        
      const BlogTitle = inputRef.current?.value;

      console.log('블로그 제목', BlogTitle);
      console.log('블로그 내용', text);

      const res = await axios({
            method: 'POST',
            url: "http://localhost:8080/blogupload",
            data: {
              title: BlogTitle,
              story: text,
            }
      });

      window.location.href='/';

      
    }
  
    return (<>
      <Navbar />
      <div>
        <h3>자신만의 이야기를 적어보세요</h3>
        <span>제목 : </span><input ref={inputRef as React.LegacyRef<HTMLInputElement> | undefined}></input>
        <ReactQuill value={text} onChange={handleTextChange} />
      </div>
      <button id="upload_btn" onClick={upload}>upload</button>
      </>)

}
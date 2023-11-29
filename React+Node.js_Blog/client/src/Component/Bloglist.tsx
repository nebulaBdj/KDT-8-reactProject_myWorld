import { useEffect, useState } from 'react';
import axios from 'axios';

import '../css/App.css'

import Modal from './Modal';
import Navbar from './Nav';

interface Title {
    id : number;
    title : string; 
  }

interface Stroy {
  id: number;
  title: string;
  story: string;
}

  export default function Blogmain() {
    
    const [storyContent, setContent] = useState<Stroy[]>([]);

    useEffect(() => {
      const storydata = async () => {
          const res = await axios({
              method: "GET",
              url: "http://localhost:8080/"
          });


          console.log('받아온 데이터', res.data);
          console.log('데이터 변환', Object.values(res.data));
          //객체 데이터 길이 가져오는법
          

          setContent(Object.values(res.data));
          
      }
      storydata();

      console.log('state', storyContent); 
  }, []);

    const [title, setTitle] = useState<Title[]>([
        { 
          id : 1,
          title : "남자코트 추천"
        },
        { 
          id: 2, 
          title : "강남 우동 맛집"
        }, 
        {
          id: 3, 
          title :"파이썬독학"
        },
      ]);
      
      // const [num, setNum1] = useState<number>(0);
      const [name, setName] = useState<string>('내이름');
    
      
      // const like = () => {
      //   setNum1(num + 1);
      // }
    

      //////////////////글수정...////////////////////
      // const edit = () => {
      //   let copyTitle:Title[] = [...title];
      //   copyTitle[0].title = '여성코트 추천'
      //   setTitle(copyTitle);
      // }

      
      ///////////정렬하는법//////////////////////
      // const order = () => {
      //   let titlecopy:Title[] = [...title];
    
      //   titlecopy.sort(); 
    
      //   // titlecopy.sort((a,b)=> { // 정렬 할려면 sort 함수를 이용해 정렬할 수 있다. 
      //   //   if(a<b) return -1;
      //   //   if(a>b) return 1; // 오름차순 정렬
      //   //   return 0;
      //   // });
    
      //   setTitle(titlecopy);
    
      // }
    
      const [modal_control, setControl] = useState<boolean>(false); 
      const [modal_id, setId] = useState<number>(0); 
    
      const bloging = (id:number) => {
        if(modal_control === false) {
          setControl(true);
          setId(id);
        }else{
          setControl(false);
        }
      }

      return (<>
        <div className='main'>
        <Navbar></Navbar>
        </div>

        <div className='body'>
        <h3 id='blogT' style={{margin: '45px 0 10px 0'}}>이야기</h3>
        {modal_control && <Modal title = {storyContent} id = {modal_id} setTitle={setContent} ></Modal> }
        {/* === modal_control ? <Modal /> : null 혹은 '' */}

        {/* <button onClick={edit}>글수정</button> */}
        {/* <button onClick={bloging}>블로그 작성하기</button> */}
        {/* <button onClick={order}>가나다순 정렬</button> */}

        <h3 id='blogT'>이야기 리스트</h3>

        
        {storyContent.map((val) => {
        return<div className='text_App'>
          <h4 key={val.id} onClick={()=>bloging(val.id)}>{val.title}</h4>
          <p>{val.id}번째 등록자</p>
        </div>
        })}
        </div>
      </>)

      {/* 좋아요 기능 <span onClick={like}>👍</span> {num}  */}

  }
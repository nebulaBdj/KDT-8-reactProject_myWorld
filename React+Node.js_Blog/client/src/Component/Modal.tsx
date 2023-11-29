import { Dispatch, SetStateAction, useRef } from 'react'
import axios from 'axios';

import '../css/Modal.css'
import { assert } from 'console';

interface Title {
    id : number;
    title : string;
  }
//부모 컴포넌트에서 사용하는 Title 타입을 여기서도 사용할려면 만들어줘야한다.

interface Stroy {
    id: number;
    title: string;
    story: string;
  }

interface PROPS{
    title: Stroy[];
    id : number; 
    setTitle:Dispatch<SetStateAction<Stroy[]>>;
    // name : string;
    // setName:Dispatch<SetStateAction<string>>
    // children: React.ReactNode;
}
export default function Modal({title, id, setTitle} : PROPS) {//그냥 props로 받아도 되고 구조분해할당 사용해도된다.

    const storyTextAreaRef = useRef<HTMLTextAreaElement | undefined>();
    
    const change = async() => {
        let copy:Stroy[]  = [...title];
        
        console.log(storyTextAreaRef.current?.value);


        const newStory: string | undefined = storyTextAreaRef.current?.value || "" ;

        console.log('받은 객체', copy);
        console.log(title.find((val) => val.id === id)?.title);

        let sendT:string = title.find((val) => val.id === id)?.title || '';

        const res = await axios({
            method: "PATCH",
            url: `http://localhost:8080/story/${id}`,
            data: {
                title: sendT,
                story: newStory,
            },
        });


        window.location.reload();
        //나중에 리로드 안되고 바로 적용되는 방식으로 바꾸기
        
    }   

    const del = async() => {

        const res = await axios({
            method : 'DELETE',
            url: `http://localhost:8080/story/${id}`,
        })

        window.location.reload();
        
    }

    return (<>
    <div className='modal'>
        
        {/* props로 받아서 이용하는 법 */}
        {/* <p>{name}</p>
        <p>{props.title.map((val, valindex)=> {
            return <p key={valindex}> {val} </p>
        })}</p> */}

        {/* 구조 분해 할당 이용한 사용법 */}
        {/* <p>{name}</p>
        <p>{title.map((val, valindex)=> {
            return <p key={valindex}> {val} </p>
        })}</p>
        <p>{children}</p>
        <button onClick={cha}>이름 바꾸기</button> */}

        {/* 버튼을 클릭할때 id를 보내주기 위해서 객체를 가진 배열로 바꿔서 만듦 */}
        <h4>제목 : {title.find((val) => val.id === id)?.title || ''} </h4>
        <p style={{fontSize : "13px", textAlign : "right"}}>{id}번째 등록자</p>
        
        <textarea ref={storyTextAreaRef as React.LegacyRef<HTMLTextAreaElement> | undefined} id='story'>{title.find((val) => val.id === id)?.story || ''}</textarea>
        <br></br>
        <button onClick={change}>이야기 수정</button>
        <button onClick={del}>이야기 삭제</button>
    </div>
    </>)
}
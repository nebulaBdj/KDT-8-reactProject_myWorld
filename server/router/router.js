const express = require('express');
const router = express.Router();
const controller = require('../Controller/Cstroy');
const path = require('path');


router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, ''));
});

//메인 페이지
router.get('/', controller.get_mainSW);//올라온 이야기 순서대로, 세계관 리스트
//로그인 모달
router.post('/login', controller.login);//로그인 할 경우 데이터베이스와 비교하여 매치된다면 토큰 전달
//회원가입
router.post('/signup', controller.signup);//들어오는 value들을 데이터베이스로 등록 >> 인증은 다 마무리 한 후
//마이페이지
router.get('/mypage/:id', controller.get_mypage);//내가 쓴 이야기, 세계관, 연결된 세계관
//제작페이지
router.post('/edit/make', controller.make_world);//이야기 등록
//이야기 상세 페이지 로드(수정 삭제는 나중에)
router.get('/storypage/:storyId', controller.get_story);//story 내용 전부 
//만약 사용자가 쓴 이야기일 경우 수정 삭제 가능
// router.delete('/storypage/delete/:id', controller.del_story);
// router.patch('/storypage/edit/:id', controller.edit_story);

router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
});
module.exports = router;
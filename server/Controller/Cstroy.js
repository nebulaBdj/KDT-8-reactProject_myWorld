const db = require('../models');
const session = require("express-session");
const bcrypt = require("bcrypt");
const { copy } = require('../router/router');
const models = db.User;


//메인 데이터 불러오기
const get_mainSW = async(req, res) => {
    const story_list = await models.story.findAll({});
    console.log('스토리 리스트', story_list);
    console.log('스토리 아이디', story_list[0].story_id);
    

    const world_list = await models.world.findAll({});
    console.log('세계 리스트', world_list);

    res.json({story_list: story_list, world_list: world_list});
}

//Auth 기능
//bcrypt 사용
//에러 : data must be a string and salt must either be a salt string or a number of rounds
// data 는 반드시 string이거나 그냥 salt로 입력받아야한다.

//비밀번호 비교
const conpareBcryptP = async (pw, dbpw) => {
    return await bcrypt.compare(pw, dbpw);
}

//비밀번호 암호화
const bcryptP = (pw) => {
    return bcrypt.hashSync(pw, 10);
}  

//로그인 데이터 보냄
// 데이터 없음 >> 로그인 실패 경고창 >> 회원가입 페이지 이동
// 데이터 있음 >> 토큰 부여 >> 메인 페이지 이동
const login = async(req, res) => {
    // const login_data = req.body;
    // console.log('로그인 데이터', login_data);
    //try catch문을 쓰는 이유를 알았다! 트라이캐치문 없이 에러가 발생하면 서버가 닫히기 때문에
    // 트라이캐치문을 써 줌으로써 서버를 닫지 않고 에러를 확인할 수 있다.

    try {
        const {email, pw} = req.body;
        console.log("로그인 데이터", email, pw);
        const result = await models.user.findOne({
            where: {email},
        });
        if(!result){
            res.json({
                result : false,//프론트에서 로그인했을때 받은 값이 false라면 msg를 p태그로 띄워주기
                msg : "해당 유저는 존재하지 않습니다.",
            });
        } 
        
        if (result) {
            const compare = await conpareBcryptP(pw, result.pw);
            console.log("비교 후 리턴 값", compare);//비교한 후의 리턴값을 받을려면 비동기로 받아야한다.
            if(compare){
                res.json({
                    result : true,
                    msg: "로그인 성공!"
                });
            } else{
                res.json({
                    result : false,
                    msg : "비밀번호가 일치하지 않습니다."
                })
            }

        }
    } catch (error) {
        console.log(error);
    }

    

    // 이런 방법도 있다. (https://joonganglib.tistory.com/7)2
    // models.user.findOne({email: req.body.email}, (err, user) => {
    //     if(!user){
    //         return res.json({
    //             loginSucess: false,
    //             msg : "해당 유저는 존재하지 않습니다."
    //         })
    //     }
    // })
}

// 회원가입 데이터 보내기
const signup = async(req, res) => {

    try {
        const {email, nickname, pw} = req.body;
        const hashPw = bcryptP(pw);
        const signUp = await models.user.create({
            email: email,
            nick_name: nickname,
            pw: hashPw,
        });
        if(signUp){
            res.json({result:true});
        }    
    } catch (error) {
        console.log(error);
    }

}

// 나의 페이지 불러오기
const get_mypage = async(req, res) => {
    const user_idR = req.params.id;
    console.log('마이페이지의 마이 아이디', user_id);

    //내 스토리 불러오기
    const select_mineS = await models.story.findAll({
        where: {user_id : user_idR},
    });

    console.log('가져온 나의 글', select_mineS);

    const select_mineWm = await models.MainW.findAll({
        where: {user_id : user_idR},
    });

    const select_mineWs = await models.subW.findAll({
        where: {user_id : user_idR},
    });

    console.log('나의 세계', select_mineWm);
    console.log('연결된 세계', select_mineS);
}


// 스토리 가지고 오기
const get_story = async(req, res) => {
    const story_id = req.params.storyId;
    console.log('스토리 아이디', story_id);   
}

// 스토리 업로드 하기 >> 서버로 이미지 보냈다 축약해서 받기
const make_world = async(req, res) => {
    const upload_story = req.body;
    console.log('올라갈 내용', upload_story);

    await models.story.create({
        title : upload_story.title,
        story : upload_story.story,
        date : upload_story.date 
    });

}


module.exports = {
    get_mainSW,
    get_mypage,
    get_story,
    make_world,
    signup,
    login,
};

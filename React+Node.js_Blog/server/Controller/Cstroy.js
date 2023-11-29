const db = require('../models');
const models = db.User;

let story;

const set = async () => {
    story = await models.story.findAll({});
}

const get_story = async (req, res) => {
    
    await set();

    const storydata = await story;
    const storyArr = {};

    storydata.forEach((data) => {
        storyArr[data.id - 1] = {
            id : data.id,
            title: data.title,
            story: data.story,
        }
    });

    console.log('컨트롤에서 데이터 받아오는지 확인')
    
    console.log(storyArr);
    
    res.json(storyArr);


}

const post_story = async (req, res) => {
    const update_story = req.body;
    console.log('보내는 데이터',update_story);
    // res.send(update_story);

    await models.story.create(update_story);

    const update_title = update_story.title;

    console.log(update_title);

    //하나씩 찾아올 것이기 때문에 여러개의 투두리스트를 모아서 보내는 방식이 아닌
    //투두리스트를 적고 엔터가 업로드 버튼을 누를때마다 하나씩 보내주고 받아오는 방식 
    const story_upload = await models.story.findOne({
        where: {title : update_title},
    });

    console.log('가져온 데이터',story_upload);
    //이 데이터는 기존 페이지를 유지하면서 기존 리스트 아래로 들어가야한다. 

    res.json(story_upload);


}


const del_story = async (req, res) => {
    const list_id = req.params.todoId;
    console.log('삭제할 튜플의 아이디', list_id);

    await models.story.destroy({
        where: {id : list_id},
    })

    res.json({result : true});
}

const patch_story = async (req, res) => {
    const list_id = req.params.todoId;
    console.log('수정할 튜플의 id', list_id);

    console.log('수정할 데이터',req.body);

    const update_data = {
        id : list_id,
        title : req.body.title,
        story : req.body.story,
    }

    console.log('받은 데이터 객체화 완료', update_data);

    const update_title = req.body.title;
    const update_story = req.body.story;


    try {
        await models.story.update({
            title : update_title,
            story : update_story,
        },
        { where :  { id : list_id},}
        );        
    } catch (error) {
        console.log('에러임');
    }


    res.json({result : true});

}

module.exports = {
    get_story,
    post_story,
    del_story,
    patch_story,
};

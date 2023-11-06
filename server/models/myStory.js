const { DataTypes } = require('sequelize');

const Model = (sequelize) => {
    
    const user = sequelize.define(
        'user',
        {
            user_id : {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            nick_name : {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            email : {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            pw : {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
        },
        {
            tableName: "user",
            timestamps: false,
        }
    );
    
    const story = sequelize.define(
        'story',
        {
            story_id : {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            title : {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            story : {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            date : {
                type: DataTypes.DATE,
                allowNull: false,
            },
        },
        {
            tableName: "story",
            timestamps: false,
        }
    );

    const img_story = sequelize.define(
        'img_story',
        {
            simg_id : {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            simg_url : {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
        },
        {
            tableName: "img_story",
            timestamps: false,
        }
    );


    const world = sequelize.define(
        'world',
        {
            world_id : {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            world_name : {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
        },
        {
            tableName: "world",
            timestamps: false,
        }
    );
    
    const img_world = sequelize.define(
        'img_world',
        {
            wimg_id : {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            wimg_url : {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
        },
        {
            tableName: "img_world",
            timestamps: false,
        }
    );

    const MainW = sequelize.define(
        'MainW',
        {
            user_id : {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            story_id : {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            world_id : {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            tableName: "MainW",
            timestamps: false,
        }
    );

    const subW = sequelize.define(
        'subW',
        {
            user_id : {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            story_id : {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            world_id : {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            tableName: "subW",
            timestamps: false,
        }
    );

    //관계정의
    story.belongsTo(user, {foreignKey: "user_id"});//스토리 -> 유저
    img_story.belongsTo(story, {foreignKey : "story_id"});//스토리 사진 -> 스토리
    img_world.belongsTo(world, {foreignKey : "world_id"});//세계관 사진 -> 세계관
    MainW.belongsTo(user, {foreignKey : "user_id"});//메인 세계관 -> 유저
    MainW.belongsTo(world, {foreignKey : "world_id"});//메인 세계관 -> 세계관
    MainW.belongsTo(story, {foreignKey : "story_id"});//메인 세계관 -> 스토리
    subW.belongsTo(user, {foreignKey : "user_id"});//서브 세계관 -> 유저
    subW.belongsTo(world, {foreignKey : "world_id"});//서브 세계관 -> 세계관
    subW.belongsTo(story, {foreignKey : "story_id"});//서브 세계관 -> 스토리


    return {
        user,
        story,
        world,
        img_story,
        img_world,
        MainW,
        subW,
    };

};

module.exports = Model;
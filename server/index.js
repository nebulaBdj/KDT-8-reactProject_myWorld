const express = require('express');
const app = express();
const PORT = 8080;
const db = require('./models');
const path = require('path');
const cors = require('cors')
const session = require("express-session");

app.use(cors())
// app.set('view engine', 'ejs'); //ejs를 사용할 때 설정

//body-parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'client/build')));

// app.use(
//     session({
//         secret: "worldKey",
//         resave: false,
//         saveUninitialized: true,
//         store: new MemoryStore({
//             checkPeriod: 86400000, // 24 hours (= 24 * 60 * 60 * 1000 ms)
//         }),
//         cookie: { maxAge: 86400000 },
//     })
// )


//router
const useRouter = require('./router/router.js');
app.use('/', useRouter);

//404
// app.use('*', (req, res)=>{
//     res.render('404');
// });

//서버 오픈
db.sequelize.sync({force : false}).then(()=>{
    app.listen(PORT, () => {
        console.log(`http://localhost:${PORT}`);
    });
});



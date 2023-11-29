const express = require('express');
const app = express();
const PORT = 8080;
const db = require('./models');
const path = require('path');
const cors = require('cors')

app.use(cors())
// app.set('view engine', 'ejs'); //ejs를 사용할 때 설정

//body-parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'client/build')));

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



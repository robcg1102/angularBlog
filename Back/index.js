const mongoose = require('mongoose');
const app = require('./app');
const port = 3000;

mongoose.Promise = global.Promise
mongoose.set('useFindAndModify', false);

mongoose.connect('mongodb://localhost/api_rest_blog', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{console.log("Conected to DB")})
    .catch((err)=>{console.log(err)})


app.listen(port, ()=>{
    console.log("Server on port 3000");
})
    
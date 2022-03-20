
const app = require("./index.js");
const connect = require("./config/db.js");


app.listen(5000,async()=>{
    try{
        await connect();
        console.log("Listening on port 5000");
    }
    catch{
        console.log("something went wrong");
    }
})
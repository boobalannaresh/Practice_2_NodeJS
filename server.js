
const express = require("express");

const cors = require("cors")

const app = express();

let users = [];

// midleware
app.use(express.json());
app.use(cors({
    origin : "http://localhost:3001"
}))

////// Query Params 

app.get("/get", function(req, res) {
    let queryParams = req.query
    console.log(queryParams);

    let resUser = []

    for(let index = parseInt(req.query.offset); index < parseInt(req.query.offset) + parseInt(req.query.limit); index ++){
        if(users[index]){
            resUser. push(users[index])
        }
    }

    res.json(resUser);
});

app.post("/push", function(req, res){
    // console will show  results terminal side also, if you want delete the console code, it's your wish , it won't affect results 
    console.log(req.body);
    req.body.id = users.length + 1;
    users.push(req.body);
    res.json({message: "User_Created_Successfully"});
});


app.get ("/push/:id", function (req, res){
    
    let giveID = req.params.id;

    let userID = users.find((item) => item.id == giveID) 
    if(userID){
        res.json(userID)
    }else{
        res.json({Message : "User not found"})
    }
})

app.put("/push/:id", function(req, res){

    let giveId = req.params.id;

    let userIndex = users.findIndex((item) => item.id == giveId);

    if (userIndex != -1){
        Object.keys(req.body).forEach((item) => {
            users[userIndex][item] = req.body[item]
        });
        
        res.json({
            message : "Done"
        })
    }else{
        res.json({
            message:"User not found"
        })
    }

})

app.delete("/push/:id", function(req, res){

    let giveId = req.params.id;

    let userIndex = users.findIndex((item) => item.id == giveId);

    if (userIndex != -1){
        users.splice(userIndex, 1);
        res.json({
            message : "User Deleted"
        })
    }else{
        res.json({
            message:"User not found"
        })
    }

})

app.listen(process.env.PORT || 3000);
 
'use strict';
const {createKind, KindStatus} = require('./helper/kind-status');
const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors')

const app = express();
app.use(express.json())
app.use(bodyParser.urlencoded())

app.use(cors({
    origin: "http://localhost:3000"
}))

app.post("/create", async function(req, res){
    if (KindStatus.onErr){
        res.status(501).json({msg: KindStatus.msg})
    }else {
        if(KindStatus.runing == 0){
            res.status(200).json({msg: "Cluster creation started."})
            createKind(req.body.cluster_name);
        } else if(KindStatus.runing == 1){
            res.status(200).json({msg : "Already running process."})
        } else {
            res.status(200).json({msg: "Already created kind cluster."})
        }
    }
});

app.get("/create/status", function(req, res){
    res.status(200).json(KindStatus)
})

app.listen(1453, function () {
  console.log('Sunucu çalışıyor...');
});







// function sleep(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms));
// }

// (async function watchKind(){
//     // createKind();
//     while(true){
//         console.log(KindStatus);
//         if (KindStatus.end || KindStatus.onErr) break;
//         await sleep(1000);
//     }
//     console.log(KindStatus);
// })();

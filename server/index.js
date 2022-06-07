'use strict';
const {createKind, KindStatus} = require('./helper/kind-status');
const express = require('express');

const app = express();

app.get("/create", async function(req, res){
    if (KindStatus.onErr){
        res.status(501).json({msg: KindStatus.msg})
    }else {
        if(KindStatus.runing == 0){
            res.status(200).json({msg: "Cluster creation started."})
            createKind();
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
const kindStatusModel = require('../models/kind-model');

const kindObj = {
    ensuring: "✓ Ensuring node image",
    preparing: "✓ Preparing nodes",
    writenConf: "✓ Writing configuration",
    startingControl: "✓ Starting control-plane",
    installCni: "✓ Installing CNI",
    end: "✓ Installing StorageClass",
}

const KindStatus = new kindStatusModel;
// Kind CNI komutu çıktılarını Live modda takip etmek için.
const createKind = async (name) => {
    // Kind Model new

    // Kind CNI komutu çalıştırma
    const spawn = require('child_process').spawn;
    kind = spawn('kind', ['create', 'cluster', '--name', name]);

    // Çıktı yok ! Sadece stderr de çıktı veriyor.

    /*
    kind.stdout.on('data', function (data) {
        status = data.toString();
        // console.log("stdout: ", status);
    });
    */

    let status;
    kind.stderr.on('data', function (data) {
        status = data.toString();
        KindStatus['runing'] = 1;
        // console.log(status);
        for (let [key, value] of Object.entries(kindObj)) {
            if (status.includes(value))
            {
                KindStatus[key] = true;
            }
        }
    });

    kind.on('exit', function (code) {
        if (code == 1){
            KindStatus['onErr'] = true;
            KindStatus['errMsg'] = status
            KindStatus['runing'] = 0;
        }
        else if (code == 0){
            KindStatus['runing'] = 0;
        }
    });
};

module.exports = {
    KindStatus,
    createKind
}

//Kind Durum İzleme (development için)

/*
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

(async function watchKind(){
    while(true){
        if (status == 1 || status == 0){
            break;
        }
        console.log(KindStatus);
        await sleep(1000);
    }
    console.log("Son Step: ", KindStatus);
})();
*/

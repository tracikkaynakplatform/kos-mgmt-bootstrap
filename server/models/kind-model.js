class KindStatus {
    constructor(){
        this.runing = 0;
        this.ensuring = false;
        this.preparing = false;
        this.writenConf = false;
        this.startingControl = false;
        this.installCni = false;
        this.end = false;
        this.onErr = false;
        this.errMsg = "";
    }
}

module.exports = KindStatus;
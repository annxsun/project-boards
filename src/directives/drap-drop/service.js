export default {
    drapInfo: {},
    setData(info) {
        this.drapInfo = info;
        console.log( this.drapInfo);
    },
    getDrapInfo() {
        return this.drapInfo;
    },
    clearInfo() {
        this.drapInfo = {};  
    }
}
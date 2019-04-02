export default {
    drapInfo: {},
    setData(info) {
        this.drapInfo = info;
    },
    getDrapInfo() {
        return this.drapInfo;
    },
    clearInfo() {
        this.drapInfo = {};  
    }
}
//let nem = require("nem-sdk").default;

const NODES = Array(
    "https://aqualife2.supernode.me",
    "https://aqualife3.supernode.me",
    "https://happy.supernode.me",
    "https://mnbhsgwbeta.supernode.me",
    "https://nsm.supernode.me",
    "https://kohkei.supernode.me",
    "https://mttsukuba.supernode.me",
    "https://strategic-trader-1.supernode.me",
    "https://strategic-trader-2.supernode.me",
    "https://shibuya.supernode.me",
    "https://qora01.supernode.me",
    "https://pegatennnag.supernode.me"
);

const NEM_PORT = ":7891"

const NEM_UNIT = 1000000

const dispTimeStamp = (timeStamp) => {
    const NEM_EPOCH = Date.UTC(2015, 2, 29, 0, 6, 25, 0)
    const d = new Date(NEM_EPOCH + (timeStamp * 1000))
    return d.toLocaleString()
}

const getTargetNode = () => {
    return NODES[Math.floor(Math.random() * NODES.length)] + NEM_PORT
}

export function getAccountTransfersURL(address) {
    const targetNode = getTargetNode();
    const ret = targetNode + "/account/transfers/all?address=" + address;
    return ret;
}

export function getUnconfirmedTransactionURL(address) {
    const targetNode = getTargetNode();
    const ret = targetNode + "/account/unconfirmedTransactions?address=" + address;
    return ret;
}

export function setDashbordList(dashbordList, tranJsonData, address, unconfirmedFlag) {
    const arrLen = tranJsonData.data.data.length
    for (let i = 0; i < arrLen; i++) {
        let tran = tranJsonData.data.data[i].transaction
        let meta = tranJsonData.data.data[i].meta
        let ts = dispTimeStamp(tran.timeStamp)
        let tp = ''
        let am = 0
        let ul = ''
        let cl = ''
        let tran_amount = 0
        let bgc = ''
        if (tran.type == 4100) {
            tran = tran.otherTrans;
        }
        if (tran.type == 257 || tran.type == 8193) {
            let has_mosaic = false;
            //モザイクが存在した場合
            if (tran.mosaics) {
                tran.mosaics.forEach(function (key) {
                    has_mosaic = true;
                    let mosaic = key;
                    if (mosaic.mosaicId.name == "xem" && mosaic.mosaicId.namespaceId == "nem") {
                        tran_amount = mosaic.quantity;
                    }
                });
            }
            //通常送金
            if (!has_mosaic) {
                if (tran.type == 8193) {
                    tran_amount = tran.rentalFee
                }
                else {
                    tran_amount = tran.amount
                }
            }
            if (address != tran.recipient) {
                tp = '出金'
                am = '- ' + ((tran_amount + tran.fee) / NEM_UNIT).toFixed(6)
                cl = 'text-danger'
            }
            else {
                tp = '入金'
                am = '+ ' + (tran_amount / NEM_UNIT).toFixed(6)
                cl = 'text-success'
            }
            if (unconfirmedFlag) {
                bgc = 'table-warning'
            }
            else {
                ul = 'http://explorer.nemchina.com/#/s_tx?hash=' + meta.hash.data
            }
            
            dashbordList.push({
                timeStamp: ts,
                type: tp,
                amount: am,
                url: ul,
                color: cl,
                unconfirmed: unconfirmedFlag,
                bgcolor: bgc
            });
        }
    }
    return dashbordList
}

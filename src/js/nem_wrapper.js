const NODES = Array(
    "https://aqualife2.supernode.me",
    "https://aqualife3.supernode.me",
    // "https://beny.supernode.me", 調子悪い？
    "https://happy.supernode.me",
    "https://mnbhsgwbeta.supernode.me",
    // "https://nemstrunk.supernode.me", 調子悪い？
    // "https://nemstrunk2.supernode.me", 調子悪い？
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

var dispTimeStamp = function(timeStamp) {
    var NEM_EPOCH = Date.UTC(2015, 2, 29, 0, 6, 25, 0)
    const d = new Date(NEM_EPOCH + (timeStamp * 1000))
    return d.toLocaleString()
}

exports.getAccountTransfersURL = function(address){
    var targetNode =  NODES[Math.floor(Math.random() * NODES.length)] + NEM_PORT
    var apl = targetNode + "/account/transfers/all?address=" + address
    return apl
}

exports.getDashbordList = function(tranJSON, address) {
    var dashbordList = []
    var arrLen = tranJSON.data.data.length
    for (var i = 0; i < arrLen; i++) {

        var tran = tranJSON.data.data[i].transaction
        var meta = tranJSON.data.data[i].meta

        var ts = dispTimeStamp(tran.timeStamp)
        var tp = ''
        var am = 0
        var ul = ''
        var cl = ''
        var tran_amount = 0

        if (tran.type == 4100) {
            tran = tran.otherTrans
        }

        if (tran.type == 257 || tran.type == 8193 ) {

            var has_mosaic = false;

            //モザイクが存在した場合
            if (tran.mosaics) {
                tran.mosaics.forEach(function(key) {
                has_mosaic = true
                var mosaic = key
                if (mosaic.mosaicId.name == "xem" && mosaic.mosaicId.namespaceId == "nem"){
                    tran_amount = mosaic.quantity
                }
            })
        }

        //通常送金
        if (!has_mosaic) {
            if (tran.type == 8193 ) {
            tran_amount = tran.rentalFee
            } else {
            tran_amount = tran.amount
            }
        }

        if(address != tran.recipient){
            tp = '出金'
            am = '- ' + ((tran_amount + tran.fee) / NEM_UNIT).toFixed(6)
            cl = "text-danger"
        } else {
            tp = '入金'
            am = '+ ' + (tran_amount / NEM_UNIT).toFixed(6)
            cl = "text-success"
        }
        ul = 'http://explorer.nemchina.com/#/s_tx?hash=' + meta.hash.data;

        dashbordList.push({
            timeStamp: ts,
            type: tp,
            amount: am,
            url: ul,
            color: cl
        });
        }
    }
    return dashbordList
}

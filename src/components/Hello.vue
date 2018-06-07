<template>
  <div class="hello">
    <main role="main" class="container">

      <div class="row">
        <!-- 請求価格入力 -->
        <div class="col-md-6">
          <div class="card border-secondary mb-3">
            <h5 class="card-header">請求価格入力</h5>
            <div class="card-body">
              <form>
                <div class="form-group">
                  <label>入金先</label>
                  <input v-model="nemAddress" type="text" class="form-control" id="formGroupExampleInput2" placeholder="NEMのアドレスを入力して下さい">
                </div>
                <div class="form-group">
                  <label>メッセージ</label>
                  <input v-model="tranMessage" type="text" class="form-control" id="formGroupExampleInput2" placeholder="(任意)入金時のメッセージを入力して下さい">
                </div>
                <div class="form-group">
                  <label>価格(JPY)</label>
                  <input v-model="jpyPrice" type="text" class="form-control" id="formGroupExampleInput2" placeholder="日本円価格を入力して下さい">
                </div>
              </form>
              <button v-on:click="getXEMPrice()" class="btn btn-primary mb-2">請求書を作成</button>
            </div>
          </div>
        </div>
        <!-- 請求書 -->
        <div class="col-md-6">
            <div class="card border-secondary mb-3">
            <h5 class="card-header">請求書</h5>
            <div class="card-body">
              <div class="row">
                <div class="col-md-4">
                  現在のレート
                </div>
                <div class="col-md-8">
                  <p>{{ xemRate }} 円 / XEM</p>
                </div>
              </div>
              <div class="row">
                <div class="col-md-4">
                  価格(XEM)
                </div>
                <div class="col-md-8">
                  <p>{{ xemPrice }} XEM</p>
                </div>
              </div>
              <!-- QRコードを表示 -->
              <div v-if="qrcodeShow" class="text-center">
                  <img v-bind:src="qrcodeUrl" alt="xem請求書" width="200" height="200">
              </div>
              <div v-show="false">
                <p>{{ xemBTC }}{{ dolRate }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="card border-secondary mb-3">
        <div class="card-header">
          <h5>ダッシュボード</h5>
          <ul class="nav nav-tabs card-header-tabs">
            <li class="nav-item">
              <a href="#tab1" class="nav-link active" data-toggle="tab">承認済み</a>
            </li>
            <li class="nav-item">
              <a href="#tab2" class="nav-link" data-toggle="tab">未承認</a>
            </li>
          </ul>
        </div>
        <div class="card-body">
          <div class="tab-content">
            <div id="tab1" class="tab-pane active">
              <table class="table table-hover" style="max-width:30em">
                <thead class="thead-light">
                  <tr>
                    <th scope="col">日時</th>
                    <th scope="col">種別</th>
                    <th scope="col">価格(XEM)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="entry in dashbord">
                    <td style="max-width:7em">{{dispTimeStamp(entry.timeStamp)}}</td>
                    <td>{{entry.type}}</td>
                    <td class="text-right"><a v-bind:href="entry.url" target="_blank">{{entry.amount}}</a></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div id="tab2" class="tab-pane">
              開発中・・・。リリースまでしばらく待ってね。
            </div>
          </div>
        </div>
      </div>

    </main><!-- /.container -->
  </div>
</template>

<script>
import axios from 'axios';
import Vue from 'vue';
import { isNull } from 'util';

var NODES = Array(
"aqualife1.supernode.me",
"aqualife2.supernode.me",
"aqualife3.supernode.me",
);

var defaultPort = ":7891";

var getAccountTransfersURL = function(address){
    var targetNode =  NODES[Math.floor(Math.random() * NODES.length)] + defaultPort;
    var apl = "https://" + targetNode + "/account/transfers/all?address=" + address;
    return apl;
}

export default {
  name: 'hello',

  data () {
    return {
      jpyPrice:       0,
      xemRate:        'レート取得中・・・',
      xemPrice:       0,
      xembookUrl:     'http://13.113.193.148/xembook/lastprice2.json',
      poloniexUrl:    'https://poloniex.com/public?command=returnTicker',
      qrcodeShow:     false,
      qrcodeUrl:      'http://chart.apis.google.com/chart?chs=180x180&cht=qr&chl=',
      dolRate:        0,
      xemBTC:         0,
      nemAddress:     '',
      tranMessage:    '',
      accountTransfers: [],
      dashbord:         [],
    }
  },

  async created () {
    // ユーザーが前回入力した値を取得
    this.nemAddress = localStorage.getItem("lastNemAddress");

    // poloniexからXEM/BTC価格を取得
    try {
      let res1 = await axios.get('https://poloniex.com/public?command=returnTicker')
      let res2 = await axios.get('https://blockchain.info/ticker?cors=true')

      this.xemBTC = res1.data.BTC_XEM.last
      this.dolRate = res2.data.JPY.last

      this.xemRate = Math.round(this.xemBTC * this.dolRate * 1000000) / 1000000;
    } catch (e) {
      console.error(e)
    }

    // トランザクションを取得
    try {
      var tranApi = getAccountTransfersURL(this.nemAddress);
      let res = await axios.get(tranApi)
      this.accountTransfers = res.data.data

      var arrLen = res.data.data.length;
      for (var i = 0; i < arrLen; i++) {

        var tran = this.accountTransfers[i].transaction;
        var meta = this.accountTransfers[i].meta;

        var ts = tran.timeStamp;
        var tp = '';
        var am = 0;
        var ul = '';
        var tran_amount = 0;

        if (tran.type == 4100) {
          tran = tran.otherTrans;
        }
      
        if (tran.type == 257 || tran.type == 8193 ) {

          var has_mosaic = false;

          //モザイクが存在した場合
          if (tran.mosaics) {
            tran.mosaics.forEach(function(key) {
              has_mosaic = true;
              var mosaic = key;
              if (mosaic.mosaicId.name == "xem" && mosaic.mosaicId.namespaceId == "nem"){
                tran_amount = mosaic.quantity;
              }
            });
          }

          //通常送金
          if (!has_mosaic) {
            if (tran.type == 8193 ) {
              tran_amount = tran.rentalFee;
            } else {
              tran_amount = tran.amount;
            }
          }

          if(this.nemAddress != tran.recipient){
            var tp = '出金';
            var am = '- ' + ((tran_amount + tran.fee) / 1000000).toFixed(6);
          } else {
            var tp = '入金';
            var am = '+ ' + (tran_amount / 1000000).toFixed(6);
          }
          ul = 'http://explorer.nemchina.com/#/s_tx?hash=' + meta.hash.data;

          this.dashbord.push({
            timeStamp: ts,
            type: tp,
            amount: am,
            url: ul
          });
        }
      }
    } catch (e) {
      console.error(e)
    }
  },

  updated () {
    if (this.xemBTC != 0) {
      if (this.dolRate != 0) {
        this.xemPrice = Math.round(this.jpyPrice / this.xemRate * 1000000) / 1000000;
      }
    }
  },

  methods: {
    getXEMPrice: function () {
        this.qrcodeShow = false;
        var googleQRcode = 'http://chart.apis.google.com/chart?chs=180x180&cht=qr&chl=';
        var nemInvoice = '{"v":2,"type":2,"data":{"addr":"' + this.nemAddress + '","amount":' + this.xemPrice * 1000000 + ',"msg":"' + this.tranMessage + '"}}';
        this.qrcodeUrl = googleQRcode + nemInvoice;
        this.qrcodeShow = true;

        localStorage.setItem("lastNemAddress", this.nemAddress);

        alert("請求書用のQRコードを出力します" );
    },

    dispTimeStamp: function(timeStamp){
      var NEM_EPOCH = Date.UTC(2015, 2, 29, 0, 6, 25, 0);
      const d = new Date(NEM_EPOCH + (timeStamp * 1000));
      return d.toLocaleString();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>

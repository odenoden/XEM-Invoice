<template>
  <div class="invoice">
    <main role="main" class="container">

      <div class="row">
        <!-- 請求価格入力 -->
        <div class="col-md-6">
          <div class="card border-secondary mb-3">
            <div>
              <h5 class="card-header">請求価格入力</h5>
            </div>
            <div class="card-body">
              <form v-on:submit.prevent="getPriceXEM">
                <div class="form-group">
                  <label>入金先</label><span class="help-block">（半角英数で40文字 ハイフンなし）</span>
                  <input
                    v-model="nemAddress"
                    type="text"
                    class="form-control"
                    placeholder="(必須)NEMのアドレスを入力して下さい"
                    pattern="^[0-9-A-Z]{40}"
                    required>
                </div>
                <div class="form-group">
                  <label>メッセージ</label>
                  <input v-model="tranMessage" type="text" class="form-control" placeholder="(任意)入金時のメッセージを入力して下さい">
                </div>
                <div class="form-group">
                  <div class="row">
                    <div class="col col-sm-2">
                      <label>価格</label>
                    </div>
                    <div class="col col-sm-3">
                      <select v-model="currencyType" class="form-control form-control-sm">
                        <option>JPY</option>
                      </select>
                    </div>
                  </div>
                  <input v-model="fiatPrice" type="number" class="form-control" placeholder="(必須)日本円価格を入力して下さい" required>
                </div>
                <button type="submit" class="btn btn-primary mb-2">請求書を作成</button>
              </form>
            </div>
          </div>
        </div>
        <!-- 請求書 -->
        <div class="col-md-6">
            <div class="card border-secondary mb-3">
            <div>
              <h5 class="card-header">
                請求書
                <button v-on:click="updateInvoice" class="btn btn-outline-primary btn-sm float-right">更新</button>
              </h5>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-md-4">
                 請求元
                </div>
                <div class="col-md-8">
                  <p>{{ nemAddress }}</p>
                </div>
              </div>
              <div class="row">
                <div class="col-md-4">
                  現在のレート
                </div>
                <div class="col-md-8">
                  <p>{{ xemRate }} {{currencyType}} / XEM</p>
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
                <p>{{ xemBTC }}{{ fiatRate }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="card border-secondary mb-3">
        <div class="card-header">
          <h5>
            ダッシュボード
            <button v-on:click="getNemTransaction" class="btn btn-outline-primary btn-sm float-right">更新</button>
          </h5>
        </div>
        <div class="card-body m-0 p-2">
          <p>{{dashbordMessage}}</p>
          <table class="table table-hover table-bordered table-sm" style="max-width:30em">
            <thead class="thead-light text-center">
              <tr>
                <th scope="col">日時</th>
                <th scope="col">価格(XEM)</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="entry in dashbord" v-bind:class="entry.bgcolor">
                <td style="max-width:6em">
                  <div v-if="entry.unconfirmed" style="font-weight: bold;">
                      未承認
                  </div>
                  {{entry.timeStamp}}
                </td>
                <td class="text-right" v-bind:class="entry.color">
                  {{entry.amount}}
                </td>
                <td class="text-center">
                  <a v-bind:href="entry.url" target="_blank">
                    <button class="btn btn-primary btn-sm">詳細</button>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </main><!-- /.container -->
  </div>
</template>

<script>
import axios from 'axios';
import Vue from 'vue';
import { isNull } from 'util';
import nemWrapper from '@/js/nem_wrapper'
//import exchangeWrapper from '@/js/exchange_wrapper'

const URL_PLONIEX_API_TICKER = 'https://poloniex.com/public?command=returnTicker'
const URL_BLOCKCHAIN_API_TICKER = 'https://blockchain.info/ticker?cors=true'
const URL_GOOGLE_QRCODE = 'http://chart.apis.google.com/chart?chs=180x180&cht=qr&chl='

const getNowDateTime = () => {
  //今日の日付データを変数hidukeに格納
  const dt = new Date(); 

  //年・月・日を取得する
  const year = dt.getFullYear();
  const month = dt.getMonth()+1;
  const day = dt.getDate();

  //時・分・秒を取得する
  var hour = dt.getHours();
  var minute = dt.getMinutes();
  var second = dt.getSeconds();

  return year + '/' + month + '/' + day + ' ' + hour + ':' + ('00' + minute).slice(-2) + ':' + ('00' + second).slice(-2)
}

export default {
  name: 'invoice',

  data () {
    return {
      fiatPrice:       0,
      xemRate:        'レート取得中・・・',
      xemPrice:       0,
      qrcodeShow:     false,
      fiatRate:        0,
      xemBTC:         0,
      nemAddress:     '',
      tranMessage:    '',
      dashbord:         [],
      dashbordMessage:  '',
      currencyType:   '',
    }
  },

  mounted () {
    // ユーザーが前回入力した値を取得
    this.nemAddress = localStorage.getItem("lastNemAddress");
    this.currencyType = localStorage.getItem("lastCurrencyType");
    if (this.currencyType != '') {
      this.currencyType = 'JPY'
    }

    // poloniexからXEM/BTC価格を取得
    this.getRateXem();

    // トランザクションを取得
    if (this.nemAddress != '') {
      this.getNemTransaction()
    }
  },

  updated () {
    if (this.xemBTC != 0) {
      if (this.fiatRate != 0) {
        this.xemPrice = Math.round(this.fiatPrice / this.xemRate * 1000000) / 1000000
      }
    }
  },

  methods: {
    async updateInvoice (){
      await this.getRateXem()
      this.getPriceXEM()
    },

    getPriceXEM: function () {
        alert("請求書用のQRコードを出力します")

        this.qrcodeShow = false
        let nemInvoice = '{"v":2,"type":2,"data":{"addr":"' + this.nemAddress + '","amount":' + this.xemPrice * 1000000 + ',"msg":"' + this.tranMessage + '"}}'
        this.qrcodeUrl = URL_GOOGLE_QRCODE + nemInvoice
        this.qrcodeShow = true

        localStorage.setItem("lastNemAddress", this.nemAddress)
        localStorage.getItem("lastCurrencyType", this.currencyType)
    },

    async getRateXem() {
      try {
        this.xemRate = 'レート取得中・・・'
        this.xemBTC = 0
        this.fiatRate = 0
        this.xemPrice = 0

        let res1 = await axios.get(URL_PLONIEX_API_TICKER)
        let res2 = await axios.get(URL_BLOCKCHAIN_API_TICKER)

        this.xemBTC = res1.data.BTC_XEM.last
        this.fiatRate = res2.data[this.currencyType].last

        this.xemRate = Math.round(this.xemBTC * this.fiatRate * 1000000) / 1000000;
        this.xemPrice = Math.round(this.fiatPrice / this.xemRate * 1000000) / 1000000;
      } catch (error) {
        console.error(error)
      }
    },

    async getNemTransaction() {
      try {
        let dashbordList = []

        // 未承認トランザクションを取得
        let tranApi = nemWrapper.getUnconfirmedTransactionURL(this.nemAddress);
        let res = await axios.get(tranApi)
        this.dashbord = nemWrapper.setDashbordList(dashbordList, res, this.nemAddress, true)

        // 承認済トランザクションを取得
        tranApi = nemWrapper.getAccountTransfersURL(this.nemAddress);
        res = await axios.get(tranApi)
        this.dashbord = nemWrapper.setDashbordList(dashbordList, res, this.nemAddress, false)

        // トランザクションの最終取得時刻を設定
        this.dashbordMessage = '最終取得時刻：' + getNowDateTime()
      } catch (error) {
        if(error.message == 'Request failed with status code 400'){
            this.dashbordMessage = "入金先が正しくありません"
        } else {
          this.dashbordMessage = error
          console.error(error)
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>

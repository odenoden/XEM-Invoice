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
                      <select v-model="currencyType"  class="form-control form-control-sm" lazy>
                        <option v-for="option in currencyItems" v-bind:value="option.value">
                          {{ option.text }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <input v-model="priceFiat" type="number" class="form-control" placeholder="(必須)日本円価格を入力して下さい" required>
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
                  <p>{{ rateFiatToXem }} {{ currencyType }} / XEM</p>
                  <p>{{ invoiceMessage }}</p>
                </div>
              </div>
              <div class="row">
                <div class="col-md-4">
                  価格(XEM)
                </div>
                <div class="col-md-8">
                  <p>{{ priceXem }} XEM</p>
                </div>
              </div>
              <!-- QRコードを表示 -->
              <div v-if="qrcodeShow" class="text-center">
                  <img v-bind:src="qrcodeUrl" alt="xem請求書" width="200" height="200">
              </div>
              <div v-show="false">
                <p>{{ rateXemToBtc }}{{ rateBtcToFiat }}</p>
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
import * as nemWrapper from '@/js/nem_wrapper'
import * as commonWrapper from '@/js/common_wrapper'

const URL_PLONIEX_API_TICKER = 'https://poloniex.com/public?command=returnTicker'
const URL_BLOCKCHAIN_API_TICKER = 'https://blockchain.info/ticker?cors=true'
const URL_GOOGLE_QRCODE = 'http://chart.apis.google.com/chart?chs=180x180&cht=qr&chl='

export default {
  name: 'invoice',

  data () {
    return {
      priceFiat:      0,
      priceXem:       0,
      rateXemToBtc:   0,
      rateBtcToFiat:  0,
      rateFiatToXem:  'レート取得中・・・',
      nemAddress:     '',
      tranMessage:    '',
      currencyType:   '',
      qrcodeShow:     false,
      invoiceMessage: '',
      dashbordList:   [],
      dashbordMessage:'',
      currencyItems:  [
        {text: 'JPY', value: 'JPY'},
        {text: 'USD', value: 'USD'},
        {text: 'EUR', value: 'EUR'},
        {text: 'KRW', value: 'KRW'},
      ],
    }
  },

  mounted () {
    // ユーザーが前回入力した値を取得
    this.nemAddress = localStorage.getItem("lastNemAddress")
    this.currencyType = localStorage.getItem("lastCurrencyType")
    if (this.currencyType === null) {
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
    if (this.rateXemToBtc != 0) {
      if (this.rateBtcToFiat != 0) {
        // 価格(XEM)を最新に更新
        this.rateFiatToXem = Math.round(this.rateXemToBtc * this.rateBtcToFiat[this.currencyType].last * 1000000) / 1000000
        this.priceXem = Math.round(this.priceFiat / this.rateFiatToXem * 1000000) / 1000000
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
        let nemInvoice = '{"v":2,"type":2,"data":{"addr":"' + this.nemAddress + '","amount":' + this.priceXem * 1000000 + ',"msg":"' + this.tranMessage + '"}}'
        this.qrcodeUrl = URL_GOOGLE_QRCODE + nemInvoice
        this.qrcodeShow = true

        localStorage.setItem("lastNemAddress", this.nemAddress)
        localStorage.setItem("lastCurrencyType", this.currencyType)
    },

    async getRateXem() {
      try {
        // 初期化
        this.rateFiatToXem = 'レート取得中・・・'
        this.rateXemToBtc = 0
        this.rateBtcToFiat = 0
        this.priceXem = 0

        // poloniexからXEMのBTC価格を取得
        let res1 = await axios.get(URL_PLONIEX_API_TICKER)
        this.rateXemToBtc = res1.data.BTC_XEM.last

        // blockchain.infoからBTCの法定価格を取得
        let res2 = await axios.get(URL_BLOCKCHAIN_API_TICKER)
        this.rateBtcToFiat = res2.data

        // レートの最終取得時刻を取得
        this.invoiceMessage = '最終取得時刻：' + commonWrapper.getNowDateTime()
      } catch (error) {
        this.invoiceMessage = '取引所(poloniex)からレートを取得できませんでした。'
        console.error(error)
      }
    },

    async getNemTransaction() {
      try {
        let list = []

        // 未承認トランザクションを取得
        let tranApi = nemWrapper.getUnconfirmedTransactionURL(this.nemAddress);
        let res = await axios.get(tranApi)
        this.dashbord = nemWrapper.setDashbordList(list, res, this.nemAddress, true)

        // 承認済トランザクションを取得
        tranApi = nemWrapper.getAccountTransfersURL(this.nemAddress);
        res = await axios.get(tranApi)
        this.dashbordList = nemWrapper.setDashbordList(list, res, this.nemAddress, false)

        // トランザクションの最終取得時刻を取得
        this.dashbordMessage = '最終取得時刻：' + commonWrapper.getNowDateTime()

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

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
              <form @submit="getXEMPrice">
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
                  <label>価格(JPY)</label>
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
                <button v-on:click="getRateXem" class="btn btn-outline-primary btn-sm float-right">更新</button>
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
          <ul class="nav nav-tabs card-header-tabs">
            <li class="nav-item">
              <a href="#tab1" class="nav-link active" data-toggle="tab">承認済み</a>
            </li>
            <li class="nav-item">
              <a href="#tab2" class="nav-link" data-toggle="tab">未承認</a>
            </li>
          </ul>
        </div>
        <div class="card-body m-0 p-2">
          <div class="tab-content">
            <div id="tab1" class="tab-pane active">
              <table class="table table-hover table-bordered table-sm" style="max-width:30em">
                <thead class="thead-light text-center">
                  <tr>
                    <th scope="col">日時</th>
                    <th scope="col">価格(XEM)</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="entry in dashbord">
                    <td style="max-width:6em">{{entry.timeStamp}}</td>
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
import nemWrapper from '@/js/nem_wrapper'
//import exchangeWrapper from '@/js/exchange_wrapper'

const URL_PLONIEX_API_TICKER = 'https://poloniex.com/public?command=returnTicker'
const URL_BLOCKCHAIN_API_TICKER = 'https://blockchain.info/ticker?cors=true'
const URL_GOOGLE_QRCODE = 'http://chart.apis.google.com/chart?chs=180x180&cht=qr&chl='

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
      dashbordError:  '',
    }
  },

  mounted () {
    // ユーザーが前回入力した値を取得
    this.nemAddress = localStorage.getItem("lastNemAddress");

    // poloniexからXEM/BTC価格を取得
    try {
      this.getRateXem();
    } catch (error) {
      console.error(error)
    }

    // トランザクションを取得
    this.getNemTransaction()
  },

  updated () {
    if (this.xemBTC != 0) {
      if (this.fiatRate != 0) {
        this.xemPrice = Math.round(this.fiatPrice / this.xemRate * 1000000) / 1000000;
      }
    }
  },

  methods: {
    getXEMPrice: function () {
        alert("請求書用のQRコードを出力します" );

        this.qrcodeShow = false;
        var nemInvoice = '{"v":2,"type":2,"data":{"addr":"' + this.nemAddress + '","amount":' + this.xemPrice * 1000000 + ',"msg":"' + this.tranMessage + '"}}';
        this.qrcodeUrl = URL_GOOGLE_QRCODE + nemInvoice;
        this.qrcodeShow = true;

        localStorage.setItem("lastNemAddress", this.nemAddress);
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
        this.fiatRate = res2.data['JPY'].last

        this.xemRate = Math.round(this.xemBTC * this.fiatRate * 1000000) / 1000000;
      } catch (error) {
        console.error(error)
      }
    },

    async getNemTransaction() {
      try {
        var tranApi = nemWrapper.getAccountTransfersURL(this.nemAddress);
        let res = await axios.get(tranApi)

        this.dashbord = nemWrapper.getDashbordList(res, this.nemAddress)
      } catch (error) {
        if(error.message == 'Request failed with status code 400'){
            this.dashbordError = "入金先が正しくありません"
        } else {
          this.dashbordError = error
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

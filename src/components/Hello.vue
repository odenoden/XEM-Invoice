<template>
  <div class="hello">
    <main role="main" class="container">

      <div class="card-deck mb-3">
        <div class="card mb-4 box-shadow">
          <div class="card-header">
            <h4 class="my-0 font-weight-normal">販売金額入力</h4>
          </div>
          <div class="card-body">
            <form>
              <div class="form-group">
                <label for="formGroupExampleInput2">価格(JPY)</label>
                <input v-model="jpyPrice" type="text" class="form-control" id="formGroupExampleInput2" placeholder="商品の日本円価格を入力して下さい">
              </div>
              <div class="form-group">
                <label for="formGroupExampleInput">現在のレート</label>
                <p>{{ xemRate }} 円 / XEM</p>
              </div>
              <div class="form-group">
                <label for="formGroupExampleInput2">価格(XEM)</label>
                <!-- <input type="text" readonly class="form-control-plaintext" id="staticEmail" value="email@example.com"> -->
                <p>{{ xemPrice = Math.round(jpyPrice / xemRate * 1000000) / 1000000 }} XEM</p>
              </div>

              <button v-on:click="getXEMPrice()" type="submit" class="btn btn-primary mb-2">請求書を作成</button>
            </form>
          </div>
        </div>

        <div class="card mb-4 box-shadow">
          <div class="card-header">
            <h4 class="my-0 font-weight-normal">請求書</h4>
          </div>
          <div class="card-body">
            「請求書を作成」ボタンをクリックすると、QRコードが表示されます。
            <div v-if="qrcodeShow">
                <img v-bind:src="qrcodeUrl" alt="xem請求書" width="250" height="250">
            </div>
            <div v-show="false">
              <p>{{ xemBTC }}{{ dolRate }}</p>
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

var tset = 0;

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
    }
  },

  mounted () {
    axios
      .get('https://poloniex.com/public?command=returnTicker')
      .then(response => (this.xemBTC = response.data.BTC_XEM.last));
    axios
      .get('https://blockchain.info/ticker?cors=true')
      .then(response => (this.dolRate = response.data.JPY.last));
  },

  updated () {
    if (this.xemBTC != 0) {
      if (this.dolRate != 0) {
        this.xemRate = Math.round(this.xemBTC * this.dolRate * 1000000) / 1000000;
      }
    }
  },

  methods: {
    getXEMPrice: function () {
        this.qrcodeShow = false;
        var googleQRcode = 'http://chart.apis.google.com/chart?chs=180x180&cht=qr&chl=';
        var address = 'NCPB4V625NAVKHGVOZRKTX6LAIEKVLK5C3QK6BHB';
        var nemInvoice = '{"v":2,"type":2,"data":{"addr":"' + address + '","amount":' + this.xemPrice * 1000000 + ',"msg":""}}';
        this.qrcodeUrl = googleQRcode + nemInvoice;
        this.qrcodeShow = true;
        alert("XEM価格を固定し、注文用QRコードを出力します" );
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #35495E;
}
</style>

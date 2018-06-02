<template>
  <div class="hello">
    <h1>注文情報</h1>
    <h2>伝票番号</h2>
    <input v-model="voucherNumber">
    <h2>価格(JPY)</h2>
    <input v-model="jpyPrice">

    <h1>価格情報</h1>
    <h2>現在のレート</h2>
    <p>{{ xemRate }} 円 / XEM</p>
    <h2>XEM価格(参考値)</h2>
    <p>{{ xemPrice = Math.round(jpyPrice / xemRate * 1000000) / 1000000 }} XEM</p>
    
    <h1>ご注文</h1>
    <p><button v-on:click="getXEMPrice()">現在価格で確定</button></p>
    <p>{{ xemBTC }}{{ dolRate }}</p>
    <div v-if="qrcodeShow">
        <img v-bind:src="qrcodeUrl" alt="xem請求書" width="180" height="180">
    </div>
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
      voucherNumber:  '',
      jpyPrice:       0,
      xemRate:        0,
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

//    this.xemRate = this.xemBTC * this.dolRate;
  },
/*
  created () {
        $.ajax({url: 'https://poloniex.com/public?command=returnTicker' ,type: 'GET',cache: false}).done(
        function(res){
          tset = res.BTC_BCN.last;
          alert(tset);
          ret = tset;
          this.xemRate = ret;
        }
      );

      sleep(10);
      this.xemRate = ret;
//      alert(this.ret.zaif);
//      this.xemRate = this.ret.zaif;
      
    axios.get(this.xembookUrl)
    .then(function (response) {
      app.xemPrice = response.data.zaif;
    })
    .catch(function (error) {
      alert(error);
      console.log(error);
    });
  },
*/
  updated () {
    this.xemRate = Math.round(this.xemBTC * this.dolRate * 1000000) / 1000000;
  },
  methods: {
    getXEMPrice: function () {
        this.qrcodeShow = false;
        var googleQRcode = 'http://chart.apis.google.com/chart?chs=180x180&cht=qr&chl=';
        var address = 'NCPB4V625NAVKHGVOZRKTX6LAIEKVLK5C3QK6BHB';
        var nemInvoice = '{"v":2,"type":2,"data":{"addr":"' + address + '","amount":' + this.xemPrice * 1000000 + ',"msg":"' + this.voucherNumber + '"}}';
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

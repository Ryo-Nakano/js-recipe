let app = new Vue({
  el : '#app',

  data : {
    message : "まだボタンが押されてねえぜえ...",
    count : 0 //ボタンが押された回数を保持
  },

  methods : {

    //クリックした時に呼ばれる関数
    buttonClicked : function(){
      console.log('Clicked!');
      this.count ++;
      this.message = "このボタンは" + this.count +  "回押されたらしいぞ！";
    }
  }
});

console.log("hello");


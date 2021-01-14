//各要素を取得
const display = document.getElementById("display");
const button = document.getElementById("button");

let count = 0;

const countUp = function(){
    // count を更新
    count += 1;
    // count を秒単位にして表示
    display.textContent = count/100;
};

let id = null;

button.onclick = function(){
    if (id === null) { // start
        id = setInterval(countUp, 10);
        console.log(id); //戻り値として一意の値が返ってくるみたい！
        button.textContent = "stop";
    } 
    else { // stop
        clearInterval(id);
        id = null;
        button.textContent = "start";
    }
};

//setInterval(), setTimeout()が必ずしも正確ではないことはわかったけど
//それがどういう仕組みで、なのかがイマイチわからん...
// → 参照：https://developer.mozilla.org/ja/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout#reasons_for_delays_longer_than_specified

//タイムアウトの最小値は4msらしいから、
//今回10msに設定しているので問題ないはずなのでは...？
//他の理由...？


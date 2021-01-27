/**
 * 世代とLife数でグラフ書いて
 * 時系列でどう変化したのか、とかリアルタイムで見ることできたら面白そう。
 * 
 * Life数をモニタリングして表示できるように
 * 
 * GASでAPI作って毎回の実行データをスプレッドシートのDBに蓄積 is あり
 * ・初期Life数
 * ・初期Life生成確率
 * ・存続世代数
 * ・定常状態時Life数
 * とかかな...？
 * 
 * 『一時訂正』『再開』できるようにしたい
 */

const genLabel = document.getElementById('gen');
const restart_button = document.getElementById('restart-button');

let prevGen = [];
let genCount = 0; //何世代目か数える変数

restart_button.onclick = function(){
  prevGen = makeGen(150, 100, 20);
  genCount = 0;
};

function setup() {
  
  createCanvas(1500, 1000);
  
  prevGen = makeGen(150,100, 20);

  setInterval(function(){
    main();
    genCount++;
    genLabel.textContent = genCount;
  }, 100);
}



//世代
// let prevGen = [
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
//   [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// ];

// let prevGen = [
//   [0, 0, 0, 0, 0],
//   [0, 1, 1, 0, 1],
//   [1, 0, 0, 0, 0],
//   [0, 1, 0],
//   [0, 1, 1],
//   [0, 0, 0]
// ];


function keyTyped(){
  if(key === 'Enter'){

    // console.clear(); //コンソール削除
    main();
    
  }
}

function main(){
  const w_y = prevGen.length; //genのy軸方向の長さを求める(縦の要素数)
  const w_x = prevGen[0].length; //genのx軸方向の長さを求める(横の要素数)

  let nextGen = [];
  for(let y = 0; y < w_y; y++){
    let nextGen_row = [];
    for(let x = 0; x < w_x; x++){
      
      const lifeCount = countLife(x, y, prevGen);
      const prevCell = prevGen[y][x];

      let nextCell = 0; //次の世代のセルの値 (初期値として一旦0を代入しておく)
      //前世代で対象セルに生命がいた場合
      if(prevCell === 1){

        //周囲に生きているセルが1つ以下のとき
        if(lifeCount <= 1){ 
          //過疎 → 死
          nextCell = 0;
        }
        //周囲に生きているセルが2~3つのとき
        else if(lifeCount === 2 || lifeCount === 3){
          //維持 → 生存
          nextCell = 1;
        }
        //周囲に生きているセルが4つ以上のとき
        else if(lifeCount >= 4){
          //過密 → 死
          nextCell = 0;
        }
      }
      //前世代で対象セルに生命がいなかった場合
      else{

        //周囲に生きているセルが3つのとき
        if(lifeCount === 3){
          nextCell = 1;
          // console.log('セル誕生！！');
        }
        //それ以外のとき
        else{
          nextCell = 0;
        }
      }

      nextGen_row.push(nextCell);
    }
    nextGen.push(nextGen_row);
  }

  //コンソールにいい感じで表示
  for(let y = 0; y < w_y; y++){
    // console.log(nextGen[y]);
  }

  //prevに配列を格納しておく
  prevGen = nextGen;
  view(prevGen);
}


//周りのマスを全部見る → 生きてるマスの数を返す関数
function countLife(x, y, preG){ 
  const w_y = preG.length; //genのy軸方向の長さを求める(縦の要素数)
  const w_x = preG[0].length; //genのx軸方向の長さを求める(横の要素数)
  let count = 0; //いくつのマスが生きているか数え上げる為の変数

  // console.log('(x, y) = (' + x + ', ' + y + ') をチェック === === === === ===' );

  //全方位のマスをチェック
  for(let i_y = 0; i_y < 3; i_y++){
    if(y-1+i_y < 0 || y-1+i_y >= w_y){ continue; } //上下被りチェック → 被っていたら次の行に
    
    for(let j_x = 0; j_x < 3; j_x++){
      if(x-1+j_x < 0 || x-1+j_x >= w_x){ continue; } //左右被りチェック → 被っていたら次の列に
      if(i_y === 1 && j_x === 1){ continue; } //中央の時 → 次の列に
      let target = preG[y-1+i_y][x-1+j_x];
      // console.log('(' + i_y + ', ' + j_x + ') = ' + target);

      if(target === 1){
        count++;
      }
      //まだカウントはしてないけど、正しく数えることはできてそう！
    }
  }

  // console.log(' → Life count : ' + count);
  return count;
}

//もらった二次元配列を元に描画する関数
function view(array){
  //viewをリセット
  background(240);

  const w = 10; //セルひとつあたりの幅
  const x_length = array[0].length;
  const y_length = array.length;

  for(let y = 0; y < y_length; y++){
    for(let x = 0; x < x_length; x++){
      const cell = array[y][x];
      if(cell !== 1){ continue; }
      fill('rgba(0, 255, 220, 1)');
      rect(w*x, w*y, w);
    }
  }
}

//Genを作る関数
function makeGen(x, y, ratio){ //ratioはセルが"生きているセル"になる確率
  let gen = [];

  for(let i_y = 0; i_y < y; i_y++){
    let gen_row = [];
    for(let j_x = 0; j_x < x; j_x++){
      let r = getRandomIntInclusive(0, 101);
      if(r < ratio){
        gen_row.push(1);
      }
      else{
        gen_row.push(0);
      }
    }
    gen.push(gen_row);
  }

  return gen;
}

//min以上max未満の整数をランダムで返す関数
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}


function canvasTest() {
  fill(240, 240, 240); // 濃いグレー値
  rect(20, 20, 60, 60);

  fill(255, 180, 100); // R、G、Bの整数値
  rect(100, 20, 60, 60); // 肌色で描画

  colorMode(HSB);  // カラーモードで HSB を設定
  fill(100, 204, 100); // H,S,Bの整数値
  rect(180, 20, 60, 60); // 緑色で描画

  fill('red'); // 名前付き SVG/CSS カラー文字列
  rect(260, 20, 60, 60); // 赤色で描画

  fill('#fae'); //  3桁の16進数で RGB を設定
  rect(20, 100, 60, 60); // 桃色で描画

  fill('#AA22FF'); // 6桁の16進数で RGB を設定
  rect(100, 100, 60, 60); // 濃い紫色で描画

  fill('rgb( 250,250,0 )'); // R、G、B の整数値を設定
  rect(180, 100, 60, 60); // 黄色で描画

  fill('rgba( 0,255,220,0.25 )'); // R、G、B、A の整数値を設定
  rect(260, 100, 60, 60); // エメラルド色で描画

  fill('rgb( 100%, 0%, 100% )'); // //パーセント RGB で設定
  rect(20, 180, 60, 60); // 紫色で描画

  fill('rgba( 100%, 100%, 0%, 0.1 )'); // //パーセント RGBA で設定
  rect(100, 180, 60, 60);  // 黄色で描画

  colorMode(RGB);
  fill(color(0, 0, 255)); // p5 Colorオブジェクトで設定
  rect(180, 180, 60, 60);  // 青色で描画
}


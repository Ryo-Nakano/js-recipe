const i_label = document.getElementById('i');
const interval_label = document.getElementById('interval-label');
const colorfulMode_label = document.getElementById('colorfulMode-label');

const restart_button = document.getElementById('restart-button');
const colorfulMode_button = document.getElementById('colorfulMode-button');
const intervalApply_button = document.getElementById('interval-apply-button');

//二次元ベクトルを扱う為の関数
class Vec2 {

  //インスタンス化される時に呼ばれる
  constructor(_x, _y){
    this.x = _x;
    this.y = _y;
  }

  //二次元ベクトル同士の足し算
  add(b){ //足されるベクトルを引数にとる
    let a = this;
    return new Vec2(a.x + b.x, a.y + b.y);
  }

  //二次元ベクトル同士の引き算
  sub(b){ //引かれるベクトルを引数にとる(ABベクトルを求める)
    let a = this;
    return new Vec2(b.x - a.x, b.y - a.y);
  }

  //ベクトルのスカラー倍を計算
  mul(s){
    let v = this;
    return new Vec2(s * v.x, s * v.y);
  }
}

//基準となる3点を定義
let p_a = new Vec2(450, 200); //点A
let p_b = new Vec2(150, 750); //点B
let p_c = new Vec2(900, 750); //点C
let p_r = 5; //基準点の半径

let r = 2; //ドットの半径
let prePos; //前回点を打った座標を保持
let interval = 1; //何フレームごとに点を打っていくか
let count = 0; //いくつの点を打ったか数える

let isColorfulMode = false; //打たれる点をカラフルにするかどうか

restart_button.onclick = function(){
  init();
};

colorfulMode_button.onclick = function(){
  isColorfulMode = !isColorfulMode;
  if(isColorfulMode === true){
    colorfulMode_label.textContent = 'ON';
  }
  else{
    colorfulMode_label.textContent = 'OFF';
  }
};

intervalApply_button.onclick = function(){
  const interval_value = interval_label.value;
  interval = interval_value;
};

interval_label.onkeypress = function(e){
  const key = e.keyCode || e.charCode || 0;
  // 13はEnterキーのキーコード
  if (key !== 13) { return } //入力がエンターキー以外なら処理離脱
  
  const interval_value = interval_label.value;
  interval = interval_value;
};

//初期化時に一度だけ呼ばれる処理
function setup() {
  
  createCanvas(1000, 1000);
  init();
  interval_label.value = 1;
}

//毎フレーム呼ばれる処理
function draw(){
  // console.log('(x, y) = (' + floor(mouseX) + ', ' + floor(mouseY) + ')');
  if(frameCount % interval !== 0){ return }
  main();
}

//初期化時に呼ぶ関数
function init(){

  background(240, 240, 240);
  count = 0;

  //基準となる3点を描画
  noStroke(); //ボーダー無し
  fill('#006ec8');
  ellipse(p_a.x, p_a.y, 2 * p_r);
  ellipse(p_b.x, p_b.y, 2 * p_r);
  ellipse(p_c.x, p_c.y, 2 * p_r);

  //線分AB上にランダムな開始点をとる
  let ab_vec = p_a.sub(p_b);
  prePos = p_a.add(ab_vec.mul(getRandomIntInclusive(1,9) / 10));
  console.log(prePos);
  dot(prePos);

  count++;
  i_label.textContent = count;
}

function main(){

  let newPos; //次に点を打つ場所(Vec2)
  const randomNum = getRandomIntInclusive(1,3);
  if(randomNum === 1){  //→点A
    let direction = prePos.sub(p_a);
    newPos = prePos.add(direction.mul(1/2));
  }
  else if(randomNum === 2){ //点B
    let direction = prePos.sub(p_b);
    newPos = prePos.add(direction.mul(1/2));
  }
  else{ //3のとき → 点C
    let direction = prePos.sub(p_c);
    newPos = prePos.add(direction.mul(1/2));
  }
  
  dot(newPos);
  prePos = newPos;
  count ++;
  i_label.textContent = count;
}



//ドットを打つ関数
function dot(v){ //引数にVec2をとる
  noStroke(); //ボーダー無し
  if(isColorfulMode === true){
    //ランダムな色を生成 → その色で点を打つ
    const n_r = getRandomIntInclusive(0,255);
    const n_g = getRandomIntInclusive(0,255);
    const n_b = getRandomIntInclusive(0,255);
    const color = 'rgb(' + n_r + ',' + n_g + ',' + n_b + ')';
    fill(color);
  }
  else{
    fill(0); //黒
  }
  
  ellipse(v.x, v.y, 2 * r);
}

//min以上max以下の整数をランダムで返す関数
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


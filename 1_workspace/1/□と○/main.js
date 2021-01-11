//各要素を取得
const figure_1 = document.getElementById('figure_1');
const squareButton = document.getElementById('square-button');
const circleButton = document.getElementById('circle-button');

circleButton.onclick = function (){
  // figure に rounded クラスを追加する
  figure_1.classList.add('rounded');
};

squareButton.onclick = function (){
  // figure から rounded クラスを削除する
  figure_1.classList.remove('rounded');
};

// ==================================================

//各要素を取得
const figure_2 = document.getElementById('figure_2');

figure_2.onclick = function (){
    figure_2.classList.toggle('rounded');
    //そのクラス名が要素にあれば削除し、なければ追加
};

// ==================================================

//各要素を取得
const temp = document.getElementById('temp');
const figure_3 = document.getElementById('figure_3');

let count = 0; //押された回数を保持する為の変数
figure_3.onclick = function(){
  count++;
  console.log('count : ' + count);

  if(count % 3 === 1){ //3で割った余りが1のとき
    temp.textContent = '1';
    //丸にする
    figure_3.classList.remove('square');
    figure_3.classList.add('rounded');
  }
  else if(count % 3 === 2){ //3で割った余りが2のとき
    temp.textContent = '2';
    //三角形にする
    figure_3.classList.remove('rounded');
    figure_3.classList.add('triangle');
  }
  else{ //3で割った余りが0のとき
    temp.textContent = '3';
    //四角形にする
    figure_3.classList.remove('triangle');
    figure_3.classList.add('square');
  }
}
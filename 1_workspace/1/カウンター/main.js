const display = document.getElementById("display");
const plusButton = document.getElementById("plus-button");
const multipleButton = document.getElementById("multiple-button");
const minusButton = document.getElementById("minus-button");

let num = 0;

// ボタン要素のonclickハンドラに関数を代入する
plusButton.onclick = function(){
  num += 1;
  display.textContent = num;
  //↑これをやらなくていいからVueは楽なワケだねえ...
}

multipleButton.onclick = function(){
  num *= 2;
  display.textContent = num;
}

minusButton.onclick = function(){
  num -= 1;
  display.textContent = num;
}

// ===================================================

const display_result = document.getElementById("display_result");
const button_1 = document.getElementById("button_1");
const button_2 = document.getElementById("button_2");
const button_plus = document.getElementById("button_plus");
const button_multiple = document.getElementById("button_multiple");
const button_equal = document.getElementById("button_equal");
const button_clear = document.getElementById("button_clear");


let calc_show = '';

//数字ボタン
button_1.onclick = function(){
  calc_show += '1';
  updateDisplay();
}
button_2.onclick = function(){
  calc_show += '2';
  updateDisplay();
}

//演算子ボタン
button_plus.onclick = function(){
  calc_show = modifyLastCharacter(calc_show);
  calc_show += '+';
  updateDisplay();
}
button_multiple.onclick = function(){
  calc_show = modifyLastCharacter(calc_show);
  calc_show += '*';
  updateDisplay();
}

//計算ボタン
button_equal.onclick = function(){
  calc_show = modifyLastCharacter(calc_show);
  const calc = new Function(
    'return ' + calc_show
  );
  calc_show = calc();
  updateDisplay();
}

//クリアボタン
button_clear.onclick = function(){
  calc_show = '';
  display_result.textContent = 0;
}

function updateDisplay(){
  display_result.textContent = calc_show;
}

//計算式末尾の文字を確認 → 演算子だった場合削除
function modifyLastCharacter(formula){ //引数に計算式をとる

  for(let i = 0; i < formula.length; i++){ //計算式の文字数だけfor回す
    let lastChara = formula.slice(-1); //末尾の1文字を取得
    if(lastChara !== '+' && lastChara !== '-' && lastChara !== '*' && lastChara !== '/'){ //末尾が演算子だった場合
      break;
    }

    formula = formula.slice( 0, -1 ); //末尾の1文字を削除
  }
  
  return formula;
}

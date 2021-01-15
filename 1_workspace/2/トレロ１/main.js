//各要素をIDで取得
const inputElement = document.getElementById("input-todo") //todo入力欄
const container = document.getElementById("cards-container") //カード
const addButton = document.getElementById("add-button") //追加ボタン

// 追加ボタンを押した時に呼ばれる処理
addButton.onclick = function(){
  
  //カードを作成する
  const card = creatCard(inputElement.value) 

  // card を container の中に追加する
  container.append(card) //DOMツリー上にあるcontainerに対してappend → 画面に表示！

  // 入力欄を空にする
  inputElement.value = ''
}

//カードを作成する関数
function creatCard(text){ //引数に入力された値を取る
  
  // card を作成
  const card = document.createElement("div") //div要素作る
  card.className = "card" //クラス名を"card"に

  // todo を作成
  const todo = document.createElement("div") //div要素作成
  todo.className = "todo" //クラス名を"todo"に
  todo.textContent = text //表示内容を変数textの内容に一致

  // todo を card の中に追加する
  card.append(todo) //todoをcard要素の子にするイメージ

  // 削除ボタン を作成
  const deleteButton = document.createElement("div")
  deleteButton.className = "delete"

  // 削除ボタン を押したときの処理を登録
  deleteButton.onclick = function(){
    // カードを削除する
    card.remove()
  }

  // 削除ボタン を card の中に追加する
  card.append(deleteButton)

  return card //作成したcardを返す
}




  
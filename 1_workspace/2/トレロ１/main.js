//各要素をIDで取得
const mainContainer = document.getElementsByClassName('main-container')[0] //main-container
const inputElement = document.getElementById('input-todo') //todo入力欄
const addListButton = document.getElementById('add-list-button')

//こんな感じでデータを持てばいけるか...？
//配列の順番とlist-containerの順番が対応
let listDatas = [
  {
    title : 'list_1',
    todos : ['hoge_1', 'mage_1']
  },
  {
    title : 'list_uho',
    todos : ['hoge_2', 'mage_2', 'guhe_2', 'uho_2', 'fuga_2']
  },
  {
    title : 'list_2',
    todos : ['hoge_2', 'mage_2']
  },
]

//一旦↑のデータを出力してみよう。

for(let i = 0; i < listDatas.length; i++){ //listDatasの要素数分for回す
  const listContainer = creat_listContainer() //list-containerを作成
  const listHeader = listContainer.getElementsByClassName('list-header')[0]
  const cardsContainer = listContainer.getElementsByClassName('cards-container')[0]

  const listData = listDatas[i]
  const title = listData.title
  const todos = listData.todos

  listHeader.textContent = title

  for(let j = 0; j < todos.length; j++){ //対象データの数だけfor回す
    //1個分のデータ取り出し
    const todo = todos[j]

    //カードを作る
    const card = creatCard(todo)

    //cards-containerにcard要素を追加
    cardsContainer.append(card)
  }

  //DOMに追加→表示
  mainContainer.append(listContainer)
}

addButton_registerEvent()

addListButton.onclick = function(){
  //View
  let listContainer = creat_listContainer()
  mainContainer.append(listContainer)
  addButton_registerEvent()

  //データ(めちゃくちゃ汚いやり方だけど許して...)
  const title = listContainer.getElementsByClassName('list-header').textContent

  const obj = {
    title : title,
    todos : []
  }

  listDatas.push(obj)
  console.log(listDatas[listDatas.length - 1])
}



 //==========================================================




function addButton_registerEvent(){

  // === 追加ボタンが押された時の処理を登録 ===
  const addButtons = document.getElementsByClassName('input-button') //追加ボタン
  for(let i = 0; i < addButtons.length; i++){
    const addButton = addButtons[i]
    addButton.onclick = function(){
      
      // === View ===
      //対象となるlist-containerを取得
      const listContainer = document.getElementsByClassName('list-container')[i]
  
      //cards-containerを取得
      const cardsContainer = listContainer.getElementsByClassName('cards-container')[0]
      
  
      //ユーザーの入力情報を取得
      const inputTodo = listContainer.getElementsByClassName('input-todo')[0]
      const userInput = inputTodo.value
  
      //入力欄に何も入力されていないとき → 処理離脱
      if(userInput === ''){ return }
  
      //カードを作成する
      const card = creatCard(userInput) 
  
      // card を container の中に追加する
      cardsContainer.append(card) //DOMツリーに追加
  
      // 入力欄を空にする
      inputTodo.value = ''

      // === データ ===
      console.log('before : ' + listDatas[i].todos)
      listDatas[i].todos.push(userInput)
      console.log('after : ' + listDatas[i].todos)
    }
  }

  // === フォーム入力中にEnterキーが押された時の処理を登録 ===
  const inputTodos = document.getElementsByClassName('input-todo')
  for(let i = 0; i < inputTodos.length; i++){
    let inputTodo = inputTodos[i]
    inputTodo.addEventListener('keypress', function(e){

      //Enterキーが押された時の処理
      if (e.keyCode === 13) {

        //ユーザーの入力情報を取得
        const userInput = inputTodo.value

        //入力欄に何も入力されていないとき → 処理離脱
        if(userInput === ''){ return }

        //カードを作成する
        const card = creatCard(userInput) 

        // card を container の中に追加する
        const cardsContainer = document.getElementsByClassName('cards-container')[i] //対象となるcards-containerを取得
        cardsContainer.append(card) //DOMツリーに追加

        // 入力欄を空にする
        inputTodo.value = ''

        // === データ ===
        console.log('before : ' + listDatas[i].todos)
        listDatas[i].todos.push(userInput)
        console.log('after : ' + listDatas[i].todos)
      }
    });
  }
}

//カードを作成する関数
function creatCard(text){ //引数に入力された値を取る
  
  // card を作成
  const card = document.createElement('div') //div要素作る
  card.className = 'card' //クラス名を"card"に

  // todo を作成
  const todo = document.createElement('div') //div要素作成
  todo.className = 'todo' //クラス名を"todo"に
  todo.textContent = text //表示内容を変数textの内容に一致

  // todo を card の中に追加する
  card.append(todo) //todoをcard要素の子にするイメージ

  // 削除ボタン を作成
  const deleteButton = document.createElement('div')
  deleteButton.className = 'delete'

  // 削除ボタン を押したときの処理を登録
  deleteButton.onclick = function(e){
    
  //card-containerの中でどのカードが削除されたのか取得(index_card)
  const deletedCard = e.path[1]
  const thisCardsContainer = e.path[2]
  let cards = thisCardsContainer.getElementsByClassName('card')
  cards = [].slice.call(cards); //HTMLCollectionから配列を作成
  var index_todo = cards.indexOf(deletedCard); //要素の順番を取得

  //どのlist-containerに含まれるtodoが削除されたのか取得(index_list)
  const thisListContainer = e.path[3]
  let listContainers = document.getElementsByClassName('list-container')
  listContainers = [].slice.call(listContainers); //HTMLCollectionから配列を作成
  var index_list = listContainers.indexOf(thisListContainer); //要素の順番を取得

  //listDatasから該当するデータを削除
  console.log(`before : ` + listDatas[index_list].todos)
  listDatas[index_list].todos.splice(index_todo, 1)
  console.log(`after : ` + listDatas[index_list].todos)

  // カードを削除する(view)
  card.remove()
  }

  // 削除ボタン を card の中に追加する
  card.append(deleteButton)

  return card //作成したcardを返す
}

// cards-containerを作る関数
function creat_cardsContainer(){
  const cardsContainer = document.createElement('div') //div要素作る
  cardsContainer.className = 'cards-container' //クラス名を"cards-container"に

  return cardsContainer
}

// list-headerを作る関数
function creat_listHeader(title){
  const listHeader = document.createElement('div') //div要素作る
  listHeader.className = 'list-header' //クラス名を"list-header"に
  listHeader.textContent = title

  return listHeader
}

// list-footerを作る関数
function creat_listFooter(){
  const listFooter = document.createElement('div') 
  listFooter.className = 'list-footer'

  const inputContainer = document.createElement('div') 
  inputContainer.className = 'input-container' 

  const inputTodo = document.createElement('input')
  inputTodo.className = 'input-todo'
  inputContainer.append(inputTodo)

  const inputButton = document.createElement('div')
  inputButton.className = 'input-button'
  inputButton.textContent = '追加'
  inputButton.nodeType = 'text'
  inputContainer.append(inputButton)

  listFooter.append(inputContainer)

  return listFooter
}

// list-containerを作る関数
function creat_listContainer(){

  //現在のlist-containerの数を取得
  const listContainerNum = document.getElementsByClassName('list-container').length

  //list-containerを作成
  const listContainer = document.createElement('div') //div要素作る
  listContainer.className = 'list-container' //クラス名を"cards-container"に

  //list-headerを作成 → list-containerに格納
  const listTitle = 'List_' + (listContainerNum + 1)
  const listHeader = creat_listHeader(listTitle)
  listContainer.append(listHeader)

  //cards-containerを作成 → list-containerに格納
  const cardsContainer = creat_cardsContainer()
  listContainer.append(cardsContainer)

  //input-containerを作成 → list-containerに格納
  const listFooter = creat_listFooter()
  listContainer.append(listFooter)

  return listContainer
}


  
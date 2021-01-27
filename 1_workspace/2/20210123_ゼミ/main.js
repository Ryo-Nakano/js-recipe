const add_button = document.getElementById('add-button')
const input_label = document.getElementById('input-label')
const memoList = document.getElementById('memo-list')



let memos = [] //入力内容を配列で保持しておく為の変数
memos = async('memos')
refresh(memos)

add_button.onclick = function(){
  //inputの文字列を取得
  const input_value = input_label.value

  //inputに文字が入力されているかチェック→空白なら処理離脱
  if(input_value === ''){ 
    alert('何も入力されていません！')
    return 
  }

  //配列memoに追加
  memos.push(input_value)
  let memos_json = JSON.stringify(memos)
  localStorage.setItem('memos', memos_json);

  //inputを削除
  input_label.value = ''

  //表示をリフレッシュ
  refresh(memos)

}

//memoの表示をリフレッシュする関数
function refresh(memos){

  //既存のmemoを全て削除
  while (memoList.firstChild) {
    memoList.removeChild(memoList.firstChild);
  }

  //最新の状態に更新
  for(let i = 0; i < memos.length; i++){
    let list = document.createElement('li')
    list.textContent = memos[i]
    memoList.append(list)
  }
}

//localStorageと配列を同期
function async(key){
  let data = localStorage.getItem(key)
  return JSON.parse(data)
}


input_label.addEventListener('keypress', function(e){
  //Enterキーが押された時の処理
  if (e.keyCode === 13) {
    //inputの文字列を取得
    const input_value = input_label.value

    //inputに文字が入力されているかチェック→空白なら処理離脱
    if(input_value === ''){ 
      alert('何も入力されていません！')
      return 
    }

    //配列memoに追加
    memos.push(input_value)

    //inputを削除
    input_label.value = ''

    //表示をリフレッシュ
    refresh(memos)
  }
})
//各要素を取得
const imageElement = document.getElementById('dog-image')
const reload_button = document.getElementById('reload')

//犬の画像を取得 → 表示する関数
function fetchDogImg(){
  // 指定したサーバーにデータを取りに行く
  fetch('https://dog.ceo/api/breeds/image/random')
  .then((res) => {

    // let j = JSON.parse(res) //こっちじゃ無理！ (Promiseを受け取れない)
    let j = res.json() 

    /**【memo】
     * .json()メソッドはPromiseを受け取り
     * → その結果をパースしてjsonにして返す、みたいなことをしているぽい？
     * (公式ドキュメント_Body.json()：https://mzl.la/365Hb7F)
     * 
     * だから、JSON.parse()じゃ無理。
     * 引数として受け取る値がtextだから
     * fetch()が返してくるPromiseを受け取れない
     * (公式ドキュメント_JSON.parse()：https://mzl.la/2LxwsvG)
     * (公式ドキュメント_fetch()：https://mzl.la/35O4hQ2)
     */
    
    return j
  })
  .then((data) => {
    // console.log('data : ')
    // console.log(data)
    imageElement.src = data.message // 画像を表示する
  })
}

reload_button.onclick = function(){
  fetchDogImg()
}



// === === === === === === === === === === === ===
// 以下、TheCatAPI
// === === === === === === === === === === === ===

const catSelect_buttons = document.getElementsByClassName('cat-select')
const catImg = document.getElementById('cat-image')
const nope_button = document.getElementById('nope')

nope_button.onclick = function(){
  fetchBreeds()
}

//breed_idsの値に応じた猫の画像を取得する関数
function fetchCatImg(id){
  const endpoint = 'https://api.thecatapi.com/v1/images/search?breed_ids=' + id
  fetch(endpoint)
    .then((res) => {
      return res.json()
    })
    .then((data) => {
      let imgUrl = data[0].url
      catImg.src = imgUrl
    })
}

//猫の種類を取得
function fetchBreeds(){
  const endpoint = 'https://api.thecatapi.com/v1/breeds'
  
  fetch(endpoint)
    .then((res) => {
      let j = res.json() 
      return j
    })
    .then((data) => {

      // console.log(data)

      let breeds = []
      for(let i = 0; i < data.length; i++){
        const id = data[i].id
        const name = data[i].name
        const imgUrl = data[0].image.url
        
        const obj = {
          id : id,
          name : name,
          imgUrl : imgUrl
        }

        breeds.push(obj)
      }
      
      //ランダムに3つ選出
      let selectedBreeds = []
      for(let i = 0; i < 3; i++){ //3回for回す
        let randomNum = getRandomNum(0, breeds.length)

        //配列から取り出し
        selectedBreeds.push(breeds[randomNum])

        //配列から削除
        breeds.splice(randomNum, 1)
      }

      // console.log(selectedBreeds)

      //選んだやつをViewに適応
      for(let i = 0; i < catSelect_buttons.length; i++){
        let catSelect_button = catSelect_buttons[i]
        let selectedBreed = selectedBreeds[i]

        catSelect_button.textContent = selectedBreed.name
        catSelect_button.onclick = function(){
          console.log(selectedBreed.name + 'was selected !!')
          // catImg.src = selectedBreed.imgUrl
          /**
           * memo
           * ↑ここで直接画像のURLをソースとしてブチ込むの、なんで動かんのだろ。
           */
          let id = selectedBreed.id
          fetchCatImg(id)
        }
      }
    })
}

//min以上~max未満の範囲の乱数返す関数
function getRandomNum( min, max ) {
  var randomNum = Math.floor( Math.random() * (max - min) ) + min;

  return randomNum;
}


fetchBreeds()

// === === === === === === === === === === === ===
// 以下、短縮水産🐟_Web
// === === === === === === === === === === === ===

//各要素の取得
const inputArea = document.getElementById('input-url')
const outputArea = document.getElementById('output-url')
const go_button = document.getElementById('go-button')

//BitlyAPIを用いて短縮URLを作成 → 表示する関数
function createBitlyUrl(inputUrl){
  const OAUTH_TOKEN = '9a85ca17bba6c9c0ed35a65ee566169a71239049'
  const endpoint = 'https://api-ssl.bitly.com/v4';
  const requestUrl = endpoint + '/shorten';

  const headers = {
    'Authorization' : 'Bearer ' + OAUTH_TOKEN,
    'Content-Type': 'application/json',
  }

  const body = {
    'long_url' : inputUrl
  }

  fetch(requestUrl, {
    method : 'POST',
    headers : headers,
    body : JSON.stringify(body)
  })
    .then((res) => {
      return res.json()
    })
    .then((data) => {
      console.log(data.link)
      const shortUrl = data.link
      if (typeof shortUrl  == 'undefined'){
        alert('短縮できませんでした...🐟')
        return
      }
      outputArea.value = shortUrl
    })
}

//Goボタンが押された時に呼ばれる処理
go_button.onclick = function(){
  const inputUrl = inputArea.value

  //入力された文字列がURLでなければ処理離脱
  if(inputUrl.indexOf("http") == -1){
    alert('URLを入力してください...！🙏')
    return
  }

  console.log(inputUrl)
  createBitlyUrl(inputUrl)
}

inputArea.addEventListener('keypress', function(e){
  //Enterキーが押された時の処理
  if (e.keyCode === 13) {
    const inputUrl = inputArea.value

    //入力された文字列がURLでなければ処理離脱
    if(inputUrl.indexOf("http") == -1){
      alert('URLを入力してください...！🙏')
      return
    }

    console.log(inputUrl)
      createBitlyUrl(inputUrl)
    }
})

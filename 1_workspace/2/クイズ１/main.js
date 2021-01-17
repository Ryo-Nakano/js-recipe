
let quizDatas = [
  {
    question : 'hogehogehogehoge is hogehoge ?',
    choices : ['hoge', 'mage', 'huga'],
    answer : 'hoge',
    isCleard : false
  },
  {
    question : 'magemagemage is magemage ?',
    choices : ['hoge', 'mage', 'huga'],
    answer : 'mage',
    isCleard : false
  },
  {
    question : 'hugahugahuga is hugahuga ?',
    choices : ['hoge', 'mage', 'huga'],
    answer : 'huga',
    isCleard : false
  },
]

let count = 0 //何問目のクイズを表示しているか

//各要素を取得
const choices_button = document.getElementsByClassName('choice')
const quizText = document.getElementById('quiz-text')
const quizImage = document.getElementById('quiz-image')
const nextQuiz_button = document.getElementById('next-quiz')

//クイズを表示する関数
function displayQuestion(quizData){ //quizDataを引数にとる
  //データ整理
  let question = quizData.question
  let choices = quizData.choices
  let answer = quizData.answer

  //表示
  quizText.textContent = question
  for(let i = 0; i < choices.length; i++){
    let choice = choices[i]
    let choice_button = choices_button[i]

    choice_button.textContent = choice
    choice_button.onclick = function(){
      if(choice === answer){
        quizDatas[count].isCleard = true
        alert('正解！👏 \n \n → [次の問題へ]を押そう！')
      }
      else{
        alert('不正解です...！🙏')
      }
      choice_button.disabled = 'disabled' //ボタンを無効化
    }
  }
}

nextQuiz_button.onclick = function(){
  
  //クイズに正解しているかどうか確認
  let isCleard = quizDatas[count].isCleard
  if(!isCleard){ //まだクリアしてないとき
    alert('まだクイズに正解していませんよ！！！🏃‍♂️')
    return
  }

  //問題に残りがあるかどうか確認
  let length = quizDatas.length
  if(count + 1 >= length){
    alert('もう問題が無いよ...🙏')
    return
  }

  //表示する問題番号に+1
  count ++

  quiz()
}

//クイズ全体の管理
function quiz(){
  let quizData = quizDatas[count]
  displayQuestion(quizData)

  //解答ボタンを全て有効化
  for(let i = 0; i < choices_button.length; i++){
    choices_button[i].disabled = '' //ボタンを有効化
  }
}


quiz() //クイズを実行




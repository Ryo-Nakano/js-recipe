const input_label = document.getElementById('input')
const input_button = document.getElementById('input-button')
const totalAmount_label = document.getElementById('total-amount')
const done_label = document.getElementById('done')
const area = document.getElementById('area')

const tea_button = document.getElementById('tea-button')
const ichigo_button = document.getElementById('ichigo-button')

let totalAmount = 0;
input_button.onclick = function(){
  totalAmount += Number(input_label.value)
  totalAmount_label.textContent = totalAmount
}

tea_button.onclick = function(){
  if(totalAmount < 500){ return }
  totalAmount -= 500
  totalAmount_label.textContent = totalAmount
  const t = document.createElement('h1')
  t.textContent = '購入したああ！！'
  area.append(t)
}



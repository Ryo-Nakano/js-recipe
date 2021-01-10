// console.log("OK!");

// FizzBuzz(30);
// FineMan(40);

countUp_EverySecond(10);


function fizzBuzz(num){
  for(let i = 1; i <= num; i++){ //numの数だけfor回す
    let output = '';

    if(i % 3 === 0) //3で割り切れるとき
    {
      output += 'Fizz';
    }

    if(i % 5 === 0){ //5で割り切れるとき
      output += 'Buzz';
    }

    if(output === ''){ //outputがカラだった時
      output = i;
    }

    console.log(output); //コンソールに出力
  }
}

//3がつくと元気になる関数
function fineMan(num){
  for(let i = 1; i <= num; i++){ //numの数だけfor回す
    let output = i.toString(10);

    if(i % 3 === 0 || output.includes('3')) //3で割り切れるとき or "3"を含んでいたとき
    {
      output += '!!!';
    }

    console.log(output); //コンソールに出力
  }
}

//毎秒数えつつ3の倍数で元気になる関数
function countUp_EverySecond(num){
  let count = 0;
  setInterval(function(){
    count++;
    if(count > num){ return; }

    let output = count;
    if(count % 3 === 0){
      output += '!!!';
    }

    console.log(output);
  }, 1000);
}
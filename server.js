const RandomOrg = require('random-org');
var data, sum = 0;
var random = new RandomOrg({ apiKey: 'e472d7f4-4089-4b37-89d6-4eec69dbca12' });
var cal = 1-(0.5/2), Z = 0.67448975, sumaFr = 0, raz = Math.sqrt(12*10000)
const K = 1.33*Math.log(10000), Kre = Math.round(K)+1, amplitud = Math.round(100/Kre)
//752220f3-fd99-4ee4-97a3-b4c782fff258
//a2fe8d15-b03b-43f1-95b9-b93473946204
//a8704459-b62a-419e-8607-063ccb7bb5c0
//e472d7f4-4089-4b37-89d6-4eec69dbca12


const fo = (LS,LI) => {
  var cont = 0
  console.log(data.length)
  for(var i = 0; i < data.length; i++){
    if(data[i] >= LI && data[i] < LS){
      cont += 1
    }
  }
  return cont
}

const frecuen = (data) => {
  var i = 1
  var lI = 0, lS = amplitud
  var message = `Li          Ls            Fe            Fo\n`
  while (i != Kre+1) {
    lI = i>1 ? lS : 0
    lS = i==13 ? (100/Kre)*i : amplitud*i



    message += `${lI}     ${lS}      ${(10000/Kre)}      ${fo(lS,lI)}\n`
    i++
  }
  return message
}
data = random.generateIntegers({ min: 0, max: 100, n: 10000 })
  .then(function (result) {
    data = result.random.data
    for (var i = 0; i < data.length; i++) {
      sum += data[i]
      // console.log(data[i])
    }
    console.log(frecuen(data))
    console.log("K aprox: ", Kre)
    console.log("Amplitud: ", amplitud)
    console.log("El promedio es ", sum / data.length, "\n1-(a/2) ", cal, "\nZ ", Z)
  });
const RandomOrg = require('random-org');
var data, sum = 0
var random = new RandomOrg({ apiKey: 'eceb1b4b-0d71-4597-acd9-47a9f89a44bb' });
var Z = 0.67448975, sumaFr = 0, raz = Math.sqrt(10000)
const K = 1.33 * Math.log(10000), Kre = Math.round(K) + 1, amplitud = Math.round(100 / Kre)
//752220f3-fd99-4ee4-97a3-b4c782fff258
//a2fe8d15-b03b-43f1-95b9-b93473946204
//a8704459-b62a-419e-8607-063ccb7bb5c0
//e472d7f4-4089-4b37-89d6-4eec69dbca12


const fo = (LS, LI) => {
  var cont = 0
  for (var i = 0; i < data.length; i++) {         
    if (data[i] >= LI && data[i] < LS) {
      cont += 1
    }
  }
  return cont
}

const frecuen = () => {
  var i = 1
  var lI = 0, lS = amplitud, fE
  var message = `Li       Ls            Fe            Fo      err\n`
  while (i != Kre + 1) {
    lI = i > 1 ? lS : 0
    lS = i == 13 ? (100 / Kre) * i : amplitud * i
    fE = (10000 / Kre).toFixed(4)
    error = Math.pow(((fE-fo(lS, lI))/fE),2)
    

    message += `${lI}     ${lS}      ${fE}      ${fo(lS, lI)}     ${error}\n`
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
    var prom = sum / data.length
    var cal = (0.5-prom)*(Math.sqrt(10000)/Math.sqrt(1/12))
    console.log(frecuen())
    console.log("K aprox: ", Kre)
    console.log("Amplitud: ", amplitud)
    console.log("El promedio es ", prom, "\nLamnda ", cal, "\nZ ", Z)
  }).catch((error)=>{
    console.error("Error, cambiar la apiKey -->", error.message)
  })


const RandomOrg = require('random-org');
var data, sum = 0
var random = new RandomOrg({ apiKey: '0e1fa5c6-89de-4ad7-a85a-c59e90915920' });
var distriNormalInv = 0.509972518, mErr = 0.05
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
  var table = `Li       Ls            Fe            Fo      err\n`
  while (i != Kre + 1) {
    lI = i > 1 ? lS : 0
    lS = i == 13 ? (100 / Kre) * i : amplitud * i
    fE = (10000 / Kre).toFixed(4)
    var error = Math.pow(((fE-fo(lS, lI))/fE),2)
    
    table += `${lI}     ${lS}      ${fE}      ${fo(lS, lI)}     ${error.toFixed(6)}\n`
    i++
  }
  return table
}

data = random.generateIntegers({ min: 0, max: 100, n: 10000 })
  .then(function (result) {
    data = result.random.data
    for (var i = 0; i < data.length; i++) {
      sum += data[i]
    }
    var prom = sum / data.length
    var cal = (0.5-prom)*(Math.sqrt(10000)/Math.sqrt(1/12))
    var z = (Math.abs(distriNormalInv) <= cal) ? "Aceptada": "Rechazada"
    console.log(frecuen())
    console.log("K aprox: ", Kre, "\nAmplitud: ", amplitud, "\nPromedio: ", prom, "\nLambda: ", cal, "\nmanejo error(%): 5% -> ", mErr,"\nZ: ", z)
  }).catch((error)=>{
    console.error("Cambiar la apiKey -->", error.message)
  })


const puppeteer = require('puppeteer')

const getData = async () => {
  // 1 - Créer une instance de navigateur
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()

  // 2 - Naviguer jusqu'à l'URL cible
  await page.goto('https://www.google.com/search?q=fitness+park+nanterre')
 
  // 3 - Récupérer les données
  const result = await page.evaluate(() => {
    let title = document.querySelector('#rhs > div > div.kp-blk.knowledge-panel.Wnoohf.OJXvsb > div > div.ifM9O > div > div.kp-header > div:nth-child(2) > div.fYOrjf.kp-hc > div.NFQFxe.Hhmu2e.viOShc.LKPcQc.mod > div > div > div.kno-ecr-pt.PZPZlf.gsmt.i8lZMc.EaHP9c > span').innerText
    return { title }
  })

  // 4 - Retourner les données (et fermer le navigateur)
  browser.close()
  return result
}

// Appelle la fonction getData() et affichage les données retournées
getData().then(value => {
  console.log(value)
})
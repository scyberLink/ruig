const fs = require('fs')

const sw = require.resolve('ruig/sw')
const content = fs.readFileSync(sw)

fs.writeFileSync('./public/sw.js', content)

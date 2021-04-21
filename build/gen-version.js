const fs = require('fs')
const path = require('path')
const tagVer = process.env.TAG_VERSION
let version
if (tagVer) {
  version = tagVer.startsWith('v') ? tagVer.slice(1) : tagVer
} else {
  version = require('../package.json').version
}
console.log(version)

fs.writeFileSync(
  path.resolve(__dirname, '../packages/version.ts'),
  `export const version = '${version}'
`
)

  const packagesGenerator = require('./plop-templates/packages/prompt')

module.exports = function(plop) {

   plop.setGenerator('packages', packagesGenerator)

}

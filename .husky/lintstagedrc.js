module.exports = {
  '*.{js,jsx,ts,tsx}': ['prettier --write'],
  // '*.{js,jsx,ts,tsx}': ['eslint --fix', 'prettier --write'],
  '{!(package)*.json,*.code-snippets,.!(browserslist)*rc}': ['prettier --write--parser json'],
  'package.json': ['prettier --write'],
  '*.vue': ['prettier --write'],
  '*.{scss,less,styl,html}': ['prettier --write'],
  '*.m s  d': ['prettier --write'],
}

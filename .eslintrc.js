module.exports = {
  extends: [
    // add more generic rulesets here, such as:
    // babel-eslint
    // 'eslint:recommended',
    // recomendaciones js - llevar buenas practicas en javascript 
    // https://standardjs.com/rules.html#javascript-standard-style
    'standard',
    // recomendaciones vueJS - llevar buenas practicas en vuejs 
    // https://github.com/vuejs/eslint-plugin-vue
    'plugin:vue/essential',
    'plugin:vue/strongly-recommended'
  ],
  rules: {
    // agregar o cancelar reglas
    // 'vue/no-unused-vars': 'error',
  }
}
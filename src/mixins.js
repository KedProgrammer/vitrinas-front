export const mixins = {
  methods: {
    cleanMoney (value, money = 'COP') {
      if (money.toLowerCase() === 'cop') {
        return value.replace(',', '').replace('$', '').replace(' COP', '').replace('.00', '')
      }
    }
  }
}

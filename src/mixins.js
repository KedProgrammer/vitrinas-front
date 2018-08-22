export const mixins = {
  methods: {
    cleanMoney (value, instance) {
      if (instance.toLowerCase() === 'pen'){
        return parseFloat(value.replace('.', "").replace(/[^\d\.\-]/g, ""))
      }
      return parseFloat(value.replace(/[^\d\.\-]/g, ""))
    }
  }
}

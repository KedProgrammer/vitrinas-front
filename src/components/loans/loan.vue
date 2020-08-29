<template>
  <div @click="$router.push({name: 'loan-show', params: {id: id}})" class="loans_item">
    <img src="../../assets/images/loans/green.png" class="green">
    <div class="loans_item-price">
      {{ amount }}
    </div>
    <div class="loans_item-rate">
      <span>Tasa de interes</span>
      <span>{{ interestRate }}%</span>
    </div>
    <div class="loans_item-grey-text">
      <span>Valor cuota</span>
      <span>{{ feeValue }}</span>
    </div>
    <div class="loans_item-grey-text" id="period">
      <span>Periodicidad</span>
      <span>{{ periodType }}</span>
    </div>
    <div class="loans_item-grey-text">
      <span>Total abonado</span>
      <span>{{ capitalTotal }}</span>
    </div>
    <img src="../../assets/images/vitrinas-icons/photo.png" class="loans_item-info-photo">
    <div class="loans_item-employer-info">
      <span>{{ name }}</span>
        <span>C.C {{ identification }}</span>
        <span><img src="../../assets/images/vitrinas-icons/celu.png" class="employers_index-item-celu">{{ cellphone }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      default: 0,
      type: Number
    },
    interestRate: {
      default: 0,
      type: Number
    },
    feeValue: {
      default: "",
      type: String
    },
    amount: {
      default: "",
      type: String
    },
    remainingPayment: {
      default: "",
      type: String
    },
    periodType: {
      default: "",
      type: String
    },
    name: {
      default: "",
      type: String
    },
    lastName: {
      default: "",
      type: String
    },
    identification: {
      default: "",
      type: String
    },
    cellphone: {
      default: "",
      type: String
    },
    capitalTotal: {
      default: "",
      type: String
    }
  }
}
</script>
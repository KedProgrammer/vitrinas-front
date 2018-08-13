<template>
  <main class="admin-team__main">

    <Menu />

    <article class="admin-team__tabla">
      <vue-good-table
        :columns="columns"
        :rows="rows"
        :sort-options="{
          enabled: true,
          initialSortBy: {field: 'name', type: 'asc'}
        }"
        :pagination-options="{
          enabled: true,
          perPage: 8,
          nextLabel: '',
          prevLabel: '',
          rowsPerPageLabel: '# de filas por página',
          ofLabel: 'al',
          allLabel: 'Todo'
        }"
        style-class="ceu-table"
        @on-cell-click="cellClick">
        <div
          class="ceu-table__actions"
          slot="table-actions">
          <div
            @click="toggleAdd"
            class="ceu-table__add">
            Agregar
          </div>
        </div>
      </vue-good-table>
    </article>
    <!-- modal -->
    <Cupons
      @new-coupon="pushCoupon($event)"
      @toggle-add="toggleAdd"
      :show-modal="showAdd" />
  </main>
</template>

<script>
import { mapState, mapActions } from 'vuex'
// https://xaksis.github.io/vue-good-table/guide/#installation
import { VueGoodTable } from 'vue-good-table'
import 'vue-good-table/dist/vue-good-table.css'
import Cupons from '../components/cupons/createCupon.vue'

// custom components
import Menu from '../components/layout/Menu'
import configService from '../settings/api-url'

export default {
  name: 'Team',
  components: {
    Menu,
    VueGoodTable,
    Cupons
  },
  computed: {
    ...mapState(['university', 'commerces', 'commerce'])
  },
  watch: {
    university () {
      this.updateTable()
    }
  },
  mounted () {
    this.$nextTick(function () {
      this.updateTable()
    })
  },
  data () {
    return {
      columns: [
        {
          label: 'Código',
          field: 'name'
        },
        {
          label: 'Fecha inicio',
          field: 'start',
          html: true,
          sortable: false
        },
        {
          label: 'Fecha final',
          field: 'end'
        },
        {
          label: 'Grupo',
          field: 'group',
          html: true,
          sortable: false
        },
        {
          label: 'Valor',
          field: 'value',
          html: true,
          sortable: false
        },
        {
          label: 'Cantidad de usos',
          field: 'amountUses',
          html: true,
          sortable: false
        },
        {
          label: 'Tipo',
          field: 'type',
          html: true,
          sortable: false
        }
      ],
      rows: [],
      idRestaurant: 0,
      showAdd: false,
      showEdit: false,
      markers: [],
      places: [],
      currentPlace: null
    }
  },
  methods: {
    ...mapActions(['updateCommercesAsync']),
    pushCoupon (coupon) {
      const start = new Date(coupon.start_date)
      const end = new Date(coupon.end_date)
      this.rows.push({
        id: coupon.id,
        name: coupon.code,
        start: `${start.getFullYear()}-${start.getMonth() + 1}-${start.getDate()}`,
        end: `${end.getFullYear()}-${end.getMonth() + 1}-${end.getDate()}`,
        group: coupon.group.name,
        value: coupon.discount,
        amountUses: coupon.amount_of_uses,
        type: coupon.coupon_type
      })
    },
    updateTable () {
      this.rows = []
      configService(`/central_admin/universities/${this.university.id}/coupons`)
        .then(res => {
          console.log(res.data)
          const data = res.data
          for (let index = 0; index < data.length; index++) {
            const dataPosition = data[index]
            const start = new Date(dataPosition.start_date)
            const end = new Date(dataPosition.end_date)
            this.rows.push({
              id: dataPosition.id,
              name: dataPosition.code,
              start: `${start.getFullYear()}-${start.getMonth() + 1}-${start.getDate()}`,
              end: `${end.getFullYear()}-${end.getMonth() + 1}-${end.getDate()}`,
              group: dataPosition.group.name,
              value: dataPosition.discount,
              amountUses: dataPosition.amount_of_uses,
              type: dataPosition.coupon_type
            })
          }
        })
    },
    toggleAdd () {
      this.showAdd = !this.showAdd
      console.log(this.showAdd)
    }
  }
}
</script>

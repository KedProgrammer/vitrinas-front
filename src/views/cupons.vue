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
        :search-options="{
          enabled: true,
          placeholder: 'Buscar domiciliario'
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
          label: 'Nombre',
          field: 'name'
        },
        {
          label: 'Topes',
          field: 'limit',
          html: true,
          sortable: false
        },
        {
          label: 'Correo',
          field: 'email'
        },
        {
          label: 'Turno',
          field: 'turn',
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
    updateTable () {
      this.rows = []
      configService(`/central_admin/universities/${this.university.id}/delivery_men`)
        .then(res => {
          const data = res.data
          for (let index = 0; index < data.length; index++) {
            const dataPosition = data[index]
            this.rows.push({
              id: dataPosition.id,
              name: `${dataPosition.first_name} ${dataPosition.last_name}`,
              limit: `<div class="admin-tabla__topes">
                        <p class="admin-tabla__tope-num">${dataPosition.queued_orders}/${dataPosition.max_workload}</p>
                        <div class="admin-tabla__topes-regular">
                          <div data-num="${dataPosition.max_workload}" class="admin-tabla__tope-restar">-</div>
                          <div data-num="${dataPosition.max_workload}" class="admin-tabla__tope-sumar">+</div>
                        </div>
                      </div>`,
              email: dataPosition.email,
              turn: `<div data-id="${dataPosition.id}" class="admin-tabla__turno-checkbox"><input type="checkbox" id="team__turn-${dataPosition.id}" ${dataPosition.is_available ? 'checked' : ''}><label for="team__turn-${dataPosition.id}" data-si="On" data-no="Off"/></div>`
            })
          }
        })
    },
    cellClick (value) {
      // verificar que le dieron en el radio
      const idUser = value.row.id
      console.log(value)
      if (value.event.target.className === 'admin-tabla__tope-sumar') {
        this.wordloadOperation(idUser, 'sumar', value.event.target.dataset.num)
      }
      if (value.event.target.className === 'admin-tabla__tope-restar') {
        this.wordloadOperation(idUser, 'restar', value.event.target.dataset.num)
      }
      if (value.event.target.localName === 'input') {
        if (value.column.field === 'turn') {
          console.log('turno')
          const data = {
            'delivery_man': {
              'on_duty': value.event.target.checked
            }
          }
          this.checkedStatus(idUser, data)
        }
      }
    },
    wordloadOperation (id, operador, num) {
      // activar o desacativar el servicio
      var data = {}

      if (operador === 'sumar') {
        data = {
          'delivery_man': {
            'max_workload': parseInt(num) + 1
          }
        }
      } else {
        data = {
          'delivery_man': {
            'max_workload': parseInt(num) - 1
          }
        }
      }

      configService(`/central_admin/universities/${this.university.id}/delivery_men/${id}`, {
        method: 'put',
        data
      })
        .then(res => {
          console.log(res)
          this.updateTable()
        })
        .catch(error => {
          this.$swal({
            type: 'error',
            title: 'Oops...',
            text: 'Vuelve a Intentarlo'
          })
          console.log(error.response.data)
        })
    },
    checkedStatus (id, data) {
      configService(`/central_admin/universities/${this.university.id}/delivery_men/${id}`, {
        method: 'put',
        data
      })
        .then(res => {
          console.log(res)
        })
        .catch(error => {
          this.$swal({
            type: 'error',
            title: 'Oops...',
            text: 'Vuelve a Intentarlo'
          })
          console.log(error.response.data)
        })
    },
    toggleAdd () {
      this.showAdd = !this.showAdd
      console.log(this.showAdd)
    }
  }
}
</script>

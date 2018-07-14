<template>
  <main class="admin-team__main">

    <Menu />

    <article class="admin-restaurant__tabla">
      <ConfigurationMenu />
      <vue-good-table
        :columns="columns"
        :rows="rows"
        :sort-options="{
          enabled: true,
          initialSortBy: {field: 'name', type: 'asc'}
        }"
        :search-options="{
          enabled: true,
          placeholder: 'Buscar Addons...'
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
            @click="toggleAdd('')"
            class="ceu-table__add">
            Agregar
          </div>
          <div class="table-actions__select">
            <multiselect
              class="custom-select5"
              v-model="restaurant"
              :options="restaurants"
              :searchable="true"
              :show-labels="false"
              label="label"
              track-by="value"
              @select="selectRestaurant"
              placeholder="Buscar Restaurante..." />
          </div>
        </div>
      </vue-good-table>
    </article>
    <!-- modal -->
    <ModalAdd
      :current-addon="currentAddon"
      :current-commerce="currentCommerce"
      @toggle-add="toggleAdd"
      @reload-table="updateTable"
      :show-modal="showAdd" />
  </main>
</template>

<script>
import { mapState, mapActions } from 'vuex'
// https://xaksis.github.io/vue-good-table/guide/#installation
import { VueGoodTable } from 'vue-good-table'
import 'vue-good-table/dist/vue-good-table.css'

// custom components
import Menu from '../components/layout/Menu'
import ModalAdd from '../components/addons/add-addons.vue'
import ConfigurationMenu from '../components/restaurant/configuration-menu'
import configService from '../settings/api-url'

export default {
  name: 'Addons',
  components: {
    Menu,
    VueGoodTable,
    ModalAdd,
    ConfigurationMenu
  },
  computed: {
    ...mapState(['university', 'commerces', 'commerce'])
  },
  watch: {
    university () {
      this.getCommerces()
    }
  },
  mounted () {
    this.$nextTick(function () {
      this.getCommerces()
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
          label: 'Disponibilidad',
          field: 'availability',
          html: true,
          sortable: false
        },
        {
          label: 'Editar',
          field: 'edit',
          html: true,
          sortable: false
        }
      ],
      rows: [],
      idRestaurant: 0,
      showAdd: false,
      restaurants: [],
      restaurant: {},
      currentCommerce: 0,
      currentAddon: NaN
    }
  },
  methods: {
    ...mapActions(['updateCommercesAsync']),
    updateTable () {
      this.rows = []
      configService(`/central_admin/commerces/${this.currentCommerce}/add_ons`)
        .then(res => {
          const data = res.data
          for (let index = 0; index < data.length; index++) {
            const dataPosition = data[index]
            this.rows.push({
              id: dataPosition.id,
              name: `${dataPosition.name}`,
              availability: `<div data-id="${dataPosition.id}" class="admin-tabla__turno-checkbox"><input type="checkbox" id="addons-available-${dataPosition.id}" ${dataPosition.is_available ? 'checked' : ''}><label for="addons-available-${dataPosition.id}" data-si="On" data-no="Off"/></div>`,
              edit: `<div class="restaurant-edit" data-id="${dataPosition.id}">Edit</div>`
            })
          }
        })
    },
    getCommerces () {
      this.updateCommercesAsync()
        .then(res => {
          const data = res.data
          // primer restaurante por defecto
          this.restaurant = {value: data[0].id, label: data[0].commercial_name}
          this.currentCommerce = data[0].id

          for (let index = 0; index < data.length; index++) {
            let dataPosition = data[index]
            this.restaurants.push({value: dataPosition.id, label: dataPosition.commercial_name})
          }
          // cargar tabla cuando ya se encuentren todos los comercios
          this.updateTable()
        })
    },
    cellClick (value) {
      // verificar que le dieron en el radio
      const idAddons = value.row.id
      if (value.event.target.localName === 'input') {
        if (value.column.field === 'availability') {
          const data = {
            'add_on': {
              'is_available': value.event.target.checked
            }
          }
          this.checkedStatus(idAddons, data)
        }
      }
      if (value.column.field === 'edit') {
        this.toggleAdd('')
        this.currentAddon = idAddons
      }
    },
    checkedStatus (id, data) {
      // activar o desacativar el servicio
      configService(`/central_admin/commerces/${this.currentCommerce}/add_ons/${id}`, {
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
    selectRestaurant (e) {
      this.currentCommerce = e.value
      this.updateTable()
    },
    toggleAdd (event) {
      if (isNaN(event)) {
        this.currentAddon = NaN
      }
      this.showAdd = !this.showAdd
      document.querySelector('body').classList.toggle('no-scroll')
    }
  }
}
</script>

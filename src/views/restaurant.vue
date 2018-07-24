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
          placeholder: 'Buscar restaurante...'
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
    <ModalAdd
      @toggle-add="toggleAdd"
      @create-restaurant="createRestaurant"
      :show-modal="showAdd" />
    <ModalEdit
      @toggle-edit="toggleEdit"
      @edit-restaurant="updateTable"
      :id-restaurant="idRestaurant"
      :show-modal="showEdit" />
  </main>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Vue from 'vue'
// https://xaksis.github.io/vue-good-table/guide/#installation
import { VueGoodTable } from 'vue-good-table'
import 'vue-good-table/dist/vue-good-table.css'

// custom components
import Menu from '../components/layout/Menu'
import ModalAdd from '../components/restaurant/modal-add'
import ModalEdit from '../components/restaurant/modal-edit'
import ConfigurationMenu from '../components/restaurant/configuration-menu'
import configService from '../settings/api-url'

export default {
  name: 'Restaurant',
  components: {
    Menu,
    VueGoodTable,
    ModalAdd,
    ModalEdit,
    ConfigurationMenu
  },
  watch: {
    university () {
      this.updateTable()
    }
  },
  computed: {
    ...mapState(['university', 'commerces', 'commerce'])
  },
  mounted () {
    this.$nextTick(function () {
      this.updateTable()
    })
  },
  data () {
    return {
      // ...mapState(),
      columns: [
        {
          label: 'Nombre',
          field: 'name'
        },
        {
          label: 'Celular',
          field: 'cellphone'
        },
        {
          label: 'Celular  2',
          field: 'cellphone2'
        },
        {
          label: 'Dirección',
          field: 'address'
        },
        {
          label: 'Domicilios',
          field: 'delivery',
          html: true,
          sortable: false
        },
        {
          label: 'Take-Out',
          field: 'takeout',
          html: true,
          sortable: false
        },
        {
          label: 'Estado',
          field: 'status',
          html: true,
          sortable: false
        },
        {
          label: 'Activar/Desact',
          field: 'activeDisable',
          html: true,
          sortable: false
        },
        {
          label: '',
          field: 'edit',
          html: true,
          sortable: false
        }
      ],
      rows1: [
        {
          id: 1,
          name: 'El Corral',
          cellphone: '3006132888',
          cellphone2: '3006132888',
          address: 'Carrera 22#106-40',
          delivery: '<div class="admin-tabla__turno-checkbox"><input type="checkbox" id="restaurant-addresess__01"><label for="restaurant-addresess__01" data-si="On" data-no="Off"/></div>',
          takeout: '<div class="admin-tabla__turno-checkbox"><input type="checkbox" id="restaurant-takeout__01"><label for="restaurant-takeout__01" data-si="On" data-no="Off"/></div>',
          status: '<div class="admin-tabla__turno-checkbox"><input type="checkbox" id="restaurant-status__01"><label for="restaurant-status__01" data-si="On" data-no="Off"/></div>',
          activeDisable: '<div class="admin-tabla__turno-checkbox"><input type="checkbox" id="restaurant-activedisable__01"><label for="restaurant-activedisable__01" data-si="On" data-no="Off"/></div>',
          edit: '<div class="restaurant-edit">Edit</div>'
        },
        {
          id: 2,
          name: 'Subway',
          cellphone: '3006132338',
          cellphone2: '3006132338',
          address: 'Carrera 22#106-44',
          delivery: '<div class="admin-tabla__turno-checkbox"><input type="checkbox" id="restaurant-addresess__02"><label for="restaurant-addresess__02" data-si="On" data-no="Off"/></div>',
          takeout: '<div class="admin-tabla__turno-checkbox"><input type="checkbox" id="restaurant-takeout__02"><label for="restaurant-takeout__02" data-si="On" data-no="Off"/></div>',
          status: '<div class="admin-tabla__turno-checkbox"><input type="checkbox" id="restaurant-status__02"><label for="restaurant-status__02" data-si="On" data-no="Off"/></div>',
          activeDisable: '<div class="admin-tabla__turno-checkbox"><input type="checkbox" id="restaurant-activedisable__02"><label for="restaurant-activedisable__02" data-si="On" data-no="Off"/></div>',
          edit: '<div class="restaurant-edit">Edit</div>'
        },
        {
          id: 3,
          name: 'Monareta',
          cellphone: '3206432888',
          cellphone2: '3206432888',
          address: 'Calle 54#106-40',
          delivery: '<div class="admin-tabla__turno-checkbox"><input type="checkbox" id="restaurant-addresess__03"><label for="restaurant-addresess__03" data-si="On" data-no="Off"/></div>',
          takeout: '<div class="admin-tabla__turno-checkbox"><input type="checkbox" id="restaurant-takeout__03"><label for="restaurant-takeout__03" data-si="On" data-no="Off"/></div>',
          status: '<div class="admin-tabla__turno-checkbox"><input type="checkbox" id="restaurant-status__03"><label for="restaurant-status__03" data-si="On" data-no="Off"/></div>',
          activeDisable: '<div class="admin-tabla__turno-checkbox"><input type="checkbox" id="restaurant-activedisable__03"><label for="restaurant-activedisable__03" data-si="On" data-no="Off"/></div>',
          edit: '<div class="restaurant-edit">Edit</div>'
        },
        {
          id: 4,
          name: 'Pizza Pizza',
          cellphone: '3146733888',
          cellphone2: '3146733888',
          address: 'Avenida 22#106-40',
          delivery: '<div class="admin-tabla__turno-checkbox"><input type="checkbox" id="restaurant-addresess__04"><label for="restaurant-addresess__04" data-si="On" data-no="Off"/></div>',
          takeout: '<div class="admin-tabla__turno-checkbox"><input type="checkbox" id="restaurant-takeout__04"><label for="restaurant-takeout__04" data-si="On" data-no="Off"/></div>',
          status: '<div class="admin-tabla__turno-checkbox"><input type="checkbox" id="restaurant-status__04"><label for="restaurant-status__04" data-si="On" data-no="Off"/></div>',
          activeDisable: '<div class="admin-tabla__turno-checkbox"><input type="checkbox" id="restaurant-activedisable__04"><label for="restaurant-activedisable__04" data-si="On" data-no="Off"/></div>',
          edit: '<div class="restaurant-edit">Edit</div>'
        },
        {
          id: 5,
          name: 'Turkiye',
          cellphone: '30012332888',
          cellphone2: '30012332888',
          address: 'Carrera 22#23-40',
          delivery: '<div class="admin-tabla__turno-checkbox"><input type="checkbox" id="restaurant-addresess__05"><label for="restaurant-addresess__05" data-si="On" data-no="Off"/></div>',
          takeout: '<div class="admin-tabla__turno-checkbox"><input type="checkbox" id="restaurant-takeout__05"><label for="restaurant-takeout__05" data-si="On" data-no="Off"/></div>',
          status: '<div class="admin-tabla__turno-checkbox"><input type="checkbox" id="restaurant-status__06"><label for="restaurant-status__06" data-si="On" data-no="Off"/></div>',
          activeDisable: '<div class="admin-tabla__turno-checkbox"><input type="checkbox" id="restaurant-activedisable__06"><label for="restaurant-activedisable__06" data-si="On" data-no="Off"/></div>',
          edit: '<div class="restaurant-edit">Edit</div>'
        },
        {
          id: 6,
          name: 'Alista Colombianas',
          cellphone: '3306132888',
          cellphone2: '3306132888',
          address: 'Avenida 12#106-40',
          delivery: '<div class="admin-tabla__turno-checkbox"><input type="checkbox" id="restaurant-addresess__06"><label for="restaurant-addresess__06" data-si="On" data-no="Off"/></div>',
          takeout: '<div class="admin-tabla__turno-checkbox"><input type="checkbox" id="restaurant-takeout__06"><label for="restaurant-takeout__06" data-si="On" data-no="Off"/></div>',
          status: '<div class="admin-tabla__turno-checkbox"><input type="checkbox" id="restaurant-status__06"><label for="restaurant-status__06" data-si="On" data-no="Off"/></div>',
          activeDisable: '<div class="admin-tabla__turno-checkbox"><input type="checkbox" id="restaurant-activedisable__06"><label for="restaurant-activedisable__06" data-si="On" data-no="Off"/></div>',
          edit: '<div class="restaurant-edit">Edit</div>'
        },
        {
          id: 7,
          name: 'Pateles & Pasteles',
          cellphone: '3213450982',
          cellphone2: '3213450982',
          address: 'Carrera 22#106-40',
          delivery: '<div class="admin-tabla__turno-checkbox"><input type="checkbox" id="restaurant-addresess__07"><label for="restaurant-addresess__07" data-si="On" data-no="Off"/></div>',
          takeout: '<div class="admin-tabla__turno-checkbox"><input type="checkbox" id="restaurant-takeout__07"><label for="restaurant-takeout__07" data-si="On" data-no="Off"/></div>',
          status: '<div class="admin-tabla__turno-checkbox"><input type="checkbox" id="restaurant-status__07"><label for="restaurant-status__07" data-si="On" data-no="Off"/></div>',
          activeDisable: '<div class="admin-tabla__turno-checkbox"><input type="checkbox" id="restaurant-activedisable__07"><label for="restaurant-activedisable__07" data-si="On" data-no="Off"/></div>',
          edit: '<div class="restaurant-edit">Edit</div>'
        },
        {
          id: 8,
          name: 'Don Juan',
          cellphone: '3613450982',
          cellphone2: '3713450982',
          address: 'Diagonal 22#106-40',
          delivery: '<div class="admin-tabla__turno-checkbox"><input type="checkbox" id="restaurant-addresess__08"><label for="restaurant-addresess__08" data-si="On" data-no="Off"/></div>',
          takeout: '<div class="admin-tabla__turno-checkbox"><input type="checkbox" id="restaurant-takeout__08"><label for="restaurant-takeout__08" data-si="On" data-no="Off"/></div>',
          status: '<div class="admin-tabla__turno-checkbox"><input type="checkbox" id="restaurant-status__08"><label for="restaurant-status__08" data-si="On" data-no="Off"/></div>',
          activeDisable: '<div class="admin-tabla__turno-checkbox"><input type="checkbox" id="restaurant-activedisable__08"><label for="restaurant-activedisable__08" data-si="On" data-no="Off"/></div>',
          edit: '<div class="restaurant-edit">Edit</div>'
        },
        {
          id: 9,
          name: 'Mr. Ceu',
          cellphone: '3193450982',
          cellphone2: '3193450982',
          address: 'Diagonal 22#106-40',
          delivery: '<div class="admin-tabla__turno-checkbox"><input type="checkbox" id="restaurant-addresess__08"><label for="restaurant-addresess__08" data-si="On" data-no="Off"/></div>',
          takeout: '<div class="admin-tabla__turno-checkbox"><input type="checkbox" id="restaurant-takeout__08"><label for="restaurant-takeout__08" data-si="On" data-no="Off"/></div>',
          status: '<div class="admin-tabla__turno-checkbox"><input type="checkbox" id="restaurant-status__08"><label for="restaurant-status__08" data-si="On" data-no="Off"/></div>',
          activeDisable: '<div class="admin-tabla__turno-checkbox"><input type="checkbox" id="restaurant-activedisable__08"><label for="restaurant-activedisable__08" data-si="On" data-no="Off"/></div>',
          edit: '<div class="restaurant-edit">Edit</div>'
        },
        {
          id: 10,
          name: 'Don Juan',
          cellphone: '3613450982',
          cellphone2: '3713450982',
          address: 'Diagonal 22#106-40',
          delivery: '<div class="admin-tabla__turno-checkbox"><input type="checkbox" id="restaurant-addresess__08"><label for="restaurant-addresess__08" data-si="On" data-no="Off"/></div>',
          takeout: '<div class="admin-tabla__turno-checkbox"><input type="checkbox" id="restaurant-takeout__08"><label for="restaurant-takeout__08" data-si="On" data-no="Off"/></div>',
          status: '<div class="admin-tabla__turno-checkbox"><input type="checkbox" id="restaurant-status__08"><label for="restaurant-status__08" data-si="On" data-no="Off"/></div>',
          activeDisable: '<div class="admin-tabla__turno-checkbox"><input type="checkbox" id="restaurant-activedisable__08"><label for="restaurant-activedisable__08" data-si="On" data-no="Off"/></div>',
          edit: '<div class="restaurant-edit">Edit</div>'
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
      this.updateCommercesAsync()
        .then(res => {
          const data = res.data
          if (data.lenght === 1) {
            this.rows.push({
              id: data.id,
              name: data.commercial_name,
              cellphone: data.telephone,
              cellphone2: data.contact_number,
              address: 'Carrera 22#106-40',
              delivery: `<div data-id="${data.id}" class="admin-tabla__turno-checkbox"><input type="checkbox" id="restaurant-addresess__${data.id}" ${data.has_delivery ? 'checked' : ''}><label for="restaurant-addresess__${data.id}" data-si="On" data-no="Off"/></div>`,
              takeout: `<div data-id="${data.id}" class="admin-tabla__turno-checkbox"><input type="checkbox" id="restaurant-takeout__${data.id}" ${data.has_takeout ? 'checked' : ''}><label for="restaurant-takeout__${data.id}" data-si="On" data-no="Off"/></div>`,
              status: `<div data-id="${data.id}" class="admin-tabla__turno-checkbox"><input type="checkbox" id="restaurant-status__${data.id}" ${data.is_open ? 'checked' : ''}><label for="restaurant-status__${data.id}" data-si="On" data-no="Off"/></div>`,
              activeDisable: `<div data-id="${data.id}" class="admin-tabla__turno-checkbox"><input type="checkbox" id="restaurant-activedisable__${data.id}" ${data.active ? 'checked' : ''}><label for="restaurant-activedisable__${data.id}" data-si="On" data-no="Off"/></div>`,
              edit: `<div class="restaurant-edit" data-id="${data.id}">Edit</div>`
            })
          } else {
            data.map(data => {
              this.rows.push({
                id: data.id,
                name: data.commercial_name,
                cellphone: data.telephone,
                cellphone2: data.contact_number,
                address: 'Carrera 22#106-40',
                delivery: `<div data-id="${data.id}" class="admin-tabla__turno-checkbox"><input type="checkbox" id="restaurant-addresess__${data.id}" ${data.has_delivery ? 'checked' : ''}><label for="restaurant-addresess__${data.id}" data-si="On" data-no="Off"/></div>`,
                takeout: `<div data-id="${data.id}" class="admin-tabla__turno-checkbox"><input type="checkbox" id="restaurant-takeout__${data.id}" ${data.has_takeout ? 'checked' : ''}><label for="restaurant-takeout__${data.id}" data-si="On" data-no="Off"/></div>`,
                status: `<div data-id="${data.id}" class="admin-tabla__turno-checkbox"><input type="checkbox" id="restaurant-status__${data.id}" ${data.is_open ? 'checked' : ''}><label for="restaurant-status__${data.id}" data-si="On" data-no="Off"/></div>`,
                activeDisable: `<div data-id="${data.id}" class="admin-tabla__turno-checkbox"><input type="checkbox" id="restaurant-activedisable__${data.id}" ${data.active ? 'checked' : ''}><label for="restaurant-activedisable__${data.id}" data-si="On" data-no="Off"/></div>`,
                edit: `<div class="restaurant-edit" data-id="${data.id}">Edit</div>`
              })
            })
          }
        })
    },
    cellClick (value) {
      // verificar que le dieron en el radio
      const idRowRestaurant = value.row.id
      if (value.event.target.localName === 'input') {
        if (value.column.field === 'delivery') {
          console.log('delivery')
          const data = { 'has_delivery': value.event.target.checked }
          this.checkedStatus(idRowRestaurant, data)
        }
        if (value.column.field === 'takeout') {
          console.log('takeout')
          const data = { 'has_takeout': value.event.target.checked }
          this.checkedStatus(idRowRestaurant, data)
        }
        if (value.column.field === 'status') {
          console.log('status')
          const data = { 'is_open': value.event.target.checked }
          this.checkedStatus(idRowRestaurant, data)
        }
        if (value.column.field === 'activeDisable') {
          console.log('activeDisable')
          const data = { 'active': value.event.target.checked }
          this.checkedStatus(idRowRestaurant, data)
        }
      }
      if (value.column.field === 'edit') {
        this.idRestaurant = idRowRestaurant
        this.toggleEdit()
      }
    },
    checkedStatus (id, data) {
      // activar o desacativar el servicio
      configService(`/central_admin/commerces/${id}`, {
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
    createRestaurant (data) {
      configService('/central_admin/commerces', {
        method: 'post',
        data: {
          commerce: {
            'active': true,
            'commercial_name': data.nameRestaurant,
            'email': data.email,
            'business_name': data.nameContact,
            'telephone': data.phone,
            'contact_number': data.phone2,
            'nit': data.nit,
            'address': data.direccion,
            'has_delivery': data.domicilio,
            'has_takeout': data.takeout,
            'admin_commerce_attributes': {
              'first_name': data.nameAdmin,
              'last_name': data.lastNameAdmin,
              'email': data.emailAdmin,
              'cellphone': data.phoneAdmin,
              'password': data.passAdmin,
              'password_confirmation': data.passRepeatAdmin
            }
          }
        }
      })
        .then(res => {
          this.updateTable()
          this.toggleAdd()
          this.$swal({
            type: 'success',
            title: 'Restaurante Agregado',
            timer: 2500
          })
        })
        .catch(error => {
          this.$swal({
            type: 'error',
            title: 'Oops...',
            text: error.response.data.message
          })
          console.log(error.response.data)
          console.log(error.response.headers)
        })
    },
    toggleAdd () {
      this.showAdd = !this.showAdd
      document.querySelector('body').classList.toggle('no-scroll')
    },
    toggleEdit () {
      this.showEdit = !this.showEdit
      document.querySelector('body').classList.toggle('no-scroll')
      Vue.$gmapDefaultResizeBus.$emit('resize')
    }
  }
}
</script>

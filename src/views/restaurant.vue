<template>
  <main class="admin-team__main">

    <Menu />

    <article class="admin-team__tabla">
      <vue-good-table
        :columns="columns"
        :rows="rows"
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
      :show-modal="showEdit" />
  </main>
</template>

<script>
import { mapState } from 'vuex'
// https://xaksis.github.io/vue-good-table/guide/#installation
import { VueGoodTable } from 'vue-good-table'
import 'vue-good-table/dist/vue-good-table.css'

// custom components
import Menu from '../components/layout/Menu'
import ModalAdd from '../components/restaurant/modal-add'
import ModalEdit from '../components/restaurant/modal-edit'
import configService from '../settings/api-url'

export default {
  name: 'Restaurant',
  components: {
    Menu,
    VueGoodTable,
    ModalAdd,
    ModalEdit
  },
  computed: {
    ...mapState(['university', 'commerces'])
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
          field: 'addresses',
          html: true
        },
        {
          label: 'Take-Out',
          field: 'takeout',
          html: true
        },
        {
          label: 'Estado',
          field: 'status',
          html: true
        },
        {
          label: 'Activar/Desact',
          field: 'activeDisable',
          html: true
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
          addresses: '<div class="admin-tabla__turno-checkbox"><input type="checkbox" id="restaurant-addresess__01"><label for="restaurant-addresess__01" data-si="On" data-no="Off"/></div>',
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
          addresses: '<div class="admin-tabla__turno-checkbox"><input type="checkbox" id="restaurant-addresess__02"><label for="restaurant-addresess__02" data-si="On" data-no="Off"/></div>',
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
          addresses: '<div class="admin-tabla__turno-checkbox"><input type="checkbox" id="restaurant-addresess__03"><label for="restaurant-addresess__03" data-si="On" data-no="Off"/></div>',
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
          addresses: '<div class="admin-tabla__turno-checkbox"><input type="checkbox" id="restaurant-addresess__04"><label for="restaurant-addresess__04" data-si="On" data-no="Off"/></div>',
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
          addresses: '<div class="admin-tabla__turno-checkbox"><input type="checkbox" id="restaurant-addresess__05"><label for="restaurant-addresess__05" data-si="On" data-no="Off"/></div>',
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
          addresses: '<div class="admin-tabla__turno-checkbox"><input type="checkbox" id="restaurant-addresess__06"><label for="restaurant-addresess__06" data-si="On" data-no="Off"/></div>',
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
          addresses: '<div class="admin-tabla__turno-checkbox"><input type="checkbox" id="restaurant-addresess__07"><label for="restaurant-addresess__07" data-si="On" data-no="Off"/></div>',
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
          addresses: '<div class="admin-tabla__turno-checkbox"><input type="checkbox" id="restaurant-addresess__08"><label for="restaurant-addresess__08" data-si="On" data-no="Off"/></div>',
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
          addresses: '<div class="admin-tabla__turno-checkbox"><input type="checkbox" id="restaurant-addresess__08"><label for="restaurant-addresess__08" data-si="On" data-no="Off"/></div>',
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
          addresses: '<div class="admin-tabla__turno-checkbox"><input type="checkbox" id="restaurant-addresess__08"><label for="restaurant-addresess__08" data-si="On" data-no="Off"/></div>',
          takeout: '<div class="admin-tabla__turno-checkbox"><input type="checkbox" id="restaurant-takeout__08"><label for="restaurant-takeout__08" data-si="On" data-no="Off"/></div>',
          status: '<div class="admin-tabla__turno-checkbox"><input type="checkbox" id="restaurant-status__08"><label for="restaurant-status__08" data-si="On" data-no="Off"/></div>',
          activeDisable: '<div class="admin-tabla__turno-checkbox"><input type="checkbox" id="restaurant-activedisable__08"><label for="restaurant-activedisable__08" data-si="On" data-no="Off"/></div>',
          edit: '<div class="restaurant-edit">Edit</div>'
        }
      ],
      rows: [],
      showAdd: false,
      showEdit: false
    }
  },
  methods: {
    updateTable () {
      this.rows = []
      this.$store.dispatch('updateCommerceAsync')
        .then(res => {
          const data = res.data
          if (data.lenght === 1) {
            this.rows.push({
              id: data.id,
              name: data.commercial_name,
              cellphone: data.telephone,
              cellphone2: data.contact_number,
              address: 'Carrera 22#106-40',
              addresses: `<div data-id="${data.id}" class="admin-tabla__turno-checkbox"><input type="checkbox" id="restaurant-addresess__${data.id}"><label for="restaurant-addresess__${data.id}" data-si="On" data-no="Off"/></div>`,
              takeout: `<div data-id="${data.id}" class="admin-tabla__turno-checkbox"><input type="checkbox" id="restaurant-takeout__${data.id}"><label for="restaurant-takeout__${data.id}" data-si="On" data-no="Off"/></div>`,
              status: `<div data-id="${data.id}" class="admin-tabla__turno-checkbox"><input type="checkbox" id="restaurant-status__${data.id}"><label for="restaurant-status__${data.id}" data-si="On" data-no="Off"/></div>`,
              activeDisable: `<div data-id="${data.id}" class="admin-tabla__turno-checkbox"><input type="checkbox" id="restaurant-activedisable__${data.id}"><label for="restaurant-activedisable__${data.id}" data-si="On" data-no="Off"/></div>`,
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
                addresses: `<div data-id="${data.id}" class="admin-tabla__turno-checkbox"><input type="checkbox" id="restaurant-addresess__${data.id}"><label for="restaurant-addresess__${data.id}" data-si="On" data-no="Off"/></div>`,
                takeout: `<div data-id="${data.id}" class="admin-tabla__turno-checkbox"><input type="checkbox" id="restaurant-takeout__${data.id}"><label for="restaurant-takeout__${data.id}" data-si="On" data-no="Off"/></div>`,
                status: `<div data-id="${data.id}" class="admin-tabla__turno-checkbox"><input type="checkbox" id="restaurant-status__${data.id}"><label for="restaurant-status__${data.id}" data-si="On" data-no="Off"/></div>`,
                activeDisable: `<div data-id="${data.id}" class="admin-tabla__turno-checkbox"><input type="checkbox" id="restaurant-activedisable__${data.id}"><label for="restaurant-activedisable__${data.id}" data-si="On" data-no="Off"/></div>`,
                edit: `<div class="restaurant-edit" data-id="${data.id}">Edit</div>`
              })
            })
          }
        })
    },
    cellClick (value) {
      if (value.column.field === 'edit') {
        console.log('edit')
        this.toggleEdit()
      }
    },
    createRestaurant (data) {
      configService('/central_admin/commerces', {
        method: 'post',
        data: {
          commerce: {
            'university_id': this.university.id,
            'active': true,
            'commercial_name': data.nameRestaurant,
            'email': data.email,
            'business_name': data.nameContact,
            'telephone': data.phone,
            'contact_number': data.phone2,
            'nit': data.nit,
            'address': data.direccion,
            'has_delivery': data.domicilio,
            'has_takeout': data.takeout
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
    }
  }
}
</script>

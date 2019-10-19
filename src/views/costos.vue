<template>
  <main class="admin-team__main">
    <Menu />
    <article class="admin-team__tabla">
      <div class="main-content">
        <div class="table_options">
          <div
            @click="openModalRow"
            class="new-row">
            Nueva materia prima
          </div>
            <div
            @click="openModalCategory"
            class="new-row">
            Agregar Categoria
          </div>
          <div
            @click="$router.push({name: 'products'})"
            class="new-row">
            Ver Productos
          </div>
        </div>
        <vue-good-table
        @on-cell-click="openModal"
        :columns="columns"
        :rows="rows"
        :groupOptions="{
  	      enabled: true
          }"
        :search-options="{
          enabled: true,
          placeholder: 'Buscar materia prima'
        }"
        theme="black-rhino">
      </vue-good-table>
      </div>
      
    </article>
    <!-- modal -->
    <row-modal
      v-if="categories"
      @push-category="pushCategory"
      @toggle-modal="showModal = false"
      @remplace-category="remplaceCategory"
      @reset="reset"
      :show-modal="showModal" 
      :type="type"
      :data="data"
      :categories="categories"/>      
  </main>
</template>

<script>
import { VueGoodTable } from 'vue-good-table'
import configService from '../settings/api-url'
import rowModal from '../components/cupons/createCupon'
import Menu from '../components/layout/Menu'
import 'vue-good-table/dist/vue-good-table.css'
export default {
  components: {
    VueGoodTable,
    Menu,
    rowModal
  },
  data () {
    return {
      data: {},
      type: 'create',
      showModal: false,
      columns: [
        {
          label: 'Nombre',
          field: 'name',
          html: true
        },
        {
          label: 'Código',
          field: 'code'
        },
        {
          label: 'Unidad',
          field: 'unity'
        },
        {
          label: 'Precio',
          field: 'price'
        }
      ],
      rows: [],
      categoryMaterials: null,
      categories: null
    }
  },
  methods: {
    reset (data) {
      debugger
      this.categoryMaterials = data
      this.createTable()
    },
    pushCategory (event) {
      this.categoryMaterials.push(event)
      this.categories = this.formatCategories()
      this.rows.push(this.formatCategory(event))
    },
    openModalRow () {
      this.showModal = true
      this.type = 'create'
    },
    openModalCategory () {
      this.showModal = true
      this.type = 'create category'
    },
    openModal (value) {
      if (value.column.field === 'name') {
        this.type = 'edit'
        const category = this.categories.find(category => category.value === value.row.category_id)
        this.data = {code: value.row.code, name: value.row.name, price: value.row.price, unity: value.row.unity, category, id: value.row.id}
        this.showModal = true
      }
    },
    formatCategories () {
      return this.categoryMaterials.map(category => {
        return {
          value: category.id,
          label: category.name
        }
    })
    },
    formatCategory (value) {
      return {
        id: value.id,
        mode: 'span',
        label: value.name,
        html: false,
        children: value.row_materials.length !== 0 ? value.row_materials.map(rowMaterial => {
          return  {name: rowMaterial.name, code: rowMaterial.code, unity: rowMaterial.unity, price: rowMaterial.price, category_id: value.id, id: rowMaterial.id}
           }) : [{name: 'Categoria vacia', code: '', unity: '', price: '', category_id: '', id: ''}]
      }
    },
    remplaceCategory (value) {
      if (this.type === 'edit') {
        const row = this.rows.find(row => row.name === value.category_row_material_id)
        for (let row of this.rows) {
          const oldRowIndex = row.children.findIndex(element => element.id === value.id)
          if (oldRowIndex >= 0)  {
            if (row.id === value.category_row_material_id) {
              row.children.splice(oldRowIndex,1, {name: value.name, code: value.code, unity: value.unity, price: value.price, category_id: value.category_row_material_id, id: value.id} )
            } else {
              row.children.splice(oldRowIndex, 1)
              let newRow = this.rows.find(row => row.id === value.category_row_material_id)
              newRow.children.push({name: value.name, code: value.code, unity: value.unity, price: value.price, category_id: value.category_row_material_id, id: value.id})
            }
            break
          }
        }
      } else {
        const index = this.rows.findIndex(row => row.id === value.id)
        this.rows.splice(index, 1, this.formatCategory(value))
      }
    },
    createTable () {
      this.rows = []
      for (let categoryMaterial of this.categoryMaterials) {
        this.rows.push(this.formatCategory(categoryMaterial))
      }
    }
  },
  async created () {
    const { data } = await configService('admin/category_row_materials')
    this.categoryMaterials = data
    this.categories = this.formatCategories()
    this.createTable()
  }
}
</script>

<style lang="scss">
  .punter {
    cursor: pointer;
  }

  .table_options {
    display: flex;
  }
  .new-row {
    border-radius: 8px;
    background-color: #353030;
    color: white;
    height: 40px;
    width: 150px;
    margin: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 12px;
  }

  .main-content {
    display: flex;
    flex-direction: column;
  }
</style>

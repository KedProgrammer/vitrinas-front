<template>
  <main class="admin-team__main">
    <Menu />
    <article class="admin-team__tabla">
      <div class="main-content">
        <div class="table_options">
          <div
            @click="openModalProduct"
            class="new-row">
            Nuevo producto
          </div>
            <div
            @click="openModalCategory"
            class="new-row">
            Agregar Categoria
          </div>
          <div
            @click="$router.go(-1)"
            class="new-row">
            Atrás
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
    <product-modal
      v-if="categories"
      @push-category="pushCategory"
      @toggle-modal="showModal = false"
      @remplace-category="remplaceCategory"
      :show-modal="showModal" 
      :type="type"
      :data="data"
      :categories="categories"/>      
  </main>
</template>

<script>
import { VueGoodTable } from 'vue-good-table'
import configService from '../settings/api-url'
import productModal from '../components/cupons/createProduct'
import Menu from '../components/layout/Menu'
import 'vue-good-table/dist/vue-good-table.css'
export default {
  components: {
    VueGoodTable,
    Menu,
    productModal
  },
  data () {
    return {
      data: {},
      type: 'create',
      products: null,
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
          label: 'Costo',
          field: 'cost'
        },
        {
          label: 'Porcentaje de ganancia',
          field: 'profit'
        },
        {
          label: 'Precio venta',
          field: 'sellPrice'
        }
      ],
      rows: [],
      categoryProducts: null,
      categories: null
    }
  },
  methods: {
    openModalCategory () {
      this.showModal = true
      this.type = 'create category'
    },
    openModalProduct () {
      this.showModal = true
      this.type = 'create'
    },
    remplaceCategory (value) {
      if (this.type === 'edit') {
        const row = this.rows.find(row => row.name === value.category_product_id)
        for (let row of this.rows) {
          const oldRowIndex = row.children.findIndex(element => element.id === value.id)
          if (oldRowIndex >= 0)  {
            if (row.id === value.category_product_id) {
              row.children.splice(oldRowIndex,1, {cost: value.cost, name: value.name, code: value.code, category_id: value.category_product_id, id: value.id, profit: value.profit_rate, row_material_summary: value.row_material_summary, sellPrice: value.price} )
            } else {
              row.children.splice(oldRowIndex, 1)
              let newRow = this.rows.find(row => row.id === value.category_product_id)
              newRow.children.push({cost: value.cost, name: value.name, code: value.code, category_id: value.category_product_id, id: value.id, profit: value.profit_rate, row_material_summary: value.row_material_summary, sellPrice: value.price})
            }
            break
          }
        }
      } else {
        const index = this.rows.findIndex(row => row.id === value.id)
        this.rows.splice(index, 1, this.formatCategory(value))
      }
    },
    openModal (value) {
      if (value.column.field === 'name') {
        this.type = 'edit'
        const category = this.categories.find(category => category.value === value.row.category_id)
        this.data = {code: value.row.code, name: value.row.name, profit: value.row.profit, category, id: value.row.id, rowMaterialSummary: value.row.row_material_summary}
        this.showModal = true
      }
    },
    pushCategory (event) {
      this.categoryProducts.push(event)
      this.categories = this.formatCategories()
      this.rows.push(this.formatCategory(event))
    },
    formatCategory (value) {
      return {
        id: value.id,
        mode: 'span',
        label: value.name,
        html: false,
        children: value.products.length !== 0 ? value.products.map(product => {
          return  {name: product.name, code: product.code, cost: product.cost, profit: product.profit_rate, category_id: value.id, id: product.id, row_material_summary: product.row_material_summary, sellPrice: product.price}
           }) : [{name: 'Categoria vacia', code: '', cost: '', category_id: '', id: ''}]
      }
    },
    formatCategories () {
      return this.categoryProducts.map(category => {
        return {
          value: category.id,
          label: category.name
        }
      })
    },
    createTable () {
      for (let categoryProduct of this.categoryProducts) {
        this.rows.push(this.formatCategory(categoryProduct))
      }
    }
  },
  async created () {
    const { data } = await configService('admin/category_products')
    this.categoryProducts = data
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

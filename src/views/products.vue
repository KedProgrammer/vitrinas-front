<template>
  <main class="admin-team__main">
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
          <div
            @click="getReport"
            class="new-row">
            Reporte Productos
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
          placeholder: 'Buscar producto'
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
import productModal from '../components/cupons/createProduct'
import Menu from '../components/layout/Menu'
import axios from 'axios'
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
          label: 'Porcentaje de ganancia %',
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
    async getReport () {

      const { data } = await configService('admin/product_reports')
      var myBlob =  new Blob([this.s2ab(atob(data))], {type: ''});
      var url = window.URL.createObjectURL(myBlob);
      var a = document.createElement("a");
      document.body.appendChild(a);
      a.href = url;
      a.download = "reporte_productos.xls";
      a.click();
    },
    s2ab(s) {
      var buf = new ArrayBuffer(s.length);
      var view = new Uint8Array(buf);
      for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
      return buf;
    },
    reset (data) {
      this.categoryProducts = data
      this.createTable()
    },
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
        this.replaceProductName(value)
        const row = this.rows.find(row => row.name === value.category_product_id)
        for (let row of this.rows) {
          const oldRowIndex = row.children.findIndex(element => element.id === value.id)
          if (oldRowIndex >= 0)  {
            if (row.id === value.category_product_id) {
              row.children.splice(oldRowIndex,1, {
              cost: value.cost ?  new Intl.NumberFormat('de-DE', {style: 'currency', currency: 'COP'}).format(value.cost) : 0, 
              name: value.name + '<div class="edit"> Ver </div>', 
              code: value.code, category_id: value.category_product_id, 
              id: value.id, profit: value.profit_rate, 
              row_material_summary: value.row_material_summary, 
              sellPrice: value.price ? new Intl.NumberFormat('de-DE', {style: 'currency', currency: 'COP'}).format(value.price) : 0,
              costNumber: value.cost || 0,
              sellPriceNumber: value.price || 0,
              simpleName: value.name} )
            } else {
              row.children.splice(oldRowIndex, 1)
              let newRow = this.rows.find(row => row.id === value.category_product_id)
              newRow.children.push({
              cost: value.cost ?  new Intl.NumberFormat('de-DE', {style: 'currency', currency: 'COP'}).format(value.cost) : 0, 
              name: value.name + '<div class="edit"> Ver </div>', 
              code: value.code, 
              category_id: value.category_product_id, 
              id: value.id, profit: value.profit_rate, 
              row_material_summary: value.row_material_summary, 
              sellPrice: value.price ? new Intl.NumberFormat('de-DE', {style: 'currency', currency: 'COP'}).format(value.price) : 0,
              costNumber: value.cost || 0,
              sellPriceNumber: value.price || 0,
              simpleName: value.name})
            }
            break
          }
        }
      } else {
        const index = this.rows.findIndex(row => row.id === value.id)
        this.rows.splice(index, 1, this.formatCategory(value))
      }
    },
    replaceProductName (value) {
      let product
      this.categoryProducts.forEach(category => {
        category.products.forEach(product => {
          if (product.id === value.id) product.name = value.name
        })
      })
    },
    openModal (value) {
      if (value.column.field === 'name') {
        let product
        this.type = 'edit'
        const category = this.categories.find(category => category.value === value.row.category_id)
        this.data = {image_url: value.row.image_url, sellPrice: parseInt(value.row.sellPriceNumber), code: value.row.code, name: value.row.simpleName, profit: value.row.profit, category, id: value.row.id, rowMaterialSummary: value.row.row_material_summary}
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
          return  {name: product.name + '<div class="edit"> Ver </div>', 
          image_url: product.image.url,
          code: product.code, 
          cost: product.cost ?  new Intl.NumberFormat('de-DE', {style: 'currency', currency: 'COP'}).format(product.cost) : 0, 
          profit: product.profit_rate, category_id: value.id, id: product.id, 
          row_material_summary: product.row_material_summary, 
          sellPrice: product.price ? new Intl.NumberFormat('de-DE', {style: 'currency', currency: 'COP'}).format(product.price) : 0,
          costNumber: product.cost || 0,
          sellPriceNumber: product.price || 0,
          simpleName: product.name}
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
      this.rows = []
      for (let categoryProduct of this.categoryProducts) {
        this.rows.push(this.formatCategory(categoryProduct))
      }
    },
    formatNumber (value) {
    new Intl.NumberFormat('de-DE', {style: 'currency', currency: 'COP'}).format(value)
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

  .edit {
    cursor: pointer;
    color: red;
  }
</style>

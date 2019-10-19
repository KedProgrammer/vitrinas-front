<template>
  <section
    :class="{ 'modal-ceu__show': showModal }"
    class="modal-ceu modal-edit">
    <div
      @click="closeModal"
      class="modal-ceu__overley"/>
    <div class="modal-ceu__content coupon__modal medium">
      <div
        @click="closeModal"
        class="modal-ceu__close">
        <i class="ceu-icon-close" />
      </div>
      <form
        v-if="type !== 'create category'"
        @submit.prevent="sendProduct"
        class="coupon__modalContent ceu-container2">
        <div class="ceu-item s-60 no-padding">
          <div class="ads-banner__dateLimit ceu-item">
            <div class="ads-banner__dateLimit-item ceu-item s-50">
              <p>Categoria</p>
              <v-select
                required
                class="search-select"
                v-model="category"
                :options="categories"/>
            </div>
          </div>
          <div class="menu-restaurant__add-title ceu-container2">
            <div
              class="ceu-campo__text-round3 ceu-item s-50">
              <p>Nombre</p>
              <input
                required
                v-model="name">
            </div>
            <div class="ceu-campo__text-round3 ceu-item s-50">
              <p>Codigo</p>
              <input
                required
                v-model="code">
            </div>
            <div class="ceu-campo__text-round3 ceu-item s-50">
              <p>Porcentaje de ganancia</p>
              <div class="percentage-input">
                <input
                required
                min="1"
                max="100"
                step="any"
                v-model="percentaje"
                type="number">
                <span class="porcentage-label">%</span>
              </div>
            </div>
            <div class="ceu-campo__text-round3 ceu-item s-50">
              <p>Valor de venta</p>
              <span>{{ new Intl.NumberFormat('de-DE', {style: 'currency', currency: 'COP'}).format(this.total) }}</span>
            </div>
            <vue-good-table
            @on-cell-click="openModal"
            :columns="columns"
            :rows="rows"
            :search-options="{
              enabled: true,
              placeholder: 'Buscar materia prima'
              }"
            theme="black-rhino">
            </vue-good-table>
          </div>
        </div>
        <div class="ceu-campo__text-round3 ceu-item s-100">
          <button
            type="submit"
            class="ceu-btn1">
            {{ type === 'edit' ? 'Editar Producto' : 'Crear Producto'}}
          </button>
          <button
            v-if="type==='edit'"
            @click.prevent="createRow = true"
            class="ceu-btn1">
            Añadir Materia prima
          </button>
          <button
            v-if="type==='edit'"
            @click.prevent="deleteProduct"
            class="ceu-btn1">
            Eliminar Producto
          </button>
        </div>
      </form>
      <form 
      v-else
      @submit.prevent="sendCategoryName">
        <div class="menu-restaurant__add-title ceu-container2">
          <div
            class="ceu-campo__text-round3 ceu-item s-50">
            <p>Nombre Categoria</p>
            <input
              required
              v-model="categoryName">
          </div>
        </div>
        <div class="ceu-campo__text-round3 ceu-item s-100">
          <div
            @click="$emit('toggle-modal')"
            class="ceu-btn2 black">
            Cancelar
          </div>
          <button
            type="submit"
            class="ceu-btn1">
            Crear Categoria
          </button>
        </div>
      </form>
    </div>
    <add-product-row 
      v-if="type==='edit'"
      :product-id="data.id"
      :show-modal="createRow"
      :type="typeRow"
      :dataRow="dataRow"
      @update-data="updateTable"
      @close="closeCreateRow"
    />
  </section>
</template>

<script>
import configService from '../../settings/api-url'
import { VueGoodTable } from 'vue-good-table'
import AddProductRow from './add-product-row'
export default {
  components: {
    VueGoodTable,
    AddProductRow
  },
  data () {
    return {
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
        },
        {
          label: 'Cantidad',
          field: 'quantity',
          html: true
        }
      ],
      rows: [],
      createRow: false,
      percentaje: null,
      category: null,
      price: null,
      code: null,
      unity: null,
      name: null,
      categoryName: null,
      typeRow: null,
      dataRow: null,
      rowMaterialSummary: null,
      total: null
    }
  },
  watch: {
    data (newValue, oldValue) {
      this.name = this.data.name
      this.code = this.data.code
      this.percentaje = this.data.profit
      this.price = this.data.price
      this.category = this.data.category
      this.total = this.data.sellPrice
      this.rowMaterialSummary = [...this.data.rowMaterialSummary]
      this.createRows(this.rowMaterialSummary)
    }
  },
  props: {
    showModal: {
      type: Boolean,
      default: false
    },
    categories: {
      type: Array,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    data: {
      type: Object,
      required: true
    }
  },
  methods: {
    async deleteProduct () {
      const data_coming = await configService.delete(`admin/products/${this.data.id}`)
      this.$emit('reset', data_coming.data)
      this.$emit('toggle-modal') 
    },

    closeCreateRow () {
      this.createRow = false
      this.typeRow = null
      this.dataRow = null
    },
    async openModal (value) {
      if (value.column.field === 'quantity') {
        this.typeRow = 'edit'
        let data_row = this.rowMaterialSummary.find(rowProduct => rowProduct.product_row_material_id === value.row.id)
        this.dataRow = {id: value.row.id, quantity: data_row.quantity, name: value.row.name}
        this.createRow = true
      }

      if (value.column.field === 'name') {
        let response = await configService.delete(`/admin/product_row_materials/${value.row.id}`)
        this.updateTable(response.data)
      }
    },
    updateRow (product) {
      this.total = product.price
      this.rowMaterialSummary = [...product.row_material_summary]
      this.createRows(product.row_material_summary)
    },
    createRows (array) {
      this.rows = []
      for (let rowMaterial of array) {
        this.rows.push({
        id: rowMaterial.product_row_material_id,
        name: rowMaterial.name + ' <div class="edit"> Eliminar </div>',
        code: rowMaterial.code,
        unity: rowMaterial.unity,
        price: rowMaterial.price,
        quantity: rowMaterial.quantity + ' <div class="edit"> Editar </div>'
        })
      }
    },
    updateTable (value) {
      this.$emit('remplace-category', value)
      this.updateRow(value)
    },
    async sendCategoryName () {
      try {
        const data = {
          category_product: {
            name: this.categoryName
          }
        }
        const data_coming = await configService.post('admin/category_products', data)
        this.$emit('toggle-modal')
        this.$emit('push-category', data_coming.data)
      } catch (error) {
        console.log(error)
      }
    },
    closeModal () {
      this.$emit('toggle-modal')
      this.price = null 
      this.name = null
      this.code = null
      this.unity = null
      this.category = null
      this.rows = []
    },
    async sendProduct () {
      parseInt
      const data = {
        product: {
          profit_rate: parseFloat(this.percentaje),
          name: this.name,
          code: this.code
        }
      }
      if (this.type === 'edit') data.product.category_product_id = this.category.value
      try {
        const message = this.type === 'edit' ? 'Producto editado!' : 'Producto creado!'
        const  data_coming  = this.type === 'edit' ? 
        await configService.put(`admin/products/${this.data.id}`, data) :
        await configService.post(`admin/category_products/${this.category.value}/products`, data)
        this.$emit('reset', data_coming.data)
        this.$emit('toggle-modal') 
        this.name = null
        this.code = null
        this.percentaje = null
        this.category = null
        this.$swal({
          position: 'center',
          type: 'success',
          title: message,
          showConfirmButton: false,
          timer: 1500
        })
      } catch (error) {
        console.log(error)
      }
     
    }
  }
}
</script>

<style lang="scss">
  .edit {
    cursor: pointer;
  }

  .percentage-input {
    width: 80%;

    input {
      width: 50% !important;
      margin: 10px
    }
  }

  .porcentage-label {
    width: 10%;
    margin: 0% !important;
  }
</style>

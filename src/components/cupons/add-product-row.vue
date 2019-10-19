<template>
  <section
    v-if="rowMaterials"
    :class="{ 'modal-ceu__show': showModal }"
    class="modal-ceu modal-edit">
    <div
      @click="closeModal"
      class="modal-ceu__overley"/>
    <div class="modal-ceu__content coupon__modal medium add-row">
      <div
        @click="closeModal"
        class="modal-ceu__close">
        <i class="ceu-icon-close" />
      </div>
      <form @submit.prevent="createProductRow">
        <div class="secondary-container">
          <div class="ads-banner__dateLimit-item ceu-item  options-container">
          <div v-if="type !== 'edit'">
            <v-select
            required
            class="search-select"
            v-model="rowMaterial"
            :options="rowMaterials"/>
          </div>
          <p>Cantidad</p>
          <input
            required
            step="any"
            v-model="setQuantity">
        </div> 
        <div class="ceu-campo__text-round3 ceu-item s-100">
          <div
            @click="closeModal"
            class="ceu-btn2 black">
            Cancelar
          </div>
          <button
            type="submit"
            class="ceu-btn1">
            {{ this.type === 'edit' ? 'Editar Materia Prima' : 'Agregar materia prima'}}
          </button>
        </div>
        </div>
      </form>
      <div class="ads-banner__dateLimit-item ceu-item  s-50">
        <button>

        </button>
      </div>
      
    </div>
  </section>
</template>

<script>
import { VueGoodTable } from 'vue-good-table'
import configService from '../../settings/api-url'
export default {
  data () {
    return {
      quantity: 0,
      rowMaterials: [],
      rowMaterial: null
    }
  },
  components: {
    VueGoodTable
  },
  computed: {
    setQuantity: {
      get () {
        if (this.type === 'edit') return this.dataRow.quantity
        return this.quantity
      },
      set (value) {
        this.quantity = value
      }
    }
  },
  methods: {
    closeModal () {
      this.$emit('close')
    },
    async createProductRow () {
      let response = {}
      const info = {
        product_row_material: {
          quantity: this.quantity
        }
      }
      try {
        if (this.type == 'edit') {
          if (!info.product_row_material.quantity) info.product_row_material.quantity = this.dataRow.quantity
          response  = await configService.put(`/admin/product_row_materials/${this.dataRow.id}`, info)
        } else {
          response = await configService.post(`/admin/products/${this.productId}/row_materials/${this.rowMaterial.value}/product_row_materials`, info)
        }
        this.quantity = null
        this.rowMaterial = null
        this.$swal({
          position: 'center',
          type: 'success',
          title: this.type === 'edit' ? 'Materia prima editada!' : 'Materia prima agregada!',
          showConfirmButton: false,
          timer: 1500
        })
        this.$emit('update-data', response.data)
        this.$emit('close')
      }
      catch (error) {
        this.$swal({
          position: 'center',
          type: 'error',
          title: 'Se ha producido un error',
          showConfirmButton: false,
          timer: 1500
        })
      }
    }
  },
  props: {
    showModal: {
      type: Boolean,
      default: false
    },
    productId: {
      type: Number,
      required: true
    },
    type: {
      type: String,
      default: 'create'
    },
    dataRow: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  async created () {
    const { data } = await configService('admin/category_row_materials')
    for (const categoryMaterial of data) {
      if (categoryMaterial.row_materials.length !== 0) {
        for (const rowMaterial of categoryMaterial.row_materials) {
          this.rowMaterials.push({label: rowMaterial.name,value: rowMaterial.id })
        }
      }
    }
  }
}
</script>

<style scoped>
  .add-row {
    height: 400px;
  }

  .options-container {
    display: flex;
    justify-content: space-around;
  }

  .secondary-container {
    height: 350px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

  }
</style>

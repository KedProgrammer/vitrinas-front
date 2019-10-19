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
        @submit.prevent="sendRowMaterial"
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
              <p>Valor</p>
              <input
                required
                v-model="price"
                step="any"
                type="number">
            </div>
            <div class="ceu-campo__text-round3 ceu-item s-50">
              <p>Unidad</p>
              <input
                required
                v-model="unity">
            </div>
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
            {{ type === 'edit' ? 'Editar materia Prima' : 'Crear Materia prima'}}
          </button>
          <button 
            class="ceu-btn1"
            @click.prevent="reset">
            Eliminar Materia Prima
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
  </section>
</template>

<script>
import configService from '../../settings/api-url'
export default {
  data () {
    return {
      category: null,
      price: null,
      code: null,
      unity: null,
      name: null,
      categoryName: null
    }
  },
  watch: {
    data (newValue, oldValue) {
      this.name = this.data.name
      this.code = this.data.code
      this.unity = this.data.unity
      this.price = this.data.price
      this.category = this.data.category
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
    async reset () {
      const data_coming = await configService.delete(`admin/row_materials/${this.data.id}`)
      this.$emit('reset', data_coming.data)
      this.$emit('toggle-modal')
    },
    async sendCategoryName () {
      try {
        const data = {
          category_row_material: {
            name: this.categoryName
          }
        }
        const data_coming = await configService.post('admin/category_row_materials', data)
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
    },
    async sendRowMaterial () {
      const data = {
        row_material: {
          name: this.name,
          price: this.price,
          unity: this.unity,
          code: this.code
        }
      }
      if (this.type === 'edit') data.row_material.category_row_material_id = this.category.value
      try {
        const message = this.type === 'edit' ? 'Materia prima editada!' : 'Materia prima creada!'
        const  data_coming  = this.type === 'edit' ? 
        await configService.put(`admin/row_materials/${this.data.id}`, data) :
        await configService.post(`admin/category_row_materials/${this.category.value}/row_materials`, data)
        this.$emit('remplace-category', data_coming.data)
        this.$emit('toggle-modal')
        this.price = null 
        this.name = null
        this.code = null
        this.unity = null
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

<style>

</style>

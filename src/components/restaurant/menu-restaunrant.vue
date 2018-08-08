<template>
  <section
    :class="{ 'modal-ceu__show': showModal }"
    class="modal-ceu modal-edit__menu">
    <div
      @click="toggleShow"
      class="modal-ceu__overley"/>
    <div class="modal-ceu__content modal-ceu__menu-restaurant xmedium">
      <div
        @click="toggleShow"
        class="modal-ceu__close">
        <i class="ceu-icon-close" />
      </div>
      <div class="menu-restaurant__content">
        <div class="menu-restaurant-panels">
          <div class="menu-restaurant__panel ceu-item s-50 no-padding">
            <div class="menu-restaurant__panel-title">
              <h5>Categorías</h5>
            </div>
            <div class="menu-restaurant__panel-list">
              <!-- item -->
              <div
                v-for="(item, index) in categories"
                v-if="!item.is_deleted"
                :key="index"
                :class="{'active': item.id === idCategoryPlate}"
                class="menu-restaurant__panel-item">
                <div class="menu-restaurant__panel-edit-delete">
                  <div
                    @click="deleteCategory(item.id)"
                    class="menu-restaurant__panel-delete">
                    <i class="ceu-icon-garbage" />
                  </div>
                  <div
                    @click="toggleShowCategory(item.id)"
                    class="menu-restaurant__panel-edit">
                    <i class="ceu-icon-settings" />
                  </div>
                </div>
                <div class="menu-restaurant__panel-item-info">
                  <div class="menu-restaurant__panel-nombre">
                    {{ item.name }}
                  </div>
                  <div class="menu-restaurant__panel-active">
                    <div class="admin-tabla__turno-checkbox">
                      <input
                        type="checkbox"
                        v-model="modelCaregoryChecked[index]"
                        @click="activeCategory($event.target.checked, item.id)"
                        :id="'menu-restaurant__category_' + item.id">
                      <label
                        :for="'menu-restaurant__category_' + item.id"
                        data-si="On"
                        data-no="Off"/>
                    </div>
                  </div>
                  <div
                    @click="showPlates(item.id, index)"
                    class="menu-restaurant__panel-arrow">
                    <i class="ceu-icon-arrow-right" />
                  </div>
                </div>
              </div>
            </div>
            <!-- Añadir -->
            <div
              @click="toggleShowCategory(0)"
              class="menu-restaurant__panel-btn">
              Añadir Categoría
            </div>
          </div>
          <div class="menu-restaurant__panel ceu-item s-50 no-padding">
            <div class="menu-restaurant__panel-title">
              <h5>Platos</h5>
            </div>
            <div class="menu-restaurant__panel-list platos">
              <!-- item -->
              <div
                v-for="(item, index) in products"
                :key="index"
                class="menu-restaurant__panel-item">
                <div class="menu-restaurant__panel-edit-delete one">
                  <div
                    @click="deletePlate(item.id)"
                    class="menu-restaurant__panel-delete">
                    <i class="ceu-icon-garbage" />
                  </div>
                  <div
                    @click="toggleShowPlate(item.id)"
                    class="menu-restaurant__panel-edit">
                    <i class="ceu-icon-settings" />
                  </div>
                </div>
                <div class="menu-restaurant__panel-item-info">
                  <div class="menu-restaurant__panel-nombre">
                    {{ item.name }}
                  </div>
                  <div class="menu-restaurant__panel-active">
                    <div
                      data-id=""
                      class="admin-tabla__turno-checkbox">
                      <input
                        type="checkbox"
                        v-model="modelPlateChecked[index]"
                        @click="activePlate($event.target.checked, item.id)"
                        :id="'menu-restaurant__plate_' + item.id">
                      <label
                        :for="'menu-restaurant__plate_' + item.id"
                        data-si="On"
                        data-no="Off"/>
                    </div>
                  </div>
                  <!-- <div class="menu-restaurant__panel-arrow">
                    <i class="ceu-icon-arrow-right" />
                  </div> -->
                </div>
              </div>
            </div>
            <!-- Añadir -->
            <div
              @click="toggleShowPlate(0)"
              :class="{'disable': idCategoryPlate === 0}"
              class="menu-restaurant__panel-btn">
              Añadir Plato
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- promo -->
    <Promo
      @toggle-show-promo="toggleShowPromo"
      :id-commerce="idCommerce"
      :show-modal-promo="showModalPromo" />
    <!-- modifier -->
    <Modifier
      @toggle-show-modifier="toggleShowModifier"
      :id-commerce="idCommerce"
      :show-modal-modifier="showModalModifier" />
    <!-- category -->
    <Category
      @toggle-show-category="toggleShowCategory"
      @get-category="getCategory"
      :id-commerce="idCommerce"
      :id-category="idCategory"
      :show-modal-category="showModalCategory" />
    <!-- Plate -->
    <Plate
      @toggle-show-plate="toggleShowPlate"
      :id-commerce="idCommerce"
      :id-plate="idPlate"
      @create-product="showPlates(idCategoryPlate)"
      :id-category="idCategoryPlate"
      :show-modal-plate="showModalPlate"
      :promo-to-show="promoToShow"
    />
  </section>
</template>

<script>
import Promo from './promo.vue'
import Modifier from './modifier-group.vue'
import Category from './category'
import Plate from './plate.vue'
import configService from '../../settings/api-url'

export default {
  name: 'MenuRestaurant',
  props: {
    showModal: {
      type: Boolean,
      default: false
    },
    idCommerce: {
      type: Number,
      default: 0
    }
  },
  watch: {
    showModal (valNew) {
      if (valNew) {
        this.getCategory()
      } else {
        this.emptyVal()
      }
    }
  },
  components: {
    Promo,
    Modifier,
    Category,
    Plate
  },
  data () {
    return {
      promoToShow: {},
      dayWeeks: [
        {value: 0, label: 'Domingo'},
        {value: 1, label: 'Lunes'},
        {value: 2, label: 'Martes'},
        {value: 3, label: 'Miercoles'},
        {value: 4, label: 'Jueves'},
        {value: 5, label: 'Viernes'},
        {value: 6, label: 'Sabado'}
      ],
      days: [],
      showModalPromo: false,
      showModalModifier: false,
      showModalCategory: false,
      showModalPlate: false,
      categories: [],
      products: '',
      idCategory: 0,
      idPlate: 0,
      idCategoryPlate: 0,
      modelPlateChecked: [],
      modelCaregoryChecked: []
    }
  },
  methods: {
    emptyVal () {
      this.categories = []
      this.products = []
      this.idCategoryPlate = 0
    },
    getCategory () {
      this.categories = []
      configService(`/central_admin/commerces/${this.idCommerce}/categories`)
        .then(res => {
          const data = res.data
          for (let index = 0; index < data.length; index++) {
            let dataPosition = data[index]
            this.categories.push(dataPosition)
            this.modelCaregoryChecked.push(dataPosition.is_active)
          }
        })
        .catch(error => {
          console.log(error.response.data)
        })
    },
    activeCategory (event, id) {
      configService(`/central_admin/categories/${id}`, {
        method: 'PUT',
        data: {
          'category': {
            'is_active': event
          }
        }
      })
        .then(res => {
          console.log(res)
        })
        .catch(error => {
          console.log(error.response.data)
        })
    },
    deleteCategory (id) {
      this.$swal({
        type: 'question',
        title: 'Estas Seguro?',
        showCancelButton: true,
        reverseButtons: true,
        confirmButtonText: 'Si'
      })
        .then((result) => {
          if (result.value === true) {
            configService(`/central_admin/categories/${id}`, {
              method: 'PUT',
              data: {
                'category': {
                  'is_deleted': true
                }
              }
            })
              .then(res => {
                this.getCategory()
                this.$swal({
                  type: 'success',
                  title: 'Eliminado!',
                  showConfirmButton: false,
                  timer: 2000
                })
              })
              .catch(error => {
                this.$swal({
                  type: 'error',
                  title: 'Oops...',
                  text: 'Vuelve a Intentarlo'
                })
                console.log(error.response.data)
              })
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    activePlate (event, id) {
      configService(`/central_admin/products/${id}`, {
        method: 'PUT',
        data: {
          'product': {
            'is_available': event
          }
        }
      })
        .then(res => {
          console.log(res)
        })
        .catch(error => {
          console.log(error.response.data)
        })
    },
    deletePlate (id) {
      this.$swal({
        type: 'question',
        title: 'Estas Seguro?',
        showCancelButton: true,
        reverseButtons: true,
        confirmButtonText: 'Si'
      })
        .then((result) => {
          if (result.value === true) {
            configService(`/central_admin/products/${id}`, {
              method: 'PUT',
              data: {
                'product': {
                  'is_deleted': true
                }
              }
            })
              .then(res => {
                this.showPlates(this.idCategoryPlate)
                this.$swal({
                  type: 'success',
                  title: 'Eliminado!',
                  showConfirmButton: false,
                  timer: 2000
                })
              })
              .catch(error => {
                this.$swal({
                  type: 'error',
                  title: 'Oops...',
                  text: 'Vuelve a Intentarlo'
                })
                console.log(error.response.data)
              })
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    showPlates (id) {
      this.idCategoryPlate = id
      this.products = []
      configService(`central_admin/categories/${id}/products.json`)
        .then(res => {
          const data = res.data
          for (let index = 0; index < data.length; index++) {
            let dataPosition = data[index]
            this.products.push(dataPosition)
            this.modelPlateChecked.push(dataPosition.is_activated)
          }
        })
        .catch(error => {
          console.log(error.response.data)
        })
    },
    toggleShow () {
      this.$emit('toggle-menu-restaurant')
    },
    toggleShowPromo () {
      this.showModalPromo = !this.showModalPromo
    },
    toggleShowPlate (id) {
      if (id !== undefined) {
        configService(`central_admin/products/${id}`)
          .then(response => {
            this.promoToShow = response.data.promos[0]
          })
          .catch(error => {
            console.log(error)
          })
      }
      this.idPlate = id
      if (this.idCategoryPlate !== 0) {
        this.showModalPlate = !this.showModalPlate
      }
    },
    toggleShowCategory (id) {
      this.idCategory = id
      this.showModalCategory = !this.showModalCategory
    },
    toggleShowModifier () {
      this.showModalModifier = !this.showModalModifier
    }
  }
}
</script>

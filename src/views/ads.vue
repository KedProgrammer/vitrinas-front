<template>
  <main class="admin-hoy__main">
    <Menu />
    <div class="view-ads__contenedor ceu-container2">
      <!-- crear banner -->
      <div class="ceu-item s-50">
        <div class="ads-banner">
          <!-- item -->
          <div class="ads-banner__titulo">
            <h4>Crear Banner</h4>
            <p><strong>Formato:</strong> .png, .jpg, .jpeg | 1920 * 640px</p>
          </div>
          <div class="ads-banner__contenedor ceu-container2">
            <div class="restaurant-edit__banner-upload ceu-item s-45">
              <div class="restaurant-edit__upload-file">
                <div
                  :style="{backgroundImage: 'url(' + modelCreateBannerImg + ')'}"
                  class="restaurant-edit__upload-image" />
                <label for="ads-bannerAdd">
                  Upload
                </label>
                <input
                  id="ads-bannerAdd"
                  @change="fileImage('banner', $event.target.files)"
                  accept="image/*"
                  type="file">
              </div>
            </div>
            <div class="ads-banner__dateLimit ceu-item s-55">
              <div class="ads-banner__dateLimit-item">
                <p>Fecha Inicial</p>
                <datetime
                  type="datetime"
                  v-model="formatDateStart" />
              </div>
              <div class="ads-banner__dateLimit-item">
                <p>Fecha Final</p>
                <datetime
                  type="datetime"
                  v-model="formatDateEnd" />
              </div>
            </div>
            <div class="ads-banner__toggleShow ceu-item s-50">
              <p>Activar/Desactivar</p>
              <div
                class="admin-tabla__turno-checkbox">
                <input
                  type="checkbox"
                  v-model="openBanner"
                  id="openBanner">
                <label
                  for="openBanner"
                  data-si="On"
                  data-no="Off"/>
              </div>
            </div>
            <div class="ads-banner__checkRestaurant ceu-item s-50">
              <p>Restaurante</p>
              <multiselect
                class="custom-select2"
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
          <div class="restaurant-edit__item-footer">
            <div
              @click="postBannerSchedules"
              class="ceu-btn1">
              +Añadir Banner
            </div>
          </div>
        </div>
      </div>
      <div class="ceu-item s-50">
        <div
          v-if="listBanenrShedule.length !== 0"
          class="ads-banner__titulo">
          <h4>Banners</h4>
          <p><strong>Formato:</strong> .png, .jpg, .jpeg | 1920 * 640px</p>
        </div>

        <div class="ads-banner">
          <!-- item -->
          <div class="ads-banner__list">
            <!-- item -->
            <div
              v-for="(item, index) in listBanenrShedule"
              :key="index"
              class="restaurant-edit__banner-list-item ceu-container2">
              <div class="restaurant-edit__banner-upload ceu-item s-45">
                <div class="restaurant-edit__upload-file">
                  <div
                    :style="{backgroundImage: 'url(' + modelBannerImg[index] + ')'}"
                    class="restaurant-edit__upload-image" />
                  <label :for="'ads-bannerAdd' + index">
                    Upload
                  </label>
                  <input
                    :id="'ads-bannerAdd' + index"
                    @change="fileImage('banner', $event.target.files, index)"
                    accept="image/*"
                    type="file">
                </div>
              </div>
              <div class="ads-banner__dateLimit ceu-item s-55">
                <div class="ads-banner__dateLimit-item">
                  <p>Fecha Inicial</p>
                  <datetime
                    type="datetime"
                    v-model="formatMultiDateStart[index]" />
                </div>
                <div class="ads-banner__dateLimit-item">
                  <p>Fecha Final</p>
                  <datetime
                    type="datetime"
                    v-model="formatMultiDateEnd[index]" />
                </div>
              </div>
              <div class="ads-banner__toggleShow ceu-item s-50">
                <p>Activar/Desactivar</p>
                <div
                  class="admin-tabla__turno-checkbox">
                  <input
                    type="checkbox"
                    v-model="openMultiBanner[index]"
                    :id="'openBanner' + index">
                  <label
                    :for="'openBanner' + index"
                    data-si="On"
                    data-no="Off"/>
                </div>
              </div>
              <div class="ads-banner__checkRestaurant ceu-item s-50">
                <p>Restaurante</p>
                <multiselect
                  class="custom-select2"
                  v-model="restaurantMulti[index]"
                  :options="restaurants"
                  :searchable="true"
                  :show-labels="false"
                  label="label"
                  track-by="value"
                  @select="selectRestaurant"
                  placeholder="Buscar Restaurante..." />
              </div>

              <div class="restaurant-edit__item-footer">
                <div
                  @click="putBannerSchedules(item.id, index)"
                  class="ceu-btn2">
                  Guardar Cambios
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Menu from '../components/layout/Menu'
import configService from '../settings/api-url'
export default {
  name: 'Ads',
  computed: {
    ...mapState(['university', 'commerces', 'commerce', 'universityData'])
  },
  components: {
    Menu
  },
  mounted () {
    this.$nextTick(function () {
      this.getBannerShedules()
      this.getCommerces()
    })
  },
  data () {
    return {
      openBanner: false,
      formatDateStart: '',
      formatDateEnd: '',
      listBanenrShedule: [],
      formatMultiDateStart: [],
      formatMultiDateEnd: [],
      modelBannerImg: [],
      modelCreateBannerImg: '',
      currentCommerce: 0,
      restaurants: [],
      restaurant: {},
      restaurantMulti: [],
      openMultiBanner: []
    }
  },
  watch: {
    university () {
      this.getBannerShedules()
    }
  },
  methods: {
    ...mapActions(['universityDataActions', 'loadUserAction', 'updateCommercesAsync', 'updateCommerceAsync']),
    fileImage (origin, file, position = '') {
      const reader = new FileReader()
      const self = this
      reader.addEventListener('load', function () {
        if (origin === 'banner' && position !== '') {
          self.$set(self.modelBannerImg, position, reader.result)
        }

        if (origin === 'banner' && position === '') {
          self.modelCreateBannerImg = reader.result
        }
      }, false)

      if (file[0]) {
        reader.readAsDataURL(file[0])
      }
    },
    getBannerShedules () {
      // limpiar datos
      this.listBanenrShedule = []
      this.formatMultiDateStart = []
      this.formatMultiDateEnd = []
      this.modelBannerImg = []
      this.openMultiBanner = []
      this.restaurantMulti = []
      configService(`/central_admin/universities/${this.university.id}/advertisements`)
        .then(res => {
          const self = this
          const data = res.data
          for (let index = 0; index < data.length; index++) {
            // self.listBanenrShedule[index] = data[index]
            self.$set(self.listBanenrShedule, index, data[index])
            self.$set(self.formatMultiDateStart, index, data[index].start_date)
            self.$set(self.formatMultiDateEnd, index, data[index].end_date)
            self.$set(self.modelBannerImg, index, data[index].banner_file.url)
            self.openMultiBanner.push(data[index].is_published)
            this.updateCommerceAsync(data[index].commerce_id)
              .then(res => {
                this.restaurantMulti.push({
                  label: res.data.commercial_name,
                  value: res.data.id
                })
              })
          }
        })
    },
    postBannerSchedules () {
      configService(`/central_admin/universities/${this.university.id}/advertisements`, {
        method: 'POST',
        data: {
          'advertisement': {
            'commerce_id': this.currentCommerce,
            'banner_file': this.modelCreateBannerImg,
            'start_date': this.formatDateStart,
            'end_date': this.formatDateEnd,
            'is_published': this.openBanner
          }
        }
      })
        .then(res => {
          this.$swal({
            type: 'success',
            title: 'Banner Creado!',
            timer: 2000,
            showConfirmButton: false
          })
          this.getBannerShedules()
        })
        .catch(error => {
          console.log(error.response.data)
          this.$swal({
            type: 'error',
            title: 'Oops!',
            text: error.response.data.message
          })
        })
    },
    putBannerSchedules (id, position) {
      var data = ''
      if (this.modelBannerImg[position].includes('https://')) {
        data = {
          'advertisement': {
            'start_date': this.formatMultiDateStart[position],
            'end_date': this.formatMultiDateEnd[position],
            'commerce_id': this.restaurantMulti[position].value,
            'is_published': this.openMultiBanner[position]
          }
        }
      } else {
        data = {
          'advertisement': {
            'start_date': this.formatMultiDateStart[position],
            'end_date': this.formatMultiDateEnd[position],
            'banner_file': this.modelBannerImg[position],
            'commerce_id': this.restaurantMulti[position].value,
            'is_published': this.openMultiBanner[position]
          }
        }
      }
      configService(`/central_admin/universities/${this.university.id}/advertisements/${id}`, {
        method: 'PUT',
        data: data
      })
        .then(res => {
          this.$swal({
            type: 'success',
            title: 'Cambios Aplicados!',
            timer: 2000,
            showConfirmButton: false
          })
        })
        .catch(error => {
          console.log(error.response.data)
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
        })
    },
    selectRestaurant (e) {
      this.currentCommerce = e.value
    }
  }
}
</script>

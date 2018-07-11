<template>
  <section
    :class="{ 'modal-ceu__show': showModal }"
    class="modal-ceu modal-edit">
    <div
      @click="toggleShow"
      class="modal-ceu__overley"/>
    <div class="modal-ceu__content xlarge">
      <div
        @click="toggleShow"
        class="modal-ceu__close">
        <i class="ceu-icon-close" />
      </div>
      <div class="modal-edit__content ceu-container full">
        <div class="ceu-item s-55">
          <form
            @submit.prevent="sendFormServices"
            class="restaurant-edit__name-service-logo">
            <!-- upload logo -->
            <div class="restaurant-edit__logo ceu-item s-30">
              <div
                :style="{backgroundImage: 'url(' + formServices.background_imageUrl + ')'}"
                class="restaurant-edit__bg-img">
                <img :src="formServices.perfil">
                <!-- <div
                  :style="{backgroundImage: 'url(' +  + ')'}"
                  class="restaurant-edit__logo-img" /> -->
              </div>
              <div class="restaurant-edit__title-upload">
                Upload
              </div>
              <div class="restaurant-edit__contenedor-upload">
                <div class="restaurant-edit__logo-upload">
                  <label for="uploadLogo">
                    Logo
                  </label>
                  <input
                    id="uploadLogo"
                    @change="fileImage('logo', $event.target.files)"
                    accept="image/*"
                    type="file">
                </div>
                <div class="restaurant-edit__logo-upload">
                  <label for="uploadBg">
                    Fondo
                  </label>
                  <input
                    id="uploadBg"
                    @change="fileImage('imageBg', $event.target.files)"
                    accept="image/*"
                    type="file">
                </div>
              </div>
              <div class="restaurant-edit__logo-info">
                <strong>Formato logo:</strong> .png 500*500px
              </div>
            </div>
            <!-- servicios - name -->
            <div class="restaurant-edit__servicios-name ceu-item s-70">
              <!-- name -->
              <div class="restaurant-edit__name">
                <h2>{{ formData.commercial_name }}</h2>
                <!-- <div class="restaurant-edit__descontinuado">
                  <p>Continuado/Descontinuado</p>
                  <div class="lista-checkbox2 large">
                    <input
                      v-model="formServices.active"
                      id="restaurant-edit__descontinuado"
                      type="checkbox">
                    <label
                      data-checkedsi="On"
                      data-checkedno="Off"
                      for="restaurant-edit__descontinuado" />
                  </div>
                </div> -->
                <div class="restaurant-edit__edit-menu">
                  Editar Menú
                </div>
              </div>
              <!-- servicios -->
              <div class="restaurant-edit__servicios">
                <h5>Servicios</h5>
                <!-- servicio -->
                <div class="restaurant-edit__servicio">
                  <div class="ceu-checkbox">
                    <input
                      id="edit-restaurant__domicilios"
                      v-model="formServices.has_delivery"
                      type="checkbox">
                    <label for="edit-restaurant__domicilios">
                      <span />
                      Domicilios
                    </label>
                  </div>
                  <div class="restaurant-edit__servicio-porcentaje">
                    <div class="ceu-campo__text-round2">
                      <input
                        v-model="formServices.delivery_fee"
                        maxlength="2"
                        min="1"
                        type="number">%
                    </div>
                  </div>
                </div>
                <!-- servicio -->
                <div class="restaurant-edit__servicio">
                  <div class="ceu-checkbox">
                    <input
                      id="edit-restaurant__takeout"
                      v-model="formServices.has_takeout"
                      type="checkbox">
                    <label for="edit-restaurant__takeout">
                      <span />
                      Take-out
                    </label>
                  </div>
                  <div class="restaurant-edit__servicio-porcentaje">
                    <div class="ceu-campo__text-round2">
                      <input
                        v-model="formServices.takeout_fee"
                        maxlength="2"
                        min="1"
                        type="number">%
                    </div>
                  </div>
                </div>
                <!-- servicio -->
                <div class="restaurant-edit__servicio">
                  <div class="ceu-checkbox">
                    <input
                      v-model="formServices.has_market"
                      id="edit-restaurant__mercadillo"
                      type="checkbox">
                    <label for="edit-restaurant__mercadillo">
                      <span />
                      Mercadillo
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div class="restaurant-edit__footer cross-center">
              <p v-if="loadUpload.logo">
                {{ loadUpload.logo }}
              </p>
              <button
                type="submit"
                class="ceu-btn1">
                Guardar
              </button>
            </div>
            <!--. servicios - name-->
          </form>
          <!-- horarios apertura y cierre-->
          <div class="restaurant-edit__horarios">
            <h3 v-if="listOpenTime.length !== 0">HORARIOS DE APERTURA</h3>
            <div class="restaurant-edit__horarios-apertura">
              <div class="restaurant-edit__list">
                <div
                  v-for="(item, index) in listOpenTime"
                  :key="index"
                  class="restaurant-edit__list-item">
                  <div class="ceu-campo__hStart-hEnd">
                    <p>Hora inicial</p>
                    <vue-timepicker
                      hide-clear-button
                      v-model="modelOpenTime[index].start_time"
                      :format="formatTime"/>
                    <p>Hora final</p>
                    <vue-timepicker
                      v-model="modelOpenTime[index].end_time"
                      hide-clear-button
                      :format="formatTime"/>
                  </div>
                  <div class="restaurant-edit__dias-semana">
                    <p>Dias de la semana</p>
                    <multiselect
                      class="custom-select3"
                      v-model="modelOpenDays[index]"
                      :options="dayWeeks"
                      :searchable="false"
                      :close-on-select="false"
                      :show-labels="false"
                      :multiple="true"
                      label="label"
                      track-by="value"
                      placeholder="Multi Selección" />
                  </div>
                  <div class="restaurant-edit__item-footer">
                    <div
                      @click="deleteOpenSchedules(item.id, index)"
                      class="ceu-btn2 alert">
                      Eliminar
                    </div>
                    <div
                      @click="putOpenSchedules(item.id, index)"
                      class="ceu-btn2">
                      Guardar Cambios
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="restaurant-edit__horarios-crear">
              <h3>Crear horario de apertura</h3>
              <div class="restaurant-edit__list-item">
                <div class="ceu-campo__hStart-hEnd">
                  <p>Hora inicial</p>
                  <vue-timepicker
                    hide-clear-button
                    v-model="openingHours.start_time"
                    :format="formatTime"/>
                  <p>Hora final</p>
                  <vue-timepicker
                    v-model="openingHours.end_time"
                    hide-clear-button
                    :format="formatTime"/>
                </div>
                <div class="restaurant-edit__dias-semana">
                  <p>Dias de la semana</p>
                  <multiselect
                    class="custom-select3"
                    v-model="days"
                    :options="dayWeeks"
                    :searchable="false"
                    :close-on-select="false"
                    :show-labels="false"
                    :multiple="true"
                    label="label"
                    track-by="value"
                    placeholder="Multi Selección" />
                </div>
                <div class="restaurant-edit__item-footer">
                  <div
                    @click="postOpenSchedules"
                    class="ceu-btn1">
                    +Añadir Horario
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Banner apoyo -->
          <div class="restaurant-edit__add-banner">
            <div
              v-if="listBanenrShedule.length !== 0"
              class="restaurant-edit__add-banner-titulo">
              <h4>Banners</h4>
            </div>
            <div class="restaurant-edit__banner-list">
              <!-- item -->
              <div
                v-for="(item, index) in listBanenrShedule"
                :key="index"
                class="restaurant-edit__banner-list-item">
                <div class="restaurant-edit__banner-upload">
                  <div class="restaurant-edit__upload-file">
                    <div
                      :style="{backgroundImage: 'url(' + modelBannerImg[index] + ')'}"
                      class="restaurant-edit__upload-image" />
                    <label :for="'restaurant-edit__banner-input' + index">
                      Upload
                    </label>
                    <input
                      :id="'restaurant-edit__banner-input' + index"
                      @change="fileImage('banner', $event.target.files, index)"
                      accept="image/*"
                      type="file">
                  </div>
                  <div class="restaurant-edit__upload-horarios ceu-campo__hStart-hEnd">
                    <div class="restaurant-edit__upload-horarios-item">
                      <p>Hora inicial</p>
                      <vue-timepicker
                        hide-clear-button
                        v-model="modelBannerTime[index].start_time"
                        :format="formatTime"/>
                    </div>
                    <div class="restaurant-edit__upload-horarios-item">
                      <p>Hora final</p>
                      <vue-timepicker
                        hide-clear-button
                        v-model="modelBannerTime[index].end_time"
                        :format="formatTime"/>
                    </div>
                  </div>
                </div>
                <div class="restaurant-edit__banner-horaios">
                  <div class="restaurant-edit__banner-description">
                    <div class="ceu-campo__text-round2">
                      <p>Descripción</p>
                      <input
                        v-model="item.description"
                        type="text">
                    </div>
                  </div>
                </div>
                <div class="restaurant-edit__item-footer">
                  <div
                    @click="deleteBannerSchedules(item.id)"
                    class="ceu-btn2 alert">
                    Eliminar
                  </div>
                  <div
                    @click="putBannerSchedules(item.id, index)"
                    class="ceu-btn2">
                    Guardar Cambios
                  </div>
                </div>
              </div>
            </div>
            <!-- item -->
            <div class="restaurant-edit__add-banner-titulo">
              <h4>Crear Banner</h4>
              <p><strong>Formato:</strong> .png, .jpg, .jpeg | 1920 * 640px</p>
            </div>
            <div class="restaurant-edit__banner-list-item">
              <div class="restaurant-edit__banner-upload">
                <div class="restaurant-edit__upload-file">
                  <div
                    :style="{backgroundImage: 'url(' + modelCreateBannerImg + ')'}"
                    class="restaurant-edit__upload-image" />
                  <label for="restaurant-edit__modelCreateBannerImg">
                    Upload
                  </label>
                  <input
                    id="restaurant-edit__modelCreateBannerImg"
                    @change="fileImage('banner', $event.target.files)"
                    accept="image/*"
                    type="file">
                </div>
                <div class="restaurant-edit__upload-horarios ceu-campo__hStart-hEnd ceu-campo__hStart-hEnd--start">
                  <div class="restaurant-edit__upload-horarios-item">
                    <p>Hora inicial</p>
                    <vue-timepicker
                      hide-clear-button
                      v-model="modelCreateBannerTime.start_time"
                      :format="formatTime"/>
                  </div>
                  <div class="restaurant-edit__upload-horarios-item">
                    <p>Hora final</p>
                    <vue-timepicker
                      hide-clear-button
                      v-model="modelCreateBannerTime.end_time"
                      :format="formatTime"/>
                  </div>
                </div>
              </div>
              <div class="restaurant-edit__banner-horaios">
                <div class="restaurant-edit__banner-description">
                  <div class="ceu-campo__text-round2">
                    <p>Descripción</p>
                    <input
                      v-model="modelCreateBannerDescription"
                      type="text">
                  </div>
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
        </div>
        <div class="ceu-item s-45">
          <div class="restaurant-edit__direccion">
            <div class="restaurant-edit__search-map">
              <p>Dirección</p>
              <div class="ceu-campo__text-round2">
                <gmap-autocomplete
                  v-model="formData.address"
                  @place_changed="setPlace" />
              </div>
            </div>
            <gmap-Map
              style="width: 270px; height: 160px;"
              :zoom="zoomMap"
              :center="centerMap">
              <gmap-marker
                :draggable="true"
                @dragend="getCoordinates"
                :position="centerMap" />
            </gmap-Map>
          </div>
          <form
            @submit.prevent="sendFormData"
            class="restaurant-edit__datos-contenedor">
            <div class="restaurant-edit__datos">
              <div class="ceu-item s-50">
                <p>Razón Social</p>
                <!-- campo -->
                <div class="ceu-campo__text-round">
                  <input
                    v-model="formData.business_name"
                    placeholder="Restaurante S.A.S"
                    required
                    type="text">
                </div>
              </div>
              <div class="ceu-item s-50" />
              <div class="ceu-item s-50">
                <p>Mail</p>
                <!-- campo -->
                <div class="ceu-campo__text-round">
                  <input
                    v-model="formData.email"
                    autocomplete="email"
                    placeholder="tao@comidaenlau.com"
                    required
                    type="email">
                </div>
              </div>
              <div class="ceu-item s-50">
                <p>Nombre</p>
                <!-- campo -->
                <div class="ceu-campo__text-round">
                  <input
                    v-model="formData.commercial_name"
                    type="text">
                </div>
              </div>
              <div class="ceu-item s-50">
                <p>Nit</p>
                <!-- campo -->
                <div class="ceu-campo__text-round">
                  <input
                    v-model="formData.nit"
                    placeholder="xxxxxxxxx-x"
                    type="text">
                </div>
              </div>
              <!-- <div class="ceu-item s-50">
                <p>Universidad</p>
                <div class="ceu-campo__text-round">
                  <input
                    v-model="formData.university_name"
                    placeholder="Universidad de los Andes"
                    type="text">
                </div>
              </div> -->
              <div class="ceu-item s-50">
                <p>Celular</p>
                <!-- campo -->
                <div class="ceu-campo__text-round">
                  <input
                    v-model="formData.telephone"
                    placeholder=""
                    required
                    type="tel">
                </div>
              </div>
              <div class="ceu-item s-50">
                <p>Celular 2</p>
                <!-- campo -->
                <div class="ceu-campo__text-round">
                  <input
                    v-model="formData.contact_number"
                    placeholder=""
                    type="text">
                </div>
              </div>
              <div class="ceu-item s-50">
                <p>Facebook</p>
                <!-- campo -->
                <div class="ceu-campo__text-round">
                  <input
                    v-model="formData.facebook"
                    placeholder=""
                    type="url">
                </div>
              </div>
              <div class="ceu-item s-50">
                <p>Instagram</p>
                <!-- campo -->
                <div class="ceu-campo__text-round">
                  <input
                    v-model="formData.instagram"
                    placeholder=""
                    type="url">
                </div>
              </div>
              <div class="ceu-item s-50">
                <p>Página Web</p>
                <!-- campo -->
                <div class="ceu-campo__text-round">
                  <input
                    v-model="formData.web"
                    placeholder=""
                    type="url">
                </div>
              </div>
              <div class="ceu-item s-50">
                <!-- <p>Tags</p>
                <div class="ceu-campo__text-round">
                  <input
                    v-model="formData.tag"
                    placeholder=""
                    type="text">
                </div> -->
              </div>
              <div class="ceu-item s-100">
                <p>Descripción</p>
                <!-- campo -->
                <div class="ceu-campo__text-round">
                  <input
                    v-model="formData.description"
                    placeholder=""
                    type="text">
                </div>
              </div>
            </div>
            <!--. datos  -->
            <div class="restaurant-edit__time-price">
              <!-- tiempo -->
              <div class="restaurant-edit__time-item">
                <p>Tiempo promedio de preparación</p>
                <div class="ceu-campo__text2">
                  <input
                    v-model="formData.avg_preparation_time"
                    required
                    maxlength="4"
                    type="number">
                </div>
                <p>min</p>
              </div>
              <!-- tiempo -->
              <div class="restaurant-edit__time-item">
                <p>Tiempo promedio de entrega</p>
                <div class="ceu-campo__text2">
                  <input
                    v-model="formData.avg_delivery_time"
                    required
                    maxlength="4"
                    type="number">
                </div>
                <p>min</p>
              </div>
              <!-- precio -->
              <div class="restaurant-edit__time-item restaurant-edit__time-precio">
                <p>Precio</p>
                <div class="ceu-campo__text2">
                  <multiselect
                    class="custom-select4"
                    v-model="formData.price_range"
                    :options="preciosPromecios"
                    :show-labels="false"
                    required
                    placeholder="" />
                </div>
                <p>min</p>
              </div>
            </div>
            <!--. time price  -->
            <div class="restaurant-edit__payments">
              <!-- <h3>METODO DE PAGO</h3>
              <div class="restaurant-edit__payments-radio">
                <div class="lista-radio2">
                  <input
                    type="checkbox"
                    id="edit-efectivo">
                  <label for="edit-efectivo">
                    Efectivo
                  </label>
                </div>
                <div class="lista-radio2">
                  <input
                    type="checkbox"
                    id="edit-nequi">
                  <label for="edit-nequi">
                    NEQUI
                  </label>
                </div>
                <div class="lista-radio2">
                  <input
                    type="checkbox"
                    id="edit-banco">
                  <label for="edit-banco">
                    Banco
                  </label>
                </div>
              </div> -->
              <div class="restaurant-edit__banco-info">
                <div class="restaurant-edit__banco-campo ceu-item s-1-3">
                  <p>Banco</p>
                  <div class="ceu-campo__text-round">
                    <input
                      v-model="formData.bank"
                      required
                      placeholder=""
                      type="text">
                  </div>
                </div>
                <div class="restaurant-edit__banco-campo ceu-item s-1-3">
                  <p>#Cuenta</p>
                  <div class="ceu-campo__text-round">
                    <input
                      v-model="formData.bank_account"
                      placeholder="Número"
                      required
                      type="number">
                  </div>
                </div>
                <div class="restaurant-edit__banco-campo ceu-item s-1-3">
                  <p>Tipo</p>
                  <multiselect
                    class="custom-select4"
                    v-model="formData.account_type"
                    :options="cuentaTipos"
                    :show-labels="false"
                    required
                    placeholder="Tipo de Cuenta" />
                </div>
              </div>
            </div>
            <!-- eliminar -->
            <!-- <div class="restaurant-edit__eliminar main-center">
              <div class="ceu-btn1">
                Eliminar restaurante
              </div>
            </div> -->
            <div class="restaurant-edit__footer cross-center">
              <a href="">Ver contrato</a>
              <button
                type="submit"
                class="ceu-btn1">
                Guardar Cambios
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import configService from '../../settings/api-url'
import VueTimepicker from 'vue2-timepicker'

export default {
  name: 'ModalEdit',
  props: {
    showModal: {
      type: Boolean,
      default: false
    },
    idRestaurant: {
      type: Number,
      default: 0
    }
  },
  computed: {
    ...mapState(['commerce'])
  },
  watch: {
    showModal () {
      this.fillFormServices()
      // horarios de apertura
      this.getOpenShedules()
      // banners
      this.getBannerShedules()
    }
  },
  components: {
    VueTimepicker
  },
  data () {
    return {
      loadUpload: {
        logo: '',
        banner: []
      },
      formServices: {
        'logo': '',
        'perfil': '',
        'has_delivery': false,
        'has_takeout': false,
        'active': false,
        'delivery_fee': '',
        'takeout_fee': '',
        'has_market': false,
        'background_image': '',
        'background_imageUrl': ''
      },
      formData: {
        address: '',
        latitude: '',
        longitude: '',
        business_name: '',
        email: '',
        commercial_name: '',
        nit: '',
        university_name: '',
        telephone: '',
        contact_number: '',
        facebook: '',
        instagram: '',
        web: '',
        tag: [],
        avg_delivery_time: 0,
        avg_preparation_time: 0,
        price_range: '',
        bank: '',
        bank_account: '',
        account_type: '',
        description: ''
      },
      modelOpenTime: [],
      modelOpenDays: [],
      listOpenTime: [],
      formatTime: 'HH:mm',
      openingHours: {
        start_time: {HH: '00', mm: '00'},
        end_time: {HH: '00', mm: '00'}
      },
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
      listBanenrShedule: [],
      modelBannerTime: [],
      modelBannerImg: [],
      modelCreateBannerImg: '',
      modelCreateBannerTime: {
        start_time: {HH: '00', mm: '00'},
        end_time: {HH: '00', mm: '00'}
      },
      modelCreateBannerDescription: '',
      cuentaTipo: null,
      cuentaTipos: ['Ahorros', 'Corriente'],
      precioPromecio: '',
      preciosPromecios: ['$', '$$', '$$$', '$$$$'],
      centerMap: {lat: 4.6471319, lng: -74.1003523},
      zoomMap: 6
    }
  },
  methods: {
    ...mapActions(['updateCommerceAsync']),
    toggleShow () {
      this.$emit('toggle-edit')
    },
    setPlace (place) {
      this.centerMap = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      }
      this.formData.latitude = place.geometry.location.lat()
      this.formData.longitude = place.geometry.location.lng()
      this.formData.address = place.formatted_address
      this.zoomMap = 15
    },
    getCoordinates (e) {
      this.centerMap = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      }
      this.formData.latitude = e.latLng.lat()
      this.formData.longitude = e.latLng.lng()
      this.zoomMap = 15
    },
    fillFormServices () {
      this.updateCommerceAsync(this.idRestaurant)
        .then(res => {
          const data = res.data

          this.formServices = {
            'perfil': data.logo.url,
            'has_delivery': data.has_delivery,
            'has_takeout': data.has_takeout,
            'delivery_fee': data.delivery_fee,
            'active': data.active,
            'takeout_fee': data.takeout_fee,
            'has_market': data.has_market,
            'background_imageUrl': data.background_image.url
          }
          // otra parte del formulario
          this.fillFormData(data)
        })
    },
    fillFormData (data) {
      // const data = res.data

      var web = data.web
      if (web === 'not defined') {
        web = ''
      }
      var bank = data.bank
      if (bank === 'not defined') {
        bank = ''
      }
      var businessName = data.business_name
      if (businessName === 'not defined') {
        businessName = ''
      }
      var accountType = data.account_type
      if (accountType === 'not defined') {
        accountType = ''
      }
      var longitude = data.longitude
      var latitude = data.latitude
      if (longitude !== null && latitude !== null) {
        this.centerMap = {
          lat: parseFloat(latitude),
          lng: parseFloat(longitude)
        }
        this.zoomMap = 15
      }
      this.formData = {
        address: data.address,
        latitude: this.centerMap.lat,
        longitude: this.centerMap.lng,
        business_name: businessName,
        email: data.email,
        commercial_name: data.commercial_name,
        nit: data.nit,
        university_name: data.university_name,
        telephone: data.telephone,
        contact_number: data.contact_number,
        facebook: data.facebook,
        instagram: data.instagram,
        web,
        tag: [],
        avg_delivery_time: data.avg_delivery_time,
        avg_preparation_time: data.avg_preparation_time,
        price_range: data.price_range,
        bank,
        bank_account: data.bank_account,
        account_type: accountType,
        description: data.description
      }
    },
    sendFormData () {
      configService(`/central_admin/commerces/${this.idRestaurant}`, {
        method: 'put',
        data: this.formData
      })
        .then(res => {
          this.$emit('edit-restaurant')
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
    sendFormServices () {
      this.loadUpload.logo = 'Cargando...'
      configService(`/central_admin/commerces/${this.idRestaurant}`, {
        method: 'put',
        data: this.formServices
      })
        .then(res => {
          this.loadUpload.logo = ''
          this.$emit('edit-restaurant')
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
    fileImage (origin, file, position = '') {
      const reader = new FileReader()
      const self = this
      reader.addEventListener('load', function () {
        if (origin === 'logo') {
          self.formServices.perfil = reader.result
          self.formServices.logo = reader.result
        }

        if (origin === 'imageBg') {
          self.formServices.background_image = reader.result
          self.formServices.background_imageUrl = reader.result
        }

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
    nameDayWeek (day) {
      var nameDay
      switch (day) {
        case 0:
          nameDay = 'Domingo'
          break
        case 1:
          nameDay = 'Lunes'
          break
        case 2:
          nameDay = 'Martes'
          break
        case 3:
          nameDay = 'Miercoles'
          break
        case 4:
          nameDay = 'Jueves'
          break
        case 5:
          nameDay = 'Vienes'
          break
        case 6:
          nameDay = 'Sabado'
          break
        default:
          nameDay = 'no Day'
          break
      }
      return nameDay
    },
    getOpenShedules () {
      // limpiar datos
      this.listOpenTime = []
      this.modelOpenTime = []
      this.modelOpenDays = []
      configService(`/central_admin/commerces/${this.idRestaurant}/opening_schedules`)
        .then(res => {
          const self = this
          const data = res.data
          for (let index = 0; index < data.length; index++) {
            self.$set(self.listOpenTime, index, data[index])
            // llenar v-model de horarios
            self.$set(self.modelOpenTime, index, {
              start_time: {HH: data[index].opening_time.hour, mm: data[index].opening_time.minute},
              end_time: {HH: data[index].closing_time.hour, mm: data[index].closing_time.minute}
            })
            //  llenar dias de la semana
            var arrAux = []
            for (let j = 0; j < data[index].weekdays.length; j++) {
              arrAux.push({
                value: data[index].weekdays[j],
                label: self.nameDayWeek(data[index].weekdays[j])
              })
            }
            self.$set(self.modelOpenDays, index, arrAux)
          }
        })
    },
    putOpenSchedules (id, position) {
      // horarios
      const open = `${this.modelOpenTime[position].start_time.HH}:${this.modelOpenTime[position].start_time.mm}`
      const close = `${this.modelOpenTime[position].end_time.HH}:${this.modelOpenTime[position].end_time.mm}`
      // dias de la semana
      const daysWeek = this.modelOpenDays[position].map(item => {
        return item.value
      })
      configService(`/central_admin/commerces/${this.idRestaurant}/opening_schedules/${id}`, {
        method: 'PUT',
        data: {
          'opening_time': open,
          'closing_time': close,
          'weekdays': daysWeek
        }
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
    deleteOpenSchedules (id, position) {
      console.log('id ' + id)
      console.log('position ' + position)
      configService(`/central_admin/commerces/${this.idRestaurant}/opening_schedules/${id}`, {
        method: 'DELETE'
      })
        .then(res => {
          this.getOpenShedules()
        })
    },
    postOpenSchedules () {
      const open = `${this.openingHours.start_time.HH}:${this.openingHours.start_time.mm}`
      const close = `${this.openingHours.end_time.HH}:${this.openingHours.end_time.mm}`
      // dias de la semana
      const daysWeek = this.days.map(item => {
        return item.value
      })
      configService(`/central_admin/commerces/${this.idRestaurant}/opening_schedules`, {
        method: 'POST',
        data: {
          'opening_time': open,
          'closing_time': close,
          'weekdays': daysWeek
        }
      })
        .then(res => {
          this.$swal({
            type: 'success',
            title: 'Horario Creado!',
            timer: 2000,
            showConfirmButton: false
          })
          this.getOpenShedules()
        })
        .catch(error => {
          console.log(error.response.data)
          this.$swal({
            type: 'error',
            title: 'Oops!',
            text: error.response.data.message,
            timer: 2000,
            showConfirmButton: false
          })
        })
    },
    getBannerShedules () {
      // limpiar datos
      this.listBanenrShedule = []
      this.modelBannerTime = []
      this.modelBannerImg = []
      configService(`/central_admin/commerces/${this.idRestaurant}/schedules`)
        .then(res => {
          const self = this
          const data = res.data
          for (let index = 0; index < data.length; index++) {
            // self.listBanenrShedule[index] = data[index]
            self.$set(self.listBanenrShedule, index, data[index])
            // llenar v-model de horarios
            const horaOpen = new Date(data[index].opening_time).getHours()
            const minutoOpen = new Date(data[index].opening_time).getMinutes()
            const horaClose = new Date(data[index].closing_time).getHours()
            const minutoClose = new Date(data[index].closing_time).getMinutes()

            self.modelBannerTime[index] = {
              start_time: {HH: horaOpen.toString(), mm: minutoOpen.toString()},
              end_time: {HH: horaClose.toString(), mm: minutoClose.toString()}
            }
            //  llenar banner
            self.modelBannerImg[index] = data[index].banner.url
          }
        })
    },
    postBannerSchedules () {
      const open = `${this.modelCreateBannerTime.start_time.HH}:${this.modelCreateBannerTime.start_time.mm}`
      const close = `${this.modelCreateBannerTime.end_time.HH}:${this.modelCreateBannerTime.end_time.mm}`
      configService(`/central_admin/commerces/${this.idRestaurant}/schedules`, {
        method: 'POST',
        data: {
          'schedule': {
            'opening_time': open,
            'closing_time': close,
            'description': this.modelCreateBannerDescription,
            'banner': this.modelCreateBannerImg
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
    deleteBannerSchedules (id) {
      configService(`/central_admin/commerces/${this.idRestaurant}/schedules/${id}`, {
        method: 'DELETE'
      })
        .then(res => {
          this.getBannerShedules()
        })
    },
    putBannerSchedules (id, position) {
      const open = `${this.modelBannerTime[position].start_time.HH}:${this.modelBannerTime[position].start_time.mm}`
      const close = `${this.modelBannerTime[position].end_time.HH}:${this.modelBannerTime[position].end_time.mm}`
      console.log(id)
      // console.log(this.modelBannerImg[position])
      configService(`/central_admin/commerces/${this.idRestaurant}/schedules/${id}`, {
        method: 'PUT',
        data: {
          'schedule': {
            'opening_time': open,
            'closing_time': close,
            'banner': this.modelBannerImg[position],
            'description': this.listBanenrShedule[position].description
          }
        }
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
    }
  }
}
</script>

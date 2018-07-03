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
          <div class="restaurant-edit__name-service-logo">
            <!-- upload logo -->
            <div class="restaurant-edit__logo ceu-item s-30">
              <div class="restaurant-edit__logo-img" />
              <div class="restaurant-edit__logo-upload">
                Upload Logo
              </div>
              <div class="restaurant-edit__logo-info">
                <strong>Formato:</strong> .png 500*500px
              </div>
            </div>
            <!-- servicios - name -->
            <div class="restaurant-edit__servicios-name ceu-item s-70">
              <!-- name -->
              <div class="restaurant-edit__name">
                <h2>TAO CALENTAO</h2>
                <div class="restaurant-edit__descontinuado">
                  <p>Continuado/Descontinuado</p>
                  <div class="lista-checkbox2 large">
                    <input
                      id="restaurant-edit__descontinuado"
                      type="checkbox">
                    <label
                      data-checkedsi="On"
                      data-checkedno="Off"
                      for="restaurant-edit__descontinuado" />
                  </div>
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
                      type="checkbox">
                    <label for="edit-restaurant__domicilios">
                      <span />
                      Domicilios
                    </label>
                  </div>
                  <div class="restaurant-edit__servicio-porcentaje">
                    14%
                    <p>Edit</p>
                  </div>
                </div>
                <!-- servicio -->
                <div class="restaurant-edit__servicio">
                  <div class="ceu-checkbox">
                    <input
                      id="edit-restaurant__takeout"
                      type="checkbox">
                    <label for="edit-restaurant__takeout">
                      <span />
                      Take-out
                    </label>
                  </div>
                  <div class="restaurant-edit__servicio-porcentaje">
                    7%
                    <p>Edit</p>
                  </div>
                </div>
                <!-- servicio -->
                <div class="restaurant-edit__servicio">
                  <div class="ceu-checkbox">
                    <input
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
            <!--. servicios - name-->
          </div>
          <div class="restaurant-edit__edit-menu">
            Editar Menú
          </div>
          <!-- horarios apertura y cierre-->
          <div class="restaurant-edit__horarios">
            <h3>HORARIOS DE APERTURA</h3>
            <div class="restaurant-edit__list">
              <div class="restaurant-edit__list-item">
                <div
                  class="ceu-campo__hStart-hEnd"
                  :key="index"
                  v-for="(item, index) in openingHours">
                  <p>Hora inicial</p>
                  <vue-timepicker
                    hide-clear-button
                    v-model="item.start_time"
                    :format="formatTime"/>
                  <p>Hora final</p>
                  <vue-timepicker
                    hide-clear-button
                    v-model="item.end_time"
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
                    placeholder="Multi Selección" />
                </div>
              </div>
            </div>
            <div class="restaurant-edit__add-horario">
              +Añadir Horario
            </div>
          </div>
          <!-- Banner principal -->
          <div class="restaurant-edit__add-banner">
            <div class="restaurant-edit__add-banner-titulo">
              <h4>Banner Principal</h4>
              <p><strong>Formato:</strong> .png, .jpg, .jpeg | 1100px * 700px</p>
            </div>
            <div class="restaurant-edit__banner-upload">
              <div class="restaurant-edit__upload-file">
                <label for="restaurant-edit__bPricipal">
                  Upload
                </label>
                <input
                  id="restaurant-edit__bPricipal"
                  type="file">
                <div class="restaurant-edit__upload-text" />
              </div>
              <div class="restaurant-edit__upload-delete">
                <i class="ceu-icon-garbage" />
              </div>
            </div>
            <div class="restaurant-edit__banner-horaios">
              <div
                class="ceu-campo__hStart-hEnd"
                :key="index"
                v-for="(item, index) in scheduleBannerPrimary">
                <p>Hora inicial</p>
                <vue-timepicker
                  hide-clear-button
                  v-model="item.start_time"
                  :format="formatTime"/>
                <p>Hora final</p>
                <vue-timepicker
                  hide-clear-button
                  v-model="item.end_time"
                  :format="formatTime"/>
              </div>
              <div class="restaurant-edit__banner-description">
                <div class="ceu-campo__text-round2">
                  <p>Descripción</p>
                  <input type="text">
                </div>
              </div>
            </div>
          </div>
          <!-- Banner apoyo -->
          <div class="restaurant-edit__add-banner">
            <div class="restaurant-edit__add-banner-titulo">
              <h4>Banner Apoyo</h4>
              <p><strong>Formato:</strong> .png, .jpg, .jpeg | 1100px * 700px</p>
            </div>
            <div class="restaurant-edit__banner-list">
              <!-- item -->
              <div class="restaurant-edit__banner-list-item">
                <div class="restaurant-edit__banner-upload">
                  <div class="restaurant-edit__upload-file">
                    <label for="restaurant-edit__apoyo1">
                      Upload
                    </label>
                    <input
                      id="restaurant-edit__apoyo1"
                      type="file">
                    <div class="restaurant-edit__upload-text" />
                  </div>
                  <div class="restaurant-edit__upload-delete">
                    <i class="ceu-icon-garbage" />
                  </div>
                </div>
                <div class="restaurant-edit__banner-horaios">
                  <div
                    class="ceu-campo__hStart-hEnd"
                    :key="index"
                    v-for="(item, index) in scheduleBanners">
                    <p>Hora inicial</p>
                    <vue-timepicker
                      hide-clear-button
                      v-model="item.start_time"
                      :format="formatTime"/>
                    <p>Hora final</p>
                    <vue-timepicker
                      hide-clear-button
                      v-model="item.end_time"
                      :format="formatTime"/>
                  </div>
                  <div class="restaurant-edit__banner-description">
                    <div class="ceu-campo__text-round2">
                      <p>Descripción</p>
                      <input type="text">
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="restaurant-edit__add-horario">
              +Añadir Banner de apoyo
            </div>
          </div>
        </div>
        <div class="ceu-item s-45">
          <div class="restaurant-edit__direccion">
            <div class="restaurant-edit__search-map">
              <p>Dirección</p>
              <div class="ceu-campo__text-round2">
                <gmap-autocomplete
                  @place_changed="setPlace" />
              </div>
            </div>
            <gmap-Map
              style="width: 270px; height: 160px;"
              :zoom="16"
              :center="center">
              <gmap-marker
                :key="index"
                v-for="(m, index) in markers"
                :position="m.position"
                @click="center=m.position" />
            </gmap-Map>
          </div>
          <div class="restaurant-edit__datos">
            <div class="ceu-item s-50">
              <p>Razón Social</p>
              <!-- campo -->
              <div class="ceu-campo__text-round">
                <input
                  placeholder="Restaurante S.A.S"
                  type="text">
              </div>
            </div>
            <div class="ceu-item s-50" />
            <div class="ceu-item s-50">
              <p>Mail</p>
              <!-- campo -->
              <div class="ceu-campo__text-round">
                <input
                  autocomplete="email"
                  placeholder="tao@comidaenlau.com"
                  type="text">
              </div>
            </div>
            <div class="ceu-item s-50">
              <p>Nombre</p>
              <!-- campo -->
              <div class="ceu-campo__text-round">
                <input
                  type="text">
              </div>
            </div>
            <div class="ceu-item s-50">
              <p>Nit</p>
              <!-- campo -->
              <div class="ceu-campo__text-round">
                <input
                  placeholder="xxxxxxxxx-x"
                  type="text">
              </div>
            </div>
            <div class="ceu-item s-50">
              <p>Universidad</p>
              <!-- campo -->
              <div class="ceu-campo__text-round">
                <input
                  placeholder="Universidad de los Andes"
                  type="text">
              </div>
            </div>
            <div class="ceu-item s-50">
              <p>Celular</p>
              <!-- campo -->
              <div class="ceu-campo__text-round">
                <input
                  placeholder=""
                  type="text">
              </div>
            </div>
            <div class="ceu-item s-50">
              <p>Celular 2</p>
              <!-- campo -->
              <div class="ceu-campo__text-round">
                <input
                  placeholder=""
                  type="text">
              </div>
            </div>
            <div class="ceu-item s-50">
              <p>Facebook</p>
              <!-- campo -->
              <div class="ceu-campo__text-round">
                <input
                  placeholder=""
                  type="text">
              </div>
            </div>
            <div class="ceu-item s-50">
              <p>Instagram</p>
              <!-- campo -->
              <div class="ceu-campo__text-round">
                <input
                  placeholder=""
                  type="text">
              </div>
            </div>
            <div class="ceu-item s-50">
              <p>Página Web</p>
              <!-- campo -->
              <div class="ceu-campo__text-round">
                <input
                  placeholder=""
                  type="text">
              </div>
            </div>
            <div class="ceu-item s-50">
              <p>Tags</p>
              <!-- campo -->
              <div class="ceu-campo__text-round">
                <input
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
                  max="100"
                  min="0"
                  type="number">
              </div>
              <p>min</p>
            </div>
            <!-- tiempo -->
            <div class="restaurant-edit__time-item">
              <p>Tiempo promedio de entrega</p>
              <div class="ceu-campo__text2">
                <input
                  max="100"
                  min="0"
                  type="number">
              </div>
              <p>min</p>
            </div>
            <!-- precio -->
            <div class="restaurant-edit__time-item restaurant-edit__time-precio">
              <p>Precio</p>
              <div class="ceu-campo__text2">
                <input type="text">
              </div>
              <p>min</p>
            </div>
          </div>
          <!--. time price  -->
          <div class="restaurant-edit__payments">
            <h3>METODO DE PAGO</h3>
            <div class="restaurant-edit__payments-radio">
              <!-- checkbox -->
              <div class="lista-radio2">
                <input
                  type="checkbox"
                  id="edit-efectivo">
                <label for="edit-efectivo">
                  Efectivo
                </label>
              </div>
              <!-- checkbox -->
              <div class="lista-radio2">
                <input
                  type="checkbox"
                  id="edit-nequi">
                <label for="edit-nequi">
                  NEQUI
                </label>
              </div>
              <!-- checkbox -->
              <div class="lista-radio2">
                <input
                  type="checkbox"
                  id="edit-banco">
                <label for="edit-banco">
                  Banco
                </label>
              </div>
            </div>
            <div class="restaurant-edit__banco-info">
              <div class="restaurant-edit__banco-campo ceu-item s-1-3">
                <p>Banco</p>
                <multiselect
                  class="custom-select4 selBanco"
                  v-model="banco"
                  :options="bancos"
                  :show-labels="false"
                  label="label"
                  placeholder="Elige tu banco" />
              </div>
              <div class="restaurant-edit__banco-campo ceu-item s-1-3">
                <p>#Cuenta</p>
                <div class="ceu-campo__text-round">
                  <input
                    placeholder="Número"
                    type="text">
                </div>
              </div>
              <div class="restaurant-edit__banco-campo ceu-item s-1-3">
                <p>Tipo</p>
                <multiselect
                  class="custom-select4"
                  v-model="cuentaTipo"
                  :options="cuentaTipos"
                  :show-labels="false"
                  label="label"
                  placeholder="Tipo de Cuenta" />
              </div>
            </div>
          </div>
          <!-- eliminar -->
          <div class="restaurant-edit__eliminar main-center">
            <div class="ceu-btn1">
              Eliminar restaurante
            </div>
          </div>
        </div>
      </div>
      <div class="restaurant-edit__footer cross-center">
        <a href="">Ver contrato</a>
        <button class="ceu-btn1">
          Guardar Cambios
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import VueTimepicker from 'vue2-timepicker'
// http://sagalbot.github.io/vue-select/docs/Install.html#
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'
export default {
  name: 'ModalEdit',
  props: {
    showModal: {
      type: Boolean,
      default: false
    }
  },
  components: {
    VueTimepicker,
    Multiselect
  },
  data () {
    return {
      formatTime: 'hh:mm a',
      openingHours: [
        {
          start_time: {hh: '01', mm: '00', a: 'am'},
          end_time: {hh: '01', mm: '00', a: 'am'}
        }
      ],
      scheduleBannerPrimary: [
        {
          start_time: {hh: '01', mm: '00', a: 'am'},
          end_time: {hh: '01', mm: '00', a: 'am'}
        }
      ],
      scheduleBanners: [
        {
          start_time: {hh: '01', mm: '00', a: 'am'},
          end_time: {hh: '01', mm: '00', a: 'am'}
        }
      ],
      dayWeeks: [ 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo' ],
      days: [],
      banco: null,
      bancos: [
        { name: 'BANCO AV VILLAS', label: 'BANCO AV VILLAS' },
        { name: 'BANCO BBVA COLOMBIA S.A.', label: 'BANCO BBVA COLOMBIA S.A.' },
        { name: 'BANCO CAJA SOCIAL', label: 'BANCO CAJA SOCIAL' },
        { name: 'BANCO COLPATRIA', label: 'BANCO COLPATRIA' },
        { name: 'BANCO DAVIVIENDA', label: 'BANCO DAVIVIENDA' }
      ],
      cuentaTipo: null,
      cuentaTipos: [
        { name: 'ahorros', label: 'ahorros' },
        { name: 'credito', label: 'credito' }
      ],
      center: {lat: 5.2555977, lng: -75.9819583},
      markers: [],
      places: [],
      currentPlace: null
    }
  },
  methods: {
    toggleShow () {
      this.$emit('toggle-edit')
    },
    setPlace (place) {
      this.currentPlace = place
      this.addMarker()
    },
    addMarker () {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng()
        }
        this.markers.push({ position: marker })
        this.places.push(this.currentPlace)
        this.center = marker
        this.currentPlace = null
      }
    }
  }
}
</script>

<template>
  <section
    :class="{ 'modal-ceu__show': showModalCategory }"
    class="modal-ceu modal-edit">
    <div
      @click="toggleShow"
      class="modal-ceu__overley"/>
    <div class="modal-ceu__content modal-ceu__menu-category xsmall">
      <div
        @click="toggleShow"
        class="modal-ceu__close">
        <i class="ceu-icon-close" />
      </div>
      <div class="menu-restaurant__content">
        <div class="menu-restaurant__add-title">
          <div class="ceu-campo__text-round2">
            <p>Titulo</p>
            <input
              type="text"
              value=""
              class="ceu-campo__round">
          </div>
        </div>
        <div class="menu-restaurant__text">
          ¿Cuando estará disponible esta categoría?
        </div>
        <div class="menu-restaurant__days">
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
        <div class="ceu-container2">
          <div class="cue-item padding s-50">
            <div class="ceu-campo__text-round2">
              <p>Hora Inicial</p>
              <vue-timepicker
                v-model="horaInicial"
                hide-clear-button
                :format="formatTime"/>
            </div>
          </div>
          <div class="cue-item padding s-50">
            <div class="ceu-campo__text-round2">
              <p>Hora Final</p>
              <vue-timepicker
                v-model="horafinal"
                hide-clear-button
                :format="formatTime"/>
            </div>
          </div>
        </div>
        <div class="menu-restaurant__add-footer">
          <div class="ceu-btn2 black">
            Cancelar
          </div>
          <div class="ceu-btn1">
            Agregar Categoría
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import VueTimepicker from 'vue2-timepicker'
export default {
  name: 'Category',
  props: {
    showModalCategory: {
      type: Boolean,
      default: false
    }
  },
  components: {
    VueTimepicker
  },
  data () {
    return {
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
      horaInicial: '00:00',
      horafinal: '00:00',
      formatTime: 'HH:mm'
    }
  },
  methods: {
    toggleShow () {
      this.$emit('toggle-show-category')
    }
  }
}
</script>

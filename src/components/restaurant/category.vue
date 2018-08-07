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
      <form
        @submit.prevent="sendCategory"
        class="menu-restaurant__content">
        <div class="menu-restaurant__add-title">
          <div class="ceu-campo__text-round2">
            <p>Nombre</p>
            <input
              required
              type="text"
              v-model="form.name"
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
                v-model="form.start_time"
                hide-clear-button
                :format="formatTime"/>
            </div>
          </div>
          <div class="cue-item padding s-50">
            <div class="ceu-campo__text-round2">
              <p>Hora Final</p>
              <vue-timepicker
                v-model="form.end_time"
                hide-clear-button
                :format="formatTime"/>
            </div>
          </div>
        </div>
        <div class="menu-restaurant__add-footer">
          <div
            @click="toggleShow"
            class="ceu-btn2 black">
            Cancelar
          </div>
          <button
            type="submit"
            class="ceu-btn1">
            {{ (idCategory === 0) ? 'Agregar Categoría' : 'Editar Categoría' }}
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import VueTimepicker from 'vue2-timepicker'
import configService from '../../settings/api-url'
export default {
  name: 'Category',
  props: {
    showModalCategory: {
      type: Boolean,
      default: false
    },
    idCommerce: {
      type: Number,
      default: 0
    },
    idCategory: {
      type: Number,
      default: 0
    }
  },
  components: {
    VueTimepicker
  },
  watch: {
    showModalCategory (valNew) {
      if (valNew && this.idCategory !== 0) {
        this.fillForm()
      } else {
        this.emptyForm()
      }
    }
  },
  data () {
    return {
      form: {
        name: '',
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
      formatTime: 'HH:mm',
      idCategoryProgram: ''
    }
  },
  methods: {
    fillForm () {
      configService(`/central_admin/categories/${this.idCategory}`)
        .then(res => {
          const data = res.data
          this.form.name = data.name
          this.days = []
          this.form.start_time = {HH: data.programs[0].start_time.hour, mm: data.programs[0].start_time.minute}
          this.form.end_time = {HH: data.programs[0].end_time.hour, mm: data.programs[0].end_time.minute}
          if (data.programs[0].weekdays !== 0) {
            for (let index = 0; index < data.programs[0].weekdays.length; index++) {
              this.days.push({
                value: data.programs[0].weekdays[index],
                label: this.nameDayWeek(data.programs[0].weekdays[index])
              })
            }
          }
          this.idCategoryProgram = data.programs[0].id
        })
    },
    emptyForm () {
      this.form.name = ''
      this.form.start_time = {HH: '00', mm: '00'}
      this.form.end_time = {HH: '00', mm: '00'}
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
    toggleShow () {
      this.$emit('toggle-show-category')
    },
    sendCategory () {
      if (this.idCategory === 0) {
        this.addCategory()
      } else {
        this.editCategory()
      }
    },
    addCategory () {
      const open = `${this.form.start_time.HH}:${this.form.start_time.mm}`
      const close = `${this.form.end_time.HH}:${this.form.end_time.mm}`
      const adddays = []
      for (let index = 0; index < this.days.length; index++) {
        adddays.push(this.days[index].value)
      }
      const data = {
        'category': {
          'name': this.form.name,
          'programs_attributes': [{
            'start_time': open,
            'end_time': close,
            'weekdays': adddays
          }]
        }
      }
      configService(`/central_admin/commerces/${this.idCommerce}/categories`, {
        method: 'POST',
        data
      })
        .then(res => {
          this.toggleShow()
          this.form.name = ''
          this.form.is_available = false
          this.days = []
          this.$emit('get-category')
          this.$swal({
            type: 'success',
            title: 'Categoría Creada!',
            showConfirmButton: false,
            timer: 2500
          })
        })
        .catch(error => {
          this.$swal({
            type: 'error',
            title: 'Oops...',
            text: error.response.data
          })
          console.log(error.response.data)
        })
    },
    editCategory () {
      const open = `${this.form.start_time.HH}:${this.form.start_time.mm}`
      const close = `${this.form.end_time.HH}:${this.form.end_time.mm}`
      const adddays = []
      for (let index = 0; index < this.days.length; index++) {
        adddays.push(this.days[index].value)
      }
      const data = {
        'category': {
          'name': this.form.name,
          'programs_attributes': [{
            'id': this.idCategoryProgram,
            'start_time': open,
            'end_time': close,
            'weekdays': adddays
          }]
        }
      }
      configService(`/central_admin/categories/${this.idCategory}`, {
        method: 'PUT',
        data
      })
        .then(res => {
          this.toggleShow()
          this.form.name = ''
          this.form.is_available = false
          this.days = []
          this.$emit('get-category')
          this.$swal({
            type: 'success',
            title: 'Categoría Editada!',
            showConfirmButton: false,
            timer: 2500
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
  }
}
</script>

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
export default {

}
</script>

<style>

</style>

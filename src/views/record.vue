<template>
  <main class="admin-resumen__main">

    <Menu />

    <article class="admin-resumen__paneles">
      <section class="admin-resumen__fecha-totales">

        <div class="admin-resumen__calendario">
          <v-date-picker
            mode='range'
            is-inline
            :show-caps="true"
            :theme-styles='themeStyles'
            v-model='myRange'
            :show-popove='false'
            tint-color="#9013fe"
            :attributes='attrs' />
        </div>

      </section>
      <!-- tabla resumen -->
      <section class="admin-resumen__tabla-resumen">

        <p class="admin-resumen__fecha-pedido">
          <strong>Pedido Del:</strong>
          <span class="admin-resumen__fecha-desde"/>
          <strong>Al:</strong>
          <span class="admin-resumen__fecha-hasta"/>
        </p>

        <div class="admin-resumen__lista">
          <!-- ordenar por  -->
          <div class="admin-resumen__ordenar">
            <div class="admin-resumen__ordernar-titulo">
              Sort
            </div>
            <!-- agregar la clase 'activo' para indicar que se esta ordenando por ese item-->
            <div class="admin-resumen__ordernar-item activo">
              Fecha
              <i class="ion-ios-arrow-down"/>
            </div>
            <div class="admin-resumen__ordernar-item">
              ID
            </div>
            <div class="admin-resumen__ordernar-item">
              Estado
            </div>
            <div class="admin-resumen__ordernar-item">
              Monto
            </div>
          </div>
          <div class="admin-resumen__lista-contenedor">
            <!-- item -->
            <!-- 'admin-resumen__triger' clase que abre el modal -->
            <div
              @click="toggleModalDetails"
              class="admin-resumen__lista-item">
              <!-- datos -->
              <div class="admin-resumen__lista-datos-id">
                <div class="admin-resumen__lista-id">
                  ID <strong>56721</strong>
                </div>
                <div class="admin-resumen__lista-fecha">
                  18/04/2017
                </div>
                <div class="admin-resumen__lista-hora">
                  Para la 1:15pm
                </div>
                <div class="admin-resumen__lista-estado">
                  (Entregado)
                </div>
                <div class="admin-resumen__lista-tiempo">
                  32 minutos
                </div>
              </div>
              <!-- datos -->
              <div class="admin-resumen__lista-lista-datos-total">
                <div class="admin-resumen__lista-cliente-restaurante">
                  <p><strong>Restaurante:</strong> El corral</p>
                  <p><strong>Cliente</strong> carlos-alvarez@javeriana.edu.co</p>
                </div>
                <div class="admin-resumen__lista-total">
                  TOTAL COP <strong>$54.400</strong>
                </div>
              </div>
            </div>
            <!-- item -->
            <div class="admin-resumen__lista-item">
              <!-- datos -->
              <div class="admin-resumen__lista-datos-id">
                <div class="admin-resumen__lista-id">
                  ID <strong>56721</strong>
                </div>
                <div class="admin-resumen__lista-fecha">
                  18/04/2017
                </div>
                <div class="admin-resumen__lista-hora">
                  Para la 1:15pm
                </div>
                <div class="admin-resumen__lista-estado">
                  (Entregado)
                </div>
                <div class="admin-resumen__lista-tiempo">
                  32 minutos
                </div>
              </div>
              <!-- datos -->
              <div class="admin-resumen__lista-lista-datos-total">
                <div class="admin-resumen__lista-cliente-restaurante">
                  <p><strong>Restaurante:</strong> El corral</p>
                  <p><strong>Cliente</strong> carlos-alvarez@javeriana.edu.co</p>
                </div>
                <div class="admin-resumen__lista-total">
                  TOTAL COP <strong>$54.400</strong>
                </div>
              </div>
            </div>
            <!-- item -->
            <div class="admin-resumen__lista-item">
              <!-- datos -->
              <div class="admin-resumen__lista-datos-id">
                <div class="admin-resumen__lista-id">
                  ID <strong>56721</strong>
                </div>
                <div class="admin-resumen__lista-fecha">
                  18/04/2017
                </div>
                <div class="admin-resumen__lista-hora">
                  Para la 1:15pm
                </div>
                <div class="admin-resumen__lista-estado">
                  (Entregado)
                </div>
                <div class="admin-resumen__lista-tiempo">
                  32 minutos
                </div>
              </div>
              <!-- datos -->
              <div class="admin-resumen__lista-lista-datos-total">
                <div class="admin-resumen__lista-cliente-restaurante">
                  <p><strong>Restaurante:</strong> El corral</p>
                  <p><strong>Cliente</strong> carlos-alvarez@javeriana.edu.co</p>
                </div>
                <div class="admin-resumen__lista-total">
                  TOTAL COP <strong>$54.400</strong>
                </div>
              </div>
            </div>
            <!-- item -->
            <div class="admin-resumen__lista-item">
              <!-- datos -->
              <div class="admin-resumen__lista-datos-id">
                <div class="admin-resumen__lista-id">
                  ID <strong>56721</strong>
                </div>
                <div class="admin-resumen__lista-fecha">
                  18/04/2017
                </div>
                <div class="admin-resumen__lista-hora">
                  Para la 1:15pm
                </div>
                <div class="admin-resumen__lista-estado">
                  (Entregado)
                </div>
                <div class="admin-resumen__lista-tiempo">
                  32 minutos
                </div>
              </div>
              <!-- datos -->
              <div class="admin-resumen__lista-lista-datos-total">
                <div class="admin-resumen__lista-cliente-restaurante">
                  <p><strong>Restaurante:</strong> El corral</p>
                  <p><strong>Cliente</strong> carlos-alvarez@javeriana.edu.co</p>
                </div>
                <div class="admin-resumen__lista-total">
                  TOTAL COP <strong>$54.400</strong>
                </div>
              </div>
            </div>
            <!-- item -->
            <div class="admin-resumen__lista-item">
              <!-- datos -->
              <div class="admin-resumen__lista-datos-id">
                <div class="admin-resumen__lista-id">
                  ID <strong>56721</strong>
                </div>
                <div class="admin-resumen__lista-fecha">
                  18/04/2017
                </div>
                <div class="admin-resumen__lista-hora">
                  Para la 1:15pm
                </div>
                <div class="admin-resumen__lista-estado">
                  (Entregado)
                </div>
                <div class="admin-resumen__lista-tiempo">
                  32 minutos
                </div>
              </div>
              <!-- datos -->
              <div class="admin-resumen__lista-lista-datos-total">
                <div class="admin-resumen__lista-cliente-restaurante">
                  <p><strong>Restaurante:</strong> El corral</p>
                  <p><strong>Cliente</strong> carlos-alvarez@javeriana.edu.co</p>
                </div>
                <div class="admin-resumen__lista-total">
                  TOTAL COP <strong>$54.400</strong>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>
    </article>

    <!-- modal -->
    <modal-details
      @event-toggle-modal="toggleModalDetails"
      :toggle-modal="showModalDetails"/>
  </main>
</template>

<script>
import Menu from '../components/layout/Menu'
import ModalDetails from '../components/record/modalDetails'
export default {
  name: 'History',
  components: {
    Menu,
    ModalDetails
  },
  data () {
    return {
      attrs: [
        {
          key: 'today',
          highlight: {
            backgroundColor: '#ff8080'
          },
          contentStyle: {
            color: '#fafafa'
          },
          dates: new Date(2018, 0, 1)
        }
      ],
      themeStyles: {
        wrapper: {
          backgroundColor: '#fff',
          borderRadius: '6px',
          border: '1px solid #e5edef'
        },
        weekdayHorizontalDivider: {
          borderBottom: 'solid #000 1px'
        },
        weekdaysHorizontalDivider: {
          borderBottom: 'solid #9013fe 1px',
          width: '90%'
        },
        weekdays: {
          padding: `8px`,
          color: '#9013fe'
        },
        dayContent: {
          borderRadio: '50%'
        }
      },
      myRange: {
        start: new Date(2018, 7, 2),
        end: new Date(2018, 7, 10)
      },
      showModalDetails: false
    }
  },
  methods: {
    toggleModalDetails () {
      this.showModalDetails = !this.showModalDetails
    }
  }
}
</script>

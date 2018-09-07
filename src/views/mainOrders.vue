<template>
  <main>
    <!-- <header class="restaurante-user__header">

      <div class="admin__route-logo">
        <img

          class="restaurante-user__logo"
          alt="logo morado v3 comida en la u">

        <div class="admin__route-current">
          Pedidos de hoy
        </div>
      </div>

      <div class="restaurante-user__header-titulo">
        <p>Conexión a internet</p>

        <span class="admin__estado-conexion activo">
          Conectado
        </span>
      </div>

      <div class="restaurante-user__avatar">
        <img
          src="../assets/images/perfil/perfil-mini.jpg"
          alt="">
      </div>

    </header> -->

    <section class="admin-hoy__header">

      <div class="admin-hoy__filtro-titulo">
        <h4>Filters</h4>
      </div>

      <div class="admin-hoy__filtro-asign">
        <div class="admin-hoy__filtro">
          <!-- item filtro -->
          <!-- Agregar la clase activo para marcar el item -->
          <div class="admin-hoy__filtro-item activo">
            <h4>En proceso</h4>
            <p>(30-2)</p>
          </div>
          <!-- item filtro -->
          <div class="admin-hoy__filtro-item">
            <h4>Terminados</h4>
            <p>(12-2)</p>
          </div>
        </div>
      </div>

      <div class="admin-hoy__estadisticas">
        <!-- row -->
        <!-- <div class="admin-hoy__estadisticas-row">
          <div class="admin-hoy__estadisticas-item admin-hoy__estadisticas-venta">
            <p>Ventas</p>
            <span>$2’300.540</span>
          </div>
          <div class="admin-hoy__estadisticas-item admin-hoy__estadisticas-ocupation">
            <p>Ocupation</p>
            <span>70%</span>
          </div>
        </div> -->
        <button class="new-order">
          Nueva Orden
        </button>

        <!-- row -->
        <!-- <div class="admin-hoy__estadisticas-row">

          <div class="admin-hoy__estadisticas-item admin-hoy__estadisticas-lost">
            <p>Lost</p>
            <span>$20.450</span>
          </div>

          <div class="admin-hoy__estadisticas-item admin-hoy__estadisticas-sad">
            <p>Sad</p>
            <span>15% (7)</span>
          </div>
        </div> -->

        <!-- row -->
        <!-- <div class="admin-hoy__estadisticas-row">

          <div class="admin-hoy__estadisticas-item admin-hoy__estadisticas-avtime">
            <p>Av. Time</p>
            <span>26 min</span>
          </div>

          <div class="admin-hoy__estadisticas-item admin-hoy__estadisticas-mad">
            <p>Mad</p>
            <span> 4% (2)</span>
          </div>
        </div> -->

      </div>

    </section>

    <main class="admin-hoy__main">

      <Menu />
      <section class="main-items">
        <article class="main-dater">
          <v-date-picker
            mode='range'
            is-inline
            :show-caps="true"
            :theme-styles='themeStyles'
            v-model='myRange'
            :show-popove='false'
            tint-color="#9013fe"
            :attributes='attrs' />
        </article>
        <article class="admin-hoy__paneles">
          <div class="admin-hoy__panel-contenedor">
            <!-- panel -->
            <orders-box
              type="pending"
            />
            <!-- panel -->
            <orders-box
              type="process"
            />
          <!-- panel -->
          </div>
        </article>

      </section>
    </main>

    <!-- modal datos pedido -->

    <div class="modal-admin">
      <button class="modal-admin__cerrar">
        Cerrar
      </button>
      <div class="modal-admin__header">
        <h3>56721</h3>
        <h2>Delirato</h2>
        <p class="modal-admin__hora">
          Para la 1:15pm
        </p>
        <!-- colocar la clase "activo" para indicar que fue aceptado el pedido -->
        <h4 class="modal-admin__estado-pedido activo">Aceptado</h4>
      </div>
      <!-- lista del pedido -->
      <div class="modal-admin__lista">

        <!-- item -->
        <div class="modal-admin__lista-item">
          <!-- numero producto en la listaa -->
          <div class="modal-admin__lista-num">
            1
          </div>
          <!-- informacion del producto -->
          <div class="modal-admin__lista-info">
            <p class="modal-admin__lista-titulo">Todo terreno en combo</p>
            <ul class="modal-admin__lista-adicional">
              <li>Pepsi</li>
              <li>Francesa</li>
            </ul>
            <h5 class="modal-admin__lista-comentario">Comentarios:</h5>
            <p class="modal-admin__lista-mensaje">
              Enviar salsa de tomate y mayonesa, no incluir la cebolla
            </p>
            <div class="modal-admin__lista-precio">
              $32.300
            </div>
          </div>

        </div>

        <!-- item -->
        <div class="modal-admin__lista-item">
          <!-- numero producto en la listaa -->
          <div class="modal-admin__lista-num">
            2
          </div>
          <!-- informacion del producto -->
          <div class="modal-admin__lista-info">
            <p class="modal-admin__lista-titulo">Todo terreno en combo</p>
            <ul class="modal-admin__lista-adicional">
              <li>Pepsi</li>
              <li>Francesa</li>
            </ul>
            <h5 class="modal-admin__lista-comentario">Comentarios:</h5>
            <p class="modal-admin__lista-mensaje">
              Enviar salsa de tomate y mayonesa, no incluir la cebolla
            </p>
            <div class="modal-admin__lista-precio">
              $32.300
            </div>
          </div>

        </div>

        <!-- item -->
        <div class="modal-admin__lista-item">
          <!-- numero producto en la listaa -->
          <div class="modal-admin__lista-num">
            3
          </div>
          <!-- informacion del producto -->
          <div class="modal-admin__lista-info">
            <p class="modal-admin__lista-titulo">Todo terreno en combo</p>
            <ul class="modal-admin__lista-adicional">
              <li>Pepsi</li>
              <li>Francesa</li>
            </ul>
            <h5 class="modal-admin__lista-comentario">Comentarios:</h5>
            <p class="modal-admin__lista-mensaje">
              Enviar salsa de tomate y mayonesa, no incluir la cebolla
            </p>
            <div class="modal-admin__lista-precio">
              $32.300
            </div>
          </div>

        </div>

      </div>
      <!-- precio total -->
      <div class="modal-admin__costos">
        <div class="modal-admin__row">
          <p class="modal-admin__cupon">
            <strong>Cupón</strong>
            HappyCharlie
          </p>
          <div class="modal-admin__domicilio">
            Sin domicilio
          </div>
        </div>
        <p class="modal-admin__row">
          <strong>Domicilio</strong>
          $0
        </p>
        <div class="modal-admin__total">
          TOTAL COP $54.400
        </div>
      </div>
      <!-- formad de pagos -->
      <div class="modal-admin__pagos">
        <div class="modal-admin__pagos-row">
          <div class="modal-admin__pago">
            Forma de pago
          </div>
          <div class="modal-admin__pago-modo">
            Efectivo <i class="ion-ios-arrow-forward"/>
          </div>
        </div>
        <div class="modal-admin__pagos-row">
          <div class="modal-admin__pago">
            Runner
          </div>
          <div class="modal-admin__pago-modo">
            Juan Camilo Martines <i class="ion-ios-arrow-forward"/>
          </div>
        </div>
      </div>
      <!-- estados -->
      <div class="modal-admin__estados">
        <!-- item -->
        <div class="modal-admin__estado-item">
          Runner esp...
        </div>
        <!-- item -->
        <div class="modal-admin__estado-item">
          Listo en rest
        </div>
        <!-- item -->
        <div class="modal-admin__estado-item">
          Recogido
        </div>
        <!-- item -->
        <div class="modal-admin__estado-item">
          Entregado
        </div>
        <!-- item -->
        <div class="modal-admin__estado-item">
          Pagado
        </div>
        <!-- item -->
        <div class="modal-admin__estado-item">
          Problema Cliente
        </div>
        <!-- item -->
        <div class="modal-admin__estado-item">
          Problema rest
        </div>
      </div>
      <!-- informacion base -->
      <div class="modal-admin__info">
        <p>
          <strong>Cliente: </strong>Pepito perez
          (pepito@javeriana.edu.co
        </p>
        <p>
          <strong>Restaurante: </strong>
          Delirato 3103224982
        </p>
      </div>
    </div>
    <orderCreateModal />
  </main>
</template>

<script>
import orderCreateModal from '../components/orderMain/newOrder'
import ordersBox from '../components/orderMain/ordersBox'
import Menu from '../components/layout/Menu'
export default {
  data () {
    return {
      myRange: {
        start: new Date(2018, 6, 9),
        end: new Date(2018, 6, 10)
      },
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
      }
    }
  },
  components: {
    ordersBox,
    Menu,
    orderCreateModal
  }
}
</script>

<style>

</style>

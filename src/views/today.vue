<template>
  <div class="view-today">
    <section class="admin-hoy__header">

      <div class="admin-hoy__filtro-titulo">
        <h4>Filters</h4>
      </div>

      <div class="admin-hoy__filtro-asign">
        <div class="admin-hoy__filtro">
          <!-- item filtro -->
          <!-- Agregar la clase activo para marcar el item -->
          <div
            @click="filterOrder('all')"
            :class="{activo: setActive('all')}"
            class="admin-hoy__filtro-item">
            <h4>All</h4>
            <p>(30-2)</p>
          </div>
          <!-- item filtro -->
          <div
            @click="filterOrder('vigentes')"
            :class="{activo: setActive('vigentes')}"
            class="admin-hoy__filtro-item">
            <h4>Vigentes</h4>
            <p>(12-2)</p>
          </div>
          <!-- item filtro -->
          <div
            @click="filterOrder('estado')"
            :class="{activo: setActive('estado')}"
            class="admin-hoy__filtro-item">
            <h4>Estado int.</h4>
            <p>(7-1)</p>
          </div>
          <!-- item filtro -->
          <div
            @click="filterOrder('recogidos')"
            :class="{activo: setActive('recogidos')}"
            class="admin-hoy__filtro-item">
            <h4>Recogidos</h4>
            <p>(3-1)</p>
          </div>
          <!-- item filtro -->
          <div
            @click="filterOrder('problemas')"
            :class="{activo: setActive('problemas')}"
            class="admin-hoy__filtro-item">
            <h4>Problemas</h4>
            <p>(4-0)</p>
          </div>
          <!-- item filtro -->
          <div
            @click="filterOrder('entregados')"
            :class="{activo: setActive('entregados')}"
            class="admin-hoy__filtro-item">
            <h4>Entregados</h4>
            <p>(4-0)</p>
          </div>
          <!-- item filtro -->
          <div
            @click="filterOrder('prime')"
            :class="{activo: setActive('prime')}"
            class="admin-hoy__filtro-item">
            <h4>PRIME</h4>
            <p>(3-1)</p>
          </div>
        </div>

      </div>

      <div class="admin-hoy__header-envio">
        <div class="admin-hoy__header-envio-contenedor">
          <!-- Agregar la clase activo para marcar el item -->
          <div
            @click="filterType('delivery')"
            :class='{activo: !isTakeout}'
            class="admin-hoy__header-domicilio ">
            <h4>Domicilios</h4>
            <p>(30-2)</p>
          </div>
          <div
            @click="filterType('takeout')"
            :class='{activo: isTakeout}'
            class="admin-hoy__header-takeout">
            <h4>Take-out</h4>
            <p>(2-4)</p>
          </div>
        </div>
        <div class="admin-hoy__header-cerrar">
          Cerrar
        </div>
      </div>

      <div class="admin-hoy__estadisticas">
        <!-- row -->
        <div class="admin-hoy__estadisticas-row">
          <!-- item -->
          <div class="admin-hoy__estadisticas-item admin-hoy__estadisticas-venta">
            <p>Ventas</p>
            <span>$2’300.540</span>
          </div>
          <!-- item -->
          <div class="admin-hoy__estadisticas-item admin-hoy__estadisticas-ocupation">
            <p>Ocupation</p>
            <span>70%</span>
          </div>
        </div>

        <!-- row -->
        <div class="admin-hoy__estadisticas-row">
          <!-- item -->
          <div class="admin-hoy__estadisticas-item admin-hoy__estadisticas-lost">
            <p>Lost</p>
            <span>$20.450</span>
          </div>
          <!-- item -->
          <div class="admin-hoy__estadisticas-item admin-hoy__estadisticas-sad">
            <p>Sad</p>
            <span>15% (7)</span>
          </div>
        </div>

        <!-- row -->
        <div class="admin-hoy__estadisticas-row">
          <!-- item -->
          <div class="admin-hoy__estadisticas-item admin-hoy__estadisticas-avtime">
            <p>Av. Time</p>
            <span>26 min</span>
          </div>
          <!-- item -->
          <div class="admin-hoy__estadisticas-item admin-hoy__estadisticas-mad">
            <p>Mad</p>
            <span> 4% (2)</span>
          </div>
        </div>

      </div>

    </section>

    <main class="admin-hoy__main">

      <Menu />

      <article class="admin-hoy__paneles">
        <div class="admin-hoy__panel-contenedor">
          <!-- panel -->
          <div class="admin-hoy__panel">
            <div class="admin-hoy__panel-header">
              <h3>Pending</h3>
              <!-- menu -->
              <div class="admin-hoy__panel-menu">
                <!-- agregar la clase 'activo' para aplicar estilo -->
                <a
                  @click="filterLeft('hour')"
                  :class="{activo: setLeftActive('hour') }"
                  class="admin-hoy__panel-menu-item">
                  00:00
                </a>
                <a
                  @click="filterLeft('time')"
                  :class="{activo: setLeftActive('time') }"
                  class="admin-hoy__panel-menu-item">
                  <i class="ceu-icon-time-left"/>
                </a>
                <a
                  @click="filterLeft('place')"
                  :class="{activo: setLeftActive('place') }"
                  class="admin-hoy__panel-menu-item">
                  <i class="ceu-icon-shop"/>
                </a>
                <a
                  @click="filterLeft('price')"
                  :class="{activo: setLeftActive('price') }"
                  class="admin-hoy__panel-menu-item">
                  <i class="ceu-icon-coin"/>
                </a>
              </div>
              <!--. menu -->
            </div>
            <!--. header panel  -->
            <!-- body panel -->
            <div class="admin-hoy__panel-body">
              <!-- item -->
              <div
                @click="toggleDetail(order)"
                v-for="order in pendingOrders"
                :key="order.id"
                class="admin-hoy__panel-item">
                <div class="admin-hoy__nombre">
                  <div class="admin-hoy__ubicacion-precio admin-hoy__triger">
                    <div class="admin-hoy__nombre-ubicacion">
                      <h3>{{ order.commerce.commercial_name }}</h3>
                      <p>{{ order.address }}</p>
                    </div>
                    <div class="admin-hoy__precio">
                      <h3>{{ order.total }}</h3>
                      <p>
                        <i class="ceu-icon-payment-terminal"/>
                        {{ order.json_products.length }}
                      </p>
                    </div>
                  </div>
                  <div class="admin-hoy__nombre-row">
                    <v-select
                      label="name"
                      class="search-select"
                      max-height="250px"
                      placeholder="Asignar"
                      v-model="runnerUser"
                      :clear-search-on-select="false"
                      :options="runners">
                      <div
                        class="runners__list-item"
                        slot="option"
                        :title="option.name"
                        slot-scope="option">
                        <div class="runners__list-name">
                          {{ option.name }}
                        </div>
                        <div class="runners__list-status">
                          <div class="runner__list-available">
                            {{ option.process }} / {{ option.capacity }}
                          </div>
                          <i class="ion-android-arrow-forward" />
                        </div>
                      </div>
                    </v-select>
                  </div>
                </div>
                <div class="admin-hoy__estado-info">
                  <h3 class="size">{{ order.status }}</h3>
                  <p>{{ order.cellphone }}</p>
                  <div class="admin-hoy__estado">
                    Listo en..
                  </div>
                </div>
                <div class="admin-hoy__panel-tiempo">
                  <p>11:45</p>
                  <span>({{ order.json_products.length }})</span>
                  <p>{{ order.id }}</p>
                </div>
              </div>
            </div>
          </div>
          <!-- panel -->
          <div class="admin-hoy__panel">
            <div class="admin-hoy__panel-header">
              <h3>Out of track</h3>
              <!-- menu -->
              <div class="admin-hoy__panel-menu">
                <a
                  @click="filterMiddle('hour')"
                  :class="{activo: setMiddleActive('hour') }"
                  class="admin-hoy__panel-menu-item">
                  00:00
                </a>
                <!-- agregar la clase 'activo' para aplicar estilo -->
                <a
                  @click="filterMiddle('time')"
                  :class="{activo: setMiddleActive('time') }"
                  class="admin-hoy__panel-menu-item">
                  <i class="ceu-icon-time-left"/>
                </a>
                <a
                  @click="filterMiddle('place')"
                  :class="{activo: setMiddleActive('place') }"
                  class="admin-hoy__panel-menu-item">
                  <i class="ceu-icon-shop"/>
                </a>
                <a
                  @click="filterMiddle('price')"
                  :class="{activo: setMiddleActive('price') }"
                  class="admin-hoy__panel-menu-item">
                  <i class="ceu-icon-coin"/>
                </a>
              </div>
              <!--. menu -->
            </div>
            <!--. header panel  -->
            <!-- body panel -->
            <div class="admin-hoy__panel-body">
              <!-- item -->
              <div class="admin-hoy__panel-item">
                <div class="admin-hoy__nombre">
                  <div class="admin-hoy__ubicacion-precio admin-hoy__triger">
                    <div class="admin-hoy__nombre-ubicacion">
                      <h3>Delirato</h3>
                      <p>ML 203</p>
                    </div>
                    <div class="admin-hoy__precio">
                      <h3>$30.000</h3>
                      <p>
                        <i class="ceu-icon-payment-terminal"/>
                        3
                      </p>
                    </div>
                  </div>
                  <div class="admin-hoy__nombre-row">
                    <select class="admin-hoy__nombre-runner">
                      <option value="">Asignar</option>
                      <option value=""> J. Marquez - 0/2</option>
                      <option value="">M. Pardo - 1/3</option>
                      <option value="">J. Ramirez - 1/3</option>
                      <option value="">E. Gomez - 1/2</option>
                      <option value="">F. Zamora - 2/3</option>
                      <option value="">R. Martinez - 2/4</option>
                      <option value="">Q. Tarantino - 2/2</option>
                      <option value="">A. Motzart - 3/3</option>
                      <option value="">J. Balvin - 3/3</option>
                      <option value="">E. Gomez - 1/2</option>
                      <option value="">F. Zamora - 2/3</option>
                      <option value="">R. Martinez - 2/4</option>
                      <option value="">Q. Tarantino - 2/2</option>
                      <option value="">A. Motzart - 3/3</option>
                      <option value="">J. Balvin - 3/3</option>
                    </select>
                  </div>
                </div>
                <div class="admin-hoy__estado-info">
                  <!-- para indicar que esta aceptado se agrega la clase "admin-hoy__estado-aceptado" -->
                  <h3 class="admin-hoy__estado-aceptado">Aceptado.</h3>
                  <p>(3006304982)</p>
                  <div class="admin-hoy__estado">
                    Listo en..
                  </div>
                </div>
                <div class="admin-hoy__panel-tiempo">
                  <p>11:45</p>
                  <span>(22)</span>
                  <p>15413</p>
                </div>
              </div>
              <!-- item -->
              <div class="admin-hoy__panel-item">
                <div class="admin-hoy__nombre">
                  <div class="admin-hoy__ubicacion-precio">
                    <div class="admin-hoy__nombre-ubicacion">
                      <h3>Delirato</h3>
                      <p>ML 203</p>
                    </div>
                    <div class="admin-hoy__precio">
                      <h3>$30.000</h3>
                      <p>
                        <img
                          src="../assets/images/iconos-multicolor/nequi.png"
                          alt="">
                        3
                      </p>
                    </div>
                  </div>
                  <div class="admin-hoy__nombre-row">
                    <select class="admin-hoy__nombre-runner">
                      <option value="">Asignar</option>
                      <option value=""> J. Marquez - 0/2</option>
                      <option value="">M. Pardo - 1/3</option>
                      <option value="">J. Ramirez - 1/3</option>
                      <option value="">E. Gomez - 1/2</option>
                      <option value="">F. Zamora - 2/3</option>
                      <option value="">R. Martinez - 2/4</option>
                      <option value="">Q. Tarantino - 2/2</option>
                      <option value="">A. Motzart - 3/3</option>
                      <option value="">J. Balvin - 3/3</option>
                      <option value="">E. Gomez - 1/2</option>
                      <option value="">F. Zamora - 2/3</option>
                      <option value="">R. Martinez - 2/4</option>
                      <option value="">Q. Tarantino - 2/2</option>
                      <option value="">A. Motzart - 3/3</option>
                      <option value="">J. Balvin - 3/3</option>
                    </select>
                  </div>
                </div>
                <div class="admin-hoy__estado-info">
                  <h3>Listo en rest.</h3>
                  <p>(3006304982)</p>
                  <div class="admin-hoy__estado">
                    Listo en..
                  </div>
                </div>
                <div class="admin-hoy__panel-tiempo">
                  <p>11:45</p>
                  <span>(22)</span>
                  <p>15413</p>
                </div>
              </div>
              <!-- item -->
              <div class="admin-hoy__panel-item">
                <div class="admin-hoy__nombre">
                  <div class="admin-hoy__nombre-ubicacion">
                    <h3>Delirato</h3>
                    <p>ML 203</p>
                  </div>
                  <div class="admin-hoy__precio">
                    <h3>$30.000</h3>
                    <p>
                      <img
                        src="../assets/images/iconos-multicolor/nequi.png"
                        alt="">
                      3
                    </p>
                  </div>
                  <div class="admin-hoy__nombre-row">
                    <select class="admin-hoy__nombre-runner">
                      <option value="">Asignar</option>
                      <option value=""> J. Marquez - 0/2</option>
                      <option value="">M. Pardo - 1/3</option>
                      <option value="">J. Ramirez - 1/3</option>
                      <option value="">E. Gomez - 1/2</option>
                      <option value="">F. Zamora - 2/3</option>
                      <option value="">R. Martinez - 2/4</option>
                      <option value="">Q. Tarantino - 2/2</option>
                      <option value="">A. Motzart - 3/3</option>
                      <option value="">J. Balvin - 3/3</option>
                      <option value="">E. Gomez - 1/2</option>
                      <option value="">F. Zamora - 2/3</option>
                      <option value="">R. Martinez - 2/4</option>
                      <option value="">Q. Tarantino - 2/2</option>
                      <option value="">A. Motzart - 3/3</option>
                      <option value="">J. Balvin - 3/3</option>
                    </select>
                  </div>
                </div>
                <div class="admin-hoy__estado-info">
                  <h3>Listo en rest.</h3>
                  <p>(3006304982)</p>
                  <div class="admin-hoy__estado">
                    Listo en..
                  </div>
                </div>
                <div class="admin-hoy__panel-tiempo">
                  <p>11:45</p>
                  <span>(22)</span>
                  <p>15413</p>
                </div>
              </div>
              <!-- item -->
              <div class="admin-hoy__panel-item">
                <div class="admin-hoy__nombre">
                  <div class="admin-hoy__nombre-ubicacion">
                    <h3>Delirato</h3>
                    <p>ML 203</p>
                  </div>
                  <div class="admin-hoy__precio">
                    <h3>$30.000</h3>
                    <p>
                      <!-- <img src="../assets/images/iconos-multicolor/nequi.png" alt="">  -->
                      <i class="ceu-icon-payment-terminal"/>
                      3
                    </p>
                  </div>
                  <div class="admin-hoy__nombre-row">
                    <select class="admin-hoy__nombre-runner">
                      <option value=""> Asignar </option>
                      <option value=""> J. Marquez - 0/2</option>
                      <option value="">M. Pardo - 1/3</option>
                      <option value="">J. Ramirez - 1/3</option>
                      <option value="">E. Gomez - 1/2</option>
                      <option value="">F. Zamora - 2/3</option>
                      <option value="">R. Martinez - 2/4</option>
                      <option value="">Q. Tarantino - 2/2</option>
                      <option value="">A. Motzart - 3/3</option>
                      <option value="">J. Balvin - 3/3</option>
                      <option value="">E. Gomez - 1/2</option>
                      <option value="">F. Zamora - 2/3</option>
                      <option value="">R. Martinez - 2/4</option>
                      <option value="">Q. Tarantino - 2/2</option>
                      <option value="">A. Motzart - 3/3</option>
                      <option value="">J. Balvin - 3/3</option>
                    </select>
                  </div>
                </div>
                <div class="admin-hoy__estado-info">
                  <h3>Listo en rest.</h3>
                  <p>(3006304982)</p>
                  <div class="admin-hoy__estado">
                    Listo en..
                  </div>
                </div>
                <div class="admin-hoy__panel-tiempo">
                  <p>11:45</p>
                  <span>(22)</span>
                  <p>15413</p>
                </div>
              </div>
              <!-- item -->
              <div class="admin-hoy__panel-item">
                <div class="admin-hoy__nombre">
                  <div class="admin-hoy__nombre-ubicacion">
                    <h3>Delirato</h3>
                    <p>ML 203</p>
                  </div>
                  <div class="admin-hoy__precio">
                    <h3>$30.000</h3>
                    <p>
                      <!-- <img src="../assets/images/iconos-multicolor/nequi.png" alt="">  -->
                      <i class="ceu-icon-payment-terminal"/>
                      3
                    </p>
                  </div>
                  <div class="admin-hoy__nombre-row">
                    <select class="admin-hoy__nombre-runner">
                      <option value="">Asignar</option>
                      <option value=""> J. Marquez - 0/2</option>
                      <option value="">M. Pardo - 1/3</option>
                      <option value="">J. Ramirez - 1/3</option>
                      <option value="">E. Gomez - 1/2</option>
                      <option value="">F. Zamora - 2/3</option>
                      <option value="">R. Martinez - 2/4</option>
                      <option value="">Q. Tarantino - 2/2</option>
                      <option value="">A. Motzart - 3/3</option>
                      <option value="">J. Balvin - 3/3</option>
                      <option value="">E. Gomez - 1/2</option>
                      <option value="">F. Zamora - 2/3</option>
                      <option value="">R. Martinez - 2/4</option>
                      <option value="">Q. Tarantino - 2/2</option>
                      <option value="">A. Motzart - 3/3</option>
                      <option value="">J. Balvin - 3/3</option>
                    </select>
                  </div>
                </div>
                <div class="admin-hoy__estado-info">
                  <!-- para indicar que esta aceptado se agrega la clase "admin-hoy__estado-aceptado" -->
                  <h3 class="admin-hoy__estado-aceptado">Aceptado.</h3>
                  <p>(3006304982)</p>
                  <div class="admin-hoy__estado">
                    Listo en..
                  </div>
                </div>
                <div class="admin-hoy__panel-tiempo">
                  <p>11:45</p>
                  <span>(22)</span>
                  <p>15413</p>
                </div>
              </div>
            </div>
          </div>
          <!-- panel -->
          <div class="admin-hoy__panel">
            <div class="admin-hoy__panel-header">
              <h3>{{ selectedFilter }}</h3>
              <!-- menu -->
              <div class="admin-hoy__panel-menu">
                <a
                  @click="filterRight('hour')"
                  :class="{activo: setRightActive('hour') }"
                  class="admin-hoy__panel-menu-item">
                  00:00
                </a>
                <a
                  @click="filterRight('time')"
                  :class="{activo: setRightActive('time') }"
                  class="admin-hoy__panel-menu-item">
                  <i class="ceu-icon-time-left"/>
                </a>
                <a
                  @click="filterRight('place')"
                  :class="{activo: setRightActive('place') }"
                  class="admin-hoy__panel-menu-item">
                  <i class="ceu-icon-shop"/>
                </a>
                <!-- agregar la clase 'activo' para aplicar estilo -->
                <a
                  @click="filterRight('price')"
                  :class="{activo: setRightActive('price') }"
                  class="admin-hoy__panel-menu-item">
                  <i class="ceu-icon-coin"/>
                </a>
              </div>
              <!--. menu -->
            </div>
            <!--. header panel  -->
            <!-- body panel -->
            <div class="admin-hoy__panel-body">
              <!-- item -->
              <div
                @click="toggleDetail(order)"
                v-for="order in filterOrders"
                :key="order.id"
                class="admin-hoy__panel-item">
                <div class="admin-hoy__nombre">
                  <div class="admin-hoy__ubicacion-precio admin-hoy__triger">
                    <div class="admin-hoy__nombre-ubicacion">
                      <h3>{{ order.commerce.commercial_name }}</h3>
                      <p>{{ order.address }}</p>
                    </div>
                    <div class="admin-hoy__precio">
                      <h3>{{ order.total }}</h3>
                      <p>
                        <i class="ceu-icon-payment-terminal"/>
                        {{ order.json_products.length }}
                      </p>
                    </div>
                  </div>
                  <div class="admin-hoy__nombre-row">
                    <v-select
                      label="name"
                      class="search-select"
                      max-height="250px"
                      placeholder="Asignar"
                      v-model="runnerUser"
                      :clear-search-on-select="false"
                      :options="runners">
                      <div
                        class="runners__list-item"
                        slot="option"
                        :title="option.name"
                        slot-scope="option">
                        <div class="runners__list-name">
                          {{ option.name }}
                        </div>
                        <div class="runners__list-status">
                          <div class="runner__list-available">
                            {{ option.process }} / {{ option.capacity }}
                          </div>
                          <i class="ion-android-arrow-forward" />
                        </div>
                      </div>
                    </v-select>
                  </div>
                </div>
                <div class="admin-hoy__estado-info">
                  <h3 class="size">{{ order.status }}</h3>
                  <p>{{ order.cellphone }}</p>
                  <div class="admin-hoy__estado">
                    Listo en..
                  </div>
                </div>
                <div class="admin-hoy__panel-tiempo">
                  <p>11:45</p>
                  <span>({{ order.json_products.length }})</span>
                  <p>{{ order.id }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

    </main>
    <!-- modal detalles -->
    <modal-details
      @close-details="showDetail = $event"
      :show-modal="showDetail"
      :order-summary="orderSummary"
    />
  </div>
</template>

<script>
import configService from '../settings/api-url.js'
import Menu from '../components/layout/Menu'
import ModalDetails from '../components/today/modal-details'
import {stateGroups} from '../stateGroup.js'

export default {
  name: 'Today',
  components: {
    Menu,
    ModalDetails
  },
  data () {
    return {
      orderSummary: {},
      rightPanelActive: '',
      middlePanelActive: '',
      letfPanelActive: '',
      pendingOrders: [],
      activeFilter: 'all',
      filterOrders: [],
      orders: [],
      selectedFilter: 'All',
      isTakeout: false,
      runnerUser: '',
      runners: [
        {
          name: 'Anderson Mesa Cardozo',
          capacity: 3,
          process: 1
        },
        {
          name: 'M. Pardo',
          capacity: 3,
          process: 2
        },
        {
          name: 'J. Marquez',
          capacity: 3,
          process: 0
        },
        {
          name: 'E. Gomez',
          capacity: 3,
          process: 1
        },
        {
          name: 'F. Zamora',
          capacity: 3,
          process: 1
        },
        {
          name: 'J. Balvin',
          capacity: 3,
          process: 1
        },
        {
          name: 'A. Mesa',
          capacity: 3,
          process: 1
        },
        {
          name: 'D. Tobon',
          capacity: 3,
          process: 1
        },
        {
          name: 'D. Serrano',
          capacity: 3,
          process: 1
        },
        {
          name: 'J. Balvin',
          capacity: 3,
          process: 1
        },
        {
          name: 'A. Mesa',
          capacity: 3,
          process: 1
        },
        {
          name: 'D. Tobon',
          capacity: 3,
          process: 1
        },
        {
          name: 'D. Serrano',
          capacity: 3,
          process: 1
        }
      ],
      showDetail: false
    }
  },
  watch: {
    orderSummary (newOrder, oldOrder) {
      console.log(newOrder, oldOrder)
    },
    activeFilter (active) {
      console.log(active)
      switch (active) {
        case 'all':
          this.groupOrders(stateGroups.all)
          break
        case 'vigentes':
          this.groupOrders(stateGroups.vigentes)
          break
        case 'estado':
          this.groupOrders(stateGroups.intermedio)
          break
        case 'recogidos':
          this.groupOrders(stateGroups.recogidos)
          break
        case 'problemas':
          this.groupOrders(stateGroups.problemas)
          break
        case 'entregados':
          this.groupOrders(stateGroups.entregados)
          break
        case 'prime':
          this.groupOrders(active)
          break
        default:
          break
      }
      this.rightPanelActive = ''
      this.middlePanelActive = ''
      this.letfPanelActive = ''
    },
    isTakeout (active) {
      console.log(active)
      switch (this.activeFilter) {
        case 'all':
          this.groupOrders(stateGroups.all)
          break
        case 'vigentes':
          this.groupOrders(stateGroups.vigentes)
          break
        case 'estado':
          this.groupOrders(stateGroups.intermedio)
          break
        case 'recogidos':
          this.groupOrders(stateGroups.recogidos)
          break
        case 'problemas':
          this.groupOrders(stateGroups.problemas)
          break
        case 'entregados':
          this.groupOrders(stateGroups.entregados)
          break
        case 'prime':
          this.groupOrders(this.activeFilter)
          break
        default:
          break
      }
      this.rightPanelActive = ''
      this.middlePanelActive = ''
      this.letfPanelActive = ''
    }
  },
  methods: {
    filterRight (type) {
      this.rightPanelActive = type
      this.sortBy('right', type)
    },
    setRightActive (type) {
      if (this.rightPanelActive === type) {
        return true
      }
    },
    setMiddleActive (type) {
      if (this.middlePanelActive === type) {
        return true
      }
    },
    filterMiddle (type) {
      this.middlePanelActive = type
    },
    setLeftActive (type) {
      if (this.letfPanelActive === type) {
        return true
      }
    },
    filterLeft (type) {
      this.letfPanelActive = type
      this.sortBy('left', type)
    },
    setActive (type) {
      if (this.activeFilter === type) {
        return true
      }
    },
    sortBy (side, type) {
      switch (type) {
        case 'hour':
          if (side === 'left') {
            this.pendingOrders = this.pendingOrders.sort((a, b) => {
              return new Date(a.created_at) - new Date(b.created_at)
            })
          }

          if (side === 'right') {
            this.filterOrders = this.filterOrders.sort((a, b) => {
              return new Date(a.created_at) - new Date(b.created_at)
            })
          }
          break
        case 'price':
          if (side === 'left') {
            this.pendingOrders = this.pendingOrders.sort((a, b) => {
              return a.total - b.total
            })
          }

          if (side === 'right') {
            this.filterOrders = this.filterOrders.sort((a, b) => {
              return a.total - b.total
            })
          }
          break
        case 'place':
          if (side === 'left') {
            this.pendingOrders = this.pendingOrders.sort((a, b) => {
              if (a.address > b.address) {
                return 1
              }
            })
          }

          if (side === 'right') {
            this.pendingOrders = this.filterOrders.sort((a, b) => {
              if (a.address > b.address) {
                return 1
              }
            })
          }
          break
        default:
          break
      }
    },
    setOrderCount (orders, pending) {
      orders.map((element, index) => {
        let auxiliar = []
        element.json_products.forEach(element => {
          const repeated = auxiliar.findIndex(element1 => {
            return element1.total_price === element.total_price && element1.name === element.name
          })
          if (repeated === -1) {
            auxiliar.push({...element, count: 1})
          } else {
            auxiliar[0].count++
          }
        })
        element.json_products = auxiliar
        return element.json_products
      })
      if (pending) {
        if (pending === 'pending') {
          this.pendingOrders = orders
          console.log(this.pendingOrders)
        }
      } else {
        this.filterOrders = orders
        console.log(this.filterOrders)
      }
      console.log(this.orders)
    },
    filterType (type) {
      if (type === 'takeout') {
        this.isTakeout = true
      } else {
        this.isTakeout = false
      }

      this.filterOrder(this.activeFilter)
    },
    filterOrder (type) {
      this.activeFilter = type
    },
    toggleDetail (order) {
      if (this.orderSummary === order) {
        if (this.showDetail) {
          this.showDetail = false
        } else {
          this.showDetail = true
        }
      } else {
        this.showDetail = true
      }
      this.orderSummary = order
    },
    setOrdinalOrder (groupFilter) {
      if (groupFilter === 'prime') {
        this.setOrderCount(this.orders.filter(element => {
          if (this.isTakeout) {
            if (element.user_prime && element.is_takeout) {
              return true
            }
          } else {
            if (element.user_prime && !element.is_takeout) {
              return true
            }
          }
        }))
      } else {
        this.setOrderCount(this.orders.filter(element => {
          if (groupFilter.includes(element.status) && (this.isTakeout ? element.is_takeout : !element.is_takeout)) {
            return true
          }
        }))
      }
    },
    setPendingOrder (groupFilter) {
      if (groupFilter === 'prime') {
        this.setOrderCount(this.orders.filter(element => {
          if (this.isTakeout) {
            if (element.user_prime && element.is_takeout) {
              return true
            }
          } else {
            if (element.user_prime && !element.is_takeout) {
              return true
            }
          }
        }), 'pending')
      } else {
        this.setOrderCount(this.orders.filter(element => {
          if (groupFilter.includes(element.status) && (this.isTakeout ? element.is_takeout : !element.is_takeout)) {
            return true
          }
        }), 'pending')
      }
    },
    groupOrders (groupFilter) {
      this.setOrdinalOrder(groupFilter)
      this.setPendingOrder(stateGroups.pending)
    }
  },
  created () {
    this.isAllActive = true
    configService('central_admin/orders?university_id=1')
      .then(response => {
        this.orders = response.data
        console.log(this.orders)
        this.groupOrders(stateGroups.all)
        console.log(this.filterOrders[0])
        console.log(this.orders)
      })
      .catch(error => {
        console.log(error)
      })
    this.orderSummary = this.orders[0]
  }
}
</script>

<style>
.size {
   white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
    max-width: 100px;
}
</style>

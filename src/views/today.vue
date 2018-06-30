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
          <div class="admin-hoy__filtro-item activo">
            <h4>All</h4>
            <p>(30-2)</p>
          </div>
          <!-- item filtro -->
          <div class="admin-hoy__filtro-item">
            <h4>Vigentes</h4>
            <p>(12-2)</p>
          </div>
          <!-- item filtro -->
          <div class="admin-hoy__filtro-item">
            <h4>Estado int.</h4>
            <p>(7-1)</p>
          </div>
          <!-- item filtro -->
          <div class="admin-hoy__filtro-item">
            <h4>Recogidos</h4>
            <p>(3-1)</p>
          </div>
          <!-- item filtro -->
          <div class="admin-hoy__filtro-item">
            <h4>Problemas</h4>
            <p>(4-0)</p>
          </div>
          <!-- item filtro -->
          <div class="admin-hoy__filtro-item">
            <h4>Entregados</h4>
            <p>(4-0)</p>
          </div>
          <!-- item filtro -->
          <div class="admin-hoy__filtro-item">
            <h4>PRIME</h4>
            <p>(3-1)</p>
          </div>
        </div>

        <div class="admin-hoy__asign">
          <p>Auto asign</p>
          <div class="lista-checkbox2 large">
            <input
              type="checkbox"
              id="auto-asign"
              checked>
            <label
              for="auto-asign"
              data-checkedsi="On"
              data-checkedno="Off"/>
          </div>
        </div>

      </div>

      <div class="admin-hoy__header-envio">
        <div class="admin-hoy__header-envio-contenedor">
          <!-- Agregar la clase activo para marcar el item -->
          <div class="admin-hoy__header-domicilio activo">
            <h4>Domicilios</h4>
            <p>(30-2)</p>
          </div>
          <div class="admin-hoy__header-takeout">
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
                  href=""
                  class="admin-hoy__panel-menu-item activo">
                  00:00
                </a>
                <a
                  href=""
                  class="admin-hoy__panel-menu-item">
                  <i class="ceu-icon-time-left"/>
                </a>
                <a
                  href=""
                  class="admin-hoy__panel-menu-item">
                  <i class="ceu-icon-shop"/>
                </a>
                <a
                  href=""
                  class="admin-hoy__panel-menu-item">
                  <i class="ceu-icon-placeholder"/>
                </a>
                <a
                  href=""
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
                  <!-- la clase admin-hoy__triger  ejecuta el evento abrir modal-->
                  <div
                    @click="toggleDetail"
                    class="admin-hoy__ubicacion-precio">
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
                    <!-- <select class="admin-hoy__nombre-runner">
                    </select> -->
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
                  <h3 class="admin-hoy__estado-aceptado">Aceptado.</h3>
                  <p>(3006304982)</p>
                  <div class="admin-hoy__estado">
                    Listo en..
                  </div>
                </div>
                <div class="admin-hoy__panel-tiempo">
                  <p>11:45</p>
                  <!-- se manejan 3 estados alto medio y bajo -->
                  <!-- agregar la clase 'alto' para activar este estado -->
                  <!-- agregar la clase 'medio' para activar este estado -->
                  <!-- se deja sin clase para indicat bajo -->
                  <span class="alto">(22)</span>
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
                  <!-- se manejan 3 estados alto medio y bajo -->
                  <!-- agregar la clase 'alto' para activar este estado -->
                  <!-- agregar la clase 'medio' para activar este estado -->
                  <!-- se deja sin clase para indicat bajo -->
                  <span class="medio">(22)</span>
                  <p>15413</p>
                </div>
              </div>
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
                  <h3 class="admin-hoy__estado-aceptado">Aceptado.</h3>
                  <p>(3006304982)</p>
                  <div class="admin-hoy__estado">
                    Listo en..
                  </div>
                </div>
                <div class="admin-hoy__panel-tiempo">
                  <p>11:45</p>
                  <!-- se manejan 3 estados alto medio y bajo -->
                  <!-- agregar la clase 'alto' para activar este estado -->
                  <!-- agregar la clase 'medio' para activar este estado -->
                  <!-- se deja sin clase para indicat bajo -->
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
                        <!-- <img src="../assets/images/iconos-multicolor/nequi.png" alt="">  -->
                        <i class="ceu-icon-payment-terminal"/>
                        3
                      </p>
                    </div>
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
                        <!-- <img src="../assets/images/iconos-multicolor/nequi.png" alt="">  -->
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
            </div>
          </div>
          <!-- panel -->
          <div class="admin-hoy__panel">
            <div class="admin-hoy__panel-header">
              <h3>Out of track</h3>
              <!-- menu -->
              <div class="admin-hoy__panel-menu">
                <a
                  href=""
                  class="admin-hoy__panel-menu-item">
                  00:00
                </a>
                <!-- agregar la clase 'activo' para aplicar estilo -->
                <a
                  href=""
                  class="admin-hoy__panel-menu-item activo">
                  <i class="ceu-icon-time-left"/>
                </a>
                <a
                  href=""
                  class="admin-hoy__panel-menu-item">
                  <i class="ceu-icon-shop"/>
                </a>
                <a
                  href=""
                  class="admin-hoy__panel-menu-item">
                  <i class="ceu-icon-placeholder"/>
                </a>
                <a
                  href=""
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
              <h3>All</h3>
              <!-- menu -->
              <div class="admin-hoy__panel-menu">
                <a
                  href=""
                  class="admin-hoy__panel-menu-item">
                  00:00
                </a>
                <a
                  href=""
                  class="admin-hoy__panel-menu-item">
                  <i class="ceu-icon-time-left"/>
                </a>
                <a
                  href=""
                  class="admin-hoy__panel-menu-item">
                  <i class="ceu-icon-shop"/>
                </a>
                <!-- agregar la clase 'activo' para aplicar estilo -->
                <a
                  href=""
                  class="admin-hoy__panel-menu-item activo">
                  <i class="ceu-icon-placeholder"/>
                </a>
                <a
                  href=""
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
            </div>
          </div>
        </div>
      </article>

    </main>
    <!-- modal detalles -->
    <modal-details
      @close-details="toggleDetail"
      :show-modal="showDetail" />
  </div>
</template>

<script>
import Menu from '../components/layout/Menu'
import ModalDetails from '../components/today/modal-details'

export default {
  name: 'Today',
  components: {
    Menu,
    ModalDetails
  },
  data () {
    return {
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
  methods: {
    toggleDetail () {
      this.showDetail = !this.showDetail
    }
  }
}
</script>

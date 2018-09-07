<template>
  <div class="admin-hoy__panel">
    <div class="admin-hoy__panel-header">
      <h3>{{ type === 'pending' ? 'Pendientes' : 'En proceso' }}</h3>
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
                <!-- <img src="../../assets/images/iconos-multicolor/nequi.png" alt="">  -->
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
                <!-- <img src="../../assets/images/iconos-multicolor/nequi.png" alt="">  -->
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
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: ''
    }
  }

}
</script>

<style>

</style>

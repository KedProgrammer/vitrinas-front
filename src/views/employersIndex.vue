<template>
  <div class="employers_index">
    <create-button />
    <div class="employer_index-items">
      <employer :key="employee.id" v-for="employee in employers"
      :id="employee.id"
      :name="employee.name"
      :lastName="employee.last_name"
      :cellphone="employee.cellphone"
      :identification="employee.identification"
      @addEmployer="addEmployer"
    />
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import  employer from '../components/humanManagment/employer'
import  createButton from '../components/humanManagment/createButton'
import configService from '../settings/api-url'
export default {
  components: {
    employer,
    createButton
  },
  computed: {
    ...mapState(['employers'])
  },
  methods: {
    ...mapMutations(['setEmployers']),
    addEmployer (employer) {
      this.employers.push(employer)
    }
  },
  async created () {
    if (this.employers.length === 0) {
      const { data }  = await configService.get('admin/employers')
      this.setEmployers(data)
    }
  }
}
</script>
<template>
  <Banner />
  <div class="main-container">
    <h1>Conferência de Estoque.:</h1>
    <Remessas />
  </div>
</template>

<script>
import Banner from "../components/Banner.vue"
import Remessas from "../components/Remessas.vue"

export default {
  name: 'ReabastecimentoView',
  components: {
    Banner,
    Remessas
  }
}
</script>

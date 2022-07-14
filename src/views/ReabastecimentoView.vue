<template>
  <Banner />
  <div class="main-container">
    <h1>Declare o seu pedido de reabastecimento.:</h1>
    <ReabastecimentoForm />
  </div>
</template>

<script>
import Banner from "../components/Banner.vue"
import ReabastecimentoForm from "../components/ReabastecimentoForm.vue"

export default {
  name: 'ReabastecimentoView',
  components: {
    Banner,
    ReabastecimentoForm
  }
}
</script>

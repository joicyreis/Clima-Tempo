<template>
  <div class="home">
    <b-navbar class="navbar" type="dark" variant="info">
      <b-navbar-brand>CLIMABR</b-navbar-brand>
    </b-navbar>
    <b-container>
      <b-input class="input" v-model="cidade" type="text" placeholder="Buscar cidade" @input="buscarCidade(cidade)"></b-input>
      <div class="bloco-cidade" v-for="cidade in cidadeEncontrada" :key="cidade" @click="climaBR()">
        <div class="cidade">{{cidade.nome}}</div>
        <div class="estado">{{cidade.estado.nome}}</div>
      </div>
    </b-container>
  </div>
</template>

<script>
import cidadesBrasileiras from '../domain/cidades-brasileiras'
export default {
  name: 'Home',
  components: {
  },
  data () {
    return {
      visible: false,
      focus: false,
      cidade: '',
      cidadeEncontrada: [],
      listaCidades: [],
    }
  },
  created() {
    this.listaCidades = cidadesBrasileiras.cidades;
  },
  methods: {
    buscarCidade(cidade) {
      this.cidadeEncontrada = this.listaCidades.filter(city => {
        if(city.nome.toLowerCase() === cidade.toLowerCase()) {
          return city.nome
        }
      });
    },
    climaBR() {
      this.$router.push({name: 'Clima', params: { infoCidade: this.cidadeEncontrada }})
    }
  },
}
</script>

<style scoped>
.navbar {
  margin-bottom: 30px;
}

.input {
  border: none !important;
  outline: none;
}

.bloco-cidade {
  margin-top: 20px;
  cursor: pointer;
}

.estado {
  font-size: 14px;
  color: #3880ff;
}
</style>

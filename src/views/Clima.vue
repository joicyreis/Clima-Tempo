<template>
  <div class="clima" v-loading="loading">
    <b-navbar type="dark" variant="info">
      <b-navbar-brand>
        <router-link class="btn-voltar" to="/home">
          <b-icon-arrow-left />
          voltar
        </router-link>
      </b-navbar-brand>
    </b-navbar>
    <div class="card-clima">
      <div class="info-clima">
        <div>{{dadosCidade[0].nome}} | {{new Date().toLocaleDateString('pt-br')}}</div>
        <div class="graus">{{dadosClima.currentTemp}}<div class="icone-graus">ºC</div></div>
        <div class="icone">
          <img :src="`${dadosClima.details[0].icon}`">
        </div>
        <div class="tempo">{{dadosClima.details[0].condition.toUpperCase()}}</div>
        <div class="info-tempo">
          <i class="bi-alarm"></i>
          {{dadosClima.details[0].minTemp}}% |
          <i class="bi-alarm"></i>
          {{dadosClima.details[0].maxTemp}}%
        </div>
        <b-button class="btn-detalhes" @click="detalhesClima = true">Ver detalhes</b-button>
      </div>
      <div v-if="detalhesClima" class="modal-clima">
        <b-card class="modal-info-clima">
          <div v-for="(detail, index) in dadosClima.details" :key="index">
            <div class="colunas">
              <div class="coluna-um">
                <div class="icone-modal">
                  <img :src="`${detail.icon}`" alt="">
                </div>
              </div>
              <div class="coluna-dois">
                <div class="data">{{buscarData(new Date(), index)}}</div>
                <div class="clima">{{detail.condition}}</div>
              </div>
              <div class="coluna-tres">
                <div class="temperatura">
                  <b-icon icon="arrow"></b-icon>
                  {{detail.minTemp}}
                  <div class="i-graus">ºC</div>
                </div>
                <div class="temperatura">{{detail.maxTemp}}<div class="i-graus">ºC</div></div>
              </div>
              <div class="coluna-quatro">
                <div class="probabilidade">{{detail.pop}}%</div>
                <div class="probabilidade">{{detail.humidity}}%</div>
              </div>
            </div>
          </div>
          <b-button class="btn-fechar" variant="primary" @click="detalhesClima = false">Fechar</b-button>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import Cities from '../domain/cities'
export default {
  data() {
    return {
      detalhesClima: false,
      dadosCidade: this.$route.params.infoCidade,
      dadosClima: [],
    }
  },
  created() {
    Cities.getCities(this.dadosCidade).then((response) => {
      this.dadosClima = response;
      this.loading = false;
    }).catch((err) => {
      console.log(err);
      this.loading = false;
    });
  },
  methods: {
    buscarData(value, index) {
      const data = value;
      return new Date(data.getTime() + index * 1000 * 60 * 60 * 24).toLocaleDateString('pt-br').substring(0, 5);
    }
  }
}
</script>

<style scoped>
.btn-voltar {
  font-weight: 300;
  cursor: pointer;
  color: #fff;
  text-decoration: none;
}

.card-clima {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 72px);
}

.info-clima {
  display: flex;
  flex-direction: column;
  justify-content: center !important;
  align-items: center !important;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 20%);
  border: none;
  border-radius: 14px;
  padding: 26px;
  width: 250px;
  position: absolute;
}

.graus {
  font-weight: 700;
  font-size: 42px;
  margin-top: 10px;
  display: flex;
}

.icone-graus {
  font-size: 16px;
  margin-top: 12px;
}

.tempo {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 10px;
}

.temperatura {
  display: flex;
}

.btn-detalhes {
  background-color: #2dd36f;
  border: none;
  margin-top: 20px;
}

.btn-detalhes:hover {
  background-color: #26b660;
}

.modal-clima {
  margin-top: 32px;
  position: relative;
  width: 100%;
  height: calc(100vh - 40px);
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.modal-info-clima {
  z-index: 1000;
  width: 500px;
}

.colunas {
  display: flex !important;
  justify-content: space-between;
  text-align: center;
  align-items: center;
  margin-bottom: 30px;
}

.btn-fechar {
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
}

.b-button:focus {
  outline: none;
}

.coluna-dois {
  width: 120px;
}

.coluna-tres {
  width: 80px;
}

.coluna-quatro {
  width: 80px;
}

.data {
  font-weight: bold;
  font-size: 17px;
}

.clima {
  font-size: 14px;
}

.temperatura {
  font-size: 17px;
  font-weight: 500;
  display: flex;
  justify-content: flex-end;
  margin-right: 20px;
}

.probabilidade {
  font-size: 17px;
  font-weight: 500;
  display: flex;
  justify-content: flex-end;
  margin-right: 20px;
}

.i-graus {
  font-size: 10px;
  margin-top: 4px;
}

</style>
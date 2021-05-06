<template>
  <div class="clima">
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
        <div class="graus">{{dadosClima.tempAtual}}<div class="icone-graus">ºC</div></div>
        <div class="icone">
          <img :src="`${dadosClima.detalhes[0].icone}`">
        </div>
        <div class="tempo">{{dadosClima.detalhes[0].descricao.toUpperCase()}}</div>
        <div class="info-tempo">
          {{dadosClima.detalhes[0].minTemp}}% |
          {{dadosClima.detalhes[0].maxTemp}}%
        </div>
        <b-button class="btn-detalhes" @click="detalhesClima = true">Ver detalhes</b-button>
      </div>
      <div v-if="detalhesClima" class="modal-clima">
        <b-card class="card-info-clima">
          <div v-for="(item, index) in dadosClima.detalhes" :key="index">
            <div class="colunas">
              <div class="card-icone">
                <div class="icone-modal">
                  <img :src="`${item.icone}`" alt="">
                </div>
              </div>
              <div class="card-data">
                <div class="data">{{buscarData(new Date(), index)}}</div>
                <div class="clima">{{item.descricao}}</div>
              </div>
              <div class="card-temperatura">
                <div class="temperatura">
                  {{item.minTemp}}
                  <div class="i-graus">ºC</div>
                </div>
                <div class="temperatura">{{item.maxTemp}}<div class="i-graus">ºC</div></div>
              </div>
              <div class="card-probabilidade">
                <div class="probabilidade">{{item.chuva}}%</div>
                <div class="probabilidade">{{item.humidade}}%</div>
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
import Cidades from '../domain/cidades'
export default {
  data() {
    return {
      detalhesClima: false,
      dadosCidade: this.$route.params.infoCidade,
      dadosClima: [],
    }
  },
  created() {
    Cidades.getCidades(this.dadosCidade).then((response) => {
      this.dadosClima = response;
    }).catch((err) => {
      console.err(err);
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

.card-info-clima {
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

.card-data {
  width: 120px;
}

.card-temperatura {
  width: 80px;
}

.card-probabilidade {
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
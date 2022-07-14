<template>
    <div>
        <Message :msg="msg" v-show="msg" />
        <div>
            <form id="burger-form" @submit="createRemessa">

                <div class="input-container">
                    <label for="nome">Cliente: </label>
                    <input type="text" id="nome" name="nome" v-model="nome" placeholder="Digite o seu nome:">
                </div>

                <div class="input-container">
                    <label for="pao">Pães: </label>
                    <select name="pao" id="pao" v-model="pao">
                        <option value="">Selecione o pão</option>
                        <option v-for="pao in paes" :key="pao.id" :value="pao.tipo">
                            {{ pao.tipo }}
                        </option>
                    </select>
                    <input type="text" id="quantidade" name="quantidade" v-model="quantidade" 
                    placeholder="Digite a quantidade:">
                </div>

                <div class="input-container">
                    <label for="carne">Carnes: </label>
                    <select name="carne" id="carne" v-model="carne">
                        <option value="">Selecione a carne</option>
                        <option v-for="carne in carnes" :key="carne.id" :value="carne.tipo">
                            {{ carne.tipo }}
                        </option>
                    </select>
                    <input type="text" id="quantidade2" name="quantidade2" v-model="quantidade2" 
                    placeholder="Digite a quantidade:">
                </div>

                <div class="input-container">
                    <label for="itemOpcional">Opcional: </label>
                    <select name="itemOpcional" id="itemOpcional" v-model="itemOpcional">
                        <option value="">Selecione o item opcional</option>
                        <option v-for="itemOpcional in opcionaisData" :key="itemOpcional.id" :value="itemOpcional.tipo">
                            {{ itemOpcional.tipo }}
                        </option>
                    </select>
                    <input type="text" id="quantidade3" name="quantidade3" v-model="quantidade3" 
                    placeholder="Digite a quantidade:">
                </div>

                <div class="input-container">
                    <input type="submit" class="submit-btn" value="Confirmar remessa">
                </div>

            </form>
        </div>
    </div>
</template>

<script>
import Message from "./Message.vue"

export default {
    name: "BurgerForm",
    components: {
        Message
    },
    data(){
        return {
            paes: null,
            carnes: null,
            opcionaisData: null,
            nome: null,
            pao: null,
            carne: null,
            itemOpcional: null,
            quantidade: null,
            quantidade2: null,
            quantidade3: null,
            opcionais: [],
            msg: null
        }
    },
    methods: {
        async getIngredients(){
            const req = await fetch("http://localhost:3000/estoque");
            const data = await req.json();

            this.paes = data.paes;
            this.carnes = data.carnes;
            this.opcionaisData = data.opcionais;
        },
        async createRemessa(e){
            e.preventDefault();

            const data = {
                nome: this.nome,
                carne: this.carne,
                quantidade: parseInt(this.quantidade),
                pao: this.pao,
                quantidade2: parseInt(this.quantidade2),
                opcional: this.itemOpcional,
                quantidade3: parseInt(this.quantidade3),
                status: "Solicitado"
            }

            const dataJson = JSON.stringify(data);
            const req = await fetch("http://localhost:3000/remessas", {
                method: "POST", 
                headers: { "Content-Type" : "application/json" },
                body: dataJson 
            });

            const res = await req.json();

            this.msg = `Remessa Nº ${res.id} pedida com sucesso`;

            const data2 = {
                id: this.pao.id,
                tipo: this.pao.tipo,
                quantidade: this.quantidade
            }

            const dataJson2 = JSON.stringify(data2);
            const req2 = await fetch("http://localhost:3000/estoque/paes", {
                method: "PUT", 
                headers: { "Content-Type" : "application/json" },
                body: dataJson2 
            });

            const data3 = {
                id: this.carne.id,
                tipo: this.carne.tipo,
                quantidade: this.quantidade2
            }

            const dataJson3 = JSON.stringify(data3);
            const req3 = await fetch("http://localhost:3000/estoque/carnes", {
                method: "PUT", 
                headers: { "Content-Type" : "application/json" },
                body: dataJson3 
            });

            const data4 = {
                id: this.itemOpcional.id,
                tipo: this.itemOpcional.tipo,
                quantidade: this.quantidade3
            }

            const dataJson4 = JSON.stringify(data4);
            const req4 = await fetch("http://localhost:3000/estoque/opcionais", {
                method: "PUT", 
                headers: { "Content-Type" : "application/json" },
                body: dataJson4 
            });

            setTimeout( () => this.msg = "", 5000) 

            this.nome = "";
            this.pao = "";
            this.carne = "";
            this.itemOpcional = "";
            this.quantidade = 0;
            this.quantidade2 = 0;
            this.quantidade3 = 0;
        }
    },
    mounted(){
        this.getIngredients()
    }
}
</script>

<style scoped>
  #burger-form {
    max-width: 400px;
    margin: 0 auto;
  }

  
  .input-container {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }


  label {
    font-weight: bold;
    margin-bottom: 15px;
    color: #222;;
    padding: 5px 10px;
    border-left: 4px solid #fcba03;
  }

  input, select {
    padding: 5px 10px;
    width: 300px;
  }


  #opcionais-container {
    flex-direction: row;
    flex-wrap: wrap;
  }

  #opcionais-title {
    width: 100%;
  }

  .checkbox-container {
    display: flex;
    align-items: flex-start;
    width: 50%;
    margin-bottom: 20px;
  }
  
  .checkbox-container span,
  .checkbox-container input {
    width: auto;
  }
  
  .checkbox-container span {
    margin-left: 6px;
    font-weight: bold;
  }
  
  .submit-btn {
    background-color: #222;
    color:#fcba03;
    font-weight: bold;
    border: 2px solid #222;
    padding: 10px;
    font-size: 16px;
    margin: 0 auto;
    cursor: pointer;
    transition: .5s;
  }
  
  .submit-btn:hover {
    background-color: transparent;
    color: #222;
  }
</style>
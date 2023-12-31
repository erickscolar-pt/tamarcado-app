import axios from 'axios';

const api = axios.create({
    /* baseURL: 'http://localhost:3000' */
     baseURL: 'http://192.168.1.13:3000' 
     /* baseURL: 'http://192.168.1.14:3000' */
})

const consultarCnpj = async (cnpj:any) => {
    try {
      const response = await axios.get(`https://www.receitaws.com.br/v1/cnpj/${cnpj}`);
      //const response = await axios.get(`https://publica.cnpj.ws/cnpj/${cnpj}`);
      const dadosEmpresa = response.data;
  
      return dadosEmpresa;
    } catch (error) {
      console.error('Erro ao consultar o CNPJ:', error);
    }
};

const consultarCep = async (cep:any) => {
  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    const dadosEndereco = response.data;

    return dadosEndereco;
  } catch (error) {
    console.error('Erro ao consultar o CEP: ', error);
  }
};

export {api, consultarCnpj, consultarCep};
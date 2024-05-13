const url = 'https://go-wash-api.onrender.com/api/auth/address'

async function salvarendereco() {
  let titulo = document.getElementById('Titulo').value
  let cep = document.getElementById('CEP').value
  let endereço = document.getElementById('Endereço').value
  let numero = document.getElementById('Número').value

  if (titulo === '') {
    alert('Preencha o título')
    return
  }

  if (cep === '') {
    alert('Preencha o seu CEP')
    return
  }

  if (endereço === '') {
    alert('Preencha o seu endereço')
    return
  }

  if (numero === '') {
    alert('Preencha o seu número')
    return
  }

  // Verificar se o CEP é válido
  const cepValido = await verificarCEP(cep)
  if (!cepValido) {
    alert(
      'CEP inválido. Por favor, insira um CEP válido cadastrado no site ViaCEP.'
    )
    return
  }

  const resposta = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      title: titulo,
      cep: cep,
      address: endereço,
      number: numero
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if (resposta.ok) {
    alert('Cadastro feito com sucesso')
    salvarDadosLocal(titulo, cep, endereço, numero) // Salvando os dados localmente
    window.location.href = 'login.html' // Redirecionando para a página de login
  } else {
    alert('Ocorreu um erro ao cadastrar o endereço')
  }
}

async function verificarCEP(cep) {
  const viaCEPURL = `https://viacep.com.br/ws/${cep}/json/`
  try {
    const response = await fetch(viaCEPURL)
    const data = await response.json()

    if (!data.erro) {
      // Preencher o campo de endereço com os dados obtidos
      document.getElementById('Endereço').value = data.logradouro
      return true // Retorna true se o CEP for válido e o endereço for preenchido
    } else {
      alert('CEP não encontrado. Por favor, verifique o CEP digitado.')
      return false // Retorna false se o CEP não for encontrado
    }
  } catch (error) {
    console.error('Erro ao verificar CEP:', error)
    return false // Retorna false em caso de erro
  }
}

function initializeMap(cep) {
  const viaCEPURL = `https://viacep.com.br/ws/${cep}/json/`
  fetch(viaCEPURL)
    .then(response => response.json())
    .then(data => {
      if (!data.erro) {
        const endereco = `${data.logradouro}, ${data.localidade} - ${data.uf}`
        const googleMapsURL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          endereco
        )}`
        window.open(googleMapsURL, '_blank')
      } else {
        alert('CEP não encontrado. Por favor, verifique o CEP digitado.')
      }
    })
    .catch(error => console.error('Erro ao verificar CEP:', error))
}

document.getElementById('map-icon').addEventListener('click', function () {
  const cep = document.getElementById('CEP').value
  if (cep !== '') {
    initializeMap(cep)
  } else {
    alert('Por favor, informe um CEP válido antes de visualizar no mapa.')
  }
})

function salvarDadosLocal(titulo, cep, endereço, numero) {
  const dados = {
    titulo: titulo,
    cep: cep,
    endereco: endereço,
    numero: numero
  }
  localStorage.setItem('endereco', JSON.stringify(dados))
}

document.getElementById('CEP').addEventListener('input', function () {
  const cep = this.value
  verificarCEP(cep)
})

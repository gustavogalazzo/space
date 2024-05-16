// Definindo a URL da API para obter o endereço com base no CEP
const url = 'https://go-wash-api.onrender.com/api/user'

// Selecionando os elementos do formulário de endereço
const addressForm = document.querySelector('#address-form')
const cepInput = document.querySelector('#cep')
const addressInput = document.querySelector('#address')
const cityInput = document.querySelector('#city')
const neighborhoodInput = document.querySelector('#neighborhood')
const regionInput = document.querySelector('#region')
const formInputs = document.querySelectorAll('[data-input]')

// Selecionando o botão de fechar mensagem
const closeButton = document.querySelector('#close-message')

// Validando a entrada do CEP para aceitar apenas números
cepInput.addEventListener('keypress', e => {
  const onlyNumbers = /[0-9]|\./
  const key = String.fromCharCode(e.keyCode)

  console.log(key)

  console.log(onlyNumbers.test(key))

  // Impedindo a entrada de caracteres que não sejam números
  if (!onlyNumbers.test(key)) {
    e.preventDefault()
    return
  }
})

// Obtendo o endereço quando o usuário insere um CEP válido
cepInput.addEventListener('keyup', e => {
  const inputValue = e.target.value

  // Verificando se o CEP inserido tem o comprimento adequado
  if (inputValue.length === 8) {
    getAddress(inputValue)
  }
})

// Função para obter o endereço da API
const getAddress = async cep => {
  toggleLoader() // Mostra o loader enquanto a requisição está sendo feita

  cepInput.blur() // Remove o foco do campo do CEP

  const apiUrl = `https://viacep.com.br/ws/${cep}/json/`

  // Fazendo a requisição à API para obter o endereço
  const response = await fetch(apiUrl)
  const data = await response.json()

  console.log(data)
  console.log(formInputs)
  console.log(data.erro)

  // Verificando se há erro na resposta da API
  if (data.erro === 'true') {
    if (!addressInput.hasAttribute('disabled')) {
      // Mostra uma mensagem de erro se o CEP for inválido
      toggleDisabled()
    }
    addressForm.reset()
    toggleLoader()
    toggleMessage('CEP Inválido, tente novamente.')
    return
  }

  // Activate disabled attribute if form is empty
  if (addressInput.value === '') {
    toggleDisabled()
  }

  // Preenche os campos do formulário com os dados do endereço
  addressInput.value = data.logradouro
  cityInput.value = data.localidade
  neighborhoodInput.value = data.bairro
  regionInput.value = data.uf

  toggleLoader() // Esconde o loader após a obtenção do endereço
}

// Add or remove disable attribute
const toggleDisabled = () => {
  if (regionInput.hasAttribute('disabled')) {
    formInputs.forEach(input => {
      input.removeAttribute('disabled')
    })
  } else {
    formInputs.forEach(input => {
      input.setAttribute('disabled', 'disabled')
    })
  }
}

// Show or hide loader
const toggleLoader = () => {
  const fadeElement = document.querySelector('#fade')
  const loaderElement = document.querySelector('#loader')

  fadeElement.classList.toggle('hide')
  loaderElement.classList.toggle('hide')
}

// Show or hide message
const toggleMessage = msg => {
  const fadeElement = document.querySelector('#fade')
  const messageElement = document.querySelector('#message')

  const messageTextElement = document.querySelector('#message p')

  messageTextElement.innerText = msg

  fadeElement.classList.toggle('hide')
  messageElement.classList.toggle('hide')
}

// Close message modal
closeButton.addEventListener('click', () => toggleMessage())

// Save address
addressForm.addEventListener('submit', e => {
  e.preventDefault()

  toggleLoader()

  setTimeout(() => {
    toggleLoader()

    toggleMessage('Endereço salvo com sucesso!')

    addressForm.reset()

    toggleDisabled()
  }, 1000)
})

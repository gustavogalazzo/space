// Espera o evento 'DOMContentLoaded', que indica que o HTML da página foi completamente carregado
document.addEventListener('DOMContentLoaded', () => {
  // Obtenção dos elementos do formulário e da lista de endereços
  const form = document.getElementById('address-form')
  const cepInput = document.getElementById('cep')
  const streetInput = document.getElementById('street')
  const numberInput = document.getElementById('number')
  const neighborhoodInput = document.getElementById('neighborhood')
  const cityInput = document.getElementById('city')
  const stateInput = document.getElementById('state')
  const complementInput = document.getElementById('complement')
  const validateCepButton = document.getElementById('validate-cep')
  const addressList = document.getElementById('address-list')

  // Event listener para o botão de validar CEP
  validateCepButton.addEventListener('click', async () => {
    // Obtém o valor do CEP do input
    const cep = cepInput.value
    // Verifica se o campo de CEP está preenchido
    if (cep) {
      try {
        // Faz uma requisição para a API ViaCEP para obter os detalhes do endereço
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
        // Verifica se a resposta da requisição é bem sucedida
        if (!response.ok) {
          throw new Error('Erro ao buscar CEP')
        }
        // Converte a resposta para JSON
        const data = await response.json()
        // Verifica se o CEP foi encontrado
        if (data.erro) {
          // Mostra um alerta se o CEP não foi encontrado
          alert('CEP não encontrado')
        } else {
          // Preenche os campos do endereço com os dados obtidos da API
          streetInput.value = data.logradouro
          neighborhoodInput.value = data.bairro
          cityInput.value = data.localidade
          stateInput.value = data.uf
        }
      } catch (error) {
        // Mostra um alerta se ocorrer um erro na requisição
        alert(error.message)
      }
    } else {
      // Mostra um alerta se o campo de CEP estiver vazio
      alert('Por favor, insira um CEP')
    }
  })

  // Event listener para o envio do formulário
  form.addEventListener('submit', async e => {
    // Previne o comportamento padrão de envio do formulário
    e.preventDefault()

    // Obtém os valores dos inputs do formulário
    const cep = cepInput.value
    const street = streetInput.value
    const number = numberInput.value
    const neighborhood = neighborhoodInput.value
    const city = cityInput.value
    const state = stateInput.value
    const complement = complementInput.value

    try {
      // Faz uma requisição POST para cadastrar o endereço na API
      const response = await fetch(
        'https://go-wash-api.onrender.com/api/auth/address',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            cep,
            street,
            number,
            neighborhood,
            city,
            state,
            complement
          })
        }
      )

      // Verifica se a requisição foi bem sucedida
      if (response.ok) {
        // Adiciona o endereço à lista na página e reseta o formulário
        addAddressToList({
          cep,
          street,
          number,
          neighborhood,
          city,
          state,
          complement
        })
        form.reset()
      } else {
        // Mostra um alerta se ocorrer um erro ao cadastrar o endereço
        alert('Erro ao cadastrar endereço')
      }
    } catch (error) {
      // Mostra um alerta se ocorrer um erro na comunicação com o servidor
      alert('Erro na comunicação com o servidor')
    }
  })

  // Função para adicionar um endereço à lista na página
  function addAddressToList(address) {
    // Cria um novo elemento <li> para o endereço
    const li = document.createElement('li')
    // Define o conteúdo do <li> com os detalhes do endereço
    li.textContent = `${address.street}, ${address.number}, ${
      address.neighborhood
    }, ${address.city}, ${address.state}, CEP: ${address.cep}, Complemento: ${
      address.complement || 'N/A'
    }`
    // Adiciona o <li> à lista de endereços
    addressList.appendChild(li)
  }
})

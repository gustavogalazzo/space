async function buscarEndereco() {
  const cep = document.getElementById('cep').value.replace(/\D/g, '')

  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
    const data = await response.json()

    if (data.erro) {
      alert('CEP não encontrado.')
    } else {
      document.getElementById(
        'endereco'
      ).textContent = `${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`
    }
  } catch (error) {
    console.error('Erro ao buscar endereço:', error)
    alert('Erro ao buscar endereço. Por favor, tente novamente mais tarde.')
  }
}

function salvarEndereco() {
  const endereco = document.getElementById('endereco').textContent
  const listaEnderecos = document.getElementById('lista-enderecos')
  const novoEnderecoItem = document.createElement('li')
  novoEnderecoItem.textContent = endereco
  listaEnderecos.appendChild(novoEnderecoItem)
}

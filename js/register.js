// URL da API de cadastro de usuário
const url = 'https://go-wash-api.onrender.com/api/user' // LINK DA API

// Função assíncrona para validar a idade do usuário com base na data de nascimento inserida
async function validarbirthday() {
  // Obtém o valor do input de data de nascimento
  var data = document.getElementById('birthday').value // pega o valor do input
  // Substitui barras ("/") por hífens ("-") na data para garantir um formato consistente
  data = data.replace(/\//g, '-') // substitui eventuais barras (ex. IE) "/" por hífen "-"
  // Divide a data em um array para facilitar a manipulação
  var data_array = data.split('-') // quebra a data em array

  // Verifica o formato da data e a ajusta se necessário para o formato 'yyyy-MM-dd'
  if (data_array[0].length != 4) {
    data = data_array[2] + '-' + data_array[1] + '-' + data_array[0] // remonto a data no formato yyyy/MM/dd
  }

  // Calcula a idade com base na data de nascimento fornecida
  var hoje = new Date()
  var nasc = new Date(data)
  var idade = hoje.getFullYear() - nasc.getFullYear()
  var m = hoje.getMonth() - nasc.getMonth()

  // Verifica se o mês atual é anterior ao mês de nascimento, ou se é o mesmo mês mas o dia atual é anterior ao dia de nascimento
  if (m < 0 || (m === 0 && hoje.getDate() < nasc.getDate())) idade--

  // Verifica se a idade calculada é menor que 18 anos e exibe um alerta se for
  if (idade < 18) {
    alert('Pessoas menores de 18 não podem se cadastrar.')
    return
  }
}

// Função assíncrona para realizar o cadastro do usuário
async function cadastroUsuario() {
  // Obtenção dos elementos de input do formulário
  let name = document.getElementById('name')
  let email = document.getElementById('email')
  let cpf_cnpj = document.getElementById('cpf_cnpj')
  let password = document.getElementById('password')
  let birthday = document.getElementById('birthday')

  // Verifica se o campo de nome está preenchido
  if (name.value == '') {
    alert('Preencha o seu nome')
    return
  }

  // Função para validar se o nome inserido contém pelo menos dois termos separados por um espaço
  function validarNomeCompleto() {
    var nameInput = document.getElementById('name')
    var nameErrorSpan = document.getElementById('name-error')

    if (nameInput.value.split(' ').length < 2) {
      // Mostra a mensagem de erro se o nome não for completo
      nameErrorSpan.style.display = 'inline'
    } else {
      // Esconde a mensagem de erro se o nome for completo
      nameErrorSpan.style.display = 'none'
    }
  }

  // Adiciona um ouvinte de eventos para chamar a função de validação quando o campo de entrada é alterado
  document.getElementById('name').addEventListener('input', validarNomeCompleto)

  // Verifica se o campo de CPF/CNPJ está preenchido
  if (cpf_cnpj.value == '') {
    alert('Preencha o seu CPF')
    return
  }

  // Verifica se o campo de email está preenchido
  if (email.value == '') {
    alert('Preencha o seu Email')
    return
  }

  // Função para validar se o email inserido é válido
  function validarEmail() {
    var emailInput = document.getElementById('email')
    var emailErrorSpan = document.getElementById('email-error')

    if (!emailInput.checkValidity()) {
      // Mostra a mensagem de erro se o e-mail não for válido
      emailErrorSpan.style.display = 'inline'
    } else {
      // Esconde a mensagem de erro se o e-mail for válido
      emailErrorSpan.style.display = 'none'
    }
  }

  // Adiciona um ouvinte de eventos para chamar a função de validação quando o campo de entrada é alterado
  document.getElementById('email').addEventListener('input', validarEmail)

  // Verifica se o campo de data de nascimento está preenchido
  if (birthday.value == '') {
    alert('Preencha o seu Aniversário')
    return
  }

  // Verifica se o campo de senha está preenchido e se tem pelo menos 6 caracteres
  if (password.value == '') {
    alert('Preencha a sua Senha')
    return
  }
  if (password.value.length < 6) {
    alert('Sua senha deve ter pelo menos 6 caracteres')
    return
  }

  // Faz uma requisição POST para a API de cadastro de usuário
  let resposta = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      name: name.value,
      email: email.value,
      user_type_id: 1,
      password: password.value,
      cpf_cnpj: cpf_cnpj.value.replace(/[^0-9]/g, ''),
      terms: 1,
      birthday: birthday.value
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  // Converte a resposta da API para JSON
  let data = await resposta.json()

  // Verifica se a resposta da API contém erros de validação
  if (data.data?.statusCode && data.data.statusCode == 422) {
    if (data.data.errors.cpf_cnpj) {
      alert('Erro CPF/CNPJ: ' + data.data.errors.cpf_cnpj[0])
    }
    if (data.data.errors) {
      alert('Erro: Coloque um CPF válido')
    }
    if (data.data.errors.email) {
      alert('Erro Email: ' + data.data.errors.email[0])
    }
    return
  }

  // Mostra um alerta de sucesso e redireciona para a página de login após o cadastro bem-sucedido
  alert('Cadastro feito com sucesso')
  window.location.href = 'login.html'
}

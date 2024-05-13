const url = 'https://go-wash-api.onrender.com/api/auth/address' // LINK DA API

async function validarbirthday() {
  var data = document.getElementById('birthday').value // pega o valor do input
  data = data.replace(/\//g, '-') // substitui eventuais barras (ex. IE) "/" por hífen "-"
  var data_array = data.split('-') // quebra a data em array

  //onde será inserido no formato dd/MM/yyyy
  if (data_array[0].length != 4) {
    data = data_array[2] + '-' + data_array[1] + '-' + data_array[0] // remonto a data no formato yyyy/MM/dd
  }

  // comparo as datas e calculo a idade
  var hoje = new Date()
  var nasc = new Date(data)
  var idade = hoje.getFullYear() - nasc.getFullYear()
  var m = hoje.getMonth() - nasc.getMonth()

  if (m < 0 || (m === 0 && hoje.getDate() < nasc.getDate())) idade--

  if (idade < 18) {
    alert('Pessoas menores de 18 não podem se cadastrar.')
    return
  }
}

async function cadastroUsuario() {
  // função criada de forma asyncrona, ou seja, executa linha por linha. oque evita que o java processe os codigos antes de acessar a api ( caso o codigo fosse processado primeiro, daria que as variaveis são " indefinidas")
  let name = document.getElementById('name')
  let email = document.getElementById('email')
  let cpf_cnpj = document.getElementById('cpf_cnpj')
  let password = document.getElementById('password')
  let birthday = document.getElementById('birthday')

  // essa verificação foi colocada aqui devido ser necessario executa-la antes do fetch(função que chama a API)
  if (name.value == '') {
    alert('Preencha o seu nome')
    return
  }
  function validarNomeCompleto() {
    var nameInput = document.getElementById('name')
    var nameErrorSpan = document.getElementById('name-error')

    // Verifica se o valor do campo contém pelo menos dois termos separados por um espaço
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

  if (cpf_cnpj.value == '') {
    alert('Preencha o seu CPF')
    return
  }

  if (email.value == '') {
    alert('Preencha o seu Email')
    return
  }
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

  if (birthday.value == '') {
    alert('Preencha o seu Aniversário')
    return
  }
  if (password.value == '') {
    alert('Preencha a sua Senha')
    return
  }
  if (password.value.length < 6) {
    alert('Sua senha deve ter pelo menos 6 caracteres')
    return
  }

  let resposta = await fetch(url, {
    // o Fetch é a função que irá conectar o parametro utilizado ao nosso codig  //Await significa que o codigo deve esperar até a chamada da API
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

  let data = await resposta.json()

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

  alert('Cadastro feito com sucesso')
  window.location.href = 'login.html'
}

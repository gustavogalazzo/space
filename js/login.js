// URL da API de login
const url = 'https://go-wash-api.onrender.com/api/login'

// Função assíncrona para realizar o login do usuário
async function loginUser() {
  // Obtém os elementos de input do email e senha
  const emailInput = document.getElementById('email')
  const passwordInput = document.getElementById('password')

  // Obtém os valores dos inputs do email e senha, removendo espaços em branco
  const email = emailInput.value.trim()
  const password = passwordInput.value.trim()

  // Verifica se os campos de email e senha estão preenchidos
  if (email === '' || password === '') {
    alert('Por favor, preencha os campos de e-mail e senha.')
    return
  }

  // Verifica se o email inserido é válido
  if (!(await validateEmail(email))) {
    alert('Por favor, insira um endereço de e-mail válido.')
    return
  }

  try {
    // Faz uma requisição POST para a API de login
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
        user_type_id: 1
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    // Converte a resposta da API para JSON
    const responseApi = await response.json()

    // Verifica se o usuário foi autenticado com sucesso
    if (
      responseApi.user &&
      responseApi.user.hasOwnProperty('is_active') &&
      responseApi.user.is_active === true
    ) {
      // Salva os dados do usuário autenticado no localStorage
      localStorage.setItem('user', JSON.stringify(responseApi.user))
      // Redireciona para a página de perfil do usuário
      window.location.href = 'profile.html'
      alert('Login feito com sucesso.')
    } else {
      // Mostra um alerta se o usuário não tem permissão para acessar a página ou se o login não foi ativado
      alert(
        'Você não tem permissão para acessar esta página ou seu login ainda não foi ativado.'
      )
    }
  } catch (error) {
    // Mostra um erro no console e um alerta se ocorrer um erro ao fazer a solicitação
    console.error('Erro ao fazer solicitação:', error)
    alert(
      'Erro ao processar a solicitação. Por favor, tente novamente mais tarde.'
    )
  }
}

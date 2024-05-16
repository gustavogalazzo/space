const url = 'https://go-wash-api.onrender.com/api/login'

async function loginUser() {
  const emailInput = document.getElementById('email')
  const passwordInput = document.getElementById('password')

  const email = emailInput.value.trim()
  const password = passwordInput.value.trim()

  if (email === '' || password === '') {
    alert('Por favor, preencha os campos de e-mail e senha.')
    return
  }

  if (!(await validateEmail(email))) {
    alert('Por favor, insira um endereço de e-mail válido.')
    return
  }

  try {
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

    const responseApi = await response.json()

    if (
      responseApi.user &&
      responseApi.user.hasOwnProperty('is_active') &&
      responseApi.user.is_active === true
    ) {
      localStorage.setItem('user', JSON.stringify(responseApi.user))
      window.location.href = 'profile.html'
      alert('Login feito com sucesso.')
    } else {
      alert(
        'Você não tem permissão para acessar esta página ou seu login ainda não foi ativado.'
      )
    }
  } catch (error) {
    console.error('Erro ao fazer solicitação:', error)
    alert(
      'Erro ao processar a solicitação. Por favor, tente novamente mais tarde.'
    )
  }
}

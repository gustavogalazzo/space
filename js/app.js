;(function () {
  // Seleciona todos os elementos com a classe 'social' e seus filhos 'div'
  let socials = document.querySelectorAll('.social div')

  // Aplica uma animação a cada elemento social com um atraso variável
  socials.forEach(function (social, index) {
    // Define a animação usando CSS e um atraso calculado com base no índice do elemento
    social.style.animation = `moveIn .6s cubic-bezier(.51,.92,.24,1.15) forwards ${
      index / 7 + 0.2
    }s`
  })

  // Seleciona todas as partes do foguete
  let rocketPieces = document.querySelectorAll('.rocket-body span')

  // Seleciona o elemento do foguete
  let rocket = document.querySelector('.rocket')

  // Define o ponto de início da animação do foguete com base na altura da janela
  let triggerStart = window.innerHeight / 5

  // Obtém a posição vertical do topo do foguete em relação à janela
  let rocketOffsetTop = rocket.offsetTop

  // Obtém a posição vertical do terceiro pedaço do foguete em relação à janela
  let thirdOffsetTop = rocketPieces[2].offsetTop

  // Adiciona um ouvinte de eventos de rolagem à janela
  document.addEventListener('scroll', e => {
    // Verifica se a posição de rolagem ultrapassou o ponto de início da animação do foguete
    if (window.scrollY > rocketOffsetTop - triggerStart) {
      // Adiciona a classe 'active' aos dois primeiros pedaços do foguete para ativá-los
      rocketPieces[0].classList.add('active')
      rocketPieces[1].classList.add('active')
    } else {
      // Remove a classe 'active' dos dois primeiros pedaços do foguete se a rolagem estiver antes do ponto de início da animação
      rocketPieces[0].classList.remove('active')
      rocketPieces[1].classList.remove('active')
    }

    // Verifica se a posição de rolagem ultrapassou a posição do terceiro pedaço do foguete
    if (window.scrollY > thirdOffsetTop - triggerStart) {
      // Adiciona a classe 'active' ao terceiro pedaço do foguete para ativá-lo
      rocketPieces[2].classList.add('active')
    } else {
      // Remove a classe 'active' do terceiro pedaço do foguete se a rolagem estiver antes de sua posição
      rocketPieces[2].classList.remove('active')
    }
  })
})()

document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle')
  var nav = document.getElementById('main-nav')

  if (!toggle || !nav) {
    return
  }

  toggle.addEventListener('click', function () {
    var isOpen = nav.classList.toggle('is-open')
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false')
  })

  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      nav.classList.remove('is-open')
      toggle.setAttribute('aria-expanded', 'false')
    })
  })
})

document.addEventListener('DOMContentLoaded', function () {
  // TODO: point back to the production API before deploying
  var ACCESS_REQUEST_ENDPOINT = 'http://127.0.0.1:8000/api/leads'

  var form = document.getElementById('access-form')
  var status = document.getElementById('access-form-status')

  if (!form || !status) {
    return
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault()

    if (!ACCESS_REQUEST_ENDPOINT) {
      console.warn('Access request endpoint not configured yet.')
      return
    }

    var submitButton = form.querySelector('.access-form-submit')
    var payload = Object.fromEntries(new FormData(form).entries())

    submitButton.disabled = true
    status.textContent = ''
    status.classList.remove('is-success', 'is-error')

    fetch(ACCESS_REQUEST_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(function (response) {
        if (!response.ok) {
          throw new Error('Request failed')
        }
        form.reset()
        status.textContent = 'Recebemos sua solicitação! Em breve entraremos em contato pelos dados informados.'
        status.classList.add('is-success')
      })
      .catch(function () {
        status.textContent = 'Não foi possível enviar sua solicitação agora. Tente novamente em instantes.'
        status.classList.add('is-error')
      })
      .finally(function () {
        submitButton.disabled = false
      })
  })
})

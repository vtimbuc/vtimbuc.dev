const body = document.getElementsByTagName('body')[0]
const themeToggle = document.querySelector('.theme-toggle')

let colorScheme = localStorage.getItem('color-scheme')

if (colorScheme === 'light' || colorScheme === 'dark') {
  body.classList.add(`color-scheme-${colorScheme}`)
} else {
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    colorScheme = 'dark'
  } else {
    colorScheme = 'light'
  }
}

themeToggle.addEventListener('click', () => {
  if (colorScheme === 'dark') {
    localStorage.setItem('color-scheme', 'light')
    body.classList.remove(`color-scheme-dark`)
    body.classList.add(`color-scheme-light`)
    colorScheme = 'light'
  } else {
    localStorage.setItem('color-scheme', 'dark')
    body.classList.remove(`color-scheme-light`)
    body.classList.add(`color-scheme-dark`)
    colorScheme = 'dark'
  }
})

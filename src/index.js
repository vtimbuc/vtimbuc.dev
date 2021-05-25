const body = document.querySelector('body')
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

const setColorScheme = (color) => {
  body.classList.remove(`color-scheme-${colorScheme}`)
  body.classList.add(`color-scheme-${color}`)

  localStorage.setItem('color-scheme', color)

  colorScheme = color
}

const toggleColorScheme = () => {
  if (colorScheme === 'dark') {
    setColorScheme('light')
  } else {
    setColorScheme('dark')
  }
}

themeToggle.addEventListener('click', toggleColorScheme)

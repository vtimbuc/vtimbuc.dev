type ColorScheme = 'light' | 'dark'

const body = document.getElementsByTagName('body')[0]
let colorScheme = localStorage.getItem('color-scheme') as ColorScheme

if (colorScheme === 'light' || colorScheme === 'dark') {
  body.classList.add(`color-scheme-${colorScheme}`)
} else {
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    colorScheme = 'dark'
  } else {
    colorScheme = 'light'
  }
}

const setColorScheme = (color: ColorScheme) => {
  body.classList.remove(`color-scheme-${color === 'dark' ? 'light' : 'dark'}`)
  body.classList.add(`color-scheme-${color}`)
  localStorage.setItem('color-scheme', color)
  colorScheme = color
}

document.querySelector('.theme-toggle').addEventListener('click', () => {
  if (colorScheme === 'dark') {
    setColorScheme('light')
  } else {
    setColorScheme('dark')
  }
})

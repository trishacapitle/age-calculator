const toggleSwitch = document.querySelector('#switch');
const body = document.body;
const darkModeText = document.querySelector('.dark-mode');
const lightModeText = document.querySelector('.light-mode');

// Function to set the theme
function setTheme(isDark) {
  if (isDark) {
    body.classList.add('dark');
    body.classList.remove('light');
    darkModeText.style.display = 'block';
    lightModeText.style.display = 'none';
    toggleSwitch.checked = false;
  } else {
    body.classList.add('light');
    body.classList.remove('dark');
    darkModeText.style.display = 'none';
    lightModeText.style.display = 'block';
    toggleSwitch.checked = true;
  }
}

// Function to switch theme
function switchTheme(e) {
  setTheme(!e.target.checked);
}

// Set initial theme to dark
setTheme(true);

// Add event listener for toggle switch
toggleSwitch.addEventListener('change', switchTheme, false);
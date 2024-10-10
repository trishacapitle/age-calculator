// Gather input values and error elements once
function getInputValues() {
  return {
    day: parseInt(document.getElementById('day').value),
    month: parseInt(document.getElementById('month').value),
    year: parseInt(document.getElementById('year').value)
  };
}

function getErrorElements() {
  return {
    day: document.querySelector('.error-day'),
    month: document.querySelector('.error-month'),
    year: document.querySelector('.error-year')
  };
}

// Validate input values
function validateInput({ day, month, year }) {
  const errors = getErrorElements();
  errors.day.textContent = '';
  errors.month.textContent = '';
  errors.year.textContent = '';

  if (!year || year < 1000 || year > 9999) {
    errors.year.textContent = 'Invalid year';
    return false;
  }
  if (!month || month < 1 || month > 12) {
    errors.month.textContent = 'Invalid month';
    return false;
  }
  const daysInMonth = new Date(year, month, 0).getDate();
  if (!day || day < 1 || day > daysInMonth) {
    errors.day.textContent = 'Invalid day';
    return false;
  }

  return true;
}

// Animate counting effect
function animateCountUp(finalValue, element, duration) {
  const startValue = 0;
  const frameDuration = 1000 / 60; // 60 FPS
  const totalFrames = Math.round(duration / frameDuration);
  
  let currentFrame = 0;
  function updateCount() {
    const progress = currentFrame / totalFrames;
    const currentValue = Math.round(progress * finalValue);
    
    element.textContent = currentValue;

    if (currentFrame < totalFrames) {
      currentFrame++;
      requestAnimationFrame(updateCount);
    }
  }

  updateCount();
}

// Calculate and display the age with animated count-up
function calculateDate({ day, month, year }) {
  if (!validateInput({ day, month, year })) return;

  const birthDate = new Date(year, month - 1, day);
  const today = new Date();

  let ageYears = today.getFullYear() - birthDate.getFullYear();
  let ageMonths = today.getMonth() - birthDate.getMonth();
  let ageDays = today.getDate() - birthDate.getDate();

  // Adjust for negative days and months
  if (ageDays < 0) {
    ageMonths--;
    ageDays += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
  }

  if (ageMonths < 0) {
    ageYears--;
    ageMonths += 12;
  }

  // Animate the output
  const animationDuration = 2000; // 2 seconds
  animateCountUp(ageDays, document.getElementById('output-day'), animationDuration);
  animateCountUp(ageMonths, document.getElementById('output-month'), animationDuration);
  animateCountUp(ageYears, document.getElementById('output-year'), animationDuration);
}

// Event listener for the submit button
const submitBtn = document.getElementById('submit-btn');
submitBtn.addEventListener('click', function (event) {
  event.preventDefault();
  
  const inputs = getInputValues();
  calculateDate(inputs);
});

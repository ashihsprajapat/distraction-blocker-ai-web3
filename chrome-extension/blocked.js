// Timer functionality
let timeLeft = 15; // 45 seconds
const timerElement = document.getElementById('timer');

const timer = setInterval(() => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  
  if (timeLeft <= 0) {
    clearInterval(timer);
    timerElement.textContent = 'Time\'s up!';
    // Redirect back to the previous page
    window.history.back();
  }
  
  timeLeft--;
}, 1000); 
const messenger = document.getElementById('messenger');

let currentStep = 0;
let userData = {};

function nextStep() {
  currentStep++;
  renderStep();
}

function restart() {
  currentStep = 0;
  userData = {};
  renderStep();
}

function renderStep() {
  switch(currentStep) {
    case 0:
      messenger.innerHTML = `
        <div class="question-container">
          <h2>What's your Crush's name?</h2>
          <input type="text" id="crushName">
          <button onclick="saveCrushName()">Next</button>
        </div>
      `;
      break;
    case 1:
      messenger.innerHTML = `
        <div class="question-container">
          <h2>Gender?</h2>
          <div class="radio-option" style="animation-delay: 0s;"><input type="radio" name="gender" value="Male"> Male</div>
          <div class="radio-option" style="animation-delay: 0.1s;"><input type="radio" name="gender" value="Female"> Female</div>
          <button onclick="saveGender()">Next</button>
        </div>
      `;
      break;
    case 2:
      messenger.innerHTML = `
        <div class="question-container">
          <h2>Status?</h2>
          <div class="radio-option" style="animation-delay: 0s;"><input type="radio" name="status" value="High School"> High School</div>
          <div class="radio-option" style="animation-delay: 0.1s;"><input type="radio" name="status" value="Senior High School (SHS)"> Senior High School (SHS)</div>
          <div class="radio-option" style="animation-delay: 0.2s;"><input type="radio" name="status" value="College"> College</div>
          <button onclick="saveStatus()">Next</button>
        </div>
      `;
      break;
    case 3:
      messenger.innerHTML = `
        <div class="question-container">
          <h2>Upload his/her photo</h2>
          <input type="file" id="photoUpload" accept="image/*">
          <button onclick="savePhoto()">Next</button>
        </div>
      `;
      break;
    case 4:
      messenger.innerHTML = `
        <div class="question-container">
          <h2>Do you love him/her?</h2>
          <div class="radio-option" style="animation-delay: 0s;"><input type="radio" name="love" value="Yes"> Yes</div>
          <div class="radio-option" style="animation-delay: 0.1s;"><input type="radio" name="love" value="No"> No</div>
          <button onclick="saveLove()">Submit</button>
        </div>
      `;
      break;
    case 5:
      renderChat();
      break;
  }
}

function saveCrushName() {
  const name = document.getElementById('crushName').value;
  if (name) {
    userData.crushName = name;
    nextStep();
  }
}

function saveGender() {
  const gender = document.querySelector('input[name="gender"]:checked');
  if (gender) {
    userData.gender = gender.value;
    nextStep();
  }
}

function saveStatus() {
  const status = document.querySelector('input[name="status"]:checked');
  if (status) {
    userData.status = status.value;
    nextStep();
  }
}

function savePhoto() {
  const photo = document.getElementById('photoUpload').files[0];
  if (photo) {
    const reader = new FileReader();
    reader.onload = function(e) {
      userData.photo = e.target.result;
      nextStep();
    };
    reader.readAsDataURL(photo);
  }
}

function saveLove() {
  const love = document.querySelector('input[name="love"]:checked');
  if (love && love.value === "Yes") {
    nextStep();
  } else {
    restart();
  }
}

function renderChat() {
  messenger.innerHTML = `
    <div class="messenger-container">
      <div class="messenger-header">
        <div class="profile-pic-container">
          <img src="${userData.photo}" class="profile-pic" alt="Profile">
          <span class="online-dot"></span>
        </div>
        <div class="profile-info">
          <h3>${userData.crushName}</h3>
          <span>Active now</span>
        </div>
        <div class="header-icons">
          <img src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.11.3/icons/telephone-fill.svg">
          <img src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.11.3/icons/camera-video-fill.svg">
          <img src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.11.3/icons/three-dots.svg">
        </div>
      </div>

      <div class="chat-content">
        <div class="message user">
          I love you! ❤️
        </div>
        <div class="message crush">
          <div class="crush-avatar">
            <img src="${userData.photo}" class="profile-pic" alt="Crush Profile">
          </div>
          I love you too! 💖
        </div>
      </div>

      <div class="chat-input">
        <input type="text" placeholder="Anlala mo! Usad ka na yah" disabled>
        <div class="input-icons">
          <img src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.11.3/icons/mic-fill.svg">
          <img src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.11.3/icons/hand-thumbs-up-fill.svg">
        </div>
      </div>
    </div>
  `;
}

renderStep();

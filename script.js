let currentStep = 0;
let userData = {};

const messenger = document.getElementById('messenger');

renderStep();

function nextStep() {
  messenger.classList.add('fade-out');

  setTimeout(() => {
    currentStep++;
    renderStep();
    messenger.classList.remove('fade-out');
    messenger.classList.add('fade-in');

    setTimeout(() => {
      messenger.classList.remove('fade-in');
    }, 500); // match CSS animation duration
  }, 300); // match CSS fade-out duration
}

function restart() {
  currentStep = 0;
  userData = {};
  renderStep();
}

function renderStep() {
  switch (currentStep) {
    case 0:
      messenger.innerHTML = `
        <div class="question-container">
          <h2>What's your Crush's name?</h2>
          <input type="text" id="crushName" />
          <div class="button-container">
          <button onclick="saveCrushName()">Next</button>
          </div>
        </div>
      `;
      break;

    case 1:
      messenger.innerHTML = `
        <div class="question-container">
          <h2>Gender?</h2>
          <div class="radio-option"><input type="radio" name="gender" value="Male"> Male</div>
          <div class="radio-option"><input type="radio" name="gender" value="Female"> Female</div>
          <div class="button-container">
          <button onclick="saveGender()">Next</button>
          </div>
        </div>
      `;
      break;

    case 2:
      messenger.innerHTML = `
        <div class="question-container">
          <h2>Status</h2>
          <div class="radio-option"><input type="radio" name="status" value="Single"> Single</div>
          <div class="radio-option"><input type="radio" name="status" value="Taken (In a Relationship)"> Taken (In a Relationship)</div>
          <div class="radio-option"><input type="radio" name="status" value="MU"> MU</div>
          <div class="radio-option"><input type="radio" name="status" value="Complicated"> Complicated</div>
          <div class="button-container">
          <button onclick="saveStatus()">Next</button>
          </div>
        </div>
      `;
      break;

    case 3:
      messenger.innerHTML = `
        <div class="question-container">
          <h2>Upload his/her Photo</h2>
          <input type="file" id="photoUpload" accept="image/*" />
          <div class="preview-container">
        <img id="previewImage" style="display:none; max-width:100px;"/>
      </div>
      <div class="button-container">
          <button onclick="savePhoto()">Next</button>
          </div>
        </div>
      `;

      document.getElementById('photoUpload').addEventListener('change', function(event) {
        const file = event.target.files[0];
        const previewImage = document.getElementById('previewImage');
        const reader = new FileReader();

        if (file && file.type.startsWith('image/')) {
          reader.onload = function(e) {
            previewImage.src = e.target.result;
            previewImage.style.display = 'block';
            previewImage.classList.add('show');
            userData.photo = e.target.result;
          };
          reader.readAsDataURL(file);
        } else {
          previewImage.style.display = 'none';
        }
      });
      break;

    case 4:
      messenger.innerHTML = `
        <div class="question-container">
          <h2>Do you love him/her?</h2>
          <div class="radio-option"><input type="radio" name="love" value="Yes"/> Yes</div>
          <div class="radio-option"><input type="radio" name="love" value="No"/> No</div>
          <div class="radio-option"><input type="radio" name="love" value="Maybe"/> Maybe</div>
          <div class="button-container">
          <button onclick="saveLove()">Next</button>
          </div>
        </div>
      `;
      break;

    case 5:
      renderChat();
      break;
  }
}

function saveCrushName() {
  const crushName = document.getElementById('crushName').value;
  if (crushName.trim() !== "") {
    userData.crushName = crushName;
    nextStep();
  } else {
    alert("Please enter a name.");
  }
}

function saveGender() {
  const gender = document.querySelector('input[name="gender"]:checked');
  if (gender) {
    userData.gender = gender.value;
    nextStep();
  } else {
    alert("Please select a gender.");
  }
}

function saveStatus() {
  const status = document.querySelector('input[name="status"]:checked');
  if (status) {
    userData.status = status.value;
    nextStep();
  } else {
    alert("Please select a status.");
  }
}

function savePhoto() {
  if (userData.photo) {
    nextStep();
  } else {
    alert("Please upload a photo.");
  }
}

function saveLove() {
  const love = document.querySelector('input[name="love"]:checked');
  if (love) {
    userData.love = love.value;
    nextStep();
  } else {
    alert("Please answer the question.");
  }
}

function renderChat() {
  messenger.innerHTML = `
  <div class="phone-frame">
    <div class="messenger-container">
      <div class="messenger-header">
        <div class="profile-pic-container">
          <img src="${userData.photo}" class="profile-pic" alt="Profile"></img>
          <span class="online-dot"></span>
        </div>
        <div class="profile-info">
          <h3>${userData.crushName}</h3>
          <span>Active Now</span>
        </div>
        <div class="header-icons">
          <img src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.11.3/icons/telephone-fill.svg">
          <img src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.11.3/icons/camera-video-fill.svg">
          <img src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.11.3/icons/three-dots.svg">
        </div>
      </div>

      <div class="chat-content">
        <div class="chat-row user-row">
          <div class="message user"><span>Hey, miss na kita... ❤️</span></div>
        </div>

        <div class="chat-row crush-row">
          <div class="crush-avatar">
            <img src="${userData.photo}" class="profile-pic" alt="Crush Profile">
          </div>
          <div class="message crush"><span>Ang bilis ng oras, parang kanina lang tayo magkasama. Miss din kita! 🥺💖</span></div>
        </div>

        <div class="chat-row user-row">
          <div class="message user"><span>Gusto ko sanang nandiyan ka ngayon... Para magsimula ng araw ko. 😊</span></div>
        </div>

        <div class="chat-row crush-row">
          <div class="crush-avatar">
            <img src="${userData.photo}" class="profile-pic" alt="Crush Profile">
          </div>
          <div class="message crush"><span>Aww, ikaw talaga... Ang sweet mo. Gusto ko rin sana makasama ka. 🥰</span></div>
        </div>

        <div class="chat-row user-row">
          <div class="message user"><span>Gusto ko sana magluto para sa'yo pagdating mo dito. Ano kaya ang gusto mong kainin? 😋</span></div>
        </div>

        <div class="chat-row crush-row">
          <div class="crush-avatar">
            <img src="${userData.photo}" class="profile-pic" alt="Crush Profile">
          </div>
          <div class="message crush"><span>Hmm... Lahat ng luto mo, masarap! Pero siguro, spaghetti? 😍</span></div>
        </div>

        <div class="chat-row user-row">
          <div class="message user"><span>Spaghetti it is then! Gagawin ko yan kapag nakita kita. 💕</span></div>
        </div>

        <div class="chat-row crush-row">
          <div class="crush-avatar">
            <img src="${userData.photo}" class="profile-pic" alt="Crush Profile">
          </div>
          <div class="message crush"><span>Grabe, excited na akong matikman. Teka, ang sarap ng idea mo, haha! 😋</span></div>
        </div>

        <div class="chat-row user-row">
          <div class="message user"><span>Kung nandiyan ka, kakain tayo sa ilalim ng puno. Kayo lang at ako. ❤️</span></div>
        </div>

        <div class="chat-row crush-row">
          <div class="crush-avatar">
            <img src="${userData.photo}" class="profile-pic" alt="Crush Profile">
          </div>
          <div class="message crush"><span>Ang cute mo. Puwede ba tayong magdate diyan? Sobrang kilig ko na. 😳</span></div>
        </div>

        <div class="chat-row user-row">
          <div class="message user"><span>Pwede, kahit anong oras! Basta ikaw, laging okay. 💫</span></div>
        </div>

        <div class="chat-row crush-row">
          <div class="crush-avatar">
            <img src="${userData.photo}" class="profile-pic" alt="Crush Profile">
          </div>
          <div class="message crush"><span>Ang saya ko kapag nandiyan ka. Parang ang saya ng mundo. 🌍💖</span></div>
        </div>

        <div class="chat-row user-row">
          <div class="message user"><span>I love you! ❤️</span></div>
        </div>

        <div class="chat-row crush-row">
          <div class="crush-avatar">
            <img src="${userData.photo}" class="profile-pic" alt="Crush Profile">
          </div>
          <div class="message crush"><span>I love you too! 💖</span></div>
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
  </div>
  `;
  const chatRows = document.querySelectorAll('.chat-row');
  let delay = 0;
  chatRows.forEach((row) => {
    setTimeout(() => {
      row.style.display = 'flex';
    }, delay);
    delay += 500; // stagger messages every 500ms
  });
  document.body.classList.add('last-slide');
}
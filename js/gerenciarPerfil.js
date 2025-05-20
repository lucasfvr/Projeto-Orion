document.addEventListener('DOMContentLoaded', () => {
  const defaultProfiles = [
    { name: 'Lucas', img: 'imagens/iconlogin5.png' },
    { name: 'Kauã', img: 'imagens/iconlogin4.jpeg' },
    { name: 'Hyan', img: 'imagens/iconlogin2.jpg' },
    { name: 'Victor', img: 'imagens/iconlogin3.png' },
    { name: 'Gésio', img: 'imagens/iconlogin.jpg' },
  ];

  let profiles = [];


  function loadProfiles() {
    const stored = localStorage.getItem('profiles');
    if (stored) {
      try {
        profiles = JSON.parse(stored);
      } catch (e) {
        profiles = [...defaultProfiles];
      }
    } else {
      profiles = [...defaultProfiles];
    }
  }


  function saveProfiles() {
    localStorage.setItem('profiles', JSON.stringify(profiles));
  }

  const profileList = document.getElementById('profileList');
  const manageProfileBtn = document.getElementById('manageProfileBtn');
  const manageProfileModal = new bootstrap.Modal(document.getElementById('manageProfileModal'));
  const editProfileList = document.getElementById('editProfileList');

  const editProfileForm = document.getElementById('editProfileForm');
  const editProfileName = document.getElementById('editProfileName');
  const editProfileImageInput = document.getElementById('editProfileImage');
  const editProfileImagePreview = document.getElementById('editProfileImagePreview');

  let selectedIndex = null;
  let newImageDataUrl = null;


  function renderMainProfiles() {
    profileList.innerHTML = '';
    profiles.forEach((profile, i) => {
      const colDiv = document.createElement('div');
      colDiv.className = 'col-6 col-sm-4 col-md-3 col-lg-2';
      colDiv.setAttribute('data-index', i);

      const a = document.createElement('a');
      a.href = 'biblioteca.html';
      a.className = 'text-decoration-none text-white';

      const playerDiv = document.createElement('div');
      playerDiv.className = 'player';

      const img = document.createElement('img');
      img.src = profile.img;
      img.alt = profile.name;
      img.className = 'avatar img-fluid';

      const p = document.createElement('p');
      p.textContent = profile.name;

      playerDiv.appendChild(img);
      playerDiv.appendChild(p);
      a.appendChild(playerDiv);
      colDiv.appendChild(a);
      profileList.appendChild(colDiv);
    });
  }


  function renderEditProfileList() {
    editProfileList.innerHTML = '';
    profiles.forEach((profile, i) => {
      const itemDiv = document.createElement('div');
      itemDiv.className = 'edit-profile-item';
      itemDiv.setAttribute('data-index', i);

      const img = document.createElement('img');
      img.src = profile.img;
      img.alt = profile.name;

      const p = document.createElement('p');
      p.textContent = profile.name;

      itemDiv.appendChild(img);
      itemDiv.appendChild(p);

      itemDiv.addEventListener('click', () => {
        selectProfile(i);
      });

      editProfileList.appendChild(itemDiv);
    });
  }


  function selectProfile(index) {
    selectedIndex = index;
    const profile = profiles[index];
    editProfileName.value = profile.name;
    editProfileImagePreview.src = profile.img;
    editProfileImageInput.value = '';
    newImageDataUrl = null;

    document.querySelectorAll('.edit-profile-item').forEach((el) => {
      el.classList.remove('active');
    });

    const activeEl = editProfileList.querySelector(`[data-index="${index}"]`);
    if (activeEl) activeEl.classList.add('active');
  }


  editProfileImageInput.addEventListener('change', () => {
    const file = editProfileImageInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        newImageDataUrl = e.target.result;
        editProfileImagePreview.src = newImageDataUrl;
      };
      reader.readAsDataURL(file);
    }
  });

 
  editProfileForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (selectedIndex === null) return;

    profiles[selectedIndex].name = editProfileName.value.trim() || profiles[selectedIndex].name;
    if (newImageDataUrl) {
      profiles[selectedIndex].img = newImageDataUrl;
    }

    saveProfiles();
    renderMainProfiles();
    renderEditProfileList();
    selectProfile(selectedIndex);
  });


  manageProfileBtn.addEventListener('click', () => {
    renderEditProfileList();
    selectProfile(0);
    manageProfileModal.show();
  });


  loadProfiles();
  renderMainProfiles();
});

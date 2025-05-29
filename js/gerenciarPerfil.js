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

    // Se tiver 4 ou menos perfis, adiciona o card "Adicionar"
    if (profiles.length <= 4) {
      const colDiv = document.createElement('div');
      colDiv.className = 'col-6 col-sm-4 col-md-3 col-lg-2';

      const a = document.createElement('a');
      a.href = '#';
      a.className = 'text-decoration-none text-white';
      a.addEventListener('click', (e) => {
        e.preventDefault();

        // Cria um novo perfil padrão
        const novoPerfil = {
          name: 'Novo Perfil',
          img: 'imagens/adicionar.png', // ou outra imagem padrão que preferir
        };

        profiles.push(novoPerfil);
        saveProfiles();
        renderMainProfiles();

        // Seleciona o novo perfil e abre modal para edição
        selectedIndex = profiles.length - 1;
        renderEditProfileList();
        selectProfile(selectedIndex);
        manageProfileModal.show();
      });

      const playerDiv = document.createElement('div');
      playerDiv.className = 'player';

      const img = document.createElement('img');
      img.src = 'imagens/adicionar.png'; 
      img.alt = 'Adicionar Perfil';
      img.className = 'avatar img-fluid';
      img.style.cursor = 'pointer';

      const p = document.createElement('p');
      p.textContent = 'Adicionar';
      p.style.fontWeight = '700';
      p.style.marginTop = '10px';
      p.style.fontSize = '1.4rem';
      p.style.textShadow = '1px 1px 4px black';

      playerDiv.appendChild(img);
      playerDiv.appendChild(p);
      a.appendChild(playerDiv);
      colDiv.appendChild(a);
      profileList.appendChild(colDiv);
    }
  }

  function renderEditProfileList() {
    editProfileList.innerHTML = '';
    profiles.forEach((profile, i) => {
      const itemDiv = document.createElement('div');
      itemDiv.className = 'edit-profile-item d-flex align-items-center';
      itemDiv.setAttribute('data-index', i);

      const img = document.createElement('img');
      img.src = profile.img;
      img.alt = profile.name;

      const p = document.createElement('p');
      p.className = 'mb-0 flex-grow-1';
      p.textContent = profile.name;

      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'btn btn-danger btn-sm delete-btn ms-auto';
      deleteBtn.textContent = 'Apagar';
      deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (confirm(`Deseja mesmo apagar o perfil "${profile.name}"?`)) {
          profiles.splice(i, 1);
          saveProfiles();
          renderMainProfiles();
          renderEditProfileList();
          selectedIndex = null;
          editProfileName.value = '';
          editProfileImagePreview.src = '';
        }
      });

      itemDiv.addEventListener('click', () => {
        selectProfile(i);
      });

      itemDiv.appendChild(img);
      itemDiv.appendChild(p);
      itemDiv.appendChild(deleteBtn);

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

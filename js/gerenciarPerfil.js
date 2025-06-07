function inicialização() {
      const ObjUsuarios = [
        { name: 'Lucas', img: 'imagens/iconlogin5.png' },
        { name: 'Kauã', img: 'imagens/iconlogin4.jpeg' },
        { name: 'Hyan', img: 'imagens/iconlogin2.jpg' },
        { name: 'Victor', img: 'imagens/iconlogin3.png' },
        { name: 'Gésio', img: 'imagens/iconlogin.jpg' },
      ];

      const UserReg = localStorage.getItem("profiles");

      if (!UserReg) {
        localStorage.setItem("profiles", JSON.stringify(ObjUsuarios));
      }
    }
    inicialização();

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

        // Card "Adicionar" se 4 ou menos perfis
        if (profiles.length <= 4) {
          const colDiv = document.createElement('div');
          colDiv.className = 'col-6 col-sm-4 col-md-3 col-lg-2';

          const a = document.createElement('a');
          a.href = '#';
          a.className = 'text-decoration-none text-white';
          a.addEventListener('click', (e) => {
            e.preventDefault();

            const novoPerfil = {
              name: 'Novo Perfil',
              img: 'imagens/interrogacao.png',
            };

            profiles.push(novoPerfil);
            saveProfiles();
            renderMainProfiles();

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
          itemDiv.className = 'edit-profile-item d-flex align-items-center p-2 rounded';
          itemDiv.setAttribute('data-index', i);
          itemDiv.style.cursor = 'pointer';

          const img = document.createElement('img');
          img.src = profile.img;
          img.alt = profile.name;
          img.style.width = '50px';
          img.style.height = '50px';
          img.style.objectFit = 'cover';
          img.classList.add('rounded');

          const p = document.createElement('p');
          p.className = 'mb-0 flex-grow-1 ms-3';
          p.textContent = profile.name;

          const deleteBtn = document.createElement('button');
          deleteBtn.className = 'btn btn-danger btn-sm ms-auto';
          deleteBtn.textContent = 'Apagar';
          deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            selectedIndex = i;
            openDeleteDialog();
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

        // Destacar o item selecionado na lista
        const items = editProfileList.querySelectorAll('.edit-profile-item');
        items.forEach((item) => item.classList.remove('bg-primary', 'text-white'));
        if (items[index]) items[index].classList.add('bg-primary', 'text-white');
      }

      // Atualiza preview da imagem ao selecionar novo arquivo
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

      // Salvar alterações do perfil
      editProfileForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (selectedIndex === null) return;

        const newName = editProfileName.value.trim();
        if (newName.length < 2 || newName.length > 30) {
          return;
        }

        profiles[selectedIndex].name = newName;
        if (newImageDataUrl) {
          profiles[selectedIndex].img = newImageDataUrl;
        }

        saveProfiles();
        renderMainProfiles();
        renderEditProfileList();
        selectProfile(selectedIndex);
      });

      manageProfileBtn.addEventListener('click', () => {
        loadProfiles();
        renderEditProfileList();
        manageProfileModal.show();
      });

      // Controle do diálogo de apagar perfil
      const dialogDelete = document.getElementById('dialog-delete-profile');
      const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');

      window.openDeleteDialog = function () {
        if (selectedIndex === null) {
          alert('Selecione um perfil para apagar.');
          return;
        }
        dialogDelete.showModal();
      };

      window.closeDeleteDialog = function () {
        dialogDelete.close();
      };

      confirmDeleteBtn.addEventListener('click', () => {
        if (selectedIndex !== null) {
          profiles.splice(selectedIndex, 1);
          saveProfiles();
          renderMainProfiles();
          renderEditProfileList();
          selectedIndex = null;
          dialogDelete.close();
        }
      });

      // Inicializa com os perfis carregados
      loadProfiles();
      renderMainProfiles();
    });

    
    

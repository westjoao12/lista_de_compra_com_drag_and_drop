let userName = '';
let shoppingList = [];

function startApp() {
  const input = document.getElementById('usernameInput');
  userName = input.value.trim();
  if (!userName) return alert("Digite seu nome!");

  document.getElementById('login').classList.add('hidden');
  document.getElementById('app').classList.remove('hidden');
  document.getElementById('welcome').textContent = `Bem-vindo(a), ${userName}!`;
}

function addItem() {
  const input = document.getElementById('itemInput');
  const itemName = input.value.trim();
  if (!itemName) return;

  const item = {
    name: itemName,
    bought: false
  };
  shoppingList.push(item);
  input.value = '';
  renderList();
}

function renderList() {
  const ul = document.getElementById('shoppingList');
  ul.innerHTML = '';

  shoppingList.forEach((item, index) => {
    const li = document.createElement('li');
    li.setAttribute('draggable', true);
    li.dataset.index = index;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = item.bought;
    checkbox.className = 'checkbox';
    checkbox.addEventListener('change', () => {
      item.bought = checkbox.checked;
      renderList();
    });

    const span = document.createElement('span');
    span.textContent = item.name;
    if (item.bought) span.style.textDecoration = 'line-through';

    const handle = document.createElement('span');
    handle.textContent = '::';
    handle.className = 'handle';

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'x';
    removeBtn.onclick = () => {
      shoppingList.splice(index, 1);
      renderList();
    };

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(removeBtn);
    li.appendChild(handle);

    ul.appendChild(li);
  });

  atualizaTotalComprados();
  addDragAndDropEvents();
}

function atualizaTotalComprados() {
  const itensComprados = shoppingList.filter(i => i.bought).length;
  document.getElementById('summary').textContent = `Itens comprados: ${itensComprados}/${shoppingList.length}`;
}

let dragStartIndex;

function addDragAndDropEvents() {
  const listItems = document.querySelectorAll('#shoppingList li');

  listItems.forEach((item, index) => {
    item.setAttribute('draggable', true);

    item.addEventListener('dragstart', () => {
      dragStartIndex = index;
      item.classList.add('dragging');
    });

    item.addEventListener('dragover', (e) => {
      e.preventDefault();
    });

    item.addEventListener('drop', () => {
      const dragEndIndex = index;
      reorderItems(dragStartIndex, dragEndIndex);
      item.classList.remove('dragging');
    });

    item.addEventListener('dragend', () => {
      item.classList.remove('dragging');
    });
  });
}

function reorderItems(startIndex, endIndex) {
  const movedItem = shoppingList[startIndex];
  shoppingList.splice(startIndex, 1);
  shoppingList.splice(endIndex, 0, movedItem);
  renderList();
}
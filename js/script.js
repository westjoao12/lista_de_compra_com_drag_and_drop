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
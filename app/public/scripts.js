function addUser() {
  var field = document.querySelector('#input-name');
  var name = field.value;

  if (name === '') {
    return;
  }

  field.value = '';

  fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: name })
  }).then(function(response) {
    return response.json()
  }).then(function (payload) {
    console.log('Request succeeded with JSON response', payload);
    var user = payload.data;

    var el = document.querySelector('#users tbody');

    var line = document.createElement('tr');
    line.setAttribute('data-id', user._id);

    var cellName = document.createElement('td');
    var cellNameText = document.createTextNode(user.name);

    cellName.appendChild(cellNameText);

    var cellActions = document.createElement('td');
    var cellActionsButton = document.createElement('button');
    var cellActionsButtonText = document.createTextNode('Remove');

    cellActionsButton.className = 'btn-remove-user';

    cellActionsButton.appendChild(cellActionsButtonText);
    cellActions.appendChild(cellActionsButton);

    cellActionsButton.addEventListener('click', removeUser);

    line.appendChild(cellName);
    line.appendChild(cellActions);

    el.appendChild(line);
  }).catch(function (err) {
    console.log('Request failed', err);
  });
}

function removeUser(e) {
  var el = e.currentTarget.parentNode.parentNode;
  var id = el.attributes['data-id'].value;

  fetch('/api/users/' + id, {
    method: 'DELETE',
  }).then(function(response) {
    return response.json()
  }).then(function (payload) {
    console.log('Request succeeded with JSON response', payload);
    el.removeEventListener('click', removeUser);
    el.parentNode.removeChild(el);
  }).catch(function (err) {
    console.log('Request failed', err);
  });
}

document.querySelector('#btn-add-user').addEventListener('click', addUser);

var removeButtonList = document.querySelectorAll('.btn-remove-user');
for (var i = 0 ; i < removeButtonList.length; i++) {
  removeButtonList[i].addEventListener('click', removeUser);
}

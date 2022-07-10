const form = document.forms.registr;

form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const allForms = Object.fromEntries(new FormData(form));
  const inputs = Object.values(allForms);
  if (!inputs.includes('')) {
    const response = await fetch('http://localhost:3000/registr', {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(allForms),
    });
    if (response.ok) {
      const data = await response.json();
      if (data === 'no') alert('пользователь с таким именем уже существует');
      else if (data === 'no2') alert('пользователь с такой почтой уже зарегистрирован');
      else window.location.replace('/');
    } else {
      alert('что-то пошло не так :(');
    }
  } else {
    return alert('пустой ввод');
  }
});

const formAuth = document.forms.auth;

formAuth?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const allForms = Object.fromEntries(new FormData(formAuth));
  const response = await fetch('http://localhost:3000/auth', {
    method: 'post',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(allForms),
  });
  if (response.ok) {
    const data = await response.json();
    if (data === '400') alert('неправильные данные');
    else window.location = ('http://localhost:3000/');
  } else {
    alert('что-то пошло не так :(');
  }
});

const Logout = document.getElementById('logout');

Logout?.addEventListener('click', async (e) => {
  e.preventDefault();
  const allForms = Object.fromEntries(new FormData(formAuth));
  const response = await fetch('http://localhost:3000/logout', {
    method: 'post',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(allForms),
  });
  if (response.ok) {
    window.location.replace('/');
  } else {
    alert('что-то пошло не так :(');
  }
});

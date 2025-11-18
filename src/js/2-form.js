const STORAGE_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');

let formData = {
  email: '',
  message: '',
};

function saveToLS(key, value) {
  const zip = JSON.stringify(value);
  localStorage.setItem(key, zip);
}

function loadFromLS(key) {
  const zip = localStorage.getItem(key);

  try {
    const value = JSON.parse(zip);
    return value;
  } catch {
    return zip;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const data = loadFromLS(STORAGE_KEY);

  formData.email = data?.email || '';
  formData.message = data?.message || '';

  form.elements.email.value = formData.email;
  form.elements.message.value = formData.message;
});

form.addEventListener('input', e => {
  formData[e.target.name] = e.target.value.trim();

  saveToLS(STORAGE_KEY, formData);
});

form.addEventListener('submit', e => {
  e.preventDefault();

  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }

  console.log(formData);

  localStorage.removeItem(STORAGE_KEY);
  formData = { email: '', message: '' };
  form.reset();
});

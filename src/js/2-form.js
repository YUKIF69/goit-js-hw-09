const form = document.querySelector('.feedback-form');
const emailInput = form.elements.email;
const messageInput = form.elements.message;
const STORAGE_KEY = 'feedback-form-state';

let formData = {
  email: '',
  message: '',
};

document.addEventListener('DOMContentLoaded', () => {
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (savedData) {
    try {
      const parsedData = JSON.parse(savedData);
      formData = { ...formData, ...parsedData };
      if (parsedData.email) emailInput.value = parsedData.email;
      if (parsedData.message) messageInput.value = parsedData.message;
    } catch (e) {
      console.error('Parsing error: ', e);
    }
  }
});

form.addEventListener('input', event => {
  const { name, value } = event.target;
  if (name in formData) {
    formData[name] = value.trim();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }
});

form.addEventListener('submit', event => {
  event.preventDefault();

  const { email, message } = formData;

  if (email === '' || message === '') {
    alert('Fill please all fields');
    return;
  }

  console.log(formData);

  // Очищення всього
  formData = { email: '', message: '' };
  localStorage.removeItem(STORAGE_KEY);
  form.reset();
});

const button = document.querySelector('.my-button');
button.addEventListener('click', () => {
    console.log('Button was clicked!');
    window.sendAPI.send('open-error-dialog');
});

window.listenAPI.receive('opened-error-dialog', (data) => {
    console.log(data);
});
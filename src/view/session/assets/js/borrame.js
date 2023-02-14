$('#logout').click(ev => {
    ev.preventDefault();
    ev.stopPropagation();
    window.location.href = '../general/';
})
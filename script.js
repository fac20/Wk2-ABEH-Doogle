var inputTxt = document.getElementById('inputText').value;
var fetchBtn = document.getElementById('fetchBtn');
var form = document.querySelector('form');

var val = inputTxt.value;

form.addEventListener('submit', e => {
    // stop the form submitting & reloading the page
    e.preventDefault();

    // get the value of the field w/ name="doogle"
    const formData = new formData(e.target);
    const name = formData.get("doogle");


    // request
    fetch(`https://api.TheDogAPI.com/images/search?breed_id=${val}`)
        .then(response => {
            if (!response.ok) throw new Error(response.status);
            return response.json();    
        })

    // successful response    
        .then(doogleData => {
            
        })

    // unsuccessful response
        .catch(error => {
        console.log('hello');
        })

});


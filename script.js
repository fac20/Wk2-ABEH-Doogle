const inputTxt = document.getElementById('inputText');
const fetchBtn = document.getElementById('fetchBtn');
const form = document.querySelector('form');
const article = document.querySelector('article');

const arrayOfBreeds = ["Affenpinscher", "Afghan Hound", "African Hunting Dog", "Airedale Terrier", "Akbash Dog",
                        "Akita", "Alapaha Blue Blood Bulldog", "Alaskan Husky", "Alaskan Malamute", "American Bulldog", 
                        "American Bully", "American Eskimo Dog", "American Eskimo Dog (Miniature)", "American Foxhound", 
                        "American Pit Bull Terrier", "American Staffordshire Terrier", "American Water Spaniel", "Anatolian Shepherd Dog",
                        "Appenzeller Sennenhund", "Australian Cattle Dog", "Australian Kelpie", "Australian Shepherd", 
                        "Australian Terrier", "Azawakh", "Barbet", "Basenji", "Basset Bleu de Gascogne", "Basset Hound",
                        "Beagle", "Bearded Collie", "Beauceron", "Bedlington Terrier", "Belgian Malinois", "Belgian Tervuren",
                        "Bernese Mountain Dog", "Bichon Frise", "Black and Tan Coonhound", "Bloodhound", "Bluetick Coonhound",
                        "Boerboel", "Border Collie", "Border Terrier", "Boston Terrier", "Bouvier des Flandres", "Boxer",
                        "Boykin Spaniel", "Bracco Italiano", "Briard", "Brittany", "Bull Terrier", "Bull Terrier (Miniature)",
                        "Bullmastiff", "Cairn Terrier", "Cane Corso", "Cardigan Welsh Corgi", "Catahoula Leopard Dog", "Caucasian Shepherd (Ovcharka)",
                        "Cavalier King Charles Spaniel", "Chesapeake Bay Retriever", "Chinese Crested", "Chinese Shar-Pei", "Chinook", "Chow Chow",
                        "Clumber Spaniel", "Cocker Spaniel", "Cocker Spaniel (American)", "Coton de Tulear", "Dalmatian", "Doberman Pinscher", 
                        "Dogo Argentino", "Dutch Shepherd", "English Setter", "English Shepherd", "English Springer Spaniel", "English Toy Spaniel",
                        "English Toy Terrier", "Eurasier", "Field Spaniel", "Finnish Lapphund", "Finnish Spitz", "French Bulldog", "German Pinscher",
                        "German Shepherd Dog", "German Shorthaired Pointer", "Giant Schnauzer", "Glen of Imaal Terrier", "Golden Retriever", 
                        "Gordon Setter", "Great Dane", "Great Pyrenees", "Greyhound", "Griffon Bruxellois", "Harrier", "Havanese", "Irish Setter",
                        "Irish Terrier", "Irish Wolfhound", "Italian Greyhound", "Japanese Chin", "Japanese Spitz", "Keeshond", "Komondor", 
                        "Kooikerhondje", "Kuvasz", "Labrador Retriever", "Lagotto Romagnolo", "Lancashire Heeler", "Leonberger", "Lhasa Apso", 
                        "Maltese", "Miniature American Shepherd", "Miniature Pinscher", "Miniature Schnauzer", "Newfoundland", "Norfolk Terrier",
                        "Norwich Terrier", "Nova Scotia Duck Tolling Retriever", "Old English Sheepdog", "Olde English Bulldogge", "Papillon", 
                        "Pekingese", "Pembroke Welsh Corgi", "Perro de Presa Canario", "Pharaoh Hound", "Plott", "Pomeranian", "Poodle (Miniature)",
                        "Poodle (Toy)", "Pug", "Puli", "Pumi", "Rat Terrier", "Redbone Coonhound", "Rhodesian Ridgeback", "Rottweiler", "Russian Toy",
                        "Saint Bernard", "Saluki", "Samoyed", "Schipperke", "Scottish Deerhound", "Scottish Terrier", "Shetland Sheepdog", 
                        "Shiba Inu", "Shih Tzu", "Shiloh Shepherd", "Siberian Husky", "Silky Terrier", "Smooth Fox Terrier", "Soft Coated Wheaten Terrier",
                        "Spanish Water Dog", "Spinone Italiano", "Staffordshire Bull Terrier", "Standard Schnauzer", "Swedish Vallhund", "Thai Ridgeback",
                        "Tibetan Mastiff", "Tibetan Spaniel", "Tibetan Terrier", "Toy Fox Terrier", "Treeing Walker Coonhound", "Vizsla", "Weimaraner",
                        "Welsh Springer Spaniel", "West Highland White Terrier", "Whippet", "White Shepherd", "Wire Fox Terrier", "Wirehaired Pointing Griffon",
                        "Wirehaired Vizsla", "Xoloitzcuintli", "Yorkshire Terrier"];

const loadingPage = document.querySelector(".loading-div");
const header = document.querySelector("header");
const seperator = document.querySelector("hr");

const loading = () => {
    article.innerHTML = "";
    loadingPage.classList.toggle("hidden");
    header.classList.toggle("hidden");
    form.classList.toggle("hidden");
    seperator.classList.add("hidden");
}

let dogAPIobject = {};

form.addEventListener('submit', e => {
    // stop the form submitting & reloading the page
    e.preventDefault();

    // get the value of the field w/ name="doogle"

    loading();

    let breed = inputTxt.value.trim();
    let breed_id;
    

    /*----- Request for dog API -----*/
    fetch(`https://api.thedogapi.com/v1/breeds/search?q=${breed}`)

        .then(response => {
            if (!response.ok) throw new Error(response.status);
            return response.json();
        })

    // json response    
        .then(jsonBreed => {
            breed_id = jsonBreed[0].id;

            dogAPIobject.name = jsonBreed[0].name;
            dogAPIobject["bred for"] = jsonBreed[0].bred_for;
            dogAPIobject["life span"] = jsonBreed[0].life_span;
            dogAPIobject.temperament = jsonBreed[0].temperament;
            return breed_id;
        })

        .then(id => {
            fetch(`https://api.thedogapi.com/v1/images/search?breed_id=${id}`)   
            .then(imageJSON => imageJSON.json())
            .then(dogAPI => {
                console.log('dogs URL:', dogAPI[0].url);

                dogAPIobject.image = dogAPI[0].url;  
                loading();
            })
        .then( () => appendData(dogAPIobject) )
        .catch( ()=> console.error('WRONG BREED ID'))
        })
    // unsuccessful response
        .catch( ()=> {
            
            console.error('WRONG INPUT! ENTER VALID DOG BREED')
            searchError();
            resetButton();
        })
        
    /*----- Request for wikimedia API -----*/
    // --Images--
    let url = "https://en.wikipedia.org/w/api.php"; 

    let params = {
        action: "query",
        prop: "images",
        titles: breed, 
        format: "json"
    };

    url = url + "?origin=*";
    Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});

    fetch(url)
        .then (response => {
            if (!response.ok) throw new Error(response.status);
            return response.json();
        })    
        .then(json => { 
            console.log('wiki object with image:', json)
            const breedImages = Object.values(json.query.pages)[0].images
            console.log("breedImages:", breedImages);
            console.log('First search result:', breedImages)
        })
        // unsuccessful response
        .catch(()=> console.error('BREED IMAGE NOT FOUND ON WIKIMEDIA'));

    // --Text--
    let url_2 = "https://en.wikipedia.org/w/api.php"; 

    let params_2 = {
        action: "query",
        prop: "revisions",
        titles: breed,
        rvprop: "content",
        rvslots: "main",
        formatversion: "2",
        format: "json"
    };

    url_2 = url_2 + "?origin=*";
    Object.keys(params_2).forEach(function(key){url_2 += "&" + key + "=" + params_2[key];});

    fetch(url_2)
        .then (response => {
            if (!response.ok) throw new Error(response.status);
            return response.json();
        })    
        .then(json => { 
            console.log('wiki object with text:', json)
            const breedText = json.query.pages[0].revisions[0].slots.main.content;
            console.log('Text of search result:', breedText)
        })

        // unsuccessful response
        .catch(()=> console.error('BREED TEXT NOT FOUND ON WIKIMEDIA'));

});

// Page reload on Doogle_logo click

const logo = document.querySelector('.doogle-logo');
const icon = document.querySelector('.doogle-icon');

logo.addEventListener("click", function(){
    window.location.reload(false);
});
icon.addEventListener("click", function(){
    window.location.reload(false);
});

const appendData = (dogObject) => {
    

    let img = document.createElement("img");
    img.setAttribute("src", dogObject.image);
    img.classList.add("dog-pics");
    article.appendChild(img);

    let div = document.createElement("div");
    div.innerHTML = `<h3>Temperament</h3>
    <p>${dogObject.temperament}</p>`;
    div.classList.add("dog-picbreed-info");
    div.classList.add("temperament");
    article.appendChild(div);

    let div = document.createElement("div");
    div.innerHTML = `<h3>Life span</h3>
    <p>${dogObject["life span"]}</p>`;
    div.classList.add("dog-picbreed-info");
    div.classList.add("typical-characteristics");
    article.appendChild(div);

    let div = document.createElement("div");
    div.innerHTML = `<h3>Mission</h3>
    <p>${dogObject["bred for"]}</p>`;
    div.classList.add("dog-picbreed-info");
    div.classList.add("typical-characteristics");
    article.appendChild(div);

    seperator.classList.remove("hidden");
}

const searchError = () => {
    let errorPicture = document.createElement("img");
    errorPicture.setAttribute("src", "images/error-404.png");
    errorPicture.classList.add("dog-pics");
    article.appendChild(errorPicture);
    loadingPage.classList.add("hidden");
}


const resetButton = () => {
    let resetButton = document.createElement("button");
    resetButton.innerHTML = "Try again!";
    article.appendChild(resetButton);

    resetButton.addEventListener("click", () => {
            article.innerHTML = "";
            header.classList.toggle("hidden");
            form.classList.toggle("hidden");
    })
}








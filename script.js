var inputTxt = document.getElementById('inputText');
var fetchBtn = document.getElementById('fetchBtn');
var form = document.querySelector('form');

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
    loadingPage.classList.toggle("hidden");
    header.classList.toggle("hidden");
    form.classList.toggle("hidden");
}

form.addEventListener('submit', e => {
    // stop the form submitting & reloading the page
    e.preventDefault();

    // get the value of the field w/ name="doogle"
    // const formData = new formData(e.target);
    // const name = formData.get("doogle");

    loading();

    let breed = inputTxt.value.trim();
    console.log(breed);
    let breed_id;
    let dogAPIobject = {};

    // request for dog API
    fetch(`https://api.thedogapi.com/v1/breeds/search?q=${breed}`)

        .then(response => {
            if (!response.ok) throw new Error(response.status);
            return response.json();
        })

    // json response    
        .then(jsonBreed => {
            console.log(jsonBreed);
            breed_id = jsonBreed[0].id;
            console.log(breed_id);
            dogAPIobject.name = jsonBreed[0].name;
            dogAPIobject["bred for"] = jsonBreed[0].bred_for;
            dogAPIobject["life span"] = jsonBreed[0].life_span;
            dogAPIobject.temperament = jsonBreed[0].temperament;
            return breed_id;
        })
    //  
        .then(id => {
            fetch(`https://api.thedogapi.com/v1/images/search?breed_id=${id}`)   
            .then(imageJSON => imageJSON.json())
            .then(dogAPI => {
                console.log(dogAPI[0].url);
                dogAPIobject.image = dogAPI[0].url;  
                loading(); 
            })
            .catch( ()=> console.error('WRONG BREED ID'))
        })
    // unsuccessful response
        .catch( ()=> console.error('WRONG INPUT! ENTER VALID DOG BREED'))

        console.log(dogAPIobject);
        
});


// Page reload on Doogle_logo click

var logo = document.querySelector('.doogle-logo');
var icon = document.querySelector('.doogle-icon');

logo.addEventListener("click", function(){
    window.location.reload(false);
});
icon.addEventListener("click", function(){
    window.location.reload(false);
});

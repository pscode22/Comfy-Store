let company = document.querySelectorAll('.company-btn');

let productsContainer =  document.querySelector('.products-container');

let productsArray = [];
    
for(let i = 0; i < productsContainer.children.length; i++) {
    productsArray.push(productsContainer.children[i]);
}

function indexNumber(num) {
    productsArray[num].style.display = "grid";      
};

function addIndex(start, stop) {
    productsArray.slice(start,stop).forEach(value => value.style.display = "grid");
}

company.forEach(btn => {
    btn.addEventListener('click', () => {

        productsArray.forEach(value => value.style.display = "none");
       
        if(btn.innerHTML === 'ikea') {
            indexNumber(0);
            indexNumber(10);
        }

        else if(btn.innerHTML === 'marcos') {
            indexNumber(1);indexNumber(6);
            indexNumber(8);
        }

        else if(btn.innerHTML === 'caressa') {
            addIndex(2,5);
        }

        else if(btn.innerHTML === 'liddy') {
            indexNumber(5); indexNumber(7);
            indexNumber(9); indexNumber(11);
        }

        else if(btn.innerHTML === 'all') {
            addIndex(0,12);
        }

    });
});

let pricefilter = document.querySelector('.price-filter');

let priceValue = document.querySelector('.price-value');

pricefilter.addEventListener('input', () => {
    priceValue.innerHTML = pricefilter.value;

    for(let i = 0; i < productsContainer.children.length; i++) {

        productsContainer.children[i].style.display = "grid";

        let eachProductPrice = productsContainer.children[i].children[3].innerHTML.slice(1,);

        if(Number(eachProductPrice) > Number(priceValue.innerHTML)){
          productsContainer.children[i].style.display = "none";
        };

    };

});

let searchBar = document.querySelector('.search-input');

searchBar.addEventListener('keyup', () => {

   let searchValue = searchBar.value.toUpperCase();
    
    for(let i = 0; i < productsContainer.children.length; i++) {

        productsContainer.children[i].style.display = "none";

        let productName = productsContainer.children[i].children[2].innerHTML.toUpperCase();

        if(productName.indexOf(searchValue) > -1) {
            productsContainer.children[i].style.display = "grid";
        }
    };
})
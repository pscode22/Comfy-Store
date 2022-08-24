const cartContainer = document.querySelector(".sideBar");

document.querySelector(".closeBtn").addEventListener("click", () => {
    cartContainer.style.display = "none";
    document.body.style.backgroundColor = "white";
    // document.body.style.pointerEvents = "auto";
});

document.querySelector(".toggle-cart").addEventListener("click", () => {
    cartContainer.style.display = "block";
    cartContainer.style.pointerEvents = "auto";
    // document.body.style.pointerEvents = "none";
});

document.querySelector(".toggle-nav").addEventListener("click", () => {
    if(document.querySelector(".nav-link").style.display = "none") {
        document.querySelector(".nav-link").style.display = "block";
        document.querySelector(".nav-link").style.transition = "all 0.3s linear";
    }    
});

document.querySelector(".nav-close").addEventListener("click", () => {
    if(document.querySelector(".nav-link").style.display = "block") {
      document.querySelector(".nav-link").style.display = "none";
      document.querySelector(".nav-link").style.transition = "all 0.3s linear";
    }
});

// ================================================================================== //

const infoBtn = document.querySelectorAll('.product-icon'); 

infoBtn.forEach((btn) => {
    btn.addEventListener('click', () => {

        let source = btn.parentNode.parentNode.children.item(0).getAttribute('src');

        let productName = btn.parentNode.parentNode.children.item(2).innerText;

        let price = btn.parentNode.parentNode.children.item(3).innerText;

        let companyName = btn.parentNode.parentElement.getAttribute('data-company-name').toUpperCase();

        sessionStorage.setItem('productDetail', JSON.stringify([source, productName, price, companyName]));

    });
});

//======================================================================================//


let body = document.querySelector('body'); 

const cartBtn = document.querySelectorAll('.product-cart-btn');

const cartItems = document.querySelector(".cart-items");

let amount = Number(document.querySelector('.amount').innerText);

let totalAmount = document.querySelector('.amount');

let itemsInCart = document.querySelector('.items-count'); 

cartBtn.forEach((btn) => {
   btn.addEventListener('click', (e) => {   
       e.preventDefault();   

       cartContainer.style.display = "block";
       cartContainer.style.cursor = "auto"
     
       let productName = btn.parentNode.parentNode.children.item(2).innerText; 
       let price = Number(btn.parentNode.parentNode.children.item(3).innerText.slice(1,)); 

       totalAmount.innerHTML = (amount += price).toFixed(2);

       let itemInList = cartItems.children;

       for(let i =  0 ; i < cartItems.children.length;  i++) {
        if(productName === itemInList[i].children[1].children[0].children[0].innerHTML) {
          itemInList[i].children[2].children[1].innerHTML++; 
          itemInList[i].style.display = "grid";
            storage();
          return;
        }; 
      };

     item(btn); 

       for(let i = 0; i < itemInList.length; i++) { 
       let clearbtn = itemInList[i].children[1].children[0].children[3];
            clearbtn.onclick = function(){ 
                let thisPrice = Number(itemInList[i].children[1].children[0].children[2].innerHTML.slice(1,));
                let count  = Number(itemInList[i].children[2].children[1].innerHTML);
                totalAmount.innerHTML = (amount -= (thisPrice * count)).toFixed(2);
                itemInList[i].children[2].children[1].innerHTML = 0; 
                delete itemInList[i];
                itemInList[i].style.display = "none";
                storage();
                
                if(totalAmount.innerHTML === '0.00' || amount < 0.00) {
                    totalAmount.innerHTML = '0.00';
                    amount = 0.00;
                    document.querySelectorAll('.item-in').forEach(ele => ele.remove());
                    sessionStorage.removeItem('cartItems');
                }
            } 
           
        }

        incrementer(itemInList);
        decrementer(itemInList);

        storage(); 
    
    });        
});  


function item(btn) {

    let source = btn.parentNode.parentNode.children.item(0).getAttribute('src');
    let productName = btn.parentNode.parentNode.children.item(2).innerText; 
    let price = Number(btn.parentNode.parentNode.children.item(3).innerText.slice(1,))

    cartItems.insertAdjacentHTML('beforeend',
        `<div class="item-in">
                                    
         <img src="${source}" alt="Item-Image" class="item-img">
    
         <div class="item-detail">
             <p>
                 <span class="itemName">${productName}</span>
                 <br>
                 <span class="itemPrice">$${price}</span>
                 <button class="remove-item">
                     <i class="fas fa-minus-circle"></i>
                 </button>
             </p>
         </div>
    
         <div>
             <button class="cart-item-increase-btn" data-id="rec43w3ipXvP28vog">
               <i class="fas fa-chevron-up"></i>
             </button>
             <p class="cart-item-amount" data-id="rec43w3ipXvP28vog">1</p>
             <button class="cart-item-decrease-btn" data-id="rec43w3ipXvP28vog">
               <i class="fas fa-chevron-down"></i>
             </button>
         </div>
    
        </div>`
    )
};


function incrementer(listeditem) {
    for(let j = 0; j < listeditem.length; j++) {
     let incrementerBtn = listeditem[j].children[2].children[0];
     incrementerBtn.onclick = function(){
        listeditem[j].children[2].children[1].innerHTML++;
        let thisItemPrice = Number(listeditem[j].children[1].children[0].children[2].innerHTML.slice(1,));
        totalAmount.innerHTML = (amount += thisItemPrice).toFixed(2);
        storage();
        }; 
    };
};


function decrementer(listeditem) {
    for(let j = 0; j < listeditem.length; j++) {
     let decrementerBtn = listeditem[j].children[2].children[2];
        decrementerBtn.onclick = function(){
            listeditem[j].children[2].children[1].innerHTML--;
            let thisItemPrice = Number(listeditem[j].children[1].children[0].children[2].innerHTML.slice(1,));
            totalAmount.innerHTML = (amount -= thisItemPrice).toFixed(2);
            storage();

            if(listeditem[j].children[2].children[1].innerHTML === '0'){
                delete listeditem[j];
                listeditem[j].style.display = "none";
            }

            if(totalAmount.innerHTML === '0.00' || amount < 0.00) {
                totalAmount.innerHTML = '0.00';
                amount = 0.00;
                document.querySelectorAll('.item-in').forEach(ele => ele.remove());
                sessionStorage.removeItem('cartItems');
            }
        };    
    };
};


function storage() {  // Storing cart-item details in sessionStorage.
    let arr = [];
    let arr2 = [];
 for(let i = 0 ; i < cartItems.children.length; i++) {
    let source = cartItems.children.item(i).children[0].getAttribute('src');
    let productName = cartItems.children.item(i).children[1].children[0].children[0].innerHTML;
    let price = cartItems.children.item(i).children[1].children[0].children[2].innerHTML.slice(1,);
    let count  = Number(cartItems.children.item(i).children[2].children[1].innerHTML);
    let tamount = totalAmount.innerHTML;

  arr.push([source,productName,price,count,tamount]);
 }

 for(let i = 0; i <arr.length; i++) {
        if(arr[i][3] > 0) {
          arr2.push(arr[i])
        };
    }

  sessionStorage.setItem('cartItems',JSON.stringify(arr2))
  itemsInCart.innerHTML = JSON.parse(sessionStorage.getItem('cartItems')).length;
};


window.onload = (function load() { 

    let itms = JSON.parse(sessionStorage.getItem('cartItems'));
    
    if(itms == null) {
        itemsInCart.innerHTML = 0;
    } 
    else {  // Getting cartItem details from sessionStorage.

        itemsInCart.innerHTML = JSON.parse(sessionStorage.getItem('cartItems')).length;

        for(let k = 0; k < itms.length; k++) {
            let source = itms[k][0];
            let productName = itms[k][1];
            let price = itms[k][2];
            let count = itms [k][3];
            let amnt = itms[k][4];
    
            cartItems.insertAdjacentHTML('beforeend',
            `<div class="item-in">
                                        
             <img src="${source}" alt="Item-Image" class="item-img">
        
             <div class="item-detail">
                 <p>
                     <span class="itemName">${productName}</span>
                     <br>
                     <span class="itemPrice">$${price}</span>
                     <button class="remove-item">
                         <i class="fas fa-minus-circle"></i>
                     </button>
                 </p>
             </div>
        
             <div>
                 <button class="cart-item-increase-btn" data-id="rec43w3ipXvP28vog">
                   <i class="fas fa-chevron-up"></i>
                 </button>
                 <p class="cart-item-amount" data-id="rec43w3ipXvP28vog">${count}</p>
                 <button class="cart-item-decrease-btn" data-id="rec43w3ipXvP28vog">
                   <i class="fas fa-chevron-down"></i>
                 </button>
             </div>
        
            </div>`
        )  
          amount = Number(amnt) ;
          totalAmount.innerHTML = amount;
        }
    
        let itemInList = cartItems.children;
        incrementer(itemInList);
        decrementer(itemInList);
    
        for(let i = 0; i < itemInList.length; i++) { 
            
            let clearbtn = itemInList[i].children[1].children[0].children[3];
             clearbtn.onclick = function(){ 
                let thisPrice = Number(itemInList[i].children[1].children[0].children[2].innerHTML.slice(1,));
                let count  = Number(itemInList[i].children[2].children[1].innerHTML);
                totalAmount.innerHTML = (amount -= (thisPrice * count)).toFixed(2);
                itemInList[i].children[2].children[1].innerHTML = 0; 
                delete itemInList[i];
                itemInList[i].style.display = "none";
                storage();
                
                if(totalAmount.innerHTML === '0.00' || amount < 0.00) {
                    totalAmount.innerHTML = '0.00';
                    amount = 0.00;
                    document.querySelectorAll('.item-in').forEach(ele => ele.remove());
                    sessionStorage.removeItem('cartItems');
                };
            };        
        };
    };

})();
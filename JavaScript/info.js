const productImg = JSON.parse(sessionStorage.getItem('productDetail'))[0];

const productName = JSON.parse(sessionStorage.getItem('productDetail'))[1];

const productPrice = JSON.parse(sessionStorage.getItem('productDetail'))[2];

const companyName = JSON.parse(sessionStorage.getItem('productDetail'))[3];

const insertImage = document.querySelector('.products-info').children.item(0);

const insertArticle = document.querySelector('.products-info').children.item(1);

insertImage.setAttribute('src', productImg);

insertArticle.children.item(0).innerText = productName;

insertArticle.children.item(2).innerText = productPrice; 

document.querySelector('.company-name').innerHTML = companyName; 

document.querySelector('.title').innerHTML = productName;

// ================================================================================ //

const cartContainer = document.querySelector(".sideBar");

document.querySelector(".closeBtn").addEventListener("click", () => {
    cartContainer.style.display = "none";
});

document.querySelector(".toggle-cart").addEventListener("click", () => {
    cartContainer.style.display = "block";
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

//=======================================================================================//

let body = document.querySelector('body');   //.style['pointer-events'] = 'none';

const cartBtn = document.querySelectorAll('.cart-btn');

const cartItems = document.querySelector(".cart-items");

let amount = Number(document.querySelector('.amount').innerText);

let totalAmount = document.querySelector('.amount');

let itemsInCart = document.querySelector('.items-count');

cartBtn.forEach((btn) => {
   btn.addEventListener('click', (e) => {   
       e.preventDefault();   

       cartContainer.style.display = "block";
       cartContainer.style.cursor = "auto"
       //   body.style.pointerEvents = "none";
     

       let price = Number(productPrice.slice(1,));

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
      };

      incrementer(itemInList);
      decrementer(itemInList);

      storage(); 
    
    });        
});  

function item(btn) {

  let price = Number(productPrice.slice(1,));

  cartItems.insertAdjacentHTML('beforeend',
    `<div class="item-in">
                                
     <img src="${productImg}" alt="Item-Image" class="item-img">

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


function storage() {  // cart-items in session storage.
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
  else {
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

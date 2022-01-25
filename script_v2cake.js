"use strict";

const patisserie = {
  bananaCaramel: {
    stock: 3,
    price: 9.99,
  },
  contessa: {
    stock: 5,
    price: 7.99,
  },
  concorde: {
    stock: 11,
    price: 22.99,
  },
  mouseCake: {
    stock: 8,
    price: 16.99,
  },
  confettiSuprise: {
    stock: 9,
    price: 14.99,
  },
};

const checkOrder = (order, totalCost) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let inStock = patisserie[order[0]].stock >= order[1];

      if (inStock) {      
        resolve(`All of the items are in stock. Total cost of your order is ${totalCost}.`);
      } else {
        reject(
          `The order could not be completed because some items are sold out.`
        );
      }
    }, 1000);
  });
};



const payment = (totalCost) => {
  return new Promise((resolve, reject) => {
    console.log(totalCost)
    setTimeout(() => {
    console.log(` ${totalCost} will be charged from your card. Press "1" if it is ok?`)
  document.addEventListener("keydown", function (event) {
    if (event.key === "1") {
      resolve(`Payment processed completed. You paid ${totalCost} $`);
      } else {
        reject(`You pressed another key, can not process order.`);
      }
    });
  }, 2000);
})
}

const checkStock = (order) => {
  return new Promise((resolve, reject) => {
    console.log("To Cashier: Wait for checking stock...")
    setTimeout(() => {
      patisserie[order[0]].stock = patisserie[order[0]].stock - order[1];  // updating original amount
      if (patisserie[order[0]].stock > 1) {
        resolve(`Good Sale! ${order[0]} stock is: ${patisserie[order[0]].stock} and enough for now.`);
      } else {
        reject(`Warning! ${order[0]} stock is ${patisserie[order[0]].stock} and it is critic`);
      }
    }, 2000);
    });
  }


const cakeType = document.getElementById('cakeSelect');
const orderAmount = document.getElementById('cakeAmount');
const orderBtn = document.getElementById('submit_btn');

orderBtn.onclick = ()=>{

  console.log(`You ordered ${orderAmount.value} ${cakeType.options[cakeType.selectedIndex].text}.`)
  let totalCost = patisserie[cakeType.value].price * orderAmount.value;
  let order = [cakeType.value, orderAmount.value]
  checkOrder(order, totalCost)
  .then((resolvedValueFromcheckOrder) => {
    console.log(resolvedValueFromcheckOrder)
    return payment(totalCost);
  })
  .then((resolvedValueFromPayment) => {
    console.log(resolvedValueFromPayment)
    return checkStock(order);
  })
  .then((successMessageFromcheckStock) => {
    console.log(successMessageFromcheckStock);
  })
  .catch(errorMessageFromAnyPromise => {
    console.log(errorMessageFromAnyPromise);
  })
  //.catch(alert)     //this works
  //.catch(console.log.bind(console))  // this works also
  //.catch(console.log)       // this works also
  .finally(() => {
    console.log("Thank you for choosing us!");
  });
  
}

Steps to run backend

1. npm i => To install all required packages.

####### How to access user routes  ########

Note = All that is like (/:something), Please pass this as path variable


## USER ROUTES

1. SIGNUP =>
    
    Method type = Post
    API = http://localhost:3000/user/signup
    body = {
    "username" : "ratnesh",
    "password" : 123
}

2. LOGIN => 
    Method type = Post
    API =  http://localhost:3000/user/login
     body = {
    "username" : "ratnesh",
    "password" : 123
}

*****  VVI  *****

Now to access any route pass authorization token that is returned after login or 
signup for new users

*****  VVI  *****

## MENU ROUTES

1. Get all menu items
API = http://localhost:3000/menu

2. Add new item to menu
API = http://localhost:3000/menu 
body = {
            "name": "Biryani",
            "category": "Main course",
            "imageLink": "img link from internet",
            "price": 1299,
            "availability": true
}

3.Update menu item
API = http://localhost:3000/menu/:itemId
body = {

    "name": "Ice cream updated",
    "category": "Dessert updated",
    "imageLink": "image link updated or same",
    "price": 1299,
    "availability": false

}

4. Delete menu item
API = http://localhost:3000/menu/:itemId


## ORDER ROUTES 

1. Get all order 
API = http://localhost:3000/order

2. Add item to cart 
API = http://localhost:3000/order/addItem/:itemId/:quantity

3. Complete the pending order
API = http://localhost:3000/order/submit





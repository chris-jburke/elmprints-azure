# Elm Prints

## Scope

### MVP
* Elm Prints is an eCommerce site that sells movie and art posters
* Users should be able to create an account
* Users should be able to purchase posters and see detailed information about each individual item
* Users should be able to search for posters

### Stretch goals
* Mobile-friendly design
* Users should be able to see their shopping cart and order history

## User stories

### MVP
* As a user when I visit the site I want to be able to browse products from the home page without being logged in
* As a user I want to be able to visit a page that lists specific products that are indicated by a link in the navigation bar
* As a user I want a profile that includes my name, shipping- billing- and email address
* As a user I want to be able to click on a product to see its details: a short description, price, image and shipping details
* As a user I want to see a list of posters that I can purchase
* As a user I want to be able to search for a poster
* As a user I want to be able to buy a poster

### Stretch goals
* As a user my profile includes my current shopping cart, order history and wishlist
* As a user when I visit a product's detail page I can see consumer reviews
* As a user I want to be able to upload an image/product to be listed as an available product for purchase

## Wireframes
![LandingPage](https://i.imgur.com/GROXGBD.jpg)

![FAQPage](https://i.imgur.com/GQrxWew.jpg)

![SignUpPage](https://i.imgur.com/tdwithC.jpg)

![SignInWindow](https://i.imgur.com/gepwtav.jpg)

![SingleItemPage](https://i.imgur.com/qIp4iwU.jpg)

![ProfilePage](https://i.imgur.com/yIPDds4.jpg)

![ShowCartPage](https://i.imgur.com/lIAEktS.jpg)

![PaymentPage](https://i.imgur.com/inEyBgV.jpg)

![ReceiptPage](https://i.imgur.com/FdcSF0f.jpg)

## Planning
![](https://i.imgur.com/JsXqLT6.png)

## APIs 

[The Movie Database (TMDb)](https://www.themoviedb.org/)

[The Harvard Art Museums API](https://www.harvardartmuseums.org/collections/api)

## Technologies

### Backend

* Node.js
* axios
* cors
* express
* jsonwebtoken
* Mongo DB
* mongoose
* stripe

### Frontend

* React.js
* TypeScript
* axios
* Material-UI
* Sass

---

[stripe](https://stripe.com/)

Stripe is used to route credit card payments through our provided service.

[Material-UI](https://material-ui.com/)

Offers ready to use and styleable UI components based on Material Design.

## Resources

* https://stripe.com/docs/stripe-js/react
* https://github.com/stripe/react-stripe-elements
* https://github.com/stripe-samples/accept-a-card-payment/blob/master/using-webhooks/server/node/server.js#L37-L40
* https://blog.logrocket.com/building-payments-system-react-stripe/
* https://medium.com/@to.richard.hong/building-stripe-payment-with-react-js-cb07e376197c
* https://blog.hackages.io/create-a-simple-payment-flow-with-stripe-b1d0f0f94337
* https://medium.com/javascript-in-plain-english/how-to-use-async-function-in-react-hook-useeffect-typescript-js-6204a788a435
* https://levelup.gitconnected.com/a-typescript-safe-api-82cc22c4f92d
* https://dev.to/projectescape/programmatic-navigation-in-react-3p1l
* https://reacttraining.com/react-router/web/api/Redirect
* https://github.com/nickubed/meet-out
* https://mongoosejs.com/docs/
* https://stackoverflow.com/questions/56111294/how-to-use-theme-and-props-in-makestyles
* https://github.com/mui-org/material-ui/tree/master/examples/create-react-app-with-typescript
* https://www.carlrippon.com/typed-usestate-with-typescript/
* https://fettblog.eu/typescript-react/components/
* https://github.com/microsoft/TypeScript-React-Starter/blob/master/src/components/Hello.tsx
* https://stackoverflow.com/


## Installation
* Various Node Modules are installed in both the server and client folders
* If running this project locally, you will need to run the following command for both sets of Node Modules:
```
npm install
```
* .env files will also need to be created for both the server and client folders
* The .env file in the client folder will need:
```
REACT_APP_SERVER_URL=your server URL
```
* The .env file in the server folder will need:
```
JWT_SECRET="any combination of characters"
TMDB_API_KEY="your API KEY"
HAM_API_KEY="your API KEY"
STRIPE_SK="your Stripe SK"
```

## Screenshots

![](https://i.imgur.com/9anQqWT.jpg)
> The landing page

![](https://i.imgur.com/Rk5mdMk.png)
> Sign in form

![](https://i.imgur.com/X3v0EoX.png)
> Sign up form

![](https://i.imgur.com/m4wxTNt.png)
> Profile page

![](https://i.imgur.com/Y6FQAaO.png)
> Adding shipping information

![](https://i.imgur.com/PKqxjJP.jpg)
> Look at a poster

![](https://i.imgur.com/UCNQfaI.jpg)
> Add a poster to the cart

![](https://i.imgur.com/WRbdfOZ.png)
> Proceed with payment

![](https://i.imgur.com/zJ2pLQL.png)
> Receipt page

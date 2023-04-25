# NextJs-Authentication-using-HTTP-only-cookie

Start project :-

cd client
npm i

cd server
npm i

Create .env file at server folder and add env's values

client side
npm run dev

server side
npm start

/user => Protected route

CSRF(Cross site request forgery) Attack :-

The site abc.com having form and on submit of form make post request of anything(Ex. payment, create blog post). so the attacker sending mail link to the user. when user click on that link user redirect to the browser and automatic post request created (attacker provide action on abc.com when form submit so form submitted from abc.com) with parameter which is attacker provided. if user cookie session is active than cookie send into the backed because cookie pass in each request and user getting res without their permission.
suppose EX. if attacker successful to attack and blog created and than attacker set same link into that post. so other friends of user click on that link and other 10 blog created. and this 10 blogs users friend click on that link other 30,40,100,100000... blogs created.

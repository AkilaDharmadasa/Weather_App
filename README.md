# Weather_App
This is a vueJS application to view real time weather of a few cities

My personel Api key is not shared 
create a .env file in the prject folder (vue-project  ---> .env) like in .example

Then add your own key to a variable named 
VITE_APP_API_KEY= 00000000000000
<!-- replace 00000000000000 with api key  -->

Add your api key to
Commands for docker:

"docker build -t image-1 ."
(replace image-1 with the image name you want)

"docker run -it -p --rm --name vueapp-1 image-1"
(replace vueapp-1 with a name you want)

Then go to the browser and go to "localhost:8080" 

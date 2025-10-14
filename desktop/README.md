pages är för de sidor som kommer med i routing
components är olika delar
feature är de issues som blir en feature
layout är för om vi vill ha olika layouter, just nu endast main
assets är för bilder eller annat vi behöver så länge
index-css.
**Se nedan om feature login för mer. Men för att få med design med ljusblått runt komponenten,används dessa pages i detta syfte.

designbeslut. feature 4.1.3
Även om ul/li kanske hade varit snyggare eller haft fler alternativ för styling togs valet att tabell är ett mer användarvänligt alternativ.
Har skapat klasser för table-row och table-row-hover

feature 4.2.4
vid larm ändras titel så man kan se det i tabben även om man är i en annan tab och jobbar, samt en enkel popup från standardAPI som kommer upp i hörnet på skärm 1
Det finns även filterdropdown för att få bättre koll på order som finns

har nu deployat till azure med url: https://zealous-desert-0bb104903.1.azurestaticapps.net
fjärde försöket att få med trackapp-webadmin först i url, men det verkar inte vara möjligt.

feature login
har ingen sign up utanför login då detta är admin verktyg, och inte för vem som helst att signa up. Tänker vi kan skapa en extra create user för de som har admin åtkomst om vi går den vägen.
annars ganska rakt fram med inlogg av username och passeword.
tar med token och lägger in i header vem man är inloggad som.
inlogg-knappen försvinner när man är på sidan för att logga in, och ändrar till logga ut när man är inloggad.
För att få med den ljusblåa rutan runt för att hålla designen behöver man lägga det som en "sida" runt. Har även lagt in denna i pages.
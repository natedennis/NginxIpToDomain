# NginxIpToDomain
Tamper Monkey script and node service to change all the IPs on the nginx status page to domain names.

install npm
Start the resolver service with 
node main.js

install tampermonkey

add NNginxIpToDomain-tampermonkey.js to tampermonkey installed scripts

navigate your browser to an nginx status page.

accept cross site scripting to your resolver service.

obviously this will only work if you have PTR in place for the ips listed on the nginx status page.

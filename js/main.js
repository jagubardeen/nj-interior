<script type="text/javascript"
        src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js">
</script>
<script type="text/javascript">
   (function(){
      emailjs.init({
        publicKey: "lR5X5pkmn8iSj6vBp",
      });
   })();
</script>

function sendMail(){
   var params = {
      name: document.getElementById("name").value ,
      email:document.getElementById("email").value,
      message:document.getElementById("message").value,

   };

const serviceID = "service_g04l4fa";
const templateID = "template_poe6b37";

emailjs.send (serviceID,templateID,params)
.then(
   res =>{
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("message").value = "";
      console.log(res);
      alert("your message sent successfully");
   })
   .catch((err)=> console.log(err));
}
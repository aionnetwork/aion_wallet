
</main>
</div>

<script type="text/javascript" src="js/etherwallet-static.min.js"></script>
<script type="text/javascript" src="js/etherwallet-min.js"></script>

<script>

  document.getElementById('mySpinner').style.display = 'none'; 
  document.getElementById('appMain').style.display = 'block';

  function setCookie(exdays) {
      var d = new Date();
      var expires = "expires=" + d.getTime();
      document.cookie =expires;
  }

  function getCookie(cname) {
      var name = cname + "=";
      var decodedCookie = decodeURIComponent(document.cookie);
      var ca = decodedCookie.split(';');
      for(var i = 0; i < ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == ' ') {
              c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
              return c.substring(name.length, c.length);
          }
      }
      return "";
  }

  function checkCookie() {
      var exp=getCookie("expires");
      var d = new Date();

      if (exp == "") {
       alert ("Thank you for using the Aion Test Wallet. This wallet is currently for testing purposes only.");
       setCookie(30);
      }
      //insert expiry date function
  }

setTimeout(checkCookie, 1000); 

</script>


</body>
</html>

document.getElementById('submit').addEventListener('click', function(event){
	    var req = new XMLHttpRequest();
	    var info = {name:null,email:null};
        info.name = document.getElementById('name').value;
        info.email = document.getElementById('email').value;
	    req.open('POST', '/subscribe', true);
	    req.setRequestHeader('Content-Type', 'application/json');
	    req.addEventListener('load',function(){
	      if(req.status >= 200 && req.status < 400){
	        var response = JSON.parse(req.responseText);
            console.log(response);
            var sign = document.createElement('dir');
            sign.className = "sign";
            sign.textContent = response[0].value + ", your form has been Successfully Submited!";
            document.getElementById('sign').appendChild(sign);
	      } else {
	        console.log("Error in network request: " + req.statusText);
	      }});
	    req.send(JSON.stringify(info));
        event.preventDefault();
	  });
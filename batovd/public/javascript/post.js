var req = new XMLHttpRequest();
	var info = {requestType: null};
	info.requestType = 'update';
	req.open('POST', '/', true);
	req.setRequestHeader('Content-Type', 'application/json');
	req.addEventListener('load',function(){
	  if(req.status >= 200 && req.status < 400){
		let text = JSON.parse(req.responseText);
		document.getElementById('table').innerHTML= "";
		for(i = 0; i < text.length; i++)
		{
			let row = document.createElement('tr');
			row.setAttribute("type", "hidden");
			row.id = text[i].id;

			var element = document.createElement('td');
			element.classList.add("block");
			element.textContent = text[i].name;
			row.appendChild(element);

			var element = document.createElement('td');
			element.classList.add("block");
			element.textContent = text[i].reps;
			row.appendChild(element);

			var element = document.createElement('td');
			element.classList.add("block");
			element.textContent = text[i].weight;
			row.appendChild(element);

			var element = document.createElement('td');
			element.classList.add("block");
			element.textContent = text[i].date;
			row.appendChild(element);

			var element = document.createElement('td');
			element.classList.add("block");
			element.textContent = text[i].unit;
			row.appendChild(element);

			var button = document.createElement('button');
				button.id = text[i].id;
				button.textContent = "Edit";
				button.addEventListener('click',Edit);
				row.appendChild(button);
	
			var button = document.createElement('button');
			button.id = text[i].id;
			button.addEventListener('click',Delete);
			button.textContent = "Delete";
			row.appendChild(button);

			document.getElementById('table').appendChild(row);
		}
	  } else {
		console.log("Error in network request: " + req.statusText);
	  }});
	req.send(JSON.stringify(info));

document.getElementById('submit').addEventListener('click', function(event){
	var req = new XMLHttpRequest();
	var info = {name:null,reps:null,weight:null,date:null,unit:null, requestType: null};
	info.name = document.getElementById('name').value;
	info.reps = document.getElementById('reps').value;
	info.weight = document.getElementById('weight').value;
	info.date = document.getElementById('date').value;
	info.unit = document.getElementById('unit').value;
	info.requestType = 'add';
	req.open('POST', '/', true);
	req.setRequestHeader('Content-Type', 'application/json');
	req.addEventListener('load',function(){
	  if(req.status >= 200 && req.status < 400){
		let text = JSON.parse(req.responseText);
		document.getElementById('table').innerHTML= "";
		for(i = 0; i < text.length; i++)
		{
			let row = document.createElement('tr');
			row.setAttribute("type", "hidden");
			row.id = text[i].id;

			var element = document.createElement('td');
			element.classList.add("block");
			element.textContent = text[i].name;
			row.appendChild(element);

			var element = document.createElement('td');
			element.classList.add("block");
			element.textContent = text[i].reps;
			row.appendChild(element);

			var element = document.createElement('td');
			element.classList.add("block");
			element.textContent = text[i].weight;
			row.appendChild(element);

			var element = document.createElement('td');
			element.classList.add("block");
			element.textContent = text[i].date;
			row.appendChild(element);

			var element = document.createElement('td');
			element.classList.add("block");
			element.textContent = text[i].unit;
			row.appendChild(element);

			var button = document.createElement('button');
				button.id = text[i].id;
				button.textContent = "Edit";
				button.addEventListener('click',Edit);
				row.appendChild(button);
	
			var button = document.createElement('button');
			button.id = text[i].id;
			button.addEventListener('click',Delete);
			button.textContent = "Delete";
			row.appendChild(button);

			document.getElementById('table').appendChild(row);
		}
	  } else {
		console.log("Error in network request: " + req.statusText);
	  }});
	req.send(JSON.stringify(info));
	event.preventDefault();
  });
  function Delete(e){
	var req = new XMLHttpRequest();
	var info = {id:null,requestType: null};
	var ele = e.target;
	info.id = ele.id;
	info.requestType = 'delete';
	req.open('POST', '/', true);
	req.setRequestHeader('Content-Type', 'application/json');
	req.addEventListener('load',function(){
		if(req.status >= 200 && req.status < 400){
			let text = JSON.parse(req.responseText);
			document.getElementById('table').innerHTML= "";
			for(i = 0; i < text.length; i++)
		{
			let row = document.createElement('tr');
			row.setAttribute("type", "hidden");
			row.id = text[i].id;

			var element = document.createElement('td');
			element.classList.add("block");
			element.textContent = text[i].name;
			row.appendChild(element);

			var element = document.createElement('td');
			element.classList.add("block");
			element.textContent = text[i].reps;
			row.appendChild(element);

			var element = document.createElement('td');
			element.classList.add("block");
			element.textContent = text[i].weight;
			row.appendChild(element);

			var element = document.createElement('td');
			element.classList.add("block");
			element.textContent = text[i].date;
			row.appendChild(element);

			var element = document.createElement('td');
			element.classList.add("block");
			element.textContent = text[i].unit;
			row.appendChild(element);

			var button = document.createElement('button');
				button.id = text[i].id;
				button.textContent = "Edit";
				button.addEventListener('click',Edit);
				row.appendChild(button);
	
			var button = document.createElement('button');
			button.id = text[i].id;
			button.addEventListener('click',Delete);
			button.textContent = "Delete";
			row.appendChild(button);

			document.getElementById('table').appendChild(row);
		}
		  } else {
			console.log("Error in network request: " + req.statusText);
		  }});
		req.send(JSON.stringify(info));
		event.preventDefault();
  }

  function Edit(e){
	var ele = e.target;
	var id = ele.id
	var EditWindow = document.createElement('div');
	EditWindow.classList.add("edit");
	var parent = document.getElementById(id);
	var elements  = parent.getElementsByClassName("block");
	var input = document.createElement('input');
	input.id = "ename";
	input.value = elements[0].textContent;
	EditWindow.appendChild(input);

	var input = document.createElement('input');
	input.id = "ereps";
	input.value = elements[1].textContent;
	EditWindow.appendChild(input);

	var input = document.createElement('input');
	input.id = "eweight";
	input.value = elements[2].textContent;
	EditWindow.appendChild(input);

	var input = document.createElement('input');
	input.id = "edate";
	input.value = elements[3].textContent;
	EditWindow.appendChild(input);

	var input = document.createElement('input');
	input.id = "eunit";
	input.value = elements[4].textContent;
	EditWindow.appendChild(input);

	var button = document.createElement('button');
	button.textContent = "Save";
	button.id = ele.id;
	button.addEventListener('click',PostEdit);
	EditWindow.appendChild(button);

	document.getElementById('table').appendChild(EditWindow);
  }
  function PostEdit(e)
  {
	var ele = e.target;
	var req = new XMLHttpRequest();
	var info = {name:null,reps:null,weight:null,date:null,unit:null, requestType: null,id :null};
	var id = ele.id;
	info.name = document.getElementById('ename').value;
	info.reps = document.getElementById('ereps').value;
	info.weight = document.getElementById('eweight').value;
	info.date = document.getElementById('edate').value;
	info.unit = document.getElementById('eunit').value;
	info.requestType = 'edit';
	info.id = id;

	req.open('POST', '/', true);
	req.setRequestHeader('Content-Type', 'application/json');
	req.addEventListener('load',function(){
		if(req.status >= 200 && req.status < 400){
			let text = JSON.parse(req.responseText);
			document.getElementById('table').innerHTML= "";
			for(i = 0; i < text.length; i++)
		{
			let row = document.createElement('tr');
			row.setAttribute("type", "hidden");
			row.id = text[i].id;

			var element = document.createElement('td');
			element.classList.add("block");
			element.textContent = text[i].name;
			row.appendChild(element);

			var element = document.createElement('td');
			element.classList.add("block");
			element.textContent = text[i].reps;
			row.appendChild(element);

			var element = document.createElement('td');
			element.classList.add("block");
			element.textContent = text[i].weight;
			row.appendChild(element);

			var element = document.createElement('td');
			element.classList.add("block");
			element.textContent = text[i].date;
			row.appendChild(element);

			var element = document.createElement('td');
			element.classList.add("block");
			element.textContent = text[i].unit;
			row.appendChild(element);

			var button = document.createElement('button');
				button.id = text[i].id;
				button.textContent = "Edit";
				button.addEventListener('click',Edit);
				row.appendChild(button);
	
			var button = document.createElement('button');
			button.id = text[i].id;
			button.addEventListener('click',Delete);
			button.textContent = "Delete";
			row.appendChild(button);

			document.getElementById('table').appendChild(row);
		}
		  } else {
			console.log("Error in network request: " + req.statusText);
		  }});
		req.send(JSON.stringify(info));
		event.preventDefault();
  }
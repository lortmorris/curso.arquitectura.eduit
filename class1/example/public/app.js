console.log("welcome to fligs search");

function search(){
	console.log("Buscando...");
	
	$.ajax({
		method:"POST",
		url:"/vuelos",
		data: {
			from: $("#from").val(),
			to: $("#to").val(),
			price: $("#price").val()
		},
		success: (status, data)=>{
			console.log(status, data);
		}
	});	
}

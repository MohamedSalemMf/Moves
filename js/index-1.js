//Search =======================================================================================
let searchInput = document.getElementById("search");
let wordInput = document.getElementById("word");
searchInput.addEventListener("keyup", function(){
	let searchArray = [];
	for(let i=0 ; i< allRecipes.length; i++)
	{
		if(allRecipes[i].original_title.toLowerCase().includes(searchInput.value.toLowerCase()))
			searchArray.push(allRecipes[i])
	}
	displayRecipes(searchArray)
});
wordInput.addEventListener("keyup", function(){
	let searchArray = [];
	for(let i=0 ; i< allRecipes.length; i++)
	{
		if(allRecipes[i].original_title.toLowerCase().includes(wordInput.value.toLowerCase()))
			searchArray.push(allRecipes[i])
	}
	displayRecipes(searchArray)
});
//Star nav Box =========================================================================================
$("#menu").click(function(){
	let menuMBoxWidth = $ ("#boxMenu").innerWidth();
	if($('#sideBar').css("left")=="0px")
	{
		$("#sideBar").animate({left:`-${menuMBoxWidth}`}, 1000);
		$(".nav-item").animate({opacity:"0",top:"300px"},1000);
		$(".fa-align-justify").toggleClass("fa-times");
	}
	else
	{
		$('#sideBar').animate({left:`0px`}, 1000);
		$(".nav-item").animate({opacity:"1",top:"0px"},1800);
		$(".fa-align-justify").toggleClass("fa-times");
	}
})
//End nav Box =========================================================================================
$("#loading").fadeOut(2000 , function(){
	$("body").css("overflow" , "auto")//يشتغل تانيscrollكده بعد م الموقع يتحمل هيرجع ال
});
//astar display html and js================================================================================
let latestApi="https://api.themoviedb.org/3/movie/now_playing?api_key=eba8b9a7199efdcb0ca1f96879b83c44";//1
let  now_playing= "https://api.themoviedb.org/3/movie/latest?api_key=eba8b9a7199efdcb0ca1f96879b83c44";

let popularApi = "https://api.themoviedb.org/3/movie/popular?api_key=eba8b9a7199efdcb0ca1f96879b83c44";
let topratedApi = "https://api.themoviedb.org/3/movie/top_rated?api_key=eba8b9a7199efdcb0ca1f96879b83c44";
let trendingApi = "https://api.themoviedb.org/3/trending/all/day?api_key=eba8b9a7199efdcb0ca1f96879b83c44";
let upcomingApi = "https://api.themoviedb.org/3/movie/upcoming?api_key=eba8b9a7199efdcb0ca1f96879b83c44";

let allRecipes=[];

let playing=document.getElementById("playing");
let popular=document.getElementById("popular");
let Rated=document.getElementById("Rated");
let Trending=document.getElementById("Trending");
let Upcoming=document.getElementById("Upcoming");

let xml =new XMLHttpRequest();
function Api(param){
	xml.open("GET",`${param}`);
	xml.send();
	xml.addEventListener("readystatechange",function(){
		if(xml.readyState==4&&xml.status==200){
			allRecipes=JSON.parse(xml.response).results;
			displayRecipes(allRecipes)
		}
	})
	
};
Api(latestApi);
playing.addEventListener("click",function(){
	Api(latestApi);
})
popular.addEventListener("click",function(){
	Api(popularApi);
})
Rated.addEventListener("click",function(){
	Api(topratedApi);
})

Trending.addEventListener("click",function(){
	Api(trendingApi);
})

Upcoming.addEventListener("click",function(){
	Api(upcomingApi);
})

function displayRecipes(x){
	let cartoona = ``;
	for(let i = 0;i < x.length; i++ ){
		cartoona +=`<div class="col-md-4 col-sm-12 my-3 shadow">
						<div class="movie shadow rounded position-relative">
							<div class="post">
								<img class="w-100" src="https://image.tmdb.org/t/p/w500${x[i].poster_path}">
		
								<div class="layer d-flex align-items-center p-2 shadow " id="results-aim">
									<div class=" ">
								   
										<h2>${x[i].title}</h2>
										<p>${x[i].overview}</p>
										<p>${x[i].vote_average}</p>
										<p>${x[i].original_title}</p>
										<p>${x[i].vote_count}</p>
										<button type="button" class="btn btn-success mx-1">Download</button>
										<button type="button" class="btn btn-warning">Live</button>
										
									</div>
								</div>
							</div>
						</div>
					</div>`;
	}
	document.getElementById('rowData').innerHTML = cartoona;
}
//End display html and js================================================================================
//start form =======================================================================
let namee = document.getElementById("name");
let emaill = document.getElementById("email");
let phonee = document.getElementById("phone");
let agee = document.getElementById("age");
let passwordd = document.getElementById("password");
let rePasswordd = document.getElementById("rePassword");

let namealert = document.getElementById("namealert");
let emailalert = document.getElementById("emailalert");
let phonealert = document.getElementById("phonealert");
let agealert = document.getElementById("agealert");
let passwordalert = document.getElementById("passwordalert");
let repasswordalert = document.getElementById("repasswordalert");

let submitBtn = document.getElementById("submitBtn");

var myStore;	
if(localStorage.getItem("productInStorage") == null)
{
	myStore = [];
}
else
{
	myStore = JSON.parse(localStorage.getItem("productInStorage"));
}

submitBtn.addEventListener("click", function(){
	if(validaname() == true)
	{	
		let onePrpush = 
		{
			name : namee.value,
			email : emaill.value,
			phone : phonee.value,
			age : agee.value,
			pPassword : passwordd.value,
			rePassword : rePasswordd.value,
		}
		myStore.push(onePrpush)
		localStorage.setItem("productInStorage" , JSON.stringify(myStore))
	}
})
function validaname()
{
	let regex = /^[a-zA-Z]+$/
	
	if(regex.test(namee.value)== true)
	{
		namee.classList.add("is-valid");
		namee.classList.remove("is-invalid");
		namealert.classList.replace("d-block","d-none");
		return true;
	}
	else
	{
		namealert.classList.replace("d-none","d-block")
		namee.classList.add("is-invalid");
		namee.classList.remove("is-valid");
		return false;
	}
}
namee.addEventListener("keyup",validaname);
function validaemaill()
{
	let regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
	
	if(regex.test(emaill.value)== true)
	{
		emaill.classList.add("is-valid");
		emaill.classList.remove("is-invalid");
		emailalert.classList.replace("d-block","d-none")
	}
	else
	{
		emailalert.classList.replace("d-none","d-block")
		emaill.classList.add("is-invalid");
		emaill.classList.remove("is-valid");
	}
}
emaill.addEventListener("keyup",validaemaill);
function vphonee()
{
	let regex = /^(\+2|002)?01[0125][0-9]{8}$/
	
	if(regex.test(phonee.value)== true)
	{
		phonee.classList.add("is-valid");
		phonee.classList.remove("is-invalid");
		phonealert.classList.replace("d-block","d-none")
	}
	else
	{
		phonealert.classList.replace("d-none","d-block")
		phonee.classList.add("is-invalid");
		phonee.classList.remove("is-valid");
	}
}
phonee.addEventListener("keyup",vphonee);
function vagee()
{
	let regex = /^([2-9][0-9]|100)$/
	
	if(regex.test(agee.value)== true)
	{
		agee.classList.add("is-valid");
		agee.classList.remove("is-invalid");
		agealert.classList.replace("d-block","d-none")
	}
	else
	{
		agealert.classList.replace("d-none","d-block")
		agee.classList.add("is-invalid");
		agee.classList.remove("is-valid");
	}
}
agee.addEventListener("keyup",vagee);
function vpasswordd()
{
	let regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{10,}$/
	
	if(regex.test(passwordd.value)== true)
	{
		passwordd.classList.add("is-valid");
		passwordd.classList.remove("is-invalid");
		passwordalert.classList.replace("d-block","d-none")
	}
	else
	{
		passwordalert.classList.replace("d-none","d-block")
		passwordd.classList.add("is-invalid");
		passwordd.classList.remove("is-valid");		
	}
}
passwordd.addEventListener("keyup",vpasswordd);
function vrePasswordd()
{
	if( passwordd.value==rePasswordd.value)
	{	
		rePasswordd.classList.add("is-valid");
		rePasswordd.classList.remove("is-invalid");
		repasswordalert.classList.replace("d-block","d-none")
	}
	else
	{		
		repasswordalert.classList.replace("d-none","d-block")
		rePasswordd.classList.add("is-invalid");
		rePasswordd.classList.remove("is-valid");
	}
}
rePasswordd.addEventListener("keyup",vrePasswordd);
//End form =======================================================================

const my_facebook = "https://www.facebook.com/ciqiguopimin";
const my_twitter = "https://twitter.com/suwangli";
function nagviate_facebook(){
	//window.alert("sdfsdfsd");
}
function nagviate_twitter(){
	window.location.herf = my_twitter;
}

function onready_detail(){
	var ga_dom = document.getElementsByClassName("detail-robot-share-share-facebook");
	if (ga_dom.length != 0)
		ga_dom[0].addEventListener("click", nagviate_facebook);
	ga_dom = document.getElementsByClassName("detail-robot-share-share-twitter");
	if (ga_dom.length != 0)
		ga_dom[0].addEventListener("click", nagviate_twitter);
}

function fun(){
	var arr = [1,2,3,4,0,5];
	x = squence_count(arr);
	y =1;
}
function squence_count(arr){
	var value = 0;
	brr = arr;
	for( i = 0; i != brr.length; i++){
		if ( brr.length == 1){
			return value;
		}
		next = brr.slice(1, brr.length);
		value += comp(brr[0], next);
		brr = next;
		i = 0;
	}
	return value;
}
function comp(x, next){
		var count = 0;
		for( i = 0; i != next.length; i++){
			if(x > next[i])
				count++;
		}
		return count;
	}
	
function is_odd_squence(arr){
	return true ? squence_count(arr)%2 == 0 : squence_count(arr) % 2 == 1;
}

function generate_right_squence(arr){
	if(is_odd_squence(arr)){
		tmp = arr[0];
		arr[0] = arr[1];
		arr[1] = tmp;
	}
}
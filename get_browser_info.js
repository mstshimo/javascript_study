var browser = "BROWSER INFOMATION \n";


for(var propname in navigator){
	browser += propname + "::" + navigator[propname] + "\n";
}


alert(browser);
   const input = document.getElementById("input");
   const btn = document.getElementById("button");
   const number = document.getElementById("numb");
   const des = document.getElementById("description");
   const message = document.getElementById("info");
   const section = document.getElementById("section");
   const mainPart = document.getElementById("main1");
   const locationName = document.getElementById("location");
   const goBack = document.getElementById("row");
   const image = document.getElementById("image");
   
   input.addEventListener("keyup",e=>{      
      if(e.key=="Enter" && input.value != ""){
         var cityurl = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=af93a50fc7728955ec3b07923ff7954e`;
         getWeather(cityurl);
      }
   });
   function errorStyle(){
      let select = message.style;
      select.textAlign="center";
      select.color = "#721c24";
      select.background = "#f8d7da";
      select.border = "1px solid #f5c6cb";
      select.padding = "10px";
      select.borderRadius = "7px";
      select.fontSize = "20px";
   }
   function loadingStyle() {
      let select = message.style;
      select.textAlign = "center";
      select.color = "#0c5460";
      select.background = "#d1ecd1";
      select.border = "1px solid #bee5eb";
      select.padding = "10px";
      select.fontSize = "20px";
      select.borderRadius = "7px";
   }
   function onError(error){
      errorStyle();
      message.innerText = error.message;
   }

   function getLocation(){
      if(navigator.geolocation){
         navigator.geolocation.getCurrentPosition(onSuccess,onError);
      }
   }
   function onSuccess(position) {
      loadingStyle();
      message.innerText = "Date is Loading...";
      const {latitude,longitude} = position.coords;
      var url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=af93a50fc7728955ec3b07923ff7954e`; 
      getWeather(url);
   }
   function getWeather(url) {
      fetch(url).then(data => data.json()).then(json => {
         if(json.cod=="404"){
            onError(json);
         }else{
            console.log(json);
            mainPart.style.visibility = "hidden";
            section.style.visibility = "visible";
            const cityName = json.name;
            const countryName = json.sys.country; 
            const {description, id} = json.weather[0];
            const {temp, feels_like, humidity} = json.main; 
            if(id == 800){
               image.src = "images/clear.svg";
           }else if(id >= 200 && id <= 232){
               image.src = "images/storm.svg";  
           }else if(id >= 600 && id <= 622){
               image.src = "images/snow.svg";
           }else if(id >= 701 && id <= 781){
               image.src = "images/haze.svg";
           }else if(id >= 801 && id <= 804){
               image.src = "images/cloud.svg";
           }else if((id >= 500 && id <= 531) || (id >= 300 && id <= 321)){
               image.src = "images/rain.svg";
           }
            des.innerHTML = description;
            number.innerHTML = Math.floor(temp/10);
            locationName.innerHTML = `${cityName} , ${countryName}`;  
         }
      }).catch(() =>{
         onError(json);
     });;  
   }
goBack.addEventListener("click",function(){
   mainPart.style.visibility = "visible";
   section.style.visibility = "hidden";
   message.innerHTML = "";
});


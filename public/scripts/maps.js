let maps = [];
$(() => {
  console.log('ready');
  function initMap(id, data) {
      //fetch pins so we can see them on page load
      //server side endpoint
      
      let map = new google.maps.Map(
        document.getElementById(id), {
          id,
          zoom: 14,
          center: { lat: 53.5461, lng: -113.4938 } //this should be pulled from database
      });
      $.ajax({
        type: "GET",
        url: `/maps/${data}/pins`,
        success: (res) => {
          res.forEach((pin)=> {
            new google.maps.Marker({
              position: { lat: pin.latitude, lng: pin.longitude },
              map: map,    
              title: pin.title
            })
          })
        }
      });
      map.addListener("click", function(e) {
        console.log(e.latLng.lat(), e.latLng.lng())
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();
        const title = "new coffee shop is here";
        new google.maps.Marker({    
          position: { lat, lng }, 
          map: map,    
          title  
        });
      $.ajax({
        type: "POST",
        url: `/maps/${data}/pins`,
        data: {
          title,
          lat, 
          lng
        },
        success: (res) => {
          console.log(res)
          }
        });
      });
      maps.push(map);

    // marker.addListener('click', function(){
    //   // infoWindow.open(map, marker);
    //   alert("pin is clicked!");
    // });
}

   
  $( ".maps" ).each( (index, value) => {
    console.log("walue.data() is here >>>> ", $(value).data().id);
    initMap(value.id, $(value).data().id);
  })
})

let maps = [];
$(() => {
  console.log('ready');
  function initMap(id) {
      let map = new google.maps.Map(
        document.getElementById(id), {
          id,
          zoom: 14,
          center: { lat: 52.1332, lng: -106.6700}
      });
      maps.push(map);
  }

    // addMarker({
    //   coords:{lat: 52.1247, lng: -106.6705},
    //   content: '<h1> HELLO WORLD</h1>'
    //   })

//  //add marker function
//   function addMarker(props){
//     let marker = new google.maps.Marker({
//       position: props.coords,
//       map: map
//     });
//     //check content so description doesn't duplicate
//     if(props.content) {
//       //description box over pin
//       let infoWindow = new google.maps.infoWindow({
//         content: props.content
//       });
//        marker.addListener('click', function(){
//         infoWindow.open(map, marker);
//       });
//     }
//   }
  $( ".maps" ).each( (index, value) => {
    console.log(value.id);
    initMap(value.id);
  })
})

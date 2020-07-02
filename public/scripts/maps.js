let maps = [];

const deletePin = function(event) {
  // console.log("THIS IS DELETE PIN RIGHT HERE");
}

$(() => {
  // console.log('ready');
  function initMap(id, data) {
    //fetch pins so we can see them on page load
    //server side endpoint
    // console.log("data",data);
    let map = new google.maps.Map(
      document.getElementById(id), {
      id,
      zoom: 14,
      center: { lat: 53.5461, lng: -113.4938 } //this should be pulled from database
    });
// console.log(data);
    $.ajax({
      type: "GET",
      url: `/maps/${data}/pins`,
      success: (res) => {
        res.forEach((pin) => {

        let marker = new google.maps.Marker({
            position: { lat: pin.latitude, lng: pin.longitude },
            map: map,
            draggable: true,
            animation: google.maps.Animation.DROP,
            title: pin.title,
            pinId: pin.id
          })
          marker.addListener("dblclick", function (e) {
            // console.log('\n\nit here!', e)
            $.ajax({
              type: "POST",
              url: `/maps/pins/${pin.id}/delete`,

              success: (res) => {
                marker.setMap(null)
              }

            });
          });

        })
      }
    });

    map.addListener("click", function (e) {
      // console.log(e.latLng.lat(), e.latLng.lng())
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      const title = "new coffee shop is here";

      //make ajax request here with vars above
      $.ajax({
          type: "POST",
          url: `/maps/${data}/pins`,
          data: {
              title,
              lat,
              lng
            },
            //getting pin ID with the success and set pinID
        success: (res) => {
          // console.log(res);
          let pinId = res.pinId
          const marker = new google.maps.Marker({
            position: { lat, lng },
            map: map,
            draggable: true,
            animation: google.maps.Animation.DROP,
            title,
            pinId
          });
          //making event listener to that maker,
          marker.addListener("dblclick", function (e) {
            // console.log('\n\nit here!', e)
            $.ajax({
              type: "POST",
              url: `/maps/pins/${pin.id}/delete`, //needs to be updated to relevant ID
              data: {
                title,
                lat,
                lng
              },
              success: (res) => {
                marker.setMap(null);
              }
            });
          });

        }
      })

    });
    maps.push(map);
  }

  $(".maps").each((index, value) => {
    // console.log(index);
    // console.log("walue.data() is here >>>> ", $(value).data().id);
    initMap(value.id, $(value).data().id);
  });
});

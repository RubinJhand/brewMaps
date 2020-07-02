let maps = [];


$(() => {
  $(document).on('click', '.pin-popup', function () {
    console.log("popup for thing", $(this).data("id")) //then we can go find the query, make form
    $.ajax({
      type: "GET",
      url: `/maps/${data}/pins`,
      success: (res) => {

      }
    })
  })
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

          marker.addListener("click", function (e) {
            const popUpBox = new google.maps.InfoWindow({
              content: `<div class='pin-popup' data-id='${pin.id}'>
              <form class='pin-form'>
              <input type="hidden" name="pinId" value='${pin.id}'/>
              <h2> ${pin.title}</h2>
              <input type="text" id="pin-text" name="shop-name" placeholder="Shop Name"></input>
              </form>
              </div>`
            })//add input field to capture text, change classes and html to make more interactive
            popUpBox.open(map, marker);
            setTimeout(function () {
              const form = $('.pin-form');
              console.log('form is here >>> ', form);
              form.submit(function (e) {
                e.preventDefault();
                const data = form.serialize()
                $.post('/maps/pins/edit', data, cb => {

                  location.reload()

                })

              })
            }, 500);
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
      const title = "Coffee shop name: ";

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

          let pinId = res.pin.id
          const marker = new google.maps.Marker({
            position: { lat, lng },
            map: map,
            draggable: true,
            animation: google.maps.Animation.DROP,
            title,
            pinId
          });
          location.reload()

          //making event listener to that marker,
          marker.addListener("dblclick", function (e) {
            // console.log('\n\nit here!', pinId)
            $.ajax({
              type: "POST",
              url: `/maps/pins/${pinId}/delete`,
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

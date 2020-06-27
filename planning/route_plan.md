### User Stories

- As a user, I want to see maps of coffee shops because I like caffeine.
- As a user, I want to see a particular map, so I can visit maps in a particular area
- As a user, I want to be able to see many points on the particular map so that I can visit many coffee shops if I want
- I want to be able to check off places that I’ve been
- As a user, I want to see the name, description and an image of the coffee shop (when you click on a pin)
- As a non-logged in user, I cannot checkoff, or save maps but can see maps
- I can register in order to see favourites, and to edit maps, etc
- As a user I can log in to see my profile/maps/edit/etc as above

- As a logged-in user, I can create maps of favourite coffee shops (add a pin) (map just shows local area, no shops yet, user created name, user adds shops as they want)
- As a logged-in user, I can modify maps (add, edit, remove)
- As a logged-in user, I can save favourite maps
- List favourite maps on profile page
- As a logged-in user, I have a profile with favourite maps and maps I’ve added/edited to (not owned by me)

### User Scenarios

- Not Logged In

  - On the home page, user inserts location to view map and renders map in location of choice. (maybe by gps coordinates) (depending on how api works?)
  - On home page lists top 10 maps across planet
  - Not-Logged-in user enters city and gets a list of the maps available
  - When user selects map with pins, I click on a pin to get the description, name, image of coffee shop ==> doesn’t render a new page, popup to see stuff. (google api does this for us?)
  - If a user tries to save map without login - redirects to login (or not have a save button if not logged in)
  - User can register/login (if user clicks register, acts same as dummy login here? If time can un-dummy it. When register, log in automatically).

- Logged In User

  - Logged in user taken to their home page(profile), where see favourite maps along with buttons to edit/delete next to each one
  - Logged in user on their homepage also has ‘create map’ form field where you insert city.
  - ‘Create map’ takes you to blank map of city, where you can add pin, add description (no pins, just roads and streets) ( api can add pins for us?)
  - Logged in user on their homepage can select existing map, and add/edit/remove pins
  - Logged in user on their homepage can rate their maps (favourite/like) (stretch to add count of number of people who’ve liked the map)
  - Logged in user on their homepage can see maps contributed to, favourite maps

### Routes

- Homepage

  - GET ('/')

    - this is the homepage (not logged in)
    - show list of most favourited maps (10)
    - if user clicks favourite or create:
      - REDIRECT - GET ('/login')

  - GET ('/location')
    - get maps of entered location
    - if user tries to favourite REDIRECT - GET ('/login')
    - when user selects map with pins, I click on a pin to get the description, name, image of coffee shop ==> doesn’t render a new page, popup to see stuff. (google api does this for us?)

- Login Page

  - GET ('/login')
  - POST () <-- NOT USING>

- Register Page
  - GET ('/register')
  - POST () <-- NOT USING - maybe show dummy registration page>'

<!-- Logged In (after this point) -->

- Logged In

  - GET ('/maps')

- Map / User Homepage

  - GET ('/:id/maps')

    - maps contributed to
    - maps created
    - Logged in user taken to their home page(profile), where see favourite maps along with buttons to edit/delete next to each one
    - Logged in user on their homepage also has ‘create map’ form field where you insert city.
      - GET ('/maps/:id/location')
    - Logged in user on their homepage can select existing map, and add/edit/remove pins
    - Logged in user on their homepage can rate their maps (favourite/like)
      - (stretch to add count of number of people who’ve liked the map)
    - Logged in user on their homepage can see maps contributed to, favourite maps

  - POST ('/maps/:map_id/edit')

    - use AJAX to not refresh
    - Logged in user on their homepage can select existing map and edit pins

  - POST ('/maps/:map_id/delete')

    - use AJAX to not refresh
    - Logged in user on their homepage can select existing map, and remove pins
    - if user does not own map: show warning? (do we need this?)
      - logout? redirect?

  - GET (/:id/maps/location')
    - when location entered
    - Create map’ takes you to blank map of city, where you can add pin, add description (no pins, just roads and streets) (api can add pins for us?)

- Browse other peoples maps

  - GET ('/maps')

    - can add map to favourites
    - browse by location (city)

  - POST ('/maps/map_id/pins')

    - if not logged in: REDIRECT GET ('/login')
      - res.direct
    - adds pin to map

  - POST ('/maps')
    - Logged in user on their homepage can rate others maps (favourite/like)

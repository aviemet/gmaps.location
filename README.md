# gmaps.location
A convenience wrapper for a Google maps location response with helper methods

# Usage
An example using with Google places autocomplete

```
var input = new Google.maps.places.Autocomplete(document.getElementById('google-location-search');
var thatPlace = new Location(input.getPlace());
```

Now you can use the get method on the Location object to retrieve the information

# Methods
`.get(String info)`
Retrieves formatted information. Supported types are:

`location`: Returns the original, raw JSON response

`address`: The `formatted_address`

`street_address`: Something like '123 Street Rd'

`coords`: An object with the coords: `{lat: 123.456, lng: 78.901}`

`name`: The name of the place

`phone`: The phone number, U.S. formatted

`phone_intl`: Phone number, international format

`website`: Website

`gplus`: G+ link

`icon`: Icon

`number`: Just the street number: '123',

`street`: Just the street name,

`city`: The city,

`county`: The county,

`state`: The state,

`country`: The country,

`zip`: The postal code

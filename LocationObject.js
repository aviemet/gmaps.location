/**
 * Object wrapper for raw Google location JSON response
 * Supports checking if info is valid,
 * updating the location info,
 * retrieving info in english
 * retrieving coords as simple array
 **/
function Location(location){
	if (!(this instanceof Location)) {
		throw new TypeError("Location constructor cannot be called as a function.");
	}
	this.setLocation(location);
}

// Verifies that the data passed is in fact a google locaton object
Location.isGoogleObject = function(location){
	return ((typeof location == "object") && ("address_components" in location) && ("formatted_address" in location) && ("geometry" in location) && ("location" in location.geometry));
};

// Only setter function. If data is set, it must be valid
Location.prototype.setLocation = function(location){
	if(Location.isGoogleObject(location)){
		this.data = location;
		return true;
	}
	return false;
};

Location.prototype.isset = function(){
	return (this.data !== null);
};

/**
 * Custom responses for the get method
 */
Location.prototype._types = {
	'number': 'street_number',
	'street': 'route',
	'city': 'locality',
	'county': 'administrative_area_level_2',
	'state': 'administrative_area_level_1',
	'country': 'country',
	'zip': 'postal_code'
};

Location.prototype.get = function(component, short){
	if(this.data !== null){
		// Filter address and location data
		switch(component){
			case 'location':
				return this.data;
			case 'address':
				return this.data.formatted_address;
			case 'street_address':
				return this.get('number') ? this.get('number') + ' ' + this.get('street') : this.get('street');
			case 'coords':
				return this._coords();
			case 'name':
				return this.data.name;
			case 'phone':
				return this.data.formatted_phone_number;
			case 'phone_intl':
				return this.data.international_phone_number;
			case 'website':
				return this.data.website;
			case 'gplus':
				return this.data.url;
			case 'icon':
				return this.data.icon;
			default:
			// each address component
			for(var comp in this.data.address_components){
				// each component type
				for(var type in this.data.address_components[comp]['types']){
					if(this._types[component] == this.data.address_components[comp]['types'][type]){
						return _.isEmpty(short) ? this.data.address_components[comp].long_name : this.data.address_components[comp].short_name;
					}
				}
			}
		} // End Switch
	}
	return false;
};

Location.prototype._coords = function(){
	var keys = Object.keys(this.data.geometry.location);
	return {'lat': this.data.geometry.location[keys[0]], 'lng': this.data.geometry.location[keys[1]] };
};
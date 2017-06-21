export const convertGoogleMapObjectToAddress = (place) => {
    let address = {
        street: 'N/A',
        ward: 'N/A',
        district: 'N/A',
        city: 'N/A',
        country: 'N/A'
    };

    for (let i = 0; i < place.address_components.length; i++) {
        let addressType = place.address_components[i].types[0] === 'political' ? place.address_components[i].types[1] : place.address_components[i].types[0];
        let value = place.address_components[i].long_name;
        switch (addressType) {
            case 'street_number':
                address.street = value;
                break;
            case 'route':
                address.street = (address.street || '') + ' ' + value;
                break;
            case 'sublocality':
                address.ward = value;
                break;
            case 'administrative_area_level_2':
                address.district = value;
                break;
            case 'administrative_area_level_1':
                address.city = value;
                break;
            case 'country':
                address.country = value;
                break;
        }
    }

    return address;
};
import * as Location from 'expo-location';

export async function getCurrentPlace() {
  const permission = await Location.requestForegroundPermissionsAsync();

  if (!permission.granted) {
    return null;
  }

  const position = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.Balanced,
  });

  const { latitude, longitude } = position.coords;

  const addresses = await Location.reverseGeocodeAsync({
    latitude,
    longitude,
  });

  if (addresses.length > 0) {
    const address = addresses[0];

    const parts = [
      address.street,
      address.streetNumber,
      address.district,
      address.city,
      address.region,
    ].filter(Boolean);

    return {
      label: parts.length > 0
        ? parts.join(', ')
        : `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`,
    };
  }

  return {
    label: `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`,
  };
}
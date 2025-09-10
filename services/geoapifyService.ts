import type { Wilaya, Category, GeoapifyFeature, Entity } from '../types';

const API_KEY = 'db85ceefce454cebace524ff9ffdbd32'; // User provided Geoapify API key
const BASE_URL = 'https://api.geoapify.com/v2/places';

function transformData(features: GeoapifyFeature[]): Entity[] {
    return features.map(feature => {
        const props = feature.properties;
        const raw = props.datasource.raw;
        return {
            id: props.place_id,
            name: props.name,
            address: props.address_line2,
            website: raw.website || raw['contact:website'],
            phone: raw.phone || raw['contact:phone'],
            facebook: raw['contact:facebook'],
            lat: props.lat,
            lon: props.lon
        };
    });
}


export const searchPlaces = async (wilaya: Wilaya, category: Category): Promise<Entity[]> => {
  const radius = 50000; // 50km radius, covering a large area of the wilaya center
  const filter = `circle:${wilaya.lon},${wilaya.lat},${radius}`;
  const categories = category.value;
  const limit = 50;

  const url = `${BASE_URL}?categories=${categories}&filter=${filter}&limit=${limit}&apiKey=${API_KEY}`;

  const response = await fetch(url);

  if (!response.ok) {
    let errorMessage = `Geoapify API error (${response.status}): ${response.statusText}.`;
    try {
        const errorData = await response.json();
        // Use the more specific message from the API if available
        errorMessage = `Geoapify API error: ${errorData.message || response.statusText}. Please check the API key and service status.`;
    } catch (e) {
        // Response was not JSON, stick with the original status text.
        console.error("Could not parse Geoapify error response as JSON.");
    }
    console.error("Full Geoapify API Error:", errorMessage);
    throw new Error(errorMessage);
  }

  const data = await response.json();
  return transformData(data.features || []);
};

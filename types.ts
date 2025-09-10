
export interface Wilaya {
  name: string;
  code: number;
  lat: number;
  lon: number;
}

export interface Category {
  name: string;
  value: string;
}

export interface GeoapifyFeature {
  type: string;
  properties: {
    name: string;
    address_line1: string;
    address_line2: string;
    categories: string[];
    datasource: {
      raw: {
        website?: string;
        phone?: string;
        'contact:website'?: string;
        'contact:phone'?: string;
        'contact:facebook'?: string;
      }
    }
    lat: number;
    lon: number;
    place_id: string;
  };
}

export interface Entity {
  id: string;
  name: string;
  address: string;
  website?: string;
  phone?: string;
  facebook?: string;
  lat: number;
  lon: number;
}

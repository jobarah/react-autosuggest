import { Suggestion } from '../types/types'
import axios from 'axios'

var requestOptions = {
  method: 'GET',
};

const baseUrl = 'https://api.geoapify.com/v1/geocode/autocomplete?'

export async function getSuggestions(filter: string): Promise<Array<Suggestion>> {
  const results = await axios.get(`${baseUrl}text=${filter}&apiKey=${process.env.REACT_APP_API_KEY}`, requestOptions)
  if (results.data?.features) {
    return results.data.features.map((suggestionItem: { properties: { country_code: string; formatted: string; }; }) => ({ abbr: suggestionItem.properties.country_code, name: suggestionItem.properties.formatted }))
  }


  return []
}

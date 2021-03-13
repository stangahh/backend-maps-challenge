import {
  Client,
  PlaceInputType
} from '@googlemaps/google-maps-services-js'
import { PlaceDetailsResponseData } from '@googlemaps/google-maps-services-js/dist/places/details'
import { FindPlaceFromTextResponseData } from '@googlemaps/google-maps-services-js/dist/places/findplacefromtext'

export class MapsAPIHelper {
  /** Google Maps Services Client */
  private readonly client
  /** Google Maps API Key */
  private readonly key

  constructor (apiKey: string) {
    if (apiKey === '') {
      throw new Error(`Invalid API Key: '${apiKey}'`)
    }

    this.key = apiKey

    this.client = new Client({})
  }

  /**
   * Uses the Google Maps lib to retrieve all Place suggestions for input `partial`
   * @param partial your search query
   */
  public async getPlaces (
    partial: string
  ): Promise<FindPlaceFromTextResponseData> {
    return await this.client
      .findPlaceFromText({
        params: {
          input: partial,
          inputtype: PlaceInputType.textQuery,
          key: this.key
        },
        timeout: 1000 // milliseconds
      })
      .then((r) => r.data)
  }

  /**
   * Uses the Google Maps lib to retrieve all Place Data for input `placeId`
   * @param placeId your Place ID to retrieve full Place Data for
   */
  public async getPlaceData (
    placeId: string
  ): Promise<PlaceDetailsResponseData> {
    return await this.client
      .placeDetails({
        params: {
          place_id: placeId,
          key: this.key
        },
        timeout: 1000 // milliseconds
      })
      .then((r) => r.data)
  }
}

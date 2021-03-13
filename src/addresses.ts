import {
  AddressComponent,
  Client,
  PlaceInputType
} from '@googlemaps/google-maps-services-js'
import { PlaceDetailsResponseData } from '@googlemaps/google-maps-services-js/dist/places/details'
import { FindPlaceFromTextResponseData } from '@googlemaps/google-maps-services-js/dist/places/findplacefromtext'

export interface Address {
  fullAddress: string | undefined
  address: AddressComponent[] | undefined
}

export class MapsAPIHelper {
  private readonly client
  private readonly key

  constructor (apiKey: string) {
    if (apiKey === '') {
      throw new Error(`Invalid API Key: '${apiKey}'`)
    }

    this.key = apiKey

    this.client = new Client({})
  }

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

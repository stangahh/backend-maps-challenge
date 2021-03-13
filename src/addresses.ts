import { AddressComponent } from '@googlemaps/google-maps-services-js'
import { PlaceDetailsResponseData } from '@googlemaps/google-maps-services-js/dist/places/details'
import { MapsAPIHelper } from './maps-api'

export interface Address {
  fullAddress: string | undefined
  address: AddressComponent[] | undefined
}

export class Addresses {
  private readonly mapsHelper

  constructor (apiKey: string) {
    if (apiKey === '') {
      throw new Error(`Invalid API Key: '${apiKey}'`)
    }
    this.mapsHelper = new MapsAPIHelper(apiKey)
  }

  /**
   * Transforms the Google Place API's response into a structure suitable for this applications use case.
   * @param data The full response data from `@googlemaps` `Client().placeDetails()`
   * @returns A simple `Address` object containing the full address and all its 'parts'
   */
  private cleanAddress (data: PlaceDetailsResponseData): Address {
    return {
      fullAddress: data.result.formatted_address,
      // TODO: Parse this data more thoroughly using the `AddressType` enum exported by `@googlemaps`
      // Pro: cleaner output data structure. Con: High maintenance
      address: data.result.address_components
    }
  }

  private getAllPlaceData (ids: string[]): Array<Promise<Address>> {
    return ids
      .filter((id) => id !== '')
      .map(
        async (id) =>
          await this.mapsHelper
            .getPlaceData(id)
            .then((place) => this.cleanAddress(place))
      )
  }

  public async all (partial: string): Promise<Address[]> {
    if (partial === '') {
      throw new Error('Please input a search query.')
    }
    /** All of the GMaps internal Place ID's of the results for @param `partial` */
    const allPlaceMatches = await this.mapsHelper.getPlaces(partial)

    // Map down to just each candidate's `place_id`.
    const allPlaceIds = allPlaceMatches.candidates.map(
      (place) => place.place_id ?? ''
    )

    // Create array of promises that we can resolve to the per field data for each place.
    const allPlaceData = this.getAllPlaceData(allPlaceIds)

    // parallel await completion of all promises and return results
    return await Promise.all(allPlaceData)
  }
}

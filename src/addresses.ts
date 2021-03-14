import { PlaceDetailsResponseData } from '@googlemaps/google-maps-services-js/dist/places/details'
import { FindPlaceFromTextResponseData } from '@googlemaps/google-maps-services-js/dist/places/findplacefromtext'
import { AddressParts, ParseAddressComponents } from './address-components'
import { MapsAPIHelper } from './maps-api'

/** Structure of a returned address from your search */
export interface Address {
  /** Full address */
  fullAddress: string | undefined
  /** Address parts */
  address: AddressParts
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
    const parser = new ParseAddressComponents()
    return {
      fullAddress: data.result.formatted_address,
      address: parser.formatAsAddress(data.result.address_components)
    }
  }

  /**
   * Given an array of Place ID's, constructs an array of promises and formats them as `Address`
   * @param ids Array of `place_id`s to retrieve place data for
   */
  private getAllPlaceData (ids: string[]): Array<Promise<Address>> {
    return ids.map(
      async (id) =>
        await this.mapsHelper
          .getPlaceData(id)
          .then((place) => this.cleanAddress(place))
    )
  }

  /**
   * Takes the data response from Maps helper and reduces all the responses into an array of just
   * `place_id`s. With this, we can retrieve all the extended place data from the API.
   * @param places The data structure from Google Places API to extract Place ID's for
   * @returns Array of place id's
   * Note: Places that do not have a place_id in `places` will be ignored.
   */
  private extractPlaceIds (places: FindPlaceFromTextResponseData): string[] {
    return places.candidates.reduce((newArr: string[], place) => {
      if (place?.place_id != null) {
        newArr.push(place.place_id)
      }
      return newArr
    }, [])
  }

  /**
   * Search the Google Maps Places API for a list of suggestions for matching places.
   * @param partial Your partial search string to retrieve suggestions for
   * @returns Array of addresses that may be a match
   */
  public async all (partial: string): Promise<Address[]> {
    if (partial === '') {
      return []
    }

    /** All of the GMaps internal Place ID's of the results for @param `partial` */
    const allPlaceMatches = await this.mapsHelper.getPlaces(partial)

    // Map down to just each candidate's `place_id`.
    const allPlaceIds = this.extractPlaceIds(allPlaceMatches)

    // Create array of promises that we can resolve to the per field data for each place.
    const allPlaceData = this.getAllPlaceData(allPlaceIds)

    // parallel await completion of all promises and return results
    return await Promise.all(allPlaceData)
  }
}

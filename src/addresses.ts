import { AddressComponent } from '@googlemaps/google-maps-services-js'
import { MapsAPIHelper } from './helper'

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
}

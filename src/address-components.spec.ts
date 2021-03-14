import { AddressComponent, AddressType } from '@googlemaps/google-maps-services-js'
import { ParseAddressComponents } from './address-components'

/** Completely valid */
const mock1: AddressComponent[] = [
  {
    long_name: 'Brisbane',
    short_name: 'Brisbane',
    types: [AddressType.colloquial_area, AddressType.locality, AddressType.political]
  },
  {
    long_name: 'Queensland',
    short_name: 'QLD',
    types: [AddressType.administrative_area_level_1, AddressType.political]
  },
  {
    long_name: 'Australia',
    short_name: 'AU',
    types: [AddressType.country, AddressType.political]
  }
]

/** No Types */
const mock2: AddressComponent[] = [
  {
    long_name: 'Brisbane',
    short_name: 'Brisbane',
    types: []
  },
  {
    long_name: 'Queensland',
    short_name: 'QLD',
    types: [AddressType.administrative_area_level_1, AddressType.political]
  },
  {
    long_name: 'Australia',
    short_name: 'AU',
    types: [AddressType.country, AddressType.political]
  }
]

/** Bad types */
const mock3: AddressComponent[] = [
  {
    long_name: 'Brisbane',
    short_name: 'Brisbane',
    types: [AddressType.colloquial_area, AddressType.locality, AddressType.political]
  },
  {
    long_name: 'Queensland',
    short_name: 'QLD',
    types: [AddressType.administrative_area_level_1, AddressType.political]
  },
  {
    long_name: 'Australia',
    short_name: 'AU',
    // point of difference here
    types: ['BADTYPE' as AddressType.country]
  }
]

describe('ParseAddressComponents', () => {
  let service: ParseAddressComponents

  beforeEach(() => {
    service = new ParseAddressComponents()
  })

  it('should create when valid key', () => {
    expect(service).toBeTruthy()
  })

  it('should return empty array when given undefined', () => {
    expect(service.formatAsAddress(undefined)).toEqual({})
  })

  it('should work', () => {
    expect(service.formatAsAddress(mock1)).toBeTruthy()
  })

  it('should error when no types given in an object', () => {
    expect(() => service.formatAsAddress(mock2)).toThrow(Error)
  })

  it('should error when an unknown type is provided', () => {
    // Typescript compiler should prevents this from happening, but could still happen if theres
    // some  awful casting happening in the source of `@googlemaps` i guess.
    expect(() => service.formatAsAddress(mock3)).toThrow(Error)
  })
})

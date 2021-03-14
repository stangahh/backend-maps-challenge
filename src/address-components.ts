import {
  AddressComponent,
  AddressType,
  GeocodingAddressComponentType
} from '@googlemaps/google-maps-services-js'

/** The possible address parts for any given search query */
export type AddressParts = {
  // collects all keys in enums and sets them as key in this type `AddressParts`.
  [key in keyof typeof AddressType | GeocodingAddressComponentType]?: string;
}

export class ParseAddressComponents {
  public formatAsAddress (
    components: AddressComponent[] | undefined
  ): AddressParts {
    // early return if there are no components
    if (components == null) {
      return {}
    }

    // extract known types and reduce to `AddressParts` object syntax
    return components.reduce((acc, comp) => {
      // find the recognised type
      const type = comp.types.find((type) => {
        /** Whether the type exists in the `AddressType` enum */
        const isAddressType = Object.values(AddressType).includes(
          type as AddressType
        )
        /** Whether the type exists in the `GeocodingAddressComponentType` enum */
        const isGeoAddressType = Object.values(
          GeocodingAddressComponentType
        ).includes(type as GeocodingAddressComponentType)
        return isAddressType || isGeoAddressType
      })

      // Don't process types that are unknown, just return
      if (type == null) {
        return {
          ...acc
        }
      }

      // accumulate into key value pairs of AddressType to its long name
      return {
        ...acc,
        [`${type}`]: comp.long_name
      }
    }, {})
  }
}

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

      // early return for if theres no type. This should never happen, but its here to be type safe
      if (type == null) {
        throw new Error(
          `Internal Error when parsing types on: '${comp.types.toString()}'. Address type does not exist in known set of types`
        )
      }

      // accumulate into key value pairs of AddressType to its long name
      return {
        ...acc,
        [`${type}`]: comp.long_name
      }
    }, {})
  }
}

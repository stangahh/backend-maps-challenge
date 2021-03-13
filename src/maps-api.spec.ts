import { MapsAPIHelper } from './maps-api'

const validKey = process.env.MAPS_API_KEY ?? 'SOME_VALID_KEY'

describe('MapsAPIHelper', () => {
  let mapsApiHelper: MapsAPIHelper

  beforeEach(() => {
    mapsApiHelper = new MapsAPIHelper(validKey)
  })

  it('should create when valid key', () => {
    expect(mapsApiHelper).toBeTruthy()
  })

  it('should not create when empty key', () => {
    expect(() => new MapsAPIHelper('')).toThrowError()
  })

  // Can't really test whether a key is actually capable of calling the API until we try calling it
  // We'll handle that via the integration tests.
})

// Integration tests
describe('MapsAPIHelper get places and place data', () => {
  let mapsApiHelper: MapsAPIHelper

  beforeEach(() => {
    mapsApiHelper = new MapsAPIHelper(validKey)
  })

  it('should get places', async () => {
    const places = await mapsApiHelper.getPlaces('Brisbane')
    expect(places).toBeTruthy()
  })

  it('should not get places when empty string provided', async () => {
    await expect(mapsApiHelper.getPlaces('')).rejects.toThrowError()
  })

  it('should get place data from a place id', async () => {
    const places = await mapsApiHelper.getPlaces('Brisbane')
    const placeId = places.candidates[0].place_id ?? 'ChIJM9KTrJpXkWsRQK_e81qjAgQ'
    const placeData = await mapsApiHelper.getPlaceData(placeId)
    expect(placeData).toBeTruthy()
  })
})

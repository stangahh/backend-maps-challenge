import { Addresses } from './addresses'

const validKey = process.env.MAPS_API_KEY ?? 'SOME_VALID_KEY'

describe('Addresses', () => {
  let addresses: Addresses

  beforeEach(() => {
    addresses = new Addresses(validKey)
  })

  it('should create when valid key', () => {
    expect(addresses).toBeTruthy()
  })

  it('should not create when empty key', () => {
    expect(() => new Addresses('')).toThrowError()
  })
})

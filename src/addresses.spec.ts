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

// Integration tests
describe('Addresses `all`', () => {
  let addresses: Addresses

  beforeEach(() => {
    addresses = new Addresses(validKey)
  })

  it('should fetch all', async () => {
    await expect(addresses.all('Brisbane')).toBeTruthy()
  })

  it('should fail if input is empty', async () => {
    await expect(addresses.all('')).rejects.toThrowError()
  })
})

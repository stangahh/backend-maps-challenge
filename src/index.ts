// Public API Surface
export { Address } from './addresses'
export { Addresses as GetAddresses } from './addresses'

// TODO: Remove below *
/* eslint-disable import/first */
import dotenv from 'dotenv'
dotenv.config() // TODO: Remove
import { Addresses } from './addresses' // TODO: Remove
const getAddresses = new Addresses(process.env.MAPS_API_KEY ?? '')

/* eslint-disable no-void */

// Valid Address
void getAddresses.all('Brisbane').then(async (d) => {
  if (d != null) {
    const stringify = JSON.stringify(d)
    console.log('Valid Address', stringify.toString())
  }
}).catch(e => {
  console.log('Valid Address error', e)
})

// Address that doesnt exist
void getAddresses.all('justsomethingsuperarbitrary').then(async (d) => {
  if (d != null) {
    const stringify = JSON.stringify(d)
    console.log('Address that doesnt exist', stringify.toString())
  }
}).catch(e => {
  console.log('Address that doesnt exist error', e)
})

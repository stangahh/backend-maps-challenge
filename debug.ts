/**
 * TODO: `Addresses` below shouldnt be imported from a relative path like this.
 *
 * There are a few options for what should be done instead.
 *   1. `tsconfig.json/paths` and (tsconfig-paths)[https://www.npmjs.com/package/tsconfig-paths] for module resolution
 *   2. Build system + `npm link` to symlink node_modules to the dist folder
 *   3. `npm package` and `npm install` to install the .tar module code into node_modules.
 */
import { Addresses } from './src/index'

import dotenv from 'dotenv'
dotenv.config()

const getAddresses = new Addresses(process.env.MAPS_API_KEY ?? '')

const SEARCH_CRITERIA = '123'

/* eslint-disable no-void */

// Valid Address
void getAddresses
  .all(SEARCH_CRITERIA)
  .then(async (d) => {
    console.log('Valid Address', JSON.stringify(d))
  })
  .catch((e) => {
    console.log('Valid Address error:', e)
  })

// Address that doesnt exist
void getAddresses
  .all('justsomethingsuperarbitrary')
  .then(async (d) => {
    console.log('Address that doesnt exist', JSON.stringify(d))
  })
  .catch((e) => {
    console.log('Address that doesnt exist error:', e)
  })

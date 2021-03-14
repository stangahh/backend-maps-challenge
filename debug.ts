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

const SEARCHES = ['', 'ADDRESS_WITH_NO_RESULTS', 'amel', 'Brisbane', 'Sakuranbohigashine']

/* eslint-disable no-void */

// Valid Address
SEARCHES.forEach((search) => {
  void getAddresses.all(search).then((result) => {
    console.log(`Your search: '${search}'`)
    console.log('Result:\n', result, '\n')
  })
})

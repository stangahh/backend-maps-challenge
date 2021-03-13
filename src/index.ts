import { MapsAPIHelper } from './addresses' // TODO: Remove
import dotenv from 'dotenv' // TODO: Remove
export { MapsAPIHelper } from './addresses'
dotenv.config() // TODO: Remove

// TODO: Remove below
const helper = new MapsAPIHelper(process.env.MAPS_API_KEY ?? '')

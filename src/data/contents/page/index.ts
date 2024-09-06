/* eslint-disable import/order */
import landWeather from './fields/landweather.json'
import population from './fields/population.json'
import laborwage from './fields/laborwage.json'
import agriculture from './fields/agriculture.json'
import miningindustry from './fields/miningindustry.json'
import commercial from './fields/commercial.json'
import economy from './fields/economy.json'
import construction from './fields/construction.json'
import energy from './fields/energy.json'
import tourism from './fields/tourism.json'
import educationsports from './fields/educationsports.json'
import administrativefinancial from './fields/administrativefinancial.json'
import safetyenvironment from './fields/safetyenvironment.json'
import socialsecurity from './fields/socialsecurity.json'
import international from './fields/international.json'
import infrastructure from './fields/infrastructure.json'

const pageItems = [
  ...landWeather,
  ...population,
  ...laborwage,
  ...agriculture,
  ...miningindustry,
  ...commercial,
  ...economy,
  ...construction,
  ...energy,
  ...tourism,
  ...educationsports,
  ...administrativefinancial,
  ...safetyenvironment,
  ...socialsecurity,
  ...international,
  ...infrastructure,
]

export default pageItems

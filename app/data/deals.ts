import { matchSorter } from 'match-sorter'
// @ts-expect-error - no types, but it's a tiny function
import sortBy from 'sort-by'
import invariant from 'tiny-invariant'

type DealMutation = {
  title?: string
  price?: string
  restaurant?: string
}

export type DealRecord = DealMutation & {
  id: string
  createdAt: string
}

const MockDealsDB = {
  records: {} as Record<string, DealRecord>,

  getAll: async (): Promise<DealRecord[]> =>
    Object.keys(MockDealsDB.records)
      .map(key => MockDealsDB.records[key])
      .sort(sortBy('-createdAt', 'last')),

  get: async (id: string): Promise<DealRecord | null> =>
    MockDealsDB.records[id] || null,

  async create(values: DealMutation): Promise<DealRecord> {
    const id = Math.random().toString(36).substring(2, 9)
    const createdAt = new Date().toISOString()
    const newDeal = { id, createdAt, ...{ currency: 'nzh' }, ...values }
    MockDealsDB.records[id] = newDeal
    return newDeal
  },

  async set(id: string, values: DealMutation): Promise<DealRecord> {
    const deal = await MockDealsDB.get(id)
    invariant(deal, `No contact found for ${id}`)
    const updatedDeal = { ...deal, ...values }
    MockDealsDB.records[id] = updatedDeal
    return updatedDeal
  },

  destroy(id: string): null {
    delete MockDealsDB.records[id]
    return null
  }
}

export async function getDeals(query?: string | null) {
  await new Promise(resolve => setTimeout(resolve, 500))

  let deals = await MockDealsDB.getAll()

  if (query) {
    deals = matchSorter(deals, query, {
      keys: ['first', 'last']
    })
  }
  return deals.sort(sortBy('last', 'createdAt'))
}

export async function createEmptyDeal() {
  return await MockDealsDB.create({})
}

export async function getDeal(id: string) {
  return MockDealsDB.get(id)
}

export async function updateDeal(id: string, updates: DealMutation) {
  const deal = await MockDealsDB.get(id)
  if (!deal) {
    throw new Error(`No contact found for ${id}`)
  }
  await MockDealsDB.set(id, { ...deal, ...updates })
  return deal
}

export async function deleteDeal(id: string) {
  MockDealsDB.destroy(id)
}

const seeds = [
  {
    id: 'TASK-8782',
    title:
      "You can't compress the program without quantifying the open-source SSD pixel!",
    likes: '40',
    restaurant: 'Asian Fusion',
    price: '19.99'
  },
  {
    id: 'TASK-7878',
    title:
      'Try to calculate the EXE feed, maybe it will index the multi-byte pixel!',
    likes: '300',
    restaurant: 'Asian Fusion',
    price: '19.99'
  },
  {
    id: 'TASK-7839',
    title: 'We need to bypass the neural TCP card!',
    likes: '700',
    restaurant: 'Asian Fusion',
    price: '19.99'
  },
  {
    id: 'TASK-5562',
    title:
      'The SAS interface is down, bypass the open-source pixel so we can back up the PNG bandwidth!',
    likes: '300',
    restaurant: 'Asian Fusion',
    price: '19.99'
  },
  {
    id: 'TASK-8686',
    title:
      "I'll parse the wireless SSL protocol, that should driver the API panel!",
    likes: '600',
    restaurant: 'Asian Fusion',
    price: '19.99'
  },
  {
    id: 'TASK-1280',
    title:
      'Use the digital TLS panel, then you can transmit the haptic system!',
    likes: '12',
    restaurant: 'Asian Fusion',
    price: '19.99'
  },
  {
    id: 'TASK-7262',
    title:
      'The UTF8 application is down, parse the neural bandwidth so we can back up the PNG firewall!',
    likes: '12',
    restaurant: 'Asian Fusion',
    price: '19.99'
  },
  {
    id: 'TASK-1138',
    title:
      "Generating the driver won't do anything, we need to quantify the 1080p SMTP bandwidth!",
    likes: '40',
    restaurant: 'Asian Fusion',
    price: '19.99'
  },
  {
    id: 'TASK-7184',
    title: 'We need to program the back-end THX pixel!',
    likes: '700',
    restaurant: 'Asian Fusion',
    price: '19.99'
  },
  {
    id: 'TASK-5160',
    title:
      "Calculating the bus won't do anything, we need to navigate the back-end JSON protocol!",
    likes: '40',
    restaurant: 'Asian Fusion',
    price: '19.99'
  },
  {
    id: 'TASK-5618',
    title:
      "Generating the driver won't do anything, we need to index the online SSL application!",
    likes: '12',
    restaurant: 'Asian Fusion',
    price: '19.99'
  },
  {
    id: 'TASK-6699',
    title:
      "I'll transmit the wireless JBOD capacitor, that should hard drive the SSD feed!",
    likes: '300',
    restaurant: 'Asian Fusion',
    price: '19.99'
  },
  {
    id: 'TASK-2858',
    title: 'We need to override the online UDP bus!',
    likes: '300',
    restaurant: 'Asian Fusion',
    price: '19.99'
  },
  {
    id: 'TASK-9864',
    title:
      "I'll reboot the 1080p FTP panel, that should matrix the HEX hard drive!",
    likes: '12',
    restaurant: 'Asian Fusion',
    price: '19.99'
  },
  {
    id: 'TASK-8404',
    title: 'We need to generate the virtual HEX alarm!',
    likes: '40',
    restaurant: 'Asian Fusion',
    price: '19.99'
  },
  {
    id: 'TASK-5365',
    title:
      "Backing up the pixel won't do anything, we need to transmit the primary IB array!",
    likes: '40',
    restaurant: 'Asian Fusion',
    price: '19.99'
  },
  {
    id: 'TASK-1780',
    title:
      'The CSS feed is down, index the bluetooth transmitter so we can compress the CLI protocol!',
    likes: '700',
    restaurant: 'Asian Fusion',
    price: '19.99'
  },
  {
    id: 'TASK-6938',
    title:
      'Use the redundant SCSI application, then you can hack the optical alarm!',
    likes: '700',
    restaurant: 'Asian Fusion',
    price: '19.99'
  },
  {
    id: 'TASK-9885',
    title: 'We need to compress the auxiliary VGA driver!',
    likes: '300',
    restaurant: 'Asian Fusion',
    price: '19.99'
  },
  {
    id: 'TASK-3216',
    title:
      "Transmitting the transmitter won't do anything, we need to compress the virtual HDD sensor!",
    likes: '300',
    restaurant: 'Asian Fusion',
    price: '19.99'
  },
  {
    id: 'TASK-9285',
    title:
      'The IP monitor is down, copy the haptic alarm so we can generate the HTTP transmitter!',
    likes: '700',
    restaurant: 'Asian Fusion',
    price: '19.99'
  },
  {
    id: 'TASK-1024',
    title:
      "Overriding the microchip won't do anything, we need to transmit the digital OCR transmitter!",
    likes: '40',
    restaurant: 'Asian Fusion',
    price: '19.99'
  },
  {
    id: 'TASK-7068',
    title:
      "You can't generate the capacitor without indexing the wireless HEX pixel!",
    likes: '600',
    restaurant: 'Asian Fusion',
    price: '19.99'
  },
  {
    id: 'TASK-6502',
    title:
      "Navigating the microchip won't do anything, we need to bypass the back-end SQL bus!",
    likes: '700',
    restaurant: 'Asian Fusion',
    price: '19.99'
  },
  {
    id: 'TASK-5326',
    title: 'We need to hack the redundant UTF8 transmitter!',
    likes: '700',
    restaurant: 'Asian Fusion',
    price: '19.99'
  },
  {
    id: 'TASK-6274',
    title:
      'Use the virtual PCI circuit, then you can parse the bluetooth alarm!',
    likes: '600',
    restaurant: 'Asian Fusion',
    price: '19.99'
  },
  {
    id: 'TASK-1571',
    title:
      "I'll input the neural DRAM circuit, that should protocol the SMTP interface!",
    likes: '40',
    restaurant: 'Asian Fusion',
    price: '19.99'
  },
  {
    id: 'TASK-9518',
    title:
      "Compressing the interface won't do anything, we need to compress the online SDD matrix!",
    likes: '600',
    restaurant: 'Asian Fusion',
    price: '19.99'
  },
  {
    id: 'TASK-5581',
    title:
      "I'll synthesize the digital COM pixel, that should transmitter the UTF8 protocol!",
    likes: '300',
    restaurant: 'Asian Fusion',
    price: '19.99'
  },
  {
    id: 'TASK-2197',
    title:
      "Parsing the feed won't do anything, we need to copy the bluetooth DRAM bus!",
    likes: '700',
    restaurant: 'Asian Fusion',
    price: '19.99'
  },
  {
    id: 'TASK-8484',
    title: 'We need to parse the solid state UDP firewall!',
    likes: '40',
    restaurant: 'Asian Fusion',
    price: '19.99'
  },
  {
    id: 'TASK-9892',
    title:
      'If we back up the application, we can get to the UDP application through the multi-byte THX capacitor!',
    likes: '12',
    restaurant: 'Asian Fusion',
    price: '19.99'
  },
  {
    id: 'TASK-9616',
    title: 'We need to synthesize the cross-platform ASCII pixel!',
    likes: '40',
    restaurant: 'Asian Fusion',
    price: '19.99'
  },
  {
    id: 'TASK-9744',
    title:
      'Use the back-end IP card, then you can input the solid state hard drive!',
    likes: '12',
    restaurant: 'Asian Fusion',
    price: '19.99'
  },
  {
    id: 'TASK-1376',
    title:
      "Generating the alarm won't do anything, we need to generate the mobile IP capacitor!",
    likes: '300',
    restaurant: 'Asian Fusion',
    price: '19.99'
  },
  {
    id: 'TASK-7382',
    title:
      'If we back up the firewall, we can get to the RAM alarm through the primary UTF8 pixel!',
    likes: '700',
    restaurant: 'Asian Fusion',
    price: '19.99'
  },
  {
    id: 'TASK-2290',
    title:
      "I'll compress the virtual JSON panel, that should application the UTF8 bus!",
    likes: '600',
    restaurant: 'Asian Fusion',
    price: '19.99'
  },
  {
    id: 'TASK-1533',
    title:
      "You can't input the firewall without overriding the wireless TCP firewall!",
    likes: '12',
    restaurant: 'Asian Fusion',
    price: '19.99'
  },
  {
    id: 'TASK-4920',
    title:
      "Bypassing the hard drive won't do anything, we need to input the bluetooth JSON program!",
    likes: '40',
    restaurant: 'Asian Fusion',
    price: '19.99'
  },
  {
    id: 'TASK-5168',
    title:
      'If we synthesize the bus, we can get to the IP panel through the virtual TLS array!',
    likes: '40',
    restaurant: 'Asian Fusion',
    price: '19.99'
  },
  {
    id: 'TASK-7103',
    title: 'We need to parse the multi-byte EXE bandwidth!',
    likes: '600',
    restaurant: 'Asian Fusion',
    price: '19.99'
  },
  {
    id: 'TASK-4314',
    title:
      'If we compress the program, we can get to the XML alarm through the multi-byte COM matrix!',
    likes: '40',
    restaurant: 'Asian Fusion',
    price: '19.99'
  },
  {
    id: 'TASK-3415',
    title:
      'Use the cross-platform XML application, then you can quantify the solid state feed!',
    likes: '700',
    restaurant: 'Asian Fusion',
    price: '19.99'
  },
  {
    id: 'TASK-8339',
    title:
      'Try to calculate the DNS interface, maybe it will input the bluetooth capacitor!',
    likes: '40',
    restaurant: 'Asian Fusion',
    price: '19.99'
  },
  {
    id: 'TASK-6995',
    title:
      'Try to hack the XSS bandwidth, maybe it will override the bluetooth matrix!',
    likes: '700',
    restaurant: 'Asian Fusion',
    price: '19.99'
  },
  {
    id: 'TASK-8053',
    title:
      'If we connect the program, we can get to the UTF8 matrix through the digital UDP protocol!',
    likes: '700',
    restaurant: 'Asian Fusion',
    price: '19.99'
  },
  {
    id: 'TASK-4336',
    title:
      'If we synthesize the microchip, we can get to the SAS sensor through the optical UDP program!',
    likes: '700',
    restaurant: 'Asian Fusion',
    price: '19.99'
  },
  {
    id: 'TASK-8790',
    title:
      "I'll back up the optical COM alarm, that should alarm the RSS capacitor!",
    likes: '12',
    restaurant: 'Asian Fusion',
    price: '19.99'
  },
  {
    id: 'TASK-8980',
    title:
      'Try to navigate the SQL transmitter, maybe it will back up the virtual firewall!',
    likes: '600',
    restaurant: 'Asian Fusion',
    price: '19.99'
  },
  {
    id: 'TASK-7342',
    title: 'Use the neural CLI card, then you can parse the online port!',
    likes: '300',
    restaurant: 'Asian Fusion',
    price: '19.99'
  },
  {
    id: 'TASK-5608',
    title:
      "I'll hack the haptic SSL program, that should bus the UDP transmitter!",
    likes: '600',
    restaurant: 'Asian Fusion',
    price: '19.99'
  },
  {
    id: 'TASK-1606',
    title:
      "I'll generate the bluetooth PNG firewall, that should pixel the SSL driver!",
    likes: '12',
    restaurant: 'Asian Fusion',
    price: '19.99'
  },
  {
    id: 'TASK-7872',
    title:
      "Transmitting the circuit won't do anything, we need to reboot the 1080p RSS monitor!",
    likes: '600',
    restaurant: 'Asian Fusion',
    price: '19.99'
  },
  {
    id: 'TASK-4167',
    title:
      'Use the cross-platform SMS circuit, then you can synthesize the optical feed!',
    likes: '600',
    restaurant: 'Asian Fusion',
    price: '19.99'
  },
  {
    id: 'TASK-9581',
    title:
      "You can't index the port without hacking the cross-platform XSS monitor!",
    likes: '300',
    restaurant: 'Asian Fusion',
    price: '19.99'
  },
  {
    id: 'TASK-8806',
    title: 'We need to bypass the back-end SSL panel!',
    likes: '12',
    restaurant: 'Asian Fusion',
    price: '19.99'
  },
  {
    id: 'TASK-6542',
    title:
      'Try to quantify the RSS firewall, maybe it will quantify the open-source system!',
    likes: '12',
    restaurant: 'Asian Fusion',
    price: '19.99'
  },
  {
    id: 'TASK-6806',
    title:
      'The VGA protocol is down, reboot the back-end matrix so we can parse the CSS panel!',
    likes: '600',
    restaurant: 'Asian Fusion',
    price: '19.99'
  },
  {
    id: 'TASK-9549',
    title: "You can't bypass the bus without connecting the neural JBOD bus!",
    likes: '700',
    restaurant: 'Asian Fusion',
    price: '19.99'
  },
  {
    id: 'TASK-1075',
    title:
      "Backing up the driver won't do anything, we need to parse the redundant RAM pixel!",
    likes: '12',
    restaurant: 'Asian Fusion',
    price: '19.99'
  },
  {
    id: 'TASK-1427',
    title:
      'Use the auxiliary PCI circuit, then you can calculate the cross-platform interface!',
    likes: '12',
    restaurant: 'Asian Fusion',
    price: '19.99'
  },
  {
    id: 'TASK-1907',
    title:
      "Hacking the circuit won't do anything, we need to back up the online DRAM system!",
    likes: '700',
    restaurant: 'Asian Fusion',
    price: '19.99'
  },
  {
    id: 'TASK-4309',
    title:
      'If we generate the system, we can get to the TCP sensor through the optical GB pixel!',
    likes: '300',
    restaurant: 'Asian Fusion',
    price: '19.99'
  },
  {
    id: 'TASK-3973',
    title:
      "I'll parse the back-end ADP array, that should bandwidth the RSS bandwidth!",
    likes: '700',
    restaurant: 'Asian Fusion',
    price: '19.99'
  },
  {
    id: 'TASK-7962',
    title:
      'Use the wireless RAM program, then you can hack the cross-platform feed!',
    likes: '600',
    restaurant: 'Asian Fusion',
    price: '19.99'
  },
  {
    id: 'TASK-3360',
    title:
      "You can't quantify the program without synthesizing the neural OCR interface!",
    likes: '12',
    restaurant: 'Asian Fusion',
    price: '19.99'
  },
  {
    id: 'TASK-9887',
    title:
      'Use the auxiliary ASCII sensor, then you can connect the solid state port!',
    likes: '300',
    restaurant: 'Asian Fusion',
    price: '19.99'
  },
  {
    id: 'TASK-3649',
    title:
      "I'll input the virtual USB system, that should circuit the DNS monitor!",
    likes: '40',
    restaurant: 'Asian Fusion',
    price: '19.99'
  },
  {
    id: 'TASK-3586',
    title:
      'If we quantify the circuit, we can get to the CLI feed through the mobile SMS hard drive!',
    likes: '40',
    restaurant: 'Asian Fusion',
    price: '19.99'
  },
  {
    id: 'TASK-5150',
    title:
      "I'll hack the wireless XSS port, that should transmitter the IP interface!",
    likes: '600',
    restaurant: 'Asian Fusion',
    price: '19.99'
  },
  {
    id: 'TASK-3652',
    title:
      'The SQL interface is down, override the optical bus so we can program the ASCII interface!',
    likes: '300',
    restaurant: 'Asian Fusion',
    price: '19.99'
  },
  {
    id: 'TASK-6884',
    title:
      'Use the digital PCI circuit, then you can synthesize the multi-byte microchip!',
    likes: '600',
    restaurant: 'Asian Fusion',
    price: '19.99'
  },
  {
    id: 'TASK-1591',
    title: 'We need to connect the mobile XSS driver!',
    likes: '40',
    restaurant: 'Asian Fusion',
    price: '19.99'
  },
  {
    id: 'TASK-3802',
    title:
      'Try to override the ASCII protocol, maybe it will parse the virtual matrix!',
    likes: '40',
    restaurant: 'Asian Fusion',
    price: '19.99'
  },
  {
    id: 'TASK-7253',
    title:
      "Programming the capacitor won't do anything, we need to bypass the neural IB hard drive!",
    likes: '300',
    restaurant: 'Asian Fusion',
    price: '19.99'
  },
  {
    id: 'TASK-9739',
    title: 'We need to hack the multi-byte HDD bus!',
    likes: '12',
    restaurant: 'Asian Fusion',
    price: '19.99'
  },
  {
    id: 'TASK-4424',
    title:
      'Try to hack the HEX alarm, maybe it will connect the optical pixel!',
    likes: '40',
    restaurant: 'Asian Fusion',
    price: '19.99'
  },
  {
    id: 'TASK-3922',
    title:
      "You can't back up the capacitor without generating the wireless PCI program!",
    likes: '300',
    restaurant: 'Asian Fusion',
    price: '19.99'
  },
  {
    id: 'TASK-4921',
    title:
      "I'll index the open-source IP feed, that should system the GB application!",
    likes: '600',
    restaurant: 'Asian Fusion',
    price: '19.99'
  },
  {
    id: 'TASK-5814',
    title: 'We need to calculate the 1080p AGP feed!',
    likes: '300',
    restaurant: 'Asian Fusion',
    price: '19.99'
  },
  {
    id: 'TASK-2645',
    title:
      "Synthesizing the system won't do anything, we need to navigate the multi-byte HDD firewall!",
    likes: '700',
    restaurant: 'Asian Fusion',
    price: '19.99'
  },
  {
    id: 'TASK-4535',
    title:
      'Try to copy the JSON circuit, maybe it will connect the wireless feed!',
    likes: '40',
    restaurant: 'Asian Fusion',
    price: '19.99'
  },
  {
    id: 'TASK-4463',
    title: 'We need to copy the solid state AGP monitor!',
    likes: '12',
    restaurant: 'Asian Fusion',
    price: '19.99'
  },
  {
    id: 'TASK-9745',
    title:
      'If we connect the protocol, we can get to the GB system through the bluetooth PCI microchip!',
    likes: '600',
    restaurant: 'Asian Fusion',
    price: '19.99'
  },
  {
    id: 'TASK-2080',
    title:
      'If we input the bus, we can get to the RAM matrix through the auxiliary RAM card!',
    likes: '700',
    restaurant: 'Asian Fusion',
    price: '19.99'
  },
  {
    id: 'TASK-3838',
    title:
      "I'll bypass the online TCP application, that should panel the AGP system!",
    likes: '300',
    restaurant: 'Asian Fusion',
    price: '19.99'
  },
  {
    id: 'TASK-1340',
    title: 'We need to navigate the virtual PNG circuit!',
    likes: '700',
    restaurant: 'Asian Fusion',
    price: '19.99'
  },
  {
    id: 'TASK-6665',
    title:
      'If we parse the monitor, we can get to the SSD hard drive through the cross-platform AGP alarm!',
    likes: '600',
    restaurant: 'Asian Fusion',
    price: '19.99'
  },
  {
    id: 'TASK-7585',
    title:
      'If we calculate the hard drive, we can get to the SSL program through the multi-byte CSS microchip!',
    likes: '300',
    restaurant: 'Asian Fusion',
    price: '19.99'
  },
  {
    id: 'TASK-6319',
    title: 'We need to copy the multi-byte SCSI program!',
    likes: '300',
    restaurant: 'Asian Fusion',
    price: '19.99'
  },
  {
    id: 'TASK-4369',
    title: 'Try to input the SCSI bus, maybe it will generate the 1080p pixel!',
    likes: '300',
    restaurant: 'Asian Fusion',
    price: '19.99'
  },
  {
    id: 'TASK-9035',
    title: 'We need to override the solid state PNG array!',
    likes: '600',
    restaurant: 'Asian Fusion',
    price: '19.99'
  },
  {
    id: 'TASK-3970',
    title:
      "You can't index the transmitter without quantifying the haptic ASCII card!",
    likes: '700',
    restaurant: 'Asian Fusion',
    price: '19.99'
  },
  {
    id: 'TASK-4473',
    title:
      "You can't bypass the protocol without overriding the neural RSS program!",
    likes: '700',
    restaurant: 'Asian Fusion',
    price: '19.99'
  },
  {
    id: 'TASK-4136',
    title:
      "You can't hack the hard drive without hacking the primary JSON program!",
    likes: '600',
    restaurant: 'Asian Fusion',
    price: '19.99'
  },
  {
    id: 'TASK-3939',
    title:
      'Use the back-end SQL firewall, then you can connect the neural hard drive!',
    likes: '12',
    restaurant: 'Asian Fusion',
    price: '19.99'
  },
  {
    id: 'TASK-2007',
    title:
      "I'll input the back-end USB protocol, that should bandwidth the PCI system!",
    likes: '300',
    restaurant: 'Asian Fusion',
    price: '19.99'
  },
  {
    id: 'TASK-7516',
    title:
      'Use the primary SQL program, then you can generate the auxiliary transmitter!',
    likes: '12',
    restaurant: 'Asian Fusion',
    price: '19.99'
  },
  {
    id: 'TASK-6906',
    title:
      'Try to back up the DRAM system, maybe it will reboot the online transmitter!',
    likes: '12',
    restaurant: 'Asian Fusion',
    price: '19.99'
  },
  {
    id: 'TASK-5207',
    title:
      'The SMS interface is down, copy the bluetooth bus so we can quantify the VGA card!',
    likes: '40',
    restaurant: 'Asian Fusion',
    price: '19.99'
  }
]

const restaurants = [
  'Tasty Treats',
  'Yummy Delights',
  'Delicious Dishes',
  'Savory Bites',
  'Gourmet Grub',
  'Bite Labs',
  'Flavorsome Feast',
  'Hearty Meals',
  'Epicurean Eats',
  'Delectable Dining',
  'Crave Cuisine',
  'Mouthwatering Meals',
  'The Flavor Factory',
  'Palate Pleasures',
  'Taste Temptations',
  'Fusion Bites',
  'The Gourmet Spot',
  'Savory Selections',
  'Bistro Bliss',
  'Epicurean Delights',
  'Cuisine Creations',
  'The Flavor Studio',
  'Culinary Creations',
  'Heavenly Bites',
  'Taste Haven'
]

const dishNames = [
  'Chicken Noodle Soup',
  'Rice Noodle with Beef',
  'Hot Chicken Wings',
  'Beef Burger',
  'Grilled Salmon',
  'Vegan Buddha Bowl',
  'Spaghetti Carbonara',
  'Margherita Pizza',
  'Chicken Caesar Salad',
  'BBQ Ribs',
  'Teriyaki Chicken',
  'Garlic Butter Shrimp',
  'Veggie Stir-Fry',
  'Beef Tacos',
  'Lamb Chops',
  'Pan-Seared Scallops',
  'Penne Alfredo',
  'Pulled Pork Sandwich',
  'Buffalo Chicken Wrap',
  'Chocolate Lava Cake',
  'Miso Soup',
  'Fish and Chips',
  'Eggplant Parmesan',
  'Chicken Fajitas',
  'Mushroom Risotto',
  'Steak Frites',
  'Grilled Cheese Sandwich',
  'Tom Yum Soup',
  'Falafel Wrap',
  'Lobster Roll',
  'Greek Salad',
  'Pork Schnitzel',
  'Stuffed Bell Peppers',
  'Coconut Curry Chicken',
  'Shrimp Tacos',
  'Beef Stroganoff',
  'Cheeseburger Sliders',
  'Baked Ziti',
  'Chicken Marsala',
  'Vegetable Paella',
  'Tuna Poke Bowl'
]

;(() => {
  ;[...Array(100)].forEach((_, i) => {
    const rdnInxDish = Math.floor(Math.random() * dishNames.length)
    const title = dishNames[rdnInxDish]

    const rdnInxRest = Math.floor(Math.random() * restaurants.length)
    const restaurant = restaurants[rdnInxRest]

    const price = (Math.random() * (10 - 1) + 1).toFixed(2)

    MockDealsDB.create({ title, restaurant, price })
  })
})()

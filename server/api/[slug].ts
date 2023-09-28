import fs from 'fs'
import path from 'path'
import { load } from 'cheerio'
import matter from 'gray-matter'
import { capitalizeFirstLetter, generateSlug, reverseSlug } from '~/utils'

const GRINDOSAUR_URL = 'https://www.grindosaur.com/en/games/digimon/digimon-world-next-order/digimon'
const DIGIMON_DIR = 'content/digimons/'

const digimons = [
  'Botamon', 'Punimon', 'Poyomon', 'YukimiBotamon', 'Pabumon', 'Jyarimon', 'Zerimon', 'Conomon', 'Kuramon', 'Pichimon',
  'Yuramon', 'Koromon', 'Tsunomon', 'Tokomon', 'Motimon', 'Tanemon', 'Gigimon', 'Gummymon', 'Kokomon', 'Tsumemon',
  'Nyaromon', 'Bukamon', 'Agumon', 'Gabumon', 'Biyomon', 'Patamon', 'Tentomon', 'Gomamon', 'Palmon', 'Salamon',
  'Veemon', 'Wormmon', 'Guilmon', 'Terriermon', 'Lopmon', 'Renamon', 'Gaomon', 'Hagurumon', 'Gotsumon', 'Goblimon',
  'ToyAgumon', 'DemiDevimon', 'Lucemon', 'Hackmon', 'Agumon (Black)', 'SnowAgumon', 'Gabumon (Black)', 'Psychemon',
  'Tsukaimon', 'Aruraumon', 'ToyAgumon (Black)', 'ClearAgumon', 'Solarmon', 'SnowGoblimon', 'Shamamon', 'Keramon',
  'Gumdramon', 'Shoutmon', 'Greymon', 'Garurumon', 'Birdramon', 'Angemon', 'Kabuterimon', 'Ikkakumon', 'Togemon',
  'Gatomon', 'ExVeemon', 'Stingmon', 'Growlmon', 'Gargomon', 'Turuiemon', 'Kyubimon', 'GaoGamon', 'Wizardmon',
  'Devimon', 'Veedramon', 'Tyrannomon', 'Ogremon', 'Leomon', 'Meramon', 'Vegiemon', 'Nanimon', 'Seadramon',
  'Kuwagamon', 'Guardromon', 'Woodmon', 'BomberNanimon', 'Icemon', 'Hyogamon', 'Piddomon', 'Kyubimon (Silver)',
  'Gururumon', 'Saberdramon', 'BlackGatomon', 'Fugamon', 'Guardromon (Gold)', 'Youkomon', 'RedVeedramon',
  'GoldVeedramon', 'Growlmon (Orange)', 'Greymon (Blue)', 'Garurumon (Black)', 'RedVegiemon', 'IceDevimon',
  'Sorcermon', 'Chrysalimon', 'Numemon', 'Geremon', 'Sukamon', 'PlatinumSukamon', 'Meicoomon', 'MetalGreymon',
  'WereGarurumon', 'Garudamon', 'MagnaAngemon', 'MegaKabuterimon', 'Zudomon', 'Lillymon', 'Angewomon', 'Paildramon',
  'WarGrowlmon', 'Rapidmon', 'Antylamon', 'Taomon', 'MachGaogamon', 'AeroVeedramon', 'Myotismon', 'LadyDevimon',
  'Mamemon', 'MetalMamemon', 'Lucemon FM', 'MetalTyrannomon', 'SkullGreymon', 'Gigadramon', 'Megadramon', 'IceLeomon',
  'GrapLeomon', 'BlueMeramon', 'MegaSeadramon', 'Okuwamon', 'Datamon', 'Meteormon', 'MetalGreymon (Blue)',
  'WereGarurumon (Black)', 'MegaKabuterimon (Blue)', 'WarGrowlmon (Orange)', 'BlackWarGrowlmon', 'Rapidmon (Gold)',
  'Taomon (Silver)', 'Doumon', 'WaruSeadramon', 'Infermon', 'Etemon', 'Monzaemon', 'Maycrackmon VM', 'Agunimon',
  'WarGreymon', 'ShineGreymon', 'MetalGarurumon', 'Phoenixmon', 'Seraphimon', 'HerculesKabuterimon', 'Vikemon',
  'Rosemon', 'Magnadramon', 'MarineAngemon', 'Magnamon', 'Gallantmon', 'MegaGargomon', 'Cherubimon', 'Sakuyamon',
  'MirageGaogamon', 'UlforceVeedramon', 'VenomMyotismon', 'Lilithmon', 'Justimon', 'Piedmon', 'Lucemon SM',
  'RustTyranomon', 'Samudramon', 'Machinedramon', 'Beelzemon', 'BanchoLeomon', 'Leviamon', 'Crusadermon', 'Boltmon',
  'Creepymon', 'MetalSeadramon', 'GranKuwagamon', 'Belphemon SM', 'Barbamon', 'Examon', 'Titamon', 'Gankoomon',
  'Kentaurosmon', 'Craniamon', 'BlackWarGreymon', 'MetalGarurumon (Black)', 'ChaosGallantmon', 'Kuzuhamon',
  'Diaboromon', 'MetalEtemon', 'PlatinumNumemon', 'Ophanimon', 'Imperialdramon DM', 'Leopardmon', 'Dynasmon',
  'Jijimon', 'Mastemon', 'Alphamon', 'Jesmon', 'Minervamon', 'Dianamon', 'Darkdramon', 'KaiserGreymon',
  'MagnaGarurumon', 'Arresterdramon', 'OmniShoutmon', 'Omegamon', 'Omegamon Zwart', 'Imperialdramon FM',
  'Imperialdramon PM', 'Susanoomon', 'Belphemon RM', 'Omegamon Zwart D', 'Armageddemon', 'Omegamon Alter-B',
  'Gallantmon CM', 'ShineGreymon BM', 'Rosemon Burst Mode', 'Chaosmon', 'Boltboutamon',
]

function saveToMarkdown(slug, data) {
  // Ensure the directory exists
  if (!fs.existsSync(DIGIMON_DIR)) {
    fs.mkdirSync(DIGIMON_DIR, { recursive: true })
  }

  const content = matter.stringify('', data)
  console.log(`Saved new digimon ${path.join(DIGIMON_DIR, `${slug}.md`)}`)
  fs.writeFileSync(path.join(DIGIMON_DIR, `${slug}.md`), content)
}

function readFromMarkdown(slug) {
  const content = fs.readFileSync(path.join(DIGIMON_DIR, `${slug}.md`), 'utf-8')
  return matter(content).data
}

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  
  if (!slug) {
    throw new Error('No slug provided')
  }

  const digimonName = capitalizeFirstLetter(reverseSlug(slug))

  // Check if markdown file exists
  if (fs.existsSync(path.join(DIGIMON_DIR, `${slug}.md`))) {
    return readFromMarkdown(slug)
  }
  try {
    const digimonURL = `${GRINDOSAUR_URL}/${digimons.indexOf(reverseSlug(slug)) + 1}-${slug}`
    const response = await fetch(digimonURL)
    const htmlContent = await response.text()
    const $ = load(htmlContent)
  
    const quickFactsBox = $('.quick-facts-box')
    const type = quickFactsBox.find('tr:contains("Type") td:nth-child(2)').text()
    const stage = quickFactsBox.find('tr:contains("Stage") td:nth-child(2)').text()
    const attribute = quickFactsBox.find('tr:contains("Attribute") td:nth-child(2)').text()
    const nature = quickFactsBox.find('tr:contains("Nature") td:nth-child(2)').text()
    const icon = $('.digimon-world-next-order-icon').attr('src')
  
    const description = $('h3:contains("In-game description") + div.info-box p').text()
  
    // Extracting stats from the third table
    const statsTable = $('table').eq(2)
    const hp = statsTable.find('tbody td:nth-child(1)').text()
    const mp = statsTable.find('td:nth-child(2)').text()
    const str = statsTable.find('td:nth-child(3)').text()
    const sta = statsTable.find('td:nth-child(4)').text()
    const wis = statsTable.find('td:nth-child(5)').text()
    const spd = statsTable.find('td:nth-child(6)').text()
    const weight = statsTable.find('td:nth-child(7)').text()
    const tf = statsTable.find('td:nth-child(8)').text()
    const bonds = statsTable.find('td:nth-child(9)').text()
    const discipline = statsTable.find('td:nth-child(10)').text()
    const victories = statsTable.find('td:nth-child(11)').text()
    const keyDigimon = statsTable.find('td:nth-child(12)').text()
    const keyPoints = statsTable.find('td:nth-child(13)').text()
  
    let evolvesFromTableIndex = 3
    if (['Champion', 'Ultimate', 'Mega'].includes(stage)) {
      evolvesFromTableIndex = 4
    }
    if (['In-Training 1'].includes(stage)) {
      evolvesFromTableIndex = 0
    }
  
    if (['In-Training 2'].includes(stage)) {
      evolvesFromTableIndex = 1
    }
  
    const evolvesFromTable = $('table').eq(evolvesFromTableIndex)
    const evolvesToTable = $('table').eq(evolvesFromTableIndex + 1)
  
    const evolvesFrom = []
    if (!['In-Training 1'].includes(stage)) {
      evolvesFromTable.find('tbody tr').each((index, row) => {
        const icon = $(row).find('td:nth-child(1) img').attr('src')
        const name = $(row).find('td:nth-child(2) a').text()
        const stage = $(row).find('td:nth-child(4)').text()
        evolvesFrom.push({ 
          icon, 
          name,
          slug: generateSlug(name),
          stage, 
          sprite: `/icons/${generateSlug(name)}.png`,
          url: generateSlug(name),
        })
      })
    }
  
    const evolvesTo = []
    evolvesToTable.find('tbody tr').each((index, row) => {
      const icon = $(row).find('td:nth-child(1) img').attr('src')
      const name = $(row).find('td:nth-child(2) a').text()
      const stage = $(row).find('td:nth-child(4)').text()
      evolvesTo.push({ 
        icon, 
        name, 
        stage,
        slug: generateSlug(name),
        sprite: `/icons/${generateSlug(name)}.png`,
        url: generateSlug(name),
      })
    })

    const digimonData = {
      name: digimonName,
      url: digimonURL,
      slug,
      sprite: `/icons/${slug}.png`,
      stage,
      attribute,
      nature,
      description,
      type,
      icon,
      conditions: !['In-Training 1'].includes(stage) && {
        hp,
        mp,
        str,
        sta,
        wis,
        spd,
        weight,
        tf,
        bonds,
        discipline,
        victories,
        keyDigimon,
        keyPoints,
      },
      evolvesFrom,
      evolvesTo,
    }

    if (digimonData && slug) {
      saveToMarkdown(slug, digimonData)
    }

    return digimonData
  }
  catch (error) {
    console.error(error)

    throw new Error('Digimon not found')
  }
})
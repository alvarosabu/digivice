
export interface Digimon {
  name: string
  url: string
  slug: string
  sprite: string
  stage: string
  attribute: string
  nature: string
  description: string
  type: string
  icon: string
  conditions: {
    hp: string
    mp: string
    str: string
    sta: string
    wis: string
    spd: string
    weight: string
    tf: string
    bonds: string
    discipline: string
    victories: string
    keyDigimon: string
    keyPoints: string
  }
  evolvesFrom: Digimon[]
  evolvesTo: Digimon[]
}
export function generateSlug(name: string) {
  return name.replace(/\s*\(([^)]+)\)/, '-$1') // Convert (Black) to -black
    .replace(/(?<!^)([A-Z])/g, '-$1') // Insert hyphens before uppercase letters
    .toLowerCase() // Convert to lowercase
    .replace(/[^a-z0-9-]/g, '') // Remove any unwanted characters
    .replace(/--/g, '-') // Replace double hyphens with a single hyphen
}
  
export function reverseSlug(slug: string) {
  const parts = slug.split('-')
  if (parts.length > 1 && ['black', 'blue', 'red', 'gold', 'silver', 'orange'].includes(parts[parts.length - 1])) {
    const mainName = parts.slice(0, -1).map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('')
    const variant = parts[parts.length - 1]
    return `${mainName} (${variant.charAt(0).toUpperCase() + variant.slice(1)})`
  }
  return parts.map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('')
}
  
export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
import { translations } from "./i18n"

type TranslationKeys = Record<string, string | Record<string, unknown>>

function flattenKeys(obj: Record<string, unknown>, prefix = ""): string[] {
  const keys: string[] = []

  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key

    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      keys.push(...flattenKeys(value as Record<string, unknown>, fullKey))
    } else {
      keys.push(fullKey)
    }
  }

  return keys
}

export function checkTranslationParity() {
  const enKeys = flattenKeys(translations.en as unknown as Record<string, unknown>).sort()
  const esKeys = flattenKeys(translations.es as unknown as Record<string, unknown>).sort()

  const missingInEs = enKeys.filter((key) => !esKeys.includes(key))
  const extraInEs = esKeys.filter((key) => !enKeys.includes(key))

  if (missingInEs.length > 0 || extraInEs.length > 0) {
    console.warn("⚠️  Translation parity check failed:")

    if (missingInEs.length > 0) {
      console.warn(`\n❌ Missing in Spanish (es):`)
      missingInEs.forEach((key) => console.warn(`   - ${key}`))
    }

    if (extraInEs.length > 0) {
      console.warn(`\n❌ Extra in Spanish (es):`)
      extraInEs.forEach((key) => console.warn(`   - ${key}`))
    }

    return false
  }

  console.log("✅ Translation parity check passed: All keys match between en and es")
  return true
}

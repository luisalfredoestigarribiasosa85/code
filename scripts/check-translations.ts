import { checkTranslationParity } from "../lib/check-translations"

// Run the translation parity check
const result = checkTranslationParity()

if (!result) {
  process.exit(1)
}

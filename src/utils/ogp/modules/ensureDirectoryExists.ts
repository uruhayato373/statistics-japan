import fs from 'fs/promises'
import path from 'path'

async function ensureDirectoryExists(filePath: string) {
  const directory = path.dirname(filePath)
  try {
    await fs.access(directory)
  } catch (error) {
    // Directory doesn't exist, so create it
    await fs.mkdir(directory, { recursive: true })
  }
}

export default ensureDirectoryExists

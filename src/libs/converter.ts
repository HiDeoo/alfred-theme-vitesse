import { colord } from 'colord'

import { type AlfredTheme, BASE_ALFRED_THEME, writeAlfredTheme } from './alfred'
import { logStep } from './cli'
import { readVscTheme, type VscTheme } from './vsc'

export async function convertVscTheme(vscThemePath: string) {
  const vscTheme = await readVscTheme(vscThemePath)

  logStep(`Converting theme '${vscTheme.name}'`)

  const alfredTheme: AlfredTheme = structuredClone(BASE_ALFRED_THEME)

  alfredTheme.alfredtheme.name = vscTheme.name

  alfredTheme.alfredtheme.result.backgroundSelected = getVscThemeColor(vscTheme, 'button.background')
  alfredTheme.alfredtheme.result.shortcut.color = getVscThemeColor(vscTheme, 'input.placeholderForeground')
  alfredTheme.alfredtheme.result.shortcut.colorSelected = getVscThemeColor(vscTheme, 'button.foreground', 0.8)
  alfredTheme.alfredtheme.result.subtext.color = getVscThemeColor(vscTheme, 'input.placeholderForeground')
  alfredTheme.alfredtheme.result.subtext.colorSelected = getVscThemeColor(vscTheme, 'button.foreground', 0.8)
  alfredTheme.alfredtheme.result.text.color = getVscThemeColor(vscTheme, 'editor.foreground')
  alfredTheme.alfredtheme.result.text.colorSelected = getVscThemeColor(vscTheme, 'button.foreground')

  alfredTheme.alfredtheme.scrollbar.color = getVscThemeColor(vscTheme, 'input.placeholderForeground')

  alfredTheme.alfredtheme.search.background = getVscThemeColor(vscTheme, 'input.background')
  alfredTheme.alfredtheme.search.backgroundSelected = getVscThemeColor(vscTheme, 'editor.selectionBackground')
  alfredTheme.alfredtheme.search.text.color = getVscThemeColor(vscTheme, 'editor.foreground')
  alfredTheme.alfredtheme.search.text.colorSelected = getVscThemeColor(vscTheme, 'editor.foreground')

  alfredTheme.alfredtheme.visualEffectMode = vscTheme.base === 'vs-dark' ? 2 : 1

  alfredTheme.alfredtheme.window.borderColor = getVscThemeColor(vscTheme, 'button.background')
  alfredTheme.alfredtheme.window.color = getVscThemeColor(vscTheme, 'editor.background')

  return writeAlfredTheme(alfredTheme, `themes/${vscTheme.name}.alfredappearance`)
}

function getVscThemeColor(vscTheme: VscTheme, vscColorName: string, opacity?: number) {
  const vscColor = vscTheme.colors[vscColorName]

  if (!vscColor) {
    throw new Error(`Could not find color with the '${vscColorName}' identifier.`)
  }

  let color = colord(vscColor)

  if (opacity) {
    color = color.alpha(opacity)
  }

  let hexColor = color.toHex()

  if (hexColor.length === 7) {
    hexColor = `${hexColor}ff`
  }

  return hexColor
}

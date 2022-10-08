import fs from 'node:fs/promises'

export const BASE_ALFRED_THEME = {
  alfredtheme: {
    credit: 'HiDeoo',
    name: 'Vitesse',
    result: {
      backgroundSelected: '#ffffffff',
      iconPaddingHorizontal: 4,
      iconSize: 40,
      paddingVertical: 3,
      roundness: 6,
      shortcut: {
        color: '#ffffffff',
        colorSelected: '#ffffffff',
        font: 'System',
        size: 16,
      },
      subtext: {
        color: '#ffffffff',
        colorSelected: '#ffffffff',
        font: 'System',
        size: 12,
      },
      text: {
        color: '#ffffffff',
        colorSelected: '#ffffffff',
        font: 'System',
        size: 18,
      },
      textSpacing: 6,
    },
    scrollbar: {
      color: '#ffffffff',
      thickness: 2,
    },
    search: {
      background: '#ffffffff',
      backgroundSelected: '#ffffffff',
      paddingHorizontal: 7,
      paddingVertical: 4,
      roundness: 6,
      spacing: 9,
      text: {
        color: '#ffffffff',
        colorSelected: '#ffffffff',
        font: 'System Light',
        size: 34,
      },
    },
    separator: {
      color: '#ffffffff',
      thickness: 0,
    },
    visualEffectMode: 0,
    window: {
      blur: 0,
      borderColor: '#ffffffff',
      borderPadding: 0,
      color: '#ffffffff',
      paddingHorizontal: 10,
      paddingVertical: 10,
      roundness: 10,
      width: 550,
    },
  },
}

export function writeAlfredTheme(theme: AlfredTheme, themePath: string) {
  return fs.writeFile(themePath, JSON.stringify(theme, null, 2))
}

export type AlfredTheme = typeof BASE_ALFRED_THEME

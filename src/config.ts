import { Noto_Sans_JP, Public_Sans } from 'next/font/google'

export const twitterColor = '#1DA1F2'
export const facebookColor = '#3b5998'
export const linkedInColor = '#0e76a8'

export const APP_DEFAULT_PATH = '/'
export const HORIZONTAL_MAX_ITEM = 7
export const DRAWER_WIDTH = 260
export const MINI_DRAWER_WIDTH = 60

const publicSans = Public_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '300', '700'],
})

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '300', '700'],
})

export let SimpleLayoutType;
(function (SimpleLayoutType) {
  SimpleLayoutType['SIMPLE'] = 'simple'
  SimpleLayoutType['LANDING'] = 'landing'
})(SimpleLayoutType || (SimpleLayoutType = {}))

export let ThemeMode;
(function (ThemeMode) {
  ThemeMode['LIGHT'] = 'light'
  ThemeMode['DARK'] = 'dark'
})(ThemeMode || (ThemeMode = {}))

export let MenuOrientation;
(function (MenuOrientation) {
  MenuOrientation['VERTICAL'] = 'vertical'
  MenuOrientation['HORIZONTAL'] = 'horizontal'
})(MenuOrientation || (MenuOrientation = {}))

export let ThemeDirection;
(function (ThemeDirection) {
  ThemeDirection['LTR'] = 'ltr'
  ThemeDirection['RTL'] = 'rtl'
})(ThemeDirection || (ThemeDirection = {}))

export let NavActionType;
(function (NavActionType) {
  NavActionType['FUNCTION'] = 'function'
  NavActionType['LINK'] = 'link'
})(NavActionType || (NavActionType = {}))

export let Gender;
(function (Gender) {
  Gender['MALE'] = 'Male'
  Gender['FEMALE'] = 'Female'
})(Gender || (Gender = {}))

export let DropzoneType;
(function (DropzoneType) {
  DropzoneType['DEFAULT'] = 'default'
  DropzoneType['STANDARD'] = 'standard'
})(DropzoneType || (DropzoneType = {}))

const config = {
  fontFamily: `${notoSansJP.style.fontFamily}, ${publicSans.style.fontFamily}`,
  menuOrientation: MenuOrientation.VERTICAL,
  miniDrawer: false,
  container: true,
  mode: ThemeMode.LIGHT,
  presetColor: 'default',
  themeDirection: ThemeDirection.LTR,
  kindId: 'prefecture',
  prefCode: '28000',
  cityCode: '28100',
}

export default config
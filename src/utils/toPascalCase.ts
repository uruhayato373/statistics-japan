/**
 * 文字列をパスカルケースに変換する
 * 例: "hello-world" -> "HelloWorld"
 *
 * @param str ハイフン区切りの文字列
 * @returns パスカルケースの文字列
 */
export const toPascalCase = (str: string): string => {
  return str
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')
}

// 使用例
// import { toPascalCase } from '@/utils/string';
//
// console.log(toPascalCase('hello-world')); // "HelloWorld"
// console.log(toPascalCase('user-profile-page')); // "UserProfilePage"
// console.log(toPascalCase('api-response-type')); // "ApiResponseType"

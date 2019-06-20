import asciiRegex from "./asciiRegex";
import asciiAliases from "../data/asciiAliases";
import aliases from "../data/emoji_aliases";


const asciiAliasesRegex = asciiRegex();
function replaceAsciiAliases(...match: string[]) {
  const asciiAliasKeys = Object.keys(asciiAliases);

  const prevChar = match[6][(match[5] as any) - 1];
  const nextChar = match[6][(match[5] as any) + match[2].length];

  for (let i in asciiAliasKeys) {
    const alias = asciiAliasKeys[i];
    const data = (asciiAliases as any)[alias];
    const aliasFound = match[2];

    if (data.includes(aliasFound)) {
      const isEdgeCase = match[1];
      const fullMatchContent = match[0].slice(1, -1); // remove ":" at the beginning and end
      const validAsciiAlias = !(aliases as any)[fullMatchContent]; // ":" + fullMatchContent + ":" alias doesn't exist

      if (!isEdgeCase &&
        validAsciiAlias &&
        (prevChar === undefined || prevChar.match(/\s/))
        && (nextChar === undefined || nextChar.match(/\s/))
      ) {
        return (aliases as any)[alias];
      }

      // return the original word to replace its value in aliasesRegex
      return match[0];
    }
  }
}

function replace(text: string) {
  return text.replace(asciiAliasesRegex, replaceAsciiAliases)
}

export default replace;

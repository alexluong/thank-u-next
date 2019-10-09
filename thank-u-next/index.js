const badWordsArr = require("badwords/array")

const hello = ["hello", "helo", "helllo", "helloo", "hellooo", "hola"]
const hi = ["hi", "hii", "hiii", "hiiii", "hhi", "hey", "yo"]
const ws = ["how", "what"]
const pronoun = ["hun", "honey", "sweetie", "baby", "bae", "babe"]
const time = ["today", "morning", "night", "day", "date"]
const developer = ["developer", "coder", "programmer"]
const beautiful = ["beautiful", "pretty"]

const badWords = [
  ...badWordsArr,
  ...hello,
  ...hi,
  ...ws,
  ...pronoun,
  ...time,
  ...developer,
  ...beautiful,
  "good",
  "doing",
  "you",
  "there",
  "nice",
  "meet",
  "a",
]

const trim = word => word.replace(/[^\w]/g, "")
const toLowerCase = word => word.toLowerCase()
const isBadWord = word => badWords.includes(word)

/**
 *
 * @param {string} message
 */
function isNext(message) {
  const tokens = message
    .split(" ")
    .filter(word => word.match(/[a-z]/i))
    .map(trim)
    .map(toLowerCase)
    .map(isBadWord)

  if (tokens.length === 0) return true
  const numTrue = tokens.reduce((num, isTrue) => (isTrue ? num + 1 : num))
  const percent = (numTrue * 100) / tokens.length

  return percent >= 50
}

exports.isNext = isNext

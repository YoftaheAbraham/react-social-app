
export const formatText = (text, maxWords) => {
    let formattedText = ''
    const words = text.split(' ');
    if (maxWords <= words.length) {
        for (let i = 0; i < maxWords; i++) {
            formattedText +=` ${words[i]}`
        }
        formattedText += ` ...`
    } else {
        formattedText += `${text}`
    }
    return formattedText
}
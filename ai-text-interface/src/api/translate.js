export default async function translateText(text, sourcelang, targetlang){
    try {
        if (!('ai' in self && 'translator' in self.ai)) {
            alert('Your Browser does not support this translation')
            return null
        }
        if (!text.trim()){
            return 'Error: No text to translate'
        }

        // Check if language pair is available
        const translatorCapabilities = await self.ai.translator.capabilities();
        const availability = translatorCapabilities.languagePairAvailable(sourcelang, targetlang)
        if (availability === 'no') {
            return `Translation from ${sourcelang} to ${targetlang} is not supported`
        }
        if (availability === 'after-download'){
            console.warn('Downloading Language pack...')
        }

        // Create translator
        const translator = await self.ai.translator.create({
            sourceLanguage: sourcelang,
            targetLanguage: targetlang
        })

        //run translator
        const result = await translator.translate(text)
        console.log(result)
        return result
       

    } catch (error) {
        console.error('Translation Failed:', error)
        return `Translation failed ${error.message}`;
    }
    
}




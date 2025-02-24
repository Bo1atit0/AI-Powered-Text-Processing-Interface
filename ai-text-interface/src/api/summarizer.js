export default async function summarizer(text) {
    try{
        if(!('ai' in self && 'summarizer' in self.ai)) {
            alert('')
            return null
        }
        if (!text.trim()){
            return 'Error: No text to summarize'
        }
        // const wordCount = text.split(/\s+/).length
        // if (wordCount < 150) {
        //     alert('Text must be at least 150 words')
        // }

        // Check If summarization model is available
        const available = await (self.ai.summarizer.capabilities()).available
        if (available === 'no') {

        }
        if (available === 'readily') {
            let summarizer;
            summarizer = await self.ai.summarizer.create()
        } else {
            let summarizer;
            summarizer = await self.ai.summarizer.create()

            //Listen for download progress
        }
        const summary = await summarizer.summarize(text)
        console.log(summary)
        return summary
    } catch (error) {
        console.error('Summarizing failed:',error)
    }
}
import React, { useEffect, useRef, useState } from 'react'
import TranslateText from '../../api/translate';
import './main.css'
import summarizer from '../../api/summarizer';

 const Main = () => {

  const [inputText, setInputText] = useState('')
  const [messages, setMessages] = useState([])
  const [isTyping, setIsTyping] = useState(false)
  const [translatedText, setTranslatedText] = useState('')
  const [selectedLang, setSelectedLang] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (inputText.trim() === ''){
      alert('No Message')
      return;
    }

    setMessages((prevMessages) => 
      [...prevMessages, {text: inputText, sender: 'user'}]
    );
    setInputText('')
}

  const handleTranslate = async (text, lang) => {
    try {
      setIsTyping(true)
     const translated = await TranslateText(text, 'en', lang)
     setMessages((prevMessages) => [
      ...prevMessages, {text: translated, sender: 'ai'}
     ])
     setIsTyping(false)
    } catch (error) {
      console.error('Translation Error:',error)
  }
}

  const handleSummarize = async (text) => {
    try {
      const wordCount = text.split(/\s+/).length
      if (wordCount < 150){
        alert('Please enter more than 150 words')
        return null;
      }
      setIsTyping(true)
      const summary = await summarizer(text)
      setMessages((prevMessages) => [
        ...prevMessages, {text: summary, sender: 'ai'}
      ])
    } catch (error) {
      console.error('Summarizing Error:', error)
    }
  }

  const chatInterfaceref = useRef(null)
    useEffect(() =>{
      if (chatInterfaceref.current){
        chatInterfaceref.current.scrollTop = chatInterfaceref.current.scrollHeight
    }
  }, [messages])

  return (
    <div className='container'>
      <div className="chat-interface" ref={chatInterfaceref}>
      
        <div className="day">
          Today
        </div>

        {messages.map((message, index) => 
          <div key={index} className={message.sender === 'user' ? 'message-box' : 'ai-reply'}>
            <div className={message.sender === 'user' ? 'inner-message-box' : 'inner-ai-reply'}>
              <p>{message.text}</p>
            </div>

            {message.sender ==='user' && (
              <div className="ai-processors">
                <div className="translate">
                  <select 
                    value={selectedLang}
                    onChange={(e) => {setSelectedLang(e.target.value); handleTranslate(message.text, e.target.value)} }>
                    <option value="">Select a Language</option>
                    <option value="en">English</option>
                    <option value="pt">Portuguese</option>
                    <option value="es">Spanish</option>
                    <option value="ru">Russian</option>
                    <option value="tr">Turkish</option>
                    <option value="fr">French</option>
                  </select>
              </div>

              <div className="summarize">
                <button onClick={() => handleSummarize(message.text)}>Summarize</button>
              </div>

              {/* <div className="language">
                <button>Language</button>
              </div> */}

            </div>)
            }
            
    
          </div>
        )}

        <div className="isTyping">
          {isTyping ? 'AI is typing...' : ''}
        </div>

        {translatedText && (
          <div className="ai-reply">
          <div className="inner-ai-reply">
            <p>{translatedText}</p>
          </div>
        </div>
        )}
        
      
      </div>

      <div className="form">
        <form onSubmit={handleSubmit}>
          <div className="textarea">
          <textarea 
            value={inputText} 
            placeholder='Write a message...'
            onChange={(e) => {setInputText(e.target.value)}}>

            </textarea>
          </div>
          

          <div className="button">
            <button>{'>'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Main;
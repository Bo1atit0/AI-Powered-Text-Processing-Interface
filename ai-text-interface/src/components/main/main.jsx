import React from 'react'
import './main.css'

 const main = () => {
  return (
    <>
      <div className="chat-interface">
      
        <div className="day">
          Today
        </div>

        <div className="message-box">
          <div className="inner-message-box">
            <p className="timestamp">06:54 AM</p>
            <p>This is the box where the message sent to the AI will be displayed</p>
          </div>
        </div>

        <div className="ai-reply">
          <div className="inner-ai-reply">
            <p className="timestamp">06:55 PM</p>
            <p>This is the box where the AI's response will be displayed</p>
          </div>
        </div>

      
      </div>

      <div className="form">
        <form action="">
          <div className="textarea">
          <textarea name="" id="" placeholder='Write a message...'></textarea>
          </div>
          

          <div className="button">
            <button>{'>'}</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default main;
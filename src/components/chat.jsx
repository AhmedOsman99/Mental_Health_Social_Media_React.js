import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { getChats } from '../APIs/utils';
import AuthContext from '../context/AuthContext';
import WebSocketInstance from '../Websokcets/websocket';
import '../CSS/chats.css'; // Import the styles for the chat component

const Chat = () => {
  let { contextData } = useContext(AuthContext);
  let { user, userInfo } = contextData;
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [username, setUsername] = useState(userInfo.username);
  const [chats, setChats] = useState([]);
  const { chatId } = useParams(); 

  useEffect(() => {
    WebSocketInstance.connect(chatId);
    WebSocketInstance.addCallback(handleNewMessages, handleNewMessage);
    WaitForSocketConnection(() => {
      console.log("SENDING " + chatId)
      WebSocketInstance.fetchMessage(username , chatId);
    });
    return () => {
      WebSocketInstance.disconnect();
      WebSocketInstance.callbacks = {};
    };
  }, [username]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await getChats();
        setChats(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchChats();
  }, []);

  const handleNewMessages = messages => {
    setMessages(messages);
  };

  const handleNewMessage = message => {
    setMessages(prevMessages => [...prevMessages, message]);
  };

  const handleMessageSubmit = event => {
    event.preventDefault();
    const data = { message: messageInput, from: username };
    WebSocketInstance.newChatMessage(data , chatId);
    setMessageInput('');
  };

  const WaitForSocketConnection = callback => {
    const socket = WebSocketInstance.SocketRef;
    const recursion = WaitForSocketConnection;
    setTimeout(function() {
      if (socket != null && socket.readyState === 1) {
        console.log("WebSocket connection is secure");
        if (callback != null) {
          callback();
        }
        return;
      } else {
        console.log("Waiting for WebSocket connection...");
        recursion(callback);
      }
    }, 100);
    console.log(chats[0]) 
  };

  return (
    <div className="chat-container"> {/* Add a class to the chat container */}
      <div className="chat-sidebar"> {/* Add a sidebar for the chat list */}
        <h2>Chats</h2>
        <ul className="chat-list"> {/* Add a class to the chat list */}
          {chats.map(chat => (
            
            <li key={chat.id}>
              <a href={`/chat/${chat.id}`}>{chat.participant1.username} </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="chat-main"> {/* Add a main section for the chat log and message input */}
        <div className="chat-log-container"> {/* Add a container for the chat log */}
          <textarea
            id="chat-log"
            className="chat-log" 
            value={messages.map(message => `${message.author.username}: ${message.message}`).join('\n')}
            readOnly
          ></textarea>
        </div>
        <form className="message-form" onSubmit={handleMessageSubmit}> {/* Add a form for the message input */}
          <input
            id="chat-message-input"
            className="message-input"
            type="text"
            value={messageInput}
            onChange={event => setMessageInput(event.target.value)}
          />
          <button id="chat-message-submit" className="send-button" type="submit">Send</button> {/* Use a button instead of an input */}
        </form>
      </div>
    </div>
  );
};

export default Chat;
import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { getChats } from '../APIs/utils';
import AuthContext from '../context/AuthContext';
import WebSocketInstance from '../Websokcets/websocket';

const Chat = () => {
  let { contextData } = useContext(AuthContext);
  let { user, userInfo } = contextData;
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [username, setUsername] = useState(userInfo.username);
  const [chats, setChats] = useState([]); // Add state for the retrieved chats
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
  }, []); // Make the request to retrieve the chats when the component is mounted

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
  };

  return (
    <div>
      <ul>
        {chats.map(chat => (
          <li key={chat.id}>
            <a href={`/chat/${chat.id}`}>{chat.participant1.username} - {chat.participant2.username}</a>
          </li>
        ))}
      </ul>
      <textarea
        id="chat-log"
        cols="100"
        rows="20"
        value={messages.map(message => `${message.author.username}: ${message.message}`).join('\n')}
        readOnly
      ></textarea>
      <form onSubmit={handleMessageSubmit}>
        <input
          id="chat-message-input"
          type="text"
          value={messageInput}
          onChange={event => setMessageInput(event.target.value)}
        />
        <input id="chat-message-submit" type="submit" value="Send" />
      </form>
    </div>
  );
};

export default Chat;
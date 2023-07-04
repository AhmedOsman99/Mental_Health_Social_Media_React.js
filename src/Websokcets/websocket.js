class WebSocketService {
    static instance = null;
    callbacks = {};

    static getInstance() {
        if (!WebSocketService.instance) {
            WebSocketService.instance = new WebSocketService();
        }
        return WebSocketService.instance;

    }
    constructor(){
        this.SocketRef = null;
    }
    connect(chatUrl){
        const path = "ws://127.0.0.1:8000/ws/chat/"+chatUrl+"/";
        this.SocketRef = new WebSocket(path);
        this.SocketRef.onopen = () => {
            console.log("ON")
           
        }
        
        this.SocketRef.onmessage = e => {
            this.sokcetNewMessage(e.data);
        }
        this.SocketRef.onerror = e => {
            console.log(e.message)
        }
        this.SocketRef.onclose = e => {
            console.log("OFF");
        }
    }
    sokcetNewMessage(data){
        const parsedData = JSON.parse(data);
        const command = parsedData.command;
        if (Object.keys(this.callbacks).length ==0)
        {
                return
        }
        if (command == "messages"){
            this.callbacks[command](parsedData.messages);
        }
        if (command == "new_message")
        {
            this.callbacks[command](parsedData.message);
        }
    }
    fetchMessage(username ,chatId){
        console.log(chatId) 
        this.sendMessage({command:"fetch_messages" , username:username , chatId:chatId});
    }
    newChatMessage(message, chatId){
        this.sendMessage({command:"new_message" ,from:message.from ,  message: message.message, chatId:chatId})
    }

    addCallback(messagesCallback, callbackNewMessage){
        this.callbacks['messages'] =  messagesCallback;
        this.callbacks['new_message'] =  callbackNewMessage ; 
    }

    sendMessage(data){
        try {
                this.SocketRef.send(JSON.stringify({...data}))
        }
        catch (e) {
            console.log(e.message);
        }
    }

    WaitForConnection(callback){
        const socket = this.SocketRef;
        const recursion = this.WaitForConnection;
        setTimeout(function(){
            if (socket.readyState==1)
            {
                console.log("console is secure")
                if(callback!=null){
                    callback();
                }
                return;
            }
            else {
                console.log("Waiting for connection");
                recursion(callback);
            }
        }, 100)
    }
    disconnect() {
        if (this.SocketRef) {
          this.SocketRef.close();
        }
      }
}

const WebSocketInstance = WebSocketService.getInstance();
export default WebSocketInstance;
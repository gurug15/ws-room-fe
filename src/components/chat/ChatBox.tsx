import { useEffect, useRef, useState } from "react";
import CopyToClipboard from "../CopytoClipbrd";
import Messaage from "./Messaage";
import Sendmsg from "./Sendmsg";
import { Message } from "../../types";


const WS_URL = "ws://localhost:4000";


export default function ChatBox() {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [currentRoom, setCurrentRoom] = useState<string>('');
    const [input, setInput] = useState<Message>({ roomId: '', content: '' });
    const [messages, setMessages] = useState<Message[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    
    const joinRoom = () => {
        if (socket && currentRoom) {
            socket.send(JSON.stringify({
                type: 'joinRoom',
                payload: { roomId: currentRoom }
            }));
        }
    };

    const handleSendMessage = () => {
        if (!socket || !input.content || !currentRoom) return;

        const messagePayload = {
            type: 'message',
            payload: {
                roomId: currentRoom,
                content: input.content
            }
        };

        socket.send(JSON.stringify(messagePayload));
        setMessages(prev => [...prev, { ...messagePayload.payload, timestamp: Date.now() }]);
        setInput(prev => ({ ...prev, content: '' }));
        inputRef.current?.focus();
    };

    useEffect(() => {
        const ws = new WebSocket(WS_URL);
        setSocket(ws);

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            switch (data.type) {
                case 'joinRoom':
                    setMessages(data.messages || []);
                    break;
                case 'message':
                    setMessages(prev => [...prev, data.message]);
                    break;
            }
        };

        return () => {
            ws.close();
        };
    }, []);



  return (
    <div className="flex flex-col w-1/3 h-2/3 outline outline-1 outline-slate-700 rounded-lg ">
       <div className="h-full">
       <div className=" flex justify-between w-full h-1/5 flex-1/2 p-4 rounded-t-lg  shadow-white bg-gray-950">
            <div>
            <Sendmsg value={currentRoom} placeholder="Enter Room Id" onChange={(e)=>(setCurrentRoom(e.target.value))} onClick={joinRoom} />
            </div>
            <div className="mr-10">
                <CopyToClipboard text={currentRoom}/>
            </div>
        </div>
        <div className="flex flex-col flex-1 h-4/5 justify-between w-full">
        <div className="h-5/6 w-full overflow-auto">
            <div className="flex flex-col justify-start h-full mt-2">
              {messages.map(message=>(
                <Messaage key={message.timestamp} message={message}/>
              ))}
            </div>
        </div>
        <div className="bg-gray-700 h-[1px] w-full"></div>
        <div className="h-1/6 mt-3  ">
            <Sendmsg ref={inputRef} value={input.content} placeholder="Send Message..." onChange={(e)=>setInput((prev)=>({...prev, roomId:currentRoom,content:e.target.value}))} onClick={handleSendMessage}/>
        </div>
        </div>
       </div>
    </div>
  )
}

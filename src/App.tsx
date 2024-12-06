import ChatBox from "./components/chat/ChatBox";
//const BE_URL = "http://localhost:4000";



function App() {

    return (
        <div className=" flex justify-center items-center gap-2 w-screen h-screen bg-black text-white">
            <ChatBox/>
            <ChatBox/>
        </div>
    );
}

export default App;

import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { initializationSocket, receiveMessage, sendMessage } from '../config/socket_io.config';
import { useUser } from '../context/user.context';
import Markdown from 'markdown-to-jsx';

const ChatPanel = ({ project, setShowContributorBox }) => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]); // Store messages in state
    const { user } = useUser();
    const messageAreaRef = useRef();

    const handleMessageSend = () => {
        if (!message.trim()) return; // Prevent empty messages

        const newMessage = {
            message,
            user,
            type: "send",
            time: new Date(Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
        };

      

        setMessages((prevMessages) => [...prevMessages, newMessage]); // Add message to state
        sendMessage("project-message", {
            message,
            sender: user._id,
        });
        setMessage(""); // Clear input
    };

    useEffect(() => {
        if (project) {
            initializationSocket(project._id);
            receiveMessage('project-message', (data) => {
                setMessages((prevMessages) => [...prevMessages, { ...data, type: "receive" }]); // Store received message

                console.log(data)
            });
        }
    }, [project]);

    useEffect(() => {
        if (messageAreaRef.current) {
            messageAreaRef.current.scrollTop = messageAreaRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <section className='left relative h-screen flex flex-col min-w-96 '>
            <header className="flex justify-between bg-gradient-to-r from-indigo-800 to-purple-900 items-center p-2 px-4 w-full absolute z-10 top-0">
                <Link to={'/'} className='cursor-pointer'><i className="fi fi-rs-arrow-alt-circle-left text-white text-2xl"></i></Link>
                <button onClick={() => setShowContributorBox(prev => !prev)} className='bg-slate-200 flex justify-center items-center w-9 h-9 rounded-full cursor-pointer'><i className="fi fi-ss-users"></i></button>
            </header>

            <div className='conversation-area pt-12 pb-10 flex-grow flex flex-col h-full relative'>
            

                {/* Messaging content */}
                    <div ref={messageAreaRef} className= 'bg-gray-500 message-box p-1 flex-grow flex flex-col gap-1 overflow-auto max-h-full scrollbar-hide scroll-smooth' style={{ scrollbarWidth: 'none' }}>
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex gap-3 px-2 py-3 ${msg.type === 'receive' ? "ml-0" : "ml-auto"}`}>
                                <div className={`bg-white min-w-30 max-w-80 shadow-lg p-3 ${msg.user._id=="ai"?"px-1":""} pb-1 rounded-t-xl ${msg.type === 'receive' ? "rounded-br-xl" : "rounded-bl-xl"} flex flex-col gap-1`}>
                                    <p className='flex justify-between gap-5 items-center'>
                                        <span className='text-xs text-gray-400'>{ msg.user._id=="ai"?<span className='text-red-600 font-medium'>{msg.user.email}</span>:msg.user.email}</span>
                                        <span className='text-xs text-gray-400'>{msg.time}</span>
                                    </p>
                                    <div className="text-sm">
                                        { msg.user._id=="ai"?
                                        <div style={{ scrollbarWidth: 'none' }} className={`p-1 pr-2 pb-2 mr-1 max-w-full rounded-md scroll overflow-auto bg-slate-700 text-white w-full text-sm`}>
                                            <Markdown>{msg.message}</Markdown>
                                        </div> :
                                        msg.message
                                        }
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                {/* Send message input box */}
                <div className='absolute bottom-0 bg-gray-100 w-full flex gap-3 justify-between items-center'>
                    <input
                        onKeyDown={(e) => e.key === 'Enter' && handleMessageSend()}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        type="text"
                        placeholder='@ai conversation'
                        className='placeholder:text-gray-400 bg-gray-100 w-full outline-none py-3 px-3'
                    />
                    <button
                        onClick={handleMessageSend}
                        className='bg-gradient-to-r from-indigo-800 to-purple-900 cursor-pointer py-3 px-4 text-white flex justify-center items-center'>
                        <i className="fi fi-sr-paper-plane-top text-xl"></i>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ChatPanel;



// import React, { useEffect, useRef, useState } from 'react'
// import { Link } from 'react-router-dom';
// import { initializationSocket, receiveMessage, sendMessage } from '../config/socket_io.config';
// import { useUser } from '../context/user.context';

// const ChatPanel = ({ project, setShowContributorBox }) => {

//     const [message, setMessage] = useState("");
//     // const [messageRecieve, setMessageRecieve] = useState([])
//     const { user } = useUser();

//     const messageAreaRef = useRef();


//     const handleMessageSend = () => {

//         Addmessage({
//             message,
//             user,
//             type: "send",
//             time: new Date(Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })

//         })
//         sendMessage("project-message", {
//             message,
//             sender: user._id,


//         })
//         setMessage("")
//     }


//     useEffect(() => {

//         if (project) {
//             initializationSocket(project._id)
//             receiveMessage('project-message', (data) => {
//                 Addmessage({ ...data, type: "recieve" })
//             })
//         }

//     }, [project])


//     function Addmessage(messageObject) {
//         const messageArea = document.querySelector(".message-area")

//         console.log(messageObject)
//         const message = document.createElement('div')

//         const addCSS = messageObject.type == 'recieve' ? "ml-0" : "ml-auto"
//         message.classList.add(addCSS, "flex", "gap-3", "px-2", "py-3")
//         message.innerHTML = `<div class="bg-white min-w-30 max-w-56 shadow-lg p-3 pb-1 rounded-t-xl ${messageObject.type == 'recieve' ? "rounded-br-xl" : "rounded-bl-xl"} flex flex-col gap-1">
//                                 <p class='flex justify-between gap-5 items-center'>
//                                     <span class='text-xs text-gray-400'>${messageObject.user.email}</span>
//                                     <span class='text-xs text-gray-400'>${messageObject.time}</span>
//                                 </p>
//                                 <p class="text-sm">${messageObject.message}</p>
       
//                             </div>
//         `

//         messageArea.appendChild(message)
//         scrollBottom()
//     }

//     const scrollBottom = () => {
//         messageAreaRef.current.scrollTop = messageAreaRef.current.scrollHeight
//     }

//     return (
//         <section className='left flex flex-col min-w-full sm:min-w-96 '>

//             <header className="sticky top-0 min-w-full sm:min-w-96 flex bg-gradient-to-r from-indigo-800 to-purple-900 justify-between items-center p-3">
//                 <Link to={'/'} className='cursor-pointer'><i className="fi fi-rs-arrow-alt-circle-left text-white text-2xl"></i></Link>
//                 <button onClick={() => setShowContributorBox(prev => !prev)} className='bg-slate-200 flex justify-center items-center w-9 h-9 rounded-full cursor-pointer'><i className="fi fi-ss-users"></i></button>

//             </header>

//             <div className='flex flex-col '>

//                 {/* messaging content here */}
//                 <div className='message-box flex-grow flex flex-col '>

//                     <div ref={messageAreaRef} className='message-area justify-start flex flex-col min-h-[100vh] overflow-y-scroll scroll-smooth bg-slate-300' style={{ scrollbarWidth: 'none' }}>

//                         {/* INCOMING message here */}

//                         {/* message content  */}

//                     </div>
//                 </div>

//                 {/* Send message input box  */}
//                 <div className='sticky bottom-0 bg-gray-100 w-full flex gap-3 justify-between items-center'>

//                     <input onKeyDown={(e) => {
//                         if (e.key === 'Enter') {
//                             handleMessageSend();
//                         }
//                     }}
//                         value={message}
//                         onChange={(e) => setMessage(e.target.value)}
//                         type="text" placeholder='@ai conversation' className=' placeholder:text-gray-400 bg-gray-100 w-full outline-none py-3 px-3' />

//                     <button
//                         onClick={handleMessageSend}
//                         className='bg-gradient-to-r from-indigo-800 to-purple-900 cursor-pointer py-3 px-4 text-white flex justify-center items-center'><i className="fi fi-sr-paper-plane-top text-xl"></i>
//                     </button>
//                 </div>
//             </div>
//         </section>
//     )
// }

// export default ChatPanel



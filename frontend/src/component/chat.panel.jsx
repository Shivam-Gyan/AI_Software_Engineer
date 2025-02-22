import React from 'react'
import { Link } from 'react-router-dom';

const ChatPanel = ({ project, setShowContributorBox }) => {
    return (
        <section className='left flex flex-col min-w-full sm:min-w-96 '>

            <header className="sticky top-0 min-w-full sm:min-w-96 flex bg-gradient-to-r from-indigo-800 to-purple-900 justify-between items-center p-3">
                <Link to={'/'} className='cursor-pointer'><i className="fi fi-rs-arrow-alt-circle-left text-white text-2xl"></i></Link>
                <button onClick={() => setShowContributorBox(prev => !prev)} className='bg-slate-200 flex justify-center items-center w-9 h-9 rounded-full cursor-pointer'><i className="fi fi-ss-users"></i></button>

            </header>

            <div className='flex flex-col '>

                {/* messaging content here */}
                <div className='message-box flex-grow flex flex-col '>

                    <div className=' flex flex-col max-h-[84vh] overflow-y-scroll scroll-smooth bg-slate-300'  style={{ scrollbarWidth: 'none' }}>

                        {/* INCOMING message here */}
                        {[1, 2, 3, 4, 5, 6, 7].map((idx) => (
                            <div key={idx} className='incoming-message flex gap-3 items-center px-2 py-3'>
                                <div className='bg-white max-w-56 shadow-lg p-3 pb-1 rounded-t-xl rounded-br-xl flex flex-col gap-1'>
                                    <p className='text-sm'>Hello, how can I help you?Lorem ipsum dolor sit</p>
                                    <p className='text-xs self-end'>8:25</p>
                                </div>
                            </div>

                        ))}
                    </div>
                </div>

                {/* Send message input box  */}
                <div className='sticky bottom-0 bg-gray-100 w-full flex gap-3 justify-between items-center'>

                    <input onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            console.log('send message');
                        }
                    }} type="text" placeholder='@ai conversation' className=' placeholder:text-gray-400 bg-gray-100 w-full outline-none py-3 px-3' />

                    <button
                        className='bg-gradient-to-r from-indigo-800 to-purple-900 cursor-pointer py-3 px-4 text-white flex justify-center items-center'><i className="fi fi-sr-paper-plane-top text-xl"></i>
                    </button>
                </div>
            </div>
        </section>
    )
}

export default ChatPanel
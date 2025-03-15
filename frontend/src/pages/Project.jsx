import React, { useEffect, useMemo, useRef, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import databaseServices from '../Services/database.services';
import { initializationSocket } from '../config/socket_io.config.js';
import { useUser } from '../context/user.context';
import { getWebContainerInstance } from '../config/webcontainer.config.js'
import Markdown from 'markdown-to-jsx';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

const Project = () => {

  // state variables
  const [project, setProject] = useState(null)
  const [showCollaboratorPanel, setShowCollaboratorPanel] = useState(false);
  const [message, setMessage] = useState(""); //message state
  const [messages, setMessages] = useState([]); // Store messages in state
  const [showChatPanel, setShowChatPanel] = useState(false);
  const [showCodePanel, setShowCodePanel] = useState(true);
  const [loading, setLoading] = useState(true);


  const [webcontainer, setWebcontainer] = useState(null)
  const [iFrameUrl, setIFrameUrl] = useState("");
  const [runProcess, setRunProcess] = useState(null)

  // code-editor state variables

  const [fileTree, setFileTree] = useState({})

  const [currentFile, setCurrentFile] = useState(null);

  const [openFiles, setOpenFiles] = useState([]);

  const [fileTreeLastSavedBy,setFileTreeLastSavedBy]=useState(null)



  // projects related variables
  const { projectId } = useParams()
  const messageAreaRef = useRef();
  const { user } = useUser();


  // send message handling
  const handleMessageSend = () => {
    if (!message.trim()) return; // Prevent empty messages

    const newMessage = {
      message,
      user,
      type: "send",
      time: new Date(Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]); // Add message to state

    socketInstance.emit("project-message", {
      message,
      sender: user._id,
    });
    setMessage(""); // Clear input
  };


  // ai message handling
  const AiMessageRendering = (message) => {

    const messageObject = JSON.parse(message)

    console.log(messageObject)

    return (
      <>
        {
          loading ? <div className='bg-red-400'>loading...</div> : <div style={{ scrollbarWidth: 'none' }} className={`p-1 max-w-full rounded-md scroll overflow-auto w-full text-sm`}>
            <Markdown>{messageObject.text}</Markdown>
          </div>
        }
      </>
    )
  }


  // useEffect to receive to messages
  useEffect(() => {
    if (project) {
      socketInstance.on("project-message", (data) => {

        try {
          const parsedMessage = JSON.parse(data.message);
          if (parsedMessage.fileTree) {
            setFileTree(parsedMessage.fileTree);
          }
          setMessages((prevMessages) => [...prevMessages, { ...data, type: "receive" }]); // Store received message in state
          setLoading(false)
        } catch (e) {
          console.log(e)
          setMessages((prevMessages) => [...prevMessages, { ...data, type: "receive" }]); // Store received message in state
          setLoading(false)
        }
      });
    }

    return () => {
      socketInstance.off("project-message");
    }

  }, [project]);

  // useEffect to scroll to bottom of message area
  useEffect(() => {
    if (messageAreaRef.current) {
      messageAreaRef.current.scrollTop = messageAreaRef.current.scrollHeight;
    }
  }, [messages]);


  // memoized socket instance
  const socketInstance = useMemo(() => {
    console.log("memoized")

    databaseServices.projectDetailsbyId(setProject, projectId);

    databaseServices.getFileTree(projectId)
      .then((response) => {
        console.log(response)
        setFileTree(response.projectDetails.fileTreeSaved[0].fileTree)
        setFileTreeLastSavedBy({...response.projectDetails.fileTreeSaved[0].savedBy,savedAt:response.projectDetails.fileTreeSaved[0].updatedAt})
      })
      .catch((error) => {
        console.error(error)
      })


    if (!webcontainer) {
      getWebContainerInstance().then((webcontainer) => {
        setWebcontainer(webcontainer)
      })
    }
    return initializationSocket(projectId);

  }, [webcontainer]);

  const saveFileTree = async () => {
    try {
      const response = await databaseServices.updateFileTree(projectId, fileTree)
      // setFileTree(response.project.fileTreeSaved[0].fileTree)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <main className='bg-[#EFF6FC] h-screen w-screen flex items-center gap-1 p-7'>

      {/* left nav panel */}

      <div className='nav-panel min-w-[4.5rem] h-[90vh] rounded-xl bg-[#6E00FF] p-1 py-5 flex flex-col items-center justify-around'>

        {/* profile pic link */}
        <div className='flex flex-col items-center justify-between mb-12 h-fit'>
          <div className='cursor-pointer w-12 h-12 bg-white rounded-full'></div>
        </div>

        {/* functional links */}
        <div className='flex flex-col items-center justify-between h-full'>

          { /* icons */}
          <div className='flex flex-col items-center justify-between gap-5 h-fit'>
            <NavLink to={'/'} className='cursor-pointer'><i className="fi fi-rs-home text-2xl text-white"></i></NavLink>
            <div onClick={() => setShowChatPanel(prev => !prev)} className='cursor-pointer'><i className={`fi ${showChatPanel ? "fi-sr-comment-dots  " : "fi-rr-comment-dots "} text-2xl text-white`}></i></div>
            <div onClick={() => setShowCollaboratorPanel(prev => !prev)} className={'cursor-pointer'}><i className={`fi ${showCollaboratorPanel ? "fi-ss-users " : "fi-rr-users "}text-white text-2xl `}></i></div>
            <div className='cursor-pointer'><i className="fi fi-rr-document text-2xl text-white"></i></div>
            <div onClick={() => setShowCodePanel(prev => !prev)} className='cursor-pointer'><i className={`fi ${showCodePanel ? "fi-sr-file-code" : "fi-rr-file-code"} text-white text-2xl`}></i></div>
          </div>

          {/* logout */}
          <div className='flex flex-col items-center justify-between h-fit'>
            <NavLink className='cursor-pointer'><i className="fi fi-br-exit text-xl text-white"></i></NavLink>
          </div >
        </div>
      </div>


      {/* collaborator panel  */}

      {showCollaboratorPanel && <div className='collaborator-panel min-w-[20rem] min-h-[90vh] p-5 py-0 flex flex-col items-center justify-start gap-4'>

        {/* search-bar  */}
        <div className='search-bar w-full h-12 bg-white shadow-blue-200 shadow-xl rounded-xl flex items-center justify-between px-4'>
          <div className='mt-2' ><i className="fi </div>fi-rs-search text-lg text-slate-900 "></i></div>
          <input type='text' placeholder='search collaborators' className='px-3 w-full outline-none' />
        </div>

        {/* collaborators */}
        <div className='collaborators w-full bg-white shadow-blue-200 shadow-xl rounded-xl pb-2'>

          <h1 className='text-xl font-medium px-5 pt-3 pb-2'>Collaborators</h1>

          {/* list of collaborators */}
          <div className=' overflow-y-scroll scroll-smooth min-h-[30vh] px-3 pt-2 pb-4' style={{ scrollbarWidth: 'none' }}>
            {project && project.users.map((collaborator, index) => (
              <div key={collaborator._id} className='border-b-[1px] border-gray-300 flex items-center justify-start gap-2 py-2'>
                <div className='w-10 h-10 cursor-pointer bg-gray-200 rounded-full'></div>
                <p className='text-sm hover:underline hover:text-blue-500 cursor-pointer'>{collaborator.email}</p>
              </div>
            ))}


          </div>
        </div>

        {/* discover people */}
        <div className='collaborators w-full bg-white shadow-blue-200 shadow-xl rounded-xl pb-2'>

          <h1 className='text-xl font-medium px-5 pt-3 pb-2'>Discover people</h1>

          {/* list of collaborators */}
          <div className=' overflow-y-scroll scroll-smooth max-h-[30vh] px-3 pt-2 pb-4' style={{ scrollbarWidth: 'none' }}>
            {['Michael Scott', 'Pam Beesly', 'Jim Halpert', 'Dwight Schrute'].map((collaborator, index) => (
              <div key={index} className='flex items-center justify-start gap-2 mb-2'>
                <div className='w-10 h-10 bg-gray-200 rounded-full'></div>
                <p className='text-sm '>{collaborator}</p>
              </div>
            ))}
          </div>
        </div>

      </div>}


      {/* chat panel */}

      {showChatPanel && <div className={`chat-panel relative  min-h-[90vh] bg-white shadow-blue-200 shadow-xl rounded-xl p-5 py-0 flex flex-col items-center justify-start gap-4 ${(showCodePanel) ? showCollaboratorPanel ? 'ml-0 min-w-[25rem]' : "ml-5 min-w-[25rem]" : 'ml-5 min-w-[30rem]'}`}>

        {/* chat nav panel */}

        <div className='chat-nav-panel w-full border-b-2 border-slate-200 pb-2 flex items-center justify-start gap-4 px-4 py-4'>
          <div className='user-pic min-w-12 h-12 rounded-full bg-gray-300'></div>
          <h1 className='text-lg w-full text-gray-400'>{project && project.name}</h1>
          <div className='flex justify-end w-full cursor-pointer'><i className="fi fi-sr-user-add text-xl text-gray-500"></i></div>
        </div>

        {/* display messages */}
        <div ref={messageAreaRef} className='messages w-full overflow-y-scroll scroll-smooth max-h-[67vh] px-3 pt-2 pb-4' style={{ scrollbarWidth: 'none' }}>

          {messages.length ? messages.map((msg, idx) => (
            <div key={idx} className={`flex relative flex-col gap-[2px] items-center ${msg.type == 'receive' ? "items-start" : " items-end"} gap-2 mb-2`}>
              <p className='text-[10px] text-gray-500 '>{msg.user.email}</p>
              <div className={`text-sm min-w-[5rem] flex items-center justify-center px-2 max-w-[20rem] py-1 rounded-md ${msg.type == 'receive' ? "bg-gray-100 text-slate-800" : "bg-indigo-600 text-white"} `}>
                {msg.user._id == "ai" ?
                  AiMessageRendering(msg.message) :
                  msg.message
                }
              </div>
            </div>)) : <div className='flex items-center justify-center w-full h-full'>No messages yet</div>}

        </div>

        {/* send message */}
        <div className='flex my-3 absolute bottom-0 right-6 items-center justify-between w-[90%] gap-4'>
          <div className='w-full rounded-lg h-10 shadow-xl shadow-gray-100 bg-blue-100 flex items-center justify-between px-3'>
            <input
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleMessageSend();
                }
              }}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              type='text' placeholder='@ai prompt' className='placeholder:text-gray-400 w-full outline-none px-3 py-2' />
          </div>
          <button onClick={handleMessageSend} className='cursor-pointer p-2 pt-2 pb-1 px-3 rounded-md bg-indigo-600'><i className="fi fi-sr-paper-plane text-xl text-white"></i></button>
        </div>

      </div>}

      {/* code render component */}

      {showCodePanel &&
        <div className='w-full ml-5 min-h-[90vh] overflow-hidden bg-white shadow-blue-200 shadow-xl rounded-xl flex items-start justify-start'>

          {/* file directory */}
          <div className='min-h-[90vh] max-w-[6rem] py-6 bg-slate-300 '>

            {/* files list */}
            <div className=' overflow-y-scroll max-w-[6rem] scroll-smooth max-h-[80vh] pt-2 pb-4' style={{ scrollbarWidth: 'none' }}>
              {
                Object.keys(fileTree).map((file, index) => (
                  <button onClick={() => {
                    setCurrentFile(file)
                    setOpenFiles([...new Set([...openFiles, file])])
                  }} key={index} className='flex px-2 py-2 w-full hover:bg-slate-100 items-start justify-start gap-2'>
                    {/* <div className='w-10 h-10 bg-gray-200 rounded-full'></div> */}
                    <p className='text-sm cursor-pointer font-medium truncate '>{file}</p>
                  </button>
                ))
              }
            </div>
          </div>

          {/*code editor  */}

          {
            openFiles &&

            <div className='w-full h-full flex flex-col'>

              <div className="top flex items-center justify-between ">
                <div className="flex overflow-x-scroll scroll-smooth" style={{ scrollbarWidth: 'none' }}>
                  {
                    openFiles && openFiles.map((file, index) => (
                      <div key={index} className={`file-name ${currentFile == file ? "bg-slate-500 text-white" : "border-r-[2px]"} flex  border-gray-300 items-center cursor-pointer w-fit p-2 gap-2`}>
                        <button onClick={
                          () => {
                            setCurrentFile(file)
                          }
                        }>{file}</button>
                        <button
                          onClick={
                            () => {
                              // filter out removed file from open files
                              setOpenFiles(openFiles.filter((openFile) => openFile !== file))
                              // set current file to next file if exists else previous file if exists else null
                              setCurrentFile(openFiles[index + 1] || openFiles[index - 1] || null)
                            }
                          } ><i className='fi fi-sr-cross text-[10px] cursor-pointer '></i>
                        </button>
                      </div>
                    ))

                  }
                </div>

                <div className="flex items-center justify-between">

                  <button onClick={saveFileTree} className='cursor-pointer text-slate-600 mr-2'>
                    <i className="fi fi-ss-folder-download text-xl"></i>
                  </button>

                  {/* run server button  */}
                  <button
                    onClick={async () => {

                      await webcontainer?.mount(fileTree)
                      const installProcess = await webcontainer?.spawn("npm", ["install"])

                      installProcess.output.pipeTo(new WritableStream({
                        write(chunk) {
                          console.log(chunk)
                        }
                      }))

                      if (runProcess) {
                        runProcess.kill()
                      }

                      let tempRunProcess = await webcontainer?.spawn("npm", ["start"]);

                      tempRunProcess.output.pipeTo(new WritableStream({
                        write(chunk) {
                          console.log(chunk)
                        }
                      }))

                      setRunProcess(tempRunProcess)

                      webcontainer?.on('server-ready', (port, url) => {
                        console.log(port, url)
                        setShowCollaboratorPanel(false)
                        setIFrameUrl(url)
                      })

                    }}
                    className='cursor-pointer text-slate-600 p-2  mr-4'>
                    <i className="fi fi-sr-play text-xl"></i>
                  </button>

                </div>

              </div>

              <div className="bottom bg-slate-100">

                {
                  fileTree[currentFile] &&

                  <pre
                    className="hljs w-full h-[78.8vh] " style={{ scrollbarWidth: 'none' }}>
                    <code
                      className="hljs h-[84vh] outline-none"
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) => {
                        const updatedContent = e.target.innerText;
                        const ft = {
                          ...fileTree,
                          [currentFile]: {
                            file: {
                              contents: updatedContent
                            }
                          }
                        }
                        setFileTree(ft)
                        // saveFileTree(ft)
                      }}
                      dangerouslySetInnerHTML={{ __html: hljs.highlight('javascript', fileTree[currentFile].file.contents).value }}
                      style={{
                        whiteSpace: 'pre-wrap',
                        paddingBottom: '25rem',
                        counterSet: 'line-numbering',
                      }}
                    />
                  </pre>
                }
              </div>

              <div className='py-1 h-8 bg-white w-full flex items-center justify-center pr-4'>
                <p className='text-sm  text-gray-500'>last saved by {fileTreeLastSavedBy?.name}</p>
                <p className='text-sm  text-gray-500 ml-1'> at {new Date(fileTreeLastSavedBy?.savedAt).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false })}</p>
              </div>

            </div>
          }

        </div>
      }

      {iFrameUrl &&

        <div className='min-w-96 h-[90vh] flex flex-col px-2 py-3 bg-white items-center justify-center'>

          <div className='address-bar w-full p-1 border-2 rounded-md border-gray-300 flex items-center  gap-2'>
            <i className="fi fi-br-link mt-2"></i>
            <input type="text" value={iFrameUrl || "https://google.com"} onChange={(e) => setIFrameUrl(e.target.value)} className='outline-none cursor-pointer w-full' />
          </div>

          <iframe src={iFrameUrl
          } className="w-full h-full" />

        </div>
      }



    </main>
  )
}





export default Project
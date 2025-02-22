import React, { useEffect, useState } from 'react'
import { useUser } from '../context/user.context';

const ContributorPanel = ({ project, setShowContributorBox }) => {

    const [addCollaboratorModal, setAddCollaboratorModal] = useState(false);

    const {loading,setloading}=useUser()

    
    // const 



    return (
        <div className='bottom-0 h-screen shadow-md min-w-full sm:min-w-96 rounded-md bg-slate-100 gap-3 flex flex-col'>

            <div className='flex justify-between p-3 px-5'>
                <h1 className='text-xl'>People</h1>
                <button onClick={() => setShowContributorBox(prev => !prev)} className='cursor-pointer'><i className="fi fi-br-cross"></i></button>
            </div>

            <div className='search-contributor px-4 mt-2'>
                <div className='flex py-2 px-4 border-2 rounded-lg justify-start border-slate-400'>

                    <button className='cursor-pointer'><i className="fi fi-sr-member-search"></i></button>
                    <input type="text" className='px-3  outline-none placeholder:text-slate-500' placeholder='Search for contributors' />
                </div>
            </div>

            <div className='px-4 mt-5 w-full flex flex-col items-start'>
                <div className='flex text-gray-600 border-2 rounded-t-lg w-full border-slate-400 justify-between p-3 px-4'>
                    {addCollaboratorModal ? <input type='text' className='px-3  outline-none placeholder:text-slate-500' placeholder='add collaborator' /> : <h1 className=''>Contributors</h1>}
                    <div className='flex items-center gap-5'>
                        {addCollaboratorModal ? "" : <p className='text-lg font-medium'>{project ? project.users.length : "0"}</p>}
                        <button onClick={() => setAddCollaboratorModal(prev => !prev)} className='cursor-pointer'><i className="fi fi-sr-user-add"></i></button>
                    </div>
                </div>
                <div className='border-2 flex flex-col p-3 border-t-0 rounded-b-lg w-full border-slate-400'>
                    <>
                        {
                        addCollaboratorModal?
                        <div className='max-h-48'></div>
                        :project && project.users.map((item, idx) => (
                            <div key={idx} className='py-2 flex justify-between items-center'>
                                <div className='flex items-center justify-center gap-2'>
                                    <button className='cursor-pointer  rounded-full bg-slate-200 p-2 px-3 '><i className="fi fi-sr-user"></i></button>
                                    <p className='cursor-pointer hover:underline hover:text-blue-500'>{item && item.email}</p>
                                </div>
                                <button className='cursor-pointer'><i className="fi fi-rr-menu-dots-vertical"></i></button>
                            </div>
                        ))}
                    </>
                </div>
            </div>


        </div>
    )
}

export default ContributorPanel
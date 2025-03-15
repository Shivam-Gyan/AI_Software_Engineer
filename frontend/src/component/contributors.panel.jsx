import React, { useEffect, useState } from 'react'
import { useUser } from '../context/user.context.jsx';
import CollaboratorCard from './collaborators.card.jsx';
import axiosInstance from '../config/axios.config.js';

const ContributorPanel = ({ project, setShowContributorBox, showContributorBox }) => {

    const [addCollaboratorModal, setAddCollaboratorModal] = useState(false);
    const [allUsers, setAllUsers] = useState([])
    const [selectedUser, setSelectedUser] = useState([]);
    // const { loading, setloading } = useUser()


    const getAllusers = async () => {

        await axiosInstance.get("user/all-user")
            .then(res => {
                console.log(res.data)
                setAllUsers(res.data.users)
            }).catch(error => {
                console.log(error.message)
            })
    }

    const addCollaborators = () => {
        axiosInstance.patch('project/add-user', {
            projectId: project._id,
            users: selectedUser
        })
            .then((res) => {
                console.log(res.data)
                setSelectedUser([])
                setAddCollaboratorModal((prev) => !prev)
            }).catch(error => {
                console.log(error.message)
            })
    }

    useEffect(() => {
        getAllusers()
    }, [])

    return (
        <div className={`absolute right-0 bottom-0 h-screen z-30 shadow-md min-w-full sm:min-w-96 rounded-md bg-slate-100 gap-3 flex flex-col transition-transform duration-300 ${showContributorBox ? "translate-x-0" : "translate-x-full"
                  }`} >

            <div className='flex justify-between p-3 px-5'>
                <h1 className='text-xl'>People</h1>
                <button onClick={() => {
                    setShowContributorBox(false)
                    setAddCollaboratorModal(false)


                }} className='cursor-pointer'><i className="fi fi-br-cross"></i></button>
            </div>

            <div className='search-contributor px-4 mt-2'>
                <div className='flex py-2 px-4 border-2 rounded-lg justify-start border-slate-400'>

                    <button className='cursor-pointer'><i className="fi fi-sr-member-search"></i></button>
                    <input type="text" className='px-3  outline-none placeholder:text-slate-500' placeholder='Search for contributors' />
                </div>
            </div>

            <div className='px-4 mt-5 w-full flex flex-col items-start'>
                <div className='flex text-gray-600 border-2 rounded-t-lg w-full border-slate-400 justify-between p-3 px-4'>
                    {addCollaboratorModal ? <input type='text' className='px-3  outline-none placeholder:text-slate-500' placeholder='Add collaborator' /> : <h1 className=''>Contributors</h1>}
                    <div className='flex items-center gap-5'>
                        {addCollaboratorModal ? "" : <p className='text-lg font-medium'>{project ? project.users.length : "0"}</p>}
                        <div className='flex gap-3 items-center'>
                            <button
                                onClick={() => {
                                    if (!addCollaboratorModal) {
                                        setAddCollaboratorModal(prev => !prev);
                                    } else {
                                        addCollaborators();
                                    }
                                }} className='cursor-pointer'>

                                <i className="fi fi-sr-user-add"></i>
                            </button>

                            {
                                addCollaboratorModal && <button className='cursor-pointer' onClick={() => setAddCollaboratorModal(prev => !prev)}>
                                    <i className="fi fi-sr-share-square"></i>
                                </button>}
                        </div>
                    </div>
                </div>
                <div className='border-2 flex flex-col p-3 border-t-0 rounded-b-lg w-full border-slate-400'>
                    <>
                        {
                            addCollaboratorModal ?
                                <div className='max-h-48'>
                                    {allUsers && allUsers.map((item, idx) => (
                                        <CollaboratorCard key={idx} item={item} selectedUser={selectedUser} setSelectedUser={setSelectedUser} addCollaboratorModal={addCollaboratorModal} project={project} />
                                    ))
                                    }
                                </div>
                                : project && project.users.map((item, idx) => (
                                    <CollaboratorCard key={idx} item={item} />
                                ))
                        }
                    </>
                </div>
            </div>


        </div>
    )
}

export default ContributorPanel
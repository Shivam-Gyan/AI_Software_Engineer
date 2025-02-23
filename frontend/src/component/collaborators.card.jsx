import React from 'react'

const CollaboratorCard = ({ item, selectedUser, setSelectedUser, addCollaboratorModal = false, project }) => {

    const handleClick = (id) => {
        setSelectedUser(prev =>
            prev.includes(id) ? prev.filter(userId => userId !== id) : [...prev, id]
        );
    }
    
    return (
        <div className='py-2 flex justify-between items-center'>
            <div className='flex items-center justify-center gap-2'>
                <button className='cursor-pointer  rounded-full bg-slate-200 p-2 px-3 '><i className="fi fi-sr-user"></i></button>
                <p className='cursor-pointer hover:underline hover:text-blue-500'>{item && item.email}</p>
            </div>
            <button className='cursor-pointer'>
                {addCollaboratorModal ?
                    <i
                        onClick={() => handleClick(item._id)}
                        className={`fi fi-${selectedUser.indexOf(item._id)!=-1 
                                ? "sr-checkbox text-blue-500"
                                : "rr-checkbox"
                            }`}
                    ></i> : <i className="fi fi-rr-menu-dots-vertical"></i>}</button>
        </div>
    )
}

export default CollaboratorCard
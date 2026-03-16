import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'

const Settings = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);


  useEffect(() => {
    if (isEditing === 'name' && nameRef.current) {
      nameRef.current.focus();
    }
    if (isEditing === 'email' && emailRef.current) {
      emailRef.current.focus();
    }
  }, [isEditing])

  const handleEditToggle = (field: string) => {
    setIsEditing(field);
  }

  useEffect(() => {
    const user = localStorage.getItem('loggedUser');
    if (user) {
      const parsed = JSON.parse(user);
      setName(parsed.name || '');
      setEmail(parsed.email || '');
    }
  }, [])

  const handleSave = async () => {
    const token = localStorage.getItem('loginToken');
    const user = JSON.parse(localStorage.getItem('loggedUser') || '{}');
    const userId = user._id;
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/settings/${userId}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ name, email })
    })
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('loggedUser', JSON.stringify(data));
      toast.success(`Profile Updated Successfully ✅`);
      setIsEditing(null);
    }
    else {
      toast.error(`Failed to update profile ❌`)
    }
  }

  return (
    <section className='p-6 max-w-4xl mx-auto'>
      <h1 className='text-2xl font-bold mb-6 cascadia'>Settings</h1>
      {/* Profile Info */}
      <div className='bg-white shadow rounded-lg p-6 mb-6'>
        <h2 className='mb-5 cascadia'>Profile Information</h2>
        <div className='space-y-4'>
          <div className='flex items-center gap-3'>
            <label>Name</label>
            <input ref={nameRef} className={`border rounded-md p-2 w-full cascadia ${isEditing !== 'name' ? `bg-gray-200 cursor-not-allowed` : `bg-white`}`} placeholder={`Full Name`} value={name} name='name' onChange={(e) => setName(e.target.value)} readOnly={isEditing !== 'name'} />
            {
              (isEditing !== 'name') ? <button className='p-2 border rounded-md bg-white hover:bg-gray-200' onClick={() => handleEditToggle('name')}>Edit</button>
                : <button className='p-2 border rounded-md bg-white hover:bg-gray-200' onClick={() => handleEditToggle('')}>Cancel</button>
            }
          </div>
          <div className='flex items-center gap-4'>
            <label>Email</label>
            <input ref={emailRef} className={`border rounded-md p-2 w-full cascadia ${isEditing !== 'email' ? `bg-gray-200 cursor-not-allowed` : `bg-white`}`} name='email' value={email} onChange={(e) => setEmail(e.target.value)} readOnly={isEditing !== 'email'} />
            {
              isEditing !== 'email' ?
                <button className='p-2 border rounded-md bg-white hover:bg-gray-200' onClick={() => handleEditToggle('email')}>Edit</button>
                : <button className='p-2 border rounded-md bg-white hover:bg-gray-200' onClick={() => handleEditToggle('')}>Cancel</button>
            }
          </div>
          <button onClick={handleSave} className='cascadia bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 cursor-pointer'>Save</button>
        </div>
      </div>
    </section>
  )
}

export default Settings

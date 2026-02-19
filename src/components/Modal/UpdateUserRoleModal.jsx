import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Swal from 'sweetalert2'



 const UpdateUserRoleModal = ({isOpen, setIsOpen, user})=> {

  const axiosSecure = useAxiosSecure()

const{role, email} = user

const queryClient = useQueryClient()


const [updatedRole, setUpdatedRole] = useState(role)
console.log(updatedRole);


  function close() {
    setIsOpen(false)
  }

  // use mutaiion 
  const mutation = useMutation({
    mutationFn: async role =>{
      const {data} = await axiosSecure.patch(`/user/role/update/${email}`, {role})
      return data
    },
    onSuccess: data =>{
      console.log(data);
      
        Swal.fire({
                 position: "top-end",
                 icon: "success",
                 title: "User Role Updated Successfully",
                 showConfirmButton: false,
                 timer: 1800
               });
      setIsOpen(false)     
      // invalitad  query
      queryClient.invalidateQueries(['users'])
    },
    onError: error =>{
      console.log(error);
    }

  })

  const handleSubmit = e =>{
    e.preventDefault()
    mutation.mutate(updatedRole)
  }


  return (
    <>
     

      <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close} __demoMode>
        <div className="fixed inset-0  z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md drop-shadow-2xl  rounded-xl bg-[#eae4e41f] p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
            >
              <DialogTitle as="h3" className="text-base/7 font-medium text-black">
                Update User Role
              </DialogTitle>
             
              <form onSubmit={handleSubmit}>

                <div>
                <select 
                value={updatedRole}
                onChange={e => setUpdatedRole(e.target.value)}
                className='w-full rounded-2xl py-2' name="role" id="">
                <option value="customer">Customer</option>
                <option value="seller">Seller</option>
                <option value="admin">Admin</option>
              </select>
                </div>

                <div className='flex justify-between mt-5'>
                    <button onClick={()=> setIsOpen(true)} type='submit' className='btn rounded-2xl bg-[#96c9de]'>Update</button>

                    <button onClick={close} type='button' className='btn rounded-2xl bg-red-400'>Cancel</button>
                </div>

              </form>

            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
}

export default UpdateUserRoleModal;
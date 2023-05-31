import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { ChangeProfilePicture, reset } from '../features/auth/authSlice'

export default function ProfilePicture(props) {

    const { user } = props
    const dispatch = useDispatch()

    const [ image, setImage ] = useState()



    const handleImage = (e) => {
        const file = e.target.files[0]
        console.log("Type: " + file.type + " Size: " + file.size)

        const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/pdf']
        if(allowedFileTypes.includes(file.type) && (file.size < 5 * 1024 * 1024)) {
            setFileToBase(file)
        } else {
            throw new Error("Invalid file type. Only jpeg, jpg, png, and pdf allowed")
        }
    }

    const setFileToBase = (file) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setImage(reader.result)
        }
    }

    const handleSubmitPicture = (e) => {
        e.preventDefault()

        dispatch(ChangeProfilePicture({ image }))
        dispatch(reset())
    }

  return (
    <div>ProfilePicture</div>
  )
}

import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { ChangeProfilePicture, reset } from '../features/auth/authSlice'
import { Button, Grid } from '@mui/material'
import defaultAvatar from "../images/default-avatar.png"


export default function ProfilePicture(props) {

    const { user } = props
    const userId = user.id
    
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

        dispatch(ChangeProfilePicture({ image, userId }))
        dispatch(reset())
    }

  return (
    <>
        <Grid sx={{ height: "100%", width: "45%"}}>
            <Grid sx={{ height: "auto", width: "100%"}}>
                {user.image ?
                    <img src={user.image} alt="profile-avatar" display="block" height="100%" width="100%" border="1px solid black" />
                    :
                    <img src={defaultAvatar} alt="profile-avatar" display="block" height="100%" width="100%" border="1px solid black"/>
                }
            </Grid>
            <Grid sx={{ display: "flex", flexDirection: "column", alignItems: "center"}}>
                <label>
                    Upload a new picture
                </label>
                <input onChange={handleImage} type="file" id="ImageUpload" name="image" label="Image" />
                <Button variant="contained" type="submit" onClick={handleSubmitPicture}>
                    Change
                </Button>
            </Grid>
        </Grid>

    </>
  )
}

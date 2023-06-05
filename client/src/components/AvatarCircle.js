import { Avatar } from '@mui/material'
import React from 'react'
import defaultAvatar from '../images/default-avatar.png'

export default function AvatarCircle(props) {

    const { image } = props
    
    return (
        <Avatar
            display="inline-block"
            src={image ? image : defaultAvatar}
            sx={{ height: 24, width: 24}}
        />

    )
}

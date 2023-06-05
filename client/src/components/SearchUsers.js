import { useEffect, useState, useRef } from 'react'
import { QueryUsers } from '../features/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Grid, Skeleton, Stack, TextField, Typography } from '@mui/material'
import AvatarCircle from './AvatarCircle'

export default function SearchUsers(props) {

    const { handleAddMember, user } = props

    const dispatch = useDispatch()  

    const [ searchQuery, setSearchQuery ] = useState('')
    const [ pageNumber, setPageNumber ] = useState(1)
    const { users } = useSelector((state) => state.auth)

    useEffect(() => {
        dispatch(QueryUsers(searchQuery, pageNumber))
    }, [searchQuery])

  
    return (
        <Grid>
            <TextField
              id="search user"
              label="Search user"
              type="text"
              name="searchQuery"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {users && searchQuery.length > 0 && users.map((member, index) => {
              return (
                <Grid sx={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", border: "1px solid black"}}>
                  <AvatarCircle image={member.image} />
                  <Stack direction="column">
                    <Typography>Username: {member.username}</Typography>
                    <Typography>Email: {member.email}</Typography>
                  </Stack>
                  <Button onClick={() => handleAddMember(member.username)}>Add</Button>
                </Grid>
              )
            })}
        </Grid>
  )
}

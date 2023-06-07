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
        <Grid sx={{ display: "flex", width: "100%", flexDirection: "column", height: 450, justifyContent: "center"}}>
            <TextField
              id="search user"
              label="Search for a user"
              type="text"
              name="searchQuery"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{ backgroundColor: "#e7e7e7"}}
            />
            <Grid sx={{ height: "60%", overflowY: "auto", marginTop: "10%"}}>
              {users && users.map((member, index) => {
                return (
                  <Grid sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", maxHeight: "30vh", padding: 1}}>
                    <AvatarCircle image={member.image} />
                    <Stack direction="column" sx={{ width: "60%"}}>
                      <Typography>{member.username}</Typography>
                      <Typography>{member.email}</Typography>
                    </Stack>
                    <Button onClick={() => handleAddMember(member.username)}>Add</Button>
                  </Grid>
                )
              })}
            </Grid>
        </Grid>
  )
}

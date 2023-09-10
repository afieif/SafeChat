import React from 'react'
import { AppBar, Toolbar } from '@mui/material';

export default function ChatroomBar(props) {
return (
    <AppBar>
        <Toolbar>
            {props.name.toUpperCase()}
        </Toolbar>
    </AppBar>
)
}
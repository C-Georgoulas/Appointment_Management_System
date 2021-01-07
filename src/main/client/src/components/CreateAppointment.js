import React, { useState, useEffect }from 'react'
import Container from '@material-ui/core/Container';
import Nav from './Nav'


export default function CreateAppointment() {

    return (
        <div>
        <Nav/>
        <Container maxwidth="md">
        <h2>Hello from CreateAppointment</h2>
        </Container>
        </div>
    )
}
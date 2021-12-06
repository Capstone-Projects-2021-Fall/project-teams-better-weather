import React, { useRef } from 'react'
import { Form, Button } from 'react-bootstrap'
import { Link } from "react-router-dom"
import firebase from 'firebase/compat/app'
import { db } from './Firebase'
import { ref, set, push, onValue} from "firebase/database"

export default function AddLocation(){
    const addLocRef = useRef()

    //This works
    function addLocation(location){
        location.preventDefault()
        var user = firebase.auth().currentUser
        const listRef = ref(db, '/users/' + user.uid + '/Locations');
        const newListRef = push(listRef);
        set(newListRef, addLocRef.current.value);
        window.location.reload();
    }

    //code to get locations in array, but does not display properly :(
    //chould be in own component
    function display() {
        var user = firebase.auth().currentUser
        var uid = user.uid
        const listRef = ref(db, '/users/' + user.uid + '/Locations')
        var locations = []
        onValue(ref(db, '/users/' + uid + '/Locations'), (snapshot) => {
            let snap = snapshot.val()
            for(let i in snap){
                locations.push(snap[i])
                console.log(locations)
            }
         }, {
            onlyOnce: true
        });
        return (
            <div>
                {locations.map((location) => {return <p>{location}</p>})}
            </div>
        )
    }


    return (
        <>
        <div className="main">
            <Form onSubmit={addLocation}>
                <Form.Group id="addLocation">
                    <Form.Label>Add Location</Form.Label>
                    <Form.Control type="addLocation" ref={addLocRef} required/>
                </Form.Group>
                <Button className="w-100" type="submit">
                    Add Location
                </Button>
            </Form>
            <div className="w-100 text-center mt-2">
                <br></br>
                <Link to="/">Go back to main page</Link>
            </div>
        </div>
        </>
    )

}

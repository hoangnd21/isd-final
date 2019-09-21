import React from 'react';
import axios from 'axios';


axios.get('http://localhost:9000/equipments')
    .then(function (res) {
        console.log(res);
    })
    .catch(function (error) {
        console.log(error);
    });

axios.get('http://localhost:9000/equipments', {
    params: {
        id: equipment.id
    }
})
    .then(function (res) {
        console.log(res);
    })
    .catch(function (error) {
        console.log(error);
    });

export default class Users extends React.Component {
    render() {
        return (
            <>
                <h1>Content of Users</h1>
            </>
        )
    }
}
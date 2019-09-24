import React from 'react';
import axios from 'axios';


axios.get('http://localhost:9000/equipments')
    .then(function (res) {
        console.log(res);
    })
    .catch(function (error) {
        console.log(error);
    });

getOneEquipment = (equipment) => {
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
};

addEquipment = (equipment) => {
    axios.post('http://localhost:9000/equipments/addEquipment', { equipment })
        .then(function (res) {
            console.log(res);
        })
        .catch(function (error) {
            console.log(error);
        });
};

updateEquipment = (equipment) => {
    axios.post('http://localhost:9000/equipments/updateEquipment', { equipment })
        .then(function (res) {
            console.log(res);
        })
        .catch(function (error) {
            console.log(error);
        });
}

deleteEquipment = (equipment) => {
    axios.post('http://localhost:9000/equipments/deleteEquipment', { equipment })
        .then(function (res) {
            console.log(res);
        })
        .catch(function (error) {
            console.log(error);
        });
}

getUser = (equipment) => {
    axios.post('http://localhost:9000/user', {
        param: {
            id: equipment.id
        }
    })
        .then(function (res) {
            console.log(res);
        })
        .catch(function (error) {
            console.log(error);
        });
}

addEquipmentDistribution = (equipment) => {

    axios.post('http://localhost:9000/equipmentDistribution/addEquipmentDistribution', { equipment })
        .then(function (res) {
            console.log(res);
        })
        .catch(function (error) {
            console.log(error);
        });
}

export default class Users extends React.Component {
    render() {
        return (
            <>
                <h1>Content of Users</h1>
            </>
        )
    }
}
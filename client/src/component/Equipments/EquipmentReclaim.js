import React from 'react';
import axios from 'axios'

class EquipmentReclaim extends React.Component {
  state = {
    users: {}
  }

  componentDidMount() {
    axios.get('http://localhost:9000/users')
      .then(res => {
        this.setState({
          users: res.data,
        })
      })
  }

  render() {
    const { equipment } = this.props;
    console.log(equipment)
    return (
      <>
        Reclaim
      </>
    );
  }
}

export default EquipmentReclaim;
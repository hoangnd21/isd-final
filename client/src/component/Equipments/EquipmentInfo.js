import React from 'react';

export default class EquipmentInfo extends React.Component {
  render() {
    const { equipment } = this.props;
    console.log(equipment)
    return (
      <>
        Equipment Name:{equipment.name} <br />
        Batch: {equipment.batch} <br />
        Price: {equipment.originalPrice}<br />
        Code: {equipment.code} <br />
        Purchased date: Batch: {equipment.datePurchased} <br />
        General type: {equipment.generalType} <br />
        Subtype: {equipment.subtype}<br />
        Manufacturer: {equipment.manufacturer} <br />
        Status: {equipment.status} <br />

      </>
    )
  }
}
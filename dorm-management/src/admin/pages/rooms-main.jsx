import React from 'react'
import RoomsHeader from '../components/rooms-header'
import RoomsTable from '../components/rooms-table'

function Rooms() {
  return (
    <div className='min-h-full'>
      <RoomsHeader />
      <RoomsTable />
    </div>
  )
}

export default Rooms

'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function NewListingPage() {
  const [brand, setBrand] = useState('Adams') // or any default brand you prefer
  const [message, setMessage] = useState('')
  const [clubType, setClubType] = useState('Driver')

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const { data, error } = await supabase.from('listings').insert([
      {
        brand,
        club_type: clubType,
        model: 'Test Model',
        condition: 'Good',
        price: 100,
      },
    ])

    if (error) {
      console.error('Supabase Error:', error.message || error)
      setMessage('❌ Failed to submit')
    } else {
      console.log(data)
      setMessage('✅ Listing submitted!')
    }
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Test Club Listing</h1>
      <form onSubmit={handleSubmit}>
        <label style={{ marginTop: '1rem', display: 'block' }}>
          Brand:
          <select
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            style={{ marginLeft: '0.5rem' }}
          >
            <option value="Adams">Adams</option>
            <option value="Bridgestone">Bridgestone</option>
            <option value="Callaway">Callaway</option>
            <option value="Cleveland">Cleveland</option>
            <option value="Cobra">Cobra</option>
            <option value="Dunlop">Dunlop</option>
            <option value="Mizuno">Mizuno</option>
            <option value="Nike">Nike</option>
            <option value="Odyssey">Odyssey</option>
            <option value="Ping">Ping</option>
            <option value="PowerBilt">PowerBilt</option>
            <option value="Srixon">Srixon</option>
            <option value="TaylorMade">TaylorMade</option>
            <option value="Titleist">Titleist</option>
            <option value="Tour Edge">Tour Edge</option>
            <option value="Wilson">Wilson</option>
            <option value="XXIO">XXIO</option>
          </select>
        </label>

        <label style={{ marginTop: '1rem', display: 'block' }}>
          Club Type:
          <select
            value={clubType}
            onChange={(e) => setClubType(e.target.value)}
            style={{ marginLeft: '0.5rem' }}
          >
            <option value="Driver">Driver</option>
            <option value="Fairway Wood">Fairway Wood</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Iron">Iron</option>
            <option value="Wedge">Wedge</option>
            <option value="Putter">Putter</option>
          </select>
        </label>

        <button type="submit" style={{ marginTop: '1rem' }}>
          Submit
        </button>
      </form>
      <p>{message}</p>
    </div>
  )
}
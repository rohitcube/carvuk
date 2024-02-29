import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { supabase } from './supabase'
import './UpdatePost.css'

function UpdatePost() {

    const location = useLocation()
    const specific_user_id = location.state.intValue

    let navigate = useNavigate()


    const [post1, setPost1] = useState({
        service: '', booking_date:'',price:'',name:'',plate:'',address:'',driver:''
    })


    if (specific_user_id) {
        console.log('something passed into this')
        console.log(specific_user_id)
        console.log(typeof(specific_user_id))
    }
    console.log(post1)

    function handleChange(event){
        setPost1((prevFormData) => {
            return {
                ...prevFormData,
                // name is to identify which particular input among all the inputs
                // value is whatever the user inputs
                [event.target.name] : event.target.value
            }
        })
    }

/*
    async function createNewPost() {
        console.log('entered the create post function')
       const { error } = await supabase
        .from('servicios')
        .insert({ booking_date: post.booking_date, price: post.price,
             name: post.name, plate: post.plate, address: post.address,
            driver: post.driver,  })

        console.log(error)
        console.log('reached the end of this function')
    }

    const { error } = await supabase
  .from('countries')
  .update({ name: 'Australia' })
  .eq('id', 1)

    */

    async function handleSubmit(event){
        // submit sbumits whole page and refreshes the page
        event.preventDefault()
       try {
           console.log(supabase); // This should not be undefined
             const { error } = await supabase
            .from('servicios')
            .update({ service: post1.service, booking_date: post1.booking_date, price: post1.price,
            name: post1.name, plate: post1.plate, address: post1.address,
            driver: post1.driver })
            .eq('user_id', specific_user_id)
            if(error) throw error
        //    console.log('success!')
            navigate('/homepage')
       } catch (error) {
          alert(error)
       }
        console.log("submitted!")
      }

      return (
        <div className="form-container">

          <form onSubmit={handleSubmit}>
            <h3>Update Entry</h3>
            <input
              type="text"
              placeholder="Service Required"
              name="service"
              onChange={handleChange}
              className="input-field"
            />
            <input
              type="date"
              placeholder="Booking Date"
              name="booking_date"
              onChange={handleChange}
              className="input-field"
            />
            <input
              type="number"
              placeholder="Price"
              name="price"
              onChange={handleChange}
              className="input-field"
            />
            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={handleChange}
              className="input-field"
            />
            <input
              type="text"
              placeholder="Plate"
              name="plate"
              onChange={handleChange}
              className="input-field"
            />
            <input
              type="text"
              placeholder="Address"
              name="address"
              onChange={handleChange}
              className="input-field"
            />
            <input
              type="text"
              placeholder="Driver"
              name="driver"
              onChange={handleChange}
              className="input-field"
            />
            <br></br>
            <button type="submit" className="submit-button">Update</button>
          </form>
        </div>
      )
}

export default UpdatePost
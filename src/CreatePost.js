import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from './supabase'
import './UpdatePost.css'
function CreatePost() {

    let navigate = useNavigate()
    const [post, setPost] = useState({
        service: '', booking_date:'',price:'',name:'',plate:'',address:'',driver:''
    })

    console.log(post)

    function handleChange(event){
        setPost((prevFormData) => {
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


    */

    async function handleSubmit(event){
        // submit sbumits whole page and refreshes the page
        event.preventDefault()
       try {
           console.log(supabase); // This should not be undefined
        const { error } = await supabase
            .from('servicios')
            .insert({ service: post.service, booking_date: post.booking_date, price: post.price,
            name: post.name, plate: post.plate, address: post.address,
            driver: post.driver })
            if(error) throw error
            console.log('success!')
            navigate('/homepage')
       } catch (error) {
          alert(error)
       }
        console.log("submitted!")
      }

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <h3>Create New Entry</h3>
            <input
            type="text"
            placeholder='Service Required'
            name="service"
            onChange={handleChange}>
            </input>
            <input
            type="date"
            placeholder='Booking Date'
            name="booking_date"
            onChange={handleChange}>
            </input>
            <input
            type="number"
            placeholder='Price'
            name="price"
            onChange={handleChange}>
            </input>
            <input
            type="text"
            placeholder='Name'
            name="name"
            onChange={handleChange}>
            </input>
            <input
            type="text"
            placeholder='Plate'
            name="plate"
            onChange={handleChange}>
            </input>
            <input
            type="text"
            placeholder='Address'
            name="address"
            onChange={handleChange}>
            </input>
            <input
            type="text"
            placeholder='Driver'
            name="driver"
            onChange={handleChange}>
            </input>
            <br></br>
            <button type="Submit">Create</button>
        </form>
    </div>
  )
}

export default CreatePost
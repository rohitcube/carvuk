import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from './supabase'
import './HomePage.css'

function HomePage() {

    //Logout Code
    let navigate = useNavigate()

    function HandleLogout() {
        sessionStorage.removeItem('token')
        navigate('/')
    }


    // Data retrieving code
    const [posts, setposts] = useState([])
    const [totalPosts, setTotalPosts] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
   const totalPages = Math.ceil(totalPosts.length / itemsPerPage);
       console.log(totalPages)


    useEffect(() => {
      fetchUsers()
      fetchAllUsers()
    }, [currentPage])


   /* async function fetchUsers() {
        try {
        const data = await supabase
            .from('posts')
            .select('*')
            .setposts(data)
      //  console.log(posts)
        } catch (error) {
            alert(error)
        }
    }

const { error } = await supabase
  .from('countries')
  .update({ name: 'Australia' })
  .eq('id', 1)

    */

    async function fetchAllUsers() {
        const { data, error } = await supabase
        .from('servicios')
        .select('*')
        console.log(data)
        setTotalPosts(data)
    }


    async function fetchUsers() {
        try {
            const offset = (currentPage - 1) * itemsPerPage;
            // Fetch data from Supabase
            const { data, error } = await supabase
                .from('servicios')
                .select('*')
                .range(offset, offset + itemsPerPage - 1)
            // Check if there's an error
            if (error) throw error;
            console.log(data)

            // setposts is a function defined to update state or handle the fetched data:
            setposts(data);

        } catch (error) {
            alert(error.message);
        }
    }

    async function deletePost(user_id) {
        try {
            const { data, error } = await supabase
                .from('servicios')
                .delete()
                .eq('user_id', user_id)
            fetchUsers()
            if (error) throw error;
            if (data) { console.log(data) }
        } catch (error) {
            alert(error.message);
        }
    }

    const goToPage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };



    return (
        <div>
            <div>
                <h3>Servicios Carvuk</h3>
                <table>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Name</th>
                            <th>Service</th>
                            <th>Booking Date</th>
                            <th>Plate</th>
                            <th>Address</th>
                            <th>Driver</th>
                            <th>Price</th>
                            <th>Delete</th>
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map((post) => (
                            <tr key={post.user_id}>
                                <td>{post.user_id}</td>
                                <td>{post.name}</td>
                                <td>{post.service}</td>
                                <td>{post.booking_date}</td>
                                <td>{post.plate}</td>
                                <td>{post.address}</td>
                                <td>{post.driver}</td>
                                <td>{post.price}</td>
                                <td><button onClick={() => deletePost(post.user_id)}> Delete </button></td>
                                <td><button onClick={() => navigate('/updatepost', { state: { intValue: post.user_id } })}>Update</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="pagination-controls">

                {/* Pagination Controls */}
                {currentPage > 1 && (<button onClick={() => goToPage(currentPage - 1)}>Previous Page</button>)}

                {currentPage < totalPages && (
                     <button onClick={() => goToPage(currentPage + 1)}>Next</button>
        )}

            </div>
            <br /><br /><br />
            <button onClick={() => navigate('/createpost')}>Create New Post</button>
            <button onClick={HandleLogout}>Logout</button>
        </div>
    )
}

export default HomePage
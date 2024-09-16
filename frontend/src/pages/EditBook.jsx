/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import BackButton from '../components/BackButton';
import Spinner from '../components/spinner';
import axios from "axios";
import { useNavigate, useParams} from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';

const EditBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const[loading, setLoading] = useState(false);
  const  navigate = useNavigate()
  const {id} = useParams();
  const {enqueueSnackbar} = useSnackbar();

  useEffect(()=>{
    setLoading(true);
    axios
    .get(`http://localhost:5000/books/${id}`)
    .then((response)=>{
        setTitle(response.data.title);
        setAuthor(response.data.author);
        setPublishYear(response.data.publishYear);
        setLoading(false);
    })
    .catch((error) =>{
      // alert('Some Error Occur. Check console');
      enqueueSnackbar('Error', {variant:'error'});
      setLoading(false);
      console.log(error);
    });
  }, []);



  const handleEditBook = ()=>{
    const  data ={
      title, 
      author,
      publishYear
    };
    setLoading(true);
    axios
    .put(`http://localhost:5000/books/${id}`, data)
    .then((response)=>{
      setLoading(false);
      enqueueSnackbar('Book Edit Successful', {variant:'success'});
      navigate('/');
    })
    .catch((error)=>{
      // alert('Some Error Occur. Check console');
      enqueueSnackbar('Error', {variant:'error'});
      setLoading(false);
      console.log(error);
    })
    }

    return (
      <div className='p-4'>
        <BackButton/>
        <h1 className='text-3xl my-4 text-center mx-auto font-bold'>Edit Book</h1>
        {
          loading? (<Spinner/>):('')
        }
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Title</label>
            <input
              type='text'
              value={title}
              onChange={(e)=>setTitle(e.target.value)}
              className='border-2 border-gray-400 px-4 py-2 w-full'
              placeholder='Enter book title. e.g Software Engineering'
            />
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Author</label>
            <input
              type='text'
              value={author}
              onChange={(e)=>setAuthor(e.target.value)}
              className='border-2 border-gray-400 px-4 py-2 w-full'
              placeholder='Enter book author name. e.g Roger S. Pressman'
            />
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Publish Year</label>
            <input
              type='text'
              value={publishYear}
              onChange={(e)=>setPublishYear(e.target.value)}
              className='border-2 border-gray-400 px-4 py-2 w-full'
              placeholder='Enter publish year. e.g 2006'
            />
          </div>
          <button className='p-2 bg-sky-300 m-8' onClick={handleEditBook}>
            click
          </button>
  
        </div>
      </div>
    )
}

export default EditBook
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import './styles/CreatePost.css';
import { useNavigate } from 'react-router-dom';



const CreatePost = () => {
  const initialValues = {
    title: '',
    content: '',
    author: '',
    image: null
  };

  const navigate = useNavigate();

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    content: Yup.string().required('Content is required'),
    author: Yup.string().required('Author is required'),
    image: Yup.mixed()
      .required('An image is required')
      .test(
        'fileFormat',
        'Unsupported Format',
        value => value && ['image/jpeg', 'image/png'].includes(value.type)
      )
  });

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('content', values.content);
    formData.append('author', values.author);
    formData.append('image', values.image);

    try {
      await axios.post('https://blogpost-nu-seven.vercel.app/api/blog/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Post created successfully');
      navigate('/');
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="create-post-container">
      <h2>Create a New Post</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ setFieldValue, isSubmitting }) => (
          <Form className="form">
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <Field name="title" type="text" />
              <ErrorMessage name="title" component="div" className="error" />
            </div>

            <div className="form-group">
              <label htmlFor="content">Content</label>
              <Field name="content" as="textarea" />
              <ErrorMessage name="content" component="div" className="error" />
            </div>

            <div className="form-group">
              <label htmlFor="author">Author</label>
              <Field name="author" type="text" />
              <ErrorMessage name="author" component="div" className="error" />
            </div>

            <div className="form-group">
              <label htmlFor="image">Upload Image</label>
              <input
                name="image"
                type="file"
                onChange={(event) => {
                  setFieldValue('image', event.target.files[0]);
                }}
              />
              <ErrorMessage name="image" component="div" className="error" />
            </div>

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Create Post'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreatePost;

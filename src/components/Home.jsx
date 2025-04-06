import React from 'react'
import Preview from './Preview'
import Upload from './Upload'
import { useState } from 'react'
const Home = () => {

  const [uploadImage, setuploadImage] = useState(null)
  const [enhancedImage, setenhancedImage] = useState(null)
  const [loading, setLoading] = useState(false)

    return (
    <>
      
      <Upload />
      <Preview 
      uploaded = {uploadImage}
      enhanced = {enhancedImage}
      loading = {loading}
      />
    </>
  )
}

export default Home

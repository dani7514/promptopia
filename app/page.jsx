'use client'

import React, { useEffect } from 'react'
import Feed from '@components/Feed';



const Home =  () => {

  // useEffect(async ()=> {
  //   try {
  //     await connectToDB();
  //   } catch(err){
  //     console.log(err);
  //   }
   
  // },[])

  return (
    <section className='w-full flex-center flex-col'>
      <h1 className='head_text text-center'>
        Discover & Share
        <br className='max-mid:hidden'/>
        <span className='orange_gradient text-center'>
          AI-Powered Prompts
        </span>
      </h1>
      
        <p className='desc text-center'>
          Promptopia is an open-source AI prompting tool to modern world to discover, create and share creative prompts 
        </p>
        <Feed />
    </section>
    
  )
}

export default Home
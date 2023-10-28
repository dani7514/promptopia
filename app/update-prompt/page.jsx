'use client'

import React from 'react'
import {useState, useEffect} from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

import Form from '@components/Form'

const UpdatePrompt = () => {
  const router = useRouter();
  const {data: session} = useSession();
  const searchParams=useSearchParams();

  const promptId=searchParams.get('id');
  const [submitting, setSubmitting]=useState(false);

  const [post, setPost]= useState({
    prompt: '',
    tag: ''
  })

  useEffect(() => {
    const getPrompt= async () => {
        const res= await fetch(`/api/prompt/${promptId}`);
        const data = await res.json();

        setPost({
            prompt: data.prompt,
            tag: data.tag, 
        })

        if (promptId ){
          getPrompt();
        } 
    }
  },[promptId])

  const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!promptId) return alert("Missing PromptId!");

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form 
    type='Edit'
    post={post}
    setPost={setPost}
    submitting={submitting}
    handleSubmit={updatePrompt} />
  )
}

export default UpdatePrompt
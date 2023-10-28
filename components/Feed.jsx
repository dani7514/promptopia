'use client'
import React, { useState, useEffect } from 'react'
import PromptCard from "./PromptCard";

const PromptCardList= ({data, handleTagClick}) =>{
  
    return (
        <div className='mt-16 prompt_layout'>
            {data.map((post)=>(
                <PromptCard 
                    key={post.id}
                    post={post}
                    handleTagClick={handleTagClick}
                />
            ))}

        </div>
    )
}

const Feed = () => {
    const [searchText, setSearchText] = useState('');
    const [searchedResults, setSearchedResults]= useState([]);
    const [allPosts, setAllPosts]= useState([]);

    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();

      setAllPosts(data);

   
    };
  
    useEffect(() => {
      fetchPosts();
    }, []);

    const handleSearchChange = (e)=>{
        setSearchText(e.target.value)
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
    }

    const handleTagClick = (tagName) => {
        setSearchText(tagName);
    
        const searchResult = filterPrompts(tagName);
        setSearchedResults(searchResult);
      };
      const filterPrompts = (searchtext) => {
        const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
        return allPosts.filter(
          (item) =>
            regex.test(item.creator.username) ||
            regex.test(item.tag) ||
            regex.test(item.prompt)
        );
      };  

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>

      {/* All Prompts */}
      {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
      )}
    </section>
  )
}

export default Feed
// Importing React Packages
import { useState } from 'react'


// Importing Local files
import Card from './Card'
import Form from './Form'

export default function DataBySearch({ booksSize, setBooksSize }) {
  // UseStates
  const [searchData, setSearchData] = useState("")
  const [authorData, setAuthorData] = useState("")
  const [titleData, setTitleData] = useState("")
  const [reviewData, setReviewData] = useState("")

  // Functions
  async function getCardData(number){
    try {
      let data = await fetch(`http://localhost:5000/general/isbn/${number}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setSearchData(await data.json())
    } catch (error) {
      alert("Error Occurred!!!")
    }
  }

  function getByCardNumber(e){
    e.preventDefault();

    // Removing other search results
    setAuthorData("")
    setTitleData("")
    setReviewData("")

    let number = e.target[0].value
    if(number <= 0){
      alert("Do not enter zero or negative values!!!")
    }else if(number > booksSize){
      alert(`number can't be greater than ${booksSize}`)
    }else if(number > 0){
      getCardData(number);
    }
  }

  async function getByAuthorName(e){
    e.preventDefault();
    
    // Removing other search results
    setSearchData("")
    setTitleData("")
    setReviewData("")

    let author = e.target[0].value
    try {
      let data = await fetch(`http://localhost:5000/general/author/${author}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      setAuthorData(await data.json());
    } catch (error) {
      alert("Type Proper Author Name")
    }
  }

  async function getByTitle(e){
    e.preventDefault();
    
    // Removing other search results
    setSearchData("")
    setAuthorData("")
    setReviewData("")

    let title = e.target[0].value
    try {
      let data = await fetch(`http://localhost:5000/general/title/${title}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      setTitleData(await data.json());
    } catch (error) {
      alert("Type Proper Title")
    }
  }

  async function getReviewData(number){
    try {
      let data = await fetch(`http://localhost:5000/general/review/${number}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setReviewData(await data.json())
    } catch (error) {
      console.log(error);
    }
  }

  function getReviews(e){
    e.preventDefault();
    
    // Removing other search results
    setSearchData("")
    setAuthorData("")
    setTitleData("")

    let number = e.target[0].value;
    if(number <= 0){
      alert("Do not enter zero or negative values!!!")
    }else if(number > booksSize){
      alert(`number can't be greater than ${booksSize}`)
    }else if(number > 0){
      getReviewData(number);
    }
  }

  return (
    <div className="px-10 flex flex-col gap-10 justify-around">
      {/* Forms */}
      <div className="flex flex-col gap-10">
        {/* Form - Search By Card Number */}
        <Form
          type={"number"}
          searchCategory={"By Card Number"}
          placeholder={'Card Number'}
          functionName={getByCardNumber} />

        {/* Form - Search By Author Name */}
        <Form 
          type={"text"}
          searchCategory={"By Author"}
          placeholder={'Author Name'}
          functionName={getByAuthorName}/>

        {/* Form - Search By Title */}
        <Form 
          type={"text"}
          searchCategory={"By Title"}
          placeholder={'Book Title'}
          functionName={getByTitle}/>

        {/* Form - Search Review By Card Number */}
        <Form 
          type={"number"}
          searchCategory={"Reviews By Card Number"}
          placeholder={'Card Number'}
          functionName={getReviews}/>
      </div>
      
      {/* Search Results */}
      <div className="flex gap-10 flex-wrap">
        {/* Card Search Result */}
        {searchData
          ?<Card e={searchData} />
          // Author Search Result
          :authorData
          ?authorData.map((e, i) => {
            return(
              <Card key={i} e={e} />
            )
          })
          // Title Search Result
          :titleData
          ?titleData.map((e, i) => {
            return(
              <Card key={i} e={e} />
            )
          })
          // Review Search Result
          :reviewData
          ? Object.values(reviewData).length > 0
            ?<div className="flex flex-col gap-8">
              <span className="font-bold text-2xl">Reviews:</span>
              <div className="mx-10 flex flex-col gap-5">
                {Object.values(reviewData).map((e, i) => {
                  return(
                    <div key={i}>{i+1}. {e}</div>
                  )
                })}
              </div>
            </div>
            : <div className="w-full text-center text-2xl font-bold">No Reviews Found</div>
          : ""
        }
      </div>
    </div>
  )
}
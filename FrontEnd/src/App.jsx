// Importing React Packages
import { useState, useEffect } from 'react'

// Importing Axios Packages
import axios from 'axios'

function App() {
  // UseStates
  const [books, setBooks] = useState("")
  const [booksSize, setBooksSize] = useState(0)
  const [searchData, setSearchData] = useState("")

  //UseEffect
  useEffect( () => {
    async function fetchData(){
      try {
        let data = await fetch("http://localhost:5000/general", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        setBooks((await data.json())?.books);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  } ,[])

  useEffect(() => {
    setBooksSize(Object.keys(books).length)
  }, [books])

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
      console.log(error)
    }
  }

  function getByCardNumber(e){
    e.preventDefault();
    let number = e.target[0].value
    if(number <= 0){
      alert("Do not enter zero or negative values!!!")
    }else if(number > booksSize){
      alert(`number can't be greater than ${booksSize}`)
    }else if(number > 0){
      getCardData(number);
    }
  }

  return (
    <div className="min-h-lvh flex flex-col gap-10 justify-around bg-black text-white">
      <h1 className="text-4xl text-center">Book Reviews</h1>

      <div className="px-10 flex flex-wrap gap-10">
        {
          Object.values(books).map((e, i) => {
            return(
              <div key={i} className="flex flex-col gap-5 py-2 px-10 border-2 border-gray-200 rounded-lg hover:scale-[110%] hover:shadow-md hover:shadow-gray-200">
                <span>Author: {e.author}</span>
                <span>Title: {e.title}</span>
                <div className="w-full flex justify-between">
                  <span>Copies: {e.copies}</span>
                  <span>Review: {e.review ? "" : ""}</span>
                </div>
              </div>
            )
          })
        }
      </div>

      <div className="p-10 flex flex-wrap gap-10">
        <form onSubmit={(e) => getByCardNumber(e)} className="flex flex-col items-end gap-5">
          <div className="flex gap-5">
            <span className="font-bold text-2xl">Search By Card Number</span>
            <input
              type="number"
              placeholder="Enter Card Number"
              className="py-1 px-5 text-black rounded-md outline-none" />
          </div>

          <button className="text-xl w-fit bg-green-600 py-1 px-5 rounded-md">Submit</button>
        </form>

        <form className="flex flex-col items-end gap-5">
          <div className="flex gap-5">
            <span className="font-bold text-2xl">Search By Author</span>
            <input
              type="text"
              placeholder="Enter Author Name"
              className="py-1 px-5 text-black rounded-md outline-none" />
          </div>

          <button className="text-xl w-fit bg-green-600 py-1 px-5 rounded-md">Submit</button>
        </form>

        <form className="flex flex-col items-end gap-5">
          <div className="flex gap-5">
            <span className="font-bold text-2xl">Search By Title</span>
            <input
              type="text"
              placeholder="Enter Book Title"
              className="py-1 px-5 text-black rounded-md outline-none" />
          </div>

          <button className="text-xl w-fit bg-green-600 py-1 px-5 rounded-md">Submit</button>
        </form>
      </div>

      {searchData
        ?<div className="mx-10 mb-20 w-fit flex flex-col gap-5 py-2 px-10 border-2 border-gray-200 rounded-lg hover:scale-[110%] hover:shadow-md hover:shadow-gray-200">
        <span>Author: {searchData.author}</span>
        <span>Title: {searchData.title}</span>
        <div className="w-full flex gap-10">
          <span>Copies: {searchData.copies}</span>
          <span>Review: {searchData.review ? "" : ""}</span>
        </div>
      </div>
        : ""
      }
    </div>
  )
}

export default App

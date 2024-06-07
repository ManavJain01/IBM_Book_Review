// Importing React Packages
import { useState, useEffect } from 'react'

// Importing Local files
import DataBySearch from './components/DataBySearch'
import Card from './components/Card'
import Footer from './components/Footer'

function App() {
  // UseStates
  const [books, setBooks] = useState("")
  const [booksSize, setBooksSize] = useState(0)

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

  return (
    <div className="min-h-lvh p-5 flex flex-col gap-10 justify-around bg-black text-white">
      <h1 className="text-4xl text-center">Book Reviews</h1>

      {/* All Books Reviews */}
      <div className="px-10 flex flex-wrap gap-10">
        {
          Object.values(books).map((e, i) => {
            return(
              <Card key={i} e={e} />
            )
          })
        }
      </div>

      <DataBySearch booksSize={booksSize} setBooksSize={setBooksSize} />

      <Footer />
    </div>
  )
}

export default App
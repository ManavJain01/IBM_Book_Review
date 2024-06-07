export default function Card({ e }) {
  return (
    <div className="flex flex-col gap-5 py-2 px-10 border-2 border-gray-200 rounded-lg hover:scale-[110%] hover:shadow-md hover:shadow-gray-200">
      <span>Author: {e.author}</span>
      <span>Title: {e.title}</span>
      <div className="flex gap-5 justify-between">
        <span>Copies: {e.copies}</span>

        <span className="flex gap-2">Reviews: {Object.keys(e.reviews).length 
          ?Object.values(e.reviews).map((e,i) => {
            return(
              <div key={i}>{e},</div>
            )
          })
          : ""}
        </span>
      
      </div>
    </div>
  )
}
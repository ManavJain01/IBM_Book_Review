export default function Form({ type, searchCategory, placeholder, functionName }) {
  return (
    <form onSubmit={(e) => functionName(e)} className="flex gap-5">
      <div className="flex gap-5">
        <span className="font-bold text-xl">Search {searchCategory}</span>
        <input
          type={type}
          placeholder={`Enter ${placeholder}`}
          className="py-1 px-5 text-black rounded-md outline-none" />
      </div>

      <button className="text-xl w-fit bg-green-600 py-1 px-5 rounded-md">Submit</button>
    </form>
  )
}
export default function Navbar() {
  return (
    <div className="flex justify-center">
      <h1 className="flex-1 text-4xl text-center">Book Reviews</h1>

      <nav className="text-2xl flex gap-5 items-center">
        <button>Login</button>
        <button className="text-blue-500 text-xl hover:underline">New User?</button>
      </nav>
    </div>
  )
}
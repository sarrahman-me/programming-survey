export default function AppBar() {
  return (
    <div className="w-full bg-white/10 backdrop-blur-md p-4 flex justify-between items-center fixed top-0 left-0 z-50">
      <div className="text-2xl font-bold text-white">Language Battle</div>
      <div className="space-x-8">
        <a href="/" className="text-white text-lg hover:text-gray-300">Home</a>
        <a href="/statistics" className="text-white text-lg hover:text-gray-300">Statistic</a>
      </div>
    </div>
  )
}

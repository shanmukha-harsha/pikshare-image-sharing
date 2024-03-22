function NavBar() {
    return (
        <div className="flex justify-between font-bold items-center border-b border-blue rounded-b-lg shadow-lg p-4 bg-slate-100">
            <div className="ml-6 text-3xl text-blue-600 p-2">
                PikShare
            </div>
            <div className="flex text-black text-xl">
                <div>
                    <button className="mr-6 p-2">
                        Profile
                    </button>
                </div>
                <div>
                    <button className="mr-6 p-2">
                        Sign Out
                    </button>
                </div>
            </div>
        </div>
    )
}

export default NavBar
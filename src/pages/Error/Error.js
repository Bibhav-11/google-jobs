import { Link } from "react-router-dom"

export default function Error() {
    return (
        <div className="flex flex-col justify-center items-center min-h-[calc(100vh-10rem)]">
            <div className="max-w-lg mb-5">
                <p className="text-[#9194a0] mb-6 text-lg">404</p>
                <p className="text-2xl leading-loose">
                    We couldn't find what you were looking for.
                    Please check your URL or <Link to="/" className="text-blue-600">return home</Link>.
                </p>
            </div>
        </div>
    )
    
}
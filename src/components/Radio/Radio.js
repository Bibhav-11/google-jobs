export default function Radio( { value, name, location } ) {
    return (
        <label className="group flex items-center cursor-pointer">
            <input checked={location === value} className="peer appearance-none" value={value} type="radio" name="location" />
            <div className="relative h-[18px] w-[18px] border border-light  group-hover:border-skyblue rounded-full after:absolute after:content after:h-[70%] after:w-[70%] after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:bg-skyblue after:rounded-full group-hover:after:h-[80%] group-hover:after:w-[80%] after:hidden peer-checked:after:flex mr-3">
            </div>
            {name}
        </label>
    )
}
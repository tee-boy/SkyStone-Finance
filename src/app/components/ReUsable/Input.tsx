export default function Input() {
    return(
       
             <input 
                type="text" 
                placeholder={""} 
                // onClick={onclick}
                className={`border bg-[#808080] border-[#4d4d4d] h-14 rounded-[15px] w-full
                active:scale-95 active:shadow-sm duration-150 transition-transform
               text-[#4d4d4d] cursor-pointer hover-shadow-md font-semibold text-md`}
                />
    )
};
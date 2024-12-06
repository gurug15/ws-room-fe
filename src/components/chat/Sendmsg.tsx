import { BsSendFill } from "react-icons/bs"
export default function Sendmsg({onChange, ref, value, onClick,placeholder}:{onChange:(e:React.ChangeEvent<HTMLInputElement>)=>void,value?:string, ref?:React.LegacyRef<HTMLInputElement> | undefined,onClick:()=>void, placeholder:string}) {
  return (
    <div className="flex justify-between ">
        <input ref={ref} value={value} type="text" className="w-full h-10 rounded-md mr-5 text-black" placeholder={placeholder} onChange={onChange} />
        <button className="text-gray-500 mr-5" onClick={onClick} ><BsSendFill className="text-slate-700 text-xl"/></button>
    </div>
  )
}

import { Message } from "../../types";


export default function Messaage({message}:{message:Message}) {
  return (
    <div className="flex justify-end">
    <div className="bg-slate-100 h-10 text-slate-800 rounded-md text-center p-2 mb-2 mr-2 max-w-max">{message.content}</div>
    </div>
  )
}

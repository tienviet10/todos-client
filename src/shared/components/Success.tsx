import React from 'react'
import { SuccessType } from '../types/sub-components/SharedComponents'

const Success:React.FC<SuccessType> = ({ success }) => {
  return (
    <div>
      <div
        className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
        role="alert"
      >
        {success}
      </div>
    </div>
  )
}

export default Success



// export default function Success({ success }) {
//   return (
//     <div>
//       <div
//         className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
//         role="alert"
//       >
//         {success}
//       </div>
//     </div>
//   );
// }

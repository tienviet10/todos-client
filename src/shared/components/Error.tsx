import React from 'react'
import { ErrorType } from '../types/sub-components/SharedComponents'

const Error:React.FC<ErrorType> = ({error}) => {
  return (
    <div>
      <div
        className="relative bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"
        role="alert"
      >
        {error}
      </div>
    </div>
  )
}

export default Error


// export default function Error({ error }) {
//   return (
//     <div>
//       <div
//         className="relative bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"
//         role="alert"
//       >
//         {error}
//       </div>
//     </div>
//   );
// }

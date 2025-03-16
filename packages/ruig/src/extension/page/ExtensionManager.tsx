import React from 'react'
import { IAnyObject } from '../../common/models/IAnyObject'
import { FileReadWrite } from './component/FileReadWrite'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function ExtensionManager({ extensions }: IAnyObject) {
  /*  const extensionPool = SharedConfig.get(EXTENSION_POOL)
 
   useEffect(() => {
 
   }, []) */

  return (
    <>
      <div id="extensionManager">Here you can manager your extensions.</div>
      <FileReadWrite />
    </>
  )
}

export { ExtensionManager }

import Reblend from 'reblendjs'
import { IAnyObject } from '../../common/models/IAnyObject'
import { FileReadWrite } from './component/FileReadWrite'

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

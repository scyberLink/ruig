import { Clickable } from '../../common/Clickable'
import { Color } from '../../common/Color'

import Reblend, { ReblendTyping, useState } from 'reblendjs'

async function Menu({
  title,
  content,
  style,
}: {
  title: string
  content: ReblendTyping.ReblendElement[]
  style?: ReblendTyping.CSSProperties
}) {
  const [openMenu, setOpenMenu] = useState(false)

  return (
    <>
      <div
        style={{
          ...style,
          position: 'relative',
        }}
        title="MenuBar"
      >
        <Clickable onClick={() => setOpenMenu((prev) => !prev)}>
          <>{title}</>
        </Clickable>
        {!openMenu ? null : <div style={{ position: 'absolute', bottom: '-10px', right: '-10px' }}>{content}</div>}
      </div>
    </>
  )
}

export { Menu }

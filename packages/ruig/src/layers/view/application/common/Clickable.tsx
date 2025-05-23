import Reblend, { ReblendTyping } from 'reblendjs'

type ClickableProps = {
  onClick?: () => void
  children: ReblendTyping.ReblendNode
  style?: ReblendTyping.CSSProperties
  className?: string
}

export function Clickable({ onClick, children, style, className }: ClickableProps) {
  return (
    <div
      class="clickable-container"
      style={`align-items: center; box-sizing: border-box; cursor: default; display: flex; -webkit-app-region: no-drag; zoom: 1; outline: 0!important; white-space: nowrap;justify-content: left; line-height: 22px;`}
    >
      <style>{`.clickable-container:hover { background-color: var(--ruig-menubar-selectionBackground);}`}</style>
      <div
        style={`border-radius: 5px; padding: 0 8px;    visibility: visible;line-height: 22px; user-select: none; -webkit-user-select: none;`}
        className={className}
        tabIndex={0}
        role="button"
        onKeyDown={(e) => {
          if ((e.key === 'Enter' || e.key === ' ') && onClick) {
            e.preventDefault()
            onClick()
          }
        }}
        onclick={onClick}
      >
        {children}
      </div>
    </div>
  )
}

import { h } from 'gridjs'
import type { VNode } from 'preact'

export const action = ({ action, color, text, icon, disabled }: Action): VNode => {
  const className = `btn btn-${color} me-2.5`
  return h(
    'button',
    { onClick: action, className, disabled },
    icon ? h('i', { className: `bi-${icon} me-2` }) : '',
    text
  )
}

export const actionWrapper = (...children: Array<VNode>): VNode =>
  h('div', { className: 'action-wrapper' }, ...children)

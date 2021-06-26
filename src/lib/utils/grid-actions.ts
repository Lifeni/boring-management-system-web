import { h } from 'gridjs'
import type { VNode } from 'preact'

export const action = ({ action, color, text, icon }: Action): VNode => {
  const className = `btn btn-${color} btn-sm me-2`
  return h('button', { onClick: action, className }, h('i', { className: `bi-${icon} me-2` }), text)
}

export const actionWrapper = (...children: Array<VNode>): VNode =>
  h('div', { className: 'action-wrapper' }, ...children)

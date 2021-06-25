import { h } from 'gridjs'
import type { VNode } from 'preact'

export const action = ({ action, color, text }: Action): VNode => {
  const className = `btn btn-${color} btn-sm me-2`
  return h('button', { onClick: action, className }, text)
}

export const actionWrapper = (...children: Array<VNode>): VNode => h('div', {}, ...children)

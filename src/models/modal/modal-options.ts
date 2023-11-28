import type { ModalPayload } from './modal-payload'

export interface ModalOptions {
  title: string
  message?: string
  confirmText?: string
  cancelText?: string
  confirmColor?: string
  cancelColor?: string
  onConfirm?: (payload: ModalPayload) => Promise<void>
  onCancel?: (payload: ModalPayload) => Promise<void>
}

export const DEFAULT_MODAL_OPTIONS: ModalOptions = {
  title: 'Modal title'
}

export const MODAL_CONFIRM_OPTIONS: ModalOptions = {
  title: 'Please confirm your choice',
  message: 'Are you sure you want to do this?',
  cancelText: 'Cancel',
  confirmText: 'Confirm',
  confirmColor: 'danger'
}

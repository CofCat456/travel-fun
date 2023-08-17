import type { ButtonProps } from 'naive-ui';
import type { Component } from 'vue';

export interface Action extends Readonly<ButtonProps> {
  label?: string
  icon?: Component
}

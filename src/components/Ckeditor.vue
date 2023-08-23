<script setup lang="ts">
import '@ckeditor/ckeditor5-build-classic/build/translations/zh-cn';

import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { component as ckeditor } from '@ckeditor/ckeditor5-vue';

import { MyAdapterPlugin } from '../utils/myUploadAdapter';

defineProps<{
  disabled?: boolean
  value: string
}>();

const emit = defineEmits<{
  (e: 'ready'): void
  (e: 'foucs'): void
  (e: 'blur'): void
  (e: 'destroy'): void
  (e: 'update:value', value: string): void
}>();

const editor = ClassicEditor;

const editorConfig = {
  extraPlugins: [MyAdapterPlugin],
  language: 'zh-cn',
  toolbar: {
    items: [
      'heading',
      '|',
      'bold',
      'italic',
      'link',
      'bulletedList',
      'numberedList',
      '|',
      'outdent',
      'indent',
      '|',
      'imageUpload',
      'toggleImageCaption',
      'blockQuote',
      'insertTable',
      'mediaEmbed',
      'undo',
      'redo',
    ],
  },
};

function onEditorReady() {
  emit('ready');
}

function onEditorFoucs() {
  emit('foucs');
}

function onEditorBlur() {
  emit('blur');
}

function onEditorInput(value: string) {
  emit('update:value', value);
}

function onEditorDestroy() {
  emit('destroy');
}
</script>

<template>
  <div id="ckeditor">
    <ckeditor
      :editor="editor"
      :config="editorConfig"
      :disabled="disabled"
      :model-value="value"
      @ready="onEditorReady"
      @foucs="onEditorFoucs"
      @blur="onEditorBlur"
      @input="onEditorInput"
      @destroy="onEditorDestroy"
    />
  </div>
</template>

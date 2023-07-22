<script setup>
import '@ckeditor/ckeditor5-build-classic/build/translations/zh-cn';

import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { component as ckeditor } from '@ckeditor/ckeditor5-vue';

import { MyAdapterPlugin } from '@/utlis/myUploadAdapter';

defineProps({
  disabled: {
    type: Boolean,
    default: false
  },
  value: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['ready', 'foucs', 'blur', 'destroy', 'update:value']);

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
      'redo'
    ]
  }
};

const onEditorReady = () => {
  emit('ready');
};

const onEditorFoucs = () => {
  emit('foucs');
};

const onEditorBlur = () => {
  emit('blur');
};

const onEditorInput = (value) => {
  emit('update:value', value);
};

const onEditorDestroy = () => {
  emit('destroy');
};
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
    >
    </ckeditor>
  </div>
</template>

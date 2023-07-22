<script setup>
import '@ckeditor/ckeditor5-build-classic/build/translations/zh-cn';

import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { component as ckeditor } from '@ckeditor/ckeditor5-vue';
import { ref } from 'vue';

import { MyAdapterPlugin } from '@/utlis/myUploadAdapter';

defineProps({
  disabled: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['ready', 'foucs', 'blur', 'input', 'destroy']);

const editor = ClassicEditor;
const editorResult = ref('');

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
  console.log(editorResult.value);
};

const onEditorInput = () => {
  emit('input');
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
      @ready="onEditorReady"
      @foucs="onEditorFoucs"
      @blur="onEditorBlur"
      @input="onEditorInput"
      @destroy="onEditorDestroy"
      v-model="editorResult"
    >
    </ckeditor>
  </div>
</template>

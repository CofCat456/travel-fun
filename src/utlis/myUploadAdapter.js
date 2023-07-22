import { apiAdminUploadImage } from './api';
import { imageTransformHandler } from './global';

function MyUploadAdapter(loader) {
  const upload = async () => {
    const file = await loader.file;
    const imageFormData = imageTransformHandler(file);
    const res = await apiAdminUploadImage(imageFormData);
    return { default: res?.data?.imageUrl ?? '' };
  };

  return { upload };
}

function MyAdapterPlugin(editor) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
    return MyUploadAdapter(loader);
  };
}

export { MyAdapterPlugin };
